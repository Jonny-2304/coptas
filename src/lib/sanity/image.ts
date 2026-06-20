import createImageUrlBuilder, {
  type SanityImageSource,
} from "@sanity/image-url";
import { defaultLogoAlt } from "@/lib/content/logo";
import type { LogoSource, SanityImage } from "./types";
import { dataset, projectId } from "./env";

const builder =
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

const defaultAspectWidth = 1600;
const defaultAspectHeight = 374;

function getAssetDimensions(logo?: SanityImage | null) {
  const asset = logo?.asset;
  if (asset && "metadata" in asset) {
    return asset.metadata?.dimensions ?? null;
  }
  return null;
}

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity image builder is not configured.");
  }
  return builder.image(source);
}

export function getImageUrl(
  source: SanityImageSource | null | undefined,
  width = 400,
  height = 400,
): string | null {
  if (!source || !builder) return null;

  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();
}

function toImageReference(logo: SanityImage): SanityImage {
  const asset = logo.asset;
  if (!asset) return logo;
  if ("_ref" in asset) return logo;

  if ("_id" in asset) {
    return {
      ...logo,
      asset: { _type: "reference", _ref: asset._id },
    };
  }

  return logo;
}

export function getLogoSource(
  logo?: SanityImage | null,
  siteName?: string,
  size: "header" | "hero" | "footer" = "header",
): LogoSource | null {
  if (!logo?.asset || !builder) return null;

  const image = toImageReference(logo);

  const alt = logo.alt ?? siteName ?? defaultLogoAlt;
  const dims = getAssetDimensions(logo);
  const displayWidth = dims?.width ?? defaultAspectWidth;
  const displayHeight = dims?.height ?? defaultAspectHeight;

  const renderWidth =
    size === "hero" ? 1024 : size === "footer" ? 320 : 400;

  return {
    src: builder
      .image(image)
      .width(renderWidth)
      .fit("max")
      .auto("format")
      .url(),
    width: displayWidth,
    height: displayHeight,
    alt,
  };
}

export function getOgImageUrl(logo?: SanityImage | null): string | null {
  if (!logo?.asset || !builder) return null;

  return builder.image(logo).width(1200).height(630).fit("crop").auto("format").url();
}
