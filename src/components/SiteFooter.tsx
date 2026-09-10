import Link from "next/link";
import { AlertCircle, Phone } from "lucide-react";
import { SiteContainer } from "@/components/SiteContainer";

const EMERGENCY_CONTACTS = [
  { label: "Inshuti hotline", number: "0784 538 491", primary: true },
  { label: "RBC Health Line", number: "114" },
  { label: "GBV / Isange", number: "3512" },
  { label: "Police", number: "112" },
  { label: "Child Helpline", number: "116" },
];

export function SiteFooter() {
  return (
    <>
      <footer className="bg-slate-900 text-white pt-14 pb-10 mt-16 md:mt-20">
        <SiteContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/inshuti-logo.png"
                  alt="Inshuti Connect"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-slate-400 max-w-xs mb-6 leading-relaxed text-sm">
                Anonymous sexual and reproductive health support for students in Rwanda. Ask questions, use the chatbot, or order health kits discreetly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="bg-secondary text-primary px-4 py-2 rounded-full text-xs font-black uppercase hover:opacity-90 transition-all"
                >
                  Shop health kits
                </Link>
                <Link
                  href="/messages"
                  className="border border-white/20 px-4 py-2 rounded-full text-xs font-black uppercase hover:bg-white/10 transition-all"
                >
                  SMS tips
                </Link>
              </div>
            </div>

            {/* Topics */}
            <div>
              <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-5">Topics</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-300">
                <li><Link href="/ask?cat=menstruation" className="hover:text-secondary transition-colors">Menstruation</Link></li>
                <li><Link href="/ask?cat=period-pain" className="hover:text-secondary transition-colors">Period pain</Link></li>
                <li><Link href="/ask?cat=contraception" className="hover:text-secondary transition-colors">Contraception</Link></li>
                <li><Link href="/ask?cat=pregnancy" className="hover:text-secondary transition-colors">Pregnancy</Link></li>
                <li><Link href="/ask?cat=stis" className="hover:text-secondary transition-colors">STIs</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-5">Support</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-300">
                <li><Link href="/ask" className="hover:text-secondary transition-colors">Ask a Question</Link></li>
                <li><Link href="/check" className="hover:text-secondary transition-colors">Check Response</Link></li>
                <li><Link href="/rw" className="hover:text-secondary transition-colors">Kinyarwanda</Link></li>
                <li><Link href="/chatbot" className="hover:text-secondary transition-colors">SRH Chatbot</Link></li>
                <li><Link href="/shop" className="hover:text-secondary transition-colors">Shop</Link></li>
                <li><Link href="/admin" className="hover:text-secondary transition-colors">Admin</Link></li>
                <li><Link href="/urgent-help" className="text-secondary hover:text-white font-extrabold transition-colors">Urgent Help</Link></li>
              </ul>
            </div>

            {/* Emergency contacts */}
            <div>
              <h4 className="font-black uppercase tracking-widest text-[10px] text-rose-400 mb-5">Emergency</h4>
              <ul className="space-y-3">
                {EMERGENCY_CONTACTS.map((c) => (
                  <li key={c.number}>
                    <a
                      href={`tel:${c.number.replace(/\s/g, "")}`}
                      className={`flex items-center gap-2 text-sm font-bold transition-colors group ${
                        c.primary ? "text-secondary" : "text-slate-300 hover:text-secondary"
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100" />
                      <span>
                        <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                          {c.label}
                        </span>
                        {c.number}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Inshuti Connect
            </p>
          </div>
        </SiteContainer>
      </footer>

      {/* Urgent help bar */}
      <div className="bg-rose-600 text-white py-2">
        <SiteContainer className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-sm md:text-base">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Need help now?</span>
          </div>
          <Link
            href="/urgent-help"
            className="bg-white text-rose-600 px-4 py-1.5 rounded-full text-xs md:text-sm font-black uppercase tracking-wider hover:bg-rose-50 transition-colors shrink-0"
          >
            Get urgent help
          </Link>
        </SiteContainer>
      </div>
    </>
  );
}
