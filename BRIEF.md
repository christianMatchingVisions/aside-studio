# Astudio Gaming — Website Rebuild Brief

Compiled 2026-09-17 from 44 interview answers. This is the source of truth for the build.

## 1. Project

| Item | Decision |
|---|---|
| Scope | Full replacement of astudiogaming.com, Doof Troop is the hero |
| Audience | B2B operators first, with player-facing energy |
| Primary CTA | Explore the games (secondary: email contact) |
| Structure | Hybrid: cinematic single-page home + legal pages |
| Games | Doof Troop, Quickdraw Royale, Doof Troop Racing (coming soon) as sections on home |
| Team | 5 people with photos (pulled from current site) |
| Contact | Mailto link + full postal address + phone, no form |
| Language | English only |
| Naming | "Doof Troop" (singular). Characters unnamed, "the Doofs" / "the troop" |
| Copy | Reuse current site copy, tightened |
| Socials | None |
| Lead capture | None |
| Timeline | ASAP |

## 2. Design

| Item | Decision |
|---|---|
| Mood | Bright and playful, Nintendo / Fall Guys reference |
| Palette | Multi-colour from the troop on a warm neutral base. Hero red, doof yellow, troop green, pink, sky blue, purple (matches the Doof Troop logo: yellow + green + pink) |
| Type | Bold chunky rounded display + clean sans body |
| Theme | Light AND dark with toggle, respects system preference |
| Motion | Moderate: Lenis smooth scroll, GSAP parallax layers, section reveals, hover lifts |
| Hero | Red Doof cut out, city layers behind at different speeds, dust puff, speed lines |
| Interactions | Character eyes follow cursor, magnetic buttons, card hover lifts |
| Intro | ~1s branded intro on load |
| Easter egg | Click the hero Doof for a stumble/reaction animation |
| Sound | None |
| Nav | Classic sticky top bar, transparent over hero, solid on scroll |
| Footer | Contact block, legal links, 18+ badge, responsible gaming line, copyright |
| Mobile | Desktop first, mobile solid with reduced motion |

## 3. Content sections (home, in order)

1. Intro overlay (1s) then Hero: Doof Troop logo + red Doof parallax scene + "Making gambling feel like gaming"
2. What We Do (existing copy, 4 short paragraphs -> 4 value cards)
3. Games header "Explore Games"
4. Doof Troop: logo, description, YouTube embed (cXggi5TuvHk), feature list, spec table (~60s rounds, 2–100x, 94.74% RTP, multi-bet), 3 screenshots
5. Quickdraw Royale: logo, description, feature list, spec table (~30s rounds), 3 screenshots, cowboy cutout
6. Doof Troop Racing: logo, "Coming soon" teaser
7. Team: 5 cards with photos
8. Contact: address, email, phone
9. Footer

Legal pages: /privacy, /terms, /cookies (drafted boilerplate, flagged for legal review). Also /responsible-gaming short page.

## 4. Compliance

- 18+ badge in footer and near game sections
- Responsible gaming line in footer
- Legal pages as above
- Game stats shown subtly in spec tables, not as hype counters

## 5. Tech

- Next.js 16 App Router, TypeScript strict, Tailwind v4
- GSAP + ScrollTrigger + Lenis for motion, `prefers-reduced-motion` fallbacks
- next/image for all raster assets, WebP/AVIF output
- Vercel Analytics (cookieless), no cookie banner
- Dark/light via `next-themes`
- No CMS, content in `src/content/*.ts`
- Git repo: https://github.com/christianMatchingVisions/aside-studio.git
- Deploy: Vercel preview, domain undecided
- OpenAI key lives ONLY in `.env.local` (gitignored). Used by a local script in `scripts/` for asset generation, never imported by app code, never shipped.

## 6. Assets

Provided by user (root folder):
- `DT_Thumbnail_Base.png` (2400x1792) red Doof alone in city
- `DT_Thumbnail_Landscape.png` (2048x1536) troop stampede
- `DT_Thumbnail_Portrait.png` (1536x2048) troop stampede portrait
- `DT_Thumbnail_Icon.png` (1024x1024) troop square
- `game_doof_logo.png` (4096x3472, RGBA) Doof Troop logo

