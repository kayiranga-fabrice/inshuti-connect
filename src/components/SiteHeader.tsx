"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import { SiteContainer } from "@/components/SiteContainer";
import { MAIN_NAV } from "@/config/nav";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-provider";
import { LanguageSelector } from "@/components/LanguageSelector";

const navLinkClass =
  "font-bold text-[0.8rem] text-slate-600 hover:text-primary transition-colors";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <SiteContainer className="h-14 md:h-16 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/inshuti-logo.png"
            alt="Inshuti Connect"
            className="h-9 w-auto md:h-11"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5" aria-label="Main">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language selector */}
          <LanguageSelector />

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            className="p-2 text-slate-600 hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Cart icon */}
          <Link
            href="/shop/cart"
            className="relative p-2 text-slate-600 hover:text-primary transition-colors"
            aria-label={`Cart${count > 0 ? ` (${count} items)` : ""}`}
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="lg:hidden text-primary p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </SiteContainer>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 top-14 z-40 bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile menu */}
      <nav
        className={`lg:hidden fixed top-14 left-0 right-0 z-50 bg-white border-b shadow-lg transition-transform duration-200 ${
          open ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <ul className="py-2 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-3 font-bold border-b border-slate-50 text-slate-800 hover:bg-slate-50 hover:text-primary text-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
