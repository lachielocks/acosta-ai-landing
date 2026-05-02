# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Acosta AI landing page — a React 19 SPA served by an Express 5 dev server with Vite HMR. No database, no real API keys required. All subscription/billing features are stubbed with `alert()`.

### Commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (starts Express + Vite on port 3000) |
| Lint (TypeScript) | `npm run lint` |
| Build | `npm run build` |

### Non-obvious notes

- The `GEMINI_API_KEY` env var referenced in the README is **unused** — it's a leftover from the AI Studio template scaffold. The app runs fine without it.
- The dev server (`server.ts`) uses Express 5 with Vite in middleware mode. It listens on `0.0.0.0:3000`.
- SPA routes (`/`, `/pricing`, `/privacy`, `/terms`, `/safety`, `/policies`) are handled server-side so direct navigation and refreshes work in dev mode.
- `npm run lint` is just `tsc --noEmit` — there is no ESLint or Prettier configured.
- There are no automated tests in this repo. Validation is done via TypeScript type-checking and manual browser testing.
- Tailwind CSS is loaded via CDN (`cdn.tailwindcss.com`) — not installed as a local dependency.
