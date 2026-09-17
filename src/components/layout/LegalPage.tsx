import type { ReactNode } from "react";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { legalLinks } from "@/content/site";
import { cn } from "@/lib/utils";

export function LegalPage({
  title,
  updated,
  intro,
  children,
  current,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
  current: string;
}) {
  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <header className="relative overflow-hidden border-b-[3px] border-(--line-strong) bg-yellow/25 dark:bg-yellow/8">
          <div className="pointer-events-none absolute inset-0 text-yellow-deep bg-stripes opacity-40 dark:opacity-15" />
          <div className="container-x relative py-16 sm:py-20">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-ink-2">Legal</p>
            <h1 className="mt-2 text-[clamp(2.4rem,6vw,4.4rem)] text-ink">{title}</h1>
            {intro && <p className="mt-4 max-w-2xl text-lg text-ink-2">{intro}</p>}
            <p className="mt-4 text-sm font-semibold text-ink-3">Last updated {updated}</p>
          </div>
        </header>

        <div className="container-x grid gap-12 py-14 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Legal pages" className="lg:sticky lg:top-24 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={l.href === current ? "page" : undefined}
                    className={cn(
                      "block rounded-full border-2 px-4 py-2 font-display font-bold transition-colors",
                      l.href === current ? "border-(--line-strong) bg-surface text-ink shadow-[3px_3px_0_var(--shadow-ink)]" : "border-transparent text-ink-2 hover:bg-surface-2",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <article className="prose-legal max-w-3xl">
            <div className="card-soft mb-8 border-l-8 border-l-orange p-5 text-sm text-ink-2">
              <strong className="text-ink">Draft for legal review.</strong> This text is a starting template prepared for Astudio Gaming and should be reviewed by qualified counsel before publication.
            </div>
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
