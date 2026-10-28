import React from 'react';
import { Sparkles, BrainCircuit, Mic2, Scissors, Crop, Download, ShieldCheck, Cpu } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
      title: 'AI Highlight & Hook Detection',
      description: 'Scores segments for emotional peaks, viral hooks, surprising facts, and mini-stories without random timestamps.'
    },
    {
      icon: <Mic2 className="w-6 h-6 text-pink-400" />,
      title: 'Whisper Word-Level Timestamps',
      description: 'Transcribes every spoken word with precise millisecond accuracy for frame-synchronized animated karaoke subtitles.'
    },
    {
      icon: <Crop className="w-6 h-6 text-indigo-400" />,
      title: '9:16 Smart Face Reframing',
      description: 'Automatically detects speaker faces in horizontal 16:9 frames and tracks them into vertical 9:16 without distortion.'
    },
    {
      icon: <Scissors className="w-6 h-6 text-emerald-400" />,
      title: 'Smart Silence Removal',
      description: 'Eliminates dead pauses, awkward breaths, and hesitation to deliver high-retention, snappy reels.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      title: 'FFmpeg Video Render Engine',
      description: 'Burns subtitles into crisp H.264/MP4 video files optimized for mobile social feeds and fast playback.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: 'Secure Per-User Account & Library',
      description: 'Firebase Authentication and encrypted project metadata. Only you can access, edit, or download your saved clips.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Architecture & Technology</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built with Real AI, Not Decorative Mockups
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            A production-ready pipeline combining Whisper transcription, Gemini AI semantic scoring, and FFmpeg subtitle burning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-purple-900/30 hover:border-purple-500/50 transition-all hover:translate-y-[-2px] group"
            >
              <div className="p-3 w-fit rounded-xl bg-slate-950 border border-white/5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
