import Image from "next/image";
import Link from "next/link";
import { getLogoSource } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type LogoSize = "header" | "hero" | "footer";

interface LogoProps {
  className?: string;
  priority?: boolean;
  size?: LogoSize;
  asImage?: boolean;
  logo?: SanityImage | null;
  siteName?: string;
}

const imageSizes: Record<LogoSize, string> = {
  header: "h-[4.5rem] w-auto sm:h-20 lg:h-[5.5rem]",
  hero: "mx-auto w-full max-w-5xl h-auto",
  footer: "h-14 w-auto sm:h-16",
};

export function Logo({
  className,
  priority = false,
  size = "header",
  asImage = false,
  logo,
  siteName,
}: LogoProps) {
  const source = getLogoSource(logo, siteName, size);

  if (!source) {
    return null;
  }

  const image = (
    <Image
      src={source.src}
      alt={source.alt}
      width={source.width}
      height={source.height}
      priority={priority}
      className={cn(
        imageSizes[size],
        "block object-contain object-left",
        size === "hero" && "object-center",
        size === "footer" && "brightness-0 invert",
        !asImage && "transition-opacity group-hover:opacity-85",
        className,
      )}
    />
  );

  if (asImage) {
    return image;
  }

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        size === "hero" && "flex w-full justify-center",
      )}
    >
      {image}
    </Link>
  );
}
