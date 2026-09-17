"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

export function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  const href = (h: string) => (home ? h : `/${h}`);

  return (
    <header
      data-nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-(--nav-bg) shadow-[0_2px_0_var(--line)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="container-x flex h-[72px] items-center justify-between gap-4" aria-label="Main">
        <Link href="/" className="relative block h-11 w-[120px] shrink-0 sm:w-[140px]" aria-label={`${site.name} home`}>
          <Image src="/brand/astudio-logo.webp" alt="" fill sizes="140px" className="object-contain object-left" priority />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={href(n.href)}
                className="relative rounded-full px-4 py-2 font-display text-[1.05rem] font-bold text-ink transition-colors hover:bg-(--surface-2) after:absolute after:inset-x-4 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:bg-red after:transition-transform hover:after:scale-x-100"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Magnetic className="hidden md:inline-block" strength={0.25}>
            <Button href={`mailto:${site.email}`} size="md">
              Get in touch
            </Button>
          </Magnetic>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border-[2.5px] border-(--line-strong) bg-surface shadow-[3px_3px_0_var(--shadow-ink)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-5">
              <span className={cn("absolute inset-x-0 top-0 h-[3px] rounded bg-ink transition-transform", open && "top-1/2 -translate-y-1/2 rotate-45")} />
              <span className={cn("absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded bg-ink transition-opacity", open && "opacity-0")} />
              <span className={cn("absolute inset-x-0 bottom-0 h-[3px] rounded bg-ink transition-transform", open && "bottom-1/2 translate-y-1/2 -rotate-45")} />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "container-x grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <ul className="flex flex-col gap-1 pb-5 pt-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={href(n.href)}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-display text-2xl font-bold text-ink hover:bg-(--surface-2)"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button href={`mailto:${site.email}`} size="lg" className="w-full">
                Get in touch
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
