import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Scissors, Eye, Zap, Flame, Crown, RefreshCw } from 'lucide-react';

interface CaptionWord {
  text: string;
  start: number;
  end: number;
}

export const InteractiveReelDemo: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activePreset, setActivePreset] = useState<'podcast' | 'fast-paced' | 'motivational' | 'educational'>('podcast');

  const duration = 12; // 12 seconds preview loop

  // Scripted highlight moment with word-level timestamps
  const transcript: CaptionWord[] = [
    { text: "IF", start: 0.2, end: 0.6 },
    { text: "YOU", start: 0.6, end: 1.0 },
    { text: "WANT", start: 1.0, end: 1.4 },
    { text: "TO", start: 1.4, end: 1.7 },
    { text: "GO", start: 1.7, end: 2.1 },
    { text: "VIRAL", start: 2.1, end: 2.9 },
    { text: "STOP", start: 3.2, end: 3.8 },
    { text: "TRYING", start: 3.8, end: 4.4 },
    { text: "TO", start: 4.4, end: 4.8 },
    { text: "PLEASE", start: 4.8, end: 5.4 },
    { text: "EVERYONE.", start: 5.4, end: 6.2 },
    { text: "FIND", start: 6.6, end: 7.1 },
    { text: "THE", start: 7.1, end: 7.4 },
    { text: "ONE", start: 7.4, end: 7.9 },
    { text: "HIGH-VOLTAGE", start: 7.9, end: 8.8 },
    { text: "INSIGHT", start: 8.8, end: 9.6 },
    { text: "AND", start: 9.6, end: 10.0 },
    { text: "DOUBLE", start: 10.0, end: 10.7 },
    { text: "DOWN.", start: 10.7, end: 11.8 }
  ];

  // Simulation timer for interactive playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0;
          }
          return parseFloat((prev + 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Current active word
  const activeWordIndex = transcript.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end
  );

  return (
    <div className="relative py-12 md:py-20 overflow-hidden" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive 9:16 Style Engine Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            See How 1-Hour Podcasts Become <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">30-Second Viral Reels</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Real word-by-word synced animated captions, dynamic face tracking reframing, and automatic silence trimming.
          </p>
        </div>

        {/* Style Preset Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'podcast', label: '🎙️ Viral Podcast', hook: 'Punchy Yellow Karaoke' },
            { id: 'fast-paced', label: '⚡ Fast-Paced Viral', hook: 'Tight Cuts & Neon Highlights' },
            { id: 'motivational', label: '🔥 Motivational Bold', hook: 'Impact Boxed Subtitles' },
            { id: 'educational', label: '💡 Fact / Educational', hook: 'Clean Minimal Cards' }
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => setActivePreset(style.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activePreset === style.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                  : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{style.label}</span>
            </button>
          ))}
        </div>

        {/* Main Side-by-side: Source 16:9 vs Output 9:16 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Long Video Source (16:9) with AI Detection Markers */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl border border-purple-900/30 p-5 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Raw Input Video (16:9)</span>
              </div>
              <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                Full Episode: 48m 12s
              </span>
            </div>

            {/* Simulated 16:9 video frame */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80"
                alt="Source Podcast"
                className="w-full h-full object-cover filter brightness-75"
              />

              {/* Bounding box for 9:16 smart crop selection */}
              <div className="absolute inset-y-2 left-[32%] right-[32%] border-2 border-dashed border-purple-400 bg-purple-500/10 rounded-lg flex flex-col justify-between p-2 pointer-events-none">
                <div className="flex justify-between items-center text-[10px] text-purple-200 bg-black/60 px-1.5 py-0.5 rounded">
                  <span>Smart Reframe 9:16</span>
                  <Eye className="w-3 h-3 text-purple-300" />
                </div>
                <div className="text-center text-[10px] bg-purple-600/80 text-white font-bold py-0.5 rounded">
                  AI Speaker Tracking
                </div>
              </div>

              {/* Detected hook tag */}
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-purple-500/40 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                <div className="text-left">
                  <div className="text-[10px] text-amber-300 font-bold uppercase">Viral Hook Detected!</div>
                  <div className="text-xs text-white font-mono">08:14 - 08:26 (Viral Score: 98/100)</div>
                </div>
              </div>
            </div>

            {/* Audio Waveform & Trimming Visualization */}
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Scissors className="w-3.5 h-3.5 text-purple-400" />
                  Auto Silence Removal: <strong>3 pauses trimmed (-1.4s)</strong>
                </span>
                <span className="font-mono text-purple-300">08:14.2 ➔ 08:26.0</span>
              </div>
              <div className="h-6 w-full bg-slate-950 rounded-lg p-1 flex items-center gap-1 overflow-hidden">
                {Array.from({ length: 42 }).map((_, idx) => {
                  const isCurrent = idx > 15 && idx < 30;
                  const height = isCurrent ? Math.min(100, (idx % 5 + 3) * 15) : Math.min(40, (idx % 3 + 1) * 8);
                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isCurrent
                          ? 'bg-gradient-to-t from-purple-500 to-indigo-400'
                          : 'bg-slate-800 opacity-40'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Transformed 9:16 Vertical Reel Player */}
          <div className="lg:col-span-6 flex justify-center">
            {/* Phone Mockup Frame */}
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/16] rounded-[42px] p-3 bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 shadow-2xl border-4 border-slate-800 ring-1 ring-purple-500/20">
              {/* Notch */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
                <div className="w-2 h-2 rounded-full bg-indigo-900" />
              </div>

              {/* Phone Inner Display */}
              <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-slate-950 flex flex-col justify-between">
                {/* Background Video Simulator */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                    alt="Speaker Zoom Reframe"
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      activeWordIndex >= 0 && activeWordIndex % 4 === 0 ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {/* Dark gradient for caption readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85" />
                </div>

                {/* Top Overlay: Progress & Badges */}
                <div className="relative z-10 p-4 pt-6">
                  {/* Story Progress Bars */}
                  <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-white transition-all duration-100 ease-linear"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] text-white font-semibold">
                      <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{activePreset.toUpperCase()} REEL</span>
                    </div>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-black/80"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Intro Hook Banner Card */}
                  <div className="mt-3 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-md p-2 rounded-xl border border-white/20 text-center shadow-lg">
                    <p className="text-[10px] font-black tracking-wider text-amber-300 uppercase">
                      HOOK REVEALED 🤯
                    </p>
                    <p className="text-xs font-bold text-white line-clamp-1">
                      Why 99% Of Creators Fail At Short Video
                    </p>
                  </div>
                </div>

                {/* Center / Bottom: Word-by-Word Synced Animated Captions */}
                <div className="relative z-10 px-4 pb-14 text-center">
                  <div className="bg-black/70 backdrop-blur-md p-3.5 rounded-2xl border border-purple-500/30 shadow-2xl">
                    <div className="flex flex-wrap justify-center items-center gap-1.5">
                      {transcript.map((item, idx) => {
                        const isActive = idx === activeWordIndex;
                        const isPast = currentTime > item.end;

                        let styleClasses = 'text-slate-300 text-xs sm:text-sm font-bold transition-all duration-150';

                        if (activePreset === 'podcast') {
                          if (isActive) {
                            styleClasses = 'text-amber-300 font-extrabold text-sm sm:text-base scale-125 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-400 shadow-md animate-pulse';
                          } else if (isPast) {
                            styleClasses = 'text-white font-bold text-xs sm:text-sm';
                          }
                        } else if (activePreset === 'fast-paced') {
                          if (isActive) {
                            styleClasses = 'text-emerald-300 font-extrabold text-sm sm:text-base scale-125 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-400';
                          } else {
                            styleClasses = 'text-slate-200 text-xs sm:text-sm';
                          }
                        } else if (activePreset === 'motivational') {
                          if (isActive) {
                            styleClasses = 'text-white font-black text-sm sm:text-base uppercase bg-purple-600 px-2.5 py-0.5 rounded-md shadow-lg shadow-purple-600/50';
                          } else {
                            styleClasses = 'text-slate-300 text-xs sm:text-sm uppercase';
                          }
                        } else {
                          // Educational
                          if (isActive) {
                            styleClasses = 'text-cyan-300 font-extrabold text-sm sm:text-base underline underline-offset-4';
                          } else {
                            styleClasses = 'text-slate-200 text-xs sm:text-sm';
                          }
                        }

                        return (
                          <span key={idx} className={styleClasses}>
                            {item.text}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Play / Pause toggle bar */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300 px-1">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-1 hover:text-white"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 text-purple-400" /> : <Play className="w-3.5 h-3.5 text-purple-400" />}
                      <span>{isPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                    <span className="font-mono text-[10px] text-slate-400">
                      00:{currentTime.toFixed(1).padStart(4, '0')} / 00:12.0
                    </span>
                    <button
                      onClick={() => setCurrentTime(0)}
                      className="hover:text-white"
                      title="Replay from start"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner under Demo */}
        <div className="mt-12 text-center">
          <button
            onClick={onGetStarted}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/60 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <Crown className="w-4 h-4 text-amber-300" />
            <span>Generate Reels From Your Video — Free Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};
