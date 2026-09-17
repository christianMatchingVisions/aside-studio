"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const noop = () => () => {};
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-10 w-[4.25rem] shrink-0 items-center rounded-full border-[2.5px] border-(--line-strong) bg-surface p-1 shadow-[3px_3px_0_var(--shadow-ink)] transition-colors",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-7 w-7 place-items-center rounded-full border-2 border-(--line-strong) text-sm transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]",
          dark ? "translate-x-[1.6rem] bg-purple" : "translate-x-0 bg-yellow",
        )}
        aria-hidden
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
