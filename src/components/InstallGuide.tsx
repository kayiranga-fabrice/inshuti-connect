"use client";

import { useEffect, useState } from "react";
import { Download, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallGuide() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    setIsIos(/iPad|iPhone|iPod/.test(ua));

    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    );

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

  if (isStandalone) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 font-bold text-emerald-800">
        Inshuti Connect is already installed on this device.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {deferred && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="font-black text-lg mb-2 flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Android / Chrome
          </h2>
          <p className="text-slate-600 text-sm mb-4">Tap below to add Inshuti Connect to your home screen.</p>
          <button
            type="button"
            onClick={install}
            className="bg-primary text-white px-6 py-3 rounded-full font-black text-sm"
          >
            Install now
          </button>
        </div>
      )}

      {isIos && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="font-black text-lg mb-2 flex items-center gap-2">
            <Share className="w-5 h-5 text-primary" />
            iPhone (Safari)
          </h2>
          <ol className="list-decimal list-inside text-slate-600 text-sm space-y-2 font-medium">
            <li>Open this site in Safari</li>
            <li>Tap the Share button</li>
            <li>Choose &quot;Add to Home Screen&quot;</li>
            <li>Tap Add</li>
          </ol>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h2 className="font-black text-lg mb-2">Other phones</h2>
        <p className="text-slate-600 text-sm font-medium leading-relaxed">
          In your browser menu, look for <strong>Add to Home screen</strong>, <strong>Install app</strong>, or{" "}
          <strong>Install</strong>. The icon will appear on your home screen like other apps.
        </p>
      </div>
    </div>
  );
}
