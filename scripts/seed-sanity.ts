/**
 * Bulk seed Sanity CMS from demo/seed data.
 *
 * Usage:
 *   1. Create a token at sanity.io/manage → Project → API → Tokens (Editor)
 *   2. Add SANITY_API_WRITE_TOKEN=... to .env.local
 *   3. npm run sanity:seed
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defaultLogoAlt, logoPath } from "../src/lib/content/logo";
import {
  seedPublishedPapers,
  seedTeamMembers,
} from "../src/lib/content/seed";
import { homeContentToSanityDoc } from "../src/lib/sanity/homePage";
import {
  papersPageToSanityDoc,
  siteSettingsToSanityDoc,
  teamPageToSanityDoc,
} from "../src/lib/sanity/siteSettings";

config({ path: ".env.local" });

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

if (!token) {
  console.error(`
Missing SANITY_API_WRITE_TOKEN in .env.local

Create one at:
  https://sanity.io/manage/project/${projectId}/api/tokens

→ Add API token → Name: "Seed script" → Permissions: Editor → Save
→ Copy token into .env.local:

  SANITY_API_WRITE_TOKEN=sk...
`);
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-06-14",
  token,
  useCdn: false,
});

async function uploadLocalImage(relativePath: string, alt: string) {
  const absolutePath = resolve(
    process.cwd(),
    "public",
    relativePath.replace(/^\//, ""),
  );
  const buffer = readFileSync(absolutePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: relativePath.split("/").pop() ?? "image.png",
  });

  return {
    _type: "image" as const,
    alt,
    asset: {
      _type: "reference" as const,
      _ref: asset._id,
    },
  };
}

async function seedSiteSettings() {
  const doc = siteSettingsToSanityDoc();

  try {
    doc.logo = await uploadLocalImage(
      logoPath,
      defaultLogoAlt,
    );
    console.log("  ↑ uploaded logo");
  } catch {
    console.warn("  ⚠ could not upload logo");
  }

  await client.createOrReplace(doc);
  console.log("✓ Site Settings");
}

async function seedTeam() {
  for (const member of seedTeamMembers) {
    const doc: Record<string, unknown> = {
      _id: member._id.replace("seed-", "team-"),
      _type: "teamMember",
      name: member.name,
      role: member.role,
      displayOrder: member.displayOrder,
    };

    if (member.areasOfInterest?.length) {
      doc.areasOfInterest = member.areasOfInterest;
    }

    if (member.biography) {
      doc.biography = member.biography;
    }

    if (member.localPhoto) {
      try {
        doc.photo = await uploadLocalImage(
          member.localPhoto,
          `Portrait of ${member.name}`,
        );
        console.log(`  ↑ uploaded photo for ${member.name}`);
      } catch {
        console.warn(`  ⚠ could not upload photo for ${member.name}`);
      }
    }

    await client.createOrReplace(doc);
    console.log(`✓ Team Member: ${member.name}`);
  }
}

async function seedPapers() {
  for (const paper of seedPublishedPapers) {
    const doc: Record<string, unknown> = {
      _id: paper._id.replace("seed-", "paper-"),
      _type: "publishedPaper",
      title: paper.title,
      authors: paper.authors,
      year: paper.year,
      journal: paper.journal,
    };

    if (paper.abstract) doc.abstract = paper.abstract;
    if (paper.featured) doc.featured = paper.featured;
    if (paper.externalLink) doc.externalLink = paper.externalLink;
    else {
      doc.externalLink = `https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`;
    }

    await client.createOrReplace(doc);
    console.log(`✓ Paper: ${paper.title.slice(0, 60)}…`);
  }
}

async function seedHomePage() {
  await client.createOrReplace(homeContentToSanityDoc());
  console.log("✓ Home Page");
}

async function seedTeamPage() {
  await client.createOrReplace(teamPageToSanityDoc());
  console.log("✓ Team Page");
}

async function seedPapersPage() {
  await client.createOrReplace(papersPageToSanityDoc());
  console.log("✓ Papers Page");
}

async function main() {
  console.log(`Seeding ${projectId} / ${dataset}\n`);

  await seedSiteSettings();
  await seedHomePage();
  await seedTeamPage();
  await seedPapersPage();
  await seedTeam();
  await seedPapers();

  console.log("\nDone! Refresh http://localhost:3000 and Sanity Studio.");
}

main().catch((error: unknown) => {
  const err = error as { statusCode?: number; message?: string };
  if (err.statusCode === 403) {
    console.error(`
Permission denied — token needs Editor (or Developer) access, not Viewer.

Fix option A — new token:
  https://sanity.io/manage/project/${projectId}/api/tokens
  → Add API token → Permissions: Editor → copy to SANITY_API_WRITE_TOKEN

Fix option B — no token needed (uses sanity login):
  npm run sanity:seed:cli
`);
  }
  console.error(error);
  process.exit(1);
});
