import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Lock,
  Crown,
  Award,
  Calendar,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface InvestmentTier {
  id: string;
  name: string;
  arabicName: string;
  tagline: string;
  cap: string;
  monthlyFeeAED: number;
  annualFeeMonthlyAED: number;
  annualTotalAED: number;
  annualSavingsAED: number;
  initiationFeeAED: number;
  highlightPill: string;
  coreInclusions: string[];
  annualExclusives: string[];
}

const INVESTMENT_TIERS: InvestmentTier[] = [
  {
    id: 'sanctuary',
    name: 'Sanctuary Member',
    arabicName: 'عضو الملاذ',
    tagline: 'Foundation of Private Athletic Excellence',
    cap: '75 Member Cap',
    monthlyFeeAED: 4200,
    annualFeeMonthlyAED: 3500,
    annualTotalAED: 42000,
    annualSavingsAED: 8400,
    initiationFeeAED: 2500,
    highlightPill: 'Essential Private Club Access',
    coreInclusions: [
      'Reserved 1:1 training bays with Eleiko equipment',
      'Classical Reformer Pilates sanctuary access',
      '4°C monolithic basalt cold plunge & cedar sauna',
      'Private valet reception at 30B Street',
    ],
    annualExclusives: [
      '100% Waived initiation fee (AED 2,500 value)',
      '1 Complimentary guest thermal suite pass per quarter',
      'Guaranteed priority reservation hold during peak seasons',
    ],
  },
  {
    id: 'resident',
    name: 'Resident Member',
    arabicName: 'عضو مقيم',
    tagline: 'Elevated Continuum & Priority Sanctuary Allocation',
    cap: '40 Member Cap',
    monthlyFeeAED: 7500,
    annualFeeMonthlyAED: 6250,
    annualTotalAED: 75000,
    annualSavingsAED: 15000,
    initiationFeeAED: 3500,
    highlightPill: 'Most Selected by Dubai Founders',
    coreInclusions: [
      'Guaranteed peak Dawn & Twilight private bay holds',
      'Quarterly 3D biomechanical & postural reassessments',
      'Full thermal suite access with pneumatic recovery',
      'Dedicated permanent walnut locker with daily laundry',
    ],
    annualExclusives: [
      '100% Waived initiation & 3D screening fee (AED 3,500 value)',
      'Permanent personal locker with complimentary daily laundry',
      '4 Private thermal suite guest passes annually',
      'Priority access to visiting European master coaches',
    ],
  },
  {
    id: 'sovereign',
    name: 'Sovereign Circle',
    arabicName: 'دائرة السيادة',
    tagline: 'Absolute Discretion & Unrestricted Sanctuary Immersion',
    cap: 'Strictly 25 Members',
    monthlyFeeAED: 14000,
    annualFeeMonthlyAED: 11500,
    annualTotalAED: 138000,
    annualSavingsAED: 30000,
    initiationFeeAED: 5000,
    highlightPill: 'By Invitation / Committee Review',
    coreInclusions: [
      'Dedicated Personal Performance Director assigned',
      '24/7 unrestricted private sanctuary access & bay holds',
      'Reciprocal global partner club access (London, Zurich, NY)',
      'Continuous biometric HRV & sleep architecture tracking',
    ],
    annualExclusives: [
      '100% Waived initiation & performance audit (AED 5,000 value)',
      '2 Exclusive after-hours private facility buyouts annually',
      'Dedicated personal driver arrival bay coordination',
      'Full reciprocal access to partner private wellness sanctuaries',
    ],
  },
];

interface MembershipInvestmentTableProps {
  onSelectTier?: (tierName: string) => void;
  onOpenConsultation?: (title?: string) => void;
}

