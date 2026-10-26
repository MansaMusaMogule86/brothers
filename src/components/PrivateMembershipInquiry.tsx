import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  Car,
  User,
  Building,
  RefreshCw,
  Award,
} from 'lucide-react';
import { BROTHERS_SANCTUARY_INFO } from '../data/brothersContent';

export interface MembershipInquiryData {
  salutation: string;
  fullName: string;
  cityResidence: string;
  profession: string;
  contactMethod: 'WhatsApp' | 'Phone Call' | 'Discreet Email' | 'Executive Assistant';
  phone: string;
  email: string;
  discretionNotice: boolean;
  interests: string[];
  preferredDays: string;
  preferredTiming: string;
  walkthroughFormat: string;
  valetRequired: boolean;
  notes?: string;
  consent: boolean;
}

interface PrivateMembershipInquiryProps {
  onSuccess?: (inquiry: MembershipInquiryData, dossierId: string) => void;
  onNavigateToDna?: () => void;
  isModal?: boolean;
}

export const PrivateMembershipInquiry: React.FC<PrivateMembershipInquiryProps> = ({
  onSuccess,
  onNavigateToDna,
  isModal = false,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [inquiryData, setInquiryData] = useState<MembershipInquiryData>({
    salutation: 'Mr.',
    fullName: '',
    cityResidence: 'Dubai (DIFC / Downtown)',
    profession: 'Executive / Founder',
    contactMethod: 'WhatsApp',
    phone: '',
    email: '',
    discretionNotice: true,
    interests: ['1:1 Private Strength & Biomechanics', 'Restorative Thermal Suite & Contrast'],
    preferredDays: 'Weekdays (Monday – Friday)',
    preferredTiming: 'Early Dawn (06:00 – 09:00)',
    walkthroughFormat: 'Biomechanical Assessment & Private Tour (45 min)',
    valetRequired: true,
    notes: '',
    consent: false,
  });

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submittedDossierId, setSubmittedDossierId] = useState<string | null>(null);

  // Interest options with luxury specifications
  const INTEREST_OPTIONS = [
    {
      id: 'private-strength',
      title: '1:1 Private Strength & Biomechanics',
      desc: 'Dedicated private bay with Eleiko & custom German-engineered brass hardware.',
      tag: 'Coaching',
    },
    {
      id: 'reformer-pilates',
      title: 'Reformer Pilates Architecture',
      desc: 'Spinal decompression and deep core stability on bespoke walnut & leather reformers.',
      tag: 'Pilates',
    },
    {
      id: 'boxing-conditioning',
      title: 'Boxing & Athletic Conditioning',
      desc: 'High-cadence tactical strike drills, footwork, and handmade oxblood heavy bags.',
      tag: 'Athletic',
    },
    {
      id: 'thermal-recovery',
      title: 'Restorative Thermal Suite & Contrast',
      desc: '4°C monolithic basalt cold plunge basin, Finnish cedar sauna & pneumatic compression.',
      tag: 'Recovery',
    },
    {
      id: 'joint-mobility',
      title: 'Joint Mobility & Kinetic Longevity',
      desc: 'CARs (Controlled Articular Rotations) and loaded ground mobility for articular freedom.',
      tag: 'Mobility',
    },
    {
      id: 'holistic-continuum',
      title: 'Comprehensive Sanctuary Synthesis',
      desc: 'Integrated hybrid protocol orchestrating strength, reformer, and thermal recovery.',
      tag: 'Hybrid',
    },
  ];

  const handleToggleInterest = (title: string) => {
    if (inquiryData.interests.includes(title)) {
      if (inquiryData.interests.length > 1) {
        setInquiryData({
          ...inquiryData,
          interests: inquiryData.interests.filter((i) => i !== title),
        });
      }
    } else {
      setInquiryData({
        ...inquiryData,
        interests: [...inquiryData.interests, title],
      });
    }
  };

  const validateStep = (step: number): boolean => {
    setErrorMsg('');
    if (step === 1) {
      if (!inquiryData.fullName.trim() || inquiryData.fullName.trim().length < 3) {
        setErrorMsg('Please enter your full name for membership records.');
        return false;
      }
    } else if (step === 2) {
      if (!inquiryData.phone.trim() && !inquiryData.email.trim()) {
        setErrorMsg('Please provide either a telephone number or private email address.');
        return false;
      }
      if (inquiryData.contactMethod === 'WhatsApp' || inquiryData.contactMethod === 'Phone Call') {
        if (!inquiryData.phone.trim() || inquiryData.phone.trim().length < 6) {
          setErrorMsg('Please provide a valid contact number.');
          return false;
        }
      }
      if (inquiryData.contactMethod === 'Discreet Email' && !inquiryData.email.includes('@')) {
        setErrorMsg('Please provide a valid private email address.');
        return false;
      }
    } else if (step === 3) {
      if (inquiryData.interests.length === 0) {
        setErrorMsg('Please select at least one area of sanctuary interest.');
        return false;
      }
    } else if (step === 4) {
      // Step 4 timing validation (already defaulted)
    } else if (step === 5) {
      if (!inquiryData.consent) {
        setErrorMsg('Please confirm your consent to be contacted discreetly by Brothers Boutique Gym.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    const dossierId = `BBG-MEM-DXB-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedDossierId(dossierId);
    if (onSuccess) {
      onSuccess(inquiryData, dossierId);
    }
  };

  const handleResetFlow = () => {
    setSubmittedDossierId(null);
    setCurrentStep(1);
    setInquiryData({
      salutation: 'Mr.',
      fullName: '',
      cityResidence: 'Dubai (DIFC / Downtown)',
      profession: 'Executive / Founder',
      contactMethod: 'WhatsApp',
      phone: '',
      email: '',
      discretionNotice: true,
      interests: ['1:1 Private Strength & Biomechanics'],
      preferredDays: 'Weekdays (Monday – Friday)',
      preferredTiming: 'Early Dawn (06:00 – 09:00)',
      walkthroughFormat: 'Biomechanical Assessment & Private Tour (45 min)',
      valetRequired: true,
      notes: '',
      consent: false,
    });
  };

  const stepsList = [
    { num: 1, title: 'Identity', label: 'Candidate Identity' },
    { num: 2, title: 'Discretion', label: 'Private Contact' },
    { num: 3, title: 'Disciplines', label: 'Sanctuary Interests' },
    { num: 4, title: 'Schedule', label: 'Consultation Window' },
    { num: 5, title: 'Dossier', label: 'Review & Submission' },
  ];

  return (
    <div className={`w-full ${isModal ? 'max-w-2xl' : 'max-w-4xl'} mx-auto`}>
      {/* Container Card */}
      <div className="bg-[#171917] border border-[#B9A17B]/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle Luxury Watermark */}
        <div className="absolute -top-16 -right-16 w-64 h-64 border border-[#B9A17B]/10 rounded-full pointer-events-none" />

        {/* Header Kicker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#B9A17B]/20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B9A17B]">
              <Lock className="w-3.5 h-3.5 text-[#B9A17B]" />
              <span>CONFIDENTIAL MEMBERSHIP ADMISSION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] tracking-wide mt-1">
              Private Consultation Inquiry
            </h2>
          </div>
          {!submittedDossierId && (
            <div className="text-left sm:text-right font-mono text-xs text-[#969892]">
              <span className="text-[#B9A17B]">Step 0{currentStep}</span> / 05
            </div>
          )}
        </div>

        {/* Minimal Progress Track (No Pill Badges, Clean Typography) */}
        {!submittedDossierId && (
          <div className="pt-6 pb-8">
            <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono uppercase tracking-wider text-[#969892] mb-3">
              {stepsList.map((s) => (
                <div
                  key={s.num}
                  className={`transition-colors truncate ${
                    s.num === currentStep
                      ? 'text-[#B9A17B] font-semibold'
                      : s.num < currentStep
                      ? 'text-[#F1EEE8]'
                      : 'text-[#969892]/50'
                  }`}
                >
                  <span className="hidden sm:inline">0{s.num}. </span>
                  {s.title}
                </div>
              ))}
            </div>
            <div className="w-full h-[2px] bg-[#101110] overflow-hidden">
              <motion.div
                className="h-full bg-[#B9A17B]"
                initial={{ width: '20%' }}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        )}

        {/* Error Callout */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-950/30 border border-red-500/30 text-xs text-red-200">
            {errorMsg}
          </div>
        )}

        {/* Step Views */}
        <AnimatePresence mode="wait">
          {/* STEP 1: IDENTITY & DISCRETION */}
          {!submittedDossierId && currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B9A17B]">
                  01. CANDIDATE PROFILE
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F1EEE8] mt-1">
                  Primary Identity & Residence
                </h3>
                <p className="text-xs sm:text-sm text-[#969892] mt-1 leading-relaxed">
                  Brothers Boutique Gym curates a tranquil, high-calibre membership. Please introduce yourself.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                <div className="sm:col-span-1">
                  <label className="block text-[#969892] uppercase font-mono tracking-wider text-[10px] mb-1.5">
                    Salutation
                  </label>
                  <select
                    value={inquiryData.salutation}
                    onChange={(e) => setInquiryData({ ...inquiryData, salutation: e.target.value })}
                    className="w-full bg-[#101110] border border-[#B9A17B]/25 px-3 py-2.5 text-xs text-[#F1EEE8] focus:outline-none focus:border-[#B9A17B]"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="H.E.">H.E.</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[#969892] uppercase font-mono tracking-wider text-[10px] mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.fullName}
                    onChange={(e) => setInquiryData({ ...inquiryData, fullName: e.target.value })}
                    placeholder="e.g. Tariq Al-Mansoor"
                    className="w-full bg-[#101110] border border-[#B9A17B]/25 px-4 py-2.5 text-xs text-[#F1EEE8] placeholder-[#969892]/40 focus:outline-none focus:border-[#B9A17B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#969892] uppercase font-mono tracking-wider text-[10px] mb-1.5">
                    Primary Residence / Enclave
                  </label>
                  <select
                    value={inquiryData.cityResidence}
                    onChange={(e) => setInquiryData({ ...inquiryData, cityResidence: e.target.value })}
                    className="w-full bg-[#101110] border border-[#B9A17B]/25 px-3 py-2.5 text-xs text-[#F1EEE8] focus:outline-none focus:border-[#B9A17B]"
                  >
                    <option value="Dubai (DIFC / Downtown)">Dubai (DIFC / Downtown)</option>
                    <option value="Dubai (Palm Jumeirah / Marina)">Dubai (Palm Jumeirah / Marina)</option>
                    <option value="Dubai (Emirates Hills / Jumeirah Golf Estates)">Dubai (Emirates Hills / JGE)</option>
                    <option value="Dubai (Jumeirah / Al Wasl)">Dubai (Jumeirah / Al Wasl)</option>
                    <option value="Abu Dhabi / UAE Other">Abu Dhabi / UAE Other</option>
                    <option value="International Resident">International Resident</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#969892] uppercase font-mono tracking-wider text-[10px] mb-1.5">
                    Vocation / Background (Optional)
                  </label>
                  <select
                    value={inquiryData.profession}
                    onChange={(e) => setInquiryData({ ...inquiryData, profession: e.target.value })}
                    className="w-full bg-[#101110] border border-[#B9A17B]/25 px-3 py-2.5 text-xs text-[#F1EEE8] focus:outline-none focus:border-[#B9A17B]"
                  >
                    <option value="Executive / Founder">Founder / Senior Executive</option>
                    <option value="Professional Athlete">Professional Athlete</option>
                    <option value="Private Investor / Finance">Private Investor / Finance</option>
                    <option value="Creative / Architectural Arts">Creative / Architectural Arts</option>
                    <option value="Family Office Principal">Family Office Principal</option>
                    <option value="Prefer Not to Disclose">Prefer Not to Disclose</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-[#B9A17B]/15 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-7 py-3.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.18em] flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  Proceed to Contact Discretion <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DISCREET COMMUNICATION PATHWAY */}
          {!submittedDossierId && currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B9A17B]">
                  02. SECURE COMMUNICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F1EEE8] mt-1">
                  Preferred Contact Pathway
                </h3>
                <p className="text-xs sm:text-sm text-[#969892] mt-1 leading-relaxed">
                  Specify how our membership director should discreetly initiate your consultation.
                </p>
              </div>

              {/* Contact Method Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    id: 'WhatsApp',
                    label: 'Discreet WhatsApp',
                    desc: 'Encrypted message from Brothers Sanctuary concierge.',
                    icon: MessageCircle,
                  },
                  {
                    id: 'Phone Call',
                    label: 'Direct Phone Call',
                    desc: 'Private verbal briefing with the membership director.',
                    icon: Phone,
                  },
                  {
                    id: 'Discreet Email',
                    label: 'Confidential Email',
                    desc: 'Detailed formal invitation sent to your private inbox.',
                    icon: Mail,
                  },
                  {
                    id: 'Executive Assistant',
                    label: 'Executive Assistant / Liaison',
                    desc: 'Coordination conducted through your office or family liaison.',
                    icon: Building,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = inquiryData.contactMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setInquiryData({
                          ...inquiryData,
                          contactMethod: item.id as any,
                        })
                      }
                      className={`text-left p-4 border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#B9A17B] bg-[#101110] shadow-[0_0_15px_rgba(185,161,123,0.12)]'
                          : 'border-[#B9A17B]/15 bg-[#1B1D1B] hover:border-[#B9A17B]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 text-xs font-serif text-[#F1EEE8]">
                          <Icon className="w-3.5 h-3.5 text-[#B9A17B]" />
                          <span>{item.label}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#B9A17B]" />}
                      </div>
                      <p className="text-[11px] text-[#969892]">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Coordinates Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[#969892] uppercase font-mono tracking-wider text-[10px] mb-1.5">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-[#101110] border border-[#B9A17B]/25 px-4 py-2.5 text-xs text-[#F1EEE8] placeholder-[#969892]/40 focus:outline-none focus:border-[#B9A17B]"
                  />
                </div>

                <div>
                  <label className="block text-[#969892] uppercase font-mono tracking-wider text-[10px] mb-1.5">
                    Private Email Address
                  </label>
                  <input
                    type="email"
                    value={inquiryData.email}
                    onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-[#101110] border border-[#B9A17B]/25 px-4 py-2.5 text-xs text-[#F1EEE8] placeholder-[#969892]/40 focus:outline-none focus:border-[#B9A17B]"
                  />
                </div>
              </div>

              {/* Discretion Checkbox */}
              <div className="p-3.5 bg-[#101110] border border-[#B9A17B]/15">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inquiryData.discretionNotice}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, discretionNotice: e.target.checked })
                    }
                    className="mt-0.5 accent-[#B9A17B]"
                  />
                  <span className="text-[11px] text-[#969892] leading-tight">
                    Strict Discretion Guarantee: When calling or messaging, concierge identifies as "Brothers Club Dubai" without public reference to fitness or commercial facilities.
                  </span>
                </label>
              </div>

              <div className="pt-6 border-t border-[#B9A17B]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 text-[#969892] hover:text-[#F1EEE8] text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-7 py-3.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.18em] flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  Select Sanctuary Disciplines <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SANCTUARY AREAS OF INTEREST */}
          {!submittedDossierId && currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B9A17B]">
                  03. CURATED DISCIPLINES
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F1EEE8] mt-1">
                  Areas of Sanctuary Focus
                </h3>
                <p className="text-xs sm:text-sm text-[#969892] mt-1 leading-relaxed">
                  Select the primary pillars you wish your consultation and private bay allocation to focus on.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {INTEREST_OPTIONS.map((item) => {
                  const isSelected = inquiryData.interests.includes(item.title);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleToggleInterest(item.title)}
                      className={`text-left p-4 border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#B9A17B] bg-[#101110] shadow-[0_0_15px_rgba(185,161,123,0.12)]'
                          : 'border-[#B9A17B]/15 bg-[#1B1D1B] hover:border-[#B9A17B]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-[#B9A17B] uppercase tracking-wider">
                          {item.tag}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#B9A17B] bg-[#B9A17B] text-[#101110]'
                              : 'border-[#969892]/40'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <h4 className="text-sm font-serif text-[#F1EEE8] tracking-wide mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#969892] leading-relaxed">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="text-[11px] text-[#969892] flex items-center gap-2">
                <span>Selected:</span>
                <span className="text-[#F1EEE8] font-medium font-mono">
                  {inquiryData.interests.length} discipline{inquiryData.interests.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="pt-6 border-t border-[#B9A17B]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 text-[#969892] hover:text-[#F1EEE8] text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-7 py-3.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.18em] flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  Set Preferred Time <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONSULTATION WINDOW & ARRIVAL */}
          {!submittedDossierId && currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B9A17B]">
                  04. SANCTUARY TIMING
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F1EEE8] mt-1">
                  Preferred Consultation Window
                </h3>
                <p className="text-xs sm:text-sm text-[#969892] mt-1 leading-relaxed">
                  Designate your availability for the private 45-minute walkthrough and movement assessment at Brothers Private Wellness Club (30B Street, Al Wasl / Jumeirah).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[#969892] uppercase font-mono tracking-wider text-[10px] mb-1.5">
                    Preferred Cadence / Days
                  </label>
                  <select
                    value={inquiryData.preferredDays}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, preferredDays: e.target.value })
                    }
                    className="w-full bg-[#101110] border border-[#B9A17B]/25 px-3 py-2.5 text-xs text-[#F1EEE8] focus:outline-none focus:border-[#B9A17B]"
                  >
                    <option value="Weekdays (Monday – Friday)">Weekdays (Monday – Friday)</option>
                    <option value="Weekend (Saturday – Sunday)">Weekend (Saturday – Sunday)</option>
                    <option value="Flexible / Immediate Availability">Flexible / First Available Slot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#969892] uppercase font-mono tracking-wider text-[10px] mb-1.5">
                    Preferred Time of Day
                  </label>
                  <select
                    value={inquiryData.preferredTiming}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, preferredTiming: e.target.value })
                    }
                    className="w-full bg-[#101110] border border-[#B9A17B]/25 px-3 py-2.5 text-xs text-[#F1EEE8] focus:outline-none focus:border-[#B9A17B]"
                  >
                    <option value="Early Dawn (06:00 – 09:00)">Early Dawn (06:00 – 09:00)</option>
                    <option value="Midday Focus (10:00 – 14:00)">Midday Focus (10:00 – 14:00)</option>
                    <option value="Twilight & Evening (16:00 – 20:30)">Twilight & Evening (16:00 – 20:30)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#969892] uppercase font-mono tracking-wider text-[10px] mb-1.5">
                  Walkthrough & Screening Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'Biomechanical Assessment & Private Tour (45 min)',
                      desc: 'Full postural mobility screening + private tour with Head of Coaching.',
                    },
                    {
                      id: 'Quiet Architectural Walkthrough Only (20 min)',
                      desc: 'Discreet viewing of private bays, reformer studio, and thermal recovery suite.',
                    },
                  ].map((option) => {
                    const isSelected = inquiryData.walkthroughFormat === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setInquiryData({ ...inquiryData, walkthroughFormat: option.id })
                        }
                        className={`text-left p-4 border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#B9A17B] bg-[#101110]'
                            : 'border-[#B9A17B]/15 bg-[#1B1D1B] hover:border-[#B9A17B]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-serif text-[#F1EEE8]">{option.id.split('(')[0]}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#B9A17B]" />}
                        </div>
                        <p className="text-[11px] text-[#969892]">{option.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Private Valet arrival option */}
              <div className="p-3.5 bg-[#101110] border border-[#B9A17B]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-[#B9A17B]" />
                  <div>
                    <div className="text-xs text-[#F1EEE8]">Private Valet Service</div>
                    <div className="text-[10px] text-[#969892]">Reserve dedicated vehicle reception at 30B Street entrance (via Al Badaa' St / Umm Amara St)</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={inquiryData.valetRequired}
                  onChange={(e) =>
                    setInquiryData({ ...inquiryData, valetRequired: e.target.checked })
                  }
                  className="accent-[#B9A17B] w-4 h-4"
                />
              </div>

              <div className="pt-6 border-t border-[#B9A17B]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 text-[#969892] hover:text-[#F1EEE8] text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-7 py-3.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.18em] flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  Review Candidate Dossier <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: DOSSIER REVIEW & SUBMISSION */}
          {!submittedDossierId && currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#B9A17B]">
                  05. CONFIDENTIAL DOSSIER
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F1EEE8] mt-1">
                  Review & Submit Invitation Request
                </h3>
                <p className="text-xs sm:text-sm text-[#969892] mt-1 leading-relaxed">
                  Please review your candidacy specifications prior to transmitting to the Brothers membership committee.
                </p>
              </div>

              {/* Dossier Preview Card */}
              <div className="bg-[#101110] border border-[#B9A17B]/30 p-5 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#B9A17B]/15">
                  <span className="font-mono text-[#B9A17B] uppercase tracking-wider text-[10px]">
                    Candidate Record
                  </span>
                  <span className="text-[#969892] font-mono">BROTHERS WORLD DXB</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-[#969892] block font-mono">Full Name</span>
                    <span className="text-[#F1EEE8] font-serif text-sm">
                      {inquiryData.salutation} {inquiryData.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#969892] block font-mono">Residence</span>
                    <span className="text-[#F1EEE8]">{inquiryData.cityResidence}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#969892] block font-mono">Communication</span>
                    <span className="text-[#F1EEE8]">
                      {inquiryData.contactMethod} ({inquiryData.phone || inquiryData.email})
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#B9A17B]/10">
                  <span className="text-[10px] text-[#969892] block font-mono mb-1.5">
                    Disciplines of Interest
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {inquiryData.interests.map((int, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#1B1D1B] border border-[#B9A17B]/20 text-[#F1EEE8] text-[11px]"
                      >
                        {int}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#B9A17B]/10">
                  <div>
                    <span className="text-[10px] text-[#969892] block font-mono">Target Window</span>
                    <span className="text-[#F1EEE8]">{inquiryData.preferredTiming}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#969892] block font-mono">Consultation Format</span>
                    <span className="text-[#F1EEE8]">{inquiryData.walkthroughFormat}</span>
                  </div>
                </div>
              </div>

              {/* Consent Box */}
              <div className="p-4 bg-[#101110] border border-[#B9A17B]/20 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inquiryData.consent}
                    onChange={(e) => setInquiryData({ ...inquiryData, consent: e.target.checked })}
                    className="mt-0.5 accent-[#B9A17B] w-4 h-4 shrink-0"
                  />
                  <span className="text-[11px] text-[#969892] leading-relaxed">
                    I confirm that the details provided are accurate and authorize the membership director of Brothers Boutique Gym to initiate discreet private communication. I acknowledge this submission constitutes an inquiry for membership consultation.
                  </span>
                </label>
              </div>

              <div className="pt-6 border-t border-[#B9A17B]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 text-[#969892] hover:text-[#F1EEE8] text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-4 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-colors cursor-pointer shadow-xl"
                >
                  <Lock className="w-4 h-4" /> Transmit Consultation Inquiry
                </button>
              </div>
            </motion.div>
          )}

          {/* CONFIRMATION / ISSUED DOSSIER STATE */}
          {submittedDossierId && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="py-6 space-y-8 text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-[#B9A17B]/20">
                <div className="w-16 h-16 rounded-full border-2 border-[#B9A17B] bg-[#101110] flex items-center justify-center text-[#B9A17B] shrink-0 shadow-lg">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B]">
                    ADMISSION DOSSIER ISSUED · PROTOTYPE DEMO
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] tracking-wide mt-1">
                    Inquiry Received, {inquiryData.salutation} {inquiryData.fullName.split(' ')[0]}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1.5 text-xs text-[#969892] font-mono">
                    <span className="text-[#B9A17B]">Dossier Ref: {submittedDossierId}</span>
                    <span aria-hidden="true">·</span>
                    <span>30B Street, Al Wasl / Jumeirah Sanctuary</span>
                  </div>
                </div>
              </div>

              {/* Next Steps Guidance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#101110] border border-[#B9A17B]/15 space-y-2">
                  <div className="text-[#B9A17B] font-mono font-medium">01. Review Window</div>
                  <p className="text-[#969892] leading-relaxed">
                    Our membership director evaluates bay capacity and coach allocation for your requested disciplines.
                  </p>
                </div>
                <div className="p-4 bg-[#101110] border border-[#B9A17B]/15 space-y-2">
                  <div className="text-[#B9A17B] font-mono font-medium">02. Discreet Outreach</div>
                  <p className="text-[#969892] leading-relaxed">
                    You will receive direct contact via <span className="text-[#F1EEE8]">{inquiryData.contactMethod}</span> to finalize your appointment time.
                  </p>
                </div>
                <div className="p-4 bg-[#101110] border border-[#B9A17B]/15 space-y-2">
                  <div className="text-[#B9A17B] font-mono font-medium">03. Valet Reception</div>
                  <p className="text-[#969892] leading-relaxed">
                    Private valet reception confirmed at our 30B Street entrance with dedicated acoustic consultation suite.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#B9A17B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleResetFlow}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#969892] hover:text-[#F1EEE8] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Submit Another Inquiry
                </button>

                {onNavigateToDna && (
                  <button
                    type="button"
                    onClick={onNavigateToDna}
                    className="px-6 py-3 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#101110]" /> Configure Brothers DNA™ Protocol
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
