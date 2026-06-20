import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import type { NavLink, SanityImage } from "@/lib/sanity/types";

interface FooterProps {
  siteName: string;
  contactEmail: string;
  footerText?: string;
  footerTagline?: string;
  enquiryFormText?: string;
  navigateHeading?: string;
  contactHeading?: string;
  enquiryButtonLabel?: string;
  navLinks: NavLink[];
  logo?: SanityImage | null;
}

export function Footer({
  siteName,
  contactEmail,
  footerText,
  footerTagline,
  enquiryFormText,
  navigateHeading = "Navigate",
  contactHeading = "Get in Touch",
  enquiryButtonLabel = "Send an Email",
  navLinks,
  logo,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative mt-auto overflow-hidden bg-brand-950 text-brand-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-accent-green/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-accent-teal/20 blur-3xl" />
      </div>

      <SectionContainer className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo size="footer" asImage logo={logo} siteName={siteName} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-brand-300">
              {footerText ??
                "We welcome enquiries from researchers, practitioners, and organisations interested in applied scholarship."}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
              {navigateHeading}
            </h2>
            <nav aria-label="Footer navigation" className="mt-4">
              <ul className="space-y-3 text-sm">
                {navLinks.map((link) => (
                  <FooterLink
                    key={`${link.href}-${link.label}`}
                    href={resolveFooterHref(link, contactEmail)}
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
              {contactHeading}
            </h2>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-4 inline-flex items-center gap-2.5 text-lg font-medium text-white transition-colors hover:text-brand-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
            >
              <MailIcon />
              {contactEmail}
            </a>
            <div
              className="mt-6 rounded-xl border border-brand-800 bg-brand-900/60 p-5"
              role="region"
              aria-label="Contact form placeholder"
            >
              <p className="text-sm text-brand-400">{enquiryFormText}</p>
              <CtaButton
                href={`mailto:${contactEmail}`}
                className="mt-4 bg-white text-brand-950 hover:bg-brand-100"
              >
                {enquiryButtonLabel}
              </CtaButton>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-brand-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-500">
            &copy; {year} {siteName}
          </p>
          {footerTagline && (
            <p className="text-xs text-brand-500">{footerTagline}</p>
          )}
        </div>
      </SectionContainer>
    </footer>
  );
}

function resolveFooterHref(link: NavLink, contactEmail: string): string {
  if (link.href === "#contact" || link.label.toLowerCase() === "contact") {
    return `mailto:${contactEmail}`;
  }
  return link.href;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "text-brand-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400";

  if (href.startsWith("mailto:")) {
    return (
      <li>
        <a href={href} className={className}>
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={className}>
        {children}
      </Link>
    </li>
  );
}

function MailIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-accent-teal-light"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}
