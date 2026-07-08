import { PRODUCTS } from '../data';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export type GeminiChatTurn = {
  role: 'user' | 'model';
  text: string;
};

const product = PRODUCTS[0];

const SYSTEM_PROMPT = `You are Swavalambi Assistant, the friendly AI support agent for Swavalambi India (authentic wellness brand).

Product knowledge:
- Product: ${product.name}
- Price: ₹${product.price} (MRP ₹${product.originalPrice})
- Description: ${product.description}
- Benefits: ${product.benefits.join(', ')}
- Ingredients: ${product.ingredients.join(', ')}
- Dosage: ${product.dosage}, ${product.dosageFreq}
- Usage: ${product.usageInfo}
- Origin: Premium product from Ladakh
- Shipping: Free on orders above ₹499 across India
- COD: Available
- WhatsApp support: +91 93739 86362
- Website pages: Shop (/shop), FAQ (/faq), Contact (/contact), Track Order (/track-order)

Rules:
- Answer only about Swavalambi products, orders, shipping, usage, and wellness support.
- Keep replies short: 2-4 sentences unless the user asks for detail.
- Reply in the same language the user uses (English, Hindi, Hinglish, or Marathi).
- Do not diagnose diseases or promise cures. Use supportive wellness language only.
- If unsure or the user needs human help, suggest WhatsApp: +91 93739 86362.`;

export function isGeminiConfigured(): boolean {
  return Boolean(GEMINI_API_KEY);
}

export async function getGeminiReply(
  userMessage: string,
  history: GeminiChatTurn[]
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured. Add it to your .env file.');
  }

  const contents = [
    ...history.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    })),
    {
      role: 'user' as const,
      parts: [{ text: userMessage }],
    },
  ];

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!reply) {
    throw new Error('Gemini returned an empty response.');
  }

  return reply;
}
