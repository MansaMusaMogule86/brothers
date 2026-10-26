import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenConsultation,
  onOpenConcierge,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#101110]/95 border-b border-[#B9A17B]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 sm:px-8 py-4">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-lg md:text-xl font-serif tracking-[0.2em] text-[#F1EEE8] hover:text-[#B9A17B] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            BROTHERS
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-[0.18em] text-[#969892]">
            <button
              onClick={() => handleNavClick('experiences')}
              className={`hover:text-[#F1EEE8] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentPage === 'experiences' ||
                currentPage === 'private-training' ||
                currentPage === 'pilates' ||
                currentPage === 'boxing' ||
                currentPage === 'movement' ||
                currentPage === 'recovery'
                  ? 'text-[#F1EEE8] border-b border-[#B9A17B]'
                  : ''
              }`}
            >
              The Experience
            </button>
            <button
              onClick={() => handleNavClick('dna')}
              className={`hover:text-[#F1EEE8] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentPage === 'dna' ? 'text-[#F1EEE8] border-b border-[#B9A17B]' : ''
              }`}
            >
              Brothers DNA™
            </button>
            <button
              onClick={() => handleNavClick('brothers-day')}
              className={`hover:text-[#F1EEE8] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentPage === 'brothers-day' ? 'text-[#F1EEE8] border-b border-[#B9A17B]' : ''
              }`}
            >
              The Brothers Day
            </button>
            <button
              onClick={() => handleNavClick('membership')}
              className={`hover:text-[#F1EEE8] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentPage === 'membership' ? 'text-[#F1EEE8] border-b border-[#B9A17B]' : ''
              }`}
            >
              Membership
            </button>
            <button
              onClick={onOpenConcierge}
              className="hover:text-[#B9A17B] text-[#969892] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#B9A17B]" /> Concierge
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-block px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-[#101110] bg-[#B9A17B] hover:bg-[#D4C4A8] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              Private Access
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F1EEE8] hover:text-[#B9A17B] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[65px] z-50 bg-[#101110] p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-6 pt-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B]">
                NAVIGATION · PRIVATE SANCTUARY
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleNavClick('home')}
                  className="block text-2xl font-serif text-[#F1EEE8] hover:text-[#B9A17B] tracking-wide text-left cursor-pointer"
                >
                  BROTHERS WORLD
                </button>
                <button
                  onClick={() => handleNavClick('experiences')}
                  className="block text-2xl font-serif text-[#F1EEE8] hover:text-[#B9A17B] tracking-wide text-left cursor-pointer"
                >
                  THE EXPERIENCE
                </button>
                <div className="pl-4 space-y-2 border-l border-[#B9A17B]/20">
                  <button
                    onClick={() => handleNavClick('private-training')}
                    className="block text-xs font-mono uppercase tracking-wider text-[#969892] hover:text-[#F1EEE8]"
                  >
                    — Private Training
                  </button>
                  <button
                    onClick={() => handleNavClick('pilates')}
                    className="block text-xs font-mono uppercase tracking-wider text-[#969892] hover:text-[#F1EEE8]"
                  >
                    — Reformer Pilates
                  </button>
                  <button
                    onClick={() => handleNavClick('boxing')}
                    className="block text-xs font-mono uppercase tracking-wider text-[#969892] hover:text-[#F1EEE8]"
                  >
                    — Boxing & Conditioning
                  </button>
                  <button
                    onClick={() => handleNavClick('movement')}
                    className="block text-xs font-mono uppercase tracking-wider text-[#969892] hover:text-[#F1EEE8]"
                  >
                    — Movement & Longevity
                  </button>
                  <button
                    onClick={() => handleNavClick('recovery')}
                    className="block text-xs font-mono uppercase tracking-wider text-[#969892] hover:text-[#F1EEE8]"
                  >
                    — Recovery & Wellness
                  </button>
                </div>
                <button
                  onClick={() => handleNavClick('dna')}
                  className="block text-2xl font-serif text-[#F1EEE8] hover:text-[#B9A17B] tracking-wide text-left cursor-pointer"
                >
                  BROTHERS DNA™
                </button>
                <button
                  onClick={() => handleNavClick('brothers-day')}
                  className="block text-2xl font-serif text-[#F1EEE8] hover:text-[#B9A17B] tracking-wide text-left cursor-pointer"
                >
                  THE BROTHERS DAY
                </button>
                <button
                  onClick={() => handleNavClick('membership')}
                  className="block text-2xl font-serif text-[#F1EEE8] hover:text-[#B9A17B] tracking-wide text-left cursor-pointer"
                >
                  MEMBERSHIP
                </button>
                <button
                  onClick={() => handleNavClick('passport')}
                  className="block text-2xl font-serif text-[#F1EEE8] hover:text-[#B9A17B] tracking-wide text-left cursor-pointer"
                >
                  DNA PASSPORT DEMO
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="block text-2xl font-serif text-[#F1EEE8] hover:text-[#B9A17B] tracking-wide text-left cursor-pointer"
                >
                  LOCATION & CONTACT
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-[#B9A17B]/20 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 bg-[#B9A17B] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] transition-colors"
              >
                REQUEST PRIVATE ACCESS
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConcierge();
                }}
                className="w-full py-3 bg-[#1B1D1B] border border-[#B9A17B]/30 text-[#F1EEE8] text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B9A17B]" /> OPEN BROTHERS CONCIERGE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
