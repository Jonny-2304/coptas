import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getOgImageUrl } from "@/lib/sanity/image";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { getSiteUrl } from "@/lib/utils";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl();
  const ogImage = getOgImageUrl(settings.logo);
  const suffix = settings.seoTitleSuffix ?? "CoPTaS";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.siteName,
      template: `%s | ${suffix}`,
    },
    description: settings.tagline,
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: siteUrl,
      siteName: settings.siteName,
      title: settings.siteName,
      description: settings.tagline,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: settings.siteName,
      description: settings.tagline,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface font-sans text-brand-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header
          navLinks={settings.navLinks ?? []}
          logo={settings.logo}
          siteName={settings.siteName}
        />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer
          siteName={settings.siteName}
          contactEmail={settings.contactEmail}
          footerText={settings.footerText}
          footerTagline={settings.footerTagline}
          enquiryFormText={settings.enquiryFormText}
          navigateHeading={settings.navigateHeading}
          contactHeading={settings.contactHeading}
          enquiryButtonLabel={settings.enquiryButtonLabel}
          navLinks={settings.navLinks ?? []}
          logo={settings.logo}
        />
      </body>
    </html>
  );
}
