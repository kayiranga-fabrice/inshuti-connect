'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Lock, LayoutDashboard, MessageSquare, 
  Clock, CheckCircle2, Send, LogOut,
  Search, Filter, ChevronRight, Sparkles
} from 'lucide-react';

type Question = {
  id: string;
  message: string;
  category: string;
  age_range: string | null;
  status: string;
  response: string | null;
  created_at: string;
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'answered'>('pending');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123' || password === 'patrick@2000') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const fetchQuestions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setQuestions(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuestions();
    }
  }, [isAuthenticated]);

  const handleSubmitResponse = async (id: string, response: string) => {
    const { error } = await supabase
      .from('questions')
      .update({ response, status: 'answered' })
      .eq('id', id);

    if (!error) {
      fetchQuestions();
    } else {
      alert('Failed to update response');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl relative z-10">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-center mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 text-center mb-10 font-medium italic">Restricted Access only</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all font-bold text-center tracking-widest"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredQuestions = questions.filter(q => q.status === activeTab);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Nav */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <span className="font-black text-xl tracking-tight uppercase">Inshuti Control Panel</span>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-slate-400 hover:text-rose-600 font-bold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats & Controls */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Pending Questions</span>
              <span className="text-4xl font-black text-primary italic">{questions.filter(q => q.status === 'pending').length}</span>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Answered</span>
              <span className="text-4xl font-black text-emerald-600 italic">{questions.filter(q => q.status === 'answered').length}</span>
           </div>
           <div className="md:col-span-2 bg-primary p-8 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute right-0 bottom-0 p-4 opacity-10"><Sparkles className="w-24 h-24" /></div>
              <h3 className="text-2xl font-black mb-1">Peer Support Management</h3>
              <p className="text-white/60 font-medium">Providing high-quality advice to students.</p>
           </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`flex-1 py-6 font-black uppercase tracking-widest transition-all ${activeTab === 'pending' ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              New Questions
            </button>
            <button 
              onClick={() => setActiveTab('answered')}
              className={`flex-1 py-6 font-black uppercase tracking-widest transition-all ${activeTab === 'answered' ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              Answered History
            </button>
          </div>

          <div className="p-8">
            {isLoading ? (
              <div className="py-20 text-center text-slate-400 font-bold animate-pulse">Loading secure records...</div>
            ) : filteredQuestions.length === 0 ? (
              <div className="py-20 text-center text-slate-400 font-bold italic">No {activeTab} questions found.</div>
            ) : (
              <div className="space-y-6">
                {filteredQuestions.map((q) => (
                  <div key={q.id} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 transition-all hover:border-primary/20">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="bg-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-primary border border-slate-200">
                          {q.category}
                        </span>
                        <span className="text-slate-400 text-[10px] font-black font-mono">ID: {q.id.slice(0, 8)}</span>
                      </div>
                      <span className="text-slate-400 text-xs font-bold">{new Date(q.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Question</h4>
                      <p className="text-xl text-slate-800 leading-relaxed font-medium italic">"{q.message}"</p>
                    </div>

                    {activeTab === 'pending' ? (
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Your Response</h4>
                        <textarea
                          id={`response-${q.id}`}
                          placeholder="Provide a compassionate, evidence-based response..."
                          className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-6 py-4 focus:outline-none focus:border-primary transition-all resize-none text-lg leading-relaxed text-slate-800"
                          rows={4}
                        />
                        <button
                          onClick={() => {
                            const val = (document.getElementById(`response-${q.id}`) as HTMLTextAreaElement).value;
                            if (val) handleSubmitResponse(q.id, val);
                          }}
                          className="bg-primary text-white font-black px-10 py-4 rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
                        >
                          Send Response <Send className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Our Response</h4>
                        <div className="bg-emerald-600 text-white p-6 rounded-2xl font-medium leading-relaxed">
                          {q.response}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
