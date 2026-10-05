# The Rhea Project

![The Rhea Project: Do you dream or remember?](app/opengraph-image.jpg)

A modern Voight-Kampff test adaptation. Rhea, a synthetic being, asks five questions
and you answer in your own words. A small Mistral AI model categorizes each answer.
The app's own algorithm and data model decide how Rhea replies and what the final verdict is.

## What is in this repository

This repository is the public frontend only.

- Next.js 16 frontend, deployed to Cloudflare Workers with OpenNext:
  - `app/`: routes, layout, global styles.
  - `interview/`: the interview feature, its screens, styles and server code.
  - `components/ui/`, `lib/utils.ts`: shadcn primitives.
- `contracts/`: the public API contract (`@rhea/contracts`), oRPC routes and Zod
  schemas.

API implementation should follow `contracts/`.

## Architecture

```text
Browser ──► Next.js on Cloudflare Workers ──► rhea-api Worker
            Server Components                  questions, classification,
            Server Actions                     scoring, storage
```

- The browser talks only to the Next.js app. Server Components and Server Actions
  call the API through a server-only oRPC client (`interview/server/api.ts`) built from
  `contracts/`, forwarding the HttpOnly `rhea_session` cookie.
- Every mode reaches the API through the `API` service binding: `bun run dev` and
  `bun run preview` connect to the local `rhea-api` dev server through Wrangler's
  dev registry, `bun run deploy` to the deployed `rhea-api` Worker.

## Prerequisites

- Bun 1.4.2
- Biome 2.5.14, installed globally

## Setup

```zsh
bun install
cp .env.example .env.local
```

## Development

```zsh
bun run dev
```

Open <http://localhost:3000>.

Every interview starts behind Cloudflare Turnstile. `.env.example` lists the
site keys: Cloudflare's test keys for development and the real key for
production. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` must be set; `bun run dev` and
builds fail without it.

## Checks

```zsh
bun run lint-fix
bun run typecheck
```

## Routes

| Path            | Screen                    |
| --------------- | ------------------------- |
| `/`             | Invitation                |
| `/q/[position]` | Question and Rhea's reply |
| `/result`       | Verdict and details       |

## License

MIT, see [LICENSE](LICENSE).
