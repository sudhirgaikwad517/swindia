import { PRODUCTS } from '../data';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODELS = ['gemini-3.5-flash', 'gemini-2.5-flash-lite'];

export type GeminiChatTurn = {
  role: 'user' | 'model';
  text: string;
};

const product = PRODUCTS[0];

export const SYSTEM_PROMPT = `You are Swavalambi Assistant for Swavalambi India.

Product: ${product.name}
Price: ₹${product.price} (MRP ₹${product.originalPrice})
Benefits: ${product.benefits.join(', ')}
Dosage: ${product.dosage}, ${product.dosageFreq}
Usage: ${product.usageInfo}
Shipping: FREE delivery across India, COD available
WhatsApp: +91 72727 7702 (9172727702)

Reply in 2-3 short sentences. Match user's language (English/Hindi/Marathi). No medical cure claims.`;

export function isGeminiConfigured(): boolean {
  return Boolean(GEMINI_API_KEY);
}

async function callGeminiModel(
  model: string,
  userMessage: string,
  history: GeminiChatTurn[]
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

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

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 256,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`[${model}] ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!reply) {
    throw new Error(`[${model}] Empty response from Gemini.`);
  }

  return reply;
}

async function callChatProxy(
  userMessage: string,
  history: GeminiChatTurn[]
): Promise<string> {
  const response = await fetch('/api/chat.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userMessage,
      history,
      systemPrompt: SYSTEM_PROMPT,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || `Proxy error (${response.status})`);
  }

  if (!data?.reply) {
    throw new Error('Proxy returned empty reply');
  }

  return data.reply;
}

export async function getGeminiReply(
  userMessage: string,
  history: GeminiChatTurn[]
): Promise<string> {
  // Production: use PHP proxy (keeps API key server-side)
  if (!import.meta.env.DEV) {
    try {
      return await callChatProxy(userMessage, history);
    } catch (proxyError) {
      console.warn('Chat proxy failed:', proxyError);
    }
  }

  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured. Add it to your .env file.');
  }

  let lastError: Error | null = null;

  for (const model of GEMINI_MODELS) {
    try {
      return await callGeminiModel(model, userMessage, history);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`Gemini model ${model} failed:`, lastError.message);
    }
  }

  throw lastError ?? new Error('All Gemini models failed.');
}
