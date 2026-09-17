"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scroll-in reveals for every [data-reveal] element on the page.
 * Values: "up" (default) | "left" | "right" | "pop". Elements stay visible
 * without JS or under reduced motion (see globals.css).
 */
export function RevealInit() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (!els.length) return;

    const initial = (el: HTMLElement) => {
      switch (el.dataset.reveal) {
        case "left":
          return { x: -40, y: 0, scale: 1, rotation: 0 };
        case "right":
          return { x: 40, y: 0, scale: 1, rotation: 0 };
        case "pop":
          return { x: 0, y: 12, scale: 0.85, rotation: gsap.utils.random(-6, 6) };
        default:
          return { x: 0, y: 32, scale: 1, rotation: 0 };
      }
    };
    els.forEach((el) => gsap.set(el, { opacity: 0, ...initial(el) }));

    const triggers = ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: (_i, t) => parseFloat((t as HTMLElement).style.getPropertyValue("--rot")) || 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: { each: 0.08, from: "start" },
          overwrite: true,
        }),
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);
  return null;
}
