"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import { SiteContainer } from "@/components/SiteContainer";
import { MAIN_NAV } from "@/config/nav";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-provider";
import { LanguageSelector } from "@/components/LanguageSelector";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    // notranslate prevents Google Translate from garbling navbar text
    <header className="notranslate bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <SiteContainer className="h-16 md:h-20 flex items-center justify-between gap-4">

        {/* ── Logo (always visible) ── */}
        <Link href="/" className="shrink-0 flex items-center gap-2" onClick={() => setOpen(false)}>

          {/* Mobile: clip to icon-only portion of the logo */}
          <div className="md:hidden overflow-hidden shrink-0" style={{ width: 40, height: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/inshuti-logo.png"
              alt="Inshuti Connect"
              className="h-full w-auto mix-blend-multiply"
              style={{ maxWidth: "none" }}
            />
          </div>

          {/* Mobile: two-tone wordmark */}
          <span className="md:hidden flex items-center gap-1 font-black text-base leading-none">
            <span className="text-primary">Inshuti</span>
            <span className="text-violet">Connect</span>
          </span>

          {/* Desktop: full logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/inshuti-logo.png"
            alt="Inshuti Connect"
            className="hidden md:block h-16 w-auto mix-blend-multiply"
          />
        </Link>

        {/* ── Desktop nav (lg+) ── */}
        <nav className="hidden lg:flex items-center gap-5 flex-1 justify-center" aria-label="Main">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-bold text-[0.8rem] text-slate-600 hover:text-primary transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── Right icons ── */}
        <div className="flex items-center gap-1 shrink-0">

          {/* Globe + theme — only on md+ screens */}
          <span className="hidden md:flex items-center gap-1">
            <LanguageSelector />
            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-full text-slate-600 hover:text-primary hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </span>

          {/* Cart (always visible) */}
          <Link
            href="/shop/cart"
            className="relative p-2 text-slate-600 hover:text-primary transition-colors"
            aria-label={`Cart${count > 0 ? ` (${count})` : ""}`}
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>

          {/* Hamburger (below lg only) */}
          <button
            type="button"
            className="lg:hidden p-2 text-primary"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </SiteContainer>

      {/* ── Mobile backdrop ── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 top-16 z-40 bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* ── Mobile slide-down menu ── */}
      {open && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-white dark:bg-[#162a20] border-b shadow-xl">
          <nav aria-label="Mobile menu">
            <ul>
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center px-5 py-4 font-bold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language + theme in mobile menu */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Preferences
            </span>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <button
                type="button"
                onClick={toggle}
                className="p-2 rounded-full text-slate-600 hover:text-primary hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
