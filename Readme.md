# WriteHub — Content Publishing Platform
A full-stack blogging platform inspired by Medium, built with a modern serverless tech stack.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, TypeScript, Tailwind CSS|
| **Backend** | Hono (Cloudflare Workers) |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma (with Accelerate for edge) |
| **Auth** | JSON Web Tokens (JWT) |
| **Validation** | Zod (shared between frontend & backend via `@100xbansal/medium-common`) |

## Features

- User authentication and authorization using JWT.
- CRUD operations for blog posts.
- Responsive design for an optimal user experience on all devices.
- Type-safe interactions with the database using Prisma ORM.
- Schema validation with Zod, shared between frontend and backend.

---

## Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- A PostgreSQL database (e.g. [Neon](https://neon.tech/))
- A [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) connection string

### 1. Clone the repository

```bash
git clone https://github.com/bhuvnesh179/Writehub.git
cd Writehub
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `backend/.env`

Create a `.env` file inside the `backend/` directory with the following variables:

```env
DATABASE_URL="<your-prisma-accelerate-url>"
JWT_SECRET="<your-jwt-secret>"
```

> **Note:** `DATABASE_URL` must be a **Prisma Accelerate** URL (starts with `prisma://`), not a direct PostgreSQL connection string. The Cloudflare Workers edge runtime requires the Accelerate proxy.

#### Update `backend/wrangler.toml`

The `wrangler.toml` file also has `[vars]` for `DATABASE_URL` and `JWT_SECRET`. When a `.env` file is present, wrangler uses those values instead. Make sure `wrangler.toml` has matching or placeholder values:

```toml
name = "backend"
main = "src/index.ts"
compatibility_date = "2023-12-01"

[vars]
DATABASE_URL = ""
JWT_SECRET = ""
```

#### Generate Prisma Client

```bash
npx prisma generate --no-engine
```

> The `--no-engine` flag is required because Cloudflare Workers use the edge client which doesn't need native engines.

#### Run the backend

```bash
npm run dev
```

The backend will start on `http://localhost:8787`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

#### Create `frontend/.env`

Create a `.env` file inside the `frontend/` directory for local development:

```env
VITE_API_URL=http://localhost:8787
```

#### Create `frontend/.env.production`

Create a `.env.production` file for production builds:

```env
VITE_API_URL=https://<your-worker-name>.<your-subdomain>.workers.dev
```

#### Run the frontend

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`.

---

## Deployment

### Backend (Cloudflare Workers)

```bash
cd backend
npx wrangler deploy
```

Set secrets for production (so they aren't committed to source control):

```bash
wrangler secret put DATABASE_URL
wrangler secret put JWT_SECRET
```

### Frontend (Vercel)

The frontend is deployed on Vercel. Set the `VITE_API_URL` environment variable in your Vercel project settings to point to your deployed worker URL.

---

Happy coding!