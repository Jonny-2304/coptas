"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface TeamAccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function TeamAccordion({ items, className }: TeamAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("divide-y divide-brand-100 border-t border-brand-100", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-brand-900 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.title}
                <ChevronIcon open={isOpen} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                "overflow-hidden pb-3 text-sm leading-relaxed text-brand-700",
                isOpen ? "animate-accordion-open" : "",
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 text-brand-500 transition-transform duration-200",
        open && "rotate-180",
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
