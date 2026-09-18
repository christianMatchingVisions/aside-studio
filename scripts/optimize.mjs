#!/usr/bin/env node
/**
 * Turns raw source + generated imagery into optimised web assets in /public.
 * Run after gen-images.mjs and cutout.py. Idempotent.
 *   node scripts/optimize.mjs
 */
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const SRC = resolve(root, "source-assets");
const GEN = resolve(root, "generated");
const PUB = resolve(root, "public");

const jobs = [
  // ---- brand ----
  { in: `${SRC}/current-site/logo.png`, out: "brand/astudio-logo.png", w: 1200, png: true },
  { in: `${SRC}/user/game_doof_logo.png`, out: "brand/doof-troop-logo.png", w: 1200, png: true },
  { in: `${SRC}/current-site/game_quickdraw_logo.png`, out: "brand/quickdraw-logo.png", w: 900, png: true },
  { in: `${SRC}/current-site/game_racing_logo.png`, out: "brand/doof-racing-logo.png", w: 900, png: true },

  // ---- character cutouts ----
  { in: `${GEN}/cutouts/doof-red.png`, out: "chars/doof-red.png", w: 1000, png: true },
  { in: `${GEN}/cutouts/doof-green.png`, out: "chars/doof-green.png", w: 420, png: true },
  { in: `${GEN}/cutouts/doof-pink.png`, out: "chars/doof-pink.png", w: 340, png: true },
  { in: `${GEN}/cutouts/doof-purple.png`, out: "chars/doof-purple.png", w: 360, png: true },
  { in: `${GEN}/cutouts/doof-yellow-spots.png`, out: "chars/doof-yellow-spots.png", w: 420, png: true },
  { in: `${GEN}/cutouts/doof-blue-small.png`, out: "chars/doof-blue.png", w: 220, png: true },
  { in: `${SRC}/current-site/char_right.png`, out: "chars/doof-yellow.png", w: 600, png: true },
  { in: `${SRC}/current-site/char_left.png`, out: "chars/cowboy.png", w: 480, png: true },

  // ---- scene art (user renders) ----
  { in: `${SRC}/user/DT_Thumbnail_Landscape.png`, out: "scenes/troop-landscape.webp", w: 1800 },
  { in: `${SRC}/user/DT_Thumbnail_Portrait.png`, out: "scenes/troop-portrait.webp", w: 1000 },
  { in: `${SRC}/user/DT_Thumbnail_Icon.png`, out: "scenes/troop-square.webp", w: 900 },
  { in: `${SRC}/user/DT_Thumbnail_Base.png`, out: "scenes/doof-city.webp", w: 1800 },

  // ---- screenshots ----
  ...[1, 2, 3].map((i) => ({ in: `${SRC}/current-site/doof_${i}.png`, out: `shots/doof-${i}.webp`, w: 1400 })),
  ...[1, 2, 3].map((i) => ({ in: `${SRC}/current-site/quick_${i}.png`, out: `shots/quick-${i}.webp`, w: 1400 })),

  // ---- team ----
  { in: `${SRC}/current-site/team_1.jpeg`, out: "team/dennis.webp", w: 600, square: true },
  { in: `${SRC}/current-site/team_2.jpeg`, out: "team/jonas.webp", w: 600, square: true },
  { in: `${SRC}/current-site/team_3.jpeg`, out: "team/victor.webp", w: 600, square: true },
  { in: `${SRC}/current-site/team_4.jpg`, out: "team/louis.webp", w: 600, square: true },
  { in: `${SRC}/current-site/team_5.jpg`, out: "team/andrew.webp", w: 600, square: true },

  // ---- generated backgrounds ----
  { in: `${GEN}/hero-sky.png`, out: "gen/hero-sky.webp", w: 1920 },
  { in: `${GEN}/cutouts/hero-buildings-far.png`, out: "gen/hero-buildings-far.png", w: 1920, png: true, optional: true },
  { in: `${GEN}/cutouts/hero-buildings-near.png`, out: "gen/hero-buildings-near.png", w: 1920, png: true, optional: true },
  { in: `${GEN}/hero-ground.png`, out: "gen/hero-ground.webp", w: 1920 },
  { in: `${GEN}/cutouts/dust-cloud.png`, out: "gen/dust-cloud.png", w: 900, png: true, optional: true },
  { in: `${GEN}/bg-halftone.png`, out: "gen/halftone.webp", w: 512 },
  { in: `${GEN}/cutouts/bg-speedlines.png`, out: "gen/speedlines.png", w: 1600, png: true, optional: true },
  { in: `${GEN}/bg-wildwest.png`, out: "gen/wildwest.webp", w: 1920 },
  { in: `${GEN}/bg-racetrack.png`, out: "gen/racetrack.webp", w: 1920 },

  // ---- generated icons + stickers (background stripped by cutout.py icons) ----
  ...[
    "stopwatch", "multiplier", "dice", "controller", "crowd", "engine", "chips", "trophy", "flag", "finishflag", "revolver", "cowboyhat", "eye", "18plus",
  ].map((n) => ({ in: `${GEN}/cutouts/icon-${n}.png`, out: `icons/${n}.png`, w: 256, png: true, optional: true })),
  ...["star", "bolt", "pow", "cone", "cloud", "coin"].map((n) => ({ in: `${GEN}/cutouts/sticker-${n}.png`, out: `stickers/${n}.png`, w: 240, png: true, optional: true })),
];

let ok = 0, skipped = 0;
for (const j of jobs) {
  if (!existsSync(j.in)) {
    if (!j.optional) console.warn(`missing ${j.in}`);
    skipped++;
    continue;
  }
  const outPath = resolve(PUB, j.out);
  mkdirSync(resolve(outPath, ".."), { recursive: true });
  let img = sharp(j.in).rotate();
  if (j.square) img = img.resize({ width: j.w, height: j.w, fit: "cover", position: "attention" });
  else img = img.resize({ width: j.w, withoutEnlargement: true });
  // "png" jobs carry alpha; WebP keeps the alpha at a fraction of the size
  if (j.png) await img.webp({ quality: 88, alphaQuality: 90 }).toFile(outPath.replace(/\.png$/, ".webp"));
  else await img.webp({ quality: 82 }).toFile(outPath);
  ok++;
}
console.log(`optimised ${ok}, skipped ${skipped}`);
