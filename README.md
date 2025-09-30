# Arkiv Website

Arkiv Website is a two-part application: a Next.js 14 marketing site in `frontend/` and a Payload CMS instance in `cms/`. The codebase targets Bun for local development and ships with Docker Compose definitions for spinning up the full stack.

## Prerequisites
- [Bun](https://bun.com) ≥ 1.0 for local commands
- Docker & Docker Compose for container workflows
- Node.js-compatible environment variables stored in `.env` (see `.env.example`)

## Local Development
1. Copy `.env.example` to `.env` and fill in secrets (database password, JWT keys, Payload secret, URLs).
2. Install dependencies and run each service:
   ```bash
   bun install          # from repo root if you use shared packages
   cd frontend && bun install && bun run dev
   cd cms && bun install && bun run dev
   ```
   - Frontend runs at `http://localhost:3000`
   - Payload CMS runs at `http://localhost:1337`

## Docker Workflow
- **Full stack (frontend + CMS + Postgres):**
  ```bash
  docker compose up --build
  ```
- **Frontend-only demo image:**
  ```bash
  docker compose -f docker-compose.prod.yml up --build
  ```
  Ensure `.env` exposes all variables consumed in the compose files (`DATABASE_PASSWORD`, `JWT_SECRET`, etc.).

## Project Layout
- `frontend/`: Next.js app (routes in `app/`, UI components under `components/`, utilities in `lib/`).
- `cms/`: Payload CMS configuration, collections, and server entry point.
- `docker-compose*.yml`: Container orchestration for development and production demos.
- `.env.example`: Template for local environment variables.

## Quality & Linting
- Run `cd frontend && bun run lint` to execute `next lint`.
- Add component or API tests near their sources; default setup does not include automated tests yet.

## Deploying
- Provide production secrets via environment variables; no sensitive values are committed.
- Build the frontend with `bun run build` before containerizing or deploying to static hosts.
- Mirror the CMS env vars in your hosting solution (Payload requires `PAYLOAD_SECRET` and `DATABASE_URL`).
