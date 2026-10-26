import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DnaProfile, BiometricDataPoint, BiometricSummary } from '../types';
import { MOCK_DNA_PASSPORT } from '../data/brothersContent';
import {
  Activity,
  Heart,
  Zap,
  Moon,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Radio,
  Clock,
  Sparkles,
  Info,
  Calendar,
  Layers,
} from 'lucide-react';

interface BiometricPerformanceSectionProps {
  profile: DnaProfile;
}

type MetricKey = 'restingHeartRate' | 'recoveryEfficiency' | 'hrvRmssd' | 'sleepScore';

interface MetricMeta {
  key: MetricKey;
  label: string;
  shortLabel: string;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  idealTrend: 'down' | 'up';
  description: string;
  domainPadding: number;
}

const METRIC_CONFIGS: Record<MetricKey, MetricMeta> = {
  restingHeartRate: {
    key: 'restingHeartRate',
    label: 'Resting Heart Rate',
    shortLabel: 'RHR',
    unit: 'BPM',
    icon: Heart,
    idealTrend: 'down',
    description: 'Nocturnal resting pulse. Decreases signify enhanced cardiovascular stroke volume and autonomic calm.',
    domainPadding: 3,
  },
  recoveryEfficiency: {
    key: 'recoveryEfficiency',
    label: 'Recovery Efficiency',
    shortLabel: 'Recovery',
    unit: '%',
    icon: Zap,
    idealTrend: 'up',
    description: 'Holistic restorative readiness based on cellular oxygenation, thermal contrast exposure, and CNS balance.',
    domainPadding: 4,
  },
  hrvRmssd: {
    key: 'hrvRmssd',
    label: 'Autonomic HRV (rMSSD)',
    shortLabel: 'HRV',
    unit: 'ms',
    icon: Activity,
    idealTrend: 'up',
    description: 'Root mean square of successive RR interval differences, the gold standard biomarker for parasympathetic nervous tone.',
    domainPadding: 5,
  },
  sleepScore: {
    key: 'sleepScore',
    label: 'Sleep Architecture',
    shortLabel: 'Sleep',
    unit: '%',
    icon: Moon,
    idealTrend: 'up',
    description: 'Quality ratio of restorative Slow Wave Sleep (SWS) and REM neuro-regeneration during sanctuary cycles.',
    domainPadding: 4,
  },
};

