import React, { useState } from 'react';
import { Flashlight, Volume2, VolumeX, BookOpen, Layers, Briefcase, Mail, Sliders, User as UserIcon, LogOut, ShieldCheck } from 'lucide-react';
import { User } from 'firebase/auth';
import { PWAInstallButton } from './PWAInstallButton';

interface TopNavProps {
  activeSection: 'services' | 'cases' | 'diary' | 'contact';
  onSelectSection: (section: 'services' | 'cases' | 'diary' | 'contact') => void;
  isFlashlightActive: boolean;
  onToggleFlashlight: () => void;
  isSoundscapeActive: boolean;
  onToggleSoundscape: () => void;
  soundscapeVolume?: number;
  onSoundscapeVolumeChange?: (vol: number) => void;
  user?: User | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
  isAdmin?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeSection,
  onSelectSection,
  isFlashlightActive,
  onToggleFlashlight,
  isSoundscapeActive,
  onToggleSoundscape,
  soundscapeVolume = 0.45,
  onSoundscapeVolumeChange,
  user,
  onSignIn,
  onSignOut,
  isAdmin
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070707]/90 backdrop-blur-xl border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Emblem & Wordmark */}
        <button
          onClick={() => onSelectSection('services')}
          className="flex items-center gap-3 text-left group cursor-pointer whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-[10px] overflow-hidden border border-red-900/60 shadow-lg shadow-black/90 relative shrink-0 group-hover:border-red-500 group-hover:scale-105 transition-all">
            <img
              src="/src/assets/images/brand_eye_icon_red_1792500242126.jpg"
              alt="I See Web People Brand Emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold font-cinema tracking-wider text-white group-hover:text-red-400 transition-colors uppercase">
              I See Web People
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase -mt-0.5">
              by shepdesign &middot; pwa
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <button
            onClick={() => onSelectSection('services')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeSection === 'services'
                ? 'text-white border-b-2 border-red-600'
                : 'hover:text-red-300'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => onSelectSection('cases')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeSection === 'cases'
                ? 'text-white border-b-2 border-red-600'
                : 'hover:text-red-300'
            }`}
          >
            Case Studies
          </button>
          <button
            onClick={() => onSelectSection('diary')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeSection === 'diary'
                ? 'text-white border-b-2 border-red-600'
                : 'hover:text-red-300'
            }`}
          >
            Séance Log
          </button>
          <button
            onClick={() => onSelectSection('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeSection === 'contact'
                ? 'text-white border-b-2 border-red-600'
                : 'hover:text-red-300'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Controls: Auth, Soundscape, Flashlight & PWA Install */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Ghostly Soundscape Ambient Toggle */}
          <div className="relative">
            <button
              onClick={onToggleSoundscape}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                isSoundscapeActive
                  ? 'bg-red-950/90 text-red-200 border-red-600 shadow-lg shadow-red-950/70 ring-1 ring-red-500/30'
                  : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
              title={isSoundscapeActive ? 'Mute Ghostly Atmospheric Hum' : 'Play Ghostly Ambient Soundscape (Low-Frequency Hum)'}
              aria-label="Toggle ghostly ambient soundscape"
            >
              {isSoundscapeActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  <span className="flex items-end gap-0.5 h-3 px-0.5" aria-hidden="true">
                    <span className="w-0.5 bg-red-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-2" />
                    <span className="w-0.5 bg-red-300 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-3" />
                    <span className="w-0.5 bg-red-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite_0.4s] h-1.5" />
                  </span>
                  <span className="hidden sm:inline font-mono text-[11px] text-red-300">Hum Active</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="hidden sm:inline font-mono text-[11px]">Soundscape</span>
                </>
              )}
            </button>

            {isSoundscapeActive && onSoundscapeVolumeChange && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVolumeSlider((prev) => !prev);
                }}
                className="hidden lg:inline-flex ml-1 p-1 rounded-lg text-zinc-400 hover:text-white border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
                title="Adjust Hum Intensity"
              >
                <Sliders className="w-3 h-3 text-red-400" />
              </button>
            )}

            {showVolumeSlider && isSoundscapeActive && onSoundscapeVolumeChange && (
              <div className="absolute right-0 top-full mt-2 w-48 p-3 rounded-xl bg-[#0c0c0c] border border-red-900/60 shadow-2xl z-50">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1.5">
                  <span className="uppercase text-red-400">Hum Resonance</span>
                  <span>{Math.round(soundscapeVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  value={soundscapeVolume}
                  onChange={(e) => onSoundscapeVolumeChange(parseFloat(e.target.value))}
                  className="w-full accent-red-600 bg-zinc-900 rounded-lg cursor-pointer h-1.5"
                />
                <p className="text-[9px] text-zinc-400 mt-1 font-mono">
                  55Hz sub-drone & pink room resonance
                </p>
              </div>
            )}
          </div>

          {/* Flashlight Beam Button */}
          <button
            onClick={onToggleFlashlight}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              isFlashlightActive
                ? 'bg-red-950/90 text-red-200 border-red-600 shadow-lg shadow-red-950/60'
                : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
            title="Toggle Red Flashlight Beam"
          >
            <Flashlight className={`w-3.5 h-3.5 ${isFlashlightActive ? 'text-red-400 animate-pulse' : 'text-zinc-500'}`} />
            <span className="hidden sm:inline">{isFlashlightActive ? 'Beam Active' : 'Lens'}</span>
          </button>

          {/* Firebase Authentication: Spirit Keeper Sign In */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(prev => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono border bg-red-950/40 border-red-900/70 text-red-200 hover:border-red-600 transition-all cursor-pointer"
                title={`Spirit Keeper: ${user.displayName || user.email}`}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Keeper" className="w-4 h-4 rounded-full border border-red-500" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                )}
                <span className="hidden sm:inline max-w-[90px] truncate">
                  {user.displayName?.split(' ')[0] || 'Keeper'}
                </span>
                {isAdmin && (
                  <span className="px-1 py-0.2 rounded text-[9px] bg-red-900/80 text-red-200 uppercase font-bold">Admin</span>
                )}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 p-3 rounded-xl bg-[#0e0e0e] border border-red-900/70 shadow-2xl z-50 space-y-2">
                  <div className="border-b border-zinc-900 pb-2">
                    <p className="text-xs font-semibold text-white truncate">{user.displayName || 'Spirit Keeper'}</p>
                    <p className="text-[10px] text-zinc-400 font-mono truncate">{user.email}</p>
                    {isAdmin && (
                      <p className="text-[10px] text-red-400 font-mono mt-1 font-semibold">Chief Keeper (shepdesign)</p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onSignOut?.();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" />
                    <span>Relinquish Seal (Sign Out)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border bg-zinc-950/70 text-zinc-300 border-zinc-800 hover:border-red-900/80 hover:text-white transition-all cursor-pointer font-mono"
              title="Sign in with Google to enter Spirit Keeper mode"
            >
              <UserIcon className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">Keeper Sign In</span>
            </button>
          )}

          <PWAInstallButton />
        </div>
      </div>

      {/* Mobile Touch Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-zinc-900 px-2 py-2 text-xs bg-[#080808]/95 backdrop-blur-md">
        <button
          onClick={() => onSelectSection('services')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'services'
              ? 'bg-red-950 text-red-200 font-semibold border border-red-900/60'
              : 'text-zinc-400'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Services</span>
        </button>
        <button
          onClick={() => onSelectSection('cases')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'cases'
              ? 'bg-red-950 text-red-200 font-semibold border border-red-900/60'
              : 'text-zinc-400'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work</span>
        </button>
        <button
          onClick={() => onSelectSection('diary')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'diary'
              ? 'bg-red-950 text-red-200 font-semibold border border-red-900/60'
              : 'text-zinc-400'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Séance</span>
        </button>
        <button
          onClick={() => onSelectSection('contact')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'contact'
              ? 'bg-red-950 text-red-200 font-semibold border border-red-900/60'
              : 'text-zinc-400'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact</span>
        </button>
      </div>
    </header>
  );
};
