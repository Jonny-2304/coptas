import { cn } from "@/lib/utils";

const accentStyles = [
  "border-l-accent-green",
  "border-l-accent-teal",
  "border-l-accent-gold",
  "border-l-accent-green-light",
  "border-l-accent-teal-light",
];

interface VisionCardProps {
  index: number;
  lead: string;
  text: string;
}

export function VisionCard({ index, lead, text }: VisionCardProps) {
  return (
    <li
      className={cn(
        "group relative rounded-2xl border border-brand-100/80 bg-surface-elevated p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] sm:p-7",
        "border-l-4",
        accentStyles[index % accentStyles.length],
      )}
    >
      <span
        className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 ring-1 ring-brand-100"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-serif text-lg font-semibold text-brand-950 sm:text-xl">
        {lead}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-600 sm:text-base">
        {text}
      </p>
    </li>
  );
}
