import React from 'react';
import { UploadCloud, Sparkles, Sliders, Film } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <UploadCloud className="w-5 h-5 text-indigo-400" />,
      title: 'Upload or Paste Video',
      description: 'Upload your video (MP4/MOV) or input your YouTube episode link. The system extracts pristine 16kHz audio.'
    },
    {
      num: '02',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      title: 'Whisper AI Transcription',
      description: 'Whisper breaks down spoken words with millisecond timestamps and punctuation for flawless caption sync.'
    },
    {
      num: '03',
      icon: <Sliders className="w-5 h-5 text-fuchsia-400" />,
      title: 'AI Scores Viral Moments',
      description: 'The AI model ranks conversation segments based on hooks, punchlines, educational value, and storytelling.'
    },
    {
      num: '04',
      icon: <Film className="w-5 h-5 text-emerald-400" />,
      title: 'Render & Download MP4',
      description: 'FFmpeg automatically cuts boundaries, applies 9:16 reframe, renders animated subtitles, and gives you MP4 reels.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0a0b14] border-t border-purple-950/30" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Long Videos Become Viral Reels
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Automated from raw footage to published viral reels in four straightforward steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  {step.icon}
                </div>
                <span className="font-mono text-xl font-black text-purple-400/40">{step.num}</span>
              </div>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
