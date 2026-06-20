import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
  ariaLabelledby?: string;
  narrow?: boolean;
}

export function SectionContainer({
  children,
  className,
  id,
  as: Component = "section",
  ariaLabelledby,
  narrow = false,
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-4xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </Component>
  );
}

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  id?: string;
  eyebrow?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  description,
  className,
  id,
  eyebrow,
  align = "left",
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "mb-10 sm:mb-12",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-serif text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl"
      >
        {title}
      </h2>
      <div
        className={cn(
          "mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-accent-green via-accent-gold to-accent-teal",
          align === "center" && "mx-auto",
        )}
        aria-hidden="true"
      />
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-brand-600">{description}</p>
      )}
    </header>
  );
}
