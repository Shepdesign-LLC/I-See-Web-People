import React, { useState } from 'react';
import { Eye, Flashlight, BookOpen, ArrowRight, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useGhostlySoundscape } from './hooks/useGhostlySoundscape';
import { TopNav } from './components/TopNav';
import { FlashlightOverlay } from './components/FlashlightOverlay';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { SeanceLogDiary } from './components/SeanceLogDiary';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const { isOnline, simulatedOffline, toggleSimulatedOffline } = useOnlineStatus();
  const { isPlaying: isSoundscapeActive, volume: soundscapeVolume, toggleSoundscape, setVolume: setSoundscapeVolume } = useGhostlySoundscape();
  const [activeSection, setActiveSection] = useState<'services' | 'cases' | 'diary' | 'contact'>('services');
  const [isFlashlightActive, setIsFlashlightActive] = useState(false);

  const handleNavSelect = (section: 'services' | 'cases' | 'diary' | 'contact') => {
    setActiveSection(section);
    const targetMap: Record<string, string> = {
      services: 'services',
      cases: 'case-studies',
      diary: 'seance-log',
      contact: 'contact'
    };
    const el = document.getElementById(targetMap[section]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForContact = (_serviceTitle: string) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-[#e5e5e5] flex flex-col font-sans selection:bg-red-950 selection:text-red-200 ${isFlashlightActive ? 'flashlight-active' : ''}`}>
      {/* Crimson Flashlight Beam */}
      <FlashlightOverlay
        isActive={isFlashlightActive}
        onClose={() => setIsFlashlightActive(false)}
      />

      {/* Top Bar Header */}
      <TopNav
        activeSection={activeSection}
        onSelectSection={handleNavSelect}
        isFlashlightActive={isFlashlightActive}
        onToggleFlashlight={() => setIsFlashlightActive((prev) => !prev)}
        isSoundscapeActive={isSoundscapeActive}
        onToggleSoundscape={toggleSoundscape}
        soundscapeVolume={soundscapeVolume}
        onSoundscapeVolumeChange={setSoundscapeVolume}
      />

      {/* Main Content Area (PWA Optimized) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
        {/* Minimalist Hero Section with Depth, Shadows & Mystery */}
        <section className="relative rounded-3xl bg-[#0a0a0a] border border-red-950/60 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12">
          {/* Subtle Red Ambient Vignette */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-900/60 text-xs font-mono text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>I See Web People &middot; by shepdesign</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cinema tracking-wide text-white leading-[1.18]" style={{ textWrap: 'balance' }}>
                "They don't know they're lost. They just wander away."
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-editorial max-w-xl">
                Analytics platforms treat visitors like cold bounce numbers and anonymous server pings. 
                <strong className="text-white font-sans"> I See Web People</strong> is a dark, mysterious Progressive Web App crafted by <strong className="text-red-400 font-sans">shepdesign</strong>. 
                We see the living human souls behind the screen before they dissolve into the dark.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-950 hover:bg-red-900 border border-red-800 transition-all shadow-xl shadow-black flex items-center gap-2 cursor-pointer font-cinema tracking-wider"
                >
                  <span>Summon shepdesign</span>
                  <ArrowRight className="w-4 h-4 text-red-400" />
                </a>

                <a
                  href="#seance-log"
                  className="px-5 py-3 rounded-xl text-xs sm:text-sm font-medium text-zinc-300 bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 transition-all flex items-center gap-2 cursor-pointer font-mono"
                >
                  <BookOpen className="w-4 h-4 text-red-400" />
                  <span>Séance Log</span>
                </a>

                <button
                  onClick={toggleSoundscape}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border transition-all flex items-center gap-2 cursor-pointer font-mono ${
                    isSoundscapeActive
                      ? 'text-red-200 bg-red-950/80 border-red-700 shadow-lg shadow-red-950/40'
                      : 'text-zinc-400 bg-zinc-950/60 hover:bg-zinc-900 border-zinc-800 hover:text-zinc-200'
                  }`}
                  title="Toggle Ambient Spectral Hum"
                >
                  {isSoundscapeActive ? (
                    <Volume2 className="w-4 h-4 text-red-400 animate-pulse" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-zinc-500" />
                  )}
                  <span>{isSoundscapeActive ? 'Ambient Hum Active' : 'Atmospheric Hum'}</span>
                </button>

                <button
                  onClick={() => setIsFlashlightActive((prev) => !prev)}
                  className="px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-900/60 transition-all flex items-center gap-2 cursor-pointer font-mono"
                >
                  <Flashlight className="w-4 h-4 text-red-400" />
                  <span>{isFlashlightActive ? 'Extinguish Lens' : 'Illuminate Lens'}</span>
                </button>
              </div>

              {/* Proof Strip */}
              <div className="pt-5 border-t border-zinc-900 flex flex-wrap items-center gap-6 text-xs text-zinc-500 font-mono">
                <div>
                  <span className="font-bold text-white tabular-nums">1,420+</span>
                  <span className="ml-1 text-zinc-400">Recovered Spirits</span>
                </div>
                <span aria-hidden="true">&middot;</span>
                <div>
                  <span className="font-bold text-red-400 tabular-nums">100%</span>
                  <span className="ml-1 text-zinc-400">Offline PWA Resilience</span>
                </div>
                <span aria-hidden="true">&middot;</span>
                <div>
                  <span className="font-bold text-white tabular-nums">0.3s</span>
                  <span className="ml-1 text-zinc-400">Instant Cache Load</span>
                </div>
              </div>
            </div>

            {/* Hero Visual: Minimalist Depth Emblem Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group">
                {/* Backlight Depth Glow */}
                <div className="absolute -inset-4 bg-red-950/40 rounded-[48px] blur-2xl group-hover:blur-3xl transition-all opacity-90" />
                
                {/* Minimalist iOS Icon Squircle */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-[44px] overflow-hidden border border-red-950/80 shadow-2xl shadow-black bg-black">
                  <img
                    src="/src/assets/images/brand_eye_icon_red_1792500242126.jpg"
                    alt="I See Web People - Minimalist Dark Brand Emblem by shepdesign"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                    Obsidian & Ember Eye &middot; shepdesign
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Services */}
        <div id="services">
          <ServicesSection onSelectServiceForContact={handleSelectServiceForContact} />
        </div>

        {/* Section 2: Case Studies */}
        <div id="case-studies">
          <CaseStudiesSection />
        </div>

        {/* Section 3: Séance Log & Spirit Radar */}
        <div id="seance-log">
          <SeanceLogDiary />
        </div>

        {/* Section 4: Summon shepdesign (Contact) */}
        <div id="contact">
          <ContactSection isOnline={isOnline} />
        </div>
      </main>

      {/* Offline Status Floating Pill & Simulation Toggle */}
      <OfflineIndicator
        isOnline={isOnline}
        simulatedOffline={simulatedOffline}
        onToggleSimulatedOffline={toggleSimulatedOffline}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-[#060606] py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-red-900/60">
              <img
                src="/src/assets/images/brand_eye_icon_red_1792500242126.jpg"
                alt="Emblem"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold font-cinema uppercase tracking-wider text-white">
                I See Web People
              </p>
              <p className="text-xs text-zinc-400 font-mono">
                Crafted by shepdesign &middot; Progressive Web App
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono">
            <button
              onClick={toggleSoundscape}
              className="hover:text-red-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5 text-red-500" />
              <span>{isSoundscapeActive ? 'Atmospheric Hum: On' : 'Atmospheric Hum: Off'}</span>
            </button>
            <span aria-hidden="true">&middot;</span>
            <span className="text-zinc-400">Red & Black Aesthetic</span>
            <span aria-hidden="true">&middot;</span>
            <span className="text-red-500/80 font-bold">Sixth Sense Design</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
