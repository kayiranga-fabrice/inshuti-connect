'use client';

import Link from 'next/link';
import {
  ArrowLeft, Shield, Mail,
  CheckCircle2, Users, GraduationCap, Globe
} from 'lucide-react';

const TEAM = [
  {
    name: 'NIYITANGA Patrick',
    role: 'Team Lead',
    desc: 'Medical Student at ASOME. Passionate about integrating public health and digital tech to help students.',
    affiliation: 'Adventist School of Medicine of East-Central Africa (ASOME)',
    highlight: false,
  },
  {
    name: 'IKUZWE Sylvie',
    role: 'Sexual & Reproductive Health Lead',
    desc: 'Medical Student at UGHE. Specializes in youth advocacy, reproductive rights, and peer clinical counseling.',
    affiliation: 'University of Global Health Equity (UGHE)',
    highlight: true,
  },
  {
    name: 'NDUWIMANA Divin',
    role: 'Peer Education & Support Lead',
    desc: 'Student of Clinical Psychology. Supports students with stigma-free SRH education and safe referral pathways.',
    affiliation: 'University of Rwanda (UR)',
    highlight: false,
  },
  {
    name: 'KUOL Akech',
    role: 'Software Engineer',
    desc: 'Full-stack developer focused on building secure, accessible, and fast web experiences for young people.',
    affiliation: 'Developer Community',
    highlight: false,
  },
  {
    name: 'Emeka Samuel',
    role: 'Platform Architect',
    desc: 'MSIT Graduate. Designs anonymous message queues, security frameworks, and scalable infrastructure.',
    affiliation: 'Carnegie Mellon University Africa (CMU-Africa)',
    highlight: false,
  },
  {
    name: 'BYIRINGIRO Jeanne M.',
    role: 'Community Engagement Lead',
    desc: 'Medical student organizing local campus outreach campaigns, workshops, and awareness events.',
    affiliation: 'Adventist School of Medicine of East-Central Africa (ASOME)',
    highlight: false,
  },
];

const PARTNERS = [
  {
    name: 'ASOME',
    fullName: 'Adventist School of Medicine of East-Central Africa',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnsE_GreDG3jm-RCz-het3k3KOH9S7u1W6JEXQyoL1sQ&s=10',
    bg: '#ffffff',
  },
  {
    name: 'RBC',
    fullName: 'Rwanda Biomedical Centre',
    logo: 'https://forum.ncdalliance.org/wp-content/uploads/2024/03/logo-Rwanda_biomedical_centre-500x500-1.png',
    bg: '#ffffff',
  },
  {
    name: 'MoH',
    fullName: 'Ministry of Health Rwanda',
    logo: 'https://rbc.gov.rw/rwandacompass/wp-content/uploads/moh_logo.png',
    bg: '#ffffff',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F4] pb-20">
      {/* Back */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="bg-secondary/25 border border-secondary/30 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-block">
            About Inshuti Connect
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Your Questions. Our Support.{" "}
            <span className="text-violet">Her Future.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Inshuti Connect is a student-led platform providing safe, anonymous, and youth-friendly sexual and reproductive health support across Rwanda.
          </p>
        </div>
      </section>

      {/* Banner image */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-xl relative bg-slate-100 border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/team-outreach.jpeg"
            alt="Inshuti Connect community outreach event"
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 68%" }}
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 mb-20">
        {/* Mission */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="icon-box mb-5 p-3">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black mb-4 text-slate-900">Our Mission</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              To prevent unintended teenage pregnancies by providing young people with safe, anonymous, accessible, and youth-friendly sexual and reproductive health information and support, helping girls make informed decisions, stay in school, and build healthier, more secure futures.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-1.5 text-xs font-bold uppercase text-primary">
            <CheckCircle2 className="w-4 h-4" /> Clinically grounded
          </div>
        </div>

        {/* Vision */}
        <div className="bg-primary p-8 md:p-10 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="bg-secondary/20 p-3 rounded-2xl w-fit mb-5">
              <Globe className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-black mb-4 text-white">Our Vision</h3>
            <p className="text-white/75 font-medium leading-relaxed">
              A Rwanda where no young girl has to abandon her education or lose future opportunities because of an unintended teenage pregnancy, and where every young person can access trusted SRH information and support without fear, stigma, or financial barriers.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-1.5 text-xs font-bold uppercase text-secondary">
            <CheckCircle2 className="w-4 h-4" /> Empowering everyone
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Institutional Partners</p>
          <h2 className="text-2xl md:text-3xl font-black text-violet">Backed by trusted institutions</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center gap-4 text-center"
            >
              <div className="h-16 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-14 max-w-[120px] object-contain"
                />
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm">{partner.name}</p>
                <p className="text-slate-400 text-xs font-medium leading-snug mt-1">{partner.fullName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl md:text-3xl font-black text-violet">Meet the team</h2>
          <p className="text-slate-500 font-medium text-sm">
            Medical students, SRH advocates, and developers building anonymous sexual health support for Rwanda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                member.highlight
                  ? 'bg-white border-2 border-primary shadow-md'
                  : 'bg-white border-slate-100 shadow-sm hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm ${
                      member.highlight ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  {member.highlight && (
                    <span className="bg-secondary/40 text-primary border border-secondary px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                      SRH Lead
                    </span>
                  )}
                </div>
                <h3 className="font-black text-slate-900 text-base">{member.name}</h3>
                <p className={`text-xs font-bold uppercase tracking-wider mt-0.5 mb-3 ${member.highlight ? 'text-primary' : 'text-slate-400'}`}>
                  {member.role}
                </p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{member.desc}</p>
              </div>
              <div className="border-t border-slate-50 mt-5 pt-4">
                <span className="flex items-start gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-tight">
                  <GraduationCap className="w-3.5 h-3.5 shrink-0 mt-px" />
                  {member.affiliation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100 shadow-sm flex flex-col items-center gap-5">
          <Mail className="w-9 h-9 text-primary" />
          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-slate-900">Want to partner or give feedback?</h3>
            <p className="text-slate-500 font-medium text-sm max-w-md mx-auto">
              If you are a student group or health organization interested in working with us, get in touch.
            </p>
          </div>
          <a
            href="mailto:support@inshuticonnect.com"
            className="bg-primary text-white font-bold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2 text-sm hover:opacity-90"
          >
            support@inshuticonnect.com
          </a>
          <p className="text-slate-400 text-xs font-medium">
            Tel: +250 784 091 222
          </p>
        </div>
      </section>
    </div>
  );
}
