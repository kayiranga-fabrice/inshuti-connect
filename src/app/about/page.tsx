'use client';

import Link from 'next/link';
import { 
  ArrowLeft, Heart, Shield, Award, Mail, ExternalLink, 
  CheckCircle2, Users, GraduationCap, Globe 
} from 'lucide-react';

const TEAM = [
  {
    name: 'NIYITANGA Patrick',
    role: 'Team Lead',
    desc: 'Medical Student at ASOME. Passionate about integrating public health and digital tech to help students.',
    affiliation: 'Adventist School of Medicine of East-Central Africa (ASOME)',
    highlight: false
  },
  {
    name: 'IKUZWE Sylvie',
    role: 'Sexual & Reproductive Health (SRH) Lead',
    desc: 'Medical Student at UGHE. Specializes in youth advocacy, reproductive rights, and peer clinical counseling.',
    affiliation: 'University of Global Health Equity (UGHE)',
    highlight: true // Highlighting SRH Lead as requested
  },
  {
    name: 'NDUWIMANA Divin',
    role: 'Peer Education & Support Lead',
    desc: 'Student of Clinical Psychology. Supports students with stigma-free SRH education and safe referral pathways.',
    affiliation: 'University of Rwanda (UR)',
    highlight: false
  },
  {
    name: 'KUOL Akech',
    role: 'Software Engineer',
    desc: 'Full-stack developer focused on building secure, accessible, and fast web experiences for young people.',
    affiliation: 'Developer Community',
    highlight: false
  },
  {
    name: 'Emeka Samuel',
    role: 'Platform Architect',
    desc: 'MSIT Graduate. Designs anonymous message queues, security frameworks, and scalable infrastructure.',
    affiliation: 'Carnegie Mellon University Africa (CMU-Africa)',
    highlight: false
  },
  {
    name: 'BYIRINGIRO Jeanne M.',
    role: 'Community Engagement Lead',
    desc: 'Medical student organizing local campus outreach campaigns, workshops, and awareness events.',
    affiliation: 'Adventist School of Medicine of East-Central Africa (ASOME)',
    highlight: false
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-beige text-primary font-sans selection:bg-secondary selection:text-primary pb-20">
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
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="bg-secondary/25 border border-secondary/20 text-teal-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-block">
            About Inshuti Connect
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic leading-tight">
            Our Vision, Mission <br />& The Team Behind It
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-semibold leading-relaxed">
            Inshuti Connect is a student-led platform for safe, confidential, and completely anonymous Sexual & Reproductive Health (SRH) support.
          </p>
        </div>
      </section>

      {/* Illustration Banner */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="aspect-[21/9] w-full rounded-[3rem] overflow-hidden shadow-2xl relative bg-slate-100 border border-slate-200">
          <img 
            src="/images/rwandan_students_studying.png" 
            alt="Rwandan medical students studying together at ASOME"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 mb-24">
        
        {/* Vision Card */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-primary/5 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[10rem] -z-10 group-hover:scale-105 transition-transform"></div>
          <div>
            <div className="bg-teal-50 p-4 rounded-2xl w-fit mb-6 text-teal-600">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-slate-900">Our Vision</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              We envision a stigma-free environment in Rwandan schools and universities where every student has safe, anonymous access to accurate sexual and reproductive health information. No barriers, no judgment, and absolute privacy.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-1 text-xs font-black uppercase text-teal-600">
            Empowering Everyone <CheckCircle2 className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-primary/5 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[10rem] -z-10 group-hover:scale-105 transition-transform"></div>
          <div>
            <div className="bg-emerald-50 p-4 rounded-2xl w-fit mb-6 text-emerald-600">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-slate-900">Our Mission</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              To empower students through peer-led SRH support, clinically verified sexual health resources, and secure digital tools. By partnering with leading medical institutes, we ensure accurate, non-judgmental information while maintaining 100% confidentiality.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-1 text-xs font-black uppercase text-emerald-600">
            Clinically Guarded <CheckCircle2 className="w-4 h-4 ml-1" />
          </div>
        </div>

      </section>

      {/* ASOME Partnership Section */}
      <section className="bg-primary text-white py-16 px-6 rounded-[3.5rem] max-w-6xl mx-6 md:mx-auto mb-24 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <span className="bg-secondary/25 border border-secondary/20 text-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-block">
            Institutional Partner
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight italic">
            In Partnership with ASOME
          </h2>
          <p className="text-white/80 font-medium leading-relaxed text-sm md:text-base">
            Inshuti Connect operates in collaboration with the **Adventist School of Medicine of East-Central Africa (ASOME)**. Medical students and volunteers from ASOME review medical submissions, ensure educational materials match international clinical standards, and help coordinate student-led wellness communities.
          </p>
          <div className="pt-4 flex justify-center gap-6">
            <span className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
              <Award className="w-4 h-4" /> ASOME Certified
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" /> Clinically Grounded
            </span>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tight">
            Meet the Responders & Team
          </h2>
          <p className="text-slate-500 font-semibold text-sm">
            We are medical students, SRH advocates, and developers building anonymous sexual health support for Rwanda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-[2.5rem] border transition-all flex flex-col justify-between ${
                member.highlight 
                  ? 'bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/5' 
                  : 'bg-white border-slate-100 shadow-lg shadow-primary/5 hover:translate-y-[-4px]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black ${
                    member.highlight ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {member.highlight && (
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                      Featured Lead
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-black text-slate-900">{member.name}</h3>
                <p className={`text-xs font-black uppercase tracking-wider mt-1 ${
                  member.highlight ? 'text-emerald-600' : 'text-slate-400'
                }`}>
                  {member.role}
                </p>
                <p className="text-slate-500 text-sm font-semibold mt-4 leading-relaxed">
                  {member.desc}
                </p>
              </div>

              <div className="border-t border-slate-50 mt-8 pt-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-tight">
                  <GraduationCap className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                  {member.affiliation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl flex flex-col items-center gap-6">
          <Mail className="w-10 h-10 text-teal-600" />
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Have feedback or want to partner?</h3>
            <p className="text-slate-500 font-semibold text-sm max-w-md mx-auto">
              If you are a student group or health organization interested in working with us, get in touch!
            </p>
          </div>
          <a 
            href="mailto:support@inshuticonnect.com" 
            className="bg-primary hover:bg-slate-800 text-white font-black px-8 py-4 rounded-xl transition-all inline-flex items-center gap-2 shadow-md uppercase tracking-wider text-xs"
          >
            support@inshuticonnect.com
          </a>
        </div>
      </section>

    </div>
  );
}
