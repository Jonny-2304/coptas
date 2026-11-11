import type { Metadata } from "next";
import { ContentCard } from "@/components/home/ContentCard";
import { Hero } from "@/components/home/Hero";
import { VisionCard } from "@/components/home/VisionCard";
import { CtaButton } from "@/components/ui/CtaButton";
import {
  SectionContainer,
  SectionHeading,
} from "@/components/ui/SectionContainer";
import { getOgImageUrl } from "@/lib/sanity/image";
import { getHomePageContent, getSiteSettings } from "@/lib/sanity/fetch";
import type { CtaButtonVariant } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const ogImage = getOgImageUrl(settings.logo);

  return {
    title: "Home",
    description: settings.tagline,
    openGraph: {
      title: settings.siteName,
      description: settings.tagline,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

function darkBannerButtonClass(variant: CtaButtonVariant = "primary") {
  if (variant === "outline") {
    return "border-brand-700 bg-transparent text-white hover:border-brand-500 hover:bg-white/5";
  }
  if (variant === "secondary") {
    return "bg-white/10 text-white ring-1 ring-brand-700 hover:bg-white/15";
  }
  return "bg-white text-brand-950 hover:bg-brand-100";
}

export default async function HomePage() {
  const [settings, content] = await Promise.all([
    getSiteSettings(),
    getHomePageContent(),
  ]);

  const { vision, aim, purpose, objectives, cta, heroButtons, ctaButtons } =
    content;

  return (
    <>
      <Hero
        siteName={settings.siteName}
        tagline={settings.tagline}
        buttons={heroButtons}
        logo={settings.logo}
      />

      <SectionContainer
        id="what-we-stand-for"
        className="scroll-mt-28 py-20 sm:py-28"
        ariaLabelledby="vision-heading"
      >
        <SectionHeading
          id="vision-heading"
          title={vision.title}
          eyebrow={vision.eyebrow}
          align="center"
        />
        <ul
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          role="list"
        >
          {vision.items.map((item, index) => (
            <VisionCard
              key={item.lead}
              index={index}
              lead={item.lead}
              text={item.text}
            />
          ))}
        </ul>
      </SectionContainer>

      <div className="bg-section-alt bg-texture border-y border-brand-100/80">
        <SectionContainer className="py-20 sm:py-28">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <ContentCard
              title={aim.title}
              description={aim.description}
              accent="teal"
            />
            <ContentCard
              title={purpose.title}
              description={purpose.description}
              accent="green"
            />
          </div>
        </SectionContainer>
      </div>

      <SectionContainer
        id="what-we-do"
        className="scroll-mt-28 py-20 sm:py-28"
        ariaLabelledby="objectives-heading"
      >
        <SectionHeading
          id="objectives-heading"
          title={objectives.title}
          eyebrow={objectives.eyebrow}
        />
        <ol className="space-y-4" role="list">
          {objectives.items.map((item, index) => (
            <li
              key={item}
              className="flex gap-5 rounded-2xl border border-brand-100/80 bg-surface-elevated p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] sm:gap-6 sm:p-6"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-950 to-brand-700 text-sm font-semibold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <p className="pt-1.5 text-base leading-relaxed text-brand-700">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </SectionContainer>

      <section
        aria-labelledby="cta-heading"
        className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-28"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-accent-green/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent-teal/10 blur-3xl" />
        </div>
        <SectionContainer className="relative text-center">
          <h2
            id="cta-heading"
            className="font-serif text-3xl font-semibold sm:text-4xl"
          >
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-300">{cta.description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {ctaButtons.map((button) => (
              <CtaButton
                key={`${button.href}-${button.label}`}
                href={button.href}
                variant={button.variant ?? "primary"}
                className={cn(darkBannerButtonClass(button.variant))}
              >
                {button.label}
              </CtaButton>
            ))}
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
