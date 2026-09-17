import Image from "next/image";
import { games, site, type Game } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { cn } from "@/lib/utils";

export function Games() {
  const [doof, quickdraw, racing] = games;
  return (
    <section id="games" className="relative scroll-mt-20 pt-24 sm:pt-32">
      <div className="container-x">
        <SectionHeading kicker="Explore games" lines={["Built to be watched.", "Made to be played."]} color="yellow" align="center" className="mx-auto max-w-3xl [&_h2]:text-sticker" />
        <p data-reveal className="mx-auto mt-6 max-w-2xl text-center text-lg text-ink-2 sm:text-xl">
          Short rounds, big moments, and characters people remember. Every title runs in real time on our engine and plugs into standard RNG and RGS stacks.
        </p>
      </div>

      <DoofTroop game={doof} />
      <Quickdraw game={quickdraw} />
      <Racing game={racing} />
    </section>
  );
}

/* ---------------------------------------------------------------- */

function Features({ game, cols = 2 }: { game: Game; cols?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-3", cols === 2 && "sm:grid-cols-2")}>
      {game.features.map((f) => (
        <li key={f.text} data-reveal className="card-soft flex items-center gap-4 p-4">
          <Image src={f.icon} alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
          <span className="font-medium leading-snug text-ink">{f.text}</span>
        </li>
      ))}
    </ul>
  );
}

