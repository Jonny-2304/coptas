"use client";

import { useMemo, useState } from "react";
import type { PublishedPaper } from "@/lib/sanity/types";
import { PaperCard } from "./PaperCard";
import { SearchInput } from "@/components/ui/SearchInput";

interface PaperListProps {
  papers: PublishedPaper[];
}

export function PaperList({ papers }: PaperListProps) {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const years = useMemo(() => {
    const uniqueYears = [...new Set(papers.map((p) => p.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, [papers]);

  const filteredPapers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return papers.filter((paper) => {
      const matchesYear =
        yearFilter === "all" || paper.year.toString() === yearFilter;

      if (!normalizedQuery) return matchesYear;

      const searchable = [
        paper.title,
        paper.journal,
        paper.authors.join(" "),
        paper.abstract ?? "",
        paper.year.toString(),
      ]
        .join(" ")
        .toLowerCase();

      return matchesYear && searchable.includes(normalizedQuery);
    });
  }, [papers, query, yearFilter]);

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-brand-100/80 bg-surface-elevated p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by title, author, journal, or year…"
            label="Search papers"
            className="flex-1"
          />

          <div className="sm:w-44">
            <label
              htmlFor="year-filter"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-500"
            >
              Year
            </label>
            <select
              id="year-filter"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="block w-full rounded-xl border border-brand-100 bg-surface-elevated px-3 py-3 text-brand-900 shadow-[var(--shadow-soft)] focus:border-accent-teal/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
            >
              <option value="all">All years</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-brand-500" aria-live="polite">
        Showing{" "}
        <span className="font-medium text-brand-800">{filteredPapers.length}</span>{" "}
        of {papers.length} publication{papers.length === 1 ? "" : "s"}
      </p>

      {filteredPapers.length > 0 ? (
        <ul className="grid gap-6" role="list">
          {filteredPapers.map((paper) => (
            <li key={paper._id}>
              <PaperCard paper={paper} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 px-6 py-16 text-center"
          role="status"
        >
          <p className="font-medium text-brand-800">No papers found</p>
          <p className="mt-1 text-sm text-brand-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
