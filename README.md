# Integrating with HubSpot I: Foundations - Practicum

A Node + Express + Axios + Pug application that reads and creates records of a custom object ("Games") in HubSpot.

## Custom object list view

https://app-eu1.hubspot.com/contacts/149650500/objects/2-255687128/views/all/list

## Setup

1. `npm install`
2. Create a `.env` file with `PRIVATE_APP_ACCESS` (the private app token) and `CUSTOM_OBJECT_TYPE`.
3. Run `node index.js` and open http://localhost:3000

## Routes

- `GET /` — table with the records (`homepage.pug` template)
- `GET /update-cobj` — form (`updates.pug` template)
- `POST /update-cobj` — creates the record and redirects to `/`

The token is **not** included in the repository (`.env` is listed in `.gitignore`).
