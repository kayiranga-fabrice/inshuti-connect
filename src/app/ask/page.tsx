'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle2, Copy, AlertCircle, ArrowLeft, MessageSquare, ShieldCheck, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { ASK_CATEGORIES, type AskCategory } from '@/lib/srh-content';

const CATEGORY_FROM_URL: Record<string, AskCategory> = {
  menstruation: 'Menstruation',
  'period-pain': 'Period pain',
  contraception: 'Contraception',
  stis: 'STIs',
  consent: 'Consent',
  puberty: 'Puberty',
  pregnancy: 'Pregnancy',
};

function AskPageContent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<AskCategory>('Menstruation');
  const [ageRange, setAgeRange] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && CATEGORY_FROM_URL[cat]) {
      setCategory(CATEGORY_FROM_URL[cat]);
    }
    const q = searchParams.get('q');
    if (q) setMessage(q);
  }, [searchParams]);

  const generateTrackingCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const code = generateTrackingCode();

    try {
      const { error: supabaseError } = await supabase
        .from('questions')
        .insert([
          {
            message,
            category,
            age_range: ageRange || null,
            code,
            status: 'pending'
          }
        ]);

      if (supabaseError) throw supabaseError;

      setTrackingCode(code);
      setMessage('');
    } catch (err: any) {
      console.error(err);
      setError('Failed to submit your question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (trackingCode) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-slate-50">
        <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-slate-100 text-center animate-in zoom-in duration-500">
          <div className="bg-secondary/40 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-primary shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-slate-900 tracking-tight italic uppercase">Success!</h2>
          <p className="text-slate-500 mb-10 text-lg leading-relaxed font-medium">
            Your question has been securely stored. To protect your anonymity, <strong>save this code carefully</strong>.
          </p>
          
          <div className="bg-primary p-10 rounded-[2rem] mb-10 relative group border-4 border-white shadow-xl">
            <span className="block text-xs font-black text-white/50 uppercase tracking-[0.3em] mb-3">Your Tracking Code</span>
            <div className="flex items-center justify-center gap-4">
              <span className="text-5xl font-mono font-black text-white tracking-[0.2em]">{trackingCode}</span>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(trackingCode);
                alert('Code copied to clipboard!');
              }}
              className="mt-6 flex items-center gap-2 mx-auto bg-white/10 hover:bg-white/20 text-secondary px-6 py-2 rounded-full transition-all text-sm font-black uppercase tracking-widest"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Link 
              href="/check" 
              className="bg-primary text-white font-black py-5 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-primary/20 text-lg uppercase tracking-widest"
            >
              Check My Response
            </Link>
            <Link 
              href="/" 
              className="text-slate-400 font-bold py-2 hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* Content Info */}
          <div className="flex-1 space-y-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-black uppercase tracking-widest text-xs transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight uppercase italic">
              Ask about <br />
              <span className="text-primary underline decoration-secondary decoration-8 underline-offset-8">SRH</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              Menstruation, period pain, contraception, STIs, consent, puberty, pregnancy — ask anonymously. Trained student responders reply with accurate, non-judgmental SRH information.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: "100% Anonymous", desc: "No names, no logins, no tracking." },
                { icon: <HeartPulse className="w-6 h-6 text-primary" />, title: "SRH-focused", desc: "Built for sexual and reproductive health questions." },
                { icon: <MessageSquare className="w-6 h-6 text-primary" />, title: "Expert Vetted", desc: "Safe, accurate SRH information — not a clinic substitute." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <div className="bg-primary/5 p-3 rounded-2xl h-fit">{item.icon}</div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-primary/5 border border-slate-100">
              <div className="space-y-8">
                {/* Category */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">SRH topic</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ASK_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`py-3 px-2 rounded-xl border-2 transition-all font-black text-[10px] sm:text-xs uppercase tracking-wider ${
                          category === cat
                            ? 'border-secondary bg-white text-primary shadow-md'
                            : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Your Age Range (Optional)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Under 15', '15-18', '19-24', '25+'].map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setAgeRange(range)}
                        className={`py-3 px-1 rounded-xl border-2 transition-all text-[10px] font-black uppercase tracking-wider ${
                          ageRange === range 
                            ? 'border-primary bg-primary text-white shadow-md' 
                            : 'border-slate-50 bg-slate-50 text-slate-300 hover:border-slate-100'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Your Question</label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your question here..."
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] px-6 py-5 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none text-lg leading-relaxed text-slate-800 placeholder:text-slate-200"
                  />
                </div>

                {error && (
                  <div className="bg-rose-50 text-rose-600 p-6 rounded-2xl flex items-center gap-4 text-sm font-bold border-2 border-rose-100">
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full bg-primary text-white font-black py-6 rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 text-lg uppercase tracking-widest group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Ask Inshuti</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] px-8">
                  By submitting, you agree that this is for informational purposes and not a medical consultation.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">
          Loading…
        </div>
      }
    >
      <AskPageContent />
    </Suspense>
  );
}
