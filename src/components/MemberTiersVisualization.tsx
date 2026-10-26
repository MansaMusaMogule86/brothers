import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Lock,
  Award,
  Crown,
  Key,
  Flame,
  Activity,
  Layers,
  ChevronRight,
  Info,
  X,
} from 'lucide-react';

export interface BenefitItem {
  title: string;
  detail: string;
  spec: string;
}

export interface MemberTier {
  id: 'sanctuary' | 'resident' | 'sovereign';
  name: string;
  arabicName: string;
  tagline: string;
  cap: string;
  description: string;
  idealFor: string;
  pillarBenefits: {
    category: string;
    items: BenefitItem[];
  }[];
  exclusiveHighlights: {
    title: string;
    detail: string;
    spec: string;
  }[];
  accessWindow: string;
  valetService: string;
  progressionMilestone: string;
}

const MEMBER_TIERS: MemberTier[] = [
  {
    id: 'sanctuary',
    name: 'Sanctuary Member',
    arabicName: 'عضو الملاذ',
    tagline: 'The Foundation of Private Athletic Excellence',
    cap: 'Capped at 75 Members',
    description:
      'Curated for high-performing professionals seeking dedicated 1:1 training suites, reformer Pilates, and restorative contrast therapy in an intimate, distraction-free environment.',
    idealFor: 'Executives & discipline-focused individuals training 2–3 times weekly.',
    accessWindow: 'Standard Sanctuary Hours (06:00 – 21:30)',
    valetService: 'Complimentary private valet reception at 30B Street',
    progressionMilestone: 'Initial entry point following biometric screening and candidate consultation.',
    pillarBenefits: [
      {
        category: 'Training & Suites',
        items: [
          {
            title: 'Reserved private 1:1 training bays with Eleiko hardware',
            detail:
              'Acoustically isolated private bays equipped with calibrated Swedish Eleiko competition bars, custom brass dumbbells, and individual soundscape controls.',
            spec: '1:1 Exclusivity · Acoustic Isolation',
          },
          {
            title: 'Full access to classical Reformer Pilates sanctuary',
            detail:
              'Sessions on handcrafted dark walnut and cream leather reformers featuring dual-rope spring calibration and lumbar decompression mechanics.',
            spec: 'Custom Walnut Reformers',
          },
          {
            title: 'Private heavy bag & boxing conditioning bays',
            detail:
              'Handcrafted oxblood leather heavy bags with brass tensioners and dedicated coaches specializing in rotational power and strike mechanics.',
            spec: 'Handmade Leather · Strike Analysis',
          },
        ],
      },
      {
        category: 'Recovery & Thermal',
        items: [
          {
            title: 'Post-training 4°C monolithic stone plunge access',
            detail:
              'Carved raw basalt stone plunge basins maintained precisely at 4°C with continuous pharmaceutical-grade ozone micro-filtration.',
            spec: '4°C Sub-Zero · Basalt Basin',
          },
          {
            title: 'Finnish cedar infrared sauna sessions',
            detail:
              'Sustainably sourced Finnish cedar cabin providing full-spectrum infrared wavelengths up to 70°C for deep cellular detoxification.',
            spec: '70°C Full-Spectrum Cedar',
          },
          {
            title: 'Eucalyptus steam and luxury grooming suite',
            detail:
              'Private rainfall shower suites infused with pure organic eucalyptus oil, plush linen bathrobes, and bespoke botanical amenities.',
            spec: 'Organic Botanical Amenities',
          },
        ],
      },
      {
        category: 'Concierge & Hospitality',
        items: [
          {
            title: 'Direct digital concierge scheduling via WhatsApp',
            detail:
              'Dedicated sanctuary concierge team available to reserve training bays, schedule contrast therapy, and manage private preferences.',
            spec: 'Direct Dedicated Line',
          },
          {
            title: 'Access to Brothers Private Members Lounge',
            detail:
              'An intimate lounge sanctuary designed with bespoke mid-century furnishings, private quiet booths, and curated architectural design literature.',
            spec: 'Quiet Enclave · High Discretion',
          },
          {
            title: 'Cold-pressed elixir and mineral electrolyte bar',
            detail:
              'Freshly prepared restorative post-workout cold-pressed juices, pure coconut water, and Celtic sea salt mineral electrolyte infusions.',
            spec: 'Custom Mineral Hydration',
          },
        ],
      },
    ],
    exclusiveHighlights: [
      {
        title: 'Dedicated acoustic private training bay',
        detail: 'Sound-dampened private suites ensuring complete confidentiality during high-intensity training.',
        spec: 'Sound-Dampened',
      },
      {
        title: '4°C monolithic basalt cold plunge',
        detail: 'Continuous chilled water circulation in natural volcanic stone for rapid nervous system reset.',
        spec: 'Volcanic Basalt',
      },
      {
        title: 'Custom workout towel and locker amenities',
        detail: 'Heated Egyptian cotton towels and private digital lockers with keyless biometric access.',
        spec: 'Heated Linen',
      },
      {
        title: 'Preliminary Brothers DNA™ protocol baseline',
        detail: 'Initial biomechanical and metabolic assessment establishing your personalized training parameters.',
        spec: 'DNA Baseline',
      },
    ],
  },
  {
    id: 'resident',
    name: 'Resident Member',
    arabicName: 'عضو مقيم',
    tagline: 'Elevated Continuum & Priority Sanctuary Allocation',
    cap: 'Capped at 40 Members',
    description:
      'Designed for daily immersion. Guarantees priority allocation during peak dawn and twilight windows, ongoing biomechanical reassessments, and guest privileges for the recovery suite.',
    idealFor: 'Athletes, founders, and leaders requiring flexible peak schedules and continuous performance tracking.',
    accessWindow: 'Extended Priority Access (05:30 – 22:00)',
    valetService: 'Priority express vehicle retrieval at 30B Street entrance',
    progressionMilestone: 'Attained by active members demonstrating consistent sanctuary engagement.',
    pillarBenefits: [
      {
        category: 'Training & Suites',
        items: [
          {
            title: 'Guaranteed peak-hour training bay holds (Dawn & Twilight)',
            detail:
              'Prime 06:00–09:00 and 17:00–20:30 bay reservations held exclusively for Resident tier members with zero crowding guaranteed.',
            spec: 'Priority Bay Allocation',
          },
          {
            title: 'Quarterly 3D biomechanical and postural movement reassessments',
            detail:
              'High-precision movement screening using force plates and optical motion capture to track joint mobility, asymmetries, and power output.',
            spec: 'Force Plate & 3D MoCap',
          },
          {
            title: 'Priority coach matching across Olympic lifting, boxing, and Pilates',
            detail:
              'Direct pairing with senior master practitioners matched to your specific anatomical phase and athletic timeline.',
            spec: 'Senior Specialist Pair',
          },
        ],
      },
      {
        category: 'Recovery & Thermal',
        items: [
          {
            title: 'Extended thermal suite bookings with guest privileges (2/month)',
            detail:
              '60-minute private thermal suite access with the privilege to host an accompanying training partner or guest twice per calendar month.',
            spec: 'Extended 60m + 2 Guest Passes',
          },
          {
            title: 'Pneumatic lymphatic compression boot sessions',
            detail:
              'Medical-grade sequential pneumatic compression accelerating lactic acid clearance and lower extremity venous drainage.',
            spec: 'Clinical Pneumatic Drainage',
          },
          {
            title: 'Percussive therapy & assisted fascial stretching integration',
            detail:
              '15-minute dedicated soft tissue release and assisted PNF stretching administered by certified recovery specialists.',
            spec: 'Theragun Pro & PNF Release',
          },
        ],
      },
      {
        category: 'Concierge & Hospitality',
        items: [
          {
            title: 'Dedicated private permanent locker with laundry service',
            detail:
              'Personal walnut locker reserved year-round, complete with complimentary daily laundering and pressing of your training apparel.',
            spec: 'Permanent Locker & Daily Laundry',
          },
          {
            title: 'Priority invitation to visiting international masterclasses',
            detail:
              'Reserved front-row seating and private clinic appointments with visiting Olympic coaches and biomechanists.',
            spec: 'VIP Masterclass Invitations',
          },
          {
            title: 'Immediate concierge reservation with 2-hour notice window',
            detail:
              'Spontaneous bay booking flexibility allowing same-day reservation with as little as 120 minutes notice.',
            spec: '2-Hour Notice Spontaneity',
          },
        ],
      },
    ],
    exclusiveHighlights: [
      {
        title: 'Guaranteed Dawn/Twilight bay allocation',
        detail: 'Never wait for peak morning or twilight slots. Your suite is reserved automatically.',
        spec: 'Peak Allocation',
      },
      {
        title: 'Quarterly 3D postural reassessment',
        detail: 'Digital skeletal alignment analysis documenting progressive mobility improvements.',
        spec: 'Biomechanical Audit',
      },
      {
        title: 'Permanent private locker & laundry service',
        detail: 'Leave your athletic wardrobe on-site; freshly laundered and waiting in your suite.',
        spec: 'Wardrobe Service',
      },
      {
        title: 'Guest passes for private thermal suite',
        detail: 'Invite colleagues or partners to experience the monolithic plunge and sauna.',
        spec: '2 Guests / Month',
      },
      {
        title: 'Priority access to visiting specialists',
        detail: 'First-look booking windows for visiting European physiotherapists and combat trainers.',
        spec: 'Specialist Priority',
      },
    ],
  },
  {
    id: 'sovereign',
    name: 'Sovereign Circle',
    arabicName: 'دائرة السيادة',
    tagline: 'Absolute Discretion & Unrestricted Sanctuary Immersion',
    cap: 'Strictly Limited to 25 Members',
    description:
      'The highest echelon of Brothers Private World. Complete sanctuary autonomy, dedicated personal performance director, after-hours facility buyout options, and reciprocal global private club privileges.',
    idealFor: 'Public figures, international executives, and family office principals requiring total privacy.',
    accessWindow: '24/7 Unrestricted Sanctuary Access & Private Suite Holds',
    valetService: 'Direct VIP arrival bay & dedicated personal driver coordination',
    progressionMilestone: 'By invitation or executive committee nomination only.',
    pillarBenefits: [
      {
        category: 'Training & Suites',
        items: [
          {
            title: 'Dedicated Personal Performance Director orchestrating all programming',
            detail:
              'A designated sports scientist and master coach who oversees all training, recovery protocols, blood biomarker timing, and travel adaptation.',
            spec: 'Dedicated Lead Sports Scientist',
          },
          {
            title: 'Unrestricted private bay hold with zero booking lead time',
            detail:
              'A private training bay is permanently reserved on standby during your preferred daily window. Walk in anytime without notice.',
            spec: 'Instant Standby Allocation',
          },
          {
            title: 'Exclusive after-hours private sanctuary access for complete discretion',
            detail:
              'Full private facility buyout privileges for nocturnal sessions or private weekend workouts with complete biometric perimeter security.',
            spec: 'Complete Discretion Buyouts',
          },
        ],
      },
      {
        category: 'Recovery & Thermal',
        items: [
          {
            title: 'Private thermal suite reservation with custom temperature calibration',
            detail:
              'The thermal suite is customized to your preferred cold plunge temperature (down to 2°C) and custom essential oil aromatherapy.',
            spec: '2°C–10°C Bespoke Calibration',
          },
          {
            title: 'Continuous biometric HRV & sleep architecture monitoring',
            detail:
              'Integration with your continuous health sensors, reviewed weekly by your performance director to optimize nervous system recovery.',
            spec: 'Continuous Autonomic Tracking',
          },
          {
            title: 'On-demand physiotherapist and sports massage in private suite',
            detail:
              'Licensed sports physiotherapists available for deep tissue structural bodywork inside your private acoustic suite upon demand.',
            spec: 'In-Suite Manual Physiotherapy',
          },
        ],
      },
      {
        category: 'Concierge & Hospitality',
        items: [
          {
            title: 'Reciprocal access to partner private wellness clubs in London, NY, and Zurich',
            detail:
              'Seamless access to premier private athletic sanctuaries in Mayfair London, Manhattan NYC, and Zurich Seefeld when traveling.',
            spec: 'Global Reciprocal Sanctuaries',
          },
          {
            title: 'Private lounge private hosting privileges for personal guests',
            detail:
              'Host private meetings, founders discussions, or recovery sessions for up to 6 invited guests in the Brothers Private Lounge.',
            spec: 'Private Executive Hosting',
          },
          {
            title: 'Personalized nutritional chef meal coordination & hydration delivery',
            detail:
              'Post-session meals crafted by culinary nutrition partners matched to your metabolic rate, waiting warm upon session completion.',
            spec: 'Bespoke Macro Culinary Service',
          },
        ],
      },
    ],
    exclusiveHighlights: [
      {
        title: 'Personal Performance Director assigned',
        detail: 'Single dedicated point of contact orchestrating sports science, coaching, and nutrition.',
        spec: 'Dedicated Scientist',
      },
      {
        title: '24/7 private sanctuary access',
        detail: 'Unrestricted entry day or night via private biometric arrival portal at 30B Street.',
        spec: '24/7 Biometric Access',
      },
      {
        title: 'Reciprocal global partner club access (London, Zurich, NY)',
        detail: 'Maintain your training protocol seamlessly across top tier international financial capitals.',
        spec: 'Global Passport',
      },
      {
        title: 'Private suite after-hours buyouts',
        detail: 'Total exclusivity of the facility for confidential executive or family workout sessions.',
        spec: 'Facility Buyout',
      },
      {
        title: 'Continuous biometric & HRV architecture',
        detail: 'Real-time physiological load management to prevent overtraining and optimize longevity.',
        spec: 'Autonomic HRV Tracking',
      },
    ],
  },
];

