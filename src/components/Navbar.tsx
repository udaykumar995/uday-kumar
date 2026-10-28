import React, { useState } from 'react';
import { Sparkles, Video, Menu, X, LogIn, UserPlus, LogOut, ShieldCheck, Flame, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenAuth: (view: 'login' | 'signup' | 'forgot' | 'firebase-config') => void;
  activeTab: 'landing' | 'dashboard';
  setActiveTab: (tab: 'landing' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, activeTab, setActiveTab }) => {
  const { user, logout, isFirebaseConfigured, authMode, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0b0c16]/85 border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
            <Video className="w-5 h-5 text-white transform -rotate-6 group-hover:rotate-0 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0b0c16] flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-slate-950" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
                ViralReels<span className="text-purple-400">.ai</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 hidden xs:inline-block">
                Beta
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">AI Long-to-Short Clips Studio</p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#demo" className="hover:text-purple-300 transition-colors">
            Interactive Demo
          </a>
          <a href="#styles" className="hover:text-purple-300 transition-colors">
            Trending Styles
          </a>
          <a href="#features" className="hover:text-purple-300 transition-colors">
            AI Pipeline
          </a>
          <a href="#how-it-works" className="hover:text-purple-300 transition-colors">
            How It Works
          </a>

          {/* Engine indicator pill */}
          <button
            onClick={() => onOpenAuth('firebase-config')}
            title="Configure or inspect Firebase / Local Auth Engine"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-slate-900/80 border border-purple-500/30 text-slate-300 hover:border-purple-400/60 transition-colors"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isFirebaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="font-mono text-[11px]">
              {isFirebaseConfigured ? 'Firebase Active' : 'Local Auth (Config)'}
            </span>
            <Settings className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab(activeTab === 'dashboard' ? 'landing' : 'dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                    : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800'
                }`}
              >
                {activeTab === 'dashboard' ? 'View Landing' : 'Go to Dashboard'}
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                    <span className="truncate max-w-[110px]">{user.name}</span>
                    {user.emailVerified && (
                      <span title="Email Verified">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[110px]">{user.email}</div>
                </div>
                <button
                  onClick={() => logout()}
                  title="Sign Out"
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => demoLogin()}
                className="px-3 py-2 rounded-xl text-xs font-medium bg-purple-950/40 text-purple-300 border border-purple-800/50 hover:bg-purple-900/50 hover:text-white transition-all flex items-center gap-1.5"
                title="Log in immediately with pre-configured creator account"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Demo Creator</span>
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-purple-400" />
                <span>Log In</span>
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Get Started Free</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {!user && (
            <button
              onClick={() => demoLogin()}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-purple-950/50 text-purple-200 border border-purple-800/60 flex items-center gap-1"
            >
              <Flame className="w-3 h-3 text-amber-400" />
              <span>Demo</span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl bg-slate-900/80 text-slate-300 border border-purple-900/40"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-900/40 bg-[#0d0e1d] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <span className="text-xs text-slate-400">Authentication Mode:</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('firebase-config');
              }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-slate-900 border border-purple-500/40 text-purple-300"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isFirebaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{isFirebaseConfigured ? 'Firebase' : 'Local Auth'}</span>
              <Settings className="w-2.5 h-2.5 ml-0.5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-sm text-slate-300">
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              Interactive Demo
            </a>
            <a
              href="#styles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              Trending Styles
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              AI Highlight Pipeline
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              How It Works
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            {user ? (
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200 flex items-center gap-1">
                        {user.name}
                        {user.emailVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/30"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveTab(activeTab === 'dashboard' ? 'landing' : 'dashboard');
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-600 text-white shadow"
                >
                  {activeTab === 'dashboard' ? 'Return to Landing Page' : 'Open User Dashboard'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-white flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-purple-400" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
