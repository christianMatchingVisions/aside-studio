"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { INTRO_EVENT } from "@/components/layout/IntroOverlay";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/content/site";

/** Pupil anchors on the red Doof cutout, as % of its box (measured on the 793x927 source). */
const EYES = [
  { cx: 44.4, cy: 9.6, r: 2.0 },
  { cx: 65.6, cy: 12.2, r: 1.9 },
];

/** Widths are % of the character stage so the composition scales from phone to desktop. */
const TROOP = [
  { src: "/chars/doof-green.webp", w: 420, pct: 24, cls: "left-[2%] top-[14%]", depth: 0.55, dir: -1, rot: -8 },
  { src: "/chars/doof-pink.webp", w: 340, pct: 19, cls: "left-[14%] top-[62%]", depth: 0.7, dir: -1, rot: 6 },
  { src: "/chars/doof-purple.webp", w: 360, pct: 21, cls: "right-[0%] top-[8%]", depth: 0.6, dir: 1, rot: 10 },
  { src: "/chars/doof-yellow-spots.webp", w: 420, pct: 22, cls: "right-[4%] top-[58%]", depth: 0.8, dir: 1, rot: -5 },
  { src: "/chars/doof-blue.webp", w: 220, pct: 13, cls: "left-[46%] top-[-5%]", depth: 0.4, dir: -1, rot: 14 },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const doof = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const q = gsap.utils.selector(el);

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(q("[data-in]"), { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      // ---- entrance (waits for the intro) ----
      gsap.set(q("[data-in]"), { opacity: 0 });
      const enter = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(q('[data-in="logo"]'), { scale: 0.6, rotation: -6, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: "back.out(1.8)" }, 0)
          .fromTo(q('[data-in="word"]'), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.07 }, 0.15)
          .fromTo(q('[data-in="copy"]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.5)
          .fromTo(q('[data-in="cta"]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, 0.6)
          .fromTo(q('[data-in="doof"]'), { x: 260, y: 40, rotation: 10, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.1, ease: "back.out(1.2)" }, 0.1)
          .fromTo(q('[data-in="dust"]'), { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.75)
          .fromTo(q('[data-in="lines"]'), { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9 }, 0.3)
          .fromTo(q('[data-in="troop"]'), { scale: 0, opacity: 0, rotation: () => gsap.utils.random(-40, 40) }, { scale: 1, opacity: 1, rotation: (_i, t) => Number((t as HTMLElement).dataset.rot), duration: 0.7, ease: "back.out(2)", stagger: { each: 0.08, from: "random" } }, 0.7);
      };
      if (window.__introDone) enter();
      else window.addEventListener(INTRO_EVENT, enter, { once: true });

      // ---- pointer parallax + eyes ----
      const layers = gsap.utils.toArray<HTMLElement>(q("[data-depth]")).map((l) => ({
        depth: Number(l.dataset.depth) || 0.3,
        x: gsap.quickTo(l, "x", { duration: 0.9, ease: "power3" }),
        y: gsap.quickTo(l, "y", { duration: 0.9, ease: "power3" }),
      }));
      const pupils = gsap.utils.toArray<HTMLElement>(q("[data-pupil]")).map((p) => ({
        x: gsap.quickTo(p, "xPercent", { duration: 0.35, ease: "power2" }),
        y: gsap.quickTo(p, "yPercent", { duration: 0.35, ease: "power2" }),
      }));
      const tiltX = gsap.quickTo(doof.current, "rotation", { duration: 0.8, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(-nx * 70 * l.depth);
          l.y(-ny * 40 * l.depth);
        });
        // look toward the cursor relative to the Doof's own position
        const r = doof.current?.getBoundingClientRect();
        if (r) {
          const dx = e.clientX - (r.left + r.width * 0.55);
          const dy = e.clientY - (r.top + r.height * 0.11);
          const ang = Math.atan2(dy, dx);
          const dist = Math.min(1, Math.hypot(dx, dy) / 500);
          pupils.forEach((p) => {
            p.x(Math.cos(ang) * 60 * dist);
            p.y(Math.sin(ang) * 45 * dist);
          });
          tiltX(nx * 6);
        }
      };
      if (window.matchMedia("(hover: hover)").matches) window.addEventListener("pointermove", onMove);

      // ---- scroll parallax ----
      gsap.utils.toArray<HTMLElement>(q("[data-scroll]")).forEach((l) => {
        gsap.to(l, {
          yPercent: -60 * (Number(l.dataset.scroll) || 0.4),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      });
      gsap.to(q("[data-fade]"), {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: el, start: "30% top", end: "80% top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(q("[data-dir]")).forEach((s) => {
        const dir = Number(s.dataset.dir);
        gsap.to(s, {
          x: () => dir * innerWidth * 0.45,
          rotation: dir * 120,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        });
      });

      return () => window.removeEventListener("pointermove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  /** Easter egg: the Doof stumbles when clicked. */
  const stumble = () => {
    const d = doof.current;
    if (!d || busy.current || prefersReducedMotion()) return;
    busy.current = true;
    const q = gsap.utils.selector(root.current);
    const tl = gsap.timeline({ onComplete: () => (busy.current = false) });
    tl.to(d, { rotation: -14, x: -18, duration: 0.12, ease: "power2.out" })
      .to(d, { rotation: 16, x: 14, duration: 0.16, ease: "power2.inOut" })
      .to(d, { rotation: -6, x: -6, scaleY: 0.86, scaleX: 1.1, y: 26, duration: 0.14, ease: "power2.in" })
      .to(d, { rotation: 0, x: 0, scaleY: 1, scaleX: 1, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)" })
      .fromTo(q('[data-in="dust"]'), { scale: 0.6, opacity: 0.4 }, { scale: 1.35, opacity: 1, duration: 0.35, ease: "power2.out" }, 0.25)
      .to(q('[data-in="dust"]'), { scale: 1, duration: 0.6, ease: "power2.inOut" }, 0.6)
      .fromTo(q("[data-pow]"), { scale: 0, rotation: -30, opacity: 0 }, { scale: 1, rotation: 8, opacity: 1, duration: 0.3, ease: "back.out(3)" }, 0.28)
      .to(q("[data-pow]"), { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" }, 1.1)
      .fromTo(q('[data-in="troop"]'), { y: 0 }, { y: -18, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.inOut", stagger: 0.04 }, 0.3);
  };

  return (
    <section ref={root} id="top" className="relative isolate min-h-[100svh] overflow-hidden pt-[72px]" aria-label="Intro">
      {/* ---- sky + city layers ---- */}
      <div className="absolute inset-0 -z-30" data-scroll="0.15">
        <Image src="/gen/hero-sky.webp" alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--bg)/60" />
        <div className="absolute inset-0 bg-[#1b1320]/35" />
      </div>
      <div className="pointer-events-none absolute inset-x-[-6%] bottom-[18%] -z-20 h-[46%]" data-depth="0.12" data-scroll="0.3">
        <Image src="/gen/hero-buildings-far.webp" alt="" fill sizes="110vw" className="object-contain object-bottom opacity-90" />
      </div>
      <div className="pointer-events-none absolute inset-x-[-4%] bottom-[14%] -z-10 h-[36%]" data-depth="0.25" data-scroll="0.5">
        <Image src="/gen/hero-buildings-near.webp" alt="" fill sizes="110vw" className="object-contain object-bottom" />
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[34%]" data-scroll="0.7">
        <Image src="/gen/hero-ground.webp" alt="" fill sizes="100vw" className="object-cover object-top [mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-(--bg) to-transparent" />

      {/* ---- content ---- */}
      <div className="container-x relative grid min-h-[calc(100svh-72px)] grid-cols-1 items-center gap-8 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:py-0">
        <div data-fade className="relative z-10 order-2 max-w-xl lg:order-1">
          <div data-in="logo" className="relative -ml-1 aspect-[1208/476] w-[min(78vw,400px)] drop-shadow-[0_18px_28px_rgba(0,0,0,.45)] sm:w-[460px]">
            <Image src="/brand/astudio-logo.webp" alt="Astudio Gaming" fill priority sizes="(min-width: 640px) 460px, 78vw" className="object-contain object-left" />
          </div>

          <h1 className="clip-words mt-4 text-[clamp(2.6rem,7vw,4.6rem)] text-ink [text-shadow:0_3px_20px_rgba(0,0,0,.5)]">
            {site.tagline.split(" ").map((w, i) => (
              <span className="word mr-[0.28em]" key={i}>
                <span data-in="word">{w}</span>
              </span>
            ))}
          </h1>

          <p data-in="copy" className="mt-5 max-w-md text-lg font-medium leading-relaxed text-ink sm:text-xl [text-shadow:0_2px_14px_rgba(0,0,0,.55)]">
            A game studio building physics-driven, cinematic casino games in Unreal Engine. Home of Doof Troop and Quickdraw Royale.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Magnetic>
              <div data-in="cta">
                <Button href="#games" size="lg">
                  Explore the games
                  <span aria-hidden className="transition-transform group-hover/btn:translate-x-1">→</span>
                </Button>
              </div>
            </Magnetic>
            <Magnetic>
              <div data-in="cta">
                <Button href={`mailto:${site.email}`} size="lg" variant="secondary">
                  Talk to us
                </Button>
              </div>
            </Magnetic>
          </div>
        </div>

        {/* ---- the Doof + troop ---- */}
        <div className="relative z-0 order-1 mx-auto aspect-square w-full max-w-[520px] [container-type:inline-size] lg:order-2 lg:max-w-none lg:aspect-[1/1.05]">
          <div data-in="lines" className="pointer-events-none absolute inset-[-14%] -z-10 opacity-0 [mask-image:radial-gradient(circle_at_50%_50%,black_30%,transparent_68%)]" data-depth="0.1">
            <Image src="/gen/speedlines.webp" alt="" fill sizes="700px" className="object-contain opacity-25 mix-blend-screen invert" />
          </div>

          {TROOP.map((t) => (
            <div key={t.src} className={`absolute ${t.cls} z-20 will-change-transform`} data-depth={t.depth} data-dir={t.dir}>
              <div data-in="troop" data-rot={t.rot} className="bob" style={{ ["--rot" as string]: `${t.rot}deg`, width: `${t.pct}cqw` }}>
                <Image src={t.src} alt="" width={t.w} height={t.w * 1.2} sizes="(min-width: 1024px) 12vw, 25vw" style={{ height: "auto" }} className="w-full drop-shadow-[0_12px_16px_rgba(42,27,18,.35)]" />
              </div>
            </div>
          ))}
          <div data-in="dust" className="pointer-events-none absolute bottom-[2%] left-1/2 z-[5] w-[78%] -translate-x-1/2 opacity-0" data-depth="0.35">
            <Image src="/gen/dust-cloud.webp" alt="" width={900} height={900} style={{ height: "auto" }} className="w-full opacity-90" />
          </div>

          <div className="absolute inset-x-[10%] bottom-[6%] top-[6%] z-10" data-depth="0.3">
            <button
              type="button"
              onClick={stumble}
              aria-label="Poke the Doof"
              className="group relative block h-full w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none"
            >
              <div data-in="doof" ref={doof} className="relative mx-auto h-full w-auto max-w-full origin-bottom will-change-transform">
                <div className="relative mx-auto aspect-[793/927] h-full max-w-full">
                  <Image
                    src="/chars/doof-red.webp"
                    alt="The red Doof, mascot of Doof Troop, mid-sprint"
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 80vw"
                    className="object-contain drop-shadow-[0_28px_30px_rgba(42,27,18,.4)]"
                  />
                  {EYES.map((e, i) => (
                    <span
                      key={i}
                      aria-hidden
                      className="absolute rounded-full bg-[radial-gradient(circle_at_40%_35%,#fff8e6,#efdcb0)]"
                      style={{ left: `${e.cx}%`, top: `${e.cy}%`, width: `${e.r * 3.4}%`, aspectRatio: "1", transform: "translate(-50%,-50%)" }}
                    >
                      <span
                        data-pupil
                        className="absolute left-1/2 top-1/2 block rounded-full bg-[#1e2b57] shadow-[inset_-2px_-2px_2px_rgba(0,0,0,.35)]"
                        style={{ width: `${(e.r * 2) / (e.r * 3.4) * 100}%`, aspectRatio: "1", marginLeft: "-50%", marginTop: "-50%", translate: "50% 50%" }}
                      />
                    </span>
                  ))}
                </div>
                <div data-pow className="pointer-events-none absolute -left-[6%] -top-[4%] z-30 w-[38%] opacity-0">
                  <Image src="/stickers/pow.webp" alt="" width={240} height={240} style={{ height: "auto" }} className="w-full" />
                  <span className="display text-sticker-sm absolute inset-0 grid place-items-center text-[clamp(1.4rem,4vw,2.4rem)] text-yellow">DOOF!</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div data-fade className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-sm font-semibold text-ink-2 md:flex">
        <span className="grid h-7 w-4 place-items-start rounded-full border-2 border-current p-[3px]">
          <span className="block h-1.5 w-1 rounded-full bg-current [animation:bob_1.6s_ease-in-out_infinite]" />
        </span>
        Scroll
      </div>
    </section>
  );
}
