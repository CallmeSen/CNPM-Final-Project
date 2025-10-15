<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

````markdown
# Auth Service (NestJS)

Nest-powered replacement for the legacy Express `auth_service`. This service handles:

- Customer registration, login, and profile management
- JWT-based authentication/authorization
- Super-admin user management across customers, admins, restaurant admins, and delivery personnel
- Delivery personnel roster, geo-queries, and availability management
- Delivery fee CRUD and dynamic fare calculation

The code now follows the shared microservice conventions documented in `.github/copilot-instructions.md`.

## Prerequisites

- Node.js 18+
- MongoDB instance accessible via `MONGO_URI`

## Environment variables

Create a `.env` file in `backend/auth-service/` (or supply equivalent secrets) with at least:

```bash
PORT=5001
MONGO_URI=mongodb://localhost:27017/food-delivery-auth
JWT_SECRET=super-secret
JWT_EXPIRES_IN=7d
# optional comma-separated origins for CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002
```

## Install & run

```bash
npm install
npm run start:dev
```

### Production build

```bash
npm run build
npm run start:prod
```

## API overview

All routes are served under the `/api` prefix.

| Method | Path | Notes |
| --- | --- | --- |
| `POST` | `/api/auth/register/customer` | Customer sign-up |
| `POST` | `/api/auth/login` | Customer login |
| `GET` | `/api/auth/customer/profile` | Requires `Bearer` token (role `customer`) |
| `PATCH` | `/api/auth/customer/profile` | Update profile (role `customer`) |
| `GET` | `/api/management/users` | Super-admin only |
| `POST` | `/api/management/users` | Super-admin creates users |
| `PUT` | `/api/management/users/:id` | Super-admin updates users |
| `DELETE` | `/api/management/users/:id` | Super-admin deletes users (`userType` query) |
| `GET` | `/api/management/delivery` | Admin / Super-admin |
| `POST` | `/api/management/delivery` | Admin / Super-admin |
| `PATCH` | `/api/management/delivery/:id/location` | Update GeoJSON location |
| `PATCH` | `/api/management/delivery/:id/availability` | Toggle availability |
| `GET` | `/api/management/delivery-fees` | Admin / Super-admin |
| `POST` | `/api/management/delivery-fees` | Admin / Super-admin |
| `GET` | `/api/management/delivery-fees/calculate` | Distance-based fare estimate |

See controller files under `src/` for complete coverage (statistics, activity logs, etc.).

## Testing

```bash
npm run test
```

*(Test suite porting from the legacy Express service is still pending.)*

## Notes

- JWTs for super admins generated by the restaurant service remain valid: guards accept both `superAdmin` and `super-admin` roles without DB lookups.
- To adjust CORS, set `ALLOWED_ORIGINS` to a comma-separated list; defaults cover the three frontend apps.
- Delivery geo-queries rely on the `currentLocation` 2dsphere index defined in the `DeliveryPersonnel` schema.
````
