import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen bg-modern-beige text-modern-dark`}>
        <nav className="bg-modern-beige/90 backdrop-blur-md sticky top-0 z-50 border-b border-modern-dark/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-modern-dark font-serif font-bold text-2xl tracking-tight">
              <ShieldCheck className="w-8 h-8 text-modern-accent" />
              <span>Inshuti Connect</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/ask" className="hover:text-modern-accent transition-colors">How it Works</Link>
              <Link href="/check" className="hover:text-modern-accent transition-colors">Check Response</Link>
              <Link href="/ask" className="bg-modern-dark text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                Get Support
              </Link>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
        <footer className="bg-modern-dark text-white py-16 mt-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2">
                <Link href="/" className="flex items-center gap-2 text-white font-serif font-bold text-2xl tracking-tight mb-4">
                  <ShieldCheck className="w-8 h-8 text-modern-sage" />
                  <span>Inshuti Connect</span>
                </Link>
                <p className="text-white/70 max-w-sm text-sm leading-relaxed">
                  Mental health and SRH support designed for students. 100% anonymous, safe, and judgment-free.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4 font-serif text-lg">Support</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li><Link href="/ask" className="hover:text-white transition-colors">Ask a Question</Link></li>
                  <li><Link href="/check" className="hover:text-white transition-colors">Check Response</Link></li>
                  <li><Link href="/admin" className="hover:text-white transition-colors">Responder Login</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 font-serif text-lg">Legal & Privacy</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>No IP Tracking</li>
                  <li>Anonymous by Design</li>
                  <li>Supervised Responses</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
              <p>© {new Date().getFullYear()} Inshuti Connect. A safe space.</p>
              <p>Not a medical diagnosis platform. In emergencies, contact local authorities.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
