/**
 * Remove duplicate singleton documents (created via Studio "Create new").
 *
 * Usage: npm run sanity:cleanup-singletons
 */

import { getCliClient } from "sanity/cli";

const SINGLETON_IDS = new Set([
  "siteSettings",
  "homePage",
  "teamPage",
  "papersPage",
]);

async function main() {
  const client = getCliClient({ apiVersion: "2024-06-14" });

  const singletonTypes = [
    "siteSettings",
    "homePage",
    "teamPage",
    "papersPage",
  ];

  for (const type of singletonTypes) {
    const docs = await client.fetch<{ _id: string }[]>(
      `*[_type == $type && !(_id in $ids)]{ _id }`,
      { type, ids: [...SINGLETON_IDS] },
    );

    for (const doc of docs) {
      await client.delete(doc._id);
      console.log(`✓ Deleted duplicate ${type}: ${doc._id}`);
    }
  }

  console.log("\nDone — website now reads fixed singleton IDs only.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
