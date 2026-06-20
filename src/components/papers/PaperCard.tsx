import type { PublishedPaper } from "@/lib/sanity/types";
import { formatCitation } from "@/lib/utils";

interface PaperCardProps {
  paper: PublishedPaper;
}

export function PaperCard({ paper }: PaperCardProps) {
  const citation = formatCitation(
    paper.authors,
    paper.year,
    paper.title,
    paper.journal,
  );
  const hasLink = Boolean(paper.externalLink);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-brand-100/80 bg-surface-elevated p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <span className="inline-flex items-center rounded-full bg-brand-950 px-3 py-1 text-xs font-semibold tabular-nums text-white">
          {paper.year}
        </span>
        {paper.featured && (
          <span className="inline-flex rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-medium text-accent-800">
            Featured
          </span>
        )}
      </div>

      <header className="mt-4">
        <h2 className="font-serif text-lg font-semibold leading-snug text-brand-950 sm:text-xl">
          {hasLink ? (
            <a
              href={paper.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {paper.title}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          ) : (
            paper.title
          )}
        </h2>
        <p className="mt-2 text-sm text-brand-500">{paper.authors.join(", ")}</p>
      </header>

      <blockquote className="mt-5 rounded-xl bg-brand-50/80 px-5 py-4">
        <p className="text-sm italic leading-relaxed text-brand-700">{citation}</p>
      </blockquote>

      {paper.abstract && (
        <details className="mt-5 group/details">
          <summary className="cursor-pointer text-sm font-medium text-accent-teal transition-colors hover:text-accent-teal-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">
            Read abstract
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-brand-600">
            {paper.abstract}
          </p>
        </details>
      )}

      {hasLink && (
        <footer className="mt-5 border-t border-brand-100 pt-5">
          <a
            href={paper.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-800 transition-colors hover:text-accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            View publication
            <ExternalLinkIcon />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </footer>
      )}
    </article>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}
