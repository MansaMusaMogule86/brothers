export type PageId =
  | 'home'
  | 'experiences'
  | 'private-training'
  | 'pilates'
  | 'boxing'
  | 'movement'
  | 'recovery'
  | 'dna'
  | 'passport'
  | 'brothers-day'
  | 'membership'
  | 'consultation'
  | 'contact'
  | 'privacy';

export type Ambition = 'Perform' | 'Transform' | 'Recover' | 'Balance';
export type ExperienceType = 'Private coaching' | 'Small group training' | 'Wellness and recovery' | 'A combination';
export type Frequency = '2-3 Sessions / Week' | '4-5 Sessions / Week' | 'Daily Immersion';
export type TimeOfDay = 'Early Dawn (06:00 - 09:00)' | 'Midday Focus (10:00 - 14:00)' | 'Twilight & Evening (16:00 - 21:00)';
export type Level = 'Foundation' | 'Intermediate' | 'Elite Athletic';
export type Priority = 'Strength' | 'Mobility' | 'Endurance' | 'Consistency' | 'Recovery';

export interface BiometricDataPoint {
  date: string;
  dayLabel: string;
  restingHeartRate: number; // bpm
  recoveryEfficiency: number; // percentage
  hrvRmssd: number; // ms
  sleepScore: number; // percentage
  readinessCategory: 'Optimal' | 'Elevated' | 'Restorative';
}

export interface BiometricSummary {
  currentRHR: number;
  rhrDelta: string;
  currentRecovery: number;
  recoveryDelta: string;
  currentHRV: number;
  hrvDelta: string;
  sleepQuality: number;
  overallStatus: 'Optimal Physiological Adaptation' | 'Peak Readiness' | 'Restorative Phase';
  lastSynchronized: string;
  deviceSource: string;
}

export type AchievementCategory = 'Consistency' | 'Biomechanical' | 'Sanctuary Privileges' | 'Mastery';
export type AchievementTier = 'Platinum' | 'Gold' | 'Titanium' | 'Obsidian';

export interface EliteMilestone {
  id: string;
  title: string;
  category: AchievementCategory;
  tier: AchievementTier;
  requirement: string;
  description: string;
  unlocked: boolean;
  unlockedDate?: string;
  progressCurrent: number;
  progressTarget: number;
  metricLabel: string;
  coachVerification?: string;
  exclusivePrivilegeUnlocked?: string;
  cryptographicHash?: string;
  iconName: 'trophy' | 'flame' | 'shield' | 'zap' | 'crown' | 'sparkles' | 'target' | 'heart' | 'compass' | 'award';
}

export interface ConsistencyStats {
  totalSessionsCompleted: number;
  consecutiveWeeksActive: number;
  adherencePercentage: number;
  currentStreakDays: number;
  currentMilestoneLevel: string;
  nextMilestoneThreshold: number;
  sanctuaryCheckInRank: string;
}

export interface DnaProfile {
  id: string;
  fullName: string;
  ambition: Ambition;
  experienceType: ExperienceType;
  frequency: Frequency;
  timeOfDay: TimeOfDay;
  level: Level;
  priority: Priority;
  protocolName: string;
  protocolCode: string;
  suggestedCategories: string[];
  suggestedWeeklyRhythm: string[];
  recommendedCoachFocus: string;
  createdAt: string;
  consultationStatus: 'Pending Review' | 'Consultation Scheduled' | 'Active Passport';
  biometricHistory?: BiometricDataPoint[];
  biometricSummary?: BiometricSummary;
  achievements?: EliteMilestone[];
  consistencyStats?: ConsistencyStats;
}

export interface ItineraryItem {
  id: string;
  time: string;
  duration: string;
  title: string;
  category: 'Training' | 'Pilates' | 'Boxing' | 'Recovery' | 'Rest';
  location: string;
  description: string;
}

export interface ConsultationRequest {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: 'WhatsApp' | 'Phone Call' | 'Discreet Email';
  experienceInterest: string;
  preferredTiming: string;
  notes?: string;
  consent: boolean;
}

export interface ExperienceDetail {
  id: string;
  pageId: PageId;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string;
  whoItSuits: string[];
  whatItInvolves: string[];
  keyHighlights: { label: string; value: string }[];
  sanctuaryFeature: string;
  rhythmRecommendation: string;
}
