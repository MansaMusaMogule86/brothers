import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Copy,
  Check,
  Sparkles,
  QrCode,
  Radio,
  X,
  RefreshCw,
  Crown,
  ChevronRight,
  Fingerprint,
  Cpu,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export type MemberTierLevel = 'Sanctuary Member' | 'Resident Member' | 'Sovereign Circle';

interface DigitalMemberBadgeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  memberName?: string;
  memberInitials?: string;
  initialTier?: MemberTierLevel;
  passportId?: string;
  protocolCode?: string;
}

export const DigitalMemberBadgeOverlay: React.FC<DigitalMemberBadgeOverlayProps> = ({
  isOpen,
  onClose,
  memberName = 'Tariq Al-Maktoum',
  memberInitials = 'TA',
  initialTier = 'Sovereign Circle',
  passportId = 'BBG-DXB-9842',
  protocolCode = 'DNA-PR-STR-04',
}) => {
  const [selectedTier, setSelectedTier] = useState<MemberTierLevel>(initialTier);
  const [isRevealed, setIsRevealed] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRehashing, setIsRehashing] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [rawHash, setRawHash] = useState<string>('0x7F9B·C842·E911·DXB·SEC4096');
  const [activeTab, setActiveTab] = useState<'badge' | 'security' | 'privileges'>('badge');

  // Tier metadata
  const tierConfig: Record<
    MemberTierLevel,
    {
      tierCode: string;
      arabicTitle: string;
      clearanceLevel: string;
      bayAllocation: string;
      nfcFrequency: string;
      encryptionStandard: string;
      accentBg: string;
      statusPill: string;
    }
  > = {
    'Sanctuary Member': {
      tierCode: 'TIER-I / SANCTUARY',
      arabicTitle: 'عضو الملاذ الخاص',
      clearanceLevel: 'Sanctuary Floor & Reformer Bay',
      bayAllocation: 'Allocated Bay 02 & Thermal Suite',
      nfcFrequency: '13.56 MHz Standard Mifare DESFire',
      encryptionStandard: 'AES-128 GCM Encrypted',
      accentBg: 'from-[#171917] via-[#121312] to-[#0D0E0D]',
      statusPill: 'ACTIVE · SANCTUARY PASS',
    },
    'Resident Member': {
      tierCode: 'TIER-II / RESIDENT',
      arabicTitle: 'عضو مقيم معتمد',
      clearanceLevel: 'Priority Peak Bay Holds & Walnut Locker',
      bayAllocation: 'Dedicated Bay 03 & Private Suite',
      nfcFrequency: '13.56 MHz High-Entropy Cryptotag',
      encryptionStandard: 'AES-256 GCM Hardware-Bound',
      accentBg: 'from-[#1B1D1B] via-[#141614] to-[#0F100F]',
      statusPill: 'VERIFIED · RESIDENT STATUS',
    },
    'Sovereign Circle': {
      tierCode: 'TIER-III / SOVEREIGN',
      arabicTitle: 'دائرة السيادة الحصرية',
      clearanceLevel: 'Unrestricted 24/7 Biometric Sanctuary Access',
      bayAllocation: 'Executive Bay 04 & Monolithic Plunge VIP',
      nfcFrequency: 'Multi-Spectrum 865-868 MHz Ultra-Secure',
      encryptionStandard: 'RSA-4096 Quantum-Resistant Keypair',
      accentBg: 'from-[#222421] via-[#181A18] to-[#101110]',
      statusPill: 'SOVEREIGN CIRCLE · DIPLOMATIC CLEARANCE',
    },
  };

  const currentTierData = tierConfig[selectedTier];

  // Dubai Real-Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Dubai is UTC+4
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(`${now.toLocaleTimeString('en-GB', options)} GST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy to clipboard
  const handleCopyId = () => {
    const fullEncryptedId = `BBG-KEY::${passportId}::${selectedTier.toUpperCase()}::${rawHash}`;
    navigator.clipboard.writeText(fullEncryptedId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Simulate Re-hashing / Quantum regeneration
  const handleRehash = () => {
    if (isRehashing) return;
    setIsRehashing(true);
    const chars = '0123456789ABCDEF';
    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      const randomSegment1 = Array.from({ length: 4 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('');
      const randomSegment2 = Array.from({ length: 4 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('');
      const randomSegment3 = Array.from({ length: 4 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('');
      setRawHash(`0x${randomSegment1}·${randomSegment2}·${randomSegment3}·DXB·SEC4096`);

      if (ticks >= 7) {
        clearInterval(interval);
        setIsRehashing(false);
      }
    }, 90);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop with heavy blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A0B0A]/85 backdrop-blur-md transition-all cursor-pointer"
        />

        {/* Modal Plaque / HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#121312] border border-[#B9A17B]/40 shadow-[0_20px_80px_rgba(0,0,0,0.85)] z-10 text-[#F1EEE8] overflow-hidden my-auto"
        >
          {/* Subtle Guilloché & Metallic Trim Accents */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#B9A17B] to-transparent opacity-80" />
          <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full border border-[#B9A17B]/15 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full border border-[#B9A17B]/10 pointer-events-none" />

          {/* Top Bar Navigation */}
          <div className="p-4 sm:p-6 border-b border-[#B9A17B]/20 flex items-center justify-between relative z-10 bg-[#151715]/70">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-none border border-[#B9A17B] bg-[#101110] flex items-center justify-center text-[#B9A17B] font-serif text-xs">
                BB
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block">
                  DIGITAL MEMBER BADGE · VERIFIED PASSKEY
                </span>
                <span className="text-xs text-[#969892]">Brothers Private Wellness Club · Dubai</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#969892] hover:text-[#F1EEE8] hover:bg-[#1B1D1B] border border-transparent hover:border-[#B9A17B]/30 transition-all cursor-pointer"
              aria-label="Close Digital Badge Overlay"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tier Switcher Navigation */}
          <div className="px-4 sm:px-6 pt-4 pb-2 bg-[#121312] border-b border-[#B9A17B]/15 flex items-center justify-between gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] shrink-0">
              Select Tier:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {(['Sanctuary Member', 'Resident Member', 'Sovereign Circle'] as MemberTierLevel[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedTier === tier
                      ? 'bg-[#B9A17B] text-[#101110] border-[#B9A17B] font-semibold'
                      : 'bg-[#181A18] text-[#969892] border-[#B9A17B]/20 hover:text-[#F1EEE8]'
                  }`}
                >
                  {tier.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Main Badge Body */}
          <div className="p-4 sm:p-8 space-y-6 relative z-10">
            {/* Holographic Badge Card Plaque */}
            <div
              className={`p-6 sm:p-8 bg-gradient-to-br ${currentTierData.accentBg} border border-[#B9A17B]/50 relative shadow-2xl transition-all duration-300 overflow-hidden`}
            >
              {/* Gold Security Shimmer Stripe */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#B9A17B]/20 via-transparent to-transparent pointer-events-none" />

              {/* Status & Clearance Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#B9A17B]/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]" />
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
                      MEMBERSHIP STATUS
                    </div>
                    <div className="text-sm font-semibold tracking-wide text-[#F1EEE8] font-serif">
                      {currentTierData.statusPill}
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] text-[#969892] uppercase tracking-wider block">
                    DUBAI TIME (GST)
                  </span>
                  <span className="text-xs text-[#B9A17B] font-medium tabular-nums">
                    {currentTime || '08:42:15 GST'}
                  </span>
                </div>
              </div>

              {/* Member & Protocol Identification */}
              <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#B9A17B]/20">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#B9A17B]">
                    AUTHORIZED MEMBER
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#F1EEE8] tracking-wide">
                    {memberName}
                  </h3>
                  <div className="text-xs font-serif text-[#B9A17B]/80" dir="rtl">
                    {currentTierData.arabicTitle}
                  </div>
                </div>

                {/* Monogram Seal with Crown */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-2 border-[#B9A17B] bg-[#101110] flex flex-col items-center justify-center text-[#B9A17B] shrink-0 shadow-lg">
                  <Crown className="w-4 h-4 mb-0.5 text-[#B9A17B]" />
                  <span className="font-serif text-lg tracking-widest font-semibold">{memberInitials}</span>
                  <span className="text-[8px] font-mono uppercase text-[#969892] mt-0.5">DUBAI</span>
                </div>
              </div>

              {/* UNIQUE ENCRYPTED ID SECTION */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-[#B9A17B]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B] font-medium">
                      UNIQUE ENCRYPTED PASSKEY ID
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsRevealed(!isRevealed)}
                      className="text-[10px] font-mono text-[#969892] hover:text-[#F1EEE8] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {isRevealed ? (
                        <>
                          <Lock className="w-3 h-3 text-[#B9A17B]" /> Mask
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3 h-3 text-[#B9A17B]" /> Reveal
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleRehash}
                      disabled={isRehashing}
                      className="text-[10px] font-mono text-[#969892] hover:text-[#B9A17B] flex items-center gap-1 transition-colors cursor-pointer"
                      title="Simulate re-encryption pulse"
                    >
                      <RefreshCw className={`w-3 h-3 ${isRehashing ? 'animate-spin text-[#B9A17B]' : ''}`} />
                      Re-Hash
                    </button>
                  </div>
                </div>

                {/* Encrypted Hash Plaque */}
                <div className="p-4 bg-[#0E0F0E] border border-[#B9A17B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#969892] flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-[#B9A17B]" />
                      <span>{currentTierData.encryptionStandard}</span>
                    </div>
                    <div className="font-mono text-sm sm:text-base text-[#F1EEE8] tracking-widest font-semibold tabular-nums select-all">
                      {isRevealed ? rawHash : '0x••••·••••·••••·DXB·SEC4096'}
                    </div>
                    <div className="text-[10px] font-mono text-[#B9A17B]/80">
                      ID: {passportId} · PROTOCOL: {protocolCode}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyId}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                      copied
                        ? 'bg-[#10B981] text-[#101110] border-[#10B981] font-semibold'
                        : 'bg-[#1A1C1A] hover:bg-[#222522] text-[#F1EEE8] border-[#B9A17B]/30 hover:border-[#B9A17B]'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#B9A17B]" />
                        <span>COPY ENCRYPTED ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Hardware & Access Clearance Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-[#111211] border border-[#B9A17B]/15 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block">
                      Physical Clearance & Bay
                    </span>
                    <span className="text-[#F1EEE8] font-medium block">
                      {currentTierData.bayAllocation}
                    </span>
                    <span className="text-[10px] text-[#B9A17B] font-mono block">
                      {currentTierData.clearanceLevel}
                    </span>
                  </div>

                  <div className="p-3 bg-[#111211] border border-[#B9A17B]/15 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block">
                      NFC / Contactless Protocol
                    </span>
                    <span className="text-[#F1EEE8] font-mono text-xs block">
                      {currentTierData.nfcFrequency}
                    </span>
                    <span className="text-[10px] text-[#10B981] font-mono flex items-center gap-1">
                      <Radio className="w-3 h-3 animate-pulse" /> Live Sanctuary Biometric Sync
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Guarantee Kicker */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#161816] border border-[#B9A17B]/20 text-xs">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#B9A17B] shrink-0" />
                <span className="text-[#969892] leading-relaxed">
                  Encrypted tokens are securely cryptographically signed for access at 30B Street Sanctuary, Al Wasl.
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#B9A17B] uppercase tracking-widest shrink-0">
                VERIFIED STATUS
              </div>
            </div>
          </div>

          {/* Footer Action Strip */}
          <div className="p-4 sm:p-6 border-t border-[#B9A17B]/20 bg-[#151715]/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-[#969892]">
              Digital credential authorized for Brothers Private World members.
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-mono text-xs uppercase tracking-[0.15em] font-semibold transition-all cursor-pointer shadow-md"
              >
                Return to Passport
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
