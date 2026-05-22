'use client';

import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, MessageSquare, ShieldAlert, 
  HelpCircle, HeartPulse, Brain, ChevronRight, Lock
} from 'lucide-react';

export default function KinyarwandaPage() {
  return (
    <div className="min-h-screen bg-bg-beige text-primary font-sans selection:bg-secondary selection:text-primary">
      {/* Header Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-primary/60 hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Subira ku Ntangiriro / Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="bg-primary text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[120px]"></div>
          <div className="relative z-10 max-w-3xl">
            <span className="bg-secondary/25 border border-secondary/20 text-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              Ibanga ryanyu ni 100% / 100% Anonymous
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-6 mb-8 leading-tight tracking-tight uppercase italic">
              Igire ku Buzima <br />
              <span className="text-secondary underline decoration-white decoration-8 underline-offset-8">bw'Imyororokere</span> n'Iby'Intekerezo
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium mb-10">
              Uru ni urubuga rugufasha gusobanukirwa ibibazo byose bijyanye n'ubuzima bw'imyororokere (SRH) n'ubuzima bwo mu mutwe (Mental Health) mu buryo bw'ibanga ritagira umupaka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/ask" 
                className="bg-secondary text-primary font-black px-8 py-4 rounded-full text-center hover:opacity-95 transition-all shadow-lg uppercase tracking-widest text-sm"
              >
                Baza Ikibazo Mu Bwiru
              </Link>
              <Link 
                href="/chatbot" 
                className="bg-white/10 border-2 border-white/20 hover:bg-white/20 text-white font-black px-8 py-4 rounded-full text-center transition-all uppercase tracking-widest text-sm"
              >
                Ganira na Chatbot (SRH)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Learning Sections */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-black mb-12 uppercase italic tracking-tight text-center">
          Inyigisho Z'ingenzi / Key Learning Topics
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SRH Block */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-primary/5 flex flex-col justify-between">
            <div>
              <div className="bg-emerald-50 p-4 rounded-2xl w-fit mb-6 text-emerald-600">
                <HeartPulse className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-4">1. Ubuzima bw'Imyororokere (SRH)</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                Soma kandi umenye amakuru yizewe ku gukura k'umubiri, imihindagurikire yawo, ndetse n'uburyo bwo kwirinda indwara n'inda zitateganijwe.
              </p>
              
              <ul className="space-y-4 mb-8 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Uburyo bwo kuboneza urubyaro (Contraception)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Kwirinda indwara zandurira mu mibonano mpuzabitsina (STIs/STDs)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Gusobanukirwa umubiri wawe n'imihindagurikire (Puberty)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Ubwumvikane mu rukundo n'uburenganzira bwawe (Consent)
                </li>
              </ul>
            </div>
            
            <Link 
              href="/chatbot" 
              className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-sm hover:underline"
            >
              Koresha Chatbot yacu <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mental Health Block */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-primary/5 flex flex-col justify-between">
            <div>
              <div className="bg-indigo-50 p-4 rounded-2xl w-fit mb-6 text-indigo-600">
                <Brain className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-4">2. Ubuzima bwo mu Mutwe (Mental Health)</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                Umuhangayiko w'amasomo, irungu, cyangwa kwiheba ntugomba kubyikoreza wenyine. Dufatane urunana duhangane nabyo.
              </p>
              
              <ul className="space-y-4 mb-8 text-sm font-bold text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  Kugabanya umuhangayiko w'ibizamini (Exam Stress)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  Gusangira n'abandi ibikuremereye mu bwiru (Support Forums)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  Uburyo bwo kuruhura ubwonko (Relaxation Techniques)
                </li>
              </ul>
            </div>
            
            <Link 
              href="/ask" 
              className="inline-flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-sm hover:underline"
            >
              Baza Inshuti mu bwiru <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Anonymity Banner */}
      <section className="bg-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Lock className="w-12 h-12 text-secondary mx-auto" />
          <h3 className="text-2xl font-black uppercase tracking-tight italic">Nta mazina, Nta kukurikirana</h3>
          <p className="text-slate-400 font-medium leading-relaxed">
            Igihe cyose ubajije ikibazo, uhabwa **Agasanduku k'ibanga (tracking code)** gasanzwe kaguhesha igisubizo mu masaha 24 kugeza kuri 48. Nta mazina yawe, nta myirondoro cyangwa IP address yawe ibikwa.
          </p>
          <div className="pt-4">
            <Link 
              href="/ask" 
              className="bg-secondary text-primary font-black px-10 py-5 rounded-full inline-block hover:opacity-90 transition-all uppercase tracking-widest text-sm shadow-xl shadow-secondary/15"
            >
              Baza Inshuti Connect ubu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
