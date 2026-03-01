# Scaffold Prompt — Dice Rolling App
> Paste this prompt into Claude (text interface) to generate the full project.

---

## Prompt

```
Scaffold a full-stack dice-rolling app with the following spec. Generate all files with complete content — no placeholders, no "fill this in later".

---

### Stack

- **Frontend:** React (Vite + TypeScript)
- **Backend:** Node.js + TypeScript (Express)
- **No database** — all data is mocked in-memory on the backend

---

### Project Structure

```
dice-app/
├── frontend/          ← Vite + React + TypeScript
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   └── DiceRoller.tsx
│   │   └── services/
│   │       └── diceApi.ts     ← typed fetch wrapper for the backend
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
└── backend/           ← Express + TypeScript
    ├── src/
    │   ├── index.ts           ← server entry, env validation at startup
    │   ├── routes/
    │   │   ├── health.ts      ← GET /health → { status: "ok", uptime: number }
    │   │   └── dice.ts        ← GET /roll?sides=6&count=2
    │   ├── services/
    │   │   └── diceService.ts ← pure roll logic, no side effects
    │   └── models/
    │       └── roll.ts        ← Zod schema + inferred types for roll request/response
    ├── tsconfig.json
    └── package.json
```

---

### Backend Requirements

1. **`GET /health`**
   - Returns `{ status: "ok", uptime: <seconds since process start> }`
   - No auth required
   - Must respond in < 50ms

2. **`GET /roll?sides=6&count=2`**
   - `sides`: integer 2–100 (validated, default 6)
   - `count`: integer 1–20 (validated, default 1)
   - Returns:
     ```json
     {
       "rolls": [3, 5],
       "total": 8,
       "sides": 6,
       "count": 2
     }
     ```
   - Input validated with Zod — invalid input returns 400 with error detail
   - Roll logic lives in `diceService.ts`, not in the route handler

3. **TypeScript standards:**
   - Strict mode — no `any`
   - All environment variables validated at startup via a `config/` module
   - Intentional error handling — no swallowed exceptions
   - Every exported function has a JSDoc comment explaining **why** it exists

4. **Environment variables (with defaults):**
   - `PORT` (default: `3001`)
   - `CORS_ORIGIN` (default: `http://localhost:5173`)

---

### Frontend Requirements

1. **`DiceRoller` component:**
   - Number input: sides (2–100)
   - Number input: count (1–20)
   - "Roll" button — calls `GET /roll` via `diceApi.ts`
   - Displays each individual roll result and the total
   - Shows a loading state while the request is in flight
   - Shows an error message if the request fails

2. **`diceApi.ts`:**
   - Typed fetch wrapper — return types match the backend Zod schema
   - Base URL configurable via `import.meta.env.VITE_API_URL` (default: `http://localhost:3001`)
   - No raw `fetch` calls outside this module

3. **TypeScript standards:**
   - Strict mode
   - No `any`
   - Props typed explicitly — no implicit prop spreading

---

### What to Generate

Produce every file in full. For each file, output:

```
// filepath: <relative path from dice-app/>
<full file contents>
```

Start with the backend, then the frontend. End with a `README.md` at the repo root that explains how to run both services locally.

Do not abbreviate. Do not use "// ... rest of file". Every file must be complete and runnable.
```
