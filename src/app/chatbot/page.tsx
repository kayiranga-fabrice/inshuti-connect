'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Send, ShieldAlert, Heart, Info, 
  Sparkles, CheckCircle2, AlertTriangle, PhoneCall 
} from 'lucide-react';
import { CHATBOT_QUICK_OPTIONS, CHATBOT_RESPONSES, matchChatbotTopic } from '@/lib/srh-content';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am your Inshuti SRH Assistant. I can help with menstruation, period pain, contraception, pregnancy questions, STIs, consent, and puberty — anonymously. Tap a topic below or type your question.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn('API Chat failed, falling back to static rules:', err);
      let replyText = "I'm here to listen. You can select one of the quick options below, or contact our support line at **0784538491** for personalized assistance.";
      
      const topicKey = matchChatbotTopic(text);
      if (topicKey && CHATBOT_RESPONSES[topicKey]) {
        replyText = CHATBOT_RESPONSES[topicKey];
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickOptionClick = async (optionId: string) => {
    const option = CHATBOT_QUICK_OPTIONS.find((o) => o.id === optionId);
    if (!option) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option.label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn('API Chat failed, falling back to static responses:', err);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: CHATBOT_RESPONSES[optionId] || "I don't have information on that topic yet.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Helper to render markdown-like text
  const formatText = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return <div key={index} className="h-2" />;
      
      // Handle simple list items
      if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
        const content = paragraph.substring(2);
        return (
          <li key={index} className="ml-4 list-disc mb-1 font-medium">
            {parseBold(content)}
          </li>
        );
      }
      if (/^\d+\./.test(paragraph)) {
        const content = paragraph.replace(/^\d+\.\s*/, '');
        const number = paragraph.match(/^\d+/)![0];
        return (
          <div key={index} className="flex gap-2 mb-2 font-medium">
            <span className="font-bold text-primary">{number}.</span>
            <div>{parseBold(content)}</div>
          </div>
        );
      }

      return (
        <p key={index} className="mb-2 leading-relaxed font-medium">
          {parseBold(paragraph)}
        </p>
      );
    });
  };

  const parseBold = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-slate-900">{part}</strong> : part);
  };

  return (
    <div className="min-h-screen bg-bg-beige text-primary font-sans flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-primary" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/images/srh_chatbot_avatar.png" 
                alt="Inshuti Bot Avatar"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h2 className="font-black text-sm uppercase tracking-tight">Inshuti SRH Bot</h2>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">100% Anonymous Support</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-secondary/40 text-primary px-3 py-1.5 rounded-full text-xs font-bold border border-secondary">
          <CheckCircle2 className="w-4 h-4" /> Secure & Private
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col h-[calc(100vh-140px)]">
        
        {/* Chat Feed */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 overflow-y-auto mb-4 space-y-6">
          
          {/* Medical Disclaimer */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-3 text-slate-600 text-xs font-medium">
            <ShieldAlert className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider block mb-1 text-primary">Medical Disclaimer:</span>
              This automated system provides educational material on sexual health. It is not a substitute for clinical advice. For immediate support, please call our hotline: <strong className="font-bold text-primary underline">0784538491</strong>.
            </div>
          </div>

          {/* Messages Map */}
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[70%] rounded-[2rem] p-5 shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.sender === 'bot' ? (
                  <div className="text-sm font-medium">{formatText(msg.text)}</div>
                ) : (
                  <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                )}
                <span className={`text-[9px] font-bold block mt-2 text-right ${
                  msg.sender === 'user' ? 'text-white/60' : 'text-slate-400'
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-100 rounded-[2rem] rounded-tl-none p-5 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Option Chips */}
        <div className="mb-4">
          <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-2 px-2">Tap to ask:</p>
          <div className="flex flex-wrap gap-2">
            {CHATBOT_QUICK_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleQuickOptionClick(opt.id)}
                disabled={isTyping}
                className="bg-white hover:bg-secondary/30 border border-slate-200 text-primary hover:border-primary/30 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm disabled:opacity-50 disabled:pointer-events-none"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="bg-white rounded-full p-2 shadow-lg border border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a sexual health question anonymously..."
            className="flex-1 bg-transparent px-6 py-3 text-sm font-bold text-slate-800 focus:outline-none placeholder:text-slate-400"
          />
          <button 
            type="submit"
            className="bg-primary text-white p-3.5 rounded-full hover:bg-slate-800 transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Contact Tip */}
        <div className="text-center mt-4 mb-2 flex items-center justify-center gap-1.5 text-xs text-primary/60 font-bold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Prefer calling a counselor? Helpline: <strong>0784538491</strong></span>
        </div>
      </div>
    </div>
  );
}
