import React, { useState } from 'react';
import { Mic, Zap, Film, BookOpen, Flame, Sparkles, Gamepad2, Check, ArrowRight } from 'lucide-react';

interface StylePreset {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  aspect: string;
  captionType: string;
  pacing: string;
  description: string;
  color: string;
  sampleHook: string;
}

export const StyleShowcase: React.FC<{ onSelectPreset: (id: string) => void }> = ({ onSelectPreset }) => {
  const [selectedId, setSelectedId] = useState<string>('podcast');

  const presets: StylePreset[] = [
    {
      id: 'podcast',
      name: 'Viral Podcast Style',
      badge: 'Most Popular',
      icon: <Mic className="w-5 h-5 text-amber-400" />,
      aspect: '9:16 Vertical',
      captionType: 'Word-by-word Karaoke (Yellow & White)',
      pacing: 'Speaker reframing & punch-in zooms',
      description: 'Ideal for interviews, long-form talks, and 2-person podcasts. Keeps the active speaker center-stage with punchy high-contrast captions.',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40',
      sampleHook: '"The 1 thing billionaires never do before 9 AM..."'
    },
    {
      id: 'fast-paced',
      name: 'Fast-Paced Viral Style',
      badge: 'High Retention',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      aspect: '9:16 Vertical',
      captionType: 'Neon Green Pop-Up Subtitles',
      pacing: 'Zero Dead-Air Silence Removal & Jump Cuts',
      description: 'Cuts every millisecond of dead silence. Fast cuts with kinetic caption bursts keep viewers locked to the screen on TikTok and Reels.',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40',
      sampleHook: '"Stop scrolling! This 10-second hack will save you $400."'
    },
    {
      id: 'cinematic',
      name: 'Cinematic Storytelling',
      badge: 'Documentary',
      icon: <Film className="w-5 h-5 text-indigo-400" />,
      aspect: '9:16 or Original',
      captionType: 'Serif / Clean Subtitles with Letterbox',
      pacing: 'Deliberate story-focused rhythm & soft fades',
      description: 'Designed for narrative clips, travel videos, founder origins, and cinematic reels where emotion and atmosphere matter most.',
      color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/40',
      sampleHook: '"In 2018, everything collapsed. Here is what I did next."'
    },
    {
      id: 'educational',
      name: 'Educational / Facts Style',
      badge: 'Knowledge',
      icon: <BookOpen className="w-5 h-5 text-sky-400" />,
      aspect: '9:16 Vertical',
      captionType: 'Title Cards + Section Highlight Bullets',
      pacing: 'Structured facts with visual emphasis',
      description: 'Emphasizes key terms and data points without distorting context. Features clean card callouts and topic banners for clear teaching.',
      color: 'from-sky-500/20 to-blue-500/10 border-sky-500/40',
      sampleHook: '"3 Neuroscientific facts about deep sleep you did not know."'
    },
    {
      id: 'motivational',
      name: 'Motivational Style',
      badge: 'Inspiring',
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      aspect: '9:16 Vertical',
      captionType: 'Bold Impact All-Caps Boxed Subtitles',
      pacing: 'Dramatic audio swells & intense punch-ins',
      description: 'Punchy pacing for speeches, workout clips, entrepreneur advice, and quotes. Every statement carries weight and resonance.',
      color: 'from-rose-500/20 to-red-500/10 border-rose-500/40',
      sampleHook: '"Your comfort zone is where dreams go to die."'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean Style',
      badge: 'Aesthetic',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      aspect: '9:16 or 16:9',
      captionType: 'Subtle lower-third sans-serif typography',
      pacing: 'Restrained, natural pauses preserved',
      description: 'Understated elegance for luxury brands, design reviews, lifestyle creators, and coding tutorials who prefer zero visual clutter.',
      color: 'from-purple-500/20 to-violet-500/10 border-purple-500/40',
      sampleHook: '"Simplicity is the ultimate sophistication in software."'
    },
    {
      id: 'gaming',
      name: 'Gaming / High-Energy',
      badge: 'Hyper-Action',
      icon: <Gamepad2 className="w-5 h-5 text-fuchsia-400" />,
      aspect: '9:16 Split Screen',
      captionType: 'Comic Sans / Action Glow with Sound FX Markers',
      pacing: 'Dynamic facecam crop + gameplay action lock',
      description: 'Preserves the clutch moment while placing streamer facecam up top and game action at bottom with dynamic impact shakes.',
      color: 'from-fuchsia-500/20 to-pink-500/10 border-fuchsia-500/40',
      sampleHook: '"There is NO WAY he just hit that 1v4 clutch with 1 HP!"'
    }
  ];

  const activePreset = presets.find((p) => p.id === selectedId) || presets[0];

  return (
    <section className="py-14 sm:py-24 bg-[#0d0e1d]/90 relative border-t border-purple-950/40" id="styles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Flame className="w-3.5 h-3.5 text-purple-400" />
            <span>Section 5 — Trending Reels Style Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            7 Modular Short-Video Presets Designed for Every Genre
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Select manual styles or let <strong className="text-purple-300">Auto Trend Style</strong> automatically detect pacing, speaker count, and audio energy.
          </p>
        </div>

        {/* Preset Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3 mb-8">
          {presets.map((preset) => {
            const isSelected = preset.id === selectedId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedId(preset.id)}
                className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? `bg-slate-900 border-purple-500 shadow-lg shadow-purple-500/20 ring-1 ring-purple-400/50`
                    : `bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-slate-700`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-white/5">
                    {preset.icon}
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">{preset.badge}</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-1">{preset.name}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Card for Selected Preset */}
        <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${activePreset.color} bg-slate-900/90 border shadow-2xl transition-all duration-300`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 shadow-inner">
                  {activePreset.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">{activePreset.name}</h3>
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {activePreset.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Preset Specifications & Template Rules</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activePreset.description}
              </p>

              {/* Specs breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Framing & Aspect</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">{activePreset.aspect}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Captions Engine</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5 line-clamp-1">{activePreset.captionType}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Pacing & Cuts</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5 line-clamp-1">{activePreset.pacing}</div>
                </div>
              </div>

              {/* Sample Hook text */}
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-start gap-3">
                <span className="text-xs font-black uppercase text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
                  Hook Example
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-100 italic">
                  {activePreset.sampleHook}
                </span>
              </div>
            </div>

            {/* Right side interactive button */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center text-center p-6 bg-slate-950/60 rounded-2xl border border-white/5">
              <Sparkles className="w-10 h-10 text-purple-400 mb-3" />
              <h4 className="text-base font-bold text-white">Generate Clips with {activePreset.name}</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Upload your video or paste a YouTube URL to test this preset with real Whisper transcription and automatic formatting.
              </p>
              <button
                onClick={() => onSelectPreset(activePreset.id)}
                className="mt-5 w-full max-w-xs py-3 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:scale-102 transition-transform flex items-center justify-center gap-2"
              >
                <span>Select & Start Reel Generation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
