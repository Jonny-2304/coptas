import { Logo } from "@/components/layout/Logo";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import type { CtaButtonLink, SanityImage } from "@/lib/sanity/types";

interface HeroProps {
  siteName: string;
  tagline: string;
  buttons: CtaButtonLink[];
  logo?: SanityImage | null;
}

export function Hero({ siteName, tagline, buttons, logo }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-brand-100/80 bg-hero-mesh"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-accent-green/5 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full bg-accent-gold/5 blur-3xl" />
      </div>

      <SectionContainer className="relative py-16 sm:py-24 lg:py-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="animate-fade-up w-full">
            <Logo
              size="hero"
              priority
              logo={logo}
              siteName={siteName}
            />
          </div>

          <h1 id="hero-heading" className="sr-only">
            {siteName} — {tagline}
          </h1>

          <div className="animate-fade-up mt-10 flex flex-col items-center gap-3 sm:flex-row [animation-delay:160ms]">
            {buttons.map((button) => (
              <CtaButton
                key={`${button.href}-${button.label}`}
                href={button.href}
                variant={button.variant ?? "primary"}
              >
                {button.label}
              </CtaButton>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
