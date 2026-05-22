'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Send, ShieldAlert, Heart, Info, 
  Sparkles, CheckCircle2, AlertTriangle, PhoneCall 
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

const QUICK_OPTIONS = [
  { id: 'contraception', label: 'Contraception Options' },
  { id: 'stis', label: 'STI/STD Prevention' },
  { id: 'consent', label: 'Consent & Relationships' },
  { id: 'puberty', label: 'Body Changes & Puberty' },
  { id: 'hotline', label: 'Emergency Hotline' }
];

const BOT_RESPONSES: Record<string, string> = {
  contraception: `Here is reliable information about **Contraception Options**:\n\n1. **Barrier Methods**: Male/female condoms. They prevent both pregnancies and STIs.\n2. **Hormonal Methods**: Daily pills, patches, injections, or implants. They regulate hormones to prevent ovulation.\n3. **Long-Acting Reversible (LARC)**: IUDs (Intrauterine Devices) and hormonal implants. Extremely effective and last 3 to 10 years.\n4. **Emergency Contraceptive Pill (ECP)**: Often called the morning-after pill. It prevents pregnancy if taken up to 72 hours (sometimes up to 120 hours) after unprotected sex. The sooner it is taken, the more effective it is.\n\n*Always consult a healthcare provider to find the method that fits your body.*`,
  stis: `Here is information on **STIs (Sexually Transmitted Infections)** and prevention:\n\n* **Common STIs**: HIV/AIDS, Gonorrhea, Chlamydia, Syphilis, HPV, and Herpes.\n* **How they spread**: Through unprotected vaginal, anal, or oral sex, or skin-to-skin contact (in some cases like HPV/Herpes).\n* **Prevention**:\n  - Use condoms consistently and correctly.\n  - Regular testing (recommend once a year or with every new partner).\n  - Vaccinations (such as the HPV vaccine to prevent cervical/other cancers).\n* **Note**: Many STIs do not show symptoms initially. Testing is the only way to know for sure. Most STIs are easily cured with antibiotics if caught early.`,
  consent: `Understanding **Consent & Healthy Relationships** is crucial:\n\nConsent must follow the **F.R.I.E.S.** principle:\n* **F - Freely Given**: Deciding without pressure, manipulation, or under the influence of drugs/alcohol.\n* **R - Reversible**: You can change your mind at any point, even if you previously agreed.\n* **I - Informed**: Knowing exactly what is happening and agreeing to the specific act.\n* **E - Enthusiastic**: An active, positive agreement (wanting to do it, not just giving in).\n* **S - Specific**: Saying yes to one thing does not mean saying yes to other things.\n\n*Remember: A lack of "no" is not a "yes". Consent is respect.*`,
  puberty: `**Body Changes & Puberty** is a natural transition:\n\n* **What to expect**: Growth spurts, acne/skin changes, body hair growth, body odor, and vocal changes.\n* **Menstruation**: For females, puberty marks the start of periods (menstrual cycle). This is normal and means the body is preparing for potential reproduction.\n* **Nocturnal Emissions**: For males, "wet dreams" are completely normal and happen naturally as sperm production begins.\n* **Emotional shifts**: Hormones affect mood. It is normal to feel more intense emotions or confusion.\n\n*Every body grows at its own pace. Be kind to yourself!*`,
  hotline: `If you need immediate support, counseling, or medical help, please contact:\n\n* **Inshuti Connect Urgent Helpline**: **0784538491** (Call/Text for direct support)\n* **Rwanda Police Emergency**: **112**\n* **Gender-Based Violence Support**: **3512**\n* **RBC Mental Health Hotline**: **114**\n* **Child Helpline**: **116**\n\nAll calls are confidential. Don't hesitate to reach out if you feel unsafe or need advice.`
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am your Inshuti SRH Assistant. I can answer your questions about sexual health, contraception, relationships, and body changes anonymously. How can I help you today?",
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

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      let replyText = "I'm here to listen. You can select one of the quick options below, or contact our support line at **0784538491** for personalized assistance.";
      
      const cleanText = text.toLowerCase();
      if (cleanText.includes('contracept') || cleanText.includes('family plann') || cleanText.includes('condom') || cleanText.includes('pill')) {
        replyText = BOT_RESPONSES.contraception;
      } else if (cleanText.includes('sti') || cleanText.includes('std') || cleanText.includes('hiv') || cleanText.includes('infect') || cleanText.includes('aid')) {
        replyText = BOT_RESPONSES.stis;
      } else if (cleanText.includes('consent') || cleanText.includes('relationship') || cleanText.includes('abuse') || cleanText.includes('toxic')) {
        replyText = BOT_RESPONSES.consent;
      } else if (cleanText.includes('puberty') || cleanText.includes('period') || cleanText.includes('body') || cleanText.includes('grow')) {
        replyText = BOT_RESPONSES.puberty;
      } else if (cleanText.includes('hotline') || cleanText.includes('call') || cleanText.includes('phone') || cleanText.includes('emergency') || cleanText.includes('number') || cleanText.includes('contact')) {
        replyText = BOT_RESPONSES.hotline;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickOptionClick = (optionId: string) => {
    const option = QUICK_OPTIONS.find(o => o.id === optionId);
    if (!option) return;

    // Send user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option.label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: BOT_RESPONSES[optionId] || "I don't have information on that topic yet.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
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
            <span className="font-bold text-teal-600">{number}.</span>
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
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h2 className="font-black text-sm uppercase tracking-tight">Inshuti SRH Bot</h2>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">100% Anonymous Support</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
          <CheckCircle2 className="w-4 h-4" /> Secure & Private
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col h-[calc(100vh-140px)]">
        
        {/* Chat Feed */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 overflow-y-auto mb-4 space-y-6">
          
          {/* Medical Disclaimer */}
          <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 flex gap-3 text-amber-800 text-xs font-medium">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider block mb-1">Medical Disclaimer:</span>
              This automated system provides educational material on sexual health. It is not a substitute for clinical advice. For immediate support, please call our hotline: <strong className="font-bold text-amber-900 underline">0784538491</strong>.
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
            {QUICK_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleQuickOptionClick(opt.id)}
                disabled={isTyping}
                className="bg-white hover:bg-teal-50 border border-slate-200 text-primary hover:text-teal-800 hover:border-teal-300 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm disabled:opacity-50 disabled:pointer-events-none"
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
