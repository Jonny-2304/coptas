import Link from "next/link";
import { cn } from "@/lib/utils";

type CtaButtonVariant = "primary" | "secondary" | "outline";

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: CtaButtonVariant;
  className?: string;
  external?: boolean;
}

const variantStyles: Record<CtaButtonVariant, string> = {
  primary:
    "bg-brand-950 text-white shadow-sm hover:bg-brand-800 focus-visible:ring-brand-600",
  secondary:
    "bg-brand-50 text-brand-900 ring-1 ring-brand-100 hover:bg-brand-100 focus-visible:ring-brand-400",
  outline:
    "border border-brand-200 bg-surface-elevated text-brand-900 hover:border-brand-300 hover:bg-brand-50 focus-visible:ring-brand-400",
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: CtaButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variantStyles[variant],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
