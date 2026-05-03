import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'Expertise', href: '#features' },
  { name: 'Experience', href: '#stats' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-[rgba(10,10,10,0.75)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'bg-[rgba(10,10,10,0.65)] backdrop-blur-[10px] border-b border-[rgba(255,255,255,0.06)]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-shadow duration-300">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-white font-semibold text-xl tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300">
            ibedev
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[rgba(255,255,255,0.7)] hover:text-white text-sm font-medium transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-white/80 transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <a href="https://wa.me/0256745261" target="_blank" rel="noopener noreferrer" className="relative inline-flex h-10 items-center justify-center rounded-[12px] bg-gradient-to-r from-blue-600 to-purple-600/80 px-6 text-sm font-medium text-white shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:from-blue-500 hover:to-purple-500/90 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]">
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[rgba(255,255,255,0.7)] hover:text-white transition-colors duration-300 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-[rgba(10,10,10,0.95)] backdrop-blur-[16px] border-b border-[rgba(255,255,255,0.08)] shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[rgba(255,255,255,0.7)] hover:text-white text-base font-medium transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-5 border-t border-[rgba(255,255,255,0.06)] mt-2">
                <a href="https://wa.me/0256745261" target="_blank" rel="noopener noreferrer" className="w-full inline-flex h-11 items-center justify-center rounded-[12px] bg-gradient-to-r from-blue-600 to-purple-600/80 px-6 text-sm font-medium text-white shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]">
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
