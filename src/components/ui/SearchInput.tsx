"use client";

import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  label = "Search",
  id = "search",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <SearchIcon className="h-5 w-5 text-brand-400" aria-hidden="true" />
      </div>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-xl border border-brand-100 bg-surface-elevated py-3 pl-11 pr-4 text-brand-900 shadow-[var(--shadow-soft)] placeholder:text-brand-400 transition-shadow focus:border-accent-teal/40 focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
        autoComplete="off"
      />
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}
