import Link from 'next/link';
import { ShieldCheck, MessageSquare, Search, HeartPulse, UserCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <HeartPulse className="w-4 h-4" />
            <span>Mental Health & SRH Support</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Anonymous Mental Health & <span className="text-emerald-600">SRH Support</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl">
            Connect with trained student responders safely and anonymously. 
            Ask your questions without judgment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/ask" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5"
            >
              Ask a Question
            </Link>
            <Link 
              href="/check" 
              className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              Check My Response
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-5xl mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-slate-500">Three simple steps to get the support you need.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <MessageSquare className="w-8 h-8 text-emerald-600" />,
              title: "Ask Anonymously",
              desc: "Submit your question about mental health or sexual health. No name or registration required."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
              title: "Get a Code",
              desc: "Receive a unique tracking code. Keep it safe—it's the only way to see your response."
            },
            {
              icon: <Search className="w-8 h-8 text-emerald-600" />,
              title: "Check Response",
              desc: "Return in 24-48 hours, enter your code, and read the support from our trained responders."
            }
          ].map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="bg-emerald-50 p-4 rounded-xl mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Privacy */}
      <section className="max-w-5xl mx-auto px-4 w-full">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              Safety & Privacy
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-emerald-400 mb-2">No Diagnosis</h4>
                <p className="text-slate-300 text-sm">We provide support and information, not medical diagnoses or prescriptions.</p>
              </div>
              <div>
                <h4 className="font-bold text-emerald-400 mb-2">Anonymous Usage</h4>
                <p className="text-slate-300 text-sm">We don't track your IP or collect personal identifying information.</p>
              </div>
              <div>
                <h4 className="font-bold text-emerald-400 mb-2">Supervised Responses</h4>
                <p className="text-slate-300 text-sm">All student responses are reviewed for quality and safety before being posted.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
