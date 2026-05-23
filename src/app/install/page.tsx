import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { InstallGuide } from "@/components/InstallGuide";

export const metadata = {
  title: "Install App | Inshuti Connect",
  description: "Install Inshuti Connect for quick anonymous SRH support on your phone.",
};

export default function InstallPage() {
  return (
    <PageShell title="Install Inshuti Connect">
      <p className="text-slate-600 font-medium mb-8 max-w-2xl leading-relaxed -mt-4">
        Install works like an app — no app store needed. Quick access to SRH chatbot, ask-a-question, and urgent help.
      </p>
      <InstallGuide />
      <p className="mt-10 text-sm text-slate-500">
        Prefer text messages?{" "}
        <Link href="/messages" className="text-primary font-bold underline">
          Sign up for SRH SMS tips
        </Link>
        .
      </p>
    </PageShell>
  );
}
