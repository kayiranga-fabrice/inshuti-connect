import type { Metadata, Viewport } from "next";
import { Roboto, Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PwaProvider } from "@/components/PwaProvider";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/lib/theme-provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inshuti Connect | Anonymous SRH Support for Students",
  description: "Anonymous sexual and reproductive health (SRH) support for students in Rwanda. Ask questions, use the chatbot, get SMS tips.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Inshuti Connect",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/images/inshuti-logo.png",
    apple: "/images/inshuti-logo.png",
    shortcut: "/images/inshuti-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F382B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${nunito.variable}`} suppressHydrationWarning>
      <body className={`${nunito.className} font-sans antialiased bg-[#FAF7F4] text-slate-900`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <CartProvider>
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </CartProvider>
        </ThemeProvider>
        <PwaProvider />

        {/* Google Translate — hidden widget, driven by LanguageSelector */}
        <div id="google_translate_element" style={{ display: "none" }} />
        <Script id="gt-init" strategy="afterInteractive">{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              { pageLanguage: 'en', includedLanguages: 'rw,fr,sw', autoDisplay: false },
              'google_translate_element'
            );
          }
        `}</Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
