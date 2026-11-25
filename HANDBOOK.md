# Acosta AI landing site

The Next.js website for [Acosta AI](https://www.acosta-ai.com), a student-first learning platform with tutoring, study and exam-preparation tools, and features for teachers. This repository contains the marketing site and its public information pages; it is not the Acosta learning app or its service backend.

## What's here

- Product landing page with feature, pricing, testimonial, and FAQ sections
- Public pages for privacy, safety, policies, and terms
- The daily-puzzle “Pause” page
- Responsive UI, seasonal themes, and interactive product demonstrations
- Search metadata, sitemap, and robots rules

For the product itself, visit [Acosta AI](https://app.acosta-ai.com).

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Radix UI primitives, Lucide icons, Framer Motion, and selected Three.js visuals
- Vercel Analytics

## Run locally

You’ll need Node.js and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The current site source does not require environment variables.

## Useful commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local development server |
| `pnpm lint` | Run ESLint |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |

## Project layout

| Path | Purpose |
| --- | --- |
| `app/` | Next.js routes, metadata, global styles, sitemap, and robots rules |
| `components/landing/` | Landing page sections |
| `components/legal/` | Public policy and legal page components |
| `components/season/` | Seasonal presentation and theme behavior |
| `components/ui/` | Reusable interface components |
| `lib/` | Site URLs and shared helpers |
| `public/` | Icons and image assets |

## License

There is currently no `LICENSE` file in this repository. Public visibility does not grant permission to reuse or redistribute the code; check with the repository owner before doing so.
