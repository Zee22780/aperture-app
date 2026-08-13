# Aperture

A layout helper for a hand-drawn travel journal.

You give it a memory — a few photos, a title, a caption, the date, where you were. It suggests the three page layouts that suit it best, out of eleven, and tells you why it picked each one. What you get back is a rough sketch of where things go, not a finished page. The idea is to give someone who's about to draw a spread by hand a place to start, not to draw it for them.

Still being built. Signing in, the database, and the visual design are done; uploading photos and the actual matching aren't yet.

## How it works

The app sends your photos and words to an AI model, along with the full list of eleven layouts, and asks it to choose the best three and explain each choice.

Then ordinary code checks its homework. Every layout the model names has to be one that really exists. If it invents one, the app asks again. If that fails too, it drops the suggestions entirely and just shows you all eleven layouts — better to admit it has no strong opinion than to make one up.

Two rules are built into the structure rather than left to the model's discretion:

- **Nothing about who is in your photos is ever recorded** — not gender, not ethnicity, not age. The model isn't asked to avoid this. The form it fills in has no box for it, so there's nowhere to put it.
- **Your photos never reach the logs.** Only the text of what was decided.

## Built with

| | |
|---|---|
| Framework | Next.js, TypeScript |
| Styling | Tailwind CSS |
| Database | Postgres, hosted on Neon |
| Signing in | Auth.js with Google |
| Photo storage | Vercel Blob |
| Package manager | pnpm |

## Running it locally

You'll need Node 20 or newer, and pnpm (run `corepack enable` if you don't have it).

```bash
pnpm install
cp .env.example .env.local   # fill in DATABASE_URL — that's the only one needed to start
pnpm db:migrate              # set up the database tables
pnpm db:seed                 # load the eleven layouts
pnpm dev
```

Then open `localhost:3000`. `.env.example` lists every setting the finished app uses, but you only need the database one to get it running.

### Commands

| | |
|---|---|
| `pnpm dev` | start the dev server |
| `pnpm build` | build for production |
| `pnpm lint` | check the code |
| `pnpm db:generate` | create a database migration after changing the schema |
| `pnpm db:migrate` | apply any migrations that haven't run |
| `pnpm db:seed` | load the eleven layouts (safe to run again) |
| `pnpm db:studio` | browse the database in a UI |

## The eleven layouts

They live in `src/lib/db/templates.ts` and get loaded into the database from there, so edit that file and re-run `pnpm db:seed` rather than changing the database by hand.

They come in two groups. Eight **editorial** layouts, built on grids and big type, which suit documenting a day. Three **cinematic** ones, borrowed from old illustrated movie posters, for memories that want a bit more drama.