interface MemberTiersVisualizationProps {
  onSelectTierForConsultation?: (tierName: string) => void;
  onNavigateToDna?: () => void;
}

export const MemberTiersVisualization: React.FC<MemberTiersVisualizationProps> = ({
  onSelectTierForConsultation,
  onNavigateToDna,
}) => {
  const [activeTierId, setActiveTierId] = useState<'sanctuary' | 'resident' | 'sovereign'>(
    'resident'
  );
  const [viewMode, setViewMode] = useState<'detailed' | 'matrix'>('detailed');
  const [activeTooltip, setActiveTooltip] = useState<{
    id: string;
    title: string;
    detail: string;
    spec: string;
  } | null>(null);

  const currentTier = MEMBER_TIERS.find((t) => t.id === activeTierId) || MEMBER_TIERS[1];

  const handleInquire = (tierName: string) => {
    if (onSelectTierForConsultation) {
      onSelectTierForConsultation(`Membership Inquiry: ${tierName}`);
    }
  };

  // Close tooltip on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTooltip(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B9A17B] mb-2">
          <Crown className="w-3.5 h-3.5 text-[#B9A17B]" />
          <span>BROTHERS PRIVATE WORLD · CLUB PROGRESSION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#F1EEE8] tracking-tight">
          Member Tiers & Privileges
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#969892] leading-relaxed">
          Progression within Brothers is governed by discipline, commitment, and mutual alignment. Discover how our membership tiers scale to mirror your evolving ambition in Dubai.
        </p>

        {/* Interactive Tooltip Usage Hint */}
        <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-mono text-[#B9A17B]/90 bg-[#171917] border border-[#B9A17B]/20 px-3.5 py-1.5">
          <Info className="w-3.5 h-3.5 text-[#B9A17B] shrink-0" />
          <span>Hover or tap any benefit item below to inspect verified sanctuary specifications</span>
        </div>

        {/* View Mode Toggle */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="p-1 bg-[#171917] border border-[#B9A17B]/20 inline-flex">
            <button
              onClick={() => {
                setViewMode('detailed');
                setActiveTooltip(null);
              }}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'detailed'
                  ? 'bg-[#B9A17B] text-[#101110] font-semibold'
                  : 'text-[#969892] hover:text-[#F1EEE8]'
              }`}
            >
              Tier Profiles
            </button>
            <button
              onClick={() => {
                setViewMode('matrix');
                setActiveTooltip(null);
              }}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-[#B9A17B] text-[#101110] font-semibold'
                  : 'text-[#969892] hover:text-[#F1EEE8]'
              }`}
            >
              Privilege Comparison Matrix
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED TIER PROFILE VIEW */}
      {viewMode === 'detailed' && (
        <div className="space-y-10">
          {/* Tier Navigation Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MEMBER_TIERS.map((tier, idx) => {
              const isSelected = activeTierId === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => {
                    setActiveTierId(tier.id);
                    setActiveTooltip(null);
                  }}
                  className={`p-5 text-left border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#B9A17B] bg-[#171917] shadow-[0_0_20px_rgba(185,161,123,0.12)]'
                      : 'border-[#B9A17B]/15 bg-[#101110] hover:border-[#B9A17B]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#B9A17B] uppercase tracking-wider mb-1">
                    <span>Tier 0{idx + 1}</span>
                    <span className="text-[10px] text-[#969892]">{tier.cap}</span>
                  </div>
                  <h3 className="text-xl font-serif text-[#F1EEE8] tracking-wide">
                    {tier.name}
                  </h3>
                  <div className="text-[12px] font-serif text-[#B9A17B]/70 mt-0.5" dir="rtl">
                    {tier.arabicName}
                  </div>
                  <p className="text-xs text-[#969892] mt-2 line-clamp-2 leading-relaxed">
                    {tier.tagline}
                  </p>

                  {/* Active Indicator bar */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B9A17B]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tier Card Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTierId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-[#171917] border border-[#B9A17B]/30 p-6 sm:p-10 shadow-2xl space-y-8 relative"
            >
              {/* Tier Hero Block */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#B9A17B]/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#B9A17B] uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-4 h-4 text-[#B9A17B]" />
                    <span>{currentTier.cap}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif text-[#F1EEE8] tracking-wide">
                    {currentTier.name}
                  </h3>
                  <p className="text-sm text-[#B9A17B] font-serif italic">
                    {currentTier.tagline}
                  </p>
                </div>

                <div className="text-left md:text-right font-mono text-xs text-[#969892] space-y-1">
                  <div>Access: <span className="text-[#F1EEE8]">{currentTier.accessWindow}</span></div>
                  <div>Valet: <span className="text-[#F1EEE8]">Dedicated Reception</span></div>
                  <div className="text-[#B9A17B] text-[11px]">{currentTier.progressionMilestone}</div>
                </div>
              </div>

              {/* Description & Ideal Member Profile */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 bg-[#101110] border border-[#B9A17B]/15 text-xs sm:text-sm">
                <div className="md:col-span-8 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B9A17B] block">
                    Sanctuary Rationale
                  </span>
                  <p className="text-[#F1EEE8] leading-relaxed">{currentTier.description}</p>
                </div>
                <div className="md:col-span-4 space-y-1 border-t md:border-t-0 md:border-l border-[#B9A17B]/15 pt-3 md:pt-0 md:pl-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block">
                    Profile Suitability
                  </span>
                  <p className="text-[#969892] leading-relaxed">{currentTier.idealFor}</p>
                </div>
              </div>

              {/* Three Pillar Breakdown with Interactive Benefit Tooltips */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {currentTier.pillarBenefits.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-[#101110] border border-[#B9A17B]/15 space-y-3"
                  >
                    <div className="text-xs font-mono uppercase tracking-wider text-[#B9A17B] pb-2 border-b border-[#B9A17B]/15 flex items-center justify-between">
                      <span>{pillar.category}</span>
                      <span className="text-[10px] text-[#969892]">0{idx + 1}</span>
                    </div>

                    <ul className="space-y-3 text-xs text-[#969892]">
                      {pillar.items.map((item, itemIdx) => {
                        const tooltipId = `${currentTier.id}-${idx}-${itemIdx}`;
                        const isTooltipActive = activeTooltip?.id === tooltipId;

                        return (
                          <li
                            key={itemIdx}
                            className="relative group/benefit"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                if (isTooltipActive) {
                                  setActiveTooltip(null);
                                } else {
                                  setActiveTooltip({
                                    id: tooltipId,
                                    title: item.title,
                                    detail: item.detail,
                                    spec: item.spec,
                                  });
                                }
                              }}
                              onMouseEnter={() => {
                                setActiveTooltip({
                                  id: tooltipId,
                                  title: item.title,
                                  detail: item.detail,
                                  spec: item.spec,
                                });
                              }}
                              onMouseLeave={() => {
                                // Delayed close or close when leaving
                                setActiveTooltip((current) =>
                                  current?.id === tooltipId ? null : current
                                );
                              }}
                              onFocus={() => {
                                setActiveTooltip({
                                  id: tooltipId,
                                  title: item.title,
                                  detail: item.detail,
                                  spec: item.spec,
                                });
                              }}
                              onBlur={() => {
                                setActiveTooltip((current) =>
                                  current?.id === tooltipId ? null : current
                                );
                              }}
                              aria-haspopup="dialog"
                              aria-expanded={isTooltipActive}
                              className={`w-full text-left flex items-start gap-2.5 p-2 rounded transition-all cursor-pointer ${
                                isTooltipActive
                                  ? 'bg-[#171917] text-[#F1EEE8] ring-1 ring-[#B9A17B]/50'
                                  : 'hover:bg-[#171917]/70 text-[#E0DDD7] hover:text-[#F1EEE8]'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 text-[#B9A17B] shrink-0 mt-0.5" />
                              <div className="flex-1 leading-relaxed text-xs">
                                <span>{item.title}</span>
                              </div>
                              <Info
                                className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors ${
                                  isTooltipActive
                                    ? 'text-[#B9A17B]'
                                    : 'text-[#969892]/40 group-hover/benefit:text-[#B9A17B]'
                                }`}
                              />
                            </button>

                            {/* Floating Rich Tooltip */}
                            <AnimatePresence>
                              {isTooltipActive && (
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                  className="absolute left-0 right-0 sm:left-2 sm:right-auto sm:w-[320px] top-full mt-1.5 z-40 p-4 bg-[#101110] border border-[#B9A17B] shadow-2xl space-y-2 pointer-events-auto"
                                  role="tooltip"
                                >
                                  {/* Tooltip Header */}
                                  <div className="flex items-center justify-between pb-1.5 border-b border-[#B9A17B]/20">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#B9A17B]">
                                      Sanctuary Specification
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveTooltip(null);
                                      }}
                                      className="text-[#969892] hover:text-[#F1EEE8] p-0.5"
                                      aria-label="Close tooltip"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>

                                  {/* Benefit Title & Specification Badge */}
                                  <div>
                                    <div className="text-xs font-serif text-[#F1EEE8] mb-1 font-medium">
                                      {item.title}
                                    </div>
                                    <div className="inline-block text-[10px] font-mono text-[#101110] bg-[#B9A17B] px-2 py-0.5 mb-1.5 font-medium">
                                      {item.spec}
                                    </div>
                                  </div>

                                  {/* Deep Dive Description */}
                                  <p className="text-[11px] text-[#969892] leading-relaxed">
                                    {item.detail}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Hallmark Privileges Pill Bar with Interactive Inspection */}
              <div className="p-5 bg-[#141614] border border-[#B9A17B]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B] block">
                    Hallmark Tier Privileges (Hover or Tap to Inspect)
                  </span>
                  <span className="text-[10px] font-mono text-[#969892]">
                    Exclusive to {currentTier.name}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {currentTier.exclusiveHighlights.map((hl, i) => {
                    const highlightId = `${currentTier.id}-highlight-${i}`;
                    const isHighlightActive = activeTooltip?.id === highlightId;

                    return (
                      <div key={i} className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            if (isHighlightActive) {
                              setActiveTooltip(null);
                            } else {
                              setActiveTooltip({
                                id: highlightId,
                                title: hl.title,
                                detail: hl.detail,
                                spec: hl.spec,
                              });
                            }
                          }}
                          onMouseEnter={() => {
                            setActiveTooltip({
                              id: highlightId,
                              title: hl.title,
                              detail: hl.detail,
                              spec: hl.spec,
                            });
                          }}
                          onMouseLeave={() => {
                            setActiveTooltip((current) =>
                              current?.id === highlightId ? null : current
                            );
                          }}
                          className={`px-3 py-1.5 border text-xs transition-all flex items-center gap-2 cursor-pointer ${
                            isHighlightActive
                              ? 'bg-[#B9A17B] text-[#101110] border-[#B9A17B] font-medium shadow-md'
                              : 'bg-[#101110] border-[#B9A17B]/30 text-[#F1EEE8] hover:border-[#B9A17B]'
                          }`}
                        >
                          <span>✦ {hl.title}</span>
                          <Info className="w-3 h-3 opacity-60" />
                        </button>

                        {/* Floating Tooltip for Hallmark Highlights */}
                        <AnimatePresence>
                          {isHighlightActive && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -4, scale: 0.98 }}
                              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute left-0 bottom-full mb-2 z-40 w-[280px] p-3.5 bg-[#101110] border border-[#B9A17B] shadow-2xl space-y-1.5 pointer-events-auto"
                              role="tooltip"
                            >
                              <div className="flex items-center justify-between pb-1 border-b border-[#B9A17B]/20">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#B9A17B]">
                                  {hl.spec}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTooltip(null);
                                  }}
                                  className="text-[#969892] hover:text-[#F1EEE8] p-0.5"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-[11px] text-[#969892] leading-relaxed">
                                {hl.detail}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Tooltip Drawer for Mobile Accessibility */}
              {activeTooltip && (
                <div className="block sm:hidden p-4 bg-[#101110] border border-[#B9A17B] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#B9A17B] uppercase tracking-wider">
                      {activeTooltip.spec}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTooltip(null)}
                      className="text-[#969892] hover:text-[#F1EEE8]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-serif text-[#F1EEE8] text-sm font-medium">
                    {activeTooltip.title}
                  </div>
                  <p className="text-[11px] text-[#969892] leading-relaxed pt-1">
                    {activeTooltip.detail}
                  </p>
                </div>
              )}

              {/* CTA Strip */}
              <div className="pt-6 border-t border-[#B9A17B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-[#969892]">
                  Admission is subject to screening and capacity caps at 30B Street, Al Wasl.
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleInquire(currentTier.name)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer shadow-lg"
                  >
                    Inquire for {currentTier.name}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* PRIVILEGE COMPARISON MATRIX VIEW */}
      {viewMode === 'matrix' && (
        <div className="bg-[#171917] border border-[#B9A17B]/30 p-6 sm:p-10 shadow-2xl overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Table Header */}
            <div className="grid grid-cols-4 pb-4 border-b border-[#B9A17B]/20 text-xs font-mono uppercase tracking-wider text-[#969892]">
              <div className="text-[#F1EEE8] font-serif text-sm">Privilege Domain</div>
              <div className="text-center text-[#B9A17B]">Sanctuary</div>
              <div className="text-center text-[#B9A17B]">Resident</div>
              <div className="text-center text-[#B9A17B]">Sovereign Circle</div>
            </div>

            {/* Matrix Rows with Hoverable Specifications */}
            <div className="divide-y divide-[#B9A17B]/10 text-xs text-[#969892]">
              {[
                {
                  label: 'Member Capacity Cap',
                  t1: '75 Members',
                  t2: '40 Members',
                  t3: '25 Members Strict',
                  tooltip: 'Strict capacity limits safeguard tranquility, bay availability, and acoustic privacy.',
                },
                {
                  label: '1:1 Private Training Bay Access',
                  t1: 'By advance reservation',
                  t2: 'Guaranteed peak holds',
                  t3: 'Unrestricted on-demand hold',
                  tooltip: 'Private suites with dedicated Eleiko equipment, zero equipment sharing, and custom sound control.',
                },
                {
                  label: 'Reformer Pilates & Boxing Bays',
                  t1: 'Included',
                  t2: 'Included + Micro-groups',
                  t3: 'Private suite reservation',
                  tooltip: 'Custom walnut reformer apparatus and handcrafted oxblood leather strike bags.',
                },
                {
                  label: '4°C Basalt Plunge & Cedar Sauna',
                  t1: 'Post-training sessions',
                  t2: 'Full suite + guest passes',
                  t3: 'Custom thermal calibration',
                  tooltip: 'Sub-zero volcanic stone cold plunge with continuous pharmaceutical ozone micro-filtration.',
                },
                {
                  label: '3D Biomechanical Reassessment',
                  t1: 'Initial onboarding',
                  t2: 'Quarterly tracking',
                  t3: 'Continuous HRV monitoring',
                  tooltip: 'Force plate and optical motion capture tracking joint freedom and power progression.',
                },
                {
                  label: 'Dedicated Coaching Hierarchy',
                  t1: 'Assigned Master Coach',
                  t2: 'Senior Specialist Pair',
                  t3: 'Personal Performance Director',
                  tooltip: 'Elite sports scientists and master practitioners certified across Olympic lifting and biomechanics.',
                },
                {
                  label: 'Private Valet at 30B Street',
                  t1: 'Standard valet',
                  t2: 'Express priority retrieval',
                  t3: 'Dedicated VIP arrival bay',
                  tooltip: 'Private vehicle reception at the 30B Street entrance secluded from Al Wasl thoroughfares.',
                },
                {
                  label: 'Locker & Laundry Suite',
                  t1: 'Daily luxury locker',
                  t2: 'Permanent locker & laundry',
                  t3: 'Bespoke private wardrobing',
                  tooltip: 'Permanent personalized walnut lockers with daily laundering and garment preparation.',
                },
                {
                  label: 'Global Reciprocal Club Access',
                  t1: '—',
                  t2: 'Preferred rates',
                  t3: 'London, Zurich, NY, Tokyo',
                  tooltip: 'Reciprocal privileges at partner private wellness sanctuaries in major international capitals.',
                },
                {
                  label: 'After-Hours Sanctuary Buyout',
                  t1: '—',
                  t2: '—',
                  t3: 'Exclusive private booking',
                  tooltip: 'Full sanctuary private buyout privileges for complete discretion and nocturnal sessions.',
                },
              ].map((row, idx) => {
                const matrixTooltipId = `matrix-row-${idx}`;
                const isRowTooltipActive = activeTooltip?.id === matrixTooltipId;

                return (
                  <div
                    key={idx}
                    className="grid grid-cols-4 py-3.5 items-center hover:bg-[#101110]/60 transition-colors relative"
                  >
                    <div className="text-[#F1EEE8] font-medium pr-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (isRowTooltipActive) {
                            setActiveTooltip(null);
                          } else {
                            setActiveTooltip({
                              id: matrixTooltipId,
                              title: row.label,
                              detail: row.tooltip,
                              spec: 'Domain Detail',
                            });
                          }
                        }}
                        onMouseEnter={() => {
                          setActiveTooltip({
                            id: matrixTooltipId,
                            title: row.label,
                            detail: row.tooltip,
                            spec: 'Domain Detail',
                          });
                        }}
                        onMouseLeave={() => {
                          setActiveTooltip((current) =>
                            current?.id === matrixTooltipId ? null : current
                          );
                        }}
                        className="text-left flex items-center gap-1.5 hover:text-[#B9A17B] transition-colors cursor-pointer group/row"
                      >
                        <span>{row.label}</span>
                        <Info className="w-3 h-3 text-[#969892]/40 group-hover/row:text-[#B9A17B]" />
                      </button>
                    </div>
                    <div className="text-center font-mono text-[11px] text-[#969892]">{row.t1}</div>
                    <div className="text-center font-mono text-[11px] text-[#F1EEE8] font-medium">
                      {row.t2}
                    </div>
                    <div className="text-center font-mono text-[11px] text-[#B9A17B] font-semibold">
                      {row.t3}
                    </div>

                    {/* Matrix Row Tooltip */}
                    <AnimatePresence>
                      {isRowTooltipActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-4 top-full z-40 p-3 bg-[#101110] border border-[#B9A17B] shadow-2xl max-w-sm pointer-events-auto"
                          role="tooltip"
                        >
                          <div className="text-[10px] font-mono text-[#B9A17B] uppercase mb-1">
                            {row.label}
                          </div>
                          <p className="text-[11px] text-[#969892] leading-relaxed">
                            {row.tooltip}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Matrix Action Footer */}
            <div className="grid grid-cols-4 pt-6 border-t border-[#B9A17B]/20">
              <div />
              <div className="text-center px-2">
                <button
                  onClick={() => handleInquire('Sanctuary Member')}
                  className="w-full py-2 bg-[#1B1D1B] border border-[#B9A17B]/30 hover:bg-[#B9A17B] hover:text-[#101110] text-[#F1EEE8] text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Inquire
                </button>
              </div>
              <div className="text-center px-2">
                <button
                  onClick={() => handleInquire('Resident Member')}
                  className="w-full py-2 bg-[#B9A17B] text-[#101110] hover:bg-[#D4C4A8] text-[10px] font-mono uppercase tracking-wider transition-colors font-medium cursor-pointer shadow-md"
                >
                  Inquire
                </button>
              </div>
              <div className="text-center px-2">
                <button
                  onClick={() => handleInquire('Sovereign Circle')}
                  className="w-full py-2 bg-[#101110] border border-[#B9A17B] text-[#B9A17B] hover:bg-[#B9A17B] hover:text-[#101110] text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Inquire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progression Architecture Footer Note */}
      <div className="mt-8 p-6 bg-[#101110] border border-[#B9A17B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#969892]">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-[#F1EEE8] font-serif text-sm">
            Not Certain Which Tier Corresponds to Your Routine?
          </div>
          <p>
            Configure your personalized preliminary profile through Brothers DNA™ to receive an algorithmic tier recommendation.
          </p>
        </div>
        {onNavigateToDna && (
          <button
            onClick={onNavigateToDna}
            className="px-5 py-2.5 bg-[#1B1D1B] border border-[#B9A17B]/40 hover:border-[#B9A17B] text-[#F1EEE8] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B9A17B]" /> Explore Brothers DNA™
          </button>
        )}
      </div>
    </div>
  );
};