function Specs({ game }: { game: Game }) {
  return (
    <dl data-reveal className="card-hard overflow-hidden">
      <div className="border-b-[2.5px] border-(--line-strong) bg-surface-2 px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-ink-2">
        Game facts
      </div>
      {game.specs.map((s, i) => (
        <div key={s.label} className={cn("flex items-baseline justify-between gap-6 px-5 py-3", i < game.specs.length - 1 && "border-b border-(--line)")}>
          <dt className="text-ink-2">{s.label}</dt>
          <dd className="font-display text-lg font-bold text-ink">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Shots({ game }: { game: Game }) {
  const rots = ["-1.5deg", "1deg", "-0.6deg"];
  return (
    <ul className="grid gap-5 sm:grid-cols-3">
      {game.shots.map((s, i) => (
        <li key={s} data-reveal="pop" style={{ ["--rot" as string]: rots[i] }} className="group relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] border-[2.5px] border-(--line-strong) bg-choc shadow-[5px_6px_0_var(--shadow-ink)] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0">
          <Image src={s} alt={`${game.name} gameplay screenshot ${i + 1}`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </li>
      ))}
    </ul>
  );
}

function StatusPill({ game }: { game: Game }) {
  const live = game.status === "live";
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border-2 border-(--line-strong) px-3 py-1 font-display text-sm font-bold uppercase tracking-wider", live ? "bg-green text-choc" : "bg-surface text-ink")}>
      <span className={cn("h-2 w-2 rounded-full", live ? "bg-choc" : "bg-orange")} />
      {live ? "Live" : "Coming soon"}
    </span>
  );
}

/* ---------------------------------------------------------------- */

function DoofTroop({ game }: { game: Game }) {
  return (
    <article className="relative mt-20 overflow-hidden" aria-labelledby="game-doof">
      <div className="absolute inset-0 -z-10 bg-yellow/25 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] dark:bg-yellow/8" />
      <div className="pointer-events-none absolute inset-0 -z-10 text-yellow-deep bg-stripes opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] dark:opacity-15" />

      <div className="container-x py-20 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div data-reveal="pop" className="relative aspect-[4096/3472] w-[min(70vw,300px)] sm:w-[340px]">
              <Image src={game.logo} alt="" fill sizes="340px" className="object-contain object-left" />
            </div>
            <div className="mt-2 flex items-center gap-3">
              <StatusPill game={game} />
              <span className="text-sm font-semibold text-ink-3">Our first title</span>
            </div>
            <h3 id="game-doof" data-reveal className="mt-5 text-[clamp(1.9rem,4vw,2.8rem)] text-ink">
              {game.tagline}
            </h3>
            {game.description.map((p) => (
              <p key={p.slice(0, 20)} data-reveal className="mt-4 text-lg leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
          </div>
          <div data-reveal="right">
            <VideoEmbed id={site.youtube.doofTroop} title="Doof Troop trailer" poster="/scenes/doof-city.webp" />
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Features game={game} />
          <Specs game={game} />
        </div>
      </div>

      {/* stampede banner */}
      <div className="relative h-[52vw] max-h-[620px] min-h-[280px] overflow-hidden border-y-[3px] border-(--line-strong)">
        <ParallaxImage src="/scenes/troop-landscape.webp" alt="The whole Doof Troop stampeding down a city street" speed={0.25} priority={false} />
        <div className="absolute inset-x-0 bottom-0 flex justify-center p-6">
          <p className="display text-sticker-sm text-center text-[clamp(1.6rem,5vw,3.6rem)] text-cream">Every round is a stampede.</p>
        </div>
      </div>

      <div className="container-x py-16 sm:py-20">
        <Shots game={game} />
      </div>
    </article>
  );
}

function Quickdraw({ game }: { game: Game }) {
  return (
    <article className="relative overflow-hidden" aria-labelledby="game-quickdraw">
      <div className="absolute inset-0 -z-20">
        <Image src="/gen/wildwest.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-(--bg) via-(--bg)/70 to-(--bg)" />
        <div className="absolute inset-0 bg-orange/15 mix-blend-multiply dark:bg-orange/5" />
      </div>

      <div className="container-x py-20 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
          <div>
            <div data-reveal="pop" className="relative aspect-[929/594] w-[min(70vw,300px)] sm:w-[340px]">
              <Image src={game.logo} alt="" fill sizes="340px" className="object-contain object-left" />
            </div>
            <div className="mt-2">
              <StatusPill game={game} />
            </div>
            <h3 id="game-quickdraw" data-reveal className="mt-5 text-[clamp(1.9rem,4vw,2.8rem)] text-ink">
              {game.tagline}
            </h3>
            {game.description.map((p) => (
              <p key={p.slice(0, 20)} data-reveal className="mt-4 text-lg leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
          </div>

          <div data-reveal="right" className="relative mx-auto w-[min(70vw,360px)] lg:w-full lg:max-w-[420px]">
            <div className="absolute inset-x-[10%] bottom-[-4%] h-8 rounded-[50%] bg-choc/30 blur-md" />
            <Image src="/chars/cowboy.webp" alt="A Quickdraw Royale gunslinger, hand hovering over his holster" width={480} height={790} style={{ height: "auto" }} className="relative w-full drop-shadow-[0_22px_24px_rgba(42,27,18,.4)]" />
            <div data-reveal="pop" style={{ ["--rot" as string]: "-10deg" }} className="absolute -left-6 top-[8%] w-24 sm:w-28">
              <Image src="/icons/cowboyhat.webp" alt="" width={120} height={110} style={{ height: "auto" }} className="bob w-full" />
            </div>
            <div data-reveal="pop" style={{ ["--rot" as string]: "12deg" }} className="absolute -right-4 top-[40%] w-20 sm:w-24">
              <Image src="/stickers/star.webp" alt="" width={100} height={100} style={{ height: "auto" }} className="bob w-full [animation-delay:.8s]" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Features game={game} />
          <Specs game={game} />
        </div>

        <div className="mt-16">
          <Shots game={game} />
        </div>
      </div>
    </article>
  );
}

function Racing({ game }: { game: Game }) {
  return (
    <article className="container-x py-16 sm:py-24" aria-labelledby="game-racing">
      <div data-reveal className="card-hard relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/gen/racetrack.webp" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-choc/85 via-choc/60 to-choc/20" />
        </div>
        <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
          <div>
            <StatusPill game={game} />
            <div className="relative mt-4 aspect-[1024/830] w-[min(60vw,280px)]">
              <Image src={game.logo} alt="" fill sizes="280px" className="object-contain object-left" />
            </div>
            <h3 id="game-racing" className="mt-4 text-[clamp(1.8rem,3.6vw,2.6rem)] text-cream">
              {game.tagline}
            </h3>
            <p className="mt-3 max-w-md text-lg text-cream/80">Same chaos, more horsepower. Want early access for your platform? Get in touch.</p>
            <div className="mt-6">
              <Magnetic>
                <Button href={`mailto:${site.email}?subject=Doof%20Troop%20Racing%20early%20access`} variant="red">
                  Ask about early access
                </Button>
              </Magnetic>
            </div>
          </div>
          <div className="hidden w-40 lg:block">
            <Image src="/icons/flag.webp" alt="" width={200} height={200} style={{ height: "auto" }} className="bob w-full" />
          </div>
        </div>
      </div>
    </article>
  );
}
