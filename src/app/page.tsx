import Link from 'next/link';
import { 
  MessageSquare, Search, Heart, User, 
  Sparkles, ArrowRight, ShieldCheck,
  Smartphone, BookOpen, Users,
  HeartPulse, GraduationCap, HelpingHand,
  PlayCircle, Zap, ExternalLink, Bot, Globe
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col bg-white font-sans selection:bg-secondary selection:text-primary">
      
      {/* --- HERO: ASK REACHOUT --- */}
      <section className="bg-primary text-white pt-12 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="max-w-4xl lg:max-w-5xl">
            <h1 className="text-4xl md:text-[3.5rem] font-black leading-tight mb-8">
              A safe place to chat anonymously, get support & feel better.
            </h1>
            
            {/* Ask ReachOut Component */}
            <div className="bg-white rounded-[2rem] p-2 shadow-2xl flex flex-col md:flex-row items-stretch mb-8 overflow-hidden group">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Search className="w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="How can Ask ReachOut help you?" 
                  className="w-full h-16 md:h-20 pl-16 pr-6 text-slate-900 text-lg font-bold focus:outline-none placeholder:text-slate-300"
                />
              </div>
              <Link 
                href="/ask" 
                className="bg-primary hover:bg-slate-800 text-white px-10 py-4 md:py-0 rounded-[1.5rem] font-black flex items-center justify-center transition-all m-2"
              >
                ASK
              </Link>
            </div>

            {/* Common Searches */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
              <span className="text-slate-300 uppercase tracking-widest text-[10px]">Common Searches:</span>
              {["Anxiety", "Sleep", "Exams", "Relationships"].map(tag => (
                <Link key={tag} href={`/ask?q=${tag}`} className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full border border-white/20 transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SUPPORT OPTIONS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 mb-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20 w-full">
        <Link href="/ask" className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col justify-between group hover:translate-y-[-4px] transition-all">
          <div>
            <div className="bg-emerald-50 p-4 rounded-2xl w-fit mb-4">
              <MessageSquare className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-black mb-2 text-slate-900 group-hover:text-primary transition-colors">Chat with a Peer</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Free, anonymous, 1:1 chat support for students.</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-black uppercase text-emerald-600">
            Start Chat <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        <Link href="/check" className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col justify-between group hover:translate-y-[-4px] transition-all">
          <div>
            <div className="bg-teal-50 p-4 rounded-2xl w-fit mb-4">
              <Smartphone className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-black mb-2 text-slate-900 group-hover:text-primary transition-colors">Check My Response</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Access your private support vault using your tracking code.</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-black uppercase text-teal-600">
            Enter Vault <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        <Link href="/rw" className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col justify-between group hover:translate-y-[-4px] transition-all">
          <div>
            <div className="bg-amber-50 p-4 rounded-2xl w-fit mb-4">
              <Globe className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-black mb-2 text-slate-900 group-hover:text-primary transition-colors">Soma mu Kinyarwanda</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Soma inyigisho z'ubuzima bw'imyororokere n'iby'intekerezo.</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-black uppercase text-amber-600">
            Kura Amakuru <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        <Link href="/chatbot" className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col justify-between group hover:translate-y-[-4px] transition-all">
          <div>
            <div className="bg-indigo-50 p-4 rounded-2xl w-fit mb-4">
              <Bot className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-black mb-2 text-slate-900 group-hover:text-primary transition-colors">SRH Chatbot</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Talk to our automated responder about reproductive health.</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-black uppercase text-indigo-600">
            Start Bot <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* --- ARTICLES, QUIZZES AND STORIES --- */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-black mb-12">Articles, quizzes and stories</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
            {[
              { label: "Anxiety", icon: <HeartPulse className="w-6 h-6" /> },
              { label: "ADHD", icon: <Zap className="w-6 h-6" /> },
              { label: "Friendships", icon: <Users className="w-6 h-6" /> },
              { label: "Stress", icon: <Sparkles className="w-6 h-6" /> },
              { label: "Depression", icon: <HelpingHand className="w-6 h-6" /> },
              { label: "Sex", icon: <Heart className="w-6 h-6" /> },
              { label: "View All", icon: <ArrowRight className="w-6 h-6" />, highlight: true },
            ].map((topic, i) => (
              <Link key={i} href="/ask" className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 font-black text-sm text-center ${
                topic.highlight ? 'bg-primary border-primary text-white' : 'bg-white border-slate-100 text-slate-900 hover:border-primary/20'
              }`}>
                {topic.icon}
                {topic.label}
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-8">
               <div className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-slate-200 rounded-[2.5rem] mb-4 overflow-hidden relative border border-slate-100">
                     {/* Article Image Placeholder */}
                  </div>
                  <h4 className="text-xl font-black leading-tight group-hover:text-primary transition-colors underline decoration-secondary decoration-4 underline-offset-4">School anxiety: How to cope if you're anxious about going to school</h4>
                  <p className="mt-3 text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">If you’ve been having a tough time and feel you can’t go to school because of it, you might be experiencing school refusal.</p>
               </div>
            </div>
            <div className="md:col-span-1 space-y-8">
               <div className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-slate-200 rounded-[2.5rem] mb-4 overflow-hidden relative border border-slate-100">
                     {/* Article Image Placeholder */}
                  </div>
                  <h4 className="text-xl font-black leading-tight group-hover:text-primary transition-colors underline decoration-secondary decoration-4 underline-offset-4">Are you in a toxic relationship?</h4>
                  <p className="mt-3 text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">Learn how to spot the signs of a toxic relationship and understand the difference between toxic behaviours and abuse.</p>
               </div>
            </div>
            <div className="md:col-span-1 space-y-8">
               <div className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-slate-200 rounded-[2.5rem] mb-4 overflow-hidden relative border border-slate-100">
                     {/* Article Image Placeholder */}
                  </div>
                  <h4 className="text-xl font-black leading-tight group-hover:text-primary transition-colors underline decoration-secondary decoration-4 underline-offset-4">Quiz: Are you burning out?</h4>
                  <p className="mt-3 text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">Do you feel drained, run down and unmotivated? Take this quiz to help figure out if you’re burning out.</p>
               </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/ask" className="inline-flex items-center gap-2 font-black text-primary uppercase tracking-widest text-sm border-b-4 border-secondary pb-1">
              All articles <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- VIDEOS --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-black mb-12">Videos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-slate-900 rounded-[2rem] relative flex items-center justify-center overflow-hidden mb-4">
                  <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-white group-hover:scale-110 transition-all" />
                </div>
                <p className="font-bold text-slate-900 text-sm line-clamp-2">How to stay strong and bounce back from challenges.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOR PARENTS & SCHOOLS --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12">
          <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
            <h3 className="text-3xl font-black mb-6">For parents and carers</h3>
            <p className="text-slate-600 mb-8 font-medium leading-relaxed">Helping you support them. Free expert advice, coaching and support for parents and carers in Australia.</p>
            <Link href="#" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-black hover:opacity-90 transition-all">Go to ReachOut Parents <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
            <h3 className="text-3xl font-black mb-6">For schools</h3>
            <p className="text-slate-600 mb-8 font-medium leading-relaxed">Credible, flexible resources for teachers and educators and engaging activities for students.</p>
            <Link href="#" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-black hover:opacity-90 transition-all">Go to ReachOut Schools <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* --- IMPACT & VOLUNTEER --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-black italic">40% of young people experience mental ill-health</h2>
            <p className="text-lg text-slate-600 font-medium">Support ReachOut by donating to our critical services today.</p>
            <Link href="#" className="inline-block bg-primary text-white px-10 py-5 rounded-full font-black hover:opacity-90 transition-all">Donate now</Link>
          </div>
          <div className="flex-1 bg-secondary p-12 rounded-[3.5rem] text-primary">
            <h3 className="text-3xl font-black mb-4">Volunteer with ReachOut</h3>
            <p className="font-bold mb-8 leading-relaxed opacity-80">From casual opportunities and fundraising to community building, there's loads of ways to contribute.</p>
            <Link href="#" className="inline-flex items-center gap-2 font-black border-b-4 border-primary pb-1">Get involved <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="py-24 px-6 bg-slate-900 text-white rounded-[4rem] mx-6 mb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Sign up to our newsletter</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-medium">Get mental health and wellbeing info, tips and stories straight to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 h-16 bg-white/10 rounded-2xl px-6 font-bold border-2 border-white/10 focus:outline-none focus:border-secondary transition-all text-white"
            />
            <button className="h-16 bg-secondary text-primary px-10 rounded-2xl font-black hover:bg-white transition-all">SIGN UP</button>
          </div>
        </div>
      </section>

      {/* --- ACKNOWLEDGEMENT --- */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto text-slate-400 text-sm leading-relaxed space-y-6">
        <p>We acknowledge the traditional owners of Country throughout Australia. We pay our respects to Aboriginal and Torres Strait Islander cultures, and to Elders past and present. We recognise connection to Country as integral to health and wellbeing.</p>
        <p>We acknowledge people with lived experience of mental ill-health and recovery and the experience of people who have been carers, families, or supporters.</p>
        <p>Inshuti Connect values diversity. We are committed to providing a safe, culturally appropriate, and inclusive service for all people, regardless of their ethnicity, faith, disability, sexuality, or gender identity.</p>
      </section>

    </div>
  );
}
