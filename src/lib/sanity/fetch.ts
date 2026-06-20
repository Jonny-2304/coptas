import {
  defaultPapersPageContent,
  defaultTeamPageContent,
} from "@/lib/content/defaults";
import {
  seedPublishedPapers,
  seedTeamMembers,
} from "@/lib/content/seed";
import { sanityFetch } from "./client";
import {
  getDefaultHomePageContent,
  mapSanityHomePage,
} from "./homePage";
import {
  homePageQuery,
  papersPageQuery,
  publishedPapersQuery,
  siteSettingsQuery,
  teamMembersQuery,
  teamPageQuery,
} from "./queries";
import {
  mapSanityPageContent,
  mapSanitySiteSettings,
} from "./siteSettings";
import type {
  HomePageContent,
  PageContent,
  PublishedPaper,
  SiteSettings,
  TeamMember,
} from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityFetch<Parameters<typeof mapSanitySiteSettings>[0]>({
    query: siteSettingsQuery,
    revalidate: 300,
  });

  return mapSanitySiteSettings(settings);
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const page = await sanityFetch<Parameters<typeof mapSanityHomePage>[0]>({
    query: homePageQuery,
    revalidate: 300,
  });

  if (page?.visionItems?.length) {
    return mapSanityHomePage(page);
  }

  return getDefaultHomePageContent();
}

export async function getTeamPageContent(): Promise<PageContent> {
  const page = await sanityFetch<Parameters<typeof mapSanityPageContent>[0]>({
    query: teamPageQuery,
    revalidate: 300,
  });

  return mapSanityPageContent(page, defaultTeamPageContent);
}

export async function getPapersPageContent(): Promise<PageContent> {
  const page = await sanityFetch<Parameters<typeof mapSanityPageContent>[0]>({
    query: papersPageQuery,
    revalidate: 300,
  });

  return mapSanityPageContent(page, defaultPapersPageContent);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const members = await sanityFetch<TeamMember[]>({
    query: teamMembersQuery,
    revalidate: 60,
  });

  if (members && members.length > 0) {
    return members;
  }

  return seedTeamMembers.map(({ localPhoto, ...member }) => member);
}

export async function getPublishedPapers(): Promise<PublishedPaper[]> {
  const papers = await sanityFetch<PublishedPaper[]>({
    query: publishedPapersQuery,
    revalidate: 60,
  });

  if (papers && papers.length > 0) {
    return papers;
  }

  return seedPublishedPapers;
}
