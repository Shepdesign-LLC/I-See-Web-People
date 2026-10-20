import React, { useState, useEffect, useRef } from 'react';
import { Compass, Eye, Ghost, Sparkles, Filter, Play, Pause, RotateCw, Radio, MapPin, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { SeanceSpiritEntry, INITIAL_SPIRITS } from './SeanceLogDiary';

interface SpiritPathNode {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  type: 'entry' | 'waypoint' | 'hesitation' | 'recovery';
}

export interface RadarSpirit extends SeanceSpiritEntry {
  x: number;
  y: number;
  azimuth: number; // angle in degrees 0-360
  distance: number; // radius in percentage
  path: SpiritPathNode[];
  lastPingTime: number;
}

const DEFAULT_RADAR_SPIRITS: RadarSpirit[] = [
  {
    ...INITIAL_SPIRITS[0],
    x: 68,
    y: 38,
    azimuth: 42,
    distance: 62,
    lastPingTime: 0,
    path: [
      { x: 24, y: 18, label: 'Entry: /home', type: 'entry' },
      { x: 38, y: 26, label: 'Scroll: /services', type: 'waypoint' },
      { x: 54, y: 32, label: 'Hesitation: 3m 48s', type: 'hesitation' },
      { x: 68, y: 38, label: 'Recovered: /services/web-systems', type: 'recovery' }
    ]
  },
  {
    ...INITIAL_SPIRITS[1],
    x: 32,
    y: 72,
    azimuth: 215,
    distance: 58,
    lastPingTime: 0,
    path: [
      { x: 78, y: 24, label: 'Entry: /case-studies', type: 'entry' },
      { x: 60, y: 44, label: 'Dwell: Coffee Showcase', type: 'waypoint' },
      { x: 44, y: 60, label: 'Form Abandonment', type: 'hesitation' },
      { x: 32, y: 72, label: 'Manifested: Offline PWA Cart', type: 'recovery' }
    ]
  },
  {
    ...INITIAL_SPIRITS[2],
    x: 74,
    y: 76,
    azimuth: 135,
    distance: 72,
    lastPingTime: 0,
    path: [
      { x: 18, y: 78, label: 'Entry: /work', type: 'entry' },
      { x: 36, y: 64, label: 'Architectural Plates', type: 'waypoint' },
      { x: 56, y: 70, label: 'Rage Click Hotspot', type: 'hesitation' },
      { x: 74, y: 76, label: 'Reclaimed: Active Retainer', type: 'recovery' }
    ]
  },
  {
    ...INITIAL_SPIRITS[3],
    x: 28,
    y: 30,
    azimuth: 310,
    distance: 65,
    lastPingTime: 0,
    path: [
      { x: 82, y: 82, label: 'Entry: /checkout', type: 'entry' },
      { x: 62, y: 64, label: 'Cart Inspection', type: 'waypoint' },
      { x: 42, y: 42, label: 'Field Inactivity: 2m', type: 'hesitation' },
      { x: 28, y: 30, label: 'Recovered: Ghost Beacon', type: 'recovery' }
    ]
  }
];

interface SpiritRadarProps {
  onSelectSpirit?: (spirit: SeanceSpiritEntry) => void;
  externalSpirits?: SeanceSpiritEntry[];
}

export const SpiritRadar: React.FC<SpiritRadarProps> = ({
  onSelectSpirit,
  externalSpirits
}) => {
  const [spirits, setSpirits] = useState<RadarSpirit[]>(DEFAULT_RADAR_SPIRITS);
  const [selectedSpiritId, setSelectedSpiritId] = useState<string>(DEFAULT_RADAR_SPIRITS[0].id);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanSpeed, setScanSpeed] = useState<'normal' | 'fast' | 'slow'>('normal');
  const [filterType, setFilterType] = useState<string>('all');
  const [pulseCount, setPulseCount] = useState<number>(0);
  const [showAllPaths, setShowAllPaths] = useState<boolean>(true);
  const [activePingId, setActivePingId] = useState<string | null>(null);

  // Sync external spirit additions if any
  useEffect(() => {
    if (externalSpirits && externalSpirits.length > 0) {
      const merged = externalSpirits.map((ext, idx) => {
        const existing = DEFAULT_RADAR_SPIRITS.find(s => s.id === ext.id);
        if (existing) return existing;
        // Generate coordinates for new custom spirit
        const angle = (idx * 75 + 45) % 360;
        const dist = 35 + ((idx * 23) % 45);
        const rad = (angle * Math.PI) / 180;
        const x = Math.round(50 + dist * 0.45 * Math.cos(rad));
        const y = Math.round(50 + dist * 0.45 * Math.sin(rad));
        return {
          ...ext,
          x,
          y,
          azimuth: angle,
          distance: dist,
          lastPingTime: 0,
          path: [
            { x: 50, y: 50, label: 'Center Threshold', type: 'entry' as const },
            { x: Math.round((50 + x) / 2), y: Math.round((50 + y) / 2), label: 'Transit Path', type: 'waypoint' as const },
            { x, y, label: `Inscribed: ${ext.pageHaunted}`, type: 'recovery' as const }
          ]
        };
      });
      setSpirits(merged);
    }
  }, [externalSpirits]);

  // Periodic simulated radar ping detection
  useEffect(() => {
    if (!isScanning) return;
    const intervalTime = scanSpeed === 'fast' ? 1200 : scanSpeed === 'slow' ? 3200 : 2000;
    const interval = setInterval(() => {
      setSpirits(prev => {
        if (prev.length === 0) return prev;
        const randIdx = Math.floor(Math.random() * prev.length);
        const target = prev[randIdx];
        setActivePingId(target.id);
        setTimeout(() => setActivePingId(null), 1400);
        return prev;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isScanning, scanSpeed]);

  const handleManualSonarPulse = () => {
    setPulseCount(prev => prev + 1);
    setActivePingId('all');
    setTimeout(() => setActivePingId(null), 1800);
  };

  const selectedSpirit = spirits.find(s => s.id === selectedSpiritId) || spirits[0];

  const filteredSpirits = spirits.filter(s => {
    if (filterType === 'all') return true;
    return s.spiritStatus === filterType;
  });

  const getSweepDuration = () => {
    switch (scanSpeed) {
      case 'fast': return '3s';
      case 'slow': return '10s';
      case 'normal':
      default: return '6s';
    }
  };

  return (
    <div className="rounded-2xl border border-red-950/80 bg-[#090909] p-4 sm:p-6 shadow-2xl relative overflow-hidden space-y-6">
      {/* Top Header of Spirit Radar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-red-500 uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>Spectral Grid Telemetry &middot; 432 Hz</span>
            <span aria-hidden="true">&middot;</span>
            <span className="text-zinc-400">shepdesign</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-cinema tracking-wide text-white mt-1">
            Spirit Radar &middot; Ghostly Visitor Paths
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-editorial text-base max-w-xl">
            Simulating live infrared detection across web paths. Observe wanderings, hesitation thresholds, and the exact coordinates where lost visitors were salvaged.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsScanning(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
              isScanning
                ? 'bg-red-950 text-red-200 border-red-800 shadow-md shadow-black'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            {isScanning ? <Pause className="w-3 h-3 text-red-400" /> : <Play className="w-3 h-3 text-zinc-400" />}
            <span>{isScanning ? 'Scanner Active' : 'Scanner Paused'}</span>
          </button>

          <button
            onClick={handleManualSonarPulse}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-red-950/40 hover:bg-red-950 border border-red-900/60 text-red-300 hover:text-white transition-all shadow-md cursor-pointer"
            title="Emit omnidirectional spectral sonar pulse"
          >
            <Sparkles className="w-3 h-3 text-red-400" />
            <span>Transmit Sonar Pulse</span>
          </button>
        </div>
      </div>

      {/* Main Radar Layout: Grid Viewport + Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: The Scanning Radar Display (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[460px] rounded-full border-2 border-red-900/60 bg-[#060606] shadow-2xl shadow-black overflow-hidden flex items-center justify-center select-none">
            {/* Concentric Range Rings */}
            <div className="absolute inset-0 rounded-full border border-red-950/40 pointer-events-none" />
            <div className="absolute w-3/4 h-3/4 rounded-full border border-red-900/30 pointer-events-none" />
            <div className="absolute w-1/2 h-1/2 rounded-full border border-red-900/40 pointer-events-none" />
            <div className="absolute w-1/4 h-1/4 rounded-full border border-red-900/50 pointer-events-none" />

            {/* Radar Crosshairs (Azimuth Axes) */}
            <div className="absolute w-full h-[1px] bg-red-900/30 pointer-events-none" />
            <div className="absolute h-full w-[1px] bg-red-900/30 pointer-events-none" />
            <div className="absolute w-full h-[1px] bg-red-950/20 rotate-45 pointer-events-none" />
            <div className="absolute w-full h-[1px] bg-red-950/20 -rotate-45 pointer-events-none" />

            {/* Subtle Grungy Grid Overlay */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(rgba(220, 38, 38, 0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Azimuth Angle Callouts */}
            <div className="absolute top-2 text-[9px] font-mono font-bold text-red-500/80">000&deg; NORTH</div>
            <div className="absolute bottom-2 text-[9px] font-mono font-bold text-red-500/80">180&deg; SOUTH</div>
            <div className="absolute left-2 text-[9px] font-mono font-bold text-red-500/80">270&deg; WEST</div>
            <div className="absolute right-2 text-[9px] font-mono font-bold text-red-500/80">090&deg; EAST</div>

            {/* Range Ring Distance Labels */}
            <span className="absolute top-[13%] left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-600">75% DEPTH</span>
            <span className="absolute top-[26%] left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-600">50% DEPTH</span>
            <span className="absolute top-[38%] left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-600">25% DEPTH</span>

            {/* Rotating Radar Scanner Sweep Beam */}
            {isScanning && (
              <div
                className="absolute inset-0 pointer-events-none origin-center"
                style={{
                  animation: `radar-sweep ${getSweepDuration()} linear infinite`,
                  background: 'conic-gradient(from 0deg at 50% 50%, rgba(220, 38, 38, 0.35) 0deg, rgba(220, 38, 38, 0.08) 35deg, transparent 75deg, transparent 360deg)'
                }}
              />
            )}

            {/* Omnidirectional Manual Sonar Shockwave */}
            {activePingId === 'all' && (
              <div 
                key={`shockwave-${pulseCount}`}
                className="absolute w-12 h-12 rounded-full border-2 border-red-500 bg-red-500/20 animate-ping pointer-events-none"
                style={{ animationDuration: '1.4s' }}
              />
            )}

            {/* SVG Ghostly Paths Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="ghostPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.2" />
                  <stop offset="60%" stopColor="#dc2626" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
                </linearGradient>
                <filter id="ghostGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {filteredSpirits.map((spirit) => {
                const isSelected = selectedSpiritId === spirit.id;
                if (!showAllPaths && !isSelected) return null;

                // Build smooth SVG path data through waypoints
                const points = spirit.path;
                if (points.length < 2) return null;
                const pathD = points.reduce((acc, curr, idx) => {
                  return idx === 0 ? `M ${curr.x}% ${curr.y}%` : `${acc} L ${curr.x}% ${curr.y}%`;
                }, '');

                return (
                  <g key={`path-${spirit.id}`} className="transition-opacity duration-300">
                    {/* Shadow / Glow line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? '#ef4444' : '#991b1b'}
                      strokeWidth={isSelected ? '3' : '1.5'}
                      strokeDasharray={isSelected ? 'none' : '3 3'}
                      opacity={isSelected ? 0.9 : 0.45}
                      filter="url(#ghostGlow)"
                    />

                    {/* Waypoint Nodes along the path */}
                    {points.map((pt, ptIdx) => (
                      <circle
                        key={`pt-${spirit.id}-${ptIdx}`}
                        cx={`${pt.x}%`}
                        cy={`${pt.y}%`}
                        r={pt.type === 'recovery' ? 4 : pt.type === 'hesitation' ? 3.5 : 2}
                        fill={
                          pt.type === 'recovery' ? '#ef4444' :
                          pt.type === 'hesitation' ? '#f59e0b' : '#7f1d1d'
                        }
                        opacity={isSelected ? 1 : 0.6}
                      />
                    ))}
                  </g>
                );
              })}
            </svg>

            {/* Interactive Spirit Nodes on Radar */}
            {filteredSpirits.map((spirit) => {
              const isSelected = selectedSpiritId === spirit.id;
              const isPinging = activePingId === spirit.id || activePingId === 'all';

              return (
                <div
                  key={spirit.id}
                  style={{ left: `${spirit.x}%`, top: `${spirit.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  onClick={() => {
                    setSelectedSpiritId(spirit.id);
                    if (onSelectSpirit) onSelectSpirit(spirit);
                  }}
                >
                  {/* Outer Pulsing Ping Ring */}
                  {isPinging && (
                    <div className="absolute -inset-3 rounded-full border-2 border-red-500 bg-red-500/20 animate-ping pointer-events-none" />
                  )}

                  {/* Ripple on Selection */}
                  {isSelected && (
                    <div className="absolute -inset-2 rounded-full border border-red-500/60 animate-pulse pointer-events-none" />
                  )}

                  {/* Spirit Node Blip */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/70 scale-110 border-2 border-white'
                        : 'bg-[#180505] text-red-400 border border-red-800/80 group-hover:scale-110 group-hover:border-red-500'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </div>

                  {/* Floating Coordinates & Name Tag */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-8 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all pointer-events-none ${
                      isSelected
                        ? 'bg-red-950 text-white border border-red-700 opacity-100 z-30 shadow-lg'
                        : 'bg-black/80 text-zinc-400 border border-zinc-800 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {spirit.spiritNumber} &middot; {spirit.codename}
                  </div>
                </div>
              );
            })}

            {/* Center Origin Mark (shepdesign Core Beacon) */}
            <div className="w-3 h-3 rounded-full bg-red-600 border border-white z-10 shadow-lg shadow-red-600 flex items-center justify-center pointer-events-none">
              <div className="w-1 h-1 rounded-full bg-white animate-ping" />
            </div>
          </div>

          {/* Quick Radar Legend Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-zinc-400 mt-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
              <span>Recovered Soul</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Hesitation Threshold</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-red-600 inline-block" />
              <span>Wandering Path</span>
            </div>
          </div>
        </div>

        {/* Right: Spectral Dossier & Journey Detail (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Soul Card */}
          <div className="rounded-xl bg-[#0c0c0c] border border-red-950 p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-zinc-900 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest">
                    {selectedSpirit.spiritNumber}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 uppercase">
                    {selectedSpirit.spiritStatus.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="text-lg font-bold font-cinema tracking-wide text-white mt-1">
                  {selectedSpirit.codename}
                </h4>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">
                  Identity: {selectedSpirit.humanName}
                </div>
              </div>

              <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-900 flex items-center justify-center text-red-400 shrink-0 shadow-md">
                <Ghost className="w-4 h-4" />
              </div>
            </div>

            {/* Azimuth & Spectral Coordinates */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-lg bg-black border border-zinc-900">
              <div>
                <span className="text-zinc-500 text-[10px] block">RADAR BEARING</span>
                <span className="font-bold text-red-400 tabular-nums">{selectedSpirit.azimuth}&deg; AZIMUTH</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">RADIAL DISTANCE</span>
                <span className="font-bold text-zinc-200 tabular-nums">{selectedSpirit.distance}% OF SENSOR</span>
              </div>
            </div>

            {/* Chronological Path Timeline */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center justify-between">
                <span>Wandering Breadcrumbs:</span>
                <span className="text-[10px] text-zinc-500">{selectedSpirit.dwellDuration} on site</span>
              </div>

              <div className="space-y-2 border-l border-red-950 ml-2 pl-3 text-xs font-mono">
                {selectedSpirit.path.map((node, nIdx) => (
                  <div key={nIdx} className="relative group/node">
                    <span
                      className={`absolute -left-[17px] top-1 w-2 h-2 rounded-full border ${
                        node.type === 'recovery' ? 'bg-red-500 border-white' :
                        node.type === 'hesitation' ? 'bg-amber-500 border-black' : 'bg-zinc-700 border-zinc-900'
                      }`}
                    />
                    <div className="text-zinc-300 font-medium">{node.label}</div>
                    <div className="text-[10px] text-zinc-500">
                      Grid Coord: ({node.x}%, {node.y}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Note Quote */}
            <div className="p-3 rounded-lg bg-[#070707] border border-zinc-900/90 text-xs font-typewriter text-zinc-300 leading-relaxed">
              "{selectedSpirit.inkNote}"
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-zinc-900">
              <a
                href="#seance-log"
                onClick={() => {
                  if (onSelectSpirit) onSelectSpirit(selectedSpirit);
                }}
                className="text-xs font-mono font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
              >
                <span>Examine Ledger Entry</span>
                <ArrowRight className="w-3 h-3" />
              </a>

              <span className="text-[10px] font-mono text-zinc-500">
                Resonance: {selectedSpirit.riteRequested}
              </span>
            </div>
          </div>

          {/* Radar Configuration & Filter Toggles */}
          <div className="p-4 rounded-xl bg-[#070707] border border-zinc-900 space-y-3 text-xs">
            <div className="flex items-center justify-between text-zinc-400 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-zinc-300">
                <Filter className="w-3.5 h-3.5 text-red-500" />
                <span>Filter Spirits by Resonance</span>
              </span>
              <button
                onClick={() => setShowAllPaths(prev => !prev)}
                className="text-red-400 hover:underline cursor-pointer"
              >
                {showAllPaths ? 'Hide Other Paths' : 'Show All Paths'}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
              <button
                onClick={() => setFilterType('all')}
                className={`py-1.5 px-2 rounded-lg text-center transition-colors cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-red-950 text-red-200 font-bold border border-red-800'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                All ({spirits.length})
              </button>
              <button
                onClick={() => setFilterType('ghost_recovered')}
                className={`py-1.5 px-2 rounded-lg text-center transition-colors cursor-pointer ${
                  filterType === 'ghost_recovered'
                    ? 'bg-red-950 text-red-200 font-bold border border-red-800'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Ghost
              </button>
              <button
                onClick={() => setFilterType('manifested')}
                className={`py-1.5 px-2 rounded-lg text-center transition-colors cursor-pointer ${
                  filterType === 'manifested'
                    ? 'bg-red-950 text-red-200 font-bold border border-red-800'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Manifest
              </button>
              <button
                onClick={() => setFilterType('reclaimed_soul')}
                className={`py-1.5 px-2 rounded-lg text-center transition-colors cursor-pointer ${
                  filterType === 'reclaimed_soul'
                    ? 'bg-red-950 text-red-200 font-bold border border-red-800'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Reclaim
              </button>
            </div>

            {/* Sweep Speed Selector */}
            <div className="flex items-center justify-between pt-1 border-t border-zinc-900/80 font-mono text-[10px] text-zinc-400">
              <span>SCAN FREQUENCY:</span>
              <div className="flex items-center gap-1.5">
                {(['slow', 'normal', 'fast'] as const).map(spd => (
                  <button
                    key={spd}
                    onClick={() => setScanSpeed(spd)}
                    className={`px-2 py-0.5 rounded uppercase cursor-pointer ${
                      scanSpeed === spd
                        ? 'bg-red-900 text-white font-bold'
                        : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
