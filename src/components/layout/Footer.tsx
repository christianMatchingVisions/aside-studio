import Image from "next/image";
import Link from "next/link";
import { legalLinks, responsibleGamingLine, site } from "@/content/site";

export function AgeBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-cream bg-red font-display text-base font-extrabold leading-none text-cream ${className}`}
      aria-label="18 plus only"
      title="For adults aged 18 and over"
    >
      18+
    </span>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-choc text-cream">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-yellow" aria-hidden />
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="relative block h-12 w-[150px]" aria-label={`${site.name} home`}>
              <Image src="/brand/astudio-logo.webp" alt="" fill sizes="150px" className="object-contain object-left" />
            </Link>
            <p className="mt-4 max-w-sm text-cream/70">{site.tagline}. Casino games built in a real game engine, delivered with iGaming-grade technology.</p>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream/60">Contact</h3>
            <address className="mt-3 not-italic text-cream/85">
              {site.contacts.map((c) => (
                <div key={c.email} className="mb-3">
                  <span className="block text-sm text-cream/60">{c.name}</span>
                  <a href={`mailto:${c.email}`} className="block font-semibold hover:underline">{c.email}</a>
                  <a href={c.phoneHref} className="block hover:underline">{c.phone}</a>
                </div>
              ))}
              <div className="space-y-1">
                {site.address.lines.map((l) => (
                  <span key={l} className="block text-cream/60">{l}</span>
                ))}
              </div>
            </address>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream/60">Legal</h3>
            <ul className="mt-3 space-y-1">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/85 hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-cream/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <AgeBadge />
            <p className="max-w-xl text-sm leading-relaxed text-cream/70">{responsibleGamingLine}</p>
          </div>
          <p className="text-sm text-cream/50">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
