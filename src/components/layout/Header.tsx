"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import type { NavLink, SanityImage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

interface HeaderProps {
  navLinks: NavLink[];
  logo?: SanityImage | null;
  siteName: string;
}

export function Header({ navLinks, logo, siteName }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-brand-100/80 bg-surface-elevated/90 shadow-[var(--shadow-soft)] backdrop-blur-md"
          : "border-b border-transparent bg-surface-elevated/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:gap-8 lg:px-8">
        <Logo size="header" priority logo={logo} siteName={siteName} />

        <nav className="hidden lg:block" aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <NavLink href={link.href} active={isActive(pathname, link.href)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2.5 text-brand-700 ring-1 ring-brand-100 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls={menuId}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-[65px] z-40 bg-brand-950/20 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            id={menuId}
            className="relative z-50 border-t border-brand-100 bg-surface-elevated lg:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col px-4 py-4">
              {navLinks.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <NavLink
                    href={link.href}
                    active={isActive(pathname, link.href)}
                    mobile
                    onNavigate={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("#")) return false;
  return pathname.startsWith(href);
}

function NavLink({
  href,
  active,
  children,
  mobile = false,
  onNavigate,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const classes = cn(
    "relative block rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
    mobile ? "py-3.5 text-base" : "",
    active
      ? "text-brand-950"
      : "text-brand-600 hover:text-brand-900",
  );

  const content = (
    <>
      {children}
      {active && !mobile && (
        <span
          className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent-green to-accent-teal"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} onClick={onNavigate}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onNavigate}>
      {content}
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
