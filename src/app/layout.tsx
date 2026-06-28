import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { OrganizationJsonLd } from "@/components/JsonLd";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "hardware shop",
    "hardware store",
    "plywood",
    "laminates",
    "door handles",
    "door kits",
    "door closers",
    "wall hangers",
    "towel rings",
    "curtain hangers",
    "sofa legs",
    "door & furniture fittings",
    "building hardware",
    "sanitary fittings",
    `hardware store ${site.address.city}`,
    `hardware shop ${site.address.region}`,
    ...site.areaServed,
    site.name,
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  category: "Home Improvement",
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    // Social-share image is provided by app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    // Twitter image falls back to the generated Open Graph image.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo.jpeg",
  },
};

export const viewport: Viewport = {
  themeColor: "#14110d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal text-cream">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
