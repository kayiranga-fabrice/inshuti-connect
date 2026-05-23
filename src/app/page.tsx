import Link from "next/link";
import { SiteContainer } from "@/components/SiteContainer";
import {
  MessageSquare,
  Search,
  Heart,
  Sparkles,
  ArrowRight,
  Smartphone,
  Users,
  HeartPulse,
  PlayCircle,
  ExternalLink,
  Bot,
  Globe,
  ShieldCheck,
  Droplets,
} from "lucide-react";
import { HOMEPAGE_SEARCH_SUGGESTIONS } from "@/lib/srh-content";

const COMMON_SEARCHES = HOMEPAGE_SEARCH_SUGGESTIONS;

const TOPICS = [
  { label: "Menstruation", icon: <Droplets className="w-6 h-6" /> },
  { label: "Period pain", icon: <HeartPulse className="w-6 h-6" /> },
  { label: "Contraception", icon: <ShieldCheck className="w-6 h-6" /> },
  { label: "STIs", icon: <Heart className="w-6 h-6" /> },
  { label: "Consent", icon: <Users className="w-6 h-6" /> },
  { label: "Pregnancy", icon: <Sparkles className="w-6 h-6" /> },
  { label: "View all", icon: <ArrowRight className="w-6 h-6" />, highlight: true },
] as const;

