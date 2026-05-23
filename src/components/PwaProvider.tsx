"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";
import Link from "next/link";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaProvider() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    );

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const onInstallable = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onInstallable);
    return () => window.removeEventListener("beforeinstallprompt", onInstallable);
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  if (isStandalone || dismissed) return null;

  if (deferred) {
    return (
      <div className="fixed bottom-20 left-2 right-2 z-[70] sm:left-auto sm:right-4 sm:max-w-sm">
        <div className="bg-primary text-white rounded-2xl shadow-2xl p-4 border border-white/10 flex gap-3 items-start">
          <Download className="w-6 h-6 shrink-0 text-secondary mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm">Install Inshuti Connect</p>
            <p className="text-white/80 text-xs font-medium mt-1">
              Add to your home screen for quick access — works on small phones too.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={install}
                className="bg-secondary text-primary px-4 py-2 rounded-full text-xs font-black uppercase"
              >
                Install
              </button>
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="text-white/70 px-3 py-2 text-xs font-bold"
              >
                Not now
              </button>
            </div>
          </div>
          <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss" className="text-white/60">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-2 z-[70] sm:right-4">
      <Link
        href="/install"
        className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-black uppercase tracking-wide"
      >
        <Smartphone className="w-4 h-4" />
        Install app
      </Link>
    </div>
  );
}
