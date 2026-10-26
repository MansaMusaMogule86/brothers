import React, { useState } from 'react';
import { DnaProfile } from '../types';
import { MOCK_DNA_PASSPORT } from '../data/brothersContent';
import { DigitalMemberBadgeOverlay } from './DigitalMemberBadgeOverlay';
import { BiometricPerformanceSection } from './BiometricPerformanceSection';
import { EliteAchievementsSection } from './EliteAchievementsSection';
import { SanctuaryEntryQr } from './SanctuaryEntryQr';
import {
  ShieldCheck,
  Award,
  Calendar,
  Check,
  ArrowRight,
  Sparkles,
  User,
  MapPin,
  Crown,
  Fingerprint,
  Lock,
  QrCode,
  Trophy,
} from 'lucide-react';

interface DnaPassportProps {
  customProfile?: DnaProfile | null;
  onOpenConsultation?: (protocol: string) => void;
}

export const DnaPassportCard: React.FC<DnaPassportProps> = ({ customProfile, onOpenConsultation }) => {
  const profile: DnaProfile = customProfile || {
    id: MOCK_DNA_PASSPORT.id,
    fullName: MOCK_DNA_PASSPORT.fullName,
    ambition: MOCK_DNA_PASSPORT.ambition,
    experienceType: MOCK_DNA_PASSPORT.experienceType,
    frequency: MOCK_DNA_PASSPORT.frequency,
    timeOfDay: MOCK_DNA_PASSPORT.timeOfDay,
    level: MOCK_DNA_PASSPORT.level,
    priority: MOCK_DNA_PASSPORT.priority,
    protocolName: MOCK_DNA_PASSPORT.protocolName,
    protocolCode: MOCK_DNA_PASSPORT.protocolCode,
    suggestedCategories: MOCK_DNA_PASSPORT.suggestedCategories,
    suggestedWeeklyRhythm: MOCK_DNA_PASSPORT.suggestedWeeklyRhythm,
    recommendedCoachFocus: MOCK_DNA_PASSPORT.recommendedCoachFocus,
    createdAt: MOCK_DNA_PASSPORT.createdAt,
    consultationStatus: MOCK_DNA_PASSPORT.consultationStatus,
    biometricHistory: MOCK_DNA_PASSPORT.biometricHistory,
    biometricSummary: MOCK_DNA_PASSPORT.biometricSummary,
    consistencyStats: MOCK_DNA_PASSPORT.consistencyStats,
    achievements: MOCK_DNA_PASSPORT.achievements,
  };

  const [badgeOverlayOpen, setBadgeOverlayOpen] = useState<boolean>(false);

  const initials = profile.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Credential Plaque */}
      <div className="relative bg-gradient-to-b from-[#1E201E] to-[#121312] border border-[#B9A17B]/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Subtle Watermark Monogram */}
        <div className="absolute -top-12 -right-12 w-64 h-64 border border-[#B9A17B]/10 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#B9A17B]/5 rounded-full pointer-events-none" />

        {/* Passport Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#B9A17B]/20 relative z-10">
          <div className="flex items-center gap-4">
            {/* Monogram Seal */}
            <div className="w-16 h-16 rounded-none border-2 border-[#B9A17B] bg-[#101110] flex items-center justify-center font-serif text-xl tracking-widest text-[#B9A17B] shadow-lg shrink-0">
              {initials}
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B]">
                BROTHERS PRIVATE WORLD · DUBAI
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] tracking-wide mt-0.5">
                {profile.fullName}
              </h1>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#969892]">
                <MapPin className="w-3.5 h-3.5 text-[#B9A17B]" />
                <span>30B St, Al Wasl Sanctuary</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[#B9A17B]">{profile.id}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-2 font-mono">
            <div className="text-[10px] uppercase tracking-widest text-[#969892]">PASSPORT STATUS</div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#101110] border border-[#B9A17B]/30 text-xs text-[#B9A17B] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{profile.consultationStatus}</span>
              </div>

              {/* Digital Member Badge Header Trigger */}
              <button
                type="button"
                onClick={() => setBadgeOverlayOpen(true)}
                className="px-3 py-1 bg-[#171917] hover:bg-[#222522] border border-[#B9A17B] text-xs font-mono uppercase tracking-wider text-[#F1EEE8] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm group"
                title="View Encrypted Digital Member Badge"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <Crown className="w-3 h-3 text-[#B9A17B]" />
                <span className="text-[10px] font-semibold text-[#B9A17B] group-hover:text-[#F1EEE8]">
                  MEMBER BADGE
                </span>
                <span className="text-[8px] px-1 bg-[#101110] text-[#969892] border border-[#B9A17B]/30">
                  ENC
                </span>
              </button>

              {/* Physical Gate QR Pass Quick Button */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('sanctuary-qr-pass');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1 bg-[#171917] hover:bg-[#222522] border border-[#B9A17B]/60 text-xs font-mono uppercase tracking-wider text-[#F1EEE8] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm group"
                title="Jump to Physical Sanctuary Gate QR Code"
              >
                <QrCode className="w-3 h-3 text-[#B9A17B]" />
                <span className="text-[10px] font-semibold text-[#B9A17B] group-hover:text-[#F1EEE8]">
                  GATE QR PASS
                </span>
                <span className="text-[8px] px-1 bg-[#101110] text-[#10B981] border border-[#10B981]/30">
                  30B ST
                </span>
              </button>

              {/* Elite Achievements Quick Button */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('elite-achievements-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1 bg-[#171917] hover:bg-[#222522] border border-[#B9A17B]/60 text-xs font-mono uppercase tracking-wider text-[#F1EEE8] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm group"
                title="Jump to Elite Achievements & Milestones"
              >
                <Trophy className="w-3 h-3 text-[#B9A17B]" />
                <span className="text-[10px] font-semibold text-[#B9A17B] group-hover:text-[#F1EEE8]">
                  ELITE HONORS
                </span>
                <span className="text-[8px] px-1 bg-[#101110] text-[#B9A17B] border border-[#B9A17B]/30">
                  {profile.achievements ? profile.achievements.filter(a => a.unlocked).length : 5}
                </span>
              </button>
            </div>
            <div className="text-[11px] text-[#969892]">Issued {profile.createdAt}</div>
          </div>
        </div>

        {/* Digital Member Badge Encrypted Passkey Banner Strip */}
        <div className="my-5 p-4 bg-[#141614] border border-[#B9A17B]/35 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 border border-[#B9A17B]/50 bg-[#0E0F0E] flex items-center justify-center text-[#B9A17B] shrink-0">
              <Fingerprint className="w-5 h-5 text-[#B9A17B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B] font-semibold">
                  DIGITAL MEMBER BADGE · VERIFIED PASSKEY
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                  ACTIVE 2026/27
                </span>
              </div>
              <div className="text-xs font-mono text-[#F1EEE8] flex flex-wrap items-center gap-2 mt-1">
                <span className="text-[#969892]">Encrypted Token:</span>
                <span className="text-[#B9A17B] font-semibold tracking-wider tabular-nums">
                  0x7F9B·C842·E911·DXB·SEC4096
                </span>
                <span className="text-[10px] text-[#969892] hidden sm:inline">· RSA-4096 Sanctuary Protocol</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('sanctuary-qr-pass');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 md:flex-none px-4 py-2.5 bg-[#171917] hover:bg-[#202220] border border-[#B9A17B] text-[#F1EEE8] font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shrink-0"
            >
              <QrCode className="w-3.5 h-3.5 text-[#B9A17B]" />
              <span>Show Gate QR</span>
            </button>

            <button
              type="button"
              onClick={() => setBadgeOverlayOpen(true)}
              className="flex-1 md:flex-none px-5 py-2.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Badge Overlay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Protocol Designation */}
        <div className="py-6 border-b border-[#B9A17B]/20 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
              ASSIGNED BIOMECHANICAL PROTOCOL
            </span>
            <span className="text-xs font-mono text-[#B9A17B]">{profile.protocolCode}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#F1EEE8] tracking-wide">
            {profile.protocolName}
          </h2>
          <p className="text-xs sm:text-sm text-[#969892] mt-2 leading-relaxed max-w-2xl">
            {profile.recommendedCoachFocus}
          </p>
        </div>

        {/* Profile Attributes Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-[#B9A17B]/20 text-xs relative z-10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-1">
              Primary Ambition
            </span>
            <span className="font-serif text-[#F1EEE8] text-sm">{profile.ambition}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-1">
              Experience Format
            </span>
            <span className="font-serif text-[#F1EEE8] text-sm">{profile.experienceType}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-1">
              Weekly Rhythm
            </span>
            <span className="font-serif text-[#F1EEE8] text-sm">{profile.frequency}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-1">
              Sanctuary Window
            </span>
            <span className="font-serif text-[#F1EEE8] text-sm">{profile.timeOfDay.split(' ')[0]}</span>
          </div>
        </div>

        {/* Dynamic Biometric Performance Markers Visualization Section */}
        <BiometricPerformanceSection profile={profile} />

        {/* Elite Achievements & Milestones Progression Tracking Section */}
        <div id="elite-achievements-section">
          <EliteAchievementsSection profile={profile} />
        </div>

        {/* Dynamically Generated Turnstile QR Code Feature for Physical Sanctuary Entry */}
        <div id="sanctuary-qr-pass">
          <SanctuaryEntryQr profile={profile} />
        </div>

        {/* Weekly Architecture */}
        <div className="py-6 border-b border-[#B9A17B]/20 relative z-10">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#B9A17B] mb-3">
            Recommended Weekly Rhythm
          </h3>
          <div className="space-y-2">
            {profile.suggestedWeeklyRhythm.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-[#101110] border border-[#B9A17B]/15 flex items-center justify-between text-xs text-[#F1EEE8]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#B9A17B]">0{index + 1}</span>
                  <span>{item}</span>
                </div>
                <Check className="w-3.5 h-3.5 text-[#B9A17B]" />
              </div>
            ))}
          </div>
        </div>

        {/* Membership Privileges Preview */}
        <div className="py-6 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-[#B9A17B]" />
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
              Sanctuary Privileges & Portal Features
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#969892]">
            {MOCK_DNA_PASSPORT.privileges.map((p, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2.5 bg-[#101110]/50 border border-[#B9A17B]/10">
                <span className="text-[#B9A17B] font-mono">✦</span>
                <span className="text-[#F1EEE8]">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="pt-6 border-t border-[#B9A17B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="text-[11px] text-[#969892]">
            Demonstration prototype credential. Live private member sync available via Brothers Concierge.
          </div>
          {onOpenConsultation && (
            <button
              onClick={() => onOpenConsultation(profile.protocolName)}
              className="px-6 py-3 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              Confirm Coach Appointment <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Digital Member Badge Encrypted Overlay */}
      <DigitalMemberBadgeOverlay
        isOpen={badgeOverlayOpen}
        onClose={() => setBadgeOverlayOpen(false)}
        memberName={profile.fullName}
        memberInitials={initials}
        initialTier="Sovereign Circle"
        passportId={profile.id}
        protocolCode={profile.protocolCode}
      />
    </div>
  );
};
