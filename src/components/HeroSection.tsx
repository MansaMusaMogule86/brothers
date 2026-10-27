import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { PageId } from '../types';
import { BROTHERS_SANCTUARY_INFO } from '../data/brothersContent';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (protocol?: string) => void;
}

/**
 * Clean, text-free photograph of the Brothers Private Wellness Club building.
 * Derived (pure pixel crop, no retouching) from the provided master composite at
 * /images/hero/brothers-hero-desktop.webp — the baked-in mock UI/text and
 * navigation band of that composite are excluded so live content is never duplicated.
 */
const HERO_IMAGE = '/images/hero/brothers-hero-desktop-clean.jpg';
const HERO_IMAGE_WIDTH = 913;
const HERO_IMAGE_HEIGHT = 822;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [isDesktop, setIsDesktop] = useState(false);

  // Parallax is desktop-only.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const enableParallax = isDesktop && !reducedMotion;

  // Restrained entrance choreography; empty when reduced motion is preferred.
  const entrance = (delay: number, y = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section
      ref={sectionRef}
      className="relative -mt-[73px] sm:-mt-[77px] min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#101110] px-6 sm:px-12 pt-[121px] sm:pt-[125px] pb-12"
    >
      {/* Desktop: cinematic photograph, right-anchored so the building stays prominently right */}
      <div className="absolute inset-y-0 right-0 hidden lg:block w-[62%] overflow-hidden">
        <motion.img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          width={HERO_IMAGE_WIDTH}
          height={HERO_IMAGE_HEIGHT}
          fetchPriority="high"
          decoding="async"
          initial={reducedMotion ? false : { opacity: 0, scale: 1.045 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          style={enableParallax ? { y: parallaxY } : undefined}
          className="absolute inset-0 h-full w-full object-cover object-[50%_20%] will-change-transform"
        />
        {/* Elegant dark gradient: left column melting over the photograph */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#101110] from-4% via-[#101110]/60 via-36% to-transparent pointer-events-none" />
      </div>

      {/* Mobile & tablet: full-bleed photograph behind the statement */}
      <div className="absolute inset-0 lg:hidden overflow-hidden">
        <motion.img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          width={HERO_IMAGE_WIDTH}
          height={HERO_IMAGE_HEIGHT}
          fetchPriority="high"
          decoding="async"
          initial={reducedMotion ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover object-[30%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101110] via-[#101110]/70 to-[#101110]/45" />
      </div>

      {/* Top scrim: keeps navigation and kicker contrast excellent over the sky */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#101110]/90 via-[#101110]/45 to-transparent pointer-events-none z-[5]" />
      {/* Bottom blend: smooth, borderless transition into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#101110] to-transparent pointer-events-none z-[5]" />

      {/* Top Kicker */}
      <motion.div {...entrance(0.1, 12)} className="relative z-10 pt-4">
        <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#B9A17B] border-b border-[#B9A17B]/30 pb-1">
          <span>30B STREET · AL WASL, JUMEIRAH · DUBAI</span>
          <span aria-hidden="true">/</span>
          <span>BROTHERS PRIVATE WELLNESS CLUB</span>
        </div>
      </motion.div>

      {/* Central Hero Statement */}
      <div className="relative z-10 max-w-4xl my-auto py-12">
        <motion.h1
          {...entrance(0.22, 28)}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#F1EEE8] tracking-tight leading-[1.05] text-balance [text-shadow:0_2px_40px_rgba(16,17,16,0.55)]"
        >
          NOT JUST A GYM.
          <br />
          <span className="italic font-light text-[#B9A17B]">A DIFFERENT</span> STANDARD.
        </motion.h1>
        <motion.p
          {...entrance(0.34, 18)}
          className="mt-6 sm:mt-8 text-base sm:text-xl text-[#969892] max-w-2xl font-normal leading-relaxed [text-shadow:0_1px_24px_rgba(16,17,16,0.6)]"
        >
          {BROTHERS_SANCTUARY_INFO.taglines.sub}
        </motion.p>

        {/* Primary Action Zone */}
        <motion.div
          {...entrance(0.46, 14)}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => onNavigate('dna')}
            className="px-8 py-4 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center gap-2 shadow-xl cursor-pointer"
          >
            DISCOVER YOUR DNA <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('experiences')}
            className="px-8 py-4 bg-[#1B1D1B]/80 hover:bg-[#252825] backdrop-blur-sm text-[#F1EEE8] border border-[#B9A17B]/30 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            EXPLORE BROTHERS
          </button>
        </motion.div>
      </div>

      {/* Hero Bottom Strip: Unboxed Metadata */}
      <motion.div
        {...entrance(0.58, 10)}
        className="relative z-10 pt-6 border-t border-[#B9A17B]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#969892]"
      >
        <div className="flex items-center gap-3">
          <span>Strict Member Cap</span>
          <span aria-hidden="true">·</span>
          <span>Dedicated 1:1 Suites</span>
          <span aria-hidden="true">·</span>
          <span>4°C Monolithic Plunge</span>
        </div>
        <div className="text-[#B9A17B]">
          DISCREET SANCTUARY PROTOCOL
        </div>
      </motion.div>
    </section>
  );
};