Downloaded from current site into `source-assets/current-site/`:
- `logo.png` Astudio Gaming wordmark (RGBA)
- `char_right.png` yellow Doof cutout (RGBA), `char_left.png` cowboy cutout (RGBA)
- `game_quickdraw_logo.png`, `game_racing_logo.png` (RGBA)
- `doof_1..3.png` gameplay screenshots, `quick_1..3.png` gameplay screenshots
- `team_1..5` headshots, `bg-*.png` old backgrounds, `doofy-favicon.png`

To produce:
- Cutouts: red Doof from Base image, 4–6 troop members from Landscape image (background removal)
- OpenAI generated (budget ~40 images): section backgrounds/textures (city skyline layers, dust, speed-line pattern, halftone), feature icons (stopwatch, multiplier, dice/RNG, controller, shield, chat bubble), decorative stickers, Wild West backdrop for Quickdraw section, OG image
- Style: flat/sticker style for icons so they do not fight the 3D characters; painterly 3D-ish for backgrounds

## 7. Copy (from current site)

**Tagline:** Making gambling feel like gaming

**What We Do:** At Astudio, we create a new generation of casino games, built like real games, not traditional slots. Our focus is on innovation, immersion, and entertainment, blending the excitement of modern video games with the structure and security of regulated casino experiences. By building our games in a state-of-the-art game engine, we deliver rich visuals, dynamic gameplay, and cinematic moments that feel alive on screen. We design experiences that are social by nature, made for live environments where communities gather, react, and engage together. Every game is crafted to be easy to understand, exciting to watch, and fun to play, whether you're participating directly or enjoying the action as it unfolds. Behind the scenes, our games are built with industry-standard RNG and RGS integrations, ensuring fairness, reliability, and seamless operation for operators, while still feeling fresh, modern, and interactive for players. In short, we combine game-industry craftsmanship with iGaming-grade technology to redefine what casino games can be.

**Doof Troop:** Doof Troop is a chaotic and fast-paced, physics-driven racing game, with memorable characters racing through obstacle-filled courses. With many tracks and dynamic elements, each race is totally unique and unpredictable. Being our first game, Doof Troop sets a new standard for modern casino games, built to create engaging moments for a younger audience.
- Chaotic, physics-driven race where every round is completely unique
- Modern rendering techniques and mechanics, rendered in real time
- Round ~60 seconds, including betting, race, and win
- Easy to understand and user-friendly betting system
- 2–100× multipliers & 94.74% RTP
- Play multiple bets per round

**Quickdraw Royale:** Quickdraw Royale is a Wild West–themed betting game built around fast, cinematic shootouts between iconic cowboy characters. In each round, players place bets on who will win the duel, how the shootout will unfold, or whether special events and multipliers will trigger. Once betting closes, the duel plays out live as a dramatic standoff, hands hovering over holsters, tension building, before the final shot decides the winner. By turning every round into a short, story-driven showdown, Quickdraw Royale keeps players watching, reacting, and betting round after round.
- Highly cinematic and art-directed gameplay
- Stylized, cartoony art style rendered in real time with modern post-processing
- Round ~30 seconds, including betting, shootout, and win
- Easy to understand and user-friendly betting system

**Doof Troop Racing:** Coming Soon

**Team:** Dennis Dyhr-Hansen (CEO / Co-Founder), Jonas Lutteman (COO / Co-Founder), Victor Skalin (Creative Director), Louis Hadfield "Haddzy" (Advisor), Andrew Crosby (Advisor)

**Contact:** Level 6 St. Julian's Business Centre, Elia Zammit Street, St. Julian's STJ 3153, Malta. Email victor@astudio.tv. Phone +356-79054304.

## 8. Build plan

1. Scaffold Next.js 16 + Tailwind v4 + GSAP/Lenis + next-themes, wire git remote
2. Asset pipeline: `scripts/cutout.py` (rembg) for character cutouts, `scripts/gen-images.mjs` (OpenAI gpt-image-1) for backgrounds/icons, optimise into `public/`
3. Design tokens: palette, type scale, radii, shadows, light/dark
4. Build sections top to bottom with content files
5. Motion pass: intro, hero parallax, eye tracking, reveals, magnetic buttons, easter egg, reduced-motion
6. Legal pages + 18+/RG footer
7. QA: Lighthouse, mobile, dark mode, reduced motion, build passes
8. Commit, push, deploy Vercel preview
