"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Stage = "idle" | "ask" | "denied" | "playing";
const AGE_KEY = "astudio-age-ok";

function FullscreenIcon({ exit }: { exit: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {exit ? <path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" /> : <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" />}
    </svg>
  );
}

const pill =
  "inline-flex items-center justify-center gap-2 rounded-full border-[2.5px] border-choc font-display font-bold shadow-[4px_5px_0_#2a1b12] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none";

/**
 * "Try the game" frame: poster -> 18+ check -> live game client, with a fullscreen
 * toggle kept outside the game's own UI.
 */
export function GameEmbed({ src, title, poster, caption }: { src: string; title: string; poster: string; caption?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [full, setFull] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === wrap.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const start = () => {
    let ok = false;
    try {
      ok = sessionStorage.getItem(AGE_KEY) === "1";
    } catch {
      /* storage unavailable: always ask */
    }
    setStage(ok ? "playing" : "ask");
  };

  const confirmAge = () => {
    try {
      sessionStorage.setItem(AGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setStage("playing");
  };

  const toggle = useCallback(async () => {
    const el = wrap.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await el.requestFullscreen();
    } catch {
      /* fullscreen not permitted; the frame simply stays inline */
    }
  }, []);

  const playing = stage === "playing";

  return (
    <div>
      <div ref={wrap} className={cn("card-hard relative overflow-hidden bg-choc", full ? "rounded-none border-0 shadow-none" : "aspect-video")}>
        {!playing && (
          <>
            <Image src={poster} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className={cn("object-cover transition-[filter] duration-300", stage !== "idle" && "blur-sm brightness-50")} />
            <div className="absolute inset-0 bg-gradient-to-t from-choc/70 to-transparent" />
          </>
        )}

        {stage === "idle" && (
          <button type="button" onClick={start} className="group absolute inset-0 grid place-items-center" aria-label="Try the game">
            <span className={cn(pill, "bg-yellow px-7 py-3.5 text-lg text-choc group-hover:-translate-y-0.5")}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
              Try the game
            </span>
            <span className="absolute bottom-4 left-4 rounded-full border-2 border-cream/80 bg-choc/70 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-cream backdrop-blur">
              18+ only
            </span>
          </button>
        )}

        {stage === "ask" && (
          <div role="dialog" aria-labelledby="age-q" className="absolute inset-0 grid place-items-center p-4">
            <div className="card-hard w-full max-w-sm bg-cream p-6 text-center text-choc">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border-[3px] border-choc bg-red font-display text-base font-extrabold text-cream">18+</span>
              <h4 id="age-q" className="mt-4 text-2xl">Are you over 18 years old?</h4>
              <p className="mt-2 text-sm text-choc/70">This is a real-money casino game demo for adults only.</p>
              <div className="mt-5 flex justify-center gap-3">
                <button type="button" onClick={confirmAge} className={cn(pill, "bg-green px-5 py-2.5 text-choc")}>
                  Yes, I&apos;m over 18
                </button>
                <button type="button" onClick={() => setStage("denied")} className={cn(pill, "bg-white px-5 py-2.5 text-choc")}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === "denied" && (
          <div className="absolute inset-0 grid place-items-center p-4">
            <div className="card-hard w-full max-w-sm bg-cream p-6 text-center text-choc">
              <h4 className="text-2xl">Sorry, adults only.</h4>
              <p className="mt-2 text-sm text-choc/70">You must be 18 or over to try this game.</p>
              <button type="button" onClick={() => setStage("idle")} className={cn(pill, "mt-5 bg-white px-5 py-2.5 text-choc")}>
                Back
              </button>
            </div>
          </div>
        )}

        {playing && (
          <>
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center text-cream/70" aria-hidden>
                <span className="font-display text-lg font-bold">Loading Doof Troop…</span>
              </div>
            )}
            <iframe
              src={src}
              title={title}
              allow="fullscreen; autoplay"
              allowFullScreen
              onLoad={() => setLoaded(true)}
              className="h-full w-full border-0"
            />
            {full && (
              <button
                type="button"
                onClick={toggle}
                aria-label="Exit fullscreen"
                className="absolute left-1/2 top-3 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border-2 border-cream/70 bg-choc/70 px-3 py-1.5 font-display text-sm font-bold text-cream opacity-60 backdrop-blur transition-opacity hover:opacity-100"
              >
                <FullscreenIcon exit />
                Exit fullscreen
              </button>
            )}
          </>
        )}
      </div>

      <div className="mt-3 flex min-h-10 flex-wrap items-center justify-between gap-3">
        {caption && <p className="text-sm font-semibold text-ink-3">{caption}</p>}
        {playing && (
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-(--line-strong) bg-surface px-4 py-2 font-display text-sm font-bold text-ink shadow-[3px_3px_0_var(--shadow-ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <FullscreenIcon exit={false} />
            Play fullscreen
          </button>
        )}
      </div>
    </div>
  );
}
