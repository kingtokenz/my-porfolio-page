import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { NikeSwoosh } from '@/components/ui/icons';

const navLinks = [
  { name: 'New & Featured', href: '#' },
  { name: 'Men', href: '#' },
  { name: 'Women', href: '#' },
  { name: 'Kids', href: '#' },
  { name: 'Sale', href: '#' },
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
        <div className="flex-shrink-0 flex items-center cursor-pointer group">
          <NikeSwoosh className="w-16 h-16 text-white transition-transform duration-300 group-hover:scale-110" />
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

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-white hover:text-neutral-400 transition-colors">
            <Search className="w-6 h-6" />
          </button>
          <button className="text-white hover:text-neutral-400 transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </button>
          <a href="#" className="relative inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-black transition-all duration-300 hover:bg-neutral-200">
            Join Us
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
              <div className="pt-5 border-t border-[rgba(255,255,255,0.06)] mt-2 flex flex-col gap-4">
                <a href="#" className="w-full inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-black transition-all duration-300">
                  Join Us
                </a>
                <div className="flex justify-center gap-8 text-white py-2">
                  <Search className="w-6 h-6" />
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
