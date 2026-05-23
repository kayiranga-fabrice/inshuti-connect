"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Phone, CheckCircle2, AlertCircle, Copy } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SMS_TIP_LIBRARY } from "@/lib/sms-messages";
import { subscribeToSmsTips } from "@/lib/sms";

export default function MessagesPage() {
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState<"en" | "rw">("en");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await subscribeToSmsTips(phone, language);
    if (result.ok) {
      setStatus("success");
      setMessage(
        result.alreadyRegistered
          ? "This number is already registered. Tips will be sent when SMS is enabled."
          : "You are signed up! Automated tips will be sent once SMS is connected by your team."
      );
      setPhone("");
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  };

  const copyTip = async (body: string, keyword: string) => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(keyword);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <PageShell title="SRH tips by SMS">
      <p className="text-slate-600 font-medium mb-8 max-w-2xl leading-relaxed -mt-4">
        Students on basic phones can get short SRH tips by text — contraception, STIs, consent, and more.
        No smartphone required once SMS is connected. Sign up below.
      </p>

      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4"
        >
          <h2 className="font-black text-lg flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Sign up for automated tips
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Rwanda mobile only. We store your number securely to send tips — not for marketing spam.
          </p>

          <div>
            <label htmlFor="phone" className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              placeholder="0781234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full border-2 border-slate-100 rounded-xl px-4 py-3 font-bold focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Language</span>
            <div className="flex gap-2 mt-2">
              {(["en", "rw"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 py-2 rounded-xl font-black text-sm border-2 ${
                    language === lang
                      ? "border-primary bg-primary text-white"
                      : "border-slate-100 text-slate-600"
                  }`}
                >
                  {lang === "en" ? "English" : "Kinyarwanda"}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary text-white py-3 rounded-full font-black disabled:opacity-50"
          >
            {status === "loading" ? "Signing up…" : "Sign up for SMS tips"}
          </button>

          {status === "success" && (
            <p className="text-emerald-700 text-sm font-bold flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              {message}
            </p>
          )}
          {status === "error" && (
            <p className="text-rose-700 text-sm font-bold flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {message}
            </p>
          )}

          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
            Admin: run <code className="bg-slate-100 px-1 rounded">supabase/sms_subscribers.sql</code> then
            connect Africa&apos;s Talking (see .env.example).
          </p>
        </form>

        <div className="space-y-4">
          <h2 className="font-black text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Tip messages (preview)
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Copy a tip to send manually today, or use keywords when SMS is live.
          </p>
          <ul className="space-y-3">
            {SMS_TIP_LIBRARY.map((tip) => (
              <li key={tip.keyword} className="bg-white rounded-xl border border-slate-100 p-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase bg-secondary/40 text-primary px-2 py-0.5 rounded">
                    {tip.keyword}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyTip(tip.body, tip.keyword)}
                    className="text-primary text-xs font-black flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied === tip.keyword ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="font-black text-sm text-slate-900">{tip.title}</p>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{tip.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
        <Link href="/install" className="text-primary underline">
          Install the web app
        </Link>
        <Link href="/urgent-help" className="text-rose-600 underline">
          Urgent help
        </Link>
      </div>
    </PageShell>
  );
}