export const MembershipInvestmentTable: React.FC<MembershipInvestmentTableProps> = ({
  onSelectTier,
  onOpenConsultation,
}) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const handleInquire = (tierName: string) => {
    const cycleLabel = billingCycle === 'annual' ? 'Annual Commitment' : 'Monthly Structure';
    if (onSelectTier) {
      onSelectTier(`${tierName} (${cycleLabel})`);
    } else if (onOpenConsultation) {
      onOpenConsultation(`Membership Inquiry: ${tierName} (${cycleLabel})`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6">
      {/* Header & Toggle Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B9A17B] mb-2">
          <Crown className="w-3.5 h-3.5 text-[#B9A17B]" />
          <span>FINANCIAL COMMITMENT & MEMBERSHIP VALUE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#F1EEE8] tracking-tight">
          Membership Investment
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#969892] leading-relaxed">
          Compare our monthly and annual membership structures. Annual commitments grant priority bay hold continuity, waived initiation fees, and dedicated private club privileges.
        </p>

        {/* Segmented Billing Toggle */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <div className="p-1 bg-[#171917] border border-[#B9A17B]/30 inline-flex items-center">
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-[#B9A17B] text-[#101110] font-semibold shadow-md'
                  : 'text-[#969892] hover:text-[#F1EEE8]'
              }`}
            >
              <span>Annual Commitment</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#101110] text-[#B9A17B] font-mono">
                Privileged Tier
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#B9A17B] text-[#101110] font-semibold shadow-md'
                  : 'text-[#969892] hover:text-[#F1EEE8]'
              }`}
            >
              Monthly Structure
            </button>
          </div>

          {/* Value Prop Micro-Kicker */}
          <div className="text-xs text-[#B9A17B] font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B9A17B]" />
            <span>
              {billingCycle === 'annual'
                ? 'Annual commitments include waived initiation fees & dedicated private locker privileges'
                : 'Monthly agreements require initial 3-month onboarding commitment'}
            </span>
          </div>
        </div>
      </div>

      {/* Comparative Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-12">
        {INVESTMENT_TIERS.map((tier) => {
          const isResident = tier.id === 'resident';
          const fee =
            billingCycle === 'annual' ? tier.annualFeeMonthlyAED : tier.monthlyFeeAED;

          return (
            <div
              key={tier.id}
              className={`p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                isResident
                  ? 'bg-[#171917] border-2 border-[#B9A17B] shadow-[0_0_30px_rgba(185,161,123,0.15)]'
                  : 'bg-[#141614] border border-[#B9A17B]/20 hover:border-[#B9A17B]/50'
              }`}
            >
              {/* Highlight Kicker */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#B9A17B] uppercase tracking-wider mb-2">
                  <span>{tier.highlightPill}</span>
                  <span className="text-[10px] text-[#969892]">{tier.cap}</span>
                </div>

                <h3 className="text-2xl font-serif text-[#F1EEE8] tracking-wide">
                  {tier.name}
                </h3>
                <div className="text-xs font-serif text-[#B9A17B]/70 mb-4" dir="rtl">
                  {tier.arabicName}
                </div>

                {/* Price Display */}
                <div className="py-4 border-y border-[#B9A17B]/15 my-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-[#969892]">AED</span>
                    <span className="text-3xl sm:text-4xl font-mono tabular-nums text-[#F1EEE8] font-semibold">
                      {fee.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#969892] font-mono">/ month</span>
                  </div>

                  {billingCycle === 'annual' ? (
                    <div className="mt-2 text-xs space-y-1">
                      <div className="text-[#969892] font-mono">
                        Billed annually at <span className="text-[#F1EEE8] font-medium">AED {tier.annualTotalAED.toLocaleString()}</span>
                      </div>
                      <div className="text-[#B9A17B] font-mono font-medium text-[11px] flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#B9A17B]" />
                        <span>Annual Value: Saves AED {tier.annualSavingsAED.toLocaleString()}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-xs text-[#969892] font-mono">
                      Initiation fee: <span className="text-[#F1EEE8]">AED {tier.initiationFeeAED.toLocaleString()}</span> (one-time)
                    </div>
                  )}
                </div>

                {/* Core Inclusions */}
                <div className="space-y-3 pt-2 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block">
                    Core Sanctuary Privileges
                  </span>
                  <ul className="space-y-2 text-xs text-[#969892]">
                    {tier.coreInclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-[#B9A17B] shrink-0 mt-0.5" />
                        <span className="text-[#F1EEE8] leading-relaxed">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Annual Exclusives Callout */}
                {billingCycle === 'annual' && (
                  <div className="p-4 bg-[#101110] border border-[#B9A17B]/25 mb-6 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#B9A17B] flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3 h-3 text-[#B9A17B]" />
                      Annual Commitment Exclusives
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-[#969892]">
                      {tier.annualExclusives.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#E0DDD7]">
                          <span className="text-[#B9A17B] font-mono font-medium">✦</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#B9A17B]/15">
                <button
                  type="button"
                  onClick={() => handleInquire(tier.name)}
                  className={`w-full py-3.5 text-xs font-mono uppercase tracking-[0.18em] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isResident
                      ? 'bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium shadow-md'
                      : 'bg-[#101110] hover:bg-[#1B1D1B] text-[#F1EEE8] border border-[#B9A17B]/30'
                  }`}
                >
                  <span>Inquire for {tier.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Pillars of the Annual Commitment */}
      <div className="p-8 bg-[#171917] border border-[#B9A17B]/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#B9A17B]/20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B] block">
              THE PRIVILEGED AGREEMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#F1EEE8] mt-0.5">
              Why Dubai Leaders Choose Annual Commitments
            </h3>
          </div>
          <div className="text-xs font-mono text-[#B9A17B]">
            UNCOMPROMISING CONTINUITY
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="space-y-2 p-4 bg-[#101110] border border-[#B9A17B]/15">
            <div className="font-mono text-[#B9A17B]">01. Capital Advantage</div>
            <div className="font-serif text-[#F1EEE8] text-sm">Up to 2 Months Complimentary</div>
            <p className="text-[#969892] leading-relaxed">
              Annual payment structures yield between AED 8,400 to AED 30,000 in annualized privilege savings.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-[#101110] border border-[#B9A17B]/15">
            <div className="font-mono text-[#B9A17B]">02. 100% Waived Initiation</div>
            <div className="font-serif text-[#F1EEE8] text-sm">Zero Onboarding Dues</div>
            <p className="text-[#969892] leading-relaxed">
              Complete exemption from standard candidate screening and biometric onboarding fees (up to AED 5,000).
            </p>
          </div>

          <div className="space-y-2 p-4 bg-[#101110] border border-[#B9A17B]/15">
            <div className="font-mono text-[#B9A17B]">03. Personal Permanent Locker</div>
            <div className="font-serif text-[#F1EEE8] text-sm">Daily Laundry Service</div>
            <p className="text-[#969892] leading-relaxed">
              Leave your training garments on-site at 30B Street. Freshly laundered, pressed, and waiting in your private walnut suite.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-[#101110] border border-[#B9A17B]/15">
            <div className="font-mono text-[#B9A17B]">04. Winter Bay Protection</div>
            <div className="font-serif text-[#F1EEE8] text-sm">Guaranteed Peak Allocation</div>
            <p className="text-[#969892] leading-relaxed">
              Guaranteed bay holds throughout Dubai's high-demand winter season (October – April) with zero wait times.
            </p>
          </div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="mt-6 text-center text-[11px] text-[#969892] leading-relaxed max-w-2xl mx-auto">
        Note: The figures presented above are illustrative commitments for the Private World digital prototype. Official membership dues, screening protocols, and billing schedules are finalized during your in-person consultation at Brothers Private Wellness Club (30B Street, Al Wasl / Jumeirah).
      </div>
    </div>
  );
};
