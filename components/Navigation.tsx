"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About", href: isHome ? "#about" : "/#about" },
    { label: "How It Works", href: isHome ? "#how-it-works" : "/#how-it-works" },
    { label: "Judges", href: isHome ? "#judges" : "/#judges" },
    { label: "Awards", href: isHome ? "#awards" : "/#awards" },
    { label: "FAQ", href: isHome ? "#faq" : "/#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen || !isHome
          ? "nav-blur bg-[#070b18]/90 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L8 3L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 9.5H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-white leading-tight">Entrepreneurship Club</div>
              <div className="text-[10px] text-slate-400 leading-tight">SABIS Sharjah</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/register"
              className="btn-primary px-5 py-2.5 rounded-lg text-sm uppercase tracking-wider"
            >
              Register
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-slate-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 border-t border-white/5" : "max-h-0"
        }`}
      >
        <div className="px-5 py-4 space-y-1 bg-[#070b18]/95 nav-blur">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block py-2.5 text-sm text-slate-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3">
            <Link
              href="/register"
              className="btn-primary block text-center px-5 py-3 rounded-lg text-sm uppercase tracking-wider"
              onClick={() => setMenuOpen(false)}
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
