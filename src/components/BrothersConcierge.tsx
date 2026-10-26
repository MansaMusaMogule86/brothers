import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, PhoneCall, ShieldCheck, Compass, UserCheck, Calendar } from 'lucide-react';
import { BROTHERS_SANCTUARY_INFO } from '../data/brothersContent';

interface Message {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  timestamp: string;
  actions?: { label: string; action: () => void }[];
}

interface BrothersConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onOpenConsultation: () => void;
}

export const BrothersConcierge: React.FC<BrothersConciergeProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenConsultation,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      text: 'Good day. Welcome to Brothers Private World Dubai. I am your sanctuary concierge. How may I orchestrate your inquiry or private access today?',
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSuggestedPrompt = (prompt: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: 'Just now',
    };

    let replyText = '';
    let actions: { label: string; action: () => void }[] | undefined;

    if (prompt.includes('Find my experience')) {
      replyText =
        'Our sanctuary operates five distinct disciplines: Private Training, Reformer Pilates, Boxing & Conditioning, Kinetic Movement, and Restorative Thermal Recovery. The most seamless pathway to discover your alignment is through our signature interactive Brothers DNA™ protocol configurator.';
      actions = [
        { label: 'Start Brothers DNA™', action: () => onNavigate('dna') },
        { label: 'View All Experiences', action: () => onNavigate('experiences') },
      ];
    } else if (prompt.includes('Help me choose a trainer')) {
      replyText =
        'At Brothers, every coach holds elite certifications across sports biomechanics, Olympic weightlifting, classical Pilates, or professional combat athletics. Sessions are strictly 1-on-1 in acoustically isolated bays to guarantee complete privacy and focus.';
      actions = [
        { label: 'Schedule Coach Consultation', action: onOpenConsultation },
        { label: 'Explore Private Training', action: () => onNavigate('private-training') },
      ];
    } else if (prompt.includes('Explore membership')) {
      replyText =
        'Brothers maintains capped membership to safeguard tranquility, equipment access, and member discretion in Al Wasl, Jumeirah, Dubai. Admission is subject to a private consultation and screening process.';
      actions = [
        { label: 'Review Membership Standards', action: () => onNavigate('membership') },
        { label: 'Submit Private Inquiry', action: onOpenConsultation },
      ];
    } else if (prompt.includes('Explore recovery')) {
      replyText =
        'Our recovery suite features custom monolithic basalt stone cold plunge basins maintained at 4°C, Finnish cedar infrared saunas, pneumatic lymphatic compression, and eucalyptus steam therapy designed for nervous system down-regulation.';
      actions = [
        { label: 'Explore Recovery & Wellness', action: () => onNavigate('recovery') },
        { label: 'Design A Brothers Day', action: () => onNavigate('brothers-day') },
      ];
    } else if (prompt.includes('Book a consultation')) {
      replyText =
        'We would be privileged to welcome you for a private walkthrough and preliminary movement consultation at our Brothers Private Wellness Club sanctuary on 30B Street, Al Wasl / Jumeirah.';
      actions = [{ label: 'Open Consultation Form', action: onOpenConsultation }];
    } else {
      replyText =
        'Thank you for your inquiry. While this digital concierge prototype provides verified guidance on our Dubai facility, our membership director is available for discreet direct consultation.';
      actions = [
        { label: 'Request Consultation', action: onOpenConsultation },
        { label: 'Explore Sanctuary DNA', action: () => onNavigate('dna') },
      ];
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: `concierge-${Date.now()}`,
        sender: 'concierge',
        text: replyText,
        timestamp: 'Just now',
        actions,
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const query = inputValue.trim();
    setInputValue('');
    handleSuggestedPrompt(query);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-[#101110] border border-[#B9A17B]/40 shadow-2xl flex flex-col h-[600px] overflow-hidden"
      >
        {/* Concierge Header */}
        <div className="p-4 sm:p-5 bg-[#1B1D1B] border-b border-[#B9A17B]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#B9A17B] bg-[#101110] flex items-center justify-center text-[#B9A17B]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
                SANCTUARY ASSISTANCE
              </div>
              <h3 className="text-base font-serif text-[#F1EEE8] tracking-wide">
                BROTHERS CONCIERGE
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#969892] hover:text-[#F1EEE8] p-1.5 transition-colors cursor-pointer"
            aria-label="Close Concierge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#B9A17B] text-[#101110] font-medium'
                    : 'bg-[#1B1D1B] text-[#F1EEE8] border border-[#B9A17B]/20'
                }`}
              >
                {m.text}
              </div>

              {/* Action chips if any */}
              {m.actions && m.actions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {m.actions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        act.action();
                        onClose();
                      }}
                      className="px-3 py-1 bg-[#101110] border border-[#B9A17B]/40 text-[#B9A17B] hover:bg-[#B9A17B] hover:text-[#101110] text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggested Luxury Prompts */}
        <div className="p-3 bg-[#1B1D1B]/80 border-t border-[#B9A17B]/15 overflow-x-auto flex items-center gap-2">
          {[
            'Find my experience',
            'Help me choose a trainer',
            'Explore membership',
            'Book a consultation',
            'Explore recovery',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedPrompt(prompt)}
              className="px-2.5 py-1 text-[11px] bg-[#101110] text-[#969892] hover:text-[#F1EEE8] hover:border-[#B9A17B]/40 border border-[#B9A17B]/15 whitespace-nowrap cursor-pointer transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-3 bg-[#101110] border-t border-[#B9A17B]/20 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your inquiry or choose a prompt above..."
            className="flex-1 bg-[#1B1D1B] border border-[#B9A17B]/25 px-3 py-2 text-xs text-[#F1EEE8] placeholder-[#969892]/60 focus:outline-none focus:border-[#B9A17B]"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-[#B9A17B] text-[#101110] hover:bg-[#D4C4A8] transition-colors cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Compliance Footer Note */}
        <div className="px-4 py-2 bg-[#121312] text-[10px] text-[#969892] text-center border-t border-[#B9A17B]/10">
          Guided concierge prototype · For immediate assistance: {BROTHERS_SANCTUARY_INFO.phone}
        </div>
      </motion.div>
    </div>
  );
};
