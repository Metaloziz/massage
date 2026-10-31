import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeAtmosphere } from "@/components/layout/ThemeAtmosphere";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { ContentProvider } from "@/components/content/ContentProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { getThemeBootstrapScript } from "@/design/applyTheme";
import { assetPath } from "@/lib/assetPath";
import { heroImageMobileWebp, site } from "@/lib/content";
import { ogImageUrl, seo, siteUrl } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: site.brandLatin,
  keywords: [...seo.keywords],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: assetPath("/site.webmanifest"),
  icons: {
    icon: [
      { url: assetPath("/favicon.svg"), type: "image/svg+xml" },
      { url: assetPath("/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
      { url: assetPath("/icons/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: assetPath("/apple-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  themeColor: "#1e3a2f",
  appleWebApp: {
    capable: true,
    title: site.brandLatin,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    locale: "ru_BY",
    type: "website",
    url: siteUrl,
    siteName: site.name,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${site.name} — кинезиомассаж в Минске и Молодечно`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [ogImageUrl],
  },
  other: {
    "geo.region": "BY-MI",
    "geo.placename": "Минск, Молодечно",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href={assetPath(heroImageMobileWebp)}
          media="(max-width: 767px)"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeBootstrapScript(),
          }}
        />
      </head>
      <body className="relative min-h-screen antialiased">
        <JsonLd />
        <ThemeAtmosphere />
        <SmoothScroll>
          <ContentProvider>
            <BookingProvider>
              <div className="relative z-10">
                <Header />
                {children}
                <Footer />
              </div>
            </BookingProvider>
          </ContentProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
