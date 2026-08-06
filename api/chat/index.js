const { GoogleGenerativeAI } = require('@google/generative-ai');

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

module.exports = async function (context, req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      context.res = {
        status: 500,
        body: { error: 'Gemini API key is not configured.' }
      };
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      context.res = {
        status: 400,
        body: { error: 'Invalid messages history.' }
      };
      return;
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const mappedHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const firstUserIndex = mappedHistory.findIndex((msg) => msg.role === 'user');
    const geminiHistory = firstUserIndex !== -1 ? mappedHistory.slice(firstUserIndex) : [];

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || !lastMessage.text) {
      context.res = {
        status: 400,
        body: { error: 'Empty user prompt.' }
      };
      return;
    }

    const chat = model.startChat({
      history: geminiHistory,
    });

    const result = await chat.sendMessage(lastMessage.text);
    const responseText = result.response.text();

    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: { response: responseText }
    };
  } catch (error) {
    context.log('Error in Azure Function Gemini Chat:', error);
    context.res = {
      status: 500,
      body: { error: 'Failed to process chat with Inshuti Assistant.' }
    };
  }
};
