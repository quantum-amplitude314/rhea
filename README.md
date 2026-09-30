# The Rhea Project

Interactive fiction shaped like a Voight-Kampff test. Rhea, a synthetic being,
asks five questions and you answer in your own words. A small Mistral AI model
categorizes each answer; the app's own algorithm and data model decide how Rhea
replies and what the final verdict is.

## What is in this repository

This repository is the public frontend only.

- `app/`, `components/`, `lib/`: Next.js 16 frontend, deployed to Cloudflare
  Workers with OpenNext.
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
  call the API through a server-only oRPC client (`lib/api.ts`) built from
  `contracts/`, forwarding the HttpOnly `rhea_session` cookie.
- `lib/api-transport.ts` picks the transport:

| Mode | Transport |
| --- | --- |
| `bun run dev` | HTTP to `API_URL` (default `http://127.0.0.1:3001`) |
| `bun run preview` | Service binding `API` to the local `rhea-api` dev server (Wrangler dev registry) |
| `bun run deploy` | Service binding `API` to the deployed `rhea-api` Worker |

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

| Path | Screen |
| --- | --- |
| `/` | Invitation |
| `/q/[position]` | Question and Rhea's reply |
| `/result` | Verdict and details |

## License

MIT, see [LICENSE](LICENSE).
