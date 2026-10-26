import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BROTHERS_DAY_PRESETS } from '../data/brothersContent';
import { Clock, Plus, Trash2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ItineraryItem } from '../types';

interface BrothersDayBuilderProps {
  onScheduleItinerary: (itinerarySummary: string) => void;
}

const AVAILABLE_EXPERIENCES: {
  title: string;
  category: 'Training' | 'Pilates' | 'Boxing' | 'Recovery' | 'Rest';
  durationMinutes: number;
  location: string;
  desc: string;
}[] = [
  {
    title: '1:1 Private Strength & Biomechanics',
    category: 'Training',
    durationMinutes: 60,
    location: 'Private Training Suite',
    desc: 'Targeted compound movement and eccentric loading with dedicated performance coach.',
  },
  {
    title: 'Reformer Pilates Core Architecture',
    category: 'Pilates',
    durationMinutes: 55,
    location: 'Reformer Sanctuary',
    desc: 'Spinal decompression and controlled carriage resistance for deep kinetic integrity.',
  },
  {
    title: 'Tactical Boxing & Heavy Bag Cadence',
    category: 'Boxing',
    durationMinutes: 50,
    location: 'Boxing Suite',
    desc: 'Rotational power, combination strike drills, and cardiovascular threshold elevation.',
  },
  {
    title: 'Nordic Contrast (Infrared + 4°C Plunge)',
    category: 'Recovery',
    durationMinutes: 45,
    location: 'Thermal Suite',
    desc: 'Finnish cedar dry heat detoxification followed by sub-zero cold immersion.',
  },
  {
    title: 'Guided Articular Mobility & CARs',
    category: 'Training',
    durationMinutes: 45,
    location: 'Movement Studio',
    desc: 'Controlled articular rotations to liberate hip flexors and thoracic cage.',
  },
  {
    title: 'Pneumatic Lymphatic Recovery & Percussion',
    category: 'Recovery',
    durationMinutes: 30,
    location: 'Recovery Lounge',
    desc: 'Compression boots and percussive tissue mobilization for rapid clearance.',
  },
  {
    title: 'Tranquil Lounge Reset & Herbal Elixir',
    category: 'Rest',
    durationMinutes: 25,
    location: 'Brothers Private Lounge',
    desc: 'Eucalyptus steam shower, electrolyte hydration, and grooming suite reset.',
  },
];

