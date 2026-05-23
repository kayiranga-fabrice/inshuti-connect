"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquareHeart, Menu, X } from "lucide-react";
import { SiteContainer } from "@/components/SiteContainer";
import { MAIN_NAV } from "@/config/nav";

const navLinkClass =
  "font-bold text-sm text-slate-600 hover:text-primary transition-colors";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <SiteContainer className="h-16 md:h-20 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 text-primary shrink-0" onClick={() => setOpen(false)}>
          <div className="bg-primary p-1.5 md:p-2 rounded-xl">
            <MessageSquareHeart className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <span className="font-black text-lg md:text-2xl tracking-tighter">Inshuti Connect</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5" aria-label="Main">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/install"
            className="hidden sm:inline-flex font-bold text-xs text-primary border border-primary/20 px-3 py-2 rounded-full hover:bg-primary/5"
          >
            Install
          </Link>
          <Link
            href="/ask"
            className="bg-secondary text-primary px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black text-xs md:text-sm hover:opacity-90 transition-all shadow-sm"
          >
            Ask SRH
          </Link>
          <button
            type="button"
            className="lg:hidden text-primary p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </SiteContainer>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-black/40" onClick={() => setOpen(false)} aria-hidden />
      )}

      <nav
        className={`lg:hidden fixed top-16 left-0 right-0 z-50 bg-white border-b shadow-lg transition-transform duration-200 ${
          open ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <ul className="py-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-3.5 font-bold border-b border-slate-50 text-slate-800 hover:bg-slate-50 hover:text-primary`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/install"
              className="block px-4 py-3.5 font-black text-primary bg-secondary/40"
              onClick={() => setOpen(false)}
            >
              Install app on your phone
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
