"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Full-bleed image that drifts vertically as the viewport passes it. */
export function ParallaxImage({ src, alt, speed = 0.2, priority = false }: { src: string; alt: string; speed?: number; priority?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !wrap.current || !img.current) return;
    const tween = gsap.fromTo(
      img.current,
      { yPercent: -speed * 50 },
      {
        yPercent: speed * 50,
        ease: "none",
        scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden">
      <div ref={img} className="absolute inset-x-0 -top-[15%] h-[130%] will-change-transform">
        <Image src={src} alt={alt} fill sizes="100vw" priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