export const BrothersDayBuilder: React.FC<BrothersDayBuilderProps> = ({ onScheduleItinerary }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('the-executive-reset');
  const [activeItems, setActiveItems] = useState<ItineraryItem[]>(
    BROTHERS_DAY_PRESETS[0].items
  );
  const [startHour, setStartHour] = useState<string>('07:00 AM');
  const [customAddedCount, setCustomAddedCount] = useState<number>(0);

  // Apply a curated luxury preset
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = BROTHERS_DAY_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setActiveItems(found.items);
    }
  };

  // Add custom experience to timeline
  const handleAddExperience = (exp: typeof AVAILABLE_EXPERIENCES[0]) => {
    if (activeItems.length >= 5) {
      return; // Capped for quality experience
    }
    const newCount = customAddedCount + 1;
    setCustomAddedCount(newCount);

    // Calculate approximate sequential time based on previous items
    const lastItem = activeItems[activeItems.length - 1];
    let computedTime = '09:30 AM';
    if (lastItem) {
      // simple illustrative forward shift
      computedTime = 'Next Phase';
    }

    const newItem: ItineraryItem = {
      id: `custom-${Date.now()}-${newCount}`,
      time: computedTime,
      duration: `${exp.durationMinutes} min`,
      title: exp.title,
      category: exp.category,
      location: exp.location,
      description: exp.desc,
    };

    setActiveItems([...activeItems, newItem]);
    setSelectedPresetId('custom');
  };

  const handleRemoveItem = (id: string) => {
    setActiveItems(activeItems.filter((item) => item.id !== id));
    setSelectedPresetId('custom');
  };

  const totalMinutes = activeItems.reduce((acc, curr) => {
    const mins = parseInt(curr.duration) || 45;
    return acc + mins;
  }, 0);

  const hoursFormatted = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;
  const durationText = `${hoursFormatted > 0 ? `${hoursFormatted}h ` : ''}${remainingMins}m`;

  const handleSubmit = () => {
    const summary = activeItems.map((i) => `${i.time}: ${i.title} (${i.duration})`).join(' | ');
    onScheduleItinerary(`Brothers Day Itinerary: ${summary}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {/* Title & Introduction */}
      <div className="text-center mb-12">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] mb-2">
          SIGNATURE FEATURE · BESPOKE ITINERARY BUILDER
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F1EEE8] tracking-tight">
          THE BROTHERS DAY
        </h1>
        <p className="mt-3 text-sm md:text-base text-[#969892] max-w-xl mx-auto leading-relaxed">
          Design your ideal immersion inside our Dubai sanctuary. Every sequence harmonizes physical rigor with deep thermal restoration.
        </p>
      </div>

      {/* Preset Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {BROTHERS_DAY_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset.id)}
            className={`px-5 py-2.5 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
              selectedPresetId === preset.id
                ? 'bg-[#B9A17B] text-[#101110] font-semibold shadow-md'
                : 'bg-[#1B1D1B] text-[#969892] hover:text-[#F1EEE8] border border-[#B9A17B]/15'
            }`}
          >
            {preset.name}
          </button>
        ))}
        {selectedPresetId === 'custom' && (
          <div className="px-4 py-2.5 text-xs font-mono tracking-wider uppercase bg-[#101110] text-[#B9A17B] border border-[#B9A17B]/40">
            Custom Itinerary
          </div>
        )}
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Timeline Card */}
        <div className="lg:col-span-7 bg-[#1B1D1B] border border-[#B9A17B]/25 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-[#B9A17B]/15">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
                Curated Schedule
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-[#F1EEE8] mt-0.5">
                Your Sanctuary Timeline
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#969892] block">Total Immersion</span>
              <span className="text-sm font-mono text-[#B9A17B] font-medium">{durationText}</span>
            </div>
          </div>

          {/* Timeline Items */}
          <div className="py-6 space-y-6">
            <AnimatePresence>
              {activeItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative pl-7 group"
                >
                  {/* Subtle connecting line */}
                  {index < activeItems.length - 1 && (
                    <div className="absolute left-[9px] top-6 bottom-[-24px] w-[1px] bg-[#B9A17B]/25" />
                  )}
                  {/* Timeline Node */}
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border border-[#B9A17B] bg-[#101110] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#B9A17B]" />
                  </div>

                  {/* Item Content */}
                  <div className="bg-[#101110] border border-[#B9A17B]/15 p-4 transition-colors hover:border-[#B9A17B]/40">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#B9A17B]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.time}</span>
                        <span className="text-[#969892]">·</span>
                        <span className="text-[#969892]">{item.duration}</span>
                      </div>
                      {activeItems.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-[#969892] hover:text-red-400 p-1 opacity-60 hover:opacity-100 transition-opacity"
                          title="Remove from itinerary"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <h4 className="text-base font-serif text-[#F1EEE8] tracking-wide mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#969892] leading-relaxed mb-2">
                      {item.description}
                    </p>
                    <div className="text-[11px] font-mono text-[#B9A17B]/80 uppercase tracking-wider">
                      Location: {item.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Illustrative Notice */}
          <div className="pt-4 border-t border-[#B9A17B]/15 text-[11px] text-[#969892] leading-relaxed">
            Note: All timings and experience allocations are illustrative. Your dedicated coach will confirm room and suite sequencing upon consultation.
          </div>

          {/* Final CTA */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-[#101110]" />
              MAKE THIS MY BROTHERS DAY
            </button>
          </div>
        </div>

        {/* Right Column: Experience Additions */}
        <div className="lg:col-span-5 bg-[#1B1D1B] border border-[#B9A17B]/25 p-6 sm:p-8">
          <div className="mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B9A17B]">
              Add Disciplines
            </span>
            <h3 className="text-xl font-serif text-[#F1EEE8] mt-0.5">
              Available Sanctuary Blocks
            </h3>
            <p className="text-xs text-[#969892] mt-1">
              Select any additional sequence to append to your day (up to 5 maximum).
            </p>
          </div>

          <div className="space-y-3">
            {AVAILABLE_EXPERIENCES.map((exp, idx) => {
              const isAlreadyAdded = activeItems.some((i) => i.title === exp.title);
              return (
                <div
                  key={idx}
                  className="p-3.5 bg-[#101110] border border-[#B9A17B]/15 hover:border-[#B9A17B]/35 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono text-[#B9A17B] uppercase tracking-wider">
                      {exp.category} · {exp.durationMinutes} min
                    </span>
                    <button
                      onClick={() => handleAddExperience(exp)}
                      disabled={isAlreadyAdded || activeItems.length >= 5}
                      className={`text-xs px-2.5 py-1 flex items-center gap-1 transition-all ${
                        isAlreadyAdded
                          ? 'text-[#969892] bg-transparent cursor-not-allowed'
                          : 'bg-[#B9A17B]/15 text-[#B9A17B] hover:bg-[#B9A17B] hover:text-[#101110] cursor-pointer'
                      }`}
                    >
                      {isAlreadyAdded ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-[#B9A17B]" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" /> Add
                        </>
                      )}
                    </button>
                  </div>
                  <h5 className="text-sm font-serif text-[#F1EEE8] mb-1">{exp.title}</h5>
                  <p className="text-[11px] text-[#969892] leading-snug">{exp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
