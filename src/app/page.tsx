import Link from 'next/link';
import { ShieldCheck, ArrowRight, HeartPulse, Brain, MessageSquare, Lock, Star, ChevronRight, User } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-modern-beige font-sans text-modern-dark">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-modern-dark/10 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-modern-accent animate-pulse"></span>
              100% Anonymous Support
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-modern-dark mb-8 leading-[1.1] tracking-tight">
              Mental health support, <span className="italic text-modern-accent">without the stigma.</span>
            </h1>
            <p className="text-xl md:text-2xl text-modern-dark/70 mb-12 leading-relaxed">
              Connect with trained student responders safely and anonymously. Ask your questions about mental health and SRH without judgment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/ask" className="modern-btn-primary flex justify-center items-center gap-2 text-lg">
                Ask a Question <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/check" className="modern-btn-secondary flex justify-center items-center text-lg">
                Check My Response
              </Link>
            </div>
          </div>
          
          <div className="relative lg:h-[600px] flex justify-center items-center w-full">
            {/* Abstract Premium Shapes acting as a frame */}
            <div className="absolute inset-0 bg-modern-sage rounded-[3rem] transform rotate-3 scale-105 opacity-50"></div>
            <div className="absolute inset-0 bg-modern-mint rounded-[3rem] transform -rotate-2"></div>
            
            {/* Main Image Container */}
            <div 
              className="relative z-10 w-full h-full min-h-[400px] bg-white rounded-[2.5rem] shadow-xl p-8 flex flex-col justify-between overflow-hidden border border-white/40 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')" }}
            >
               {/* Dark overlay for better text readability */}
               <div className="absolute inset-0 bg-gradient-to-t from-modern-dark/80 via-transparent to-transparent"></div>

               <div className="flex justify-between items-start relative z-20">
                 <ShieldCheck className="w-12 h-12 text-white drop-shadow-md" />
                 <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-modern-dark shadow-sm">Safe Space</div>
               </div>
               
               <div className="space-y-4 mt-auto relative z-20 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-white">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-modern-sage flex items-center justify-center"><User className="w-6 h-6 text-modern-dark"/></div>
                    <div>
                      <div className="text-lg font-bold">100% Anonymous</div>
                      <div className="text-sm text-white/80">Trained Student Responders</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPACT BANNER */}
      <section className="border-y border-modern-dark/5 bg-white/50 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <p className="text-lg font-serif italic text-modern-dark/60">Trusted by students prioritizing their well-being.</p>
          <div className="flex items-center gap-8 md:gap-16 opacity-50 grayscale flex-wrap justify-center">
             <div className="flex items-center gap-2 font-bold text-xl"><Brain className="w-6 h-6"/> Mental Health</div>
             <div className="flex items-center gap-2 font-bold text-xl"><HeartPulse className="w-6 h-6"/> SRH Support</div>
             <div className="flex items-center gap-2 font-bold text-xl"><Lock className="w-6 h-6"/> Privacy First</div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Support shouldn't be intimidating.</h2>
            <p className="text-xl text-modern-dark/70 leading-relaxed">
              For many students, the hardest part of getting help is simply raising their hand. Fear of judgment, privacy concerns, and lack of accessible resources create massive barriers to mental health and sexual/reproductive health care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="p-8 bg-modern-beige rounded-3xl">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Lock className="w-6 h-6 text-modern-dark" />
                </div>
                <h3 className="text-xl font-bold mb-3">Total Anonymity</h3>
                <p className="text-modern-dark/70 leading-relaxed">We remove the friction. No names, no emails, no tracking. Just a safe place to ask what's on your mind.</p>
             </div>
             <div className="p-8 bg-modern-sage/30 rounded-3xl">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <MessageSquare className="w-6 h-6 text-modern-dark" />
                </div>
                <h3 className="text-xl font-bold mb-3">Peer Support</h3>
                <p className="text-modern-dark/70 leading-relaxed">Responses come from trained fellow students who understand the specific pressures you are facing.</p>
             </div>
             <div className="p-8 bg-modern-mint/30 rounded-3xl">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-modern-dark" />
                </div>
                <h3 className="text-xl font-bold mb-3">Supervised Safety</h3>
                <p className="text-modern-dark/70 leading-relaxed">Every response is reviewed by professionals to ensure the advice is safe, supportive, and appropriate.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM (HOW IT WORKS) */}
      <section className="py-32 bg-modern-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">How Inshuti Connect works</h2>
            <p className="text-xl text-white/70">A seamless, code-based journey designed entirely around protecting your privacy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-white/10 -z-0"></div>

            {[
              { num: "01", title: "Submit Inquiry", desc: "Select a category (Mental Health or SRH) and type your question. Be as detailed as you like." },
              { num: "02", title: "Save Your Code", desc: "You will instantly receive a 6-character tracking code. This is your only key to the response." },
              { num: "03", title: "Read Response", desc: "Check back in 24-48 hours. Enter your code to read the supportive response from our trained team." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-modern-accent rounded-full flex items-center justify-center text-3xl font-serif font-bold mb-8 border-8 border-modern-dark">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-white/60 leading-relaxed max-w-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PILLARS OF SUPPORT */}
      <section className="py-32 bg-modern-beige">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Mental Health Block */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6 shadow-sm border border-slate-100">
                Pillar 1
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Mental Health Support</h2>
              <p className="text-xl text-modern-dark/70 mb-8 leading-relaxed">
                Academic pressure, anxiety, depression, or just feeling overwhelmed. You don't have to carry it alone. Our responders are trained to provide empathetic, non-judgmental support for the challenges students face every day.
              </p>
              <ul className="space-y-4 mb-10">
                {['Stress & Anxiety Management', 'Academic Burnout', 'Relationship Issues', 'Loneliness & Isolation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-6 h-6 rounded-full bg-modern-sage flex items-center justify-center"><CheckIcon /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/ask" className="inline-flex items-center gap-2 text-modern-accent font-bold hover:underline text-lg">
                Ask a Mental Health question <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div 
              className="order-1 md:order-2 rounded-[3rem] h-[500px] p-8 relative overflow-hidden flex items-end bg-cover bg-center shadow-xl"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2070&auto=format&fit=crop')" }}
            >
                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-modern-dark/80 via-modern-dark/20 to-transparent"></div>

                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl w-64 shadow-lg border border-white/40 z-10">
                  <div className="text-sm text-modern-dark italic font-medium">"I'm feeling really overwhelmed with exams and my family is pressuring me..."</div>
                </div>
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl w-full shadow-lg border border-white/40 transform translate-y-2 z-10">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-modern-accent flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5 text-white"/></div>
                    <div>
                      <div className="font-bold mb-1 text-modern-dark">Responder Response</div>
                      <div className="text-sm text-modern-dark/80 leading-relaxed">It sounds like you're carrying a very heavy load right now. Let's break this down into manageable pieces...</div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* SRH Block */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div 
              className="bg-modern-mint rounded-[3rem] h-[500px] p-8 relative overflow-hidden flex items-start bg-cover bg-center shadow-xl"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop')" }}
            >
               {/* Overlay gradient for text readability */}
               <div className="absolute inset-0 bg-gradient-to-b from-modern-dark/60 via-transparent to-transparent"></div>

               <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl w-full shadow-lg border border-white/40 mt-4 z-10">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-modern-accent flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5 text-white"/></div>
                    <div>
                      <div className="font-bold mb-1 text-modern-dark">Factual, Safe Information</div>
                      <div className="text-sm text-modern-dark/80 leading-relaxed">There's a lot of misinformation out there. We provide medically accurate, judgment-free information regarding your reproductive health.</div>
                    </div>
                  </div>
                </div>
            </div>
            <div>
              <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6 shadow-sm border border-slate-100">
                Pillar 2
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Sexual & Reproductive Health</h2>
              <p className="text-xl text-modern-dark/70 mb-8 leading-relaxed">
                Questions about SRH can be sensitive. Whether it's about contraception, STIs, or relationships, we provide a safe venue to ask questions you might feel uncomfortable asking a doctor or peer directly.
              </p>
              <ul className="space-y-4 mb-10">
                {['Contraception Information', 'STI/STD Questions', 'Healthy Relationships', 'Puberty & Body Changes'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-6 h-6 rounded-full bg-modern-mint flex items-center justify-center"><CheckIcon /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/ask" className="inline-flex items-center gap-2 text-modern-accent font-bold hover:underline text-lg">
                Ask an SRH question <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-32 bg-white border-t border-modern-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Real Support, Real Impact</h2>
            <p className="text-xl text-modern-dark/70">What students are saying about their experience with Inshuti Connect.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "I was terrified to ask anyone about the symptoms I was having. Getting a non-judgmental, factual response gave me the courage to actually visit the campus clinic.", author: "Anonymous Student, 19" },
              { text: "The pressure of final year was breaking me. Just typing out my feelings anonymously and having someone validate them felt like a massive weight lifted.", author: "Anonymous Student, 22" },
              { text: "I love that I didn't have to create an account or give my email. The 6-digit code system made me feel completely safe to be honest about my situation.", author: "Anonymous Student, 20" }
            ].map((t, i) => (
              <div key={i} className="modern-card flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6 text-modern-accent">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-lg leading-relaxed italic text-modern-dark mb-8">"{t.text}"</p>
                </div>
                <div className="text-sm font-bold uppercase tracking-widest text-modern-dark/50">{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-32 bg-modern-sage overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-modern-mint rounded-full opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">Ready to get support?</h2>
          <p className="text-2xl text-modern-dark/70 mb-12">
            Ask your first question today. It takes less than two minutes, and it's completely anonymous.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ask" className="modern-btn-primary text-lg">
              Start Anonymous Inquiry
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5L4.5 8.5L13 1" stroke="#0F382B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
