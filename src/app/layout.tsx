import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { MessageSquareHeart, AlertCircle, Search, Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inshuti Connect | A Safe Place for Support",
  description: "Connect with trained student responders safely and anonymously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        {/* Urgent Help Banner */}
        <div className="bg-rose-600 text-white py-3 px-4 sticky top-0 z-[60] shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-sm md:text-base">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Need help now?</span>
            </div>
            <Link 
              href="/urgent-help" 
              className="bg-white text-rose-600 px-4 py-1 rounded-full text-xs md:text-sm font-black uppercase tracking-wider hover:bg-rose-50 transition-colors"
            >
              Get urgent help
            </Link>
          </div>
        </div>

        {/* Main Navigation */}
        <header className="bg-white border-b sticky top-[52px] z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 text-primary">
                <div className="bg-primary p-2 rounded-xl">
                  <MessageSquareHeart className="w-8 h-8 text-white" />
                </div>
                <span className="font-black text-2xl tracking-tighter">Inshuti Connect</span>
              </Link>
              
              <nav className="hidden lg:flex items-center gap-6">
                <Link href="/ask" className="font-bold text-slate-600 hover:text-primary transition-colors">Topics</Link>
                <Link href="/check" className="font-bold text-slate-600 hover:text-primary transition-colors">Check Response</Link>
                <Link href="/rw" className="font-bold text-emerald-600 hover:text-emerald-800 transition-colors">Kinyarwanda</Link>
                <Link href="/chatbot" className="font-bold text-teal-600 hover:text-teal-800 transition-colors">SRH Chatbot</Link>
                <Link href="/about" className="font-bold text-slate-600 hover:text-primary transition-colors">About Us</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 bg-slate-50 text-slate-400 px-4 py-2 rounded-full border border-slate-200">
                <Search className="w-4 h-4" />
                <span className="text-sm font-medium">Search for help...</span>
              </button>
              <Link 
                href="/ask" 
                className="bg-secondary text-primary px-6 py-2.5 rounded-full font-black text-sm hover:opacity-90 transition-all shadow-sm"
              >
                Ask ReachOut
              </Link>
              <button className="lg:hidden text-primary p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>

        <footer className="bg-slate-900 text-white pt-20 pb-10 mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 text-white font-black text-2xl mb-6">
                  <MessageSquareHeart className="w-8 h-8 text-secondary" />
                  <span>Inshuti Connect</span>
                </div>
                <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                  Inshuti Connect is the leading online mental health service for young people, supporting them through tough times with anonymity and compassion.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer">
                    <span className="font-black text-xs">FB</span>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer">
                    <span className="font-black text-xs">IG</span>
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer">
                    <span className="font-black text-xs">TW</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-black uppercase tracking-widest text-xs text-slate-500 mb-6">Topics</h4>
                <ul className="space-y-4 text-sm font-bold text-slate-300">
                  <li><Link href="/ask?cat=anxiety" className="hover:text-secondary">Anxiety</Link></li>
                  <li><Link href="/ask?cat=stress" className="hover:text-secondary">Stress</Link></li>
                  <li><Link href="/ask?cat=relationships" className="hover:text-secondary">Relationships</Link></li>
                  <li><Link href="/ask?cat=srh" className="hover:text-secondary">SRH Support</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-black uppercase tracking-widest text-xs text-slate-500 mb-6">Support</h4>
                <ul className="space-y-4 text-sm font-bold text-slate-300">
                  <li><Link href="/ask" className="hover:text-secondary">Ask a Question</Link></li>
                  <li><Link href="/check" className="hover:text-secondary">Check Response</Link></li>
                  <li><Link href="/rw" className="hover:text-secondary">Kinyarwanda Portal</Link></li>
                  <li><Link href="/chatbot" className="hover:text-secondary">SRH Chatbot</Link></li>
                  <li><Link href="/admin" className="hover:text-secondary">Admin Login</Link></li>
                  <li><Link href="/urgent-help" className="text-rose-400 hover:text-rose-300 font-extrabold">Urgent Help</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                © {new Date().getFullYear()} Inshuti Connect. Inspired by ReachOut.
              </p>
              <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span className="hover:text-white cursor-pointer">Terms</span>
                <span className="hover:text-white cursor-pointer">Privacy</span>
                <span className="hover:text-white cursor-pointer">Accessibility</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
