"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/za-nas", label: "За нас" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/produkti", label: "Продукти" },
  { href: "/galeriya", label: "Галерия" },
  { href: "/kontakti", label: "Контакти" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Основна навигация">
        <Link href="/" className="flex items-center">
          <Image src="/logo.jpg" alt="MASTERTRAF" width={180} height={48} className="h-12 w-auto" priority />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/kontakti"
              className="ml-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Обадете се
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Затвори менюто" : "Отвори менюто"}
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-neutral-200 bg-white md:hidden">
          <ul className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/kontakti"
                className="mt-2 block rounded-lg bg-primary-500 px-4 py-2.5 text-center text-base font-semibold text-white hover:bg-primary-600"
                onClick={() => setMenuOpen(false)}
              >
                Обадете се
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
