![][badge-hono] ![][badge-drizzle]

## Getting Started

For local development with the database, Docker is required. You can download Docker [here](https://www.docker.com/get-started/).

The following environment variables are required for the application to run. For a definitive list of all required variables, refer to [this](./src/env.ts) file.

```bash
NODE_ENV=
LOG_LEVEL=

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
RESEND_API_KEY=
```

The `BETTER_AUTH_SECRET` can be generated [here](https://www.better-auth.com/docs/installation#set-environment-variables). The `RESEND_API_KEY` for local development will be shared separately.

To set up your local environment, copy the [example file](./.env.example):

```bash
cp .env.example .env
```

## Drizzle ORM

This project uses [Drizzle ORM](https://orm.drizzle.team/) for type-safe interaction with PostgreSQL. Locally, the database is managed through Docker Compose. For a full reference of available database scripts, refer to [package.json](./package.json).

```bash
pnpm db:up          # Start local PostgreSQL
pnpm db:down        # Stop local PostgreSQL
pnpm db:generate    # Generate migrations based on schema changes
pnpm db:migrate     # Apply pending migrations
pnpm db:studio      # Open Drizzle Studio
```

Ensure Docker is running before executing database commands.

## OpenAPI Specification

During local development, the visual OpenAPI documentation can be accessed at `/api/reference`. This interface allows exploring API endpoints and executing test requests.

<!-- Image References -->

[badge-hono]: https://img.shields.io/badge/Hono-E36002?logo=hono&logoColor=fff
[badge-drizzle]: https://img.shields.io/badge/Drizzle-C5F74F?logo=drizzle&logoColor=000
