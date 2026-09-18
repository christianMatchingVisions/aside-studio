import type { Metadata, Viewport } from "next";
import { Baloo_2, Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/scenes/troop-landscape.webp", width: 1800, height: 1350, alt: "The Doof Troop stampeding through the city" }],
  },
  twitter: { card: "summary_large_image" },
  
};

export const viewport: Viewport = {
  themeColor: "#1b1320",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${baloo.variable} ${figtree.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
