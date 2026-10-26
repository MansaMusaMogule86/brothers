import React, { useState, useMemo, useRef } from 'react';
import { DnaProfile, EliteMilestone, AchievementCategory, Frequency } from '../types';
import {
  Trophy,
  Flame,
  ShieldCheck,
  Shield,
  Zap,
  Crown,
  Sparkles,
  Target,
  Heart,
  Compass,
  Lock,
  CheckCircle2,
  Calendar,
  TrendingUp,
  X,
  Copy,
  Check,
  Volume2,
  Activity,
  Plus,
  Award,
  ChevronRight,
  Filter
} from 'lucide-react';

interface EliteAchievementsSectionProps {
  profile: DnaProfile;
}

export const EliteAchievementsSection: React.FC<EliteAchievementsSectionProps> = ({ profile }) => {
  // Local state for interactive gamified progression
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'All'>('All');
  const [selectedMilestone, setSelectedMilestone] = useState<EliteMilestone | null>(null);
  const [simulatedSessionsAdded, setSimulatedSessionsAdded] = useState<number>(0);
  const [activeFrequencyFilter, setActiveFrequencyFilter] = useState<Frequency>(profile.frequency);
  const [showCelebrationToast, setShowCelebrationToast] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Base consistency stats with dynamic simulated attendance added
  const stats = useMemo(() => {
    const baseStats = profile.consistencyStats || {
      totalSessionsCompleted: 68,
      consecutiveWeeksActive: 14,
      adherencePercentage: 97.4,
      currentStreakDays: 18,
      currentMilestoneLevel: 'Centurion Tier II · Sovereign Fellow',
      nextMilestoneThreshold: 100,
      sanctuaryCheckInRank: 'Top 3% Consistency Sanctuary Wide',
    };

    const total = baseStats.totalSessionsCompleted + simulatedSessionsAdded;
    const streak = baseStats.currentStreakDays + simulatedSessionsAdded;
    const adherence = Math.min(99.8, Number((baseStats.adherencePercentage + (simulatedSessionsAdded * 0.2)).toFixed(1)));

    return {
      ...baseStats,
      totalSessionsCompleted: total,
      currentStreakDays: streak,
      adherencePercentage: adherence,
    };
  }, [profile.consistencyStats, simulatedSessionsAdded]);

  // Dynamic milestones with real-time recalculation based on session progress
  const milestones: EliteMilestone[] = useMemo(() => {
    const baseList = profile.achievements || [];
    return baseList.map((m) => {
      // Dynamic update based on current total sessions
      if (m.id === 'centurion-discipline') {
        const unlocked = stats.totalSessionsCompleted >= 50;
        return {
          ...m,
          unlocked,
          progressCurrent: stats.totalSessionsCompleted,
          metricLabel: `${stats.totalSessionsCompleted} Sessions Logged`,
        };
      }
      if (m.id === 'millennium-vanguard') {
        const unlocked = stats.totalSessionsCompleted >= 100;
        return {
          ...m,
          unlocked,
          unlockedDate: unlocked ? 'Today (Unlocked via Simulation)' : undefined,
          progressCurrent: stats.totalSessionsCompleted,
          metricLabel: unlocked ? '100 Sessions Achieved' : `${100 - stats.totalSessionsCompleted} Sessions Remaining`,
        };
      }
      if (m.id === 'annual-sanctuary-laureate') {
        const unlocked = stats.totalSessionsCompleted >= 150;
        return {
          ...m,
          unlocked,
          progressCurrent: stats.totalSessionsCompleted,
          metricLabel: `${150 - stats.totalSessionsCompleted} Sessions Remaining`,
        };
      }
      return m;
    });
  }, [profile.achievements, stats.totalSessionsCompleted]);

  // Audio synthesizer for luxury celebration chime
  const playMilestoneFanfare = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Elegant triad arpeggio (C#5 -> F#5 -> G#5 -> C#6)
      const notes = [554.37, 739.99, 830.61, 1108.73];
      notes.forEach((freq, idx) => {
        const now = ctx.currentTime + idx * 0.12;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.14, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.85);
      });
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  // Simulate logging a session
  const handleLogSimulatedSession = () => {
    const nextCount = stats.totalSessionsCompleted + 1;
    setSimulatedSessionsAdded((prev) => prev + 1);

    if (nextCount === 100) {
      setShowCelebrationToast('THE MILLENNIUM VANGUARD UNLOCKED! (100 Sessions Landmark)');
      playMilestoneFanfare();
    } else {
      setShowCelebrationToast(`Training Session Logged at 30B Sanctuary! (Session #${nextCount})`);
      playMilestoneFanfare();
    }

    setTimeout(() => {
      setShowCelebrationToast(null);
    }, 4500);
  };

  const filteredMilestones = useMemo(() => {
    if (selectedCategory === 'All') return milestones;
    return milestones.filter((m) => m.category === selectedCategory);
  }, [milestones, selectedCategory]);

  const unlockedCount = useMemo(() => {
    return milestones.filter((m) => m.unlocked).length;
  }, [milestones]);

  const nextThreshold = stats.nextMilestoneThreshold || 100;
  const progressToNext = Math.min(100, Math.round((stats.totalSessionsCompleted / nextThreshold) * 100));

  const renderIcon = (name: string, className: string = 'w-5 h-5') => {
    switch (name) {
      case 'award': return <Award className={className} />;
      case 'trophy': return <Trophy className={className} />;
      case 'flame': return <Flame className={className} />;
      case 'shield': return <ShieldCheck className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'crown': return <Crown className={className} />;
      case 'sparkles': return <Sparkles className={className} />;
      case 'target': return <Target className={className} />;
      case 'heart': return <Heart className={className} />;
      case 'compass': return <Compass className={className} />;
      default: return <Award className={className} />;
    }
  };

  const getTierBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'Gold':
        return 'border-[#B9A17B] text-[#B9A17B] bg-[#B9A17B]/10';
      case 'Platinum':
        return 'border-[#E5E7EB]/60 text-[#F1EEE8] bg-[#F1EEE8]/10';
      case 'Titanium':
        return 'border-[#94A3B8] text-[#CBD5E1] bg-[#475569]/20';
      case 'Obsidian':
        return 'border-[#10B981]/50 text-[#10B981] bg-[#10B981]/10';
      default:
        return 'border-[#B9A17B] text-[#B9A17B] bg-[#B9A17B]/10';
    }
  };

  return (
    <div className="py-6 border-b border-[#B9A17B]/20 relative z-10">
      {/* Toast Notification */}
      {showCelebrationToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#161816] border-2 border-[#B9A17B] p-4 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-300 max-w-md">
          <div className="w-10 h-10 bg-[#B9A17B] text-[#101110] flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#B9A17B] font-bold">
              SANCTUARY MILESTONE EVENT
            </div>
            <div className="text-xs font-serif text-[#F1EEE8] font-semibold mt-0.5">
              {showCelebrationToast}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowCelebrationToast(null)}
            className="text-[#969892] hover:text-[#F1EEE8] ml-auto p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] font-semibold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#B9A17B]" />
              ELITE ACHIEVEMENTS & MILESTONE REGISTRY
            </span>
            <span className="px-2 py-0.5 bg-[#B9A17B]/10 text-[#B9A17B] border border-[#B9A17B]/30 text-[9px] font-mono">
              GAMIFIED LUXURY
            </span>
          </div>
          <p className="text-xs text-[#969892] mt-1">
            Biomechanical honors and private sanctuary milestones authenticated by Brothers Dubai master coaches.
          </p>
        </div>

        {/* Milestone Ratio Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="px-3 py-1.5 bg-[#101110] border border-[#B9A17B]/30 font-mono text-xs text-[#F1EEE8] flex items-center gap-2">
            <span className="text-[#969892]">Honors Unlocked:</span>
            <span className="text-[#B9A17B] font-bold tabular-nums">
              {unlockedCount} / {milestones.length}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogSimulatedSession}
            className="px-3.5 py-1.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shrink-0"
            title="Simulate Check-In at 30B Sanctuary"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Check-In</span>
          </button>
        </div>
      </div>

      {/* Consistency Statistics & Progression Plaque */}
      <div className="bg-[#121312] border border-[#B9A17B]/35 p-5 sm:p-6 mb-6 relative overflow-hidden">
        {/* Subtle Watermark Medallion */}
        <div className="absolute -top-10 -right-10 w-48 h-48 border border-[#B9A17B]/10 rounded-full pointer-events-none" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-3.5 bg-[#0D0E0D] border border-[#B9A17B]/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892]">
                Verified Sessions
              </span>
              <Activity className="w-3.5 h-3.5 text-[#B9A17B]" />
            </div>
            <div className="text-2xl font-serif text-[#F1EEE8] tabular-nums">
              {stats.totalSessionsCompleted}
            </div>
            <div className="text-[10px] font-mono text-[#10B981] mt-0.5 flex items-center gap-1">
              <span>+100% Verified at 30B St</span>
            </div>
          </div>

          <div className="p-3.5 bg-[#0D0E0D] border border-[#B9A17B]/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892]">
                Unbroken Streak
              </span>
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
            </div>
            <div className="text-2xl font-serif text-[#F1EEE8] tabular-nums">
              {stats.consecutiveWeeksActive} <span className="text-xs font-mono text-[#969892]">Weeks</span>
            </div>
            <div className="text-[10px] font-mono text-[#B9A17B] mt-0.5">
              {stats.currentStreakDays} Consecutive Days
            </div>
          </div>

          <div className="p-3.5 bg-[#0D0E0D] border border-[#B9A17B]/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892]">
                Adherence Rate
              </span>
              <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
            </div>
            <div className="text-2xl font-serif text-[#F1EEE8] tabular-nums">
              {stats.adherencePercentage}%
            </div>
            <div className="text-[10px] font-mono text-[#969892] mt-0.5">
              Quarterly Target Compliant
            </div>
          </div>

          <div className="p-3.5 bg-[#0D0E0D] border border-[#B9A17B]/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892]">
                Sanctuary Standing
              </span>
              <Crown className="w-3.5 h-3.5 text-[#B9A17B]" />
            </div>
            <div className="text-sm font-serif text-[#F1EEE8] truncate mt-1">
              {stats.currentMilestoneLevel}
            </div>
            <div className="text-[10px] font-mono text-[#B9A17B] mt-0.5">
              {stats.sanctuaryCheckInRank}
            </div>
          </div>
        </div>

        {/* Milestone Progression Bar */}
        <div className="bg-[#0A0B0A] border border-[#B9A17B]/20 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B9A17B] font-semibold">
                ROAD TO LANDMARK 100 · THE MILLENNIUM VANGUARD
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#B9A17B]/15 text-[#B9A17B]">
                TIER MILESTONE
              </span>
            </div>
            <div className="text-xs font-mono text-[#F1EEE8]">
              <span className="text-[#B9A17B] font-bold tabular-nums">{stats.totalSessionsCompleted}</span>
              <span className="text-[#969892]"> / {nextThreshold} Sessions ({progressToNext}%)</span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-[#171917] border border-[#B9A17B]/30 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8E7958] via-[#B9A17B] to-[#E3D7C3] transition-all duration-700 ease-out"
              style={{ width: `${progressToNext}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#969892] mt-2">
            <span>Current: 50 Session Centurion (Unlocked)</span>
            <span className="text-[#B9A17B] font-semibold">
              {Math.max(0, nextThreshold - stats.totalSessionsCompleted)} Sessions Until Titanium Key Unlocked
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#969892] mr-2">
            <Filter className="w-3 h-3 text-[#B9A17B]" />
            <span>Filter:</span>
          </div>
          {(['All', 'Consistency', 'Biomechanical', 'Mastery', 'Sanctuary Privileges'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#B9A17B] text-[#101110] font-bold'
                  : 'bg-[#101110] text-[#969892] hover:text-[#F1EEE8] border border-[#B9A17B]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-[10px] font-mono text-[#969892]">
          Tap any plaque to view coach verification & unlocked privilege.
        </div>
      </div>

      {/* Milestones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMilestones.map((m) => {
          const isUnlocked = m.unlocked;
          const tierStyle = getTierBadgeStyle(m.tier);

          return (
            <div
              key={m.id}
              onClick={() => setSelectedMilestone(m)}
              className={`group p-4 bg-[#101110] border transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                isUnlocked
                  ? 'border-[#B9A17B]/40 hover:border-[#B9A17B] hover:shadow-[0_0_20px_rgba(185,161,123,0.15)]'
                  : 'border-[#B9A17B]/15 hover:border-[#B9A17B]/30 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Corner Viewfinder Accent */}
              {isUnlocked && (
                <>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#B9A17B]" />
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#B9A17B]" />
                </>
              )}

              <div>
                {/* Header Row: Tier & Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 border ${tierStyle}`}>
                    {m.tier} TIER
                  </span>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono text-[#10B981] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>UNLOCKED</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono text-[#969892]">
                      <Lock className="w-3 h-3" />
                      <span>IN PROGRESS</span>
                    </span>
                  )}
                </div>

                {/* Plaque Medallion Emblem */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-11 h-11 border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                      isUnlocked
                        ? 'border-[#B9A17B] bg-[#171917] text-[#B9A17B] shadow-sm'
                        : 'border-[#333] bg-[#0E0F0E] text-[#666]'
                    }`}
                  >
                    {renderIcon(m.iconName, 'w-5 h-5')}
                  </div>

                  <div>
                    <h4 className="text-sm font-serif text-[#F1EEE8] group-hover:text-[#B9A17B] transition-colors leading-tight">
                      {m.title}
                    </h4>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#969892]">
                      {m.category}
                    </span>
                  </div>
                </div>

                {/* Requirement & Description */}
                <p className="text-xs text-[#969892] line-clamp-2 leading-relaxed mb-3">
                  {m.requirement}
                </p>
              </div>

              {/* Progress Bar / Unlocked Stamp */}
              <div className="pt-3 border-t border-[#B9A17B]/15">
                {isUnlocked ? (
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#969892]">Authenticated:</span>
                    <span className="text-[#B9A17B] font-semibold">{m.unlockedDate || 'Active'}</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#969892] mb-1">
                      <span>Progression</span>
                      <span className="text-[#B9A17B] font-bold">
                        {Math.round((m.progressCurrent / m.progressTarget) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-[#1A1C1A] overflow-hidden">
                      <div
                        className="h-full bg-[#B9A17B]"
                        style={{ width: `${Math.min(100, (m.progressCurrent / m.progressTarget) * 100)}%` }}
                      />
                    </div>
                    <div className="text-[9px] font-mono text-[#969892] mt-1 text-right">
                      {m.metricLabel}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED MILESTONE INSPECT MODAL */}
      {selectedMilestone && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0A0B0A]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-lg bg-[#141614] border-2 border-[#B9A17B] p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-4 right-4 text-[#969892] hover:text-[#B9A17B] transition-colors cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-5 pb-4 border-b border-[#B9A17B]/25">
              <div className="w-14 h-14 border-2 border-[#B9A17B] bg-[#101110] flex items-center justify-center text-[#B9A17B] shrink-0 shadow-lg">
                {renderIcon(selectedMilestone.iconName, 'w-7 h-7')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#B9A17B] font-bold">
                    {selectedMilestone.tier} TIER HONOR
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#101110] text-[#969892] border border-[#B9A17B]/20">
                    {selectedMilestone.category}
                  </span>
                </div>
                <h3 className="text-xl font-serif text-[#F1EEE8] mt-0.5">
                  {selectedMilestone.title}
                </h3>
              </div>
            </div>

            {/* Description & Requirement */}
            <div className="space-y-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-1">
                  Biomechanical Requirement
                </span>
                <p className="text-xs text-[#F1EEE8] font-mono bg-[#0D0E0D] p-3 border border-[#B9A17B]/15">
                  {selectedMilestone.requirement}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-1">
                  Sanctuary Dossier Notes
                </span>
                <p className="text-xs text-[#969892] leading-relaxed">
                  {selectedMilestone.description}
                </p>
              </div>

              {/* Exclusive Privilege Unlocked */}
              {selectedMilestone.exclusivePrivilegeUnlocked && (
                <div className="p-3.5 bg-[#B9A17B]/10 border border-[#B9A17B]/40">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#B9A17B] font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Exclusive Sanctuary Privilege Unlocked</span>
                  </div>
                  <div className="text-xs font-serif text-[#F1EEE8]">
                    {selectedMilestone.exclusivePrivilegeUnlocked}
                  </div>
                </div>
              )}

              {/* Coach Sign-off & Cryptographic Stamp */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-2.5 bg-[#0D0E0D] border border-[#B9A17B]/15">
                  <span className="text-[9px] font-mono uppercase text-[#969892] block mb-0.5">
                    Coach Verification
                  </span>
                  <span className="font-serif text-[#F1EEE8] text-xs">
                    {selectedMilestone.coachVerification || 'Master Coach Vance'}
                  </span>
                </div>

                <div className="p-2.5 bg-[#0D0E0D] border border-[#B9A17B]/15">
                  <span className="text-[9px] font-mono uppercase text-[#969892] block mb-0.5">
                    Authentication Hash
                  </span>
                  <span className="font-mono text-[#B9A17B] text-[10px] tracking-wider truncate block">
                    {selectedMilestone.cryptographicHash || 'BBG-ACH-VERIFIED'}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#B9A17B]/20">
              <button
                type="button"
                onClick={() => {
                  if (selectedMilestone.cryptographicHash) {
                    navigator.clipboard.writeText(selectedMilestone.cryptographicHash);
                    setCopiedHash(true);
                    setTimeout(() => setCopiedHash(false), 2000);
                  }
                }}
                className="px-3 py-2 bg-[#171917] hover:bg-[#202220] border border-[#B9A17B]/40 text-[#F1EEE8] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="text-[#10B981]">Hash Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#B9A17B]" />
                    <span>Copy Verification Hash</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSelectedMilestone(null)}
                className="px-5 py-2 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Close Plaque
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
