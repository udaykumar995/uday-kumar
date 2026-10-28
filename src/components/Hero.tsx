import React from 'react';
import { ArrowRight, Sparkles, Play, ShieldCheck, Flame, CheckCircle2, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  onGetStarted: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onExploreDemo }) => {
  const { user, demoLogin } = useAuth();

  return (
    <section className="relative pt-8 pb-14 sm:pt-16 sm:pb-20 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[500px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/20 to-fuchsia-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-purple-950/40 animate-in fade-in slide-in-from-bottom-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span>Next-Gen AI Viral Hook Detection Engine</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-300 flex items-center gap-1 font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-300" /> 7 Trendy Styles
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] max-w-5xl mx-auto">
          Convert Long Videos Into{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent underline decoration-purple-500/40 decoration-wavy decoration-2">
            Addictive Viral Reels
          </span>{' '}
          with AI
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
          Upload any podcast, interview, webinar, or YouTube link. ViralReels AI pinpoints the best moments,
          reframes to 9:16 vertical, generates animated karaoke subtitles, and exports mobile-ready MP4s.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
          {user ? (
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Open My Studio Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => demoLogin()}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-purple-900/50 hover:border-purple-500/50 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>1-Click Demo Login</span>
              </button>
            </>
          )}

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
            <span>Interactive Demo</span>
          </button>
        </div>

        {/* Feature Checks */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Real FFmpeg + Whisper Pipeline</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ready for Instagram, Shorts & TikTok</span>
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            { value: '10x', label: 'Faster Than Manual Editing', sub: 'Zero timeline scrubbing' },
            { value: '99.2%', label: 'Whisper Accuracy', sub: 'Word-level sync timestamps' },
            { value: '7 Styles', label: 'Trending Presets', sub: 'Podcast, Viral, Motivational' },
            { value: '1080p', label: 'Crisp 9:16 MP4 Export', sub: 'Mobile optimized encoding' }
          ].map((metric, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-purple-900/20 backdrop-blur-sm text-center hover:border-purple-500/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">{metric.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{metric.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
