import React, { useState } from 'react';
import {
  UploadCloud,
  Youtube,
  Sparkles,
  Flame,
  ShieldCheck,
  AlertTriangle,
  Play,
  Download,
  Clock,
  Scissors,
  CheckCircle2,
  Film,
  LogOut,
  FolderOpen,
  Settings,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DashboardPreviewProps {
  onOpenUploadWizard: () => void;
  onOpenSettings: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  onOpenUploadWizard,
  onOpenSettings
}) => {
  const { user, logout, sendVerificationEmail, verifyCurrentEmail } = useAuth();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedAspect, setSelectedAspect] = useState<'9:16' | '16:9' | 'original'>('9:16');
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Sample seed clips for realistic demonstration
  const [clips] = useState([
    {
      id: 'clip_01',
      title: 'How Great Founders Pivot Under Pressure',
      source: 'All-In Tech Summit 2026',
      duration: '00:32',
      style: 'Viral Podcast',
      viralScore: 98,
      aspect: '9:16 Vertical',
      date: 'Today, 2:15 PM',
      thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'clip_02',
      title: 'The Uncomfortable Truth About High Achievers',
      source: 'Modern Wisdom Episode #712',
      duration: '00:44',
      style: 'Fast-Paced Viral',
      viralScore: 94,
      aspect: '9:16 Vertical',
      date: 'Yesterday',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
    }
  ]);

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatusMessage('Initiating audio extraction and Whisper speech indexing...');
    setTimeout(() => {
      setStatusMessage('Detecting high-voltage hooks and scoring conversational segments...');
      setTimeout(() => {
        setIsProcessing(false);
        setStatusMessage('AI Clip generation pipeline ready for Stage 3 & 4!');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Verification banner if user email is not yet verified */}
        {user && !user.emailVerified && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-200">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold">Email Verification Pending:</span> Please verify{' '}
                <strong className="text-white">{user.email}</strong> to ensure uninterrupted project backups.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={async () => {
                  const res = await sendVerificationEmail();
                  alert(res.message);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-amber-200 font-semibold"
              >
                Resend Email
              </button>
              <button
                onClick={() => verifyCurrentEmail()}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Mark Verified</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-purple-900/30 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-fuchsia-600 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-purple-500/30">
              {user ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Welcome, {user?.name || 'Creator'}!
                </h1>
                {user?.emailVerified ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Verified Creator
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                    Free Tier
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Account ID: <span className="font-mono text-purple-300">{user?.id || 'demo_guest'}</span> • Authenticated via {user?.provider === 'firebase' ? 'Google Firebase' : 'Secure Session'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSettings}
              className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Auth & Settings</span>
            </button>
            <button
              onClick={() => logout()}
              className="px-3.5 py-2 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-300 hover:bg-rose-900/60 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Creator Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Reels Created', val: '8 Clips', sub: 'Last 7 days', icon: <Film className="w-4 h-4 text-purple-400" /> },
            { label: 'Average Viral Score', val: '96/100', sub: 'High engagement index', icon: <Flame className="w-4 h-4 text-amber-400" /> },
            { label: 'Time Saved Editing', val: '6.4 hrs', sub: 'Whisper + FFmpeg batching', icon: <Clock className="w-4 h-4 text-emerald-400" /> },
            { label: 'Active Pipeline', val: 'Fast Whisper AI', sub: 'Model Ready', icon: <Sparkles className="w-4 h-4 text-indigo-400" /> }
          ].map((stat, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{stat.val}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Video Upload & YouTube Ingestion Workspace */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-purple-900/40 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-purple-400" />
                <span>Create New Viral Reels</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload your video file (up to 500MB) or paste a YouTube URL to extract top highlights.
              </p>
            </div>
          </div>

          <form onSubmit={handleSimulateUpload} className="space-y-6">
            {/* Drag & Drop Upload Zone */}
            <div className="border-2 border-dashed border-purple-800/60 hover:border-purple-500/80 rounded-2xl p-8 sm:p-12 text-center bg-purple-950/10 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-purple-500/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Drag and drop your video file here, or <span className="text-purple-400 underline">browse device</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Supports MP4, MOV, MKV, WebM up to 500MB (16:9 or any aspect ratio)
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Auto Face Tracking
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Whisper Subtitles
                </span>
              </div>
            </div>

            {/* Alternative: YouTube Link */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Youtube className="w-4 h-4 text-rose-500 absolute left-3.5 top-3.5" />
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="Or paste YouTube video link (e.g., https://youtube.com/watch?v=...)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Duration dropdown */}
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(Number(e.target.value))}
                  className="px-3 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none"
                >
                  <option value={15}>15 sec clips</option>
                  <option value={30}>30 sec clips</option>
                  <option value={45}>45 sec clips</option>
                  <option value={60}>60 sec clips</option>
                </select>

                {/* Aspect ratio */}
                <select
                  value={selectedAspect}
                  onChange={(e) => setSelectedAspect(e.target.value as any)}
                  className="px-3 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none"
                >
                  <option value="9:16">9:16 Vertical</option>
                  <option value="16:9">16:9 Landscape</option>
                  <option value="original">Original Aspect</option>
                </select>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isProcessing ? 'Processing...' : 'Detect Viral Clips'}</span>
                </button>
              </div>
            </div>

            {statusMessage && (
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/50 text-xs text-purple-200 flex items-center gap-2 animate-in fade-in">
                <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                <span>{statusMessage}</span>
              </div>
            )}
          </form>
        </div>

        {/* My Saved Clips Library */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-indigo-400" />
                <span>My Saved Clips Library</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Clips generated and stored under your account with word-level subtitle tracks.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40">
              {clips.length} Saved Clips
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clips.map((clip) => (
              <div
                key={clip.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col sm:flex-row gap-4"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-32 aspect-[9/16] sm:aspect-square rounded-xl overflow-hidden bg-slate-950 shrink-0">
                  <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-purple-600/90 flex items-center justify-center shadow">
                      <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 text-[10px] font-mono bg-black/80 px-1 rounded text-white">
                    {clip.duration}
                  </span>
                </div>

                {/* Metadata */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/30">
                        {clip.style}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-300" />
                        {clip.viralScore}/100
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mt-1.5 line-clamp-2">{clip.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">Source: {clip.source}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">{clip.date}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Downloading MP4 for "${clip.title}"...`)}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 text-xs shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download MP4</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
