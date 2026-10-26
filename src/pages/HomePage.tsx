import React from 'react';
import { PageId, DnaProfile } from '../types';
import { ThreeDExperience } from '../components/ThreeDExperience';
import { BROTHERS_SANCTUARY_INFO, EXPERIENCES_DATA } from '../data/brothersContent';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Check, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (protocol?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="w-full">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-between px-6 sm:px-12 py-12 bg-gradient-to-b from-[#141614] via-[#101110] to-[#101110] border-b border-[#B9A17B]/20 overflow-hidden">
        {/* Background Architectural Atmosphere */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#B9A17B]/10 blur-[120px]" />
          <div className="absolute bottom-0 left-[-100px] w-[450px] h-[450px] rounded-full bg-[#B9A17B]/5 blur-[100px]" />
          <div className="w-full h-full bg-[radial-gradient(#B9A17B_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        </div>

        {/* Top Kicker */}
        <div className="relative z-10 pt-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B9A17B] border-b border-[#B9A17B]/30 pb-1">
            <span>30B STREET · AL WASL, JUMEIRAH · DUBAI</span>
            <span aria-hidden="true">/</span>
            <span>BROTHERS PRIVATE WELLNESS CLUB</span>
          </div>
        </div>

        {/* Central Hero Statement */}
        <div className="relative z-10 max-w-4xl my-auto py-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#F1EEE8] tracking-tight leading-[1.05] text-balance">
            NOT JUST A GYM.
            <br />
            <span className="italic font-light text-[#B9A17B]">A DIFFERENT</span> STANDARD.
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-[#969892] max-w-2xl font-normal leading-relaxed">
            {BROTHERS_SANCTUARY_INFO.taglines.sub}
          </p>

          {/* Primary Action Zone */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('dna')}
              className="px-8 py-4 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              DISCOVER YOUR DNA <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('experiences')}
              className="px-8 py-4 bg-[#1B1D1B] hover:bg-[#252825] text-[#F1EEE8] border border-[#B9A17B]/30 font-medium text-xs uppercase tracking-[0.2em] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              EXPLORE BROTHERS
            </button>
          </div>
        </div>

        {/* Hero Bottom Strip: Unboxed Metadata */}
        <div className="relative z-10 pt-6 border-t border-[#B9A17B]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#969892]">
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
        </div>
      </section>

      {/* 2. THE THREE.JS SANCTUARY MONOLITH EXPERIENCE */}
      <section className="relative w-full border-b border-[#B9A17B]/20">
        <ThreeDExperience
          onExploreDna={() => onNavigate('dna')}
          onExploreBrothers={() => onNavigate('experiences')}
        />
      </section>

      {/* 3. EDITORIAL MANIFESTO: SIMPLICITY IS THE LUXURY */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#1B1D1B] text-[#F1EEE8] border-b border-[#B9A17B]/20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block mb-2">
              FOUNDATIONAL PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight leading-tight">
              Simplicity is the Luxury.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#969892] leading-relaxed">
              We eliminated the crowded floors, generic equipment clusters, and noise of commercial fitness. In their place stands an architectural sanctuary crafted for focused human evolution in Dubai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BROTHERS_SANCTUARY_INFO.principles.map((p) => (
              <div key={p.index} className="space-y-3 p-6 bg-[#101110] border border-[#B9A17B]/15">
                <div className="text-xs font-mono text-[#B9A17B] tracking-widest">{p.index}.</div>
                <h3 className="text-lg font-serif tracking-wide text-[#F1EEE8]">{p.title}</h3>
                <p className="text-xs text-[#969892] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE BROTHERS EXPERIENCE (5 PILLARS OVERVIEW) */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#101110] border-b border-[#B9A17B]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#B9A17B]/20">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B]">
                DISCIPLINES OF DISTINCTION
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#F1EEE8] tracking-tight mt-1">
                The Brothers Experience
              </h2>
            </div>
            <button
              onClick={() => onNavigate('experiences')}
              className="text-xs font-mono uppercase tracking-[0.18em] text-[#B9A17B] hover:text-[#F1EEE8] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              View Detailed Guide <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Asymmetric Bento Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCES_DATA.map((exp, idx) => (
              <div
                key={exp.id}
                className={`p-8 bg-[#1B1D1B] border border-[#B9A17B]/20 hover:border-[#B9A17B]/60 transition-all flex flex-col justify-between group cursor-pointer ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onClick={() => onNavigate(exp.pageId)}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#B9A17B] uppercase tracking-wider mb-3">
                    <span>{exp.category}</span>
                    <span className="opacity-60">0{idx + 1}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#F1EEE8] tracking-wide mb-2 group-hover:text-[#B9A17B] transition-colors">
                    {exp.title}
                  </h3>
                  <div className="text-xs text-[#B9A17B] font-medium mb-3">{exp.subtitle}</div>
                  <p className="text-xs sm:text-sm text-[#969892] leading-relaxed mb-6">
                    {exp.tagline}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#B9A17B]/15 flex items-center justify-between text-xs">
                  <span className="text-[#969892] font-mono">{exp.keyHighlights[0].value}</span>
                  <span className="text-[#B9A17B] font-mono flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Discover Discipline <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE FEATURE CALLOUT: BROTHERS DNA™ */}
      <section className="py-24 px-6 sm:px-12 bg-gradient-to-r from-[#171917] via-[#1B1D1B] to-[#171917] border-b border-[#B9A17B]/20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
              <Sparkles className="w-4 h-4 text-[#B9A17B]" />
              <span>THE SIGNATURE PROTOCOL CONFIGURATOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F1EEE8] tracking-tight">
              Brothers DNA™
            </h2>
            <p className="text-sm sm:text-base text-[#969892] leading-relaxed">
              Every body possesses unique biomechanics, recovery capacity, and kinetic ambitions. Our 60-second guided configurator maps your goals to an uncompromising weekly sanctuary architecture.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('dna')}
                className="px-8 py-4 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                Configure Your DNA Passport <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Luxury Card Preview Mockup */}
          <div className="w-full lg:w-[420px] p-6 bg-[#101110] border border-[#B9A17B]/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B9A17B]/20 text-xs font-mono">
              <span className="text-[#B9A17B]">BROTHERS DNA™ PASSPORT</span>
              <span className="text-[#969892]">SPECIMEN</span>
            </div>
            <div className="text-lg font-serif text-[#F1EEE8]">
              THE APEX ATHLETIC PROTOCOL
            </div>
            <div className="space-y-2 text-xs text-[#969892]">
              <div className="flex justify-between">
                <span>Discipline Focus</span>
                <span className="text-[#F1EEE8]">Private Strength & Boxing</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Cadence</span>
                <span className="text-[#F1EEE8]">4 Sessions / Week</span>
              </div>
              <div className="flex justify-between">
                <span>Thermal Reset</span>
                <span className="text-[#F1EEE8]">4°C Monolithic Plunge</span>
              </div>
            </div>
            <div className="pt-3 border-t border-[#B9A17B]/15 text-[11px] text-[#B9A17B] text-center font-mono">
              RULE-BASED DETERMINISTIC ARCHITECTURE
            </div>
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE FEATURE CALLOUT: THE BROTHERS DAY */}
      <section className="py-24 px-6 sm:px-12 bg-[#101110] border-b border-[#B9A17B]/20">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Visual Timeline Sample */}
          <div className="w-full lg:w-[440px] space-y-3">
            {[
              { time: '07:00 AM', title: '1:1 Private Biomechanical Strength', cat: 'Training' },
              { time: '08:05 AM', title: 'Thermal Contrast & Monolithic Plunge', cat: 'Recovery' },
              { time: '08:50 AM', title: 'Lounge Reset & Cold-Pressed Elixir', cat: 'Rest' },
            ].map((step, idx) => (
              <div key={idx} className="p-4 bg-[#1B1D1B] border border-[#B9A17B]/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[#B9A17B]">{step.time}</div>
                  <div className="text-sm font-serif text-[#F1EEE8] mt-0.5">{step.title}</div>
                </div>
                <div className="text-[10px] font-mono text-[#969892] uppercase">{step.cat}</div>
              </div>
            ))}
          </div>

          <div className="max-w-xl space-y-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B]">
              BESPOKE VISUAL ITINERARY BUILDER
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F1EEE8] tracking-tight">
              The Brothers Day
            </h2>
            <p className="text-sm sm:text-base text-[#969892] leading-relaxed">
              Curate your sanctuary immersion. Combine tailored strength coaching, reformer core alignment, and cold contrast therapy into a seamless chronological visit.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('brothers-day')}
                className="px-8 py-4 bg-[#1B1D1B] hover:bg-[#252825] text-[#F1EEE8] border border-[#B9A17B]/30 font-medium text-xs uppercase tracking-[0.2em] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                Build Your Itinerary <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRIVATE MEMBERSHIP INVITATION */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#1B1D1B] text-center border-b border-[#B9A17B]/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B]">
            DUBAI PRIVATE ADMISSION
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#F1EEE8] tracking-tight">
            Belong to Something Different.
          </h2>
          <p className="text-sm sm:text-base text-[#969892] leading-relaxed max-w-xl mx-auto">
            Brothers Boutique Gym maintains strict member limits to preserve space, undivided coach dedication, and complete discretion.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation()}
              className="w-full sm:w-auto px-8 py-4 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xl"
            >
              Request Private Consultation
            </button>
            <button
              onClick={() => onNavigate('membership')}
              className="w-full sm:w-auto px-8 py-4 bg-[#101110] hover:bg-[#151715] text-[#F1EEE8] border border-[#B9A17B]/30 font-medium text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              Explore Member Tiers & Privileges
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
