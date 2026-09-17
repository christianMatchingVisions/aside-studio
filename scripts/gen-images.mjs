#!/usr/bin/env node
/**
 * Local-only asset generator. Reads OPENAI_API_KEY from .env.local,
 * writes PNGs to ./generated/<name>.png. Never imported by app code.
 *
 * Usage:
 *   node scripts/gen-images.mjs            # generate every job not yet on disk
 *   node scripts/gen-images.mjs hero-sky   # generate one job (force re-run)
 *   node scripts/gen-images.mjs --list
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const env = Object.fromEntries(
  readFileSync(resolve(root, ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);
const KEY = env.OPENAI_API_KEY;
if (!KEY) throw new Error("OPENAI_API_KEY missing from .env.local");

const OUT = resolve(root, "generated");
mkdirSync(OUT, { recursive: true });

const STYLE_FLAT =
  "Flat vector sticker illustration, thick rounded dark-chocolate outline, bold saturated candy colours (tomato red, sunflower yellow, lime green, bubblegum pink, sky blue, grape purple), soft single-tone shading, slight glossy highlight, playful toy-like feel like a modern party game UI. Centered, single object, generous padding, no text, no letters, no watermark.";
const STYLE_SCENE =
  "Stylised 3D cartoon render, chunky rounded shapes, warm saturated colours, soft global illumination, shallow depth of field, clean and polished like a modern animated feature film. No characters, no people, no creatures, no text, no letters, no logos.";

/** @type {Record<string, {prompt:string,size?:"1024x1024"|"1536x1024"|"1024x1536",transparent?:boolean,quality?:"low"|"medium"|"high"}>} */
const JOBS = {
  // ---- hero parallax layers (city, no characters) ----
  "hero-sky": {
    size: "1536x1024",
    quality: "high",
    prompt: `${STYLE_SCENE} Wide warm golden-hour sky over a cartoon downtown, fluffy peach and cream clouds, soft sun glow, only the very tops of a few distant brick skyscrapers along the bottom edge, mostly open sky. Bright cheerful palette.`,
  },
  "hero-buildings-far": {
    size: "1536x1024",
    quality: "high",
    transparent: true,
    prompt: `${STYLE_SCENE} A row of distant cartoon brick skyscrapers and mid-rise buildings with lit windows, water towers and rooftop details, viewed from street level, slightly hazy warm colour, isolated on a transparent background, bottom edge flat so it can be layered as a parallax cutout.`,
  },
  "hero-buildings-near": {
    size: "1536x1024",
    quality: "high",
    transparent: true,
    prompt: `${STYLE_SCENE} Foreground cartoon city street elements for a parallax layer: a black lamp post with glowing purple neon rings, a traffic light, a fire hydrant, a street sign, a small green tree in a planter, a couple of orange traffic cones. Spread across the width, isolated on transparent background, no ground plane.`,
  },
  "hero-ground": {
    size: "1536x1024",
    quality: "medium",
    prompt: `${STYLE_SCENE} Looking down at a wide cartoon city pavement of large grey stone slabs with subtle grout lines, low camera angle, slight perspective toward the horizon at the top, warm bounce light, nothing else in frame.`,
  },
  "dust-cloud": {
    size: "1024x1024",
    quality: "medium",
    transparent: true,
    prompt: `${STYLE_SCENE} A puffy cartoon dust cloud burst with small flying pebbles and debris chunks, cream and tan colours, soft edges, isolated on transparent background, like a character just skidded to a stop.`,
  },

  // ---- section backdrops ----
  "bg-halftone": {
    size: "1024x1024",
    quality: "low",
    prompt: `Seamless tileable comic halftone dot pattern, small evenly spaced dots, single flat colour dots on pure white, subtle, no gradient, no text.`,
  },
  "bg-speedlines": {
    size: "1536x1024",
    quality: "medium",
    transparent: true,
    prompt: `Comic book radial speed lines bursting from the centre outward to all edges, hand-inked black tapered strokes, energetic manga action style, isolated on transparent background, centre area left empty, no text.`,
  },
  "bg-wildwest": {
    size: "1536x1024",
    quality: "high",
    prompt: `${STYLE_SCENE} A cartoon Wild West main street at high noon: wooden saloon facades, a hotel sign, wooden barrels, hitching posts, dusty sand road, hard sunlight and long shadows, warm ochre and terracotta palette, wide shot, empty street.`,
  },
  "bg-racetrack": {
    size: "1536x1024",
    quality: "medium",
    prompt: `${STYLE_SCENE} A cartoon race track start line seen from low angle: chequered flag pattern on the asphalt, red-and-white curb, tyre stacks, a starting gantry with three round lights, stadium blur in the distance, bright and clean.`,
  },

  // ---- feature icons (flat sticker) ----
  "icon-stopwatch": { prompt: `${STYLE_FLAT} A chunky stopwatch showing sixty seconds with a small lightning bolt.` , transparent: true },
  "icon-multiplier": { prompt: `${STYLE_FLAT} A big bold "x" multiplication symbol badge with a sparkle burst behind it, coin-like gold rim.`, transparent: true },
  "icon-dice": { prompt: `${STYLE_FLAT} Two rounded dice mid-tumble with a small shield behind them, representing fairness and certified RNG.`, transparent: true },
  "icon-controller": { prompt: `${STYLE_FLAT} A rounded game controller with two thumbsticks and four colourful face buttons.`, transparent: true },
  "icon-crowd": { prompt: `${STYLE_FLAT} Three overlapping speech bubbles in different colours with hearts and stars, representing a social live audience.`, transparent: true },
  "icon-engine": { prompt: `${STYLE_FLAT} A gear cog with a small glowing cube inside, representing a real-time game engine.`, transparent: true },
  "icon-chips": { prompt: `${STYLE_FLAT} A short stack of three casino chips in red, green and yellow.`, transparent: true },
  "icon-trophy": { prompt: `${STYLE_FLAT} A gold trophy cup with a small star on it.`, transparent: true },
  "icon-flag": { prompt: `${STYLE_FLAT} A waving chequered racing flag on a short pole.`, transparent: true },
  "icon-revolver": { prompt: `${STYLE_FLAT} A cartoon toy cowboy revolver with a wooden grip, side view, harmless toy style.`, transparent: true },
  "icon-cowboyhat": { prompt: `${STYLE_FLAT} A cartoon cowboy hat, front view.`, transparent: true },
  "icon-eye": { prompt: `${STYLE_FLAT} A big round cartoon googly eye with a highlight, like a party game character eye.`, transparent: true },
  "icon-18plus": { prompt: `${STYLE_FLAT} A round badge reading the number 18 with a plus sign, bold white digits on a dark red circle, clean and legible.`, transparent: true, quality: "high" },

  // ---- decorative stickers ----
  "sticker-star": { prompt: `${STYLE_FLAT} A chunky five-point star.`, transparent: true, quality: "low" },
  "sticker-bolt": { prompt: `${STYLE_FLAT} A chunky lightning bolt.`, transparent: true, quality: "low" },
  "sticker-pow": { prompt: `${STYLE_FLAT} A comic explosion burst shape, jagged edges, yellow inside orange, empty centre.`, transparent: true, quality: "low" },
  "sticker-cone": { prompt: `${STYLE_FLAT} An orange traffic cone with a white stripe.`, transparent: true, quality: "low" },
  "sticker-cloud": { prompt: `${STYLE_FLAT} A puffy cream cartoon cloud.`, transparent: true, quality: "low" },
  "sticker-coin": { prompt: `${STYLE_FLAT} A gold coin with a star embossed on it.`, transparent: true, quality: "low" },
};

