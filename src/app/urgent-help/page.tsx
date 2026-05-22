'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Phone, AlertOctagon, Heart, ShieldAlert, 
  Wind, ShieldCheck, HelpCircle, CheckSquare 
} from 'lucide-react';

export default function UrgentHelpPage() {
  const [breathingStep, setBreathingStep] = useState(0); // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold
  const [breathingTimer, setBreathingTimer] = useState(4);

  // Box breathing helper timer
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingTimer((prev) => {
        if (prev <= 1) {
          setBreathingStep((step) => (step + 1) % 4);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBreathingInstruction = () => {
    switch (breathingStep) {
      case 0: return { text: 'Inhale Slowly...', color: 'text-emerald-600Scale' };
      case 1: return { text: 'Hold Breath...', color: 'text-teal-600' };
      case 2: return { text: 'Exhale Gently...', color: 'text-indigo-600Scale' };
      case 3: return { text: 'Hold Empty...', color: 'text-slate-600' };
      default: return { text: 'Inhale Slowly...', color: 'text-emerald-600Scale' };
    }
  };

  const instruction = getBreathingInstruction();

  return (
    <div className="min-h-screen bg-bg-beige text-primary font-sans selection:bg-rose-100 selection:text-rose-900 pb-20">
      {/* Header Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-primary/60 hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Subira ku Ntangiriro / Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-10 pb-6 text-center">
        <div className="bg-rose-50 border-2 border-rose-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-rose-900/5 relative overflow-hidden mb-12">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="bg-rose-100 border border-rose-200 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" /> Immediate Assistance
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-rose-700 tracking-tight uppercase italic">
              Need Help Right Now?
            </h1>
            <p className="text-slate-600 font-semibold leading-relaxed">
              If you are in danger, feeling overwhelmed, or experiencing a crisis, please reach out to one of the resources below. You do not have to go through this alone.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Grid */}
      <section className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-6 mb-16">
        
        {/* Main Helpline - Highlighted */}
        <div className="bg-white border-2 border-emerald-500 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden md:col-span-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[10rem] -z-10"></div>
          <div className="space-y-3 max-w-lg">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Direct Peer Hotline
            </span>
            <h3 className="text-2xl font-black text-slate-900">Inshuti Connect Urgent Helpline</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Call or text for immediate anonymous support, counseling, and guidance from our medical and mental health responders.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <a 
              href="tel:0784538491" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/25 transition-all text-xl"
            >
              <Phone className="w-6 h-6 animate-pulse" />
              0784538491
            </a>
            <span className="text-[10px] text-slate-400 font-bold block text-center mt-2 uppercase tracking-wider">
              Free & Confidential · Call/SMS/WhatsApp
            </span>
          </div>
        </div>

        {/* RBC Mental Health Support */}
        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-955">RBC Mental Health Hotline</h4>
              <p className="text-slate-400 text-sm font-medium mt-1 leading-relaxed">
                Rwanda Biomedical Centre's official helpline for suicide prevention, depression, and mental health crises.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <a 
              href="tel:114" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-black text-center block tracking-widest text-sm uppercase transition-all shadow-sm"
            >
              Call 114
            </a>
          </div>
        </div>

        {/* Gender-Based Violence (GBV) Support */}
        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-955">GBV Hotline (Isange One Stop)</h4>
              <p className="text-slate-400 text-sm font-medium mt-1 leading-relaxed">
                National helpline for victims of gender-based violence, sexual assault, abuse, and harassment.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <a 
              href="tel:3512" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-black text-center block tracking-widest text-sm uppercase transition-all shadow-sm"
            >
              Call 3512
            </a>
          </div>
        </div>

        {/* Police Emergency */}
        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-955">Rwanda National Police</h4>
              <p className="text-slate-400 text-sm font-medium mt-1 leading-relaxed">
                Emergency response line for immediate physical danger, violence, or security issues.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <a 
              href="tel:112" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-black text-center block tracking-widest text-sm uppercase transition-all shadow-sm"
            >
              Call 112
            </a>
          </div>
        </div>

        {/* Child Helpline */}
        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-955">Child Helpdesk Rwanda</h4>
              <p className="text-slate-400 text-sm font-medium mt-1 leading-relaxed">
                Dedicated support line for child abuse, reporting neglect, child protection, and child welfare issues.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <a 
              href="tel:116" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-black text-center block tracking-widest text-sm uppercase transition-all shadow-sm"
            >
              Call 116
            </a>
          </div>
        </div>

      </section>

      {/* Grounding & Relaxation Section */}
      <section className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        
        {/* Breathing Exercise */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            Relaxation Tool
          </div>
          <div className="space-y-3 mb-6">
            <h3 className="text-2xl font-black text-slate-900">Box Breathing Guide</h3>
            <p className="text-slate-500 text-xs font-semibold max-w-xs mx-auto leading-relaxed">
              Use this simple exercise to slow your heart rate and ease sudden anxiety or panic.
            </p>
          </div>

          {/* Animated Circle */}
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-slate-50 border-4 border-slate-100 shadow-inner mb-6">
            <div className={`absolute w-32 h-32 rounded-full bg-teal-500/10 border-2 border-teal-500/20 transition-all duration-[4000ms] ${
              breathingStep === 0 ? 'scale-110' : breathingStep === 2 ? 'scale-75' : 'scale-100'
            }`} />
            <div className="text-center z-10">
              <span className={`text-base font-black tracking-tight ${instruction.color}`}>
                {instruction.text}
              </span>
              <span className="block text-3xl font-black text-slate-700 mt-1">{breathingTimer}s</span>
            </div>
          </div>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Repeat for 4-5 cycles or until you feel calmer.
          </div>
        </div>

        {/* Panic Grounding Checklist */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100">
          <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            5-4-3-2-1 Grounding Method
          </h3>
          <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
            If you are having a panic attack, slowly name these out loud to ground yourself in the present:
          </p>

          <ul className="space-y-4">
            {[
              { num: '5', title: 'Things you can SEE', desc: 'Look around and name 5 objects (e.g., a chair, a window, a pen).' },
              { num: '4', title: 'Things you can TOUCH', desc: 'Feel 4 textures (e.g., your shirt, the table, your hair, the floor).' },
              { num: '3', title: 'Things you can HEAR', desc: 'Listen for 3 sounds (e.g., traffic, birds, fan humming, wind).' },
              { num: '2', title: 'Things you can SMELL', desc: 'Identify 2 scents (e.g., soap, perfume, fresh air).' },
              { num: '1', title: 'Thing you can TASTE', desc: 'Acknowledge 1 flavor (e.g., toothpaste, water, mint).' }
            ].map((step) => (
              <li key={step.num} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex-shrink-0 font-black text-sm flex items-center justify-center">
                  {step.num}
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </section>

      {/* Safety Message */}
      <section className="max-w-4xl mx-auto px-6 mt-16 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
        <span>Confidentiality Notice: Your safety is our highest priority. All emergency lines listed are private and do not track or share your identity.</span>
      </section>
    </div>
  );
}
