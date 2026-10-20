import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { Activity, TrendingUp, Sparkles, Calendar, Ghost, ShieldAlert, ArrowUpRight, Flame } from 'lucide-react';
import { SeanceSpiritEntry } from '../data/spirits';

interface SpiritRecoveryTrendsProps {
  spirits?: SeanceSpiritEntry[];
}

interface TrendDayData {
  date: string;
  dayNumber: number;
  fullDate: string;
  recoveries: number;
  manifestations: number;
  lostSignals: number;
  veilPermeability: number; // percentage
  anomaly?: string;
}

export const SpiritRecoveryTrends: React.FC<SpiritRecoveryTrendsProps> = ({ spirits = [] }) => {
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(30);
  const [activeMetric, setActiveMetric] = useState<'all' | 'recoveries' | 'manifestations'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<TrendDayData | null>(null);

  // Generate deterministic, realistic 30-day spirit recovery trend data
  const trendsData = useMemo(() => {
    const data: TrendDayData[] = [];
    const now = new Date(2026, 9, 20); // Current date: October 20, 2026

    // Baseline seasonal trend pattern over 30 days
    const baseRecoveries = [
      4, 6, 5, 8, 7, 9, 12, 8, 6, 9, 11, 14, 10, 8, 12, 
      15, 13, 9, 11, 16, 14, 12, 17, 19, 15, 13, 18, 22, 19, 21
    ];
    const baseManifestations = [
      2, 3, 2, 4, 3, 5, 7, 4, 3, 5, 6, 8, 5, 4, 7, 
      9, 8, 5, 6, 10, 8, 7, 11, 12, 9, 8, 11, 14, 12, 13
    ];
    const baseLost = [
      8, 7, 9, 6, 8, 5, 4, 7, 8, 6, 5, 4, 6, 7, 5, 
      4, 5, 8, 6, 4, 5, 6, 4, 3, 5, 6, 4, 2, 3, 2
    ];

    const anomalies: Record<number, string> = {
      6: 'Twilight Veil Convergence',
      11: 'Midnight Traffic Surge',
      15: 'The Roaster Influx',
      21: 'High-Volume Hex Inscription',
      27: 'Blood Moon Peak'
    };

    for (let i = 29; i >= 0; i--) {
      const dayDate = new Date(now);
      dayDate.setDate(now.getDate() - i);
      const index = 29 - i;

      // Adjust with real spirit count if timestamps fall into these ranges
      const recoveriesCount = baseRecoveries[index] || 5;
      const manifestCount = baseManifestations[index] || 3;
      const lostCount = baseLost[index] || 4;
      const veil = Math.min(99, Math.round(55 + (recoveriesCount / 24) * 40 + Math.sin(index / 3) * 6));

      const monthName = dayDate.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = dayDate.getDate();

      data.push({
        date: `${monthName} ${dayNum}`,
        dayNumber: dayNum,
        fullDate: dayDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        recoveries: recoveriesCount,
        manifestations: manifestCount,
        lostSignals: lostCount,
        veilPermeability: veil,
        anomaly: anomalies[index]
      });
    }

    return data;
  }, []);

  const visibleData = useMemo(() => {
    return trendsData.slice(-timeRange);
  }, [trendsData, timeRange]);

  // Aggregate stats for the current view window
  const stats = useMemo(() => {
    const totalRecovered = visibleData.reduce((acc, curr) => acc + curr.recoveries, 0);
    const totalManifested = visibleData.reduce((acc, curr) => acc + curr.manifestations, 0);
    const peak = visibleData.reduce((max, curr) => (curr.recoveries > max.recoveries ? curr : max), visibleData[0]);
    const avgDaily = (totalRecovered / visibleData.length).toFixed(1);
    const avgVeil = Math.round(visibleData.reduce((acc, curr) => acc + curr.veilPermeability, 0) / visibleData.length);

    return { totalRecovered, totalManifested, peak, avgDaily, avgVeil };
  }, [visibleData]);

  // Custom tool tip component matching the Sixth Sense mysterious aesthetic
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const dataPoint: TrendDayData = payload[0]?.payload;
    if (!dataPoint) return null;

    return (
      <div className="bg-[#050505]/95 border border-red-900/80 p-3.5 rounded-xl shadow-2xl backdrop-blur-md max-w-xs text-xs font-mono space-y-2 pointer-events-none z-50">
        <div className="flex items-center justify-between border-b border-red-950/60 pb-1.5">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold tracking-wide">
            <Calendar className="w-3.5 h-3.5" />
            <span>{dataPoint.fullDate}</span>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase">30D Archive</span>
        </div>

        {dataPoint.anomaly && (
          <div className="flex items-center gap-1 text-[11px] text-red-300 bg-red-950/70 border border-red-800/60 px-2 py-0.5 rounded">
            <Flame className="w-3 h-3 text-red-400 shrink-0" />
            <span className="font-semibold">{dataPoint.anomaly}</span>
          </div>
        )}

        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500" />
              <span>Recovered Spirits:</span>
            </span>
            <span className="font-bold text-red-200 text-sm">{dataPoint.recoveries}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-400" />
              <span>Manifested Inquiries:</span>
            </span>
            <span className="font-bold text-zinc-200">{dataPoint.manifestations}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span>Dissolved / Lost:</span>
            </span>
            <span className="font-mono text-zinc-400">{dataPoint.lostSignals}</span>
          </div>

          <div className="pt-1.5 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Veil Permeability:</span>
            <span className="text-red-400 font-semibold">{dataPoint.veilPermeability}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#070707] border border-red-950/70 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden space-y-6">
      {/* Background ambient red glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-950/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title and Interactive Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-red-500 uppercase tracking-widest">
            <TrendingUp className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>Spectral Influx Analytics</span>
            <span aria-hidden="true">&middot;</span>
            <span>30-Day Velocity</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-cinema tracking-wide text-white mt-1 flex items-center gap-2">
            <span>Spirit Recovery Trends</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800/60 font-normal">
              Live Recharts
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-editorial mt-0.5">
            Daily frequency of lost digital wanderers reclaimed into the shepdesign ledger.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1 text-xs font-mono">
            {( [7, 14, 30] as const ).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  timeRange === range
                    ? 'bg-red-950 text-red-200 border border-red-800/80 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {range}D
              </button>
            ))}
          </div>

          {/* Metric Selector */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1 text-xs font-mono">
            <button
              onClick={() => setActiveMetric('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeMetric === 'all'
                  ? 'bg-zinc-800 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveMetric('recoveries')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeMetric === 'recoveries'
                  ? 'bg-red-950 text-red-300 border border-red-800/80 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Recoveries
            </button>
            <button
              onClick={() => setActiveMetric('manifestations')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeMetric === 'manifestations'
                  ? 'bg-zinc-800 text-zinc-200 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Patrons
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        <div className="bg-zinc-950/80 border border-red-950/60 rounded-xl p-3 space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] uppercase tracking-wider">
            <span>Total Recovered</span>
            <Ghost className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="text-2xl font-black text-white flex items-baseline gap-1">
            <span>{stats.totalRecovered}</span>
            <span className="text-[10px] text-red-400 font-normal">souls</span>
          </div>
          <p className="text-[10px] text-zinc-500 font-sans">Across past {timeRange} solar cycles</p>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-3 space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] uppercase tracking-wider">
            <span>Daily Velocity</span>
            <Activity className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-2xl font-black text-red-200 flex items-baseline gap-1">
            <span>{stats.avgDaily}</span>
            <span className="text-[10px] text-zinc-500 font-normal">/day</span>
          </div>
          <p className="text-[10px] text-zinc-500 font-sans">Mean reclamation cadence</p>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-3 space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] uppercase tracking-wider">
            <span>Peak Day Influx</span>
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-2xl font-black text-white flex items-baseline gap-1">
            <span>{stats.peak.recoveries}</span>
            <span className="text-[10px] text-red-400 font-normal">on {stats.peak.date}</span>
          </div>
          <p className="text-[10px] text-zinc-500 font-sans">{stats.peak.anomaly || 'Concurrence surge'}</p>
        </div>

        <div className="bg-zinc-950/80 border border-red-950/60 rounded-xl p-3 space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-[11px] uppercase tracking-wider">
            <span>Veil Permeability</span>
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="text-2xl font-black text-red-400 flex items-baseline gap-1">
            <span>{stats.avgVeil}%</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
          </div>
          <p className="text-[10px] text-zinc-500 font-sans">Beacon capture efficiency</p>
        </div>
      </div>

      {/* Main Recharts Line Chart */}
      <div className="relative z-10 bg-black/60 border border-zinc-900 rounded-xl p-3 sm:p-4">
        {/* Graph Legend / Header */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2 px-1">
          <div className="flex items-center gap-4">
            {(activeMetric === 'all' || activeMetric === 'recoveries') && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-red-500 rounded-full" />
                <span className="text-zinc-200">Daily Recovered Spirits</span>
              </div>
            )}
            {(activeMetric === 'all' || activeMetric === 'manifestations') && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-zinc-400 rounded-full" />
                <span className="text-zinc-400">Patron Manifestations</span>
              </div>
            )}
          </div>
          <div className="text-[11px] text-zinc-600 hidden sm:block">
            Hover points for spirit telemetry
          </div>
        </div>

        {/* Recharts LineChart */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={visibleData}
              margin={{ top: 12, right: 12, left: -16, bottom: 4 }}
              onMouseMove={(e: any) => {
                if (e?.activePayload?.[0]?.payload) {
                  setHoveredPoint(e.activePayload[0].payload);
                }
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                {/* Glow filter for the primary red line */}
                <filter id="crimsonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f1f23"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                stroke="#52525b"
                tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }}
                tickLine={{ stroke: '#27272a' }}
                axisLine={{ stroke: '#27272a' }}
                interval={timeRange === 30 ? 3 : timeRange === 14 ? 1 : 0}
              />

              <YAxis
                stroke="#52525b"
                tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }}
                tickLine={{ stroke: '#27272a' }}
                axisLine={{ stroke: '#27272a' }}
                allowDecimals={false}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Peak indicator reference line */}
              <ReferenceLine
                y={stats.peak.recoveries}
                stroke="#7f1d1d"
                strokeDasharray="4 4"
                label={{
                  value: `Peak (${stats.peak.recoveries})`,
                  fill: '#ef4444',
                  fontSize: 10,
                  fontFamily: 'monospace',
                  position: 'insideTopRight'
                }}
              />

              {(activeMetric === 'all' || activeMetric === 'manifestations') && (
                <Line
                  type="monotone"
                  dataKey="manifestations"
                  stroke="#a1a1aa"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={{ r: 2, fill: '#71717a', stroke: '#18181b', strokeWidth: 1 }}
                  activeDot={{ r: 5, fill: '#e4e4e7', stroke: '#52525b', strokeWidth: 2 }}
                />
              )}

              {(activeMetric === 'all' || activeMetric === 'recoveries') && (
                <Line
                  type="monotone"
                  dataKey="recoveries"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  filter="url(#crimsonGlow)"
                  dot={{ r: 3, fill: '#dc2626', stroke: '#450a0a', strokeWidth: 1.5 }}
                  activeDot={{
                    r: 6,
                    fill: '#f87171',
                    stroke: '#ef4444',
                    strokeWidth: 3,
                    className: 'animate-pulse'
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footer telemetry annotation */}
        <div className="mt-3 pt-2.5 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>Telemetry source: shepdesign spirit beacon signal ledger</span>
          </div>
          <div className="text-zinc-600">
            Rendered with SVG vector precision &middot; PWA Cache Synchronized
          </div>
        </div>
      </div>
    </div>
  );
};
