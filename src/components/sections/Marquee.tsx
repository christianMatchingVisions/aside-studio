const items = [
  "Built for a generation of gamers",
  "Physics-driven",
  "Real-time 3D",
  "Made in Unreal Engine",
  "Social by nature",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative z-10 -my-3 -rotate-[1.5deg] scale-[1.02] overflow-hidden border-y-[3px] border-(--line-strong) bg-yellow text-choc" aria-hidden>
      <div className="marquee-track py-3">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap pr-6 font-display text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
            {t}
            <span className="inline-block h-3 w-3 rotate-45 rounded-[3px] bg-choc" />
          </span>
        ))}
      </div>
    </div>
  );
}
