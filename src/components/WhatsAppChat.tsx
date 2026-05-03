import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! 👋 I'm ibedev's Support Bot. How can I assist you with our services or projects today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "View projects",
    "Contact info",
    "Availability",
    "Who is ibedev?"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    if (!messageText) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: "You are ibedev's Customer Support Assistant. Your tone is professional, helpful, and friendly. provide very short, clear answers (max 2 sentences). ibedev is a full-stack developer (React, TypeScript, AI). Help users with project inquiries, technical questions, or finding contact info (Email: ebe27712@gmail.com, WhatsApp: 0256745261). Currently booking for Q3 2026.",
        }
      });

      const aiResponse = response.text || "I'm sorry, I'm having trouble connecting to support right now. Please reach out to ibedev directly at ebe27712@gmail.com.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Support is currently offline. Please try again later or contact ibedev via WhatsApp at 0256745261." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-4 max-w-[calc(100vw-32px)]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-full sm:w-72 md:w-80 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col h-[380px] md:h-[420px] max-h-[60vh] sm:max-h-[420px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between shrink-0 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Customer Support</h3>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest">ibedev Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#050505] space-y-4">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white/5 text-neutral-300 rounded-bl-none border border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-neutral-300 rounded-2xl rounded-bl-none p-3 border border-white/5 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-xs">Thinking...</span>
                  </div>
                </div>
              )}
              
              {!isLoading && messages[messages.length - 1]?.role === 'assistant' && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-400 hover:bg-white/10 hover:text-white transition-all active:scale-95 whitespace-nowrap"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-white/[0.02] shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-center text-neutral-600 mt-2 uppercase tracking-tighter">
                Powered by Gemini AI · © 2026 ibedev
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, y: 0 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? {
          y: [0, -10, 0],
        } : { y: 0 }}
        transition={!isOpen ? {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        } : { duration: 0.2 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] relative group z-50"
      >
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-500/40 transition-colors" />
        <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-12 relative z-10" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#050505] rounded-full z-20" />
        )}
      </motion.button>
    </div>
  );
}
