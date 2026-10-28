import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveReelDemo } from './components/InteractiveReelDemo';
import { StyleShowcase } from './components/StyleShowcase';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { AuthModal, AuthView } from './components/AuthModal';
import { DashboardPreview } from './components/DashboardPreview';
import { CheckCircle2, ChevronRight, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'landing' | 'dashboard'>('landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthView>('login');

  const openAuth = (view: AuthView) => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  };

  const handleSelectPreset = (presetId: string) => {
    if (user) {
      setActiveTab('dashboard');
    } else {
      openAuth('signup');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c16] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Stage 1 Progress Banner */}
      <div className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-fuchsia-900/90 border-b border-purple-500/30 px-4 py-2 text-center text-xs font-semibold text-purple-200 flex items-center justify-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-white font-bold text-[10px] uppercase border border-purple-400/30">
          Stage 1 Complete
        </span>
        <span className="hidden sm:inline">•</span>
        <span>Responsive Landing Page + Complete Authentication & Firebase Engine</span>
        <button
          onClick={() => openAuth('firebase-config')}
          className="text-amber-300 underline font-bold hover:text-white ml-1 flex items-center gap-0.5"
        >
          <span>Android & Firebase Guide</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation */}
      <Navbar
        onOpenAuth={openAuth}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main View Router: Landing vs Dashboard */}
      <main className="flex-1">
        {activeTab === 'dashboard' && user ? (
          <DashboardPreview
            onOpenUploadWizard={() => setActiveTab('dashboard')}
            onOpenSettings={() => openAuth('firebase-config')}
          />
        ) : (
          <>
            <Hero
              onGetStarted={() => {
                if (user) {
                  setActiveTab('dashboard');
                } else {
                  openAuth('signup');
                }
              }}
              onExploreDemo={() => {
                const el = document.getElementById('demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <InteractiveReelDemo
              onGetStarted={() => {
                if (user) {
                  setActiveTab('dashboard');
                } else {
                  openAuth('signup');
                }
              }}
            />

            <StyleShowcase onSelectPreset={handleSelectPreset} />

            <Features />

            <HowItWorks />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenAuth={openAuth} />

      {/* Complete Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialView={authModalView}
        onAuthSuccess={() => {
          setActiveTab('dashboard');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
