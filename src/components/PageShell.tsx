"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteContainer } from "@/components/SiteContainer";
import { ReactNode } from "react";

export function PageShell({
  children,
  title,
  backHref = "/",
  backLabel = "Back to home",
}: {
  children: ReactNode;
  title?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <SiteContainer className="pt-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
        {title && (
          <h1 className="text-3xl md:text-4xl font-black text-primary mt-6 mb-8">{title}</h1>
        )}
        {children}
      </SiteContainer>
    </div>
  );
}
