import {
  defaultCtaButtons,
  defaultHeroButtons,
  defaultNavLinks,
  defaultPapersPageContent,
  defaultSiteExtras,
  defaultTeamPageContent,
} from "@/lib/content/defaults";
import {
  defaultSiteSettings,
  type CtaButtonLink,
  type NavLink,
  type PageContent,
  type SiteSettings,
} from "./types";

interface SanityNavLink {
  label: string;
  href: string;
}

interface SanityCtaButton {
  label: string;
  href: string;
  variant?: CtaButtonLink["variant"];
}

interface SanitySiteSettingsDoc {
  siteName: string;
  tagline: string;
  contactEmail: string;
  footerText?: string;
  footerTagline?: string;
  enquiryFormText?: string;
  navigateHeading?: string;
  contactHeading?: string;
  enquiryButtonLabel?: string;
  seoTitleSuffix?: string;
  navLinks?: SanityNavLink[];
  logo?: SiteSettings["logo"];
}

function mapNavLinks(links?: SanityNavLink[]): NavLink[] {
  if (links?.length) {
    return links.map(({ label, href }) => ({ label, href }));
  }
  return defaultNavLinks;
}

function mapCtaButtons(buttons?: SanityCtaButton[]): CtaButtonLink[] {
  if (buttons?.length) {
    return buttons.map(({ label, href, variant }) => ({
      label,
      href,
      variant: variant ?? "primary",
    }));
  }
  return [];
}

export function mapSanitySiteSettings(
  doc: SanitySiteSettingsDoc | null,
): SiteSettings {
  if (!doc) {
    return {
      ...defaultSiteSettings,
      ...defaultSiteExtras,
      navLinks: defaultNavLinks,
    };
  }

  return {
    siteName: doc.siteName,
    tagline: doc.tagline,
    contactEmail: doc.contactEmail,
    footerText: doc.footerText ?? defaultSiteSettings.footerText,
    footerTagline: doc.footerTagline ?? defaultSiteExtras.footerTagline,
    enquiryFormText: doc.enquiryFormText ?? defaultSiteExtras.enquiryFormText,
    navigateHeading: doc.navigateHeading ?? defaultSiteExtras.navigateHeading,
    contactHeading: doc.contactHeading ?? defaultSiteExtras.contactHeading,
    enquiryButtonLabel:
      doc.enquiryButtonLabel ?? defaultSiteExtras.enquiryButtonLabel,
    seoTitleSuffix: doc.seoTitleSuffix ?? defaultSiteExtras.seoTitleSuffix,
    navLinks: mapNavLinks(doc.navLinks),
    logo: doc.logo,
  };
}

export function siteSettingsToSanityDoc(): Record<string, unknown> {
  return {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: defaultSiteSettings.siteName,
    tagline: defaultSiteSettings.tagline,
    contactEmail: defaultSiteSettings.contactEmail,
    footerText: defaultSiteSettings.footerText,
    footerTagline: defaultSiteExtras.footerTagline,
    enquiryFormText: defaultSiteExtras.enquiryFormText,
    navigateHeading: defaultSiteExtras.navigateHeading,
    contactHeading: defaultSiteExtras.contactHeading,
    enquiryButtonLabel: defaultSiteExtras.enquiryButtonLabel,
    seoTitleSuffix: defaultSiteExtras.seoTitleSuffix,
    navLinks: defaultNavLinks.map((link) => ({
      _type: "navLink",
      _key: link.label.toLowerCase().replace(/\s+/g, "-"),
      ...link,
    })),
  };
}

interface SanityPageDoc {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export function mapSanityPageContent(
  doc: SanityPageDoc | null,
  fallback: PageContent,
): PageContent {
  if (!doc?.title) return fallback;

  return {
    title: doc.title,
    description: doc.description,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
  };
}

export function teamPageToSanityDoc() {
  return {
    _id: "teamPage",
    _type: "teamPage",
    ...defaultTeamPageContent,
  };
}

export function papersPageToSanityDoc() {
  return {
    _id: "papersPage",
    _type: "papersPage",
    ...defaultPapersPageContent,
  };
}

export { mapCtaButtons, defaultHeroButtons, defaultCtaButtons };
