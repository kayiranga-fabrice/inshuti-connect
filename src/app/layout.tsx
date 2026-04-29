import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { MessageSquareHeart } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inshuti Connect | Anonymous Mental Health & SRH Support",
  description: "Connect with trained student responders safely and anonymously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-slate-50 text-slate-900`}>
        <nav className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-emerald-600 font-bold text-xl">
              <MessageSquareHeart className="w-6 h-6" />
              <span>Inshuti Connect</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/ask" className="hover:text-emerald-600 transition-colors">Ask</Link>
              <Link href="/check" className="hover:text-emerald-600 transition-colors">Check Response</Link>
              <Link href="/admin" className="text-slate-400 hover:text-slate-600 transition-colors">Admin</Link>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
        <footer className="border-t bg-white py-8 mt-20">
          <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Inshuti Connect. A safe space for anonymous support.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
