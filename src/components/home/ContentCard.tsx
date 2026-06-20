import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  description: string;
  accent?: "green" | "teal" | "gold";
  className?: string;
}

const accentMap = {
  green: "from-accent-green to-accent-green-light",
  teal: "from-accent-teal to-accent-teal-light",
  gold: "from-accent-gold to-amber-400",
};

export function ContentCard({
  title,
  description,
  accent = "teal",
  className,
}: ContentCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-brand-100/80 bg-surface-elevated p-8 shadow-[var(--shadow-card)] sm:p-10",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          accentMap[accent],
        )}
        aria-hidden="true"
      />
      <h3 className="font-serif text-2xl font-semibold text-brand-950">{title}</h3>
      <p className="mt-4 text-base leading-relaxed text-brand-600">{description}</p>
    </article>
  );
}
