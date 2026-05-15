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
      <div className="max-w-xl mx-auto px-4 py-20 min-h-[70vh] flex items-center">
        <div className="modern-card text-center w-full">
          <div className="bg-modern-sage w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-modern-accent">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4 text-modern-dark">Question Submitted!</h2>
          <p className="text-modern-dark/70 mb-8 text-lg">
            Your question has been received safely. Please save your tracking code—it's the only way to read your response.
          </p>
          
          <div className="bg-modern-beige border-2 border-dashed border-modern-dark/10 p-8 rounded-3xl mb-8 relative group">
            <span className="block text-xs font-bold text-modern-dark/50 uppercase tracking-widest mb-2">Your Tracking Code</span>
            <span className="text-5xl font-mono font-bold text-modern-accent tracking-wider">{trackingCode}</span>
            <button 
              onClick={() => navigator.clipboard.writeText(trackingCode)}
              className="absolute top-4 right-4 p-2 hover:bg-white rounded-xl transition-colors text-modern-dark/40 hover:text-modern-accent"
              title="Copy to clipboard"
            >
              <Copy className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-12">
            <Link 
              href="/check" 
              className="modern-btn-primary w-full block"
            >
              Check for Response
            </Link>
            <Link 
              href="/" 
              className="modern-btn-secondary w-full block border-transparent bg-transparent hover:bg-modern-beige"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-modern-dark">Ask a Question</h1>
        <p className="text-lg text-modern-dark/70">Your identity is completely anonymous. Feel free to express yourself.</p>
      </div>

      <form onSubmit={handleSubmit} className="modern-card">
        <div className="space-y-8">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-bold text-modern-dark mb-4 uppercase tracking-widest">Category</label>
            <div className="grid grid-cols-2 gap-4">
              {['Mental Health', 'SRH'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-4 px-6 rounded-2xl border-2 transition-all font-medium text-lg ${
                    category === cat 
                      ? 'border-modern-accent bg-modern-sage/30 text-modern-dark shadow-sm' 
                      : 'border-modern-dark/5 hover:border-modern-dark/10 text-modern-dark/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Age Range (Optional) */}
          <div>
            <label className="block text-sm font-bold text-modern-dark mb-4 uppercase tracking-widest">Age Range (Optional)</label>
            <select 
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full bg-modern-beige border border-modern-dark/10 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-modern-accent/20 focus:border-modern-accent transition-all appearance-none"
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
            <label className="block text-sm font-bold text-modern-dark mb-4 uppercase tracking-widest">Your Question</label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here... be as detailed as you like."
              className="w-full bg-modern-beige border border-modern-dark/10 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-modern-accent/20 focus:border-modern-accent transition-all resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm border border-red-100">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="modern-btn-primary w-full flex items-center justify-center gap-3 text-lg py-5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-modern-dark/10"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Securely
              </>
            )}
          </button>

          <p className="text-center text-xs text-modern-dark/40 mt-6 max-w-md mx-auto leading-relaxed">
            By submitting, you agree that this is for informational purposes and peer support, not a medical consultation.
          </p>
        </div>
      </form>
    </div>
  );
}
