import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cadvero — Talent agency for influencers, actors, musicians & presenters",
    template: "%s · Cadvero",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "talent agency",
    "influencer agency",
    "influencer management",
    "creator management",
    "acting agency",
    "music management",
    "presenter agency",
    "UK talent agency",
  ],
  applicationName: "Cadvero",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cadvero — Talent on the way up",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Cadvero",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cadvero — Talent on the way up",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// Tells Google who runs the site (shown in knowledge panels and search results).
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cadvero",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.png`,
  description: SITE_DESCRIPTION,
  email: "hello@cadvero.com",
  parentOrganization: {
    "@type": "Organization",
    name: "MJ Smith Holdings",
    url: "https://www.mjsmithholdings.co.uk",
    identifier: { "@type": "PropertyValue", propertyID: "UK Companies House", value: "16119280" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
