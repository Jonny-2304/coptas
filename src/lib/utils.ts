import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function formatAuthors(authors: string[]): string {
  if (authors.length === 0) return "";
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
  return `${authors.slice(0, -1).join(", ")}, and ${authors[authors.length - 1]}`;
}

export function formatCitation(
  authors: string[],
  year: number,
  title: string,
  journal: string,
): string {
  return `${formatAuthors(authors)} (${year}). ${title}. ${journal}.`;
}
