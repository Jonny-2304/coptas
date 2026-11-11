import type { CtaButtonLink, NavLink, PageContent } from "@/lib/sanity/types";

export const defaultNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "What We Stand For", href: "/#what-we-stand-for" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Our Team", href: "/team" },
  { label: "Published Papers", href: "/papers" },
  { label: "Contact", href: "#contact" },
];

export const defaultHeroButtons: CtaButtonLink[] = [
  { label: "Our Team", href: "/team", variant: "primary" },
  { label: "Published Papers", href: "/papers", variant: "outline" },
  { label: "Contact Us", href: "#contact", variant: "secondary" },
];

export const defaultCtaButtons: CtaButtonLink[] = [
  { label: "Our Team", href: "/team", variant: "primary" },
  { label: "Published Papers", href: "/papers", variant: "outline" },
];

export const defaultTeamPageContent: PageContent = {
  title: "Our Team",
  description:
    "CoPTaS brings together experienced practitioners and researchers to explore complex socio-technical systems through collaboration and inquiry.",
  seoTitle: "Our Team",
  seoDescription:
    "Meet the researchers and practitioners behind the College of People, Technology and Systems.",
};

export const defaultPapersPageContent: PageContent = {
  title: "Our Published Papers",
  description:
    "A collection of peer-reviewed publications and conference papers from CoPTaS researchers and collaborators.",
  seoTitle: "Our Published Papers",
  seoDescription:
    "Browse published research and scholarship from the College of People, Technology and Systems.",
};

export const defaultSiteExtras = {
  footerTagline: "Independent · Practitioner-focused · Not-for-profit",
  enquiryFormText:
    "Enquiry form coming soon. Please reach out via email in the meantime.",
  navigateHeading: "Navigate",
  contactHeading: "Get in Touch",
  enquiryButtonLabel: "Send an Email",
  seoTitleSuffix: "CoPTaS",
};
