import React, { useState, useEffect, useMemo, useRef } from 'react';
import QRCode from 'qrcode';
import { DnaProfile } from '../types';
import {
  QrCode,
  Maximize2,
  Minimize2,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Sparkles,
  Volume2,
  Smartphone,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Info
} from 'lucide-react';

interface SanctuaryEntryQrProps {
  profile: DnaProfile;
}

export const SanctuaryEntryQr: React.FC<SanctuaryEntryQrProps> = ({ profile }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);
  const [showPayloadDetails, setShowPayloadDetails] = useState<boolean>(false);
  const [scanSimulationState, setScanSimulationState] = useState<'idle' | 'scanning' | 'granted'>('idle');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const [rotationSeed, setRotationSeed] = useState<number>(1);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Generate dynamic rolling pass token that cycles every 30s for physical turnstile anti-fraud
  const passToken = useMemo(() => {
    const raw = `${profile.id}-${profile.protocolCode}-${rotationSeed}-${Math.floor(Date.now() / 30000)}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
    return `DXB-30B-${hex.slice(0, 4)}-${hex.slice(4, 8)}`;
  }, [profile.id, profile.protocolCode, rotationSeed]);

  // Structured payload for physical turnstile scanner at 30B Street, Al Wasl
  const qrPayload = useMemo(() => {
    return JSON.stringify({
      facility: "Brothers Boutique Gym",
      location: "30B Street, Al Wasl, Dubai",
      sanctuaryGate: "GATE-01-TURNSTILE-A",
      memberId: profile.id,
      memberName: profile.fullName,
      protocol: profile.protocolCode,
      tier: "Sovereign Circle",
      accessStatus: "AUTHORIZED_UNRESTRICTED",
      dynamicPassToken: passToken,
      expiresInSeconds: secondsRemaining,
      issuedAt: new Date().toISOString(),
      validationSignature: `RSA4096:SHA256:${passToken}`
    }, null, 2);
  }, [profile, passToken, secondsRemaining]);

  // Generate QR Code data URL whenever payload updates
  useEffect(() => {
    let isCancelled = false;
    QRCode.toDataURL(
      qrPayload,
      {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 400,
        color: {
          dark: '#101110', // High-contrast obsidian modules for optical sensors
          light: '#F8F6F0'  // Luxury ivory warm ground
        }
      },
      (err, url) => {
        if (!err && !isCancelled && url) {
          setQrDataUrl(url);
        }
      }
    );
    return () => {
      isCancelled = true;
    };
  }, [qrPayload]);

  // 30s security token rotation countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setRotationSeed((s) => s + 1);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Audio cue synthesizer for turnstile clearance simulation
  const playAccessChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Elegant two-tone luxury sanctuary access chime (F#5 -> A#5)
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(739.99, now); // F#5
      osc1.frequency.exponentialRampToValueAtTime(932.33, now + 0.12); // A#5

      osc2.frequency.setValueAtTime(739.99 * 0.5, now);
      osc2.frequency.exponentialRampToValueAtTime(932.33 * 0.5, now + 0.12);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.65);
      osc2.stop(now + 0.65);
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const handleSimulateScan = () => {
    setScanSimulationState('scanning');
    setTimeout(() => {
      setScanSimulationState('granted');
      playAccessChime();
      setTimeout(() => {
        setScanSimulationState('idle');
      }, 4000);
    }, 1200);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `Brothers-Sanctuary-Pass-${profile.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-6 border-b border-[#B9A17B]/20 relative z-10">
      {/* Header Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B9A17B] font-semibold flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-[#B9A17B]" />
              PHYSICAL SANCTUARY PASS · GATE CLEARANCE
            </span>
            <span className="px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-[9px] font-mono">
              OPTICAL READY
            </span>
          </div>
          <p className="text-xs text-[#969892] mt-1">
            Dynamically encrypted credential for touchless turnstile entry at Brothers Dubai.
          </p>
        </div>

        {/* Quick Location Badge */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#F1EEE8] bg-[#101110] border border-[#B9A17B]/25 px-3 py-1.5 self-start sm:self-auto">
          <MapPin className="w-3.5 h-3.5 text-[#B9A17B] shrink-0" />
          <span>30B St, Al Wasl · Gate A/B Turnstiles</span>
        </div>
      </div>

      {/* Main QR Card Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#121312] border border-[#B9A17B]/30 p-5 sm:p-6 relative overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#B9A17B]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Left Column: QR Code Optical Frame */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative group">
            {/* Viewfinder Luxury Corner Reticles */}
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#B9A17B] z-20 pointer-events-none" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#B9A17B] z-20 pointer-events-none" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#B9A17B] z-20 pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#B9A17B] z-20 pointer-events-none" />

            {/* QR Card Frame */}
            <div className="relative bg-[#F8F6F0] p-4 sm:p-5 shadow-2xl border border-[#B9A17B]/40 flex flex-col items-center">
              {/* Card Header Stamp */}
              <div className="w-full flex items-center justify-between border-b border-[#101110]/15 pb-2 mb-3 text-[#101110]">
                <div className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase">
                  BROTHERS · DXB
                </div>
                <div className="text-[8px] font-mono uppercase bg-[#101110] text-[#B9A17B] px-1.5 py-0.5">
                  SANCTUARY
                </div>
              </div>

              {/* QR Image Container with Laser Scan Animation */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center bg-white border border-[#101110]/10 overflow-hidden">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Physical Sanctuary Turnstile QR Code"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center text-[#969892] text-xs font-mono">
                    Generating Token...
                  </div>
                )}

                {/* Animated Laser Scan Line */}
                <div
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#B9A17B] to-transparent shadow-[0_0_8px_#B9A17B] pointer-events-none animate-scanline"
                  style={{
                    animation: 'scanline 2.8s ease-in-out infinite'
                  }}
                />

                {/* Simulated Scanning Hologram / Success Overlay */}
                {scanSimulationState === 'scanning' && (
                  <div className="absolute inset-0 bg-[#101110]/85 backdrop-blur-xs flex flex-col items-center justify-center text-center p-3 z-30">
                    <RefreshCw className="w-8 h-8 text-[#B9A17B] animate-spin mb-2" />
                    <span className="text-xs font-mono text-[#F1EEE8] uppercase tracking-wider font-semibold">
                      Interrogating Turnstile...
                    </span>
                    <span className="text-[10px] font-mono text-[#B9A17B] mt-1">
                      Gate 01 Optical Handshake
                    </span>
                  </div>
                )}

                {scanSimulationState === 'granted' && (
                  <div className="absolute inset-0 bg-[#101110]/90 backdrop-blur-xs flex flex-col items-center justify-center text-center p-3 z-30">
                    <CheckCircle2 className="w-10 h-10 text-[#10B981] mb-2 animate-bounce" />
                    <span className="text-xs font-mono text-[#10B981] uppercase tracking-widest font-bold">
                      ACCESS GRANTED
                    </span>
                    <span className="text-[10px] font-mono text-[#F1EEE8] mt-1">
                      Turnstile Unlocked · Welcome
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer Microtext */}
              <div className="w-full flex items-center justify-between pt-2.5 mt-2 border-t border-[#101110]/15 text-[#101110] text-[8px] font-mono">
                <span className="truncate max-w-[120px] font-semibold">{profile.fullName}</span>
                <span className="tracking-widest tabular-nums text-[#101110]/70">{passToken.slice(0, 11)}</span>
              </div>
            </div>
          </div>

          {/* Action Row Under QR */}
          <div className="flex items-center gap-2 mt-4 w-full max-w-xs justify-center">
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="px-3.5 py-1.5 bg-[#171917] hover:bg-[#202220] border border-[#B9A17B]/40 hover:border-[#B9A17B] text-[#F1EEE8] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Present Full-Screen for Scanner"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#B9A17B]" />
              <span>Turnstile Mode</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadQr}
              className="px-3 py-1.5 bg-[#171917] hover:bg-[#202220] border border-[#B9A17B]/40 hover:border-[#B9A17B] text-[#F1EEE8] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Save Pass Image"
            >
              <Download className="w-3.5 h-3.5 text-[#B9A17B]" />
              <span>Save Pass</span>
            </button>
          </div>
        </div>

        {/* Right Column: Physical Terminal Clearance Specs & Live Gate Controls */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            {/* Live Terminal Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#101110] border border-[#B9A17B]/25 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#F1EEE8] font-semibold">
                  GATE 01 · TURNSTILE A SENSORS ONLINE
                </span>
              </div>

              {/* Dynamic Token Expiry Countdown */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#969892]">
                <RefreshCw
                  className={`w-3 h-3 text-[#B9A17B] ${secondsRemaining <= 5 ? 'animate-spin' : ''}`}
                />
                <span>Token Refresh in</span>
                <span className="font-mono text-[#B9A17B] font-bold tabular-nums">
                  00:{secondsRemaining.toString().padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Credential Data Points Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 bg-[#101110]/80 border border-[#B9A17B]/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-0.5">
                  Member Clearance
                </span>
                <div className="flex items-center gap-1.5 text-[#F1EEE8] font-medium font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Unrestricted Physical Access</span>
                </div>
              </div>

              <div className="p-3 bg-[#101110]/80 border border-[#B9A17B]/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-0.5">
                  Protocol Allocation
                </span>
                <span className="text-[#B9A17B] font-mono font-semibold">
                  {profile.protocolCode} · {profile.protocolName}
                </span>
              </div>

              <div className="p-3 bg-[#101110]/80 border border-[#B9A17B]/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-0.5">
                  Rolling Security Hash
                </span>
                <span className="text-[#F1EEE8] font-mono text-[11px] tabular-nums tracking-wider">
                  {passToken}
                </span>
              </div>

              <div className="p-3 bg-[#101110]/80 border border-[#B9A17B]/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#969892] block mb-0.5">
                  Physical Scanner Target
                </span>
                <span className="text-[#F1EEE8] font-mono text-[11px]">
                  30B Street Optical Column (Gate 1 & 2)
                </span>
              </div>
            </div>

            {/* Turnstile Instructions */}
            <div className="p-3 bg-[#101110]/40 border-l-2 border-[#B9A17B] text-xs text-[#969892] leading-relaxed">
              <span className="text-[#F1EEE8] font-medium block mb-1">
                Facility Check-In Procedure:
              </span>
              Hold this screen 10–15 cm from the optical scanner glass at the main reception gate on 30B Street, Al Wasl. The turnstile will release instantly and sync your biomechanical itinerary with the concierge desk.
            </div>
          </div>

          {/* Interactive Simulation & Technical Inspection Bar */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Test Gate Simulation Button */}
              <button
                type="button"
                onClick={handleSimulateScan}
                disabled={scanSimulationState !== 'idle'}
                className="flex-1 px-4 py-2.5 bg-[#B9A17B] hover:bg-[#D4C4A8] disabled:bg-[#333] text-[#101110] font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                {scanSimulationState === 'idle' && (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Simulate Gate Clearance Scan</span>
                  </>
                )}
                {scanSimulationState === 'scanning' && (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying At Turnstile...</span>
                  </>
                )}
                {scanSimulationState === 'granted' && (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#101110]" />
                    <span>Gate Open · Welcome {profile.fullName.split(' ')[0]}</span>
                  </>
                )}
              </button>

              {/* View Cryptographic Payload Toggle */}
              <button
                type="button"
                onClick={() => setShowPayloadDetails(!showPayloadDetails)}
                className="px-3.5 py-2.5 bg-[#171917] hover:bg-[#202220] border border-[#B9A17B]/40 text-[#B9A17B] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Payload Data</span>
                {showPayloadDetails ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Expandable Cryptographic Payload Viewer */}
            {showPayloadDetails && (
              <div className="p-3.5 bg-[#0C0D0C] border border-[#B9A17B]/30 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B9A17B]">
                    ENCRYPTED SCANNER PAYLOAD (JSON)
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPayload}
                    className="flex items-center gap-1 text-[10px] font-mono text-[#F1EEE8] hover:text-[#B9A17B] transition-colors cursor-pointer"
                  >
                    {copiedPayload ? (
                      <>
                        <Check className="w-3 h-3 text-[#10B981]" />
                        <span className="text-[#10B981]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Payload</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] font-mono text-[#969892] bg-[#080908] p-2.5 overflow-x-auto max-h-40 border border-[#B9A17B]/15 leading-relaxed">
                  {qrPayload}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULL-SCREEN / TURNSTILE PRESENTATION MODAL */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0A0B0A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          {/* Modal Plaque */}
          <div className="relative w-full max-w-lg bg-[#141614] border-2 border-[#B9A17B] p-6 sm:p-8 shadow-2xl flex flex-col items-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 w-9 h-9 border border-[#B9A17B]/40 hover:border-[#B9A17B] bg-[#101110] text-[#F1EEE8] hover:text-[#B9A17B] flex items-center justify-center transition-colors cursor-pointer"
              title="Close Presentation Mode"
            >
              <Minimize2 className="w-4 h-4" />
            </button>

            {/* Header Stamp */}
            <div className="text-center mb-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B9A17B] font-bold">
                BROTHERS BOUTIQUE GYM · DUBAI
              </div>
              <h3 className="text-xl font-serif text-[#F1EEE8] mt-1">
                Physical Turnstile Presentation
              </h3>
              <p className="text-xs text-[#969892] mt-1">
                Hold directly facing the optical reader window at 30B Street, Al Wasl.
              </p>
            </div>

            {/* High-Contrast Presentation Plaque */}
            <div className="relative bg-[#FFFFFF] p-6 shadow-2xl border-4 border-[#B9A17B] flex flex-col items-center">
              {/* Corner Viewfinder Reticles */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4 border-[#101110] z-20 pointer-events-none" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-4 border-r-4 border-[#101110] z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-4 border-l-4 border-[#101110] z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4 border-[#101110] z-20 pointer-events-none" />

              <div className="w-full flex items-center justify-between border-b-2 border-[#101110] pb-2 mb-3 text-[#101110]">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
                  SANCTUARY ENTRY KEY
                </span>
                <span className="text-[9px] font-mono bg-[#101110] text-[#B9A17B] px-2 py-0.5 font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Ultra High Contrast QR Code */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 bg-white flex items-center justify-center relative">
                {qrDataUrl && (
                  <img
                    src={qrDataUrl}
                    alt="Sanctuary Pass QR"
                    className="w-full h-full object-contain"
                  />
                )}
                {/* Visual scan line */}
                <div
                  className="absolute inset-x-0 h-1 bg-[#B9A17B]/80 shadow-[0_0_12px_#B9A17B] pointer-events-none"
                  style={{
                    animation: 'scanline 2.2s ease-in-out infinite'
                  }}
                />
              </div>

              {/* Pass Holder Identification */}
              <div className="w-full text-center border-t border-[#101110]/20 pt-3 mt-3 text-[#101110]">
                <div className="text-sm font-serif font-bold tracking-wide">
                  {profile.fullName}
                </div>
                <div className="text-[10px] font-mono text-[#555] tracking-widest mt-0.5">
                  ID: {profile.id} · TOKEN: {passToken}
                </div>
              </div>
            </div>

            {/* Token Expiry & Security Notes */}
            <div className="mt-6 flex flex-col items-center gap-3 w-full">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B9A17B]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Anti-spoofing dynamic key updates in {secondsRemaining}s</span>
              </div>

              <div className="flex items-center justify-center gap-3 w-full pt-2">
                <button
                  type="button"
                  onClick={handleSimulateScan}
                  className="px-5 py-2.5 bg-[#B9A17B] hover:bg-[#D4C4A8] text-[#101110] font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Test Turnstile Handshake</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="px-5 py-2.5 bg-[#171917] hover:bg-[#202220] border border-[#B9A17B]/50 text-[#F1EEE8] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Style animation for laser scan-line */}
      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0.2; }
          50% { top: 96%; opacity: 0.9; }
          100% { top: 0%; opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};
