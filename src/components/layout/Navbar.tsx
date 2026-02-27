"use client";

import Link from "next/link";
import { useState } from "react";

const mainLinks = [
  { href: "/oferta", label: "Biżuteria" },
  { href: "/oferta", label: "Zegarki" },
  { href: "/oferta", label: "Serwis" },
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-light-border bg-white">
      {/* Top row */}
      <div className="relative flex items-center justify-between px-6 pt-4 pb-3 sm:px-8">
        <div className="hidden items-center gap-5 text-[0.65rem] tracking-wide-caps text-text-light uppercase sm:flex">
          <Link href="/kontakt" className="transition-colors hover:text-charcoal">
            Lokalizacja
          </Link>
        </div>

        {/* Centered logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-lg font-light uppercase tracking-heading text-charcoal sm:text-xl"
        >
          Zegarmistrzostwo
        </Link>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg
            className="h-5 w-5 text-charcoal"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        {/* Right icon placeholder */}
        <div className="hidden sm:block">
          <svg
            className="h-4 w-4 text-text-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>

      {/* Main links — desktop */}
      <div className="hidden justify-center gap-8 pb-4 text-[0.68rem] font-medium uppercase tracking-wide-caps text-text-light sm:flex">
        {mainLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="transition-colors hover:text-charcoal"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-light-border bg-white px-6 py-4 sm:hidden">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-sm uppercase tracking-wide-caps text-text-light"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
