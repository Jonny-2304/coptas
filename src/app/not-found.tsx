import Link from "next/link";
import { SectionContainer } from "@/components/ui/SectionContainer";

export default function NotFound() {
  return (
    <SectionContainer className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-teal">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-brand-950">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-brand-600">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded-full bg-brand-950 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        Return home
      </Link>
    </SectionContainer>
  );
}
