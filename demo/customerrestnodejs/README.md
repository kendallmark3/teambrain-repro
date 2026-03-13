# Employee REST API — Node.js + TypeScript

A production-quality REST API following clean layered architecture principles.

## Quick Start

```bash
npm install
npm run dev
```

Server starts at `http://localhost:3000`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/employees` | List all employees |
| GET | `/api/employees/:id` | Get employee by ID |

## Architecture

```
src/
├── config/        # Environment validation at startup
├── routes/        # HTTP routing only — no logic
├── controllers/   # Request/response handling
├── services/      # Business logic and DTO mapping
├── repositories/  # Data access layer
├── models/        # Internal domain models
├── dtos/          # Public API contracts
├── data/          # Mock data (replaces DB)
└── middleware/    # Error handling
```

Each layer has a single responsibility. Swap the repository layer for a real DB without touching controllers or services.

## Scripts

- `npm run dev` — start with ts-node-dev (hot reload)
- `npm run build` — compile TypeScript to dist/
- `npm start` — run compiled output

## Governance

Follows the [LearnTeachMaster](https://www.learnteachmaster.org/) intent-driven development model.
