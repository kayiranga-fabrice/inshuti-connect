'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  MessageSquare,
  ShieldAlert,
  HeartPulse,
  ChevronRight,
  Lock,
} from 'lucide-react';

export default function KinyarwandaPage() {
  return (
    <div className="min-h-screen bg-bg-beige text-primary font-sans selection:bg-secondary selection:text-primary">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary/60 hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Subira ku Ntangiriro / Back to Home
        </Link>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="bg-primary text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[120px]" />
          <div className="relative z-10 max-w-3xl">
            <span className="bg-secondary/25 border border-secondary/20 text-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              Ibanga ryanyu ni 100% / 100% Anonymous
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-6 mb-8 leading-tight tracking-tight uppercase italic">
              Ubuzima bw&apos;Imyororokere <br />
              <span className="text-secondary underline decoration-white decoration-8 underline-offset-8">
                (SRH)
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium mb-10">
              Uru ni urubuga rugufasha gusobanukirwa ibibazo byose bijyanye n&apos;ubuzima bw&apos;imyororokere
              (SRH) mu buryo bw&apos;ibanga ritagira umupaka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/chatbot"
                className="bg-secondary text-primary font-black px-8 py-4 rounded-full text-center hover:opacity-95 transition-all shadow-lg uppercase tracking-widest text-sm"
              >
                Koresha Chatbot (SRH)
              </Link>
              <Link
                href="/ask"
                className="bg-white/10 border-2 border-white/20 hover:bg-white/20 text-white font-black px-8 py-4 rounded-full text-center transition-all uppercase tracking-widest text-sm"
              >
                Baza Ikibazo mu Bwiru
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-black mb-12 uppercase italic tracking-tight text-center">
          Inyigisho Z&apos;ingenzi / Key SRH Topics
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-primary/5 flex flex-col justify-between">
            <div>
              <div className="icon-box mb-6 p-4">
                <HeartPulse className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-4">1. Ubuzima bw&apos;Imyororokere</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                Soma amakuru yizewe ku gukura k&apos;umubiri, kuboneza urubyaro, kwirinda indwara, n&apos;uburyo bwo
                kubona ubuvuzi.
              </p>
              <ul className="space-y-4 mb-8 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Amasezerano / impamyabumenyi (Menstruation)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Ububabare bw&apos;amasezerano (Period pain)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Kuboneza urubyaro (Contraception)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Inda n&apos;ibizamini by&apos;inda (Pregnancy)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Kwirinda indwara zandurira (STIs)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Ubwumvikane (Consent)
                </li>
              </ul>
            </div>
            <Link
              href="/chatbot"
              className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:underline"
            >
              Koresha Chatbot <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-primary/5 flex flex-col justify-between">
            <div>
              <div className="icon-box mb-6 p-4">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-4">2. Umutekano &amp; Ubufasha bwihuse</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                Niba uri mu kaga, wabaye uwahukanywe n&apos;ihohoterwa rishingiye ku gitsina, cyangwa ukeneye ubuvuzi
                bwihuse — koresha imirongo yacu.
              </p>
              <ul className="space-y-4 mb-8 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  GBV — 3512
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Polisi — 112
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Ubufasha bwihuse / Urgent help
                </li>
              </ul>
            </div>
            <Link
              href="/urgent-help"
              className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:underline"
            >
              Reba imirongo y&apos;ubufasha <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Lock className="w-12 h-12 text-secondary mx-auto" />
          <h3 className="text-2xl font-black uppercase tracking-tight italic">Nta mazina, Nta kukurikirana</h3>
          <p className="text-slate-400 font-medium leading-relaxed">
            Ubajije ikibazo cy&apos;ubuzima bw&apos;imyorokere, uhabwa <strong>code y&apos;ibanga</strong> kugira ngo
            usubize igisubizo. Nta mazina cyangwa IP ibikwa.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ask"
              className="bg-secondary text-primary font-black px-10 py-5 rounded-full inline-block hover:opacity-90 transition-all uppercase tracking-widest text-sm shadow-xl"
            >
              Baza ikibazo
            </Link>
            <Link
              href="/messages"
              className="border border-white/20 font-black px-10 py-5 rounded-full inline-block hover:bg-white/10 uppercase tracking-widest text-sm"
            >
              SMS tips
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
