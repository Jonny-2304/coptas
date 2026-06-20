import type { Metadata } from "next";
import { TeamCard } from "@/components/team/TeamCard";
import { PageHero } from "@/components/ui/PageHero";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getSiteSettings, getTeamMembers, getTeamPageContent } from "@/lib/sanity/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([
    getSiteSettings(),
    getTeamPageContent(),
  ]);
  const suffix = settings.seoTitleSuffix ?? "CoPTaS";

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    openGraph: {
      title: `${page.seoTitle} | ${suffix}`,
      description: page.seoDescription,
    },
  };
}

export default async function TeamPage() {
  const [page, members] = await Promise.all([
    getTeamPageContent(),
    getTeamMembers(),
  ]);

  return (
    <>
      <PageHero title={page.title} description={page.description} />

      <SectionContainer className="py-16 sm:py-24">
        {members.length > 0 ? (
          <ul
            className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
            role="list"
            aria-label="Team members"
          >
            {members.map((member) => (
              <li key={member._id}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 px-6 py-20 text-center"
            role="status"
          >
            <p className="font-medium text-brand-800">Team profiles coming soon</p>
            <p className="mt-2 text-sm text-brand-600">
              Team members will appear here once added in Sanity CMS.
            </p>
          </div>
        )}
      </SectionContainer>
    </>
  );
}
