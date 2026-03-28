import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Bot, Send, Leaf, Loader2, Trash2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useTranslation } from '../i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const quickPrompts = useMemo(() => [
    t.chat.quickPrompt1,
    t.chat.quickPrompt2,
    t.chat.quickPrompt3,
  ], [t]);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: t.chat.welcomeMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from database
  useEffect(() => {
    if (!user) return;
    supabase
      .from('chat_messages')
      .select('role, text')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setMessages(data.map(m => ({ role: m.role as 'user' | 'assistant', text: m.text })));
        }
      });
  }, [user]);

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

    // Persist user message
    if (user) {
      supabase.from('chat_messages').insert({ user_id: user.id, role: 'user', text: trimmed })
        .then(({ error }) => { if (error) console.error('chat insert error:', error); });
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      // Build conversation history for context
      const contents = [
        { role: 'user' as const, parts: [{ text: t.ai.chatSystemPrompt }] },
        { role: 'model' as const, parts: [{ text: t.ai.chatAck }] },
        ...updatedMessages.map((m) => ({
          role: (m.role === 'assistant' ? 'model' : 'user') as 'user' | 'model',
          parts: [{ text: m.text }],
        })),
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents,
      });

      const reply = response.text?.trim() ?? t.chat.fallbackError;
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      // Persist assistant reply
      if (user) {
        supabase.from('chat_messages').insert({ user_id: user.id, role: 'assistant', text: reply })
          .then(({ error }) => { if (error) console.error('chat insert error:', error); });
      }
    } catch (err) {
      console.error('Gemini chat error:', err);
      setMessages((prev) => [...prev, { role: 'assistant', text: t.chat.errorMessage }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = async () => {
    setMessages([{ role: 'assistant', text: t.chat.welcomeMessage }]);
    if (user) {
      await supabase.from('chat_messages').delete().eq('user_id', user.id);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 md:px-6 py-4">
        <div className="bg-primary-container text-on-primary px-4 py-3 shield-motif flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Leaf className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.chat.banner}</span>
          </div>
          <button
            onClick={clearChat}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-secondary hover:text-white transition-colors disabled:opacity-50"
            title={t.chat.clearChat}
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.chat.clearChat}</span>
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-6 space-y-6 pb-4 hide-scrollbar">
        {messages.map((msg, idx) =>
          msg.role === 'assistant' ? (
            <div key={idx} className="flex flex-col items-start max-w-[85%] md:max-w-[75%]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">{t.chat.assistantLabel}</span>
              </div>
              <div className="bg-surface-container-low text-on-surface p-4 shield-motif text-sm leading-relaxed">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={idx} className="flex flex-col items-end max-w-[85%] md:max-w-[75%] self-end">
              <div className="bg-primary text-white p-4 shield-motif text-sm leading-relaxed shadow-md">
                {msg.text}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline mt-1 mr-2">{t.chat.delivered}</span>
            </div>
          )
        )}

        {isLoading && (
          <div className="flex flex-col items-start max-w-[85%] md:max-w-[75%]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline">{t.chat.assistantLabel}</span>
            </div>
            <div className="bg-surface-container-low text-on-surface p-4 shield-motif text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-on-surface-variant italic">{t.chat.thinkingMessage}</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 md:px-6 pb-4 pt-2 bg-surface">
        <div className="lg:max-w-3xl lg:mx-auto">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 pb-1">
            {quickPrompts.map((prompt) => (
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
                placeholder={t.chat.placeholder}
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
