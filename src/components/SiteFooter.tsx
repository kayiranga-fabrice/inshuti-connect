import Link from "next/link";
import { MessageSquareHeart, AlertCircle } from "lucide-react";
import { SiteContainer } from "@/components/SiteContainer";

export function SiteFooter() {
  return (
    <>
        <footer className="bg-slate-900 text-white pt-14 pb-10 mt-16 md:mt-20">
        <SiteContainer>
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 text-white font-black text-2xl mb-6">
                <MessageSquareHeart className="w-8 h-8 text-secondary" />
                <span>Inshuti Connect</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed text-sm">
                Anonymous sexual and reproductive health (SRH) support for students in Rwanda. Install the app or get SRH tips by SMS on any phone.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/install"
                  className="bg-secondary text-primary px-4 py-2 rounded-full text-xs font-black uppercase"
                >
                  Install app
                </Link>
                <Link
                  href="/messages"
                  className="border border-white/20 px-4 py-2 rounded-full text-xs font-black uppercase hover:bg-white/10"
                >
                  SMS tips
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-slate-500 mb-6">Topics</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-300">
                <li><Link href="/ask?cat=menstruation" className="hover:text-secondary">Menstruation</Link></li>
                <li><Link href="/ask?cat=period-pain" className="hover:text-secondary">Period pain</Link></li>
                <li><Link href="/ask?cat=contraception" className="hover:text-secondary">Contraception</Link></li>
                <li><Link href="/ask?cat=pregnancy" className="hover:text-secondary">Pregnancy</Link></li>
                <li><Link href="/ask?cat=stis" className="hover:text-secondary">STIs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-slate-500 mb-6">Support</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-300">
                <li><Link href="/ask" className="hover:text-secondary">Ask a Question</Link></li>
                <li><Link href="/check" className="hover:text-secondary">Check Response</Link></li>
                <li><Link href="/rw" className="hover:text-secondary">Kinyarwanda</Link></li>
                <li><Link href="/chatbot" className="hover:text-secondary">SRH Chatbot</Link></li>
                <li><Link href="/messages" className="hover:text-secondary">SMS tips</Link></li>
                <li><Link href="/admin" className="hover:text-secondary">Admin</Link></li>
                <li><Link href="/urgent-help" className="text-rose-400 hover:text-rose-300">Urgent Help</Link></li>
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
