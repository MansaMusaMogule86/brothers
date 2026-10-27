import React from 'react';
import { PageId } from '../types';
import { BROTHERS_SANCTUARY_INFO } from '../data/brothersContent';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <footer className="w-full bg-[#0D0E0D] border-t border-[#B9A17B]/15 text-[#969892] pt-16 pb-12 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#B9A17B]/15">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              aria-label="Brothers Private Wellness Club — Home"
              className="cursor-pointer hover:opacity-85 transition-opacity text-left"
            >
              <img
                src="/branding/logo/brothers-private-wellness-club-logo.png"
                alt="Brothers Private Wellness Club"
                className="block h-14 w-auto"
              />
            </button>
            <p className="text-xs text-[#969892] leading-relaxed max-w-sm">
              Dubai's private training and elevated wellness sanctuary. Designed for disciplined individuals demanding an uncompromising personal standard.
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#B9A17B] shrink-0 mt-0.5" />
                <span>{BROTHERS_SANCTUARY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#B9A17B] shrink-0" />
                <span>{BROTHERS_SANCTUARY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#B9A17B] shrink-0" />
                <span>{BROTHERS_SANCTUARY_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Experiences */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block">
              Disciplines
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('private-training')}
                  className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
                >
                  Private Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pilates')}
                  className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
                >
                  Reformer Pilates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('boxing')}
                  className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
                >
                  Boxing & Conditioning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('movement')}
                  className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
                >
                  Movement & Longevity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('recovery')}
                  className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
                >
                  Thermal & Recovery
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Signature Features */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block">
              Signature World
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('dna')}
                  className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
                >
                  Brothers DNA™
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('passport')}
                  className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
                >
                  DNA Member Passport
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('brothers-day')}
                  className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
                >
                  The Brothers Day
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
                >
                  Private Membership
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="text-[#B9A17B] hover:text-[#D4C4A8] transition-colors cursor-pointer font-medium"
                >
                  Request Consultation →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Sanctuary Hours */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] block">
              Operating Hours
            </span>
            <div className="space-y-2 text-xs">
              {BROTHERS_SANCTUARY_INFO.operatingHours.map((h, i) => (
                <div key={i}>
                  <div className="text-[#F1EEE8]">{h.days}</div>
                  <div className="text-[#969892] font-mono">{h.hours}</div>
                </div>
              ))}
              <div className="pt-2 text-[11px] text-[#B9A17B]">
                Private Valet Service Provided
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} BROTHERS BOUTIQUE GYM. All rights reserved. Dubai, United Arab Emirates.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
            >
              Privacy Policy & Terms
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#F1EEE8] transition-colors cursor-pointer"
            >
              Sanctuary Access
            </button>
            <span className="text-[#969892]/60">Prototype Demonstration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
