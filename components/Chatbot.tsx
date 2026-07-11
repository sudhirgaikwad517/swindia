import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { getGeminiReply, isGeminiConfigured, GeminiChatTurn } from '../services/geminiChat';

const WHATSAPP_NUMBER = '919373986362';

type ChatMessage = {
  id: number;
  from: 'bot' | 'user';
  text: string;
};

const QUICK_REPLIES = [
  { label: 'Product price', query: 'What is the price of Sea Buckthorn Juice?' },
  { label: 'How to use', query: 'How should I use Sea Buckthorn Juice?' },
  { label: 'Shipping & COD', query: 'Do you offer free shipping and COD?' },
  { label: 'Talk on WhatsApp', query: 'whatsapp' },
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: 'bot',
      text: isGeminiConfigured()
        ? 'Namaste! I am Swavalambi Assistant powered by AI. Ask me about Sea Buckthorn Juice, pricing, usage, or shipping.'
        : 'Namaste! I am Swavalambi Assistant. Add your Gemini API key in .env to enable AI replies. You can still reach us on WhatsApp.',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const addMessage = (from: 'bot' | 'user', text: string) => {
    const id = nextId.current++;
    setMessages((prev) => [...prev, { id, from, text }]);
  };

  const buildHistory = (currentMessages: ChatMessage[]): GeminiChatTurn[] =>
    currentMessages
      .slice(1)
      .map((msg) => ({
        role: msg.from === 'user' ? 'user' : 'model',
        text: msg.text,
      }));

  const handleSend = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || isLoading) return;

    addMessage('user', value);
    setInput('');

    if (value.toLowerCase().includes('whatsapp')) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Swavalambi, I need help with Sea Buckthorn Juice.')}`, '_blank');
    }

    if (!isGeminiConfigured()) {
      addMessage('bot', 'AI chat is not configured yet. Please add GEMINI_API_KEY to your .env file, or chat with us on WhatsApp below.');
      return;
    }

    setIsLoading(true);

    try {
      const history = buildHistory(messages);
      const reply = await getGeminiReply(value, history);
      addMessage('bot', reply);
    } catch (error) {
      console.error('Gemini chat error:', error);
      addMessage(
        'bot',
        'Sorry, I could not process that right now. Please try again or chat with our team on WhatsApp.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Swavalambi, I have a question about your products.')}`, '_blank');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-[60] w-[calc(100vw-2rem)] max-w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col font-sans">
          <div className="bg-[#092813] text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden">
                <img
                  src="/assets/content/chatbot-avatar.png"
                  alt="Swavalambi Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Swavalambi Assistant</p>
                <p className="text-[10px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online · Instant replies
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[#F9FDF9] min-h-[280px] max-h-[340px]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.from === 'user'
                      ? 'bg-[#092813] text-white rounded-br-sm'
                      : 'bg-white text-gray-700 border border-gray-150 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-2xl bg-white border border-gray-150 shadow-sm flex items-center gap-2 text-xs text-gray-500">
                  <Loader2 size={14} className="animate-spin text-[#FE8B00]" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 py-2 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-gray-100 bg-white shrink-0">
            {QUICK_REPLIES.map((item) => (
              <button
                key={item.query}
                onClick={() => handleSend(item.query)}
                disabled={isLoading}
                className="shrink-0 text-[10px] font-semibold px-2.5 py-1.5 rounded-full border border-[#092813]/20 text-[#092813] hover:bg-[#092813] hover:text-white transition-colors disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="px-3 py-3 border-t border-gray-100 bg-white shrink-0 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Type your question..."
                disabled={isLoading}
                className="flex-1 text-xs px-3 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#092813] bg-gray-50 disabled:opacity-60"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-full bg-[#FE8B00] text-[#061C0D] flex items-center justify-center hover:bg-[#092813] hover:text-white transition-colors shrink-0 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
            <button
              onClick={openWhatsApp}
              className="w-full text-[10px] font-bold uppercase tracking-wider py-2 rounded-full bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-colors"
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-[60] transition-all duration-300 ${
          isOpen ? 'scale-95' : 'hover:scale-105'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <span className="w-14 h-14 rounded-full bg-gray-700 text-white shadow-lg flex items-center justify-center">
            <X size={24} />
          </span>
        ) : (
          <span className="block w-14 h-14 rounded-full overflow-hidden shadow-lg">
            <img
              src="/assets/content/chatbot-avatar.png"
              alt="Chat with us"
              className="w-full h-full object-cover"
            />
          </span>
        )}
      </button>
    </>
  );
};

export default Chatbot;
