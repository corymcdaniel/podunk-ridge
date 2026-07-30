# Podunk Ridge Colony Log

A RimWorld colony blog styled like an early-2000s frontier website — scrolling
marquee ticker, table layout, a "site meter" hit counter, guestbook, and a
retro admin panel. Built with Next.js (App Router, plain JS, no TypeScript)
and deployed on Netlify, using **Netlify Blobs** as the only data store (no
separate database to provision).

## What's where

- `app/` — pages (public site + `/admin`) and API routes (`app/api/*`)
- `components/` — shared UI, including the CSS-illustrated post scenes
  (`SceneArt.js`) used when a post has no uploaded cover photo
- `lib/blobStores.js` — one helper per Blobs store: `posts`, `colonists`,
  `guestbook`, `meta` (vitals + hit counter), `post-images`
- `lib/auth.js` + `middleware.js` — single-password admin login, signed
  cookie session (no third-party auth provider, no user accounts)

## Data model (all in Netlify Blobs)

| Store | Key(s) | Contents |
|---|---|---|
| `posts` | `index` | array of post summaries, used for the listing page |
| `posts` | `post:<slug>` | full post (summary fields + `content`) |
| `colonists` | `list` | array of colonist objects |
| `guestbook` | `entries` | array of guestbook entries, newest first |
| `meta` | `vitals` | the ticker/sidebar stats (population, wealth, mood, etc.) |
| `meta` | `hits` | the running hit counter |
| `post-images` | `<generated key>` | raw bytes of uploaded cover photos |

Everything is read fresh on every request (`export const dynamic = "force-dynamic"`
on pages that read from Blobs), so admin edits show up immediately — there's
no build step to re-trigger.

## Local development

```bash
npm install
netlify link      # connect this folder to a Netlify site (or `netlify init` to create one)
netlify dev        # runs Next.js + emulates Blobs + Functions locally
```

`netlify dev` is important here rather than plain `next dev` — it's what
makes `@netlify/blobs` work locally without any extra configuration.

Create a `.env` file (gitignored) based on `.env.example` and set your own
`ADMIN_PASSWORD`.

## Deploying

1. Push this repo to GitHub (or wherever you connect Netlify to).
2. In the Netlify dashboard: **Add new site → Import an existing project**,
   point it at the repo. The `netlify.toml` already wires up
   `@netlify/plugin-nextjs`, so no build settings need to change.
3. In **Site settings → Environment variables**, add `ADMIN_PASSWORD` with
   whatever password you want to use to log into `/admin`.
4. Deploy. Netlify Blobs needs zero additional setup — the stores are
   created automatically the first time each one is written to.

## Using it

- Visit `/admin`, log in with your password, and:
  - **Posts** → write a new colony log entry. Either upload a screenshot as
    the cover image, or pick one of the four generated scenes (sunset, fire,
    storm, harvest) — either way the title overlays on top, same as the
    mockup.
  - **Colonists** → add/edit/remove roster entries (name, role, status, bio).
  - **Guestbook** → delete anything spammy; visitors can sign it from the
    public `/guestbook` page without logging in.
  - **Colony Vitals** → updates the scrolling ticker and the sidebar stats
    widget (population, wealth, mood, last raid, etc.) — update this
    whenever something changes in-game.
- The hit counter in the sidebar increments on every page load automatically,
  no setup needed.

## Notes / things you might want to change later

- **Auth is intentionally minimal.** One shared password, one cookie,
  7-day session. Fine for a personal blog only you administer. If you ever
  want per-user accounts, audit logs, or 2FA, swap in a real auth provider
  (e.g. Clerk or Auth0) rather than extending this.
- **Blobs vs. Netlify DB:** this uses Blobs for everything, which is plenty
  for a personal blog's scale. If the guestbook ever needs moderation
  queues, search, or you want relational queries across posts/colonists,
  that's the point where migrating to Netlify DB (Postgres via Neon) would
  start to pay off — `netlify db init` and the `@netlify/neon` package are
  the entry points for that.
- **Image uploads** are capped at 8MB in `app/api/upload/route.js`. Netlify
  Blobs itself doesn't resize or optimize images, so very large screenshots
  will be served as-is — worth compressing before upload if that matters to
  you.
- The `@netlify/blobs` API surface has shifted a little across versions; if
  a method in `lib/blobStores.js` or the API routes throws at runtime, check
  it against the current docs at
  https://docs.netlify.com/build/data-and-storage/netlify-blobs/
