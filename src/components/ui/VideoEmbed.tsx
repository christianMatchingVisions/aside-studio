"use client";

import Image from "next/image";
import { useState } from "react";

/** YouTube facade: renders a poster + play button, loads the iframe on click. */
export function VideoEmbed({ id, title, poster }: { id: string; title: string; poster: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="card-hard relative aspect-video overflow-hidden bg-choc">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group absolute inset-0 block h-full w-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          <span className="absolute inset-0 bg-gradient-to-t from-choc/60 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-choc bg-yellow text-choc shadow-[5px_6px_0_#2a1b12] transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          <span className="absolute bottom-4 left-4 rounded-full border-2 border-cream/80 bg-choc/70 px-3 py-1 font-display text-sm font-bold text-cream backdrop-blur">
            Watch the trailer
          </span>
        </button>
      )}
    </div>
  );
}
