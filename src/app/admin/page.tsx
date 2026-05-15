'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, MessageSquare, CheckCircle, Clock, AlertCircle, ChevronRight, X } from 'lucide-react';

type Question = {
  id: string;
  message: string;
  category: string;
  age_range: string | null;
  code: string;
  response: string | null;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchQuestions();
    } else {
      setError('Invalid password');
    }
  };

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const { data, error: supabaseError } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setQuestions(data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch questions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitResponse = async () => {
    if (!selectedQuestion || !adminResponse.trim()) return;

    setIsUpdating(true);
    try {
      const { error: supabaseError } = await supabase
        .from('questions')
        .update({
          response: adminResponse,
          status: 'answered'
        })
        .eq('id', selectedQuestion.id);

      if (supabaseError) throw supabaseError;

      setQuestions(questions.map(q => 
        q.id === selectedQuestion.id 
          ? { ...q, response: adminResponse, status: 'answered' } 
          : q
      ));
      setSelectedQuestion(null);
      setAdminResponse('');
    } catch (err) {
      console.error(err);
      alert('Failed to update response');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
          <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Question Management</h1>
          <p className="text-slate-500">Review and respond to anonymous inquiries.</p>
        </div>
        <button 
          onClick={fetchQuestions}
          className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>All Questions ({questions.length})</span>
            </div>
            {questions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
                No questions found.
              </div>
            ) : (
              questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setAdminResponse(q.response || '');
                  }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all ${
                    selectedQuestion?.id === q.id 
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/10' 
                      : 'border-white bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{q.code}</span>
                    <span className={`flex items-center gap-1 text-[10px] font-bold uppercase ${
                      q.status === 'answered' ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {q.status === 'answered' ? <CheckCircle className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                      {q.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                    {q.message}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      {new Date(q.created_at).toLocaleDateString()}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="lg:col-span-2">
            {selectedQuestion ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 sticky top-24">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                      {selectedQuestion.category}
                    </span>
                    {selectedQuestion.age_range && (
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                        Age: {selectedQuestion.age_range}
                      </span>
                    )}
                  </div>
                  <button onClick={() => setSelectedQuestion(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-10">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Question</h3>
                  <div className="bg-slate-50 p-6 rounded-2xl text-slate-800 leading-relaxed whitespace-pre-wrap italic">
                    "{selectedQuestion.message}"
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Your Response</h3>
                  <textarea
                    rows={8}
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    placeholder="Provide a helpful, non-judgmental response..."
                    className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 transition-all resize-none mb-6"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedQuestion(null)}
                      className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitResponse}
                      disabled={isUpdating || !adminResponse.trim()}
                      className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-200"
                    >
                      {isUpdating ? 'Updating...' : 'Post Response'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
                <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a question from the list to view details and provide a response.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