async function generate(name, job) {
  const body = {
    model: "gpt-image-1",
    prompt: job.prompt,
    size: job.size ?? "1024x1024",
    quality: job.quality ?? "medium",
    n: 1,
    output_format: "png",
  };
  if (job.transparent) body.background = "transparent";
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${name}: ${res.status} ${await res.text()}`);
  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error(`${name}: no image in response`);
  writeFileSync(resolve(OUT, `${name}.png`), Buffer.from(b64, "base64"));
  return json.usage;
}

const args = process.argv.slice(2);
if (args.includes("--list")) {
  console.log(Object.keys(JOBS).join("\n"));
  process.exit(0);
}
const only = args.filter((a) => !a.startsWith("--"));
const names = only.length ? only : Object.keys(JOBS).filter((n) => !existsSync(resolve(OUT, `${n}.png`)));

let done = 0;
const queue = [...names];
async function worker() {
  while (queue.length) {
    const name = queue.shift();
    const job = JOBS[name];
    if (!job) { console.error(`unknown job ${name}`); continue; }
    const t = Date.now();
    try {
      await generate(name, job);
      done++;
      console.log(`ok   ${name} (${((Date.now() - t) / 1000).toFixed(0)}s)`);
    } catch (e) {
      console.error(`FAIL ${name}: ${e.message.slice(0, 300)}`);
    }
  }
}
await Promise.all(Array.from({ length: 3 }, worker));
console.log(`\n${done}/${names.length} generated -> ${OUT}`);
