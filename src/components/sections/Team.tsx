import Image from "next/image";
import { team } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ring: Record<string, string> = {
  red: "bg-red",
  yellow: "bg-yellow",
  green: "bg-green",
  blue: "bg-blue",
  pink: "bg-pink",
};
const rots = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg"];

export function Team() {
  return (
    <section id="team" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 text-ink bg-halftone" style={{ opacity: "var(--halftone-opacity)" }} />
      <div className="container-x">
        <SectionHeading kicker="Our team" lines={["The Astudio team"]} color="pink" align="center" className="mx-auto" />
        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 lg:grid-cols-5">
          {team.map((m, i) => (
            <li key={m.name} data-reveal="pop" style={{ ["--rot" as string]: rots[i] }} className="card-hard group flex flex-col items-center p-4 text-center will-change-transform sm:p-5">
              <div className={`relative grid h-28 w-28 place-items-center rounded-full ${ring[m.color]} p-1.5 shadow-[3px_4px_0_var(--shadow-ink)] ring-[2.5px] ring-(--line-strong) transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}>
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-(--line-strong) bg-surface-2">
                  <Image src={m.photo} alt={`Portrait of ${m.name}`} fill sizes="112px" className="object-cover" />
                </div>
              </div>
              <h3 className="mt-4 text-lg leading-tight">{m.name}</h3>
              {"nick" in m && m.nick && <p className="text-sm font-semibold text-ink-3">“{m.nick}”</p>}
              <p className="mt-1 text-sm font-medium text-ink-2">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
