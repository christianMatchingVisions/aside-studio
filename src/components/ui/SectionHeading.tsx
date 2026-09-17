import { cn } from "@/lib/utils";

const colors = {
  red: "text-red",
  yellow: "text-yellow",
  green: "text-green",
  pink: "text-pink",
  blue: "text-blue",
  purple: "text-purple",
  ink: "text-ink",
} as const;

export function SectionHeading({
  kicker,
  lines,
  color = "ink",
  className,
  as: Tag = "h2",
  align = "left",
}: {
  kicker?: string;
  lines: readonly string[];
  color?: keyof typeof colors;
  className?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {kicker && (
        <p data-reveal className={cn("mb-3 inline-flex items-center gap-2 rounded-full border-2 border-(--line-strong) bg-surface px-3 py-1 font-display text-sm font-bold uppercase tracking-wider text-ink")}>
          <span className="h-2 w-2 rounded-full bg-red" />
          {kicker}
        </p>
      )}
      <Tag data-reveal className={cn("text-[clamp(2.2rem,5.5vw,4rem)]", colors[color])}>
        {lines.map((l, i) => (
          <span key={i} className={cn("block", i > 0 && "text-ink")}>
            {l}
          </span>
        ))}
      </Tag>
    </div>
  );
}
