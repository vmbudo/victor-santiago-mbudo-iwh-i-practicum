# Integración con HubSpot I: Fundamentos - Practicum

Aplicación Node + Express + Axios + Pug que lee y crea registros de un objeto personalizado ("Games") en HubSpot.

## Vista de lista del objeto personalizado

https://app-eu1.hubspot.com/contacts/149650500/objects/2-255687128/views/all/list

## Configuración

1. `npm install`
2. Crea un archivo `.env` con `PRIVATE_APP_ACCESS` (token de la app privada) y `CUSTOM_OBJECT_TYPE`.
3. `node index.js` y abre http://localhost:3000

## Rutas

- `GET /` — tabla con los registros (plantilla `homepage.pug`)
- `GET /update-cobj` — formulario (plantilla `updates.pug`)
- `POST /update-cobj` — crea el registro y redirige a `/`

El token **no** se incluye en el repositorio (`.env` está en `.gitignore`).
