"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const mainLinks = [
  { href: "/bizuteria", label: "Biżuteria" },
  { href: "/zegarki", label: "Zegarki" },
  { href: "/serwis", label: "Serwis" },
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-light-border bg-white">
      {/* Logo row */}
      <div className="flex items-center justify-between px-6 py-5 sm:justify-center sm:py-6">
        <Link href="/">
          <Image
            src="/logo/logo-horizontal.svg"
            alt="Zegarmistrzostwo"
            width={280}
            height={52}
            className="h-8 w-auto sm:h-11"
            priority
          />
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
      </div>

      {/* Nav links — desktop */}
      <div className="hidden border-t border-light-border sm:block">
        <div className="flex justify-center gap-10 py-3 text-[0.68rem] font-medium uppercase tracking-wide-caps text-text-light">
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
