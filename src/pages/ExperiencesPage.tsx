import React, { useState } from 'react';
import { PageId } from '../types';
import { EXPERIENCES_DATA } from '../data/brothersContent';
import { ArrowRight, Sparkles, Shield, Compass } from 'lucide-react';

interface ExperiencesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (service?: string) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const filteredExperiences =
    activeCategoryFilter === 'all'
      ? EXPERIENCES_DATA
      : EXPERIENCES_DATA.filter(
          (e) =>
            e.category.toLowerCase().includes(activeCategoryFilter.toLowerCase()) ||
            e.title.toLowerCase().includes(activeCategoryFilter.toLowerCase())
        );

  return (
    <div className="w-full bg-[#101110] text-[#F1EEE8] py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#B9A17B] mb-2">
            DISCIPLINES OF DISTINCTION · DUBAI
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-[#F1EEE8]">
            The Brothers Experience
          </h1>
          <p className="mt-4 text-base text-[#969892] leading-relaxed">
            Five core pillars engineered to operate independently or synthesize into a complete high-performance lifestyle continuum.
          </p>

          {/* Interactive Filter Tabs (functional segmented controls per anti-slop rules) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'coaching', label: '1:1 Coaching' },
              { id: 'pilates', label: 'Reformer Pilates' },
              { id: 'boxing', label: 'Boxing & Conditioning' },
              { id: 'recovery', label: 'Recovery & Thermal' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  activeCategoryFilter === tab.id
                    ? 'bg-[#B9A17B] text-[#101110] font-semibold shadow-md'
                    : 'bg-[#1B1D1B] text-[#969892] hover:text-[#F1EEE8] border border-[#B9A17B]/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="space-y-12">
          {filteredExperiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="bg-[#1B1D1B] border border-[#B9A17B]/25 p-8 sm:p-12 transition-all hover:border-[#B9A17B]/60"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Info */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#B9A17B] uppercase tracking-widest">
                    <span>{exp.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>0{idx + 1}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#F1EEE8] tracking-wide">
                    {exp.title}
                  </h2>
                  <div className="text-xs sm:text-sm text-[#B9A17B] italic font-serif">
                    {exp.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#969892] leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#F1EEE8]">
                    {exp.keyHighlights.slice(0, 3).map((kh, i) => (
                      <div key={i} className="p-2.5 bg-[#101110] border border-[#B9A17B]/15">
                        <span className="text-[#969892] block text-[10px]">{kh.label}</span>
                        <span>{kh.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#B9A17B]/15 lg:pl-8">
                  <button
                    onClick={() => onNavigate(exp.pageId)}
                    className="w-full lg:w-auto px-6 py-3.5 bg-[#101110] hover:bg-[#151715] text-[#F1EEE8] border border-[#B9A17B]/40 text-xs font-mono uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    View Discipline Details <ArrowRight className="w-4 h-4 text-[#B9A17B]" />
                  </button>
                  <button
                    onClick={() => onOpenConsultation(exp.title)}
                    className="w-full lg:w-auto px-6 py-3.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs font-mono uppercase tracking-[0.15em] transition-colors cursor-pointer text-center"
                  >
                    Inquire For Access
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
