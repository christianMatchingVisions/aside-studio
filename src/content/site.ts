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
      title: "Real game engine",
      body: "Every title is built in a state-of-the-art engine, so we deliver rich visuals, dynamic gameplay and cinematic moments that feel alive on screen.",
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
};

export const games: Game[] = [
  {
    slug: "doof-troop",
    name: "Doof Troop",
    logo: "/brand/doof-troop-logo.webp",
    status: "live",
    accent: "yellow",
    tagline: "A chaotic, physics-driven race where every round is completely unique.",
    description: [
      "Doof Troop is a chaotic and fast-paced, physics-driven racing game, with memorable characters racing through obstacle-filled courses. With many tracks and dynamic elements, each race is totally unique and unpredictable.",
      "Being our first game, Doof Troop sets a new standard for modern casino games, built to create engaging moments for a younger audience.",
    ],
    features: [
      { icon: "/icons/dice.webp", text: "Chaotic, physics-driven race where every round is completely unique" },
      { icon: "/icons/engine.webp", text: "Modern rendering techniques and mechanics, rendered in real time" },
      { icon: "/icons/stopwatch.webp", text: "Round of about 60 seconds, including betting, race and win" },
      { icon: "/icons/controller.webp", text: "Easy to understand and user-friendly betting system" },
      { icon: "/icons/multiplier.webp", text: "Up to 4.500× max win and RTP 94.74%" },
      { icon: "/icons/chips.webp", text: "Play multiple bets per round" },
    ],
    specs: [
      { label: "Round length", value: "~60 s" },
      { label: "Max win", value: "4.500×" },
      { label: "RTP", value: "94.74%" },
      { label: "Bets per round", value: "Multiple" },
      { label: "Rendering", value: "Real-time 3D" },
    ],
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
