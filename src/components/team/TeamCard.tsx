import Image from "next/image";
import type { TeamMember } from "@/lib/sanity/types";
import { getImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import { TeamAccordion } from "./TeamAccordion";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const sanityPhotoUrl = member.photo ? getImageUrl(member.photo, 400, 400) : null;
  const photoUrl = sanityPhotoUrl;
  const isLead = member.role.toLowerCase().includes("ceo");

  const accordionItems = [];

  if (member.areasOfInterest && member.areasOfInterest.length > 0) {
    accordionItems.push({
      id: `${member._id}-interests`,
      title: "Areas of Interest",
      content: (
        <ul className="flex flex-wrap gap-2">
          {member.areasOfInterest.map((area) => (
            <li
              key={area}
              className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs text-brand-700 ring-1 ring-brand-100"
            >
              {area}
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (member.biography) {
    accordionItems.push({
      id: `${member._id}-bio`,
      title: "Biography",
      content: <p className="whitespace-pre-line">{member.biography}</p>,
    });
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface-elevated shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]",
        isLead
          ? "border-accent-teal/30 ring-1 ring-accent-teal/10"
          : "border-brand-100/80",
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-50">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.photo?.alt ?? `Portrait of ${member.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200"
            role="img"
            aria-label={`Placeholder image for ${member.name}`}
          >
            <span className="font-serif text-5xl font-semibold text-brand-300/80">
              {getInitials(member.name)}
            </span>
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-950/40 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-semibold text-brand-950">
              {member.name}
            </h2>
            <p className="mt-1 text-sm text-brand-500">{member.role}</p>
          </div>
          {isLead && (
            <span className="shrink-0 rounded-full bg-accent-teal/10 px-2.5 py-0.5 text-xs font-medium text-accent-teal">
              Lead
            </span>
          )}
        </div>

        {accordionItems.length > 0 && (
          <TeamAccordion items={accordionItems} className="mt-5" />
        )}
      </div>
    </article>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
