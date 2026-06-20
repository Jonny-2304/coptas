import { SectionContainer } from "@/components/ui/SectionContainer";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHero({ title, description, className }: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-brand-100/80 bg-hero-mesh bg-texture",
        className,
      )}
    >
      <SectionContainer className="relative py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-brand-950 sm:text-5xl">
            {title}
          </h1>
          <div
            className="mt-5 h-0.5 w-16 rounded-full bg-gradient-to-r from-accent-green via-accent-gold to-accent-teal"
            aria-hidden="true"
          />
          {description && (
            <p className="mt-6 text-lg leading-relaxed text-brand-600 sm:text-xl">
              {description}
            </p>
          )}
        </div>
      </SectionContainer>
    </div>
  );
}
