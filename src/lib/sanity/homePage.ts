import {
  defaultCtaButtons,
  defaultHeroButtons,
} from "@/lib/content/defaults";
import { homeContent } from "@/lib/content/home";
import type { CtaButtonLink, HomePageContent } from "@/lib/sanity/types";
import { mapCtaButtons } from "./siteSettings";

interface SanityCtaButton {
  label: string;
  href: string;
  variant?: CtaButtonLink["variant"];
}

/** Sanity homePage document shape from GROQ */
interface SanityHomePageDoc {
  visionTitle: string;
  visionEyebrow?: string;
  visionItems: { lead: string; text: string }[];
  aimTitle: string;
  aimDescription: string;
  purposeTitle: string;
  purposeDescription: string;
  objectivesTitle: string;
  objectivesEyebrow?: string;
  objectivesItems: string[];
  ctaTitle?: string;
  ctaDescription?: string;
  heroButtons?: SanityCtaButton[];
  ctaButtons?: SanityCtaButton[];
}

function ctaButtonsToSanity(buttons: CtaButtonLink[]) {
  return buttons.map((button) => ({
    _type: "ctaButton" as const,
    _key: button.label.toLowerCase().replace(/\s+/g, "-"),
    label: button.label,
    href: button.href,
    variant: button.variant ?? "primary",
  }));
}

export function mapSanityHomePage(doc: SanityHomePageDoc): HomePageContent {
  const heroButtons = mapCtaButtons(doc.heroButtons);
  const ctaButtons = mapCtaButtons(doc.ctaButtons);

  return {
    vision: {
      title: doc.visionTitle,
      eyebrow: doc.visionEyebrow,
      items: doc.visionItems,
    },
    aim: {
      title: doc.aimTitle,
      description: doc.aimDescription,
    },
    purpose: {
      title: doc.purposeTitle,
      description: doc.purposeDescription,
    },
    objectives: {
      title: doc.objectivesTitle,
      eyebrow: doc.objectivesEyebrow,
      items: doc.objectivesItems,
    },
    cta: {
      title: doc.ctaTitle ?? homeContent.cta.title,
      description: doc.ctaDescription ?? homeContent.cta.description,
    },
    heroButtons: heroButtons.length ? heroButtons : defaultHeroButtons,
    ctaButtons: ctaButtons.length ? ctaButtons : defaultCtaButtons,
  };
}

export function homeContentToSanityDoc() {
  return {
    _id: "homePage",
    _type: "homePage" as const,
    visionTitle: homeContent.vision.title,
    visionEyebrow: "What we stand for",
    visionItems: homeContent.vision.items.map((item) => ({
      _type: "visionItem" as const,
      _key: item.lead.toLowerCase().replace(/\s+/g, "-"),
      lead: item.lead,
      text: item.text,
    })),
    aimTitle: homeContent.aim.title,
    aimDescription: homeContent.aim.description,
    purposeTitle: homeContent.purpose.title,
    purposeDescription: homeContent.purpose.description,
    objectivesTitle: homeContent.objectives.title,
    objectivesEyebrow: "What we do",
    objectivesItems: [...homeContent.objectives.items],
    ctaTitle: homeContent.cta.title,
    ctaDescription: homeContent.cta.description,
    heroButtons: ctaButtonsToSanity(defaultHeroButtons),
    ctaButtons: ctaButtonsToSanity(defaultCtaButtons),
  };
}

export function getDefaultHomePageContent(): HomePageContent {
  return {
    vision: {
      title: homeContent.vision.title,
      eyebrow: "What we stand for",
      items: [...homeContent.vision.items],
    },
    aim: { ...homeContent.aim },
    purpose: { ...homeContent.purpose },
    objectives: {
      title: homeContent.objectives.title,
      eyebrow: "What we do",
      items: [...homeContent.objectives.items],
    },
    cta: { ...homeContent.cta },
    heroButtons: defaultHeroButtons,
    ctaButtons: defaultCtaButtons,
  };
}
