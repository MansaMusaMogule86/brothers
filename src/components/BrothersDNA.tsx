import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ambition, ExperienceType, Frequency, TimeOfDay, Level, Priority, DnaProfile } from '../types';
import { generateDefaultBiometrics, generateAchievementsForFrequency } from '../data/brothersContent';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

interface BrothersDNAProps {
  onComplete: (profile: DnaProfile) => void;
  onOpenConsultation: (protocolName: string) => void;
  onNavigateToPassport?: () => void;
}

export const BrothersDNA: React.FC<BrothersDNAProps> = ({
  onComplete,
  onOpenConsultation,
  onNavigateToPassport,
}) => {
  const [step, setStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>('');
  const [ambition, setAmbition] = useState<Ambition>('Perform');
  const [experienceType, setExperienceType] = useState<ExperienceType>('A combination');
  const [frequency, setFrequency] = useState<Frequency>('4-5 Sessions / Week');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('Early Dawn (06:00 - 09:00)');
  const [level, setLevel] = useState<Level>('Intermediate');
  const [priority, setPriority] = useState<Priority>('Strength');
  const [generatedProfile, setGeneratedProfile] = useState<DnaProfile | null>(null);

  // Generate deterministic, bespoke protocol recommendation based on selections
  const generateProtocol = () => {
    let protocolName = '';
    let protocolCode = '';
    let categories: string[] = [];
    let weeklyRhythm: string[] = [];
    let coachFocus = '';

    if (ambition === 'Perform') {
      if (priority === 'Strength') {
        protocolName = 'THE APEX ATHLETIC PROTOCOL';
        protocolCode = 'BBG-DXB-APX-01';
        categories = ['Private Strength Coaching', 'Boxing Padwork', 'Sub-Zero Contrast Plunge'];
        weeklyRhythm = [
          'Day 1: Structural Lower Body Posterior Chain',
          'Day 2: Upper Body Rotational Power & Plyometrics',
          'Day 3: Thermal Infrared Sauna & 4°C Monolithic Plunge',
          'Day 4: Tactical Boxing Heavy Bag & Cadence Agility',
          'Day 5: Active Fascial Mobility & Rest',
        ];
        coachFocus = 'Biomechanical strength specialist with Olympic lifting and power cadence mastery.';
      } else if (priority === 'Endurance') {
        protocolName = 'THE KINETIC THRESHOLD PROTOCOL';
        protocolCode = 'BBG-DXB-KNT-02';
        categories = ['Boxing & Conditioning', 'Reformer Core Cadence', 'Cardiovascular Threshold'];
        weeklyRhythm = [
          'Day 1: Boxing Tactical Sparring Drills & Agility',
          'Day 2: High-Cadence Reformer Carriage Resistance',
          'Day 3: Contrast Hydrotherapy & Lymphatic Drainage',
          'Day 4: Anaerobic Interval Conditioning',
          'Day 5: Restorative Spinal Mobilization',
        ];
        coachFocus = 'Cardiopulmonary conditioning lead with combat athletics specialization.';
      } else {
        protocolName = 'THE METABOLIC PRECISION PROTOCOL';
        protocolCode = 'BBG-DXB-MTB-03';
        categories = ['Private Training', 'Reformer Alignment', 'Thermal Recovery'];
        weeklyRhythm = [
          'Day 1: Full Body Functional Hypertrophy',
          'Day 2: Reformer Decompression & Glute Medius Stability',
          'Day 3: Sub-Zero Plunge & Pneumatic Compression',
          'Day 4: Eccentric Cadence Strength',
        ];
        coachFocus = 'Functional hypertrophy practitioner specializing in lean body recomposition.';
      }
    } else if (ambition === 'Transform') {
      protocolName = 'THE STRUCTURAL METAMORPHOSIS PROTOCOL';
      protocolCode = 'BBG-DXB-STR-04';
      categories = ['1-on-1 Progressive Overload', 'Reformer Core Architecture', 'Restorative Contrast'];
      weeklyRhythm = [
        'Day 1: Posterior Chain & Core Bracing Foundation',
        'Day 2: Reformer Spinal Alignment & Dynamic Carriage Glide',
        'Day 3: Guided Infrared Recovery & Fascial Release',
        'Day 4: Upper Body Postural Architecture & Deltoid Sculpt',
        'Day 5: 4°C Monolithic Stone Plunge Session',
      ];
      coachFocus = 'Senior corrective exercise specialist & hypertrophy coach.';
    } else if (ambition === 'Recover') {
      protocolName = 'THE PARASYMPATHETIC RESET PROTOCOL';
      protocolCode = 'BBG-DXB-RST-05';
      categories = ['Thermal Contrast Therapy', 'Restorative Movement & CARs', 'Infrared Cedar Suite'];
      weeklyRhythm = [
        'Day 1: Guided Joint Mobilization & Thoracic Spine Freedom',
        'Day 2: Nordic Contrast Immersion (Infrared + 4°C Plunge)',
        'Day 3: Low-Tension Reformer Spinal Decompression',
        'Day 4: Deep Tissue Percussive Therapy & Electrolyte Hydration',
        'Day 5: Breathwork & Lymphatic Reset',
      ];
      coachFocus = 'Physiotherapy & recovery sciences director.';
    } else {
      protocolName = 'THE HARMONIC EQUILIBRIUM PROTOCOL';
      protocolCode = 'BBG-DXB-HMN-06';
      categories = ['Reformer Pilates', 'Bespoke Strength', 'Contrast Therapy'];
      weeklyRhythm = [
        'Day 1: Classical Reformer Pilates Flow',
        'Day 2: Balanced Full-Body Biomechanical Strength',
        'Day 3: Infrared Detoxification & Cold Plunge',
        'Day 4: Dynamic Joint Mobility & Breath Flow',
      ];
      coachFocus = 'Holistic movement architect & classical Pilates mentor.';
    }

    const newProfile: DnaProfile = {
      id: `BBG-DXB-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: fullName.trim() || 'Private Member',
      ambition,
      experienceType,
      frequency,
      timeOfDay,
      level,
      priority,
      protocolName,
      protocolCode,
      suggestedCategories: categories,
      suggestedWeeklyRhythm: weeklyRhythm,
      recommendedCoachFocus: coachFocus,
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      consultationStatus: 'Pending Review',
      ...generateDefaultBiometrics(ambition, level),
      ...generateAchievementsForFrequency(frequency, level),
    };

    setGeneratedProfile(newProfile);
    setStep(5);
    onComplete(newProfile);
  };

  const ambitions: { value: Ambition; subtitle: string; desc: string }[] = [
    { value: 'Perform', subtitle: 'Peak Athletic Capacity', desc: 'Uncompromising strength, speed, power output, and elite physiological conditioning.' },
    { value: 'Transform', subtitle: 'Body Architecture', desc: 'Meticulous structural recomposition, lean muscle development, and posture refinement.' },
    { value: 'Recover', subtitle: 'Nervous System Reset', desc: 'Contrast therapy, chronic fatigue alleviation, and deep cellular restorative protocols.' },
    { value: 'Balance', subtitle: 'Sustainable Vitality', desc: 'Harmonious integration of joint longevity, mindful mobility, and foundational strength.' },
  ];

  const experienceTypes: { value: ExperienceType; desc: string }[] = [
    { value: 'Private coaching', desc: '1:1 absolute undivided coach focus in an acoustically isolated private bay.' },
    { value: 'Small group training', desc: 'Capped at 4 members. High camaraderie with precise individual feedback.' },
    { value: 'Wellness and recovery', desc: 'Dedicated focus on the thermal suites, sub-zero plunge, and restorative mobility.' },
    { value: 'A combination', desc: 'A holistic synthesis across strength coaching, reformer Pilates, and contrast therapy.' },
  ];

  const priorities: { value: Priority; desc: string }[] = [
    { value: 'Strength', desc: 'Progressive overload, skeletal density, and force production.' },
    { value: 'Mobility', desc: 'Active joint range of motion, scapular freedom, and spine flexibility.' },
    { value: 'Endurance', desc: 'Anaerobic threshold, cardiovascular output, and cadence resilience.' },
    { value: 'Consistency', desc: 'Building an unshakeable, frictionless weekly sanctuary habit.' },
    { value: 'Recovery', desc: 'Lowering sympathetic tone, muscle repair, and optimal sleep architecture.' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] mb-2">
          SIGNATURE INNOVATION · CONFIGURATOR
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F1EEE8] tracking-tight">
          BROTHERS DNA™
        </h1>
        <p className="mt-3 text-sm md:text-base text-[#969892] max-w-xl mx-auto">
          YOUR BODY. YOUR AMBITION. YOUR PROTOCOL.
        </p>
      </div>

      {/* Progress Track */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs font-mono text-[#969892] uppercase tracking-wider mb-2">
            <span>Step {step} of 4</span>
            <span>
              {step === 1 && 'Ambition'}
              {step === 2 && 'Experience'}
              {step === 3 && 'Rhythm & Schedule'}
              {step === 4 && 'Primary Focus'}
            </span>
          </div>
          <div className="w-full h-[2px] bg-[#1B1D1B] overflow-hidden">
            <motion.div
              className="h-full bg-[#B9A17B]"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      )}

      {/* Configurator Card */}
      <div className="bg-[#1B1D1B] border border-[#B9A17B]/20 p-6 sm:p-10 shadow-2xl relative">
        <AnimatePresence mode="wait">
          {/* STEP 1: AMBITION */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B9A17B] font-mono">01. Principle Direction</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] mt-1">Choose Your Ambition</h2>
                <p className="text-sm text-[#969892] mt-1">Select the single defining physiological outcome you demand from your sanctuary time.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {ambitions.map((item) => {
                  const isSelected = ambition === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setAmbition(item.value)}
                      className={`text-left p-5 border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#B9A17B] bg-[#101110] shadow-[0_0_20px_rgba(185,161,123,0.12)]'
                          : 'border-[#B9A17B]/15 bg-[#1B1D1B] hover:border-[#B9A17B]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-lg text-[#F1EEE8] tracking-wide">{item.value}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#B9A17B]" />}
                      </div>
                      <div className="text-xs text-[#B9A17B] mb-1 font-medium">{item.subtitle}</div>
                      <p className="text-xs text-[#969892] leading-relaxed">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-6 border-t border-[#B9A17B]/15">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: EXPERIENCE */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B9A17B] font-mono">02. Format & Environment</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] mt-1">Choose Your Experience</h2>
                <p className="text-sm text-[#969892] mt-1">Define your preferred coaching dynamic inside the Brothers sanctuary.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {experienceTypes.map((item) => {
                  const isSelected = experienceType === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setExperienceType(item.value)}
                      className={`text-left p-5 border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#B9A17B] bg-[#101110] shadow-[0_0_20px_rgba(185,161,123,0.12)]'
                          : 'border-[#B9A17B]/15 bg-[#1B1D1B] hover:border-[#B9A17B]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-base text-[#F1EEE8] tracking-wide">{item.value}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#B9A17B]" />}
                      </div>
                      <p className="text-xs text-[#969892] leading-relaxed">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#B9A17B]/15">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-[#969892] hover:text-[#F1EEE8] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: ROUTINE & TIMING */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B9A17B] font-mono">03. Weekly Rhythm</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] mt-1">Understand Your Routine</h2>
                <p className="text-sm text-[#969892] mt-1">Configure your weekly cadence, preferred window, and baseline experience.</p>
              </div>

              <div className="space-y-6 pt-2">
                {/* Frequency */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.15em] text-[#969892] mb-2">
                    Preferred Weekly Frequency
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['2-3 Sessions / Week', '4-5 Sessions / Week', 'Daily Immersion'] as Frequency[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFrequency(f)}
                        className={`py-3 px-4 text-xs font-medium border text-center transition-all cursor-pointer ${
                          frequency === f
                            ? 'border-[#B9A17B] bg-[#101110] text-[#F1EEE8]'
                            : 'border-[#B9A17B]/15 text-[#969892] hover:border-[#B9A17B]/40'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time of Day */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.15em] text-[#969892] mb-2">
                    Ideal Sanctuary Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(
                      [
                        'Early Dawn (06:00 - 09:00)',
                        'Midday Focus (10:00 - 14:00)',
                        'Twilight & Evening (16:00 - 21:00)',
                      ] as TimeOfDay[]
                    ).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeOfDay(t)}
                        className={`py-3 px-3 text-xs border text-center transition-all cursor-pointer ${
                          timeOfDay === t
                            ? 'border-[#B9A17B] bg-[#101110] text-[#F1EEE8]'
                            : 'border-[#B9A17B]/15 text-[#969892] hover:border-[#B9A17B]/40'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.15em] text-[#969892] mb-2">
                    Current Experience Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['Foundation', 'Intermediate', 'Elite Athletic'] as Level[]).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLevel(l)}
                        className={`py-3 px-4 text-xs border text-center transition-all cursor-pointer ${
                          level === l
                            ? 'border-[#B9A17B] bg-[#101110] text-[#F1EEE8]'
                            : 'border-[#B9A17B]/15 text-[#969892] hover:border-[#B9A17B]/40'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#B9A17B]/15">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-[#969892] hover:text-[#F1EEE8] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PRIORITY & PROTOCOL SYNTHESIS */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B9A17B] font-mono">04. Singular Priority</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] mt-1">Define Your Priority</h2>
                <p className="text-sm text-[#969892] mt-1">Which biomechanical or systemic outcome takes precedence in your first 90 days?</p>
              </div>

              {/* Optional Name for bespoke passport generation */}
              <div className="bg-[#101110] p-4 border border-[#B9A17B]/20">
                <label className="block text-xs font-mono uppercase tracking-[0.15em] text-[#B9A17B] mb-2">
                  Member Identifier (Optional For Passport)
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name or initials (e.g. Tariq A.)"
                  className="w-full bg-[#1B1D1B] border border-[#B9A17B]/25 px-4 py-2.5 text-sm text-[#F1EEE8] placeholder-[#969892]/60 focus:outline-none focus:border-[#B9A17B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {priorities.map((item) => {
                  const isSelected = priority === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setPriority(item.value)}
                      className={`text-left p-4 border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#B9A17B] bg-[#101110]'
                          : 'border-[#B9A17B]/15 bg-[#1B1D1B] hover:border-[#B9A17B]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-base text-[#F1EEE8]">{item.value}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#B9A17B]" />}
                      </div>
                      <p className="text-xs text-[#969892]">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#B9A17B]/15">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-[#969892] hover:text-[#F1EEE8] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={generateProtocol}
                  className="px-6 py-3 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-[#101110]" /> Generate Brothers DNA Passport
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: GENERATED DNA PASSPORT RESULT */}
          {step === 5 && generatedProfile && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Header Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#B9A17B]/20">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#B9A17B] uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-4 h-4 text-[#B9A17B]" />
                    <span>BROTHERS DNA™ PASSPORT</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] mt-1 tracking-wide">
                    {generatedProfile.protocolName}
                  </h2>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-[#969892]">
                  <div className="text-[#B9A17B]">{generatedProfile.protocolCode}</div>
                  <div>Issued: {generatedProfile.createdAt}</div>
                </div>
              </div>

              {/* Configuration Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#101110] border border-[#B9A17B]/15">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#969892] block">Ambition</span>
                  <span className="text-sm font-medium text-[#F1EEE8]">{generatedProfile.ambition}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#969892] block">Frequency</span>
                  <span className="text-sm font-medium text-[#F1EEE8]">{generatedProfile.frequency}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#969892] block">Primary Focus</span>
                  <span className="text-sm font-medium text-[#F1EEE8]">{generatedProfile.priority}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#969892] block">Window</span>
                  <span className="text-sm font-medium text-[#F1EEE8]">{generatedProfile.timeOfDay.split(' ')[0]}</span>
                </div>
              </div>

              {/* Suggested Weekly Rhythm */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-[0.2em] text-[#B9A17B] mb-3">
                  Tailored Weekly Architecture
                </h3>
                <div className="space-y-2">
                  {generatedProfile.suggestedWeeklyRhythm.map((line, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#101110]/60 border border-[#B9A17B]/10 flex items-start gap-3 text-xs sm:text-sm text-[#F1EEE8]"
                    >
                      <span className="text-[#B9A17B] font-mono font-medium">0{idx + 1}</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Focus */}
              <div className="p-4 border border-[#B9A17B]/20 bg-[#101110]">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B] block mb-1">
                  Matched Coaching Specialization
                </span>
                <p className="text-xs sm:text-sm text-[#F1EEE8] leading-relaxed">
                  {generatedProfile.recommendedCoachFocus}
                </p>
              </div>

              {/* Regulatory Notice (As required by brief) */}
              <div className="text-[11px] text-[#969892] leading-relaxed border-l-2 border-[#B9A17B]/30 pl-3">
                Notice: The Brothers DNA™ Protocol is a preliminary athletic and lifestyle preference profile designed to align your goals with Brothers sanctuary facilities. It does not constitute medical diagnosis or formal rehabilitation advice. In-person biomechanical assessment is conducted upon arrival.
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#B9A17B]/20">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#969892] hover:text-[#F1EEE8] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reconfigure Protocol
                </button>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {onNavigateToPassport && (
                    <button
                      onClick={() => {
                        onComplete(generatedProfile);
                        onNavigateToPassport();
                      }}
                      className="w-full sm:w-auto px-5 py-3 bg-[#171917] hover:bg-[#202220] border border-[#B9A17B] text-[#F1EEE8] font-medium text-xs uppercase tracking-[0.15em] transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>View Passport & Badge</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B9A17B]" />
                    </button>
                  )}
                  <button
                    onClick={() => onOpenConsultation(generatedProfile.protocolName)}
                    className="w-full sm:w-auto px-6 py-3 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.15em] transition-colors cursor-pointer"
                  >
                    Request Coach Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
