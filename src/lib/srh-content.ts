/** Shared SRH topics and educational copy (review periodically with medical leads). */

export const ASK_CATEGORIES = [
  "Menstruation",
  "Period pain",
  "Contraception",
  "STIs",
  "Consent",
  "Puberty",
  "Pregnancy",
  "Other SRH",
] as const;

export type AskCategory = (typeof ASK_CATEGORIES)[number];

export const HOMEPAGE_SEARCH_SUGGESTIONS = [
  "Menstruation",
  "Period pain",
  "Contraception",
  "Pregnancy",
] as const;

export const CHATBOT_QUICK_OPTIONS = [
  { id: "menstruation", label: "Menstruation & periods" },
  { id: "period_pain", label: "Period pain" },
  { id: "pregnancy", label: "Pregnancy questions" },
  { id: "contraception", label: "Contraception" },
  { id: "stis", label: "STI prevention" },
  { id: "consent", label: "Consent & relationships" },
  { id: "puberty", label: "Puberty & body changes" },
  { id: "hotline", label: "Emergency hotline" },
] as const;

export const CHATBOT_RESPONSES: Record<string, string> = {
  menstruation: `**Menstruation (having a period)** is a normal part of health for many people with a uterus.

* **What it is**: The lining of the uterus leaves the body through the vagina, usually every 21–35 days. Bleeding often lasts 3–7 days.
* **First period**: Can start between about ages 9–16. Starting earlier or later can be normal — talk to a nurse if you are worried.
* **Hygiene**: Change pads every 4–8 hours (or sooner if heavy). Wash hands before and after. Reusable pads or cups are OK if cleaned as directed.
* **At school**: Missing class because of pain or shame is common — you can speak privately with a school nurse or trusted adult.
* **See a health centre if**: Bleeding is so heavy you soak through a pad in an hour, periods stop for months, or severe pain every cycle.

*This is general information, not a diagnosis. For personal care, visit a health centre or ask Inshuti anonymously at /ask.*`,

  period_pain: `**Period pain (cramps)** is common. Mild to moderate cramping in the lower belly or back can be normal.

* **What may help**: Rest, a warm compress on the belly, gentle movement, and over-the-counter pain relief **only if** a pharmacist or nurse says it is safe for you.
* **Track patterns**: Note when pain starts and how strong it is — useful if you see a clinician.
* **Not normal to ignore**: Pain so bad you cannot attend class, vomit, or faint; or pain that is much worse than before.
* **See a health centre if**: Pain does not improve with simple care, gets worse each month, or comes with very heavy bleeding or fever.

*For private support: inshuticonnect.com/ask or helpline **0784538491**.`,

  pregnancy: `**Pregnancy** — if you think you might be pregnant or had unprotected sex:

* **Signs can include**: Missed period, nausea, breast changes, fatigue (signs vary — only a test confirms pregnancy).
* **Testing**: Pregnancy tests are available at pharmacies and health centres. A clinician can confirm and explain options.
* **If you are pregnant**: You deserve non-judgmental care. Visit a health centre or trusted clinic for counselling, prenatal care, or to discuss your choices **according to Rwanda law and clinical guidance**.
* **Emergency contraception**: The morning-after pill may prevent pregnancy after unprotected sex if taken as soon as possible (often within 72 hours). Ask a pharmacist or health worker quickly.

*Scared or unsure? Call **0784538491** or use /urgent-help — confidential support.*`,

  contraception: `Here is reliable information about **Contraception Options**:

1. **Barrier methods**: Male/female condoms — prevent pregnancy and many STIs.
2. **Hormonal methods**: Pills, patches, injections, or implants — need a health provider to choose what fits your body.
3. **Long-acting (LARC)**: IUDs and implants — very effective for several years.
4. **Emergency contraceptive pill (ECP)**: After unprotected sex; more effective the sooner you take it (often up to 72 hours).

*Always get contraception from a pharmacy or health centre. Ask Inshuti anonymously if you have questions.*`,

  stis: `**STIs (sexually transmitted infections)** — key facts:

* **Common STIs**: HIV, chlamydia, gonorrhoea, syphilis, HPV, herpes, and others.
* **Prevention**: Correct condom use, fewer partners, vaccines (e.g. HPV where available), regular testing if sexually active.
* **Many STIs have no symptoms** — testing is the only way to know.
* **Treatment**: Many bacterial STIs are curable with medicine from a clinic. HIV has lifelong treatment that helps people stay healthy.

*Get tested at a health centre. Ask us anonymously at /ask.*`,

  consent: `**Consent & healthy relationships**:

Consent follows **F.R.I.E.S.**:
* **Freely given** — no pressure, threats, or being intoxicated.
* **Reversible** — you can stop at any time.
* **Informed** — you know what you are agreeing to.
* **Enthusiastic** — a real yes, not silence or fear.
* **Specific** — yes to one act is not yes to everything.

*GBV support in Rwanda: **3512**. Urgent help: inshuticonnect.com/urgent-help*`,

  puberty: `**Puberty & body changes** (without repeating full period care — see Menstruation topic):

* Growth spurts, body hair, skin changes, body odour, and voice changes are normal.
* **Menstruation** may start — see our Menstruation topic for hygiene and when to seek care.
* **Wet dreams** in males are normal.
* Mood changes from hormones are common.

*Every body develops at its own pace. Questions? Use /ask or the chatbot.*`,

  hotline: `**Urgent SRH support:**

* **Inshuti Connect**: **0784538491** (call/text)
* **GBV**: **3512**
* **Emergency**: **112**
* **Health helpline (RBC)**: **114**
* **Child helpline**: **116**

*For pregnancy, STI testing, or GBV — visit a health centre as soon as you can.*`,
};

/** Match free-text chat input to a bot response key */
export function matchChatbotTopic(text: string): string | null {
  const t = text.toLowerCase();
  if (
    t.includes("menstruat") ||
    t.includes("period") ||
    t.includes("pad") ||
    t.includes("cycle") ||
    t.includes("amasezerano") ||
    t.includes("impamyabumenyi")
  ) {
    if (t.includes("pain") || t.includes("cramp") || t.includes("ububabare")) return "period_pain";
    return "menstruation";
  }
  if (t.includes("pregnan") || t.includes("missed period") || t.includes("inda")) return "pregnancy";
  if (t.includes("contracept") || t.includes("condom") || t.includes("pill") || t.includes("emergency contracept"))
    return "contraception";
  if (t.includes("sti") || t.includes("std") || t.includes("hiv") || t.includes("infect")) return "stis";
  if (t.includes("consent") || t.includes("relationship") || t.includes("abuse") || t.includes("gbv"))
    return "consent";
  if (t.includes("puberty") || t.includes("body change") || t.includes("grow")) return "puberty";
  if (t.includes("hotline") || t.includes("emergency") || t.includes("call") || t.includes("112"))
    return "hotline";
  return null;
}
