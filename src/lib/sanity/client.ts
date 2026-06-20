import { createClient, type QueryParams } from "@sanity/client";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
}): Promise<T | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch<T>(query, params, {
    next: revalidate === false ? { revalidate: 0 } : { revalidate },
  });
}
