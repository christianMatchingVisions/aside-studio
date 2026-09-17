import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { IntroOverlay } from "@/components/layout/IntroOverlay";
import { RevealInit } from "@/components/motion/RevealInit";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Games } from "@/components/sections/Games";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <WhatWeDo />
        <Games />
        <Team />
        <Contact />
      </main>
      <Footer />
      <RevealInit />
    </>
  );
}
