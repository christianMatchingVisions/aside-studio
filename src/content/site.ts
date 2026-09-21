export const site = {
  name: "Astudio Gaming",
  shortName: "Astudio",
  tagline: "Making gambling feel like gaming",
  description:
    "Astudio is a game studio building a new generation of casino games in Unreal Engine: physics-driven, cinematic and social, built for a generation of gamers.",
  url: "https://astudiogaming.com",
  email: "victor@astudio.tv",
  phone: "+356 7905 4304",
  phoneHref: "tel:+35679054304",
  address: {
    lines: ["Level 6, St. Julian's Business Centre", "Elia Zammit Street", "St. Julian's STJ 3153", "Malta"],
    mapsHref: "https://maps.google.com/?q=St.+Julian's+Business+Centre,+Elia+Zammit+Street,+St+Julian's+STJ+3153,+Malta",
  },
  youtube: { doofTroop: "cXggi5TuvHk" },
  streams: { doofTroop: "https://cloud.fireballserver.com/games/astudio/doof-troop/6/index.html" },
} as const;

export const nav = [
  { label: "Games", href: "#games" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
] as const;

export const whatWeDo = {
  kicker: "What we do",
  headline: ["Built like real games.", "Not traditional slots."],
  intro:
    "At Astudio we create a new generation of casino games. We blend the excitement of modern video games with the structure and security of regulated casino experiences.",
  pillars: [
    {
      icon: "/icons/engine.webp",
      title: "Unreal game engine",
      body: "Every title is built in Unreal Engine, so we deliver rich visuals, dynamic gameplay and cinematic moments that feel alive on screen.",
      color: "purple",
    },
    {
      icon: "/icons/crowd.webp",
      title: "Social by nature",
      body: "Designed for live environments where communities gather, react and engage together. Fun to play, and just as fun to watch.",
      color: "pink",
    },
    {
      icon: "/icons/controller.webp",
      title: "Easy to pick up",
      body: "Every game is crafted to be easy to understand and exciting from the first round, for a younger, game-native audience.",
      color: "blue",
    },
  ],
  outro: "In short: game-industry craftsmanship meets iGaming-grade technology, to redefine what casino games can be.",
} as const;

export type Game = {
  slug: string;
  name: string;
  logo: string;
  status: "live" | "coming-soon";
  accent: "yellow" | "orange" | "green";
  tagline: string;
  description: string[];
  features: { icon: string; text: string }[];
  specs: { label: string; value: string }[];
  shots: string[];
  video?: string;
  extras?: {
    kicker: string;
    title: string;
    intro: string;
    tiers: { name: string; value: string; body: string; color: "yellow" | "red" }[];
  };
};

export const games: Game[] = [
  {
    slug: "doof-troop",
    name: "Doof Troop",
    logo: "/brand/doof-troop-logo.webp",
    status: "live",
    accent: "yellow",
    tagline: "Roulette-style betting meets a chaotic live race.",
    description: [
      "Doof Troop is a fast-paced racing and betting game where 18 unpredictable characters battle through chaotic, obstacle-filled tracks. The betting system is inspired by roulette, so it feels familiar from the first round: bet on individual Doofs, or on groups defined by colour, pattern, accessories and other shared traits.",
      "Players can back a Doof to finish 1st, Top 2 or Top 3, while group bets offer different levels of risk and reward, much like betting on numbers, colours or sections of a roulette table.",
      "Once betting closes, the race runs automatically in Unreal Engine. Physics-based movement, collisions, boosts, obstacles and knockouts make every round unfold differently, combining the familiarity of roulette with the excitement of a live race.",
    ],
    features: [
      { icon: "/icons/crowd.webp", text: "18 unpredictable Doofs racing through obstacle-filled tracks" },
      { icon: "/icons/chips.webp", text: "Roulette-inspired bets on single Doofs or groups by colour, pattern and accessories" },
      { icon: "/icons/trophy.webp", text: "Bet on 1st, Top 2 or Top 3, with group bets at different risk levels" },
      { icon: "/icons/engine.webp", text: "Races run automatically in Unreal Engine with physics, boosts and knockouts" },
      { icon: "/icons/stopwatch.webp", text: "Round of about 60 seconds, including betting, race and win" },
      { icon: "/icons/multiplier.webp", text: "Up to 4.500× max win and RTP 94.74%" },
    ],
    specs: [
      { label: "Characters", value: "18 Doofs" },
      { label: "Round length", value: "~60 s" },
      { label: "Bet types", value: "1st, Top 2, Top 3, groups" },
      { label: "Combo", value: "Up to 500×" },
      { label: "Crazy Combo", value: "Up to 5,000×" },
      { label: "Max win", value: "4.500×" },
      { label: "RTP", value: "94.74%" },
      { label: "Engine", value: "Unreal Engine, real-time 3D" },
    ],
    extras: {
      kicker: "Bonus bets",
      title: "Combo & Crazy Combo",
      intro:
        "Combo and Crazy Combo add a high-potential layer to every race. Players predict a combination of Doofs or qualifying outcomes before the start, then watch the 18 Doofs battle through the track knowing a specific set of finishing positions or characteristics could trigger a substantial payout.",
      tiers: [
        {
          name: "Combo",
          value: "Up to 500×",
          body: "Select a combination of Doofs or outcomes before the race. If the combination comes in, the bet pays up to 500× the stake.",
          color: "yellow",
        },
        {
          name: "Crazy Combo",
          value: "Up to 5,000×",
          body: "An extreme-risk, high-reward combination bet for players chasing the biggest payout. A successful Crazy Combo pays up to 5,000× the stake.",
          color: "red",
        },
      ],
    },
    shots: ["/shots/doof-1.webp", "/shots/doof-2.webp", "/shots/doof-3.webp"],
    video: "cXggi5TuvHk",
  },
  {
    slug: "quickdraw-royale",
    name: "Quickdraw Royale",
    logo: "/brand/quickdraw-logo.webp",
    status: "live",
    accent: "orange",
    tagline: "Fast, cinematic shootouts between iconic cowboy characters.",
    description: [
      "Quickdraw Royale is a Wild West themed betting game built around fast, cinematic shootouts between iconic cowboy characters. In each round, players place bets on who will win the duel, how the shootout will unfold, or whether special events and multipliers will trigger.",
      "Once betting closes, the duel plays out live as a dramatic standoff. Hands hover over holsters, tension builds, and the final shot decides the winner. By turning every round into a short, story-driven showdown, Quickdraw Royale keeps players watching, reacting and betting round after round.",
    ],
    features: [
      { icon: "/icons/revolver.webp", text: "Highly cinematic and art-directed gameplay" },
      { icon: "/icons/engine.webp", text: "Stylised, cartoony art style rendered in real time with modern post-processing" },
      { icon: "/icons/stopwatch.webp", text: "Round of about 30 seconds, including betting, shootout and win" },
      { icon: "/icons/controller.webp", text: "Easy to understand and user-friendly betting system" },
    ],
    specs: [
      { label: "Round length", value: "~30 s" },
      { label: "Bet types", value: "Winner, events, multipliers" },
      { label: "Rendering", value: "Real-time 3D" },
    ],
    shots: ["/shots/quick-1.webp", "/shots/quick-2.webp", "/shots/quick-3.webp"],
  },
  {
    slug: "doof-troop-racing",
    name: "Doof Troop Racing",
    logo: "/brand/doof-racing-logo.webp",
    status: "coming-soon",
    accent: "green",
    tagline: "The troop hits the track. Coming soon.",
    description: [],
    features: [],
    specs: [],
    shots: [],
  },
];

export const team = [
  { name: "Dennis Dyhr-Hansen", role: "CEO / Co-Founder", photo: "/team/dennis.webp", color: "red" },
  { name: "Jonas Lutteman", role: "COO / Co-Founder", photo: "/team/jonas.webp", color: "yellow" },
  { name: "Victor Skalin", role: "Creative Director", photo: "/team/victor.webp", color: "green" },
  { name: "Louis Hadfield", nick: "Haddzy", role: "Advisor", photo: "/team/louis.webp", color: "blue" },
  { name: "Andrew Crosby", role: "Advisor", photo: "/team/andrew.webp", color: "pink" },
] as const;

export const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
  { label: "Responsible gaming", href: "/responsible-gaming" },
] as const;

export const responsibleGamingLine =
  "Our games are intended for adults aged 18 and over, and are offered only through licensed operators. Please play responsibly.";
