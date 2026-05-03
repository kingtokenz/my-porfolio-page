import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "0256745261";
  const message = "Hello ibedev! I'm interested in working with you.";

  const handleSendMessage = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">ibedev Support</h3>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest">Typically replies in minutes</p>
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
            <div className="p-6 bg-[#050505] min-h-[150px] flex flex-col justify-end">
              <div className="bg-white/5 rounded-2xl rounded-bl-none p-3 max-w-[80%] mb-4 self-start">
                <p className="text-sm text-neutral-300">
                  Hi there! 👋 How can I help you with your project today?
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-white/[0.02]">
              <button
                onClick={handleSendMessage}
                className="w-full h-11 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all active:scale-95"
              >
                Start WhatsApp Chat
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/20 relative group"
      >
        <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-12" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#050505] rounded-full" />
      </motion.button>
    </div>
  );
}
