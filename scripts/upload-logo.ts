/**
 * Upload the cropped logo (public/images/coptas-logo.png) to Sanity.
 *
 * Preferred (uses sanity login — no API token needed):
 *   npm run sanity:upload-logo
 *
 * Alternative (needs Editor token in .env.local):
 *   npm run sanity:upload-logo:token
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getCliClient } from "sanity/cli";
import { defaultLogoAlt, logoHeight, logoPath, logoWidth } from "../src/lib/content/logo";

function getClient() {
  if (process.env.SANITY_AUTH_TOKEN) {
    return getCliClient({ apiVersion: "2024-06-14" });
  }

  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    process.env.SANITY_STUDIO_PROJECT_ID;
  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    process.env.SANITY_STUDIO_DATASET ??
    "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !token) {
    throw new Error(
      "No auth found. Run: npm run sanity:upload-logo\nOr add SANITY_API_WRITE_TOKEN (Editor) to .env.local",
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-06-14",
    token,
    useCdn: false,
  });
}

async function main() {
  const client = getClient();
  const absolutePath = resolve(process.cwd(), "public", logoPath.replace(/^\//, ""));
  const buffer = readFileSync(absolutePath);

  console.log(`Uploading cropped logo ${logoWidth}×${logoHeight} from ${logoPath}…\n`);

  const asset = await client.assets.upload("image", buffer, {
    filename: "coptas-logo.png",
  });

  const dims = asset.metadata?.dimensions;
  console.log(`✓ Uploaded (${dims?.width}×${dims?.height})`);

  await client
    .patch("siteSettings")
    .set({
      logo: {
        _type: "image",
        alt: defaultLogoAlt,
        asset: { _type: "reference", _ref: asset._id },
      },
    })
    .commit();

  console.log("✓ Site Settings updated — refresh localhost:3000");
}

main().catch((error: unknown) => {
  const err = error as { statusCode?: number; message?: string };
  if (err.statusCode === 403) {
    console.error(`
Permission denied — your API token is Viewer-only.

Fix (recommended, no token needed):
  1. sanity login
  2. npm run sanity:upload-logo

Or create an Editor token:
  https://sanity.io/manage/project/clo3nxn1/api/tokens
  → add SANITY_API_WRITE_TOKEN=sk... to .env.local
  → npm run sanity:upload-logo:token

Or upload manually in Studio:
  Site Settings → remove old logo → upload public/images/coptas-logo.png → Publish
`);
  } else {
    console.error(error);
  }
  process.exit(1);
});
