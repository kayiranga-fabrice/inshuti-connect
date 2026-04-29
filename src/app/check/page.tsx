'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Loader2, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

type Question = {
  id: string;
  message: string;
  response: string | null;
  status: string;
  category: string;
  created_at: string;
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
          setError('No question found with this tracking code. Please double-check your code.');
        } else {
          throw supabaseError;
        }
      } else {
        setQuestion(data);
      }
    } catch (err: any) {
      console.error(err);
      setError('An error occurred while fetching your response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-3">Check Your Response</h1>
        <p className="text-slate-500">Enter your 6-character tracking code to see if a responder has answered.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ENTER CODE"
            className="w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-4 text-center text-2xl font-mono font-bold tracking-widest focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all uppercase"
          />
          <button
            type="submit"
            disabled={isLoading || code.length < 6}
            className="absolute right-2 top-2 bottom-2 bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-sm"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
          </button>
        </form>
        {error && (
          <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Result Area */}
      {question && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {question.category}
                </span>
                <span className="text-slate-400 text-xs">
                  {new Date(question.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                question.status === 'answered' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {question.status === 'answered' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {question.status}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Your Question</h3>
              <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-wrap">
                {question.message}
              </p>
            </div>

            <div className="pt-8 border-t border-slate-50">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Response from Support Team</h3>
              {question.status === 'answered' ? (
                <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                  <div className="flex gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full h-fit">
                      <MessageSquare className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {question.response}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Clock className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">A responder is currently reviewing your question. Please check back in 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
