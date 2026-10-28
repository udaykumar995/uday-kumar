import React from 'react';
import { Video, Heart, Shield, Sparkles, Smartphone, Github } from 'lucide-react';

export const Footer: React.FC<{ onOpenAuth: (view: any) => void }> = ({ onOpenAuth }) => {
  return (
    <footer className="bg-[#070810] border-t border-purple-950/40 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                <Video className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                ViralReels<span className="text-purple-400">.ai</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              AI-driven long-form video repurposing studio. Built for creators turning 1-hour episodes into high-voltage vertical reels.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Smartphone className="w-3.5 h-3.5 text-purple-400" />
              <span>Optimized for Android & Touch Screens</span>
            </div>
          </div>

          {/* Engine & Tools */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">AI Pipeline</h4>
            <ul className="space-y-2">
              <li><a href="#demo" className="hover:text-purple-300 transition-colors">Whisper Transcription</a></li>
              <li><a href="#demo" className="hover:text-purple-300 transition-colors">9:16 Smart Reframer</a></li>
              <li><a href="#styles" className="hover:text-purple-300 transition-colors">7 Trending Reel Styles</a></li>
              <li><a href="#features" className="hover:text-purple-300 transition-colors">Karaoke Subtitle Engine</a></li>
            </ul>
          </div>

          {/* Navigation & Account */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Creator Hub</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onOpenAuth('login')} className="hover:text-purple-300 text-left">Creator Sign In</button></li>
              <li><button onClick={() => onOpenAuth('signup')} className="hover:text-purple-300 text-left">Free Registration</button></li>
              <li><button onClick={() => onOpenAuth('forgot')} className="hover:text-purple-300 text-left">Reset Password</button></li>
              <li><button onClick={() => onOpenAuth('firebase-config')} className="hover:text-purple-300 text-left">Firebase & Android Setup</button></li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Security & Legal</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-400" /> <span>End-to-End User Isolation</span></li>
              <li><span className="text-slate-500">Video Ownership Guaranteed</span></li>
              <li><span className="text-slate-500">Terms of Service & Privacy</span></li>
              <li><span className="text-slate-500">DMCA Copyright Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} ViralReels AI. All rights reserved. Stage 1 Production Build.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Android Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
