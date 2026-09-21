import Image from "next/image";
import { site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 pb-24 pt-8 sm:pb-32">
      <div className="container-x">
        <div data-reveal className="card-hard relative overflow-hidden bg-blue p-8 text-choc sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute inset-0 text-choc bg-halftone opacity-15" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border-2 border-choc bg-cream px-3 py-1 font-display text-sm font-bold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-red" />
                Contact
              </p>
              <h2 className="text-sticker-sm mt-4 text-[clamp(2.4rem,6vw,4.4rem)] text-cream">Let&apos;s put your players in the race.</h2>
              <p className="mt-4 max-w-lg text-lg font-medium text-choc/80">
                Operators, aggregators and platform partners: drop us a line and we&apos;ll set up a demo.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {site.contacts.map((c) => (
                  <li key={c.email} className="card-hard bg-cream p-5 text-choc transition-transform duration-200 hover:-translate-y-1">
                    <p className="font-display text-lg font-bold leading-tight">{c.name}</p>
                    <p className="text-sm font-semibold text-choc/60">{c.role}</p>
                    <a href={`mailto:${c.email}`} className="mt-3 block break-words font-display font-bold text-red-deep underline decoration-2 underline-offset-4 hover:decoration-4">
                      {c.email}
                    </a>
                    <a href={c.phoneHref} className="mt-1 block font-semibold underline decoration-2 underline-offset-4 hover:decoration-4">
                      {c.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <address className="relative not-italic">
              <div className="card-hard bg-cream p-6 text-choc">
                <p className="font-display text-sm font-bold uppercase tracking-wider text-choc/70">Astudio Gaming</p>
                <p className="mt-2 text-lg leading-relaxed">
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
                <a href={site.address.mapsHref} target="_blank" rel="noreferrer" className="mt-3 inline-block font-semibold underline decoration-2 underline-offset-4">
                  Open in maps ↗
                </a>
              </div>
              <div className="pointer-events-none absolute -bottom-10 -right-4 w-28 sm:-right-8 sm:w-36 lg:-bottom-16">
                <Image src="/chars/doof-green.webp" alt="" width={420} height={480} style={{ height: "auto" }} className="w-full drop-shadow-[0_12px_14px_rgba(42,27,18,.35)]" />
              </div>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
