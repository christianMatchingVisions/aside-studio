import Image from "next/image";
import { whatWeDo } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tint: Record<string, string> = {
  purple: "bg-purple/15 text-purple",
  pink: "bg-pink/15 text-pink",
  green: "bg-green/15 text-green-deep",
  blue: "bg-blue/15 text-blue-deep",
};
const rot = ["-1.2deg", "1deg", "-0.8deg", "1.4deg"];

export function WhatWeDo() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 text-ink bg-halftone" style={{ opacity: "var(--halftone-opacity)" }} />
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <SectionHeading kicker={whatWeDo.kicker} lines={whatWeDo.headline} color="red" />
          <p data-reveal className="max-w-prose text-lg leading-relaxed text-ink-2 sm:text-xl">
            {whatWeDo.intro}
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.pillars.map((p, i) => (
            <li key={p.title} data-reveal="pop" className="card-hard relative p-6 will-change-transform" style={{ ["--rot" as string]: rot[i] }}>
              <div className={`grid h-20 w-20 place-items-center rounded-2xl ${tint[p.color]}`}>
                <Image src={p.icon} alt="" width={64} height={64} className="h-16 w-16 object-contain" />
              </div>
              <h3 className="mt-5 text-2xl">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{p.body}</p>
            </li>
          ))}
        </ul>

        <div data-reveal className="relative mt-16 flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="relative w-36 shrink-0 sm:w-44">
            <Image src="/chars/doof-yellow.webp" alt="" width={300} height={440} style={{ height: "auto" }} className="w-full drop-shadow-[0_14px_16px_rgba(42,27,18,.3)]" />
          </div>
          <div className="card-hard relative max-w-2xl bg-surface p-6 sm:p-8 before:absolute before:-left-3 before:bottom-10 before:h-6 before:w-6 before:rotate-45 before:border-b-[2.5px] before:border-l-[2.5px] before:border-(--line-strong) before:bg-surface max-sm:before:hidden">
            <p className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">{whatWeDo.outro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
