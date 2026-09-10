"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";

const LANGUAGES = [
  { code: "", label: "English" },
  { code: "rw", label: "Ikinyarwanda" },
  { code: "fr", label: "Français" },
  { code: "sw", label: "Kiswahili" },
];

function triggerGoogleTranslate(langCode: string) {
  // Google Translate creates a <select class="goog-te-combo"> inside the hidden widget.
  // Setting its value and firing a change event translates the whole page in-place.
  const attempt = (retries: number) => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else if (retries > 0) {
      setTimeout(() => attempt(retries - 1), 300);
    }
  };
  attempt(10);
}

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(code: string) {
    setOpen(false);
    setActive(code);
    triggerGoogleTranslate(code);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`p-2 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/10 ${
          active ? "text-violet" : "text-slate-600 hover:text-primary"
        }`}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="w-5 h-5" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#162a20] border border-slate-100 dark:border-[#1e3a2e] rounded-2xl shadow-xl py-1.5 z-50"
        >
          <p className="px-4 pt-2 pb-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Language
          </p>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={active === lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className="w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                {lang.label}
              </span>
              {active === lang.code && (
                <Check className="w-3.5 h-3.5 text-violet shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
