"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export const INTRO_EVENT = "astudio:intro-done";

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

/** ~1.2s branded intro: logo pops, overlay lifts away. Fires INTRO_EVENT when finished. */
export function IntroOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const finish = () => {
      window.__introDone = true;
      window.dispatchEvent(new Event(INTRO_EVENT));
      setGone(true);
    };
    if (prefersReducedMotion()) {
      finish();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        finish();
      },
    });
    tl.fromTo(
      logoRef.current,
      { scale: 0.4, rotation: -8, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: "back.out(2.2)" },
      0.05,
    )
      .to(logoRef.current, { scale: 1.06, duration: 0.25, ease: "power1.inOut" }, 0.62)
      .to(logoRef.current, { y: -40, opacity: 0, duration: 0.35, ease: "power2.in" }, 0.85)
      .to(ref.current, { yPercent: -100, duration: 0.6, ease: "power3.inOut" }, 0.9);
    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[100] grid place-items-center bg-choc will-change-transform"
    >
      <div ref={logoRef} className="relative h-[30vmin] w-[70vmin] max-w-[560px] opacity-0">
        <Image src="/brand/astudio-logo.webp" alt="" fill priority sizes="560px" className="object-contain" />
      </div>
    </div>
  );
}
