import React from 'react';
import { BROTHERS_SANCTUARY_INFO } from '../data/brothersContent';
import { ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full bg-[#101110] text-[#F1EEE8] py-16 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block mb-2">
            LEGAL & PRIVACY CHARTER
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F1EEE8] tracking-tight">
            Privacy & Discretion Policy
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-[#969892] leading-relaxed">
            Effective Date: October 2026 · Brothers Boutique Gym, Dubai, United Arab Emirates.
          </p>
        </div>

        {/* Core Principles */}
        <div className="space-y-8 text-xs sm:text-sm text-[#969892] leading-relaxed">
          <section className="p-6 bg-[#1B1D1B] border border-[#B9A17B]/20 space-y-3">
            <h3 className="text-base sm:text-lg font-serif text-[#F1EEE8]">
              01. The Principle of Utmost Discretion
            </h3>
            <p>
              Brothers Boutique Gym operates as a private training sanctuary for public figures, athletes, and executives. Member identities, schedules, biometric records, and training programs are strictly confidential. We never monetize, lease, or share member information with third-party advertisers.
            </p>
          </section>

          <section className="p-6 bg-[#1B1D1B] border border-[#B9A17B]/20 space-y-3">
            <h3 className="text-base sm:text-lg font-serif text-[#F1EEE8]">
              02. Collection of Athletic & Preference Data
            </h3>
            <p>
              Data collected through the Brothers DNA™ configurator or consultation forms is utilized solely to calibrate training intensity, align coach specializations, and schedule recovery suite bookings.
            </p>
          </section>

          <section className="p-6 bg-[#1B1D1B] border border-[#B9A17B]/20 space-y-3">
            <h3 className="text-base sm:text-lg font-serif text-[#F1EEE8]">
              03. Digital Prototype Notice
            </h3>
            <p>
              This digital prototype provides an illustrative experience for Brothers Boutique Gym. Submitted inquiries in this environment are saved locally for demonstration purposes only. Official member contracts and NDA agreements are executed in person at our Dubai sanctuary.
            </p>
          </section>

          <section className="p-6 bg-[#1B1D1B] border border-[#B9A17B]/20 space-y-3">
            <h3 className="text-base sm:text-lg font-serif text-[#F1EEE8]">
              04. Sanctuary Security & Media Photography
            </h3>
            <p>
              To safeguard the sanctity and peace of members, commercial photography, filming, and open audio recording are strictly prohibited inside the training suites, reformer sanctuary, and recovery thermal suites without prior management clearance.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-[#B9A17B]/20 text-xs text-[#969892]">
          Questions regarding data stewardship may be directed to <span className="text-[#B9A17B]">{BROTHERS_SANCTUARY_INFO.email}</span>.
        </div>
      </div>
    </div>
  );
};
