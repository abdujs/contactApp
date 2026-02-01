## ContactApp Monorepo

Nuxt/Vuetify SPA on top of a Hasura + Postgres stack. The lightweight Express backend issues JWTs with Hasura claims, while the front-end talks directly to Hasura via Apollo for contact CRUD.

### Stack

- Front-end: Nuxt 2 SPA, Vuetify UI kit, Apollo client hitting Hasura.
- Back-end: Express 5, bcrypt, jsonwebtoken; wraps Hasura GraphQL for user registration/login.
- Data: Hasura GraphQL Engine + Postgres (Docker compose under `oh-core-db`).

### Local Development

1. **Start infrastructure**
	- `cd oh-core-db`
	- `docker compose -f docker-compose.db.yml up -d`
	- `docker compose -f docker-compose.app.yml up --build`

2. **Run backend without Docker (optional)**
	- `cd back-end`
	- `npm install`
	- `npm start`

3. **Run front-end**
	- `cd front-end`
	- `npm install`
	- `npm run dev`

The SPA is available on `http://localhost:3000`, Express on `http://localhost:5000`, and Hasura console on `http://localhost:8080`.

### Auth Flow

1. User registers/logs in via Express (`/api/auth`).
2. Backend stores the user through Hasura mutations and signs a JWT embedding `x-hasura-user-id`.
3. Front-end saves the JWT (Vuex + `localStorage`); Apollo attaches `Authorization` headers for all GraphQL requests.
4. Hasura permissions/presets enforce row-level ownership so each user only sees their contacts.

### Testing Notes

- Front-end: `npm run dev` (manual QA) or `npm run build` to verify bundling.
- Back-end: smoke-test with `npm start` and hit `/api/auth/register` + `/api/auth/login`.
- Database: seed or inspect using Hasura console or `psql` against the Postgres service.

### Deployment Checklist

- Update `.env` files (backend + docker-compose) with production URLs/secrets.
- Run `npm run build && npm run start` for the front-end SPA.
- Rebuild/push the Express Docker image if deploying via Compose.

That's it—lean codebase, JWT-secured GraphQL, and ready-to-demo UI.
