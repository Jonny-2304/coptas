import type { Metadata } from "next";
import { PaperList } from "@/components/papers/PaperList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionContainer } from "@/components/ui/SectionContainer";
import {
  getPapersPageContent,
  getPublishedPapers,
  getSiteSettings,
} from "@/lib/sanity/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([
    getSiteSettings(),
    getPapersPageContent(),
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

export default async function PapersPage() {
  const [page, papers] = await Promise.all([
    getPapersPageContent(),
    getPublishedPapers(),
  ]);

  return (
    <>
      <PageHero title={page.title} description={page.description} />

      <SectionContainer className="py-16 sm:py-24">
        {papers.length > 0 ? (
          <PaperList papers={papers} />
        ) : (
          <div
            className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 px-6 py-20 text-center"
            role="status"
          >
            <p className="font-medium text-brand-800">Publications coming soon</p>
            <p className="mt-2 text-sm text-brand-600">
              Published papers will appear here once added in Sanity CMS.
            </p>
          </div>
        )}
      </SectionContainer>
    </>
  );
}
