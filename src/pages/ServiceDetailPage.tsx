import React from 'react';
import { PageId, ExperienceDetail } from '../types';
import { EXPERIENCES_DATA } from '../data/brothersContent';
import { ArrowLeft, ArrowRight, Check, Shield, Clock, Sparkles } from 'lucide-react';

interface ServiceDetailPageProps {
  pageId: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (serviceTitle: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  pageId,
  onNavigate,
  onOpenConsultation,
}) => {
  const experience =
    EXPERIENCES_DATA.find((e) => e.pageId === pageId) || EXPERIENCES_DATA[0];

  return (
    <div className="w-full bg-[#101110] text-[#F1EEE8]">
      {/* Editorial Hero Header */}
      <section className="relative py-20 sm:py-28 px-6 sm:px-12 bg-gradient-to-b from-[#191B19] to-[#101110] border-b border-[#B9A17B]/20">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => onNavigate('experiences')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#969892] hover:text-[#B9A17B] mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> All Disciplines
          </button>

          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#B9A17B]">
              SANCTUARY DISCIPLINE · {experience.category}
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-[#F1EEE8]">
              {experience.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#B9A17B] font-serif italic">
              {experience.subtitle}
            </p>
            <p className="text-sm sm:text-base text-[#969892] leading-relaxed pt-2">
              {experience.description}
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#B9A17B]/20">
            {experience.keyHighlights.map((k, i) => (
              <div key={i}>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block">
                  {k.label}
                </span>
                <span className="text-sm sm:text-base font-serif text-[#F1EEE8] mt-0.5 block">
                  {k.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Section: Suitability & Curriculum */}
      <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Column 1: Who It Suits */}
          <div className="p-8 bg-[#1B1D1B] border border-[#B9A17B]/20 space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
                CANDIDACY PROFILE
              </span>
              <h3 className="text-2xl font-serif text-[#F1EEE8] mt-1">Who It Suits</h3>
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-[#969892]">
              {experience.whoItSuits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-[#B9A17B] font-mono font-medium mt-0.5">0{idx + 1}.</span>
                  <span className="text-[#F1EEE8] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: What It Involves */}
          <div className="p-8 bg-[#1B1D1B] border border-[#B9A17B]/20 space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
                SESSION PROTOCOL
              </span>
              <h3 className="text-2xl font-serif text-[#F1EEE8] mt-1">What The Experience Involves</h3>
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-[#969892]">
              {experience.whatItInvolves.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#B9A17B] shrink-0 mt-0.5" />
                  <span className="text-[#F1EEE8] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sanctuary Hardware & Rhythm Integration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-[#171917] border border-[#B9A17B]/15 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B9A17B]">
              Bespoke Sanctuary Feature
            </span>
            <p className="text-xs sm:text-sm text-[#F1EEE8] leading-relaxed">
              {experience.sanctuaryFeature}
            </p>
          </div>
          <div className="p-6 bg-[#171917] border border-[#B9A17B]/15 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B9A17B]">
              Recommended Sanctuary Cadence
            </span>
            <p className="text-xs sm:text-sm text-[#F1EEE8] leading-relaxed">
              {experience.rhythmRecommendation}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-14 p-8 sm:p-12 bg-[#1B1D1B] border border-[#B9A17B]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-serif text-[#F1EEE8]">
              Ready to Experience {experience.title}?
            </h4>
            <p className="text-xs sm:text-sm text-[#969892] mt-1">
              Begin with an introductory consultation and biomechanical assessment.
            </p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onOpenConsultation(experience.title)}
              className="w-full sm:w-auto px-8 py-4 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer whitespace-nowrap shadow-xl"
            >
              Inquire About {experience.title}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
