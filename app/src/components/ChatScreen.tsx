import React, { useState, useRef, useEffect } from 'react';
import { Info, Bot, Send, Leaf, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const SYSTEM_PROMPT = `Ti si "ZG Eko-Asistent", prijateljski chatbot za pomoć građanima Zagreba s recikliranjem i sortiranjem otpada.

Tvoja pravila:
- Odgovaraj ISKLJUČIVO na hrvatskom jeziku (zagrebački govor je poželjan)
- Budi koncizan — odgovori u 2-4 rečenice osim ako korisnik traži detalje
- Poznaj zagrebački sustav sortiranja otpada:
  • Žuti spremnik: plastika, metal, limenke, tetrapak
  • Plavi spremnik: papir, karton, novine
  • Smeđi spremnik: biootpad, hrana, biljni ostaci
  • Zeleni spremnik: staklo
  • Crni/sivi spremnik: miješani komunalni otpad
- Poznaj lokacije reciklažnih dvorišta u Zagrebu
- Ako ne znaš točnu lokaciju, predloži da korisnik provjeri na karti u aplikaciji
- Budi pozitivan i motiviraj korisnike na recikliranje
- Ako pitanje nije vezano za otpad/recikliranje, ljubazno preusmjeri razgovor
- Ne koristi markdown formatiranje (bold, italic, liste s *) — piši čisti tekst`;

const QUICK_PROMPTS = [
  'Kamo idu baterije?',
  'Što je glomazni otpad?',
  'Čašice od jogurta?',
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Bok! Ja sam tvoj ZG Eko-Asistent. Kako ti mogu pomoći s recikliranjem danas?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { role: 'user', text: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      // Build conversation history for context
      const contents = [
        { role: 'user' as const, parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model' as const, parts: [{ text: 'Razumijem, ja sam ZG Eko-Asistent. Kako ti mogu pomoći?' }] },
        ...updatedMessages.map((m) => ({
          role: (m.role === 'assistant' ? 'model' : 'user') as 'user' | 'model',
          parts: [{ text: m.text }],
        })),
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents,
      });

      const reply = response.text?.trim() ?? 'Oprosti, nisam uspio odgovoriti. Pokušaj ponovo.';
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      console.error('Gemini chat error:', err);
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Ups, došlo je do greške. Pokušaj ponovo.' }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 md:px-6 py-4">
        <div className="bg-primary-container text-on-primary px-4 py-3 shield-motif flex items-center justify-between shadow-sm lg:max-w-2xl lg:mx-auto">
          <div className="flex items-center gap-3">
            <Leaf className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">ZG Eko-Asistent — Powered by Gemini</span>
          </div>
          <Info className="w-5 h-5 text-secondary" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 space-y-6 pb-4 hide-scrollbar lg:max-w-2xl lg:mx-auto lg:w-full">
        {messages.map((msg, idx) =>
          msg.role === 'assistant' ? (
            <div key={idx} className="flex flex-col items-start max-w-[85%] md:max-w-[75%] lg:max-w-[60%]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">ZG Eko-Asistent</span>
              </div>
              <div className="bg-surface-container-low text-on-surface p-4 shield-motif text-sm leading-relaxed">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={idx} className="flex flex-col items-end max-w-[85%] md:max-w-[75%] lg:max-w-[60%] self-end">
              <div className="bg-primary text-white p-4 shield-motif text-sm leading-relaxed shadow-md">
                {msg.text}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline mt-1 mr-2">Dostavljeno</span>
            </div>
          )
        )}

        {isLoading && (
          <div className="flex flex-col items-start max-w-[85%] md:max-w-[75%] lg:max-w-[60%]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline">ZG Eko-Asistent</span>
            </div>
            <div className="bg-surface-container-low text-on-surface p-4 shield-motif text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-on-surface-variant italic">Razmišljam...</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 md:px-6 pb-4 pt-2 bg-surface">
        <div className="lg:max-w-2xl lg:mx-auto">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 pb-1">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap bg-surface-container-highest text-primary px-4 py-2 shield-motif text-[11px] md:text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors duration-200 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="flex-1 bg-surface-container-low shield-motif flex items-center px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pitaj nešto..."
                disabled={isLoading}
                className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-sm text-on-surface placeholder:text-outline disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform shrink-0 disabled:opacity-50"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
