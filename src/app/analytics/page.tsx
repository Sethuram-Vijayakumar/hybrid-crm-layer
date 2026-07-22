'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, Clock, Activity, Calendar, ChevronDown, Download, Brain
} from 'lucide-react';

export default function AnalyticsPage() {
  
  // Simulation State: Toggle between baseline capacity and a spike scenario (Q2 / Q3)
  const [simulationMode, setSimulationMode] = useState<'Q2' | 'Q3'>('Q2');

  // stats from Screenshot 2
  const stats = {
    turnaround: '4.2 Days',
    turnaroundTrend: '-0.8%',
    holdTime: '18.5 Hours',
    holdTrend: '+1.2%',
    conversion: '68.4%',
    conversionTrend: '+5%',
    accuracy: '94.2%',
    accuracyTarget: 'Target: 95%'
  };

  return (
    <div className="space-y-6 font-sans text-slate-805 select-none relative">
      
      {/* Header Row (Screenshot 2) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-4 border-b border-slate-200 gap-4">
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Northbridge Advisory CRM</span>
          <h1 className="text-2xl font-bold text-[#1B1F2A] tracking-tight mt-0.5">Business Analytics</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time performance monitoring and AI-driven forecasting.</p>
        </div>

        {/* Action Pickers and Export */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
          
          {/* Timeframe Picker */}
          <div className="bg-white border border-slate-200 py-2 px-3.5 rounded-xl flex items-center space-x-2 shadow-xs">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>Last 30 Days</span>
            <ChevronDown className="h-3 w-3 text-slate-500" />
          </div>

          {/* Simulation/Department Picker */}
          <div className="bg-white border border-slate-200 py-2 px-3.5 rounded-xl flex items-center space-x-2 shadow-xs">
            <span>Capacity Model: {simulationMode === 'Q2' ? 'Baseline (Q2)' : 'Spike Scenario (Q3)'}</span>
            <select
              value={simulationMode}
              onChange={(e) => setSimulationMode(e.target.value as 'Q2' | 'Q3')}
              className="bg-transparent text-slate-900 border-none outline-none font-bold cursor-pointer text-xs"
            >
              <option value="Q2">Baseline</option>
              <option value="Q3">Spike</option>
            </select>
          </div>

          {/* Region Picker */}
          <div className="bg-white border border-slate-200 py-2 px-3.5 rounded-xl flex items-center space-x-2 shadow-xs">
            <span>Region: North America</span>
            <ChevronDown className="h-3 w-3 text-slate-500" />
          </div>

          {/* Export button */}
          <button
            onClick={() => alert('Exporting analytics spreadsheet report...')}
            className="bg-[#1B1F2A] hover:bg-slate-800 text-white font-bold py-2.5 px-4.5 rounded-xl shadow-md transition active-press flex items-center space-x-1.5"
          >
            <Download className="h-4 w-4 text-white" />
            <span>Export Report</span>
          </button>

        </div>
      </div>

      {/* Top metrics Row (Screenshot 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Turnaround Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
          <div className="flex justify-between items-start text-slate-400">
            <div className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg">
              <Clock className="h-4.5 w-4.5" />
            </div>
            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded flex items-center space-x-0.5">
              <span>{stats.turnaroundTrend}</span>
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Approval Turnaround</span>
            <span className="text-2xl font-black text-slate-900 block">{stats.turnaround}</span>
          </div>
        </div>

        {/* hold time card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
          <div className="flex justify-between items-start text-slate-400">
            <div className="p-1.5 bg-[#FBF1DE] text-[#C9922E] rounded-lg">
              <Activity className="h-4.5 w-4.5" />
            </div>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center space-x-0.5">
              <span>{stats.holdTrend}</span>
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Avg. Contract Hold</span>
            <span className="text-2xl font-black text-slate-900 block">{stats.holdTime}</span>
          </div>
        </div>

        {/* pipeline conversion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
          <div className="flex justify-between items-start text-slate-400">
            <div className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center space-x-0.5">
              <span>{stats.conversionTrend}</span>
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Pipeline Conversion</span>
            <span className="text-2xl font-black text-slate-900 block">{stats.conversion}</span>
          </div>
        </div>

        {/* AI prediction accuracy */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
          <div className="flex justify-between items-start text-slate-400">
            <div className="p-1.5 bg-slate-50 text-slate-700 rounded-lg">
              <Brain className="h-4.5 w-4.5" />
            </div>
            <span className="text-[9px] font-bold bg-slate-100 text-slate-650 px-2 py-0.5 rounded-full">
              {stats.accuracyTarget}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">AI Prediction Accuracy</span>
            <span className="text-2xl font-black text-slate-900 block">{stats.accuracy}</span>
          </div>
        </div>

      </div>

      {/* Forecast Line graph and Utilization split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Forecast Card (Col Span 2) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="space-y-0.5">
              <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider">Revenue Forecast</h3>
              <p className="text-[10px] text-slate-450 font-medium">Comparison between actual gains and AI-predicted outcomes.</p>
            </div>
            <div className="flex items-center space-x-3 text-[9px] font-bold text-slate-500">
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <span>Actual</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-slate-350" />
                <span>AI Forecast</span>
              </span>
            </div>
          </div>

          <div className="h-48 w-full pt-4 relative">
            <svg className="h-full w-full" viewBox="0 0 100 35" preserveAspectRatio="none">
              <path d="M 0 32 Q 25 30 50 18 T 100 5" fill="none" stroke="#6366f1" strokeWidth="2" />
              <path d="M 0 32 Q 25 28 50 22 T 100 12" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2" />
            </svg>
            <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono mt-3 border-t border-slate-100 pt-2 px-1">
              <span>Jun 01</span>
              <span>Jun 08</span>
              <span>Jun 15</span>
              <span>Jun 22</span>
              <span>Jun 30</span>
            </div>
          </div>
        </div>

        {/* Utilization Gauge Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider">Utilization</h3>
            <p className="text-[10px] text-slate-450 font-medium">Capacity across delivery units.</p>
          </div>

          {/* Radial utilization loader chart */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative h-28 w-28 flex items-center justify-center">
              {/* SVG circular gauge */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                <circle cx="56" cy="56" r="48" fill="transparent" stroke="#6366f1" strokeWidth="8" strokeDasharray="301.6" strokeDashoffset={301.6 - (301.6 * (simulationMode === 'Q2' ? 78 : 94)) / 100} />
              </svg>
              <div className="text-center">
                <span className="text-2xl font-black text-slate-900 tracking-tight block">
                  {simulationMode === 'Q2' ? '78%' : '94%'}
                </span>
                <span className="text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center border-t border-slate-100 pt-3 text-xs font-semibold">
            <div>
              <span className="text-[9px] text-slate-450 uppercase block font-bold">Total Capacity</span>
              <span className="text-slate-800 font-bold mt-0.5 block">1,240 hrs</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-450 uppercase block font-bold">Available</span>
              <span className="text-slate-800 font-bold mt-0.5 block">
                {simulationMode === 'Q2' ? '273 hrs' : '75 hrs'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row: Workloads & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Department Workload Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider">Department Workload</h3>
              <p className="text-[10px] text-slate-450 font-medium">Active deals by specialized team.</p>
            </div>
            <span className="text-[9px] font-bold text-slate-450 uppercase tracking-widest">Connected</span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { label: 'Legal', count: '42 Deals', percentage: 70, color: 'bg-indigo-500' },
              { label: 'Finance', count: '28 Deals', percentage: 46, color: 'bg-indigo-500' },
              { label: 'Delivery', count: '56 Deals', percentage: 93, color: 'bg-rose-500' },
              { label: 'Compliance', count: '12 Deals', percentage: 20, color: 'bg-indigo-500' }
            ].map((d, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-[10.5px]">
                  <span className="text-slate-700 font-bold">{d.label}</span>
                  <span className="text-slate-900 font-bold">{d.count}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider">Conversion Funnel</h3>
            <p className="text-[10px] text-slate-450 font-medium">Cumulative throughput across stages.</p>
          </div>

          {/* Funnel list rendering */}
          <div className="space-y-2.5 pt-2 text-[10.5px] font-bold">
            {[
              { l: 'Lead', p: '100%', c: '1,400', w: 'w-full bg-indigo-900/90' },
              { l: 'Qualified', p: '82%', c: '1,148', w: 'w-[82%] bg-indigo-800/90' },
              { l: 'Proposal', p: '65%', c: '910', w: 'w-[65%] bg-indigo-700/90' },
              { l: 'Legal', p: '40%', c: '560', w: 'w-[40%] bg-indigo-650/90' },
              { l: 'Finance', p: '28%', c: '392', w: 'w-[28%] bg-[#C9922E]/90' },
              { l: 'Won', p: '18%', c: '252', w: 'w-[18%] bg-emerald-600/90' }
            ].map((f, idx) => (
              <div key={idx} className="flex items-center text-slate-700">
                <span className="w-20 shrink-0 text-slate-600 font-bold">{f.l}</span>
                <div className="flex-1 bg-slate-100 rounded-lg overflow-hidden h-6 flex items-center relative pr-4">
                  <div className={`h-full rounded-l-lg flex items-center justify-start pl-3 text-white ${f.w}`} style={{ width: f.p }}>
                    <span className="text-[9.5px] font-black">{f.p}</span>
                  </div>
                  <span className="ml-auto text-slate-800 text-[10px] font-bold">{f.c}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
