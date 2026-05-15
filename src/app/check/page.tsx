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
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-modern-dark">Check Your Response</h1>
        <p className="text-lg text-modern-dark/70">Enter your 6-character tracking code to see if a responder has answered.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-16">
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ENTER CODE"
            className="w-full bg-white border-2 border-modern-dark/5 rounded-3xl px-8 py-6 text-center text-3xl font-mono font-bold tracking-widest focus:outline-none focus:ring-4 focus:ring-modern-accent/10 focus:border-modern-accent transition-all uppercase shadow-sm"
          />
          <button
            type="submit"
            disabled={isLoading || code.length < 6}
            className="absolute right-3 top-3 bottom-3 bg-modern-dark text-white p-4 rounded-2xl hover:bg-modern-dark/90 disabled:opacity-50 transition-all shadow-md flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Search className="w-8 h-8" />}
          </button>
        </form>
        {error && (
          <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-2xl flex items-center justify-center gap-3 text-sm border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* Result Area */}
      {question && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
          <div className="modern-card">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-modern-dark/5">
              <div className="flex items-center gap-4">
                <span className="bg-modern-beige text-modern-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  {question.category}
                </span>
                <span className="text-modern-dark/40 text-sm font-medium">
                  {new Date(question.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                question.status === 'answered' 
                  ? 'bg-modern-sage text-modern-accent' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {question.status === 'answered' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {question.status}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xs font-bold text-modern-dark/40 uppercase tracking-widest mb-4">Your Question</h3>
              <p className="text-modern-dark text-xl leading-relaxed whitespace-pre-wrap font-serif italic">
                "{question.message}"
              </p>
            </div>

            <div className="pt-8 border-t border-modern-dark/5">
              <h3 className="text-xs font-bold text-modern-dark/40 uppercase tracking-widest mb-6">Response from Support Team</h3>
              {question.status === 'answered' ? (
                <div className="bg-modern-beige p-8 rounded-3xl border border-modern-dark/5">
                  <div className="flex gap-6">
                    <div className="bg-white p-4 rounded-full h-fit shadow-sm">
                      <MessageSquare className="w-8 h-8 text-modern-accent" />
                    </div>
                    <div className="text-modern-dark text-lg leading-relaxed whitespace-pre-wrap mt-2">
                      {question.response}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-modern-beige/50 rounded-3xl border border-dashed border-modern-dark/10">
                  <Clock className="w-10 h-10 text-modern-dark/20 mx-auto mb-4" />
                  <p className="text-modern-dark/60 text-lg">A responder is currently reviewing your question.<br/>Please check back in 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