export const BiometricPerformanceSection: React.FC<BiometricPerformanceSectionProps> = ({ profile }) => {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('recoveryEfficiency');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'matrix'>('chart');

  // Fallback to MOCK_DNA_PASSPORT if customProfile doesn't have biometric history
  const history: BiometricDataPoint[] =
    profile.biometricHistory && profile.biometricHistory.length > 0
      ? profile.biometricHistory
      : MOCK_DNA_PASSPORT.biometricHistory;

  const summary: BiometricSummary =
    profile.biometricSummary || MOCK_DNA_PASSPORT.biometricSummary;

  const currentMeta = METRIC_CONFIGS[selectedMetric];

  // SVG Chart Dimensions
  const chartWidth = 720;
  const chartHeight = 220;
  const paddingX = 45;
  const paddingTop = 25;
  const paddingBottom = 40;

  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  // Compute scale boundaries
  const values = history.map((d) => d[selectedMetric]);
  const minVal = Math.min(...values) - currentMeta.domainPadding;
  const maxVal = Math.max(...values) + currentMeta.domainPadding;
  const valRange = maxVal - minVal || 1;

  // Helper coordinate getters
  const getX = (index: number) => {
    if (history.length <= 1) return paddingX + innerWidth / 2;
    return paddingX + (index / (history.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const normalized = (val - minVal) / valRange;
    return paddingTop + innerHeight - normalized * innerHeight;
  };

  // Generate SVG Path
  const points = history.map((d, i) => ({
    x: getX(i),
    y: getY(d[selectedMetric]),
    data: d,
  }));

  const linePath = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    // Smooth Bezier cubic curve interpolation
    const prev = points[i - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + innerHeight} L ${points[0].x} ${paddingTop + innerHeight} Z`;

  // Active hover data
  const activeDataPoint =
    hoveredPointIndex !== null ? history[hoveredPointIndex] : history[history.length - 1];
  const activeValue = activeDataPoint ? activeDataPoint[selectedMetric] : 0;

  // Comparison between start and current
  const firstValue = history[0] ? history[0][selectedMetric] : activeValue;
  const delta = activeValue - firstValue;
  const deltaFormatted =
    delta > 0
      ? `+${delta.toFixed(0)} ${currentMeta.unit}`
      : `${delta.toFixed(0)} ${currentMeta.unit}`;

  return (
    <div className="py-6 border-b border-[#B9A17B]/20 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#B9A17B]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] font-semibold">
              HISTORICAL BIOMETRIC PERFORMANCE TELEMETRY
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#F1EEE8] tracking-wide mt-1">
            Biomechanical & Autonomic Progression
          </h3>
          <p className="text-xs text-[#969892] mt-1 max-w-xl">
            Continuous physiological biomarkers calibrated directly to your {profile.protocolName} rhythm at the 30B Street sanctuary.
          </p>
        </div>

        {/* Live Sync Source Pill */}
        <div className="flex flex-col sm:items-end gap-1 font-mono text-[11px] shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#101110] border border-[#B9A17B]/30 text-[#B9A17B]">
            <Radio className="w-3 h-3 text-[#10B981] animate-pulse" />
            <span>{summary.overallStatus}</span>
          </div>
          <span className="text-[10px] text-[#969892]">
            {summary.deviceSource} · {summary.lastSynchronized}
          </span>
        </div>
      </div>

      {/* 4 Stat Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {/* RHR Card */}
        <button
          type="button"
          onClick={() => setSelectedMetric('restingHeartRate')}
          className={`p-4 text-left transition-all cursor-pointer border ${
            selectedMetric === 'restingHeartRate'
              ? 'bg-[#181A18] border-[#B9A17B] shadow-[0_0_15px_rgba(185,161,123,0.15)]'
              : 'bg-[#121312] border-[#B9A17B]/15 hover:border-[#B9A17B]/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#969892] mb-1">
            <span className="uppercase tracking-wider">Resting Heart Rate</span>
            <Heart className="w-3.5 h-3.5 text-[#B9A17B]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-mono tabular-nums text-[#F1EEE8] font-semibold">
              {summary.currentRHR}
            </span>
            <span className="text-xs font-mono text-[#969892]">BPM</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#10B981] mt-1">
            <TrendingDown className="w-3 h-3" />
            <span>{summary.rhrDelta}</span>
          </div>
        </button>

        {/* Recovery Card */}
        <button
          type="button"
          onClick={() => setSelectedMetric('recoveryEfficiency')}
          className={`p-4 text-left transition-all cursor-pointer border ${
            selectedMetric === 'recoveryEfficiency'
              ? 'bg-[#181A18] border-[#B9A17B] shadow-[0_0_15px_rgba(185,161,123,0.15)]'
              : 'bg-[#121312] border-[#B9A17B]/15 hover:border-[#B9A17B]/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#969892] mb-1">
            <span className="uppercase tracking-wider">Recovery Efficiency</span>
            <Zap className="w-3.5 h-3.5 text-[#B9A17B]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-mono tabular-nums text-[#F1EEE8] font-semibold">
              {summary.currentRecovery}%
            </span>
            <span className="text-xs font-mono text-[#B9A17B]">OPTIMAL</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#10B981] mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{summary.recoveryDelta}</span>
          </div>
        </button>

        {/* HRV Card */}
        <button
          type="button"
          onClick={() => setSelectedMetric('hrvRmssd')}
          className={`p-4 text-left transition-all cursor-pointer border ${
            selectedMetric === 'hrvRmssd'
              ? 'bg-[#181A18] border-[#B9A17B] shadow-[0_0_15px_rgba(185,161,123,0.15)]'
              : 'bg-[#121312] border-[#B9A17B]/15 hover:border-[#B9A17B]/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#969892] mb-1">
            <span className="uppercase tracking-wider">Autonomic HRV</span>
            <Activity className="w-3.5 h-3.5 text-[#B9A17B]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-mono tabular-nums text-[#F1EEE8] font-semibold">
              {summary.currentHRV}
            </span>
            <span className="text-xs font-mono text-[#969892]">MS</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#10B981] mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{summary.hrvDelta}</span>
          </div>
        </button>

        {/* Sleep Card */}
        <button
          type="button"
          onClick={() => setSelectedMetric('sleepScore')}
          className={`p-4 text-left transition-all cursor-pointer border ${
            selectedMetric === 'sleepScore'
              ? 'bg-[#181A18] border-[#B9A17B] shadow-[0_0_15px_rgba(185,161,123,0.15)]'
              : 'bg-[#121312] border-[#B9A17B]/15 hover:border-[#B9A17B]/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#969892] mb-1">
            <span className="uppercase tracking-wider">Sleep Architecture</span>
            <Moon className="w-3.5 h-3.5 text-[#B9A17B]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-mono tabular-nums text-[#F1EEE8] font-semibold">
              {summary.sleepQuality}%
            </span>
            <span className="text-xs font-mono text-[#969892]">SCORE</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#B9A17B] mt-1">
            <Sparkles className="w-3 h-3" />
            <span>Peak Neuro-Restoration</span>
          </div>
        </button>
      </div>

      {/* Chart Canvas & Controls Panel */}
      <div className="p-4 sm:p-6 bg-[#131513] border border-[#B9A17B]/30 relative">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#B9A17B]/15">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#969892]">
              Active Marker:
            </span>
            <span className="text-xs font-mono text-[#F1EEE8] font-semibold flex items-center gap-1.5">
              <currentMeta.icon className="w-3.5 h-3.5 text-[#B9A17B]" />
              {currentMeta.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center p-0.5 bg-[#0F100F] border border-[#B9A17B]/20 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setViewMode('chart')}
                className={`px-3 py-1 cursor-pointer transition-all ${
                  viewMode === 'chart'
                    ? 'bg-[#B9A17B] text-[#101110] font-semibold'
                    : 'text-[#969892] hover:text-[#F1EEE8]'
                }`}
              >
                Area Graph
              </button>
              <button
                type="button"
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1 cursor-pointer transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-[#B9A17B] text-[#101110] font-semibold'
                    : 'text-[#969892] hover:text-[#F1EEE8]'
                }`}
              >
                Log Matrix
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Interactive SVG Line & Area Graph */}
        {viewMode === 'chart' && (
          <div className="space-y-4">
            {/* SVG Visualizer */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[580px]">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-auto overflow-visible select-none"
                >
                  <defs>
                    <linearGradient id="biometricAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#B9A17B" stopOpacity="0.32" />
                      <stop offset="70%" stopColor="#B9A17B" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#B9A17B" stopOpacity="0" />
                    </linearGradient>
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Horizontal Grid Baseline Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                    const y = paddingTop + innerHeight * (1 - ratio);
                    const valAtLine = Math.round(minVal + ratio * valRange);
                    return (
                      <g key={idx}>
                        <line
                          x1={paddingX}
                          y1={y}
                          x2={paddingX + innerWidth}
                          y2={y}
                          stroke="#B9A17B"
                          strokeOpacity={idx === 0 || idx === 4 ? 0.2 : 0.08}
                          strokeDasharray={idx === 0 || idx === 4 ? '' : '3 3'}
                        />
                        <text
                          x={paddingX - 10}
                          y={y + 3}
                          fill="#969892"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="end"
                        >
                          {valAtLine}
                        </text>
                      </g>
                    );
                  })}

                  {/* Area Fill */}
                  <path d={areaPath} fill="url(#biometricAreaGrad)" />

                  {/* Line Stroke */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#B9A17B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Interactive Nodes */}
                  {points.map((pt, idx) => {
                    const isHovered = hoveredPointIndex === idx;
                    const isLast = idx === points.length - 1;
                    const val = pt.data[selectedMetric];

                    return (
                      <g
                        key={idx}
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredPointIndex(idx)}
                        onMouseLeave={() => setHoveredPointIndex(null)}
                      >
                        {/* Hover vertical reference guide */}
                        {isHovered && (
                          <line
                            x1={pt.x}
                            y1={paddingTop}
                            x2={pt.x}
                            y2={paddingTop + innerHeight}
                            stroke="#F1EEE8"
                            strokeOpacity={0.35}
                            strokeDasharray="2 2"
                          />
                        )}

                        {/* Outer Glow Halo */}
                        <circle
                          cx={pt.x}
                          y={pt.y}
                          r={isHovered ? 8 : isLast ? 6 : 4}
                          fill={isHovered ? '#F1EEE8' : '#B9A17B'}
                          fillOpacity={isHovered ? 0.35 : 0.2}
                          className="transition-all duration-200"
                        />

                        {/* Core Solid Dot */}
                        <circle
                          cx={pt.x}
                          y={pt.y}
                          r={isHovered ? 4.5 : isLast ? 3.5 : 2.5}
                          fill={isHovered ? '#FFFFFF' : '#B9A17B'}
                          stroke="#101110"
                          strokeWidth="1.5"
                          className="transition-all duration-200"
                        />

                        {/* Date Label Below X-Axis */}
                        <text
                          x={pt.x}
                          y={paddingTop + innerHeight + 18}
                          fill={isHovered ? '#F1EEE8' : '#969892'}
                          fontSize="10"
                          fontFamily="monospace"
                          textAnchor="middle"
                          fontWeight={isHovered ? 'bold' : 'normal'}
                        >
                          {pt.data.date}
                        </text>
                        <text
                          x={pt.x}
                          y={paddingTop + innerHeight + 30}
                          fill="#B9A17B"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="middle"
                          opacity={0.8}
                        >
                          {pt.data.dayLabel}
                        </text>

                        {/* Value tooltip callout above node */}
                        {(isHovered || (hoveredPointIndex === null && isLast)) && (
                          <g transform={`translate(${pt.x}, ${pt.y - 14})`}>
                            <rect
                              x="-26"
                              y="-18"
                              width="52"
                              height="18"
                              fill="#101110"
                              stroke="#B9A17B"
                              strokeWidth="1"
                            />
                            <text
                              x="0"
                              y="-6"
                              fill="#F1EEE8"
                              fontSize="10"
                              fontFamily="monospace"
                              fontWeight="600"
                              textAnchor="middle"
                            >
                              {val} {currentMeta.unit}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Micro-Annotation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#B9A17B]/10 text-xs">
              <div className="flex items-center gap-2 text-[#969892]">
                <Info className="w-3.5 h-3.5 text-[#B9A17B] shrink-0" />
                <span>{currentMeta.description}</span>
              </div>
              <div className="font-mono text-xs text-[#B9A17B] shrink-0">
                Cycle Trend: <span className="font-semibold">{deltaFormatted}</span>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: Detailed Log Matrix */}
        {viewMode === 'matrix' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#B9A17B]/20 text-[#969892] uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-medium">Session Date</th>
                  <th className="pb-3 font-medium">Day</th>
                  <th className="pb-3 font-medium text-right">Resting HR</th>
                  <th className="pb-3 font-medium text-right">Recovery %</th>
                  <th className="pb-3 font-medium text-right">Autonomic HRV</th>
                  <th className="pb-3 font-medium text-right">Sleep Score</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B9A17B]/10">
                {history.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#1A1C1A] transition-colors"
                  >
                    <td className="py-2.5 text-[#F1EEE8] font-semibold">{row.date}</td>
                    <td className="py-2.5 text-[#B9A17B]">{row.dayLabel}</td>
                    <td className="py-2.5 text-right tabular-nums text-[#F1EEE8]">
                      {row.restingHeartRate} bpm
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-[#F1EEE8]">
                      {row.recoveryEfficiency}%
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-[#F1EEE8]">
                      {row.hrvRmssd} ms
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-[#F1EEE8]">
                      {row.sleepScore}%
                    </td>
                    <td className="py-2.5 text-center">
                      <span className="px-2 py-0.5 text-[10px] bg-[#101110] border border-[#B9A17B]/30 text-[#B9A17B]">
                        {row.readinessCategory}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Autonomic Insight Plaque */}
      <div className="mt-4 p-4 bg-[#101110] border border-[#B9A17B]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#B9A17B] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B9A17B] font-semibold block">
              SANCTUARY PROTOCOL ADAPTATION INSIGHT
            </span>
            <p className="text-[#969892] mt-0.5 leading-relaxed">
              Contrast therapy at the 30B Street cold plunge (4°C) combined with reformer core alignment has accelerated parasympathetic autonomic rebound, yielding a 14% efficiency surge in your active profile.
            </p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-[#969892] shrink-0">
          Sync Hash: <span className="text-[#F1EEE8]">#BIO-DXB-9842</span>
        </div>
      </div>
    </div>
  );
};
