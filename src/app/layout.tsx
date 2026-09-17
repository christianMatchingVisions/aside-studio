import type { Metadata, Viewport } from "next";
import { Baloo_2, Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff6e9" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1320" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${baloo.variable} ${figtree.variable}`}>
      <body>
        <ThemeProvider>
          <SmoothScroll />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
