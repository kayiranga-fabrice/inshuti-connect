import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_PROMPT = `You are the Inshuti Connect SRH (Sexual and Reproductive Health) Assistant, dedicated to providing warm, anonymous, non-judgmental, and evidence-based support for youth and students in Rwanda.

Your scope includes:
1. Menstruation and hygiene.
2. Period pain management.
3. Contraception and family planning.
4. Pregnancy signs and resources.
5. Sexually Transmitted Infections (STIs/HIV) prevention.
6. Consent, healthy relationships, and bodily autonomy.
7. Puberty and physical body changes.

Strict Guidelines:
- You must remain purely educational and informative.
- NEVER provide a clinical diagnosis or prescribe medical treatments/medications.
- If a user asks for diagnostic support, or reports severe symptoms, strongly advise them to visit their nearest local health center (Centre de Santé) or contact a healthcare provider.
- Always be supportive, safe, and culturally appropriate for Rwanda.
- Support both Kinyarwanda and English, answering in the language the user asks.
- If the user expresses extreme distress, danger, abuse, or urgent medical needs, guide them to contact these resources:
  * Inshuti Connect Helpline: 0784538491 (call or text)
  * Gender-Based Violence (GBV) Support: 3512
  * General Health Helpline (RBC): 114
  * Child Helpline: 116
  * General Emergency: 112`;

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages history.' },
        { status: 400 }
      );
    }

    // Initialize the Gemini model with system instruction
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Format message history for Gemini: { role: 'user' | 'model', parts: [{ text: string }] }
    // Clean up role names: model uses 'user' and 'model'
    const geminiHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || !lastMessage.text) {
      return NextResponse.json(
        { error: 'Empty user prompt.' },
        { status: 400 }
      );
    }

    const chat = model.startChat({
      history: geminiHistory,
    });

    const result = await chat.sendMessage(lastMessage.text);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error('Error in Gemini Chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat with Inshuti Assistant.' },
      { status: 500 }
    );
  }
}
