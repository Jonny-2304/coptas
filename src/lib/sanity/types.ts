export interface SanityImage {
  _type: "image";
  asset:
    | {
        _ref: string;
        _type: "reference";
      }
    | {
        _id: string;
        _type: "sanity.imageAsset";
        url?: string;
        metadata?: {
          dimensions?: {
            width: number;
            height: number;
            aspectRatio?: number;
          };
        };
      };
  alt?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type CtaButtonVariant = "primary" | "outline" | "secondary";

export interface CtaButtonLink {
  label: string;
  href: string;
  variant?: CtaButtonVariant;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: SanityImage | null;
  areasOfInterest?: string[];
  biography?: string;
  displayOrder: number;
}

export interface PublishedPaper {
  _id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  externalLink?: string;
  abstract?: string;
  featured?: boolean;
}

export interface SiteSettings {
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
  navLinks?: NavLink[];
  logo?: SanityImage | null;
}

export const defaultSiteSettings: SiteSettings = {
  siteName: "College of People, Technology and Systems",
  tagline: "Creating our future",
  contactEmail: "contact@coptas.org",
  footerText:
    "CoPTaS is an independent, practitioner-focused, not-for-profit organisation dedicated to applied scholarship.",
};

export interface PageContent {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export interface HomePageVisionItem {
  lead: string;
  text: string;
}

export interface HomePageContent {
  vision: {
    title: string;
    eyebrow?: string;
    items: HomePageVisionItem[];
  };
  aim: {
    title: string;
    description: string;
  };
  purpose: {
    title: string;
    description: string;
  };
  objectives: {
    title: string;
    eyebrow?: string;
    items: string[];
  };
  cta: {
    title: string;
    description: string;
  };
  heroButtons: CtaButtonLink[];
  ctaButtons: CtaButtonLink[];
}

export interface LogoSource {
  src: string;
  width: number;
  height: number;
  alt: string;
}
