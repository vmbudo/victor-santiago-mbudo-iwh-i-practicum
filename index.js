require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;
// Ej.: "p12345678_games" o el objectTypeId "2-12345678"
const OBJECT_TYPE = process.env.CUSTOM_OBJECT_TYPE;
const PROPERTIES = ['name', 'publisher', 'price'];

const BASE_URL = `https://api.hubapi.com/crm/v3/objects/${OBJECT_TYPE}`;
const headers = {
  Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
  'Content-Type': 'application/json',
};

// 1. Página principal: lista los registros en una tabla
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?properties=${PROPERTIES.join(',')}&limit=100`,
      { headers }
    );
    res.render('homepage', {
      title: 'Custom Object Table | Integrating With HubSpot I Practicum',
      records: response.data.results,
    });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('Error al obtener los registros de HubSpot.');
  }
});

// 2. Formulario para crear un registro
app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
  });
});

// 3. Envía los datos del formulario a HubSpot y redirige a la home
app.post('/update-cobj', async (req, res) => {
  const body = {
    properties: {
      name: req.body.name,
      publisher: req.body.publisher,
      price: req.body.price,
    },
  };
  try {
    await axios.post(BASE_URL, body, { headers });
    res.redirect('/');
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('Error al crear el registro en HubSpot.');
  }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));