// Script opcional de un solo uso: crea el objeto personalizado "Game",
// lo asocia con Contacts y añade 3 registros de ejemplo.
// Uso: npm run setup   (necesita PRIVATE_APP_ACCESS en .env)
require('dotenv').config();
const axios = require('axios');

const headers = {
  Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
  'Content-Type': 'application/json',
};

const schema = {
  name: 'games',
  labels: { singular: 'Game', plural: 'Games' },
  primaryDisplayProperty: 'name',
  requiredProperties: ['name'],
  searchableProperties: ['name', 'publisher'],
  properties: [
    { name: 'name', label: 'Name', type: 'string', fieldType: 'text' },
    { name: 'publisher', label: 'Publisher', type: 'string', fieldType: 'text' },
    { name: 'price', label: 'Price', type: 'number', fieldType: 'number' },
  ],
  associatedObjects: ['CONTACT'],
};

const games = [
  { name: 'Animal Crossing: New Horizons', publisher: 'Nintendo', price: '60' },
  { name: 'Mario Kart 8', publisher: 'Nintendo', price: '60' },
  { name: 'Stardew Valley', publisher: 'ConcernedApe', price: '15' },
];

(async () => {
  try {
    const { data } = await axios.post(
      'https://api.hubapi.com/crm/v3/schemas',
      schema,
      { headers }
    );
    console.log('Objeto creado.');
    console.log('objectTypeId:', data.objectTypeId);
    console.log('fullyQualifiedName:', data.fullyQualifiedName);
    console.log('→ Pon este valor en CUSTOM_OBJECT_TYPE en tu .env');

    for (const g of games) {
      await axios.post(
        `https://api.hubapi.com/crm/v3/objects/${data.objectTypeId}`,
        { properties: g },
        { headers }
      );
      console.log('Registro creado:', g.name);
    }
  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
  }
})();