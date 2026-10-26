import React, { useRef } from 'react';
import { PageId } from '../types';
import { BROTHERS_SANCTUARY_INFO } from '../data/brothersContent';
import { PrivateMembershipInquiry } from '../components/PrivateMembershipInquiry';
import { MemberTiersVisualization } from '../components/MemberTiersVisualization';
import { MembershipInvestmentTable } from '../components/MembershipInvestmentTable';
import { ShieldCheck, Check, ArrowRight, Lock, Key, Award, Clock, Sparkles, Crown } from 'lucide-react';

interface MembershipPageProps {
  onOpenConsultation: (tierName?: string) => void;
  onNavigate: (page: PageId) => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({
  onOpenConsultation,
  onNavigate,
}) => {
  const inquirySectionRef = useRef<HTMLDivElement>(null);

  const scrollToInquiry = () => {
    inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectTier = (tierName: string) => {
    onOpenConsultation(tierName);
  };

  return (
    <div className="w-full bg-[#101110] text-[#F1EEE8] py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block">
            PRIVATE ACCESS · DUBAI SANCTUARY
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-[#F1EEE8]">
            Belong to Something Different.
          </h1>
          <p className="text-base sm:text-lg text-[#969892] leading-relaxed">
            Brothers Boutique Gym is designed for individuals who demand private, distraction-free athletic training in Dubai. We strictly limit membership to preserve personal space, undivided coach dedication, and complete member discretion.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToInquiry}
              className="px-8 py-4 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xl inline-flex items-center gap-2"
            >
              Start Consultation Inquiry <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('dna')}
              className="px-8 py-4 bg-[#1B1D1B] hover:bg-[#252825] text-[#F1EEE8] border border-[#B9A17B]/30 font-medium text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              Discover Your DNA
            </button>
          </div>
        </div>

        {/* 1. MEMBER TIERS & PRIVILEGES VISUALIZATION */}
        <section className="pt-4 border-t border-[#B9A17B]/20">
          <MemberTiersVisualization
            onSelectTierForConsultation={handleSelectTier}
            onNavigateToDna={() => onNavigate('dna')}
          />
        </section>

        {/* 2. COMPARATIVE MEMBERSHIP INVESTMENT TABLE (MONTHLY VS. ANNUAL) */}
        <section className="pt-4 border-t border-[#B9A17B]/20">
          <MembershipInvestmentTable
            onSelectTier={handleSelectTier}
            onOpenConsultation={onOpenConsultation}
          />
        </section>

        {/* 3. ADMISSION PROTOCOL (THREE STEPS TO PRIVATE ACCESS) */}
        <div>
          <div className="mb-8 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
              ADMISSION PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] mt-1">
              Three Steps to Private Access
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-[#1B1D1B] border border-[#B9A17B]/20 space-y-4">
              <div className="text-xs font-mono text-[#B9A17B] tracking-widest">PHASE 01</div>
              <h3 className="text-xl font-serif text-[#F1EEE8]">Discreet Inquiry</h3>
              <p className="text-xs text-[#969892] leading-relaxed">
                Submit your preliminary preference profile or Brothers DNA™ protocol. Our membership liaison arranges a private telephone or WhatsApp introduction.
              </p>
            </div>

            <div className="p-8 bg-[#1B1D1B] border border-[#B9A17B]/20 space-y-4">
              <div className="text-xs font-mono text-[#B9A17B] tracking-widest">PHASE 02</div>
              <h3 className="text-xl font-serif text-[#F1EEE8]">Sanctuary Consultation</h3>
              <p className="text-xs text-[#969892] leading-relaxed">
                Experience a private tour of the 30B Street sanctuary in Al Wasl / Jumeirah and a 45-minute movement and postural screening with a master biomechanical coach.
              </p>
            </div>

            <div className="p-8 bg-[#1B1D1B] border border-[#B9A17B]/20 space-y-4">
              <div className="text-xs font-mono text-[#B9A17B] tracking-widest">PHASE 03</div>
              <h3 className="text-xl font-serif text-[#F1EEE8]">Passport Onboarding</h3>
              <p className="text-xs text-[#969892] leading-relaxed">
                Upon mutual alignment, your personalized Brothers DNA™ Passport is issued with reserved private bay windows and thermal suite access.
              </p>
            </div>
          </div>
        </div>

        {/* 4. INTERACTIVE MULTI-STEP CONSULTATION INQUIRY PAVILION */}
        <div ref={inquirySectionRef} className="scroll-mt-24 pt-8 border-t border-[#B9A17B]/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block mb-1">
              GUIDED ADMISSION PAVILION
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#F1EEE8] tracking-tight">
              Begin Your Private Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#969892] mt-2">
              A 5-step guided consultation to establish your identity, communication discretion, disciplines of focus, and preferred sanctuary window.
            </p>
          </div>

          <PrivateMembershipInquiry
            onNavigateToDna={() => onNavigate('dna')}
          />
        </div>

        {/* 5. SANCTUARY PRIVILEGES MATRIX */}
        <div className="bg-[#1B1D1B] border border-[#B9A17B]/30 p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
              SANCTUARY PRIVILEGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] mt-1">
              What Membership Encompasses
            </h2>
            <p className="text-xs sm:text-sm text-[#969892] mt-1">
              Transparent club amenities designed for seamless athletic immersion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {[
              'Guaranteed private training bay allocation during reserved slots',
              'Unlimited thermal contrast therapy: 4°C monolithic stone plunge and infrared sauna',
              'Dedicated biomechanical coach and periodic 3D postural reassessments',
              'Complimentary private valet service at our 30B Street entrance',
              'Access to the Brothers Private Members Lounge & cold-pressed elixir bar',
              'Discreet priority concierge booking via direct WhatsApp concierge',
              'Micro-group reformer Pilates sessions (maximum 3 members per bay)',
              'Invitations to visiting international mobility & sports medicine specialists',
            ].map((privilege, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#101110] border border-[#B9A17B]/10">
                <Check className="w-4 h-4 text-[#B9A17B] shrink-0 mt-0.5" />
                <span className="text-[#F1EEE8] leading-relaxed">{privilege}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
