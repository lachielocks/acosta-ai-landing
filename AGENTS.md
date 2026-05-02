# AGENTS.md

## Cursor Cloud specific instructions

This is a static Next.js 16 landing page (no backend, no database, no auth).

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (port 3000, uses Turbopack) |
| Build | `pnpm build` |
| Lint | `pnpm lint` |

### Notes

- The project uses **pnpm** (lockfile: `pnpm-lock.yaml`).
- ESLint is configured via `eslint.config.mjs` with `eslint-config-next` (flat config). Some pre-existing lint errors exist in the codebase (`react-hooks/set-state-in-effect` in `hooks/use-mobile.ts`, unused vars in components).
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`, so TypeScript errors won't block builds and `sharp` build warnings can be safely ignored.
- The `pnpm install` step may show a warning about ignored build scripts for `sharp`; this is expected and does not affect functionality.
- No environment variables are required to run the project locally.
- The Three.js/React Three Fiber hero animation is GPU-intensive; in headless or low-resource environments it may render a black rectangle, which is fine for testing.
