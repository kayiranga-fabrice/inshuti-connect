'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Loader2, MessageSquare, Clock, CheckCircle2, AlertCircle, ArrowLeft, Key, Lock } from 'lucide-react';
import Link from 'next/link';

type Question = {
  id: string;
  message: string;
  response: string | null;
  status: string;
  category: string;
  created_at: string;
  code: string;
};

export default function CheckPage() {
  const [code, setCode] = useState('');
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError(null);
    setQuestion(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('questions')
        .select('*')
        .eq('code', code.toUpperCase().trim())
        .single();

      if (supabaseError) {
        if (supabaseError.code === 'PGRST116') {
          setError('We couldn\'t find any question with that code. Please check and try again.');
        } else {
          throw supabaseError;
        }
      } else {
        setQuestion(data);
      }
    } catch (err: any) {
      console.error(err);
      setError('An error occurred while connecting to the vault.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-black uppercase tracking-widest text-xs transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-slate-900 uppercase italic">Check Your <br/> <span className="text-primary underline decoration-secondary decoration-8 underline-offset-8">Response</span></h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Enter your 6-character private code to access your support vault.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-20">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Lock className="w-6 h-6 text-slate-200 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="CODE"
              className="w-full bg-white border-4 border-white shadow-2xl shadow-primary/5 rounded-full pl-16 pr-24 py-6 text-3xl font-mono font-black tracking-[0.5em] focus:outline-none focus:ring-8 focus:ring-primary/5 transition-all uppercase placeholder:text-slate-100 text-slate-900"
            />
            <button
              type="submit"
              disabled={isLoading || code.length < 6}
              className="absolute right-3 top-3 bottom-3 bg-primary text-white px-8 rounded-full hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg font-black tracking-widest"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'GO'}
            </button>
          </form>
          {error && (
            <div className="mt-6 bg-rose-50 text-rose-600 p-6 rounded-[2rem] flex items-center gap-4 text-sm font-bold border-2 border-rose-100 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Result Area */}
        {question && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-primary/5 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <MessageSquare className="w-40 h-40 text-primary" />
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-8 border-b-2 border-slate-50">
                <div className="flex items-center gap-4">
                  <span className="bg-secondary text-primary px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                    {question.category}
                  </span>
                  <span className="text-slate-300 text-xs font-black font-mono tracking-widest">
                    REF: {question.code}
                  </span>
                </div>
                <div className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest ${
                  question.status === 'answered' 
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {question.status === 'answered' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  {question.status}
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-6">Original Inquiry</h3>
                <div className="bg-slate-50 p-10 rounded-[2.5rem] text-slate-800 text-xl leading-relaxed whitespace-pre-wrap font-medium italic">
                  "{question.message}"
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-6">Official Response</h3>
                {question.status === 'answered' ? (
                  <div className="bg-primary text-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-primary/30 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="relative text-xl md:text-2xl leading-relaxed whitespace-pre-wrap font-medium">
                      {question.response}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100">
                    <Clock className="w-20 h-20 text-slate-200 mx-auto mb-8 animate-pulse" />
                    <h4 className="text-3xl font-black text-slate-400 mb-3 tracking-tighter uppercase italic">Stay Tuned</h4>
                    <p className="text-slate-400 max-w-sm mx-auto px-8 font-medium">Our responders are carefully reviewing your inquiry. Please return in 24-48 hours.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center py-12">
              <p className="text-slate-300 text-xs font-black uppercase tracking-[0.3em]">Secure session encrypted. Close tab after reading.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
