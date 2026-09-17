# Astudio Gaming — website

Marketing site for [Astudio Gaming](https://astudiogaming.com) with Doof Troop as the hero. Next.js 16, TypeScript, Tailwind v4, GSAP + Lenis, light/dark theme, Vercel Analytics.

See `BRIEF.md` for the design and content decisions the site is built on.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | All copy, games, team, contact details. Edit text here. |
| `src/app/page.tsx` | Home page composition |
| `src/app/{privacy,terms,cookies,responsible-gaming}/` | Legal pages (draft boilerplate, flagged for legal review) |
| `src/components/sections/` | Hero, Marquee, WhatWeDo, Games, Team, Contact |
| `src/components/layout/` | Nav, Footer, IntroOverlay, LegalPage |
| `src/components/motion/` | Scroll reveals, parallax image |
| `src/app/globals.css` | Design tokens (palette, radii, shadows), light/dark, utilities |
| `public/` | Optimised assets (WebP). Regenerate with the scripts below. |

## Asset pipeline (local only)

Raw imagery lives in `source-assets/` and `generated/` (both git-ignored).

```bash
node scripts/gen-images.mjs      # OpenAI image generation -> generated/
python scripts/cutout.py         # character cutouts (rembg) -> generated/cutouts/
python scripts/cutout.py icons   # strip backgrounds from generated icons/stickers
node scripts/optimize.mjs        # resize + WebP -> public/
```

`scripts/gen-images.mjs` reads `OPENAI_API_KEY` from `.env.local`. That file is git-ignored and is never imported by application code, so the key is not part of the deployed site. Copy `.env.example` to `.env.local` to set it up.

## Deploy

The project is set up for Vercel. `vercel` for a preview, `vercel --prod` for production.