const ARTICLES = [
  {
    title: "Your first period: what to expect",
    excerpt:
      "Cycles, hygiene, pads, and when it is normal — plus when to talk to a nurse or health centre.",
  },
  {
    title: "Period pain: care at home and when to seek help",
    excerpt:
      "Cramps are common, but severe pain every month is worth checking with a clinician.",
  },
  {
    title: "Contraception options: what students should know",
    excerpt:
      "Condoms, pills, implants, and emergency contraception — how they work and where to get care.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col bg-white font-sans selection:bg-secondary selection:text-primary">
      {/* Hero — ReachOut-style search-first entry */}
      <section className="bg-primary text-white pt-8 pb-16 relative overflow-hidden">
        <SiteContainer className="relative z-10">
          <p className="text-secondary font-black uppercase tracking-[0.2em] text-xs mb-4">
            Sexual & reproductive health
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[3.25rem] font-black leading-[1.1] mb-5 max-w-4xl">
            SRH support, anonymously
          </h1>
          <p className="text-white/80 text-lg font-medium mb-5 max-w-2xl">
            Ask about menstruation, period pain, contraception, STIs, consent, puberty, and pregnancy — private answers from trained student responders in Rwanda.
          </p>

          <form
            action="/ask"
            method="get"
            className="bg-white rounded-2xl p-1.5 shadow-2xl flex flex-col md:flex-row items-stretch mb-6 max-w-3xl group"
          >
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                name="q"
                placeholder="Ask about SRH (e.g. contraception, STIs)…"
                className="w-full h-14 md:h-16 pl-12 pr-4 text-slate-900 text-lg font-bold focus:outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-slate-800 text-white px-8 py-3 md:py-0 rounded-xl font-black flex items-center justify-center transition-all m-1.5 shrink-0"
            >
              ASK
            </button>
          </form>

          <p className="text-white/60 text-sm mb-3">
            Anonymous SRH information only — not a substitute for a clinic visit. For urgent help, use{" "}
            <Link href="/urgent-help" className="text-secondary underline font-bold">
              urgent help
            </Link>
            .
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
            <span className="text-white/50 uppercase tracking-widest text-[10px]">Try:</span>
            {COMMON_SEARCHES.map((tag) => (
              <Link
                key={tag}
                href={`/ask?q=${encodeURIComponent(tag)}`}
                className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/20 transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>
        </SiteContainer>
      </section>

      {/* Other ways we can help — overlaps hero like ReachOut */}
      <SiteContainer className="-mt-10 mb-8 relative z-20">
        <h2 className="sr-only">Other ways we can help</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/chatbot"
            className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="bg-indigo-50 p-3 rounded-2xl w-fit mb-4">
                <Bot className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-lg font-black mb-2 text-slate-900 group-hover:text-primary">
                SRH chatbot
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Instant answers on contraception, STIs, consent, and puberty.
              </p>
            </div>
            <span className="mt-4 flex items-center gap-1 text-xs font-black uppercase text-indigo-600">
              Chat now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/ask"
            className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="bg-emerald-50 p-3 rounded-2xl w-fit mb-4">
                <MessageSquare className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-black mb-2 text-slate-900 group-hover:text-primary">
                Ask an SRH question
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Free, anonymous answers from trained student responders.
              </p>
            </div>
            <span className="mt-4 flex items-center gap-1 text-xs font-black uppercase text-emerald-600">
              Start <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/check"
            className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="bg-teal-50 p-3 rounded-2xl w-fit mb-4">
                <Smartphone className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-lg font-black mb-2 text-slate-900 group-hover:text-primary">
                Check my response
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Use your private tracking code to read your answer.
              </p>
            </div>
            <span className="mt-4 flex items-center gap-1 text-xs font-black uppercase text-teal-600">
              Enter code <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/rw"
            className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="bg-amber-50 p-3 rounded-2xl w-fit mb-4">
                <Globe className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-lg font-black mb-2 text-slate-900 group-hover:text-primary">
                Kinyarwanda portal
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Amakuru y&apos;ubuzima bw&apos;imyororokere (SRH) mu Kinyarwanda.
              </p>
            </div>
            <span className="mt-4 flex items-center gap-1 text-xs font-black uppercase text-amber-600">
              Soma <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <Link
            href="/install"
            className="flex items-center justify-between bg-primary/5 border border-primary/10 rounded-2xl px-4 py-3 font-black text-sm text-primary hover:bg-primary/10"
          >
            Install on your phone
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/messages"
            className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 font-black text-sm text-indigo-800 hover:bg-indigo-100"
          >
            Get SRH SMS tips
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SiteContainer>

      {/* Topics + articles */}
      <section className="py-8 bg-slate-50">
        <SiteContainer>
          <h2 className="text-3xl md:text-4xl font-black mb-6">Browse SRH topics</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
            {TOPICS.map((topic) => (
              <Link
                key={topic.label}
                href="/ask"
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 font-black text-sm text-center min-h-[100px] justify-center ${
                  "highlight" in topic && topic.highlight
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-slate-100 text-slate-900 hover:border-primary/30"
                }`}
              >
                {topic.icon}
                {topic.label}
              </Link>
            ))}
          </div>

          <h3 className="text-2xl font-black mb-5">SRH guides & stories</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {ARTICLES.map((article) => (
              <Link key={article.title} href="/ask" className="group">
                <div className="aspect-[4/3] bg-slate-200 rounded-3xl mb-4 border border-slate-100" />
                <h4 className="text-xl font-black leading-snug group-hover:text-primary transition-colors underline decoration-secondary decoration-4 underline-offset-4">
                  {article.title}
                </h4>
                <p className="mt-2 text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 font-black text-primary uppercase tracking-widest text-sm border-b-4 border-secondary pb-1"
            >
              Ask your own question <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </SiteContainer>
      </section>

      {/* Videos placeholder */}
      <section className="py-8">
        <SiteContainer>
          <h2 className="text-3xl md:text-4xl font-black mb-6">Videos</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Managing period pain at school",
              "Period hygiene and pads: the basics",
              "How to use condoms correctly",
              "When to visit a health centre for SRH care",
            ].map((title) => (
              <div key={title} className="group">
                <div className="aspect-video bg-slate-900 rounded-2xl relative flex items-center justify-center mb-3">
                  <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-white group-hover:scale-110 transition-all" />
                </div>
                <p className="font-bold text-slate-900 text-sm line-clamp-2">{title}</p>
              </div>
            ))}
          </div>
        </SiteContainer>
      </section>

      {/* Rwanda-relevant secondary CTAs (replaces Parents/Schools blocks) */}
      <section className="py-8 bg-white border-t border-slate-100">
        <SiteContainer>
          <h2 className="text-2xl font-black mb-5 text-slate-500 uppercase tracking-widest text-sm">
            More support
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 md:p-6 rounded-3xl border border-slate-100">
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-black mb-3">About Inshuti Connect</h3>
              <p className="text-slate-600 mb-6 font-medium leading-relaxed">
                Learn how we work with ASOME and student responders to offer anonymous SRH education and support in Rwanda.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-black hover:opacity-90 transition-all"
              >
                About us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-rose-50 p-5 md:p-6 rounded-3xl border border-rose-100">
              <h3 className="text-2xl font-black mb-3 text-rose-900">Need help right now?</h3>
              <p className="text-rose-800/80 mb-6 font-medium leading-relaxed">
                GBV support, emergency lines, and urgent SRH resources when you cannot wait for a response.
              </p>
              <Link
                href="/urgent-help"
                className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-full font-black hover:bg-rose-700 transition-all"
              >
                Urgent help <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SiteContainer>
      </section>

      {/* Impact */}
      <section className="py-8">
        <SiteContainer>
          <div className="flex flex-col lg:flex-row gap-5 items-stretch">
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                SRH questions shouldn&apos;t cost you your privacy
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Many students avoid asking about sexual health because of stigma or fear of being identified. Inshuti Connect is built for anonymous SRH support — no names required.
              </p>
              <Link
                href="/ask"
                className="inline-block bg-primary text-white px-8 py-4 rounded-full font-black hover:opacity-90 transition-all"
              >
                Ask anonymously
              </Link>
            </div>
            <div className="flex-1 bg-secondary p-5 md:p-6 rounded-3xl text-primary">
              <h3 className="text-2xl font-black mb-3">100% online & anonymous</h3>
              <p className="font-bold mb-6 leading-relaxed opacity-90">
                Ask a question, get a tracking code, and check back when your trained responder has replied. Kinyarwanda content and an SRH chatbot are always available.
              </p>
              <Link
                href="/check"
                className="inline-flex items-center gap-2 font-black border-b-4 border-primary pb-1"
              >
                Check my response <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SiteContainer>
      </section>

      {/* Newsletter placeholder */}
      <section className="py-8">
        <SiteContainer>
          <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/30 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-black mb-4">Stay in touch</h2>
              <p className="text-slate-400 mb-8 font-medium">
                SRH tips and updates from Inshuti Connect (coming soon).
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 h-12 bg-white/10 rounded-xl px-4 font-bold border border-white/10 focus:outline-none focus:border-secondary text-white"
                  disabled
                  aria-label="Email for newsletter"
                />
                <button
                  type="button"
                  disabled
                  className="h-12 bg-secondary text-primary px-8 rounded-xl font-black opacity-70 cursor-not-allowed"
                >
                  Coming soon
                </button>
              </div>
            </div>
          </div>
        </SiteContainer>
      </section>

      <section className="py-5 border-t border-slate-100">
        <SiteContainer className="text-slate-500 text-sm leading-relaxed space-y-4">
          <p>
            Inshuti Connect values diversity. We are committed to providing a safe, culturally appropriate, and inclusive service for all people, regardless of ethnicity, faith, disability, sexuality, or gender identity.
          </p>
          <p className="text-xs text-slate-400">
            Layout inspired by{" "}
            <a
              href="https://au.reachout.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              ReachOut Australia
            </a>
            . All features and branding are Inshuti Connect.
          </p>
        </SiteContainer>
      </section>
    </div>
  );
}
