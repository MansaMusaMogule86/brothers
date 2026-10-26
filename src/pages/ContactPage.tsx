import React from 'react';
import { BROTHERS_SANCTUARY_INFO } from '../data/brothersContent';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Car, Compass } from 'lucide-react';

interface ContactPageProps {
  onOpenConsultation: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="w-full bg-[#101110] text-[#F1EEE8] py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block mb-2">
            SANCTUARY ACCESS · JUMEIRAH / AL WASL · DUBAI, UAE
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-[#F1EEE8]">
            Location & Private Access
          </h1>
          <p className="mt-4 text-base text-[#969892] leading-relaxed">
            Positioned discreetly within the prestigious residential enclave of Al Wasl / Jumeirah, Dubai. Accessible exclusively by prior member appointment and confirmed consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#1B1D1B] border border-[#B9A17B]/25 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
                  PHYSICAL ADDRESS
                </span>
                <h3 className="text-xl font-serif text-[#F1EEE8] mt-1">
                  Brothers Private Wellness Club
                </h3>
                <div className="text-[13px] font-serif text-[#B9A17B] mt-0.5" dir="rtl">
                  دبي ، دبي
                </div>
                <p className="text-xs sm:text-sm text-[#969892] mt-2 leading-relaxed">
                  {BROTHERS_SANCTUARY_INFO.address}
                </p>
                <div className="text-[11px] font-mono text-[#B9A17B] mt-1">
                  Via Al Badaa' St, Umm Amara St &middot; 30B Street
                </div>
              </div>

              <div className="pt-4 border-t border-[#B9A17B]/15 space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B9A17B]" />
                  <span className="text-[#F1EEE8]">{BROTHERS_SANCTUARY_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B9A17B]" />
                  <span className="text-[#F1EEE8]">{BROTHERS_SANCTUARY_INFO.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-[#B9A17B]" />
                  <span className="text-[#F1EEE8]">Private Valet Parking at 30B Street Entrance</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#B9A17B]/15">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
                >
                  Schedule Private Visit
                </button>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 bg-[#1B1D1B] border border-[#B9A17B]/20">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B] block mb-3">
                SANCTUARY HOURS
              </span>
              <div className="space-y-3 text-xs">
                {BROTHERS_SANCTUARY_INFO.operatingHours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-[#B9A17B]/10 last:border-b-0">
                    <span className="text-[#F1EEE8]">{h.days}</span>
                    <span className="font-mono text-[#B9A17B]">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Architectural Location Visualization */}
          <div className="lg:col-span-7 bg-[#1B1D1B] border border-[#B9A17B]/25 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#B9A17B] uppercase tracking-wider">
                  ENCLAVE MAP COORDINATES
                </span>
                <span className="text-xs font-mono text-[#969892]">25.2104° N, 55.2638° E</span>
              </div>
              <h3 className="text-2xl font-serif text-[#F1EEE8] mb-2">
                The Jumeirah / Al Wasl Sanctuary
              </h3>
              <p className="text-xs sm:text-sm text-[#969892] leading-relaxed mb-6">
                Situated off Umm Amara Street via Al Badaa' Street on 30B Street. An architectural oasis secluded from thoroughfares, featuring sound-dampened private suites, continuous air purification, and dedicated valet drop-off.
              </p>
            </div>

            {/* Procedural Visual Map Plaque */}
            <div className="w-full h-64 bg-[#101110] border border-[#B9A17B]/20 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#B9A17B_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
              {/* Geometric Grid lines */}
              <div className="absolute w-full h-[1px] bg-[#B9A17B]/20" />
              <div className="absolute h-full w-[1px] bg-[#B9A17B]/20" />
              
              {/* Sanctuary Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#B9A17B] bg-[#1B1D1B] flex items-center justify-center text-[#B9A17B] shadow-2xl">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="mt-2 px-3 py-1 bg-[#1B1D1B] border border-[#B9A17B]/40 text-[11px] font-mono text-[#F1EEE8]">
                  BROTHERS PRIVATE WELLNESS CLUB
                </div>
                <span className="text-[10px] text-[#B9A17B] mt-1 font-mono">30B Street, Umm Amara St · Al Wasl</span>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-[#969892] leading-relaxed">
              Note: Unscheduled walk-ins are not accommodated to ensure uninterrupted training sessions for registered members. Please contact concierge prior to arrival.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
