'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AskPage() {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('Mental Health');
  const [ageRange, setAgeRange] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      <div className="max-w-xl mx-auto px-4 py-20">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-100 text-center">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Question Submitted!</h2>
          <p className="text-slate-500 mb-8">
            Your question has been received. Please save your tracking code to check for a response later.
          </p>
          
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-2xl mb-8 relative group">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Your Tracking Code</span>
            <span className="text-4xl font-mono font-bold text-emerald-600 tracking-wider">{trackingCode}</span>
            <button 
              onClick={() => navigator.clipboard.writeText(trackingCode)}
              className="absolute top-4 right-4 p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-emerald-600"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <Link 
              href="/check" 
              className="bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Check for Response
            </Link>
            <Link 
              href="/" 
              className="text-slate-500 font-medium py-2 hover:text-slate-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-3">Ask a Question</h1>
        <p className="text-slate-500">Your identity is completely anonymous. Feel free to express yourself.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
            <div className="grid grid-cols-2 gap-4">
              {['Mental Health', 'SRH'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-3 px-4 rounded-xl border-2 transition-all font-medium ${
                    category === cat 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                      : 'border-slate-100 hover:border-slate-200 text-slate-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Age Range (Optional) */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Age Range (Optional)</label>
            <select 
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="">Prefer not to say</option>
              <option value="Under 15">Under 15</option>
              <option value="15-18">15-18</option>
              <option value="19-24">19-24</option>
              <option value="25+">25+</option>
            </select>
          </div>

          {/* Question Textarea */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Your Question</label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here... be as detailed as you like."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Question
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            By submitting, you agree that this is for informational purposes and not a medical consultation.
          </p>
        </div>
      </form>
    </div>
  );
}
