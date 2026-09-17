import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "red" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-display font-bold border-[2.5px] border-(--line-strong) select-none transition-[transform,box-shadow] duration-150 ease-out shadow-[4px_5px_0_var(--shadow-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_7px_0_var(--shadow-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_2px_0_var(--shadow-ink)]";

const variants: Record<Variant, string> = {
  primary: "bg-yellow text-choc",
  secondary: "bg-surface text-ink",
  red: "bg-red text-white",
  ghost: "bg-transparent text-ink shadow-none hover:shadow-none border-transparent",
};

const sizes: Record<Size, string> = {
  md: "text-base px-5 py-2.5",
  lg: "text-lg px-7 py-3.5",
};

export type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({ href, variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  if (external || href.startsWith("#")) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
