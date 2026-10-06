# The Rhea Project

![The Rhea Project: Do you dream or remember?](apps/web/app/opengraph-image.jpg)

A modern Voight-Kampff test adaptation.
Rhea, a synthetic being, asks five questions and you answer in your own words.
A small Mistral AI model categorizes each answer.
The app's own algorithm and data model decide how Rhea replies and what the final verdict is.

## What is in this repository

The frontend (`apps/web`) and the API contract (`packages/contracts`). The API is not
included: implement `@rhea/contracts` in `apps/api` with any model or stack, recommending,
for example, the new Cloudflare [Clef](https://blog.cloudflare.com/clef-decision-models/),
released on 2026-10-01.

## Architecture

```text
Browser ──► Next.js on Cloudflare Workers ──► rhea-api Worker
            Server Components                  questions, classification,
            Server Actions                     scoring, storage
```

- The browser talks only to the Next.js app. Server Components and Server Actions
  call the API through a server-only oRPC client (`apps/web/server/api.ts`) built from
  `@rhea/contracts`, forwarding the HttpOnly `rhea_session` cookie.
- Every mode reaches the API through the `API` service binding: `bun run dev:web` and,
  in `apps/web`, `bun run preview` connect to the local `rhea-api` dev server through Wrangler's
  dev registry, `bun run deploy` to the deployed `rhea-api` Worker.

## Setup

```zsh
curl -fsSL https://bun.com/install | bash   # see https://bun.com/docs/installation
bun add -g @biomejs/biome                   # or bun add -d @biomejs/biome
bun install
cp apps/web/.env.example apps/web/.env.local
```

## Development

```zsh
bun run dev:api   # your API in apps/api
bun run dev:web
```

## Checks

```zsh
bun run lint-fix
bun run typecheck
```

## License

MIT, see [LICENSE](LICENSE).
