'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, Clock, AlertTriangle, CheckCircle2, Layers, 
  Check, X, Play, Sparkles, ChevronRight, ArrowUpRight, 
  Briefcase, Zap, ChevronUp, ChevronDown
} from 'lucide-react';

export default function ExecutiveStrategyPage() {
  const { setPresentationMode, setCurrentSlide, deals } = useApp();
  const router = useRouter();

  // Tab State: switcher between Dashboard view and Slide Appendix view
  const [currentView, setCurrentView] = useState<'dashboard' | 'appendix'>('dashboard');
  
  // Appendix slide sub-tab state
  const [activeTab, setActiveTab] = useState<'summary' | 'problem' | 'personas' | 'journey' | 'matrix' | 'roi' | 'roadmap' | 'readiness' | 'why' | 'appendix'>('summary');
  
  // Slide 15 Expanded Prompt Tab State
  const [expandedPromptTab, setExpandedPromptTab] = useState<string | null>(null);

  const handleStartPresentation = () => {
    setPresentationMode(true);
    setCurrentSlide(1);
  };

  // Safe KPI stats for Dashboard from deals data
  const totalDealsValue = deals.reduce((sum, d) => sum + d.rawValue, 0);
  const activeApprovalsCount = deals.filter(d => d.stage === 'Pending Approval' || d.stage === 'Legal Review').length;
  const highRiskCount = deals.filter(d => (d.stage === 'Pending Approval' || d.stage === 'Legal Review') && d.risk === 'High').length;

  return (
    <div className="space-y-6 font-sans select-none pb-12 text-slate-800">
      
      {/* Top View Switcher Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E]/10 text-[#C9922E] rounded uppercase tracking-wider font-extrabold mr-2">
            doodleblue Product Assessment Portal
          </span>
          <h1 className="text-2xl font-bold text-[#1B1F2A] tracking-tight mt-1">Hybrid CRM Layer Control Center</h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Connected HubSpot Instance: <span className="font-mono text-[10px] text-[#C9922E]">northbridge-hubspot-prd</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Main Segmented Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center text-xs font-semibold">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`py-1.5 px-4 rounded-lg transition duration-150 active-press ${
                currentView === 'dashboard'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              📊 Executive Dashboard
            </button>
            <button
              onClick={() => setCurrentView('appendix')}
              className={`py-1.5 px-4 rounded-lg transition duration-150 active-press ${
                currentView === 'appendix'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              📖 Strategic Case Appendix
            </button>
          </div>

          <button
            onClick={handleStartPresentation}
            className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-205 active-press flex items-center space-x-2 glowing-ring"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Launch Presentation</span>
          </button>
        </div>
      </div>

      {currentView === 'dashboard' ? (
        /* ========================================================
           NEW HIGH-FIDELITY INTERACTIVE DASHBOARD VIEW (Screenshot 5)
           ======================================================== */
        <div className="space-y-6 animate-fade-in text-xs font-semibold">
          
          {/* Dashboard Welcome Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#1B1F2A]">Welcome, Product Director</h2>
              <p className="text-slate-500 font-medium">Here is your strategic overview for the Northbridge Hybrid CRM Overlay.</p>
            </div>
            <div className="flex items-center space-x-2.5 shrink-0">
              <button
                onClick={() => router.push('/ai-command-center')}
                className="bg-[#1B1F2A] hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition active-press"
              >
                Generate AI Brief
              </button>
              <button
                onClick={() => router.push('/approvals')}
                className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition active-press"
              >
                Create Approval Workflow
              </button>
            </div>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metric 1: Active Deals */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
              <div className="flex justify-between items-start text-slate-400">
                <span className="font-bold uppercase tracking-wider text-[9px]">Active Deals</span>
                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-600">
                  <Briefcase className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">₹{((totalDealsValue || 124800000) / 100000).toFixed(1)}L</span>
                <span className="flex items-center space-x-1 text-emerald-600 text-[10px] font-bold">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>12.4% growth vs LW</span>
                </span>
              </div>
            </div>

            {/* Metric 2: Pending Approvals */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
              <div className="flex justify-between items-start text-slate-400">
                <span className="font-bold uppercase tracking-wider text-[9px]">Pending Approvals</span>
                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">{activeApprovalsCount || 42}</span>
                <span className="flex items-center space-x-1 text-slate-500 text-[10px] font-bold">
                  <span>⏱ Avg. age: 2.4 days</span>
                </span>
              </div>
            </div>

            {/* Metric 3: Contract Hold Time */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
              <div className="flex justify-between items-start text-slate-400">
                <span className="font-bold uppercase tracking-wider text-[9px]">Contract Hold Time</span>
                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-650">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">5.2 Days</span>
                <span className="flex items-center space-x-1 text-rose-600 text-[10px] font-bold">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+0.8 days trend</span>
                </span>
              </div>
            </div>

            {/* Metric 4: AI Risk Alerts */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
              <div className="flex justify-between items-start text-slate-400">
                <span className="font-bold uppercase tracking-wider text-[9px]">AI Risk Alerts</span>
                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-600">
                  <AlertTriangle className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-rose-700 tracking-tight">{highRiskCount || 8} / 14</span>
                <span className="flex items-center space-x-2 text-rose-600 text-[10px] font-bold">
                  <span className="bg-rose-50 px-1.5 py-0.5 rounded text-rose-800">3 High</span>
                  <span className="bg-amber-50 px-1.5 py-0.5 rounded text-amber-800">5 Med</span>
                </span>
              </div>
            </div>

          </div>

          {/* Three Column Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Area (Col Span 2) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Interactive Pipeline Overview */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider">Interactive Pipeline Overview</h3>
                  <button onClick={() => router.push('/pipeline')} className="text-[#C9922E] hover:underline text-[10px] font-bold uppercase">View Detailed Forecast →</button>
                </div>
                
                {/* Horizontal stage distribution layout bar charts */}
                <div className="grid grid-cols-5 gap-3 pt-2">
                  {[
                    { label: 'DISCOVERY', value: '₹48.2L', count: '112 Deals', prob: 'Probability: 10%', w: 'h-16' },
                    { label: 'VALIDATION', value: '₹32.5L', count: '84 Deals', prob: 'Probability: 25%', w: 'h-14' },
                    { label: 'PROPOSAL', value: '₹21.1L', count: '42 Deals', prob: 'Probability: 50%', w: 'h-10' },
                    { label: 'LEGAL', value: '₹15.8L', count: '19 Deals', prob: 'Probability: 75%', w: 'h-8' },
                    { label: 'CLOSING', value: '₹7.2L', count: '8 Deals', prob: 'Probability: 90%', w: 'h-5' }
                  ].map((col, idx) => (
                    <div key={idx} className="flex flex-col justify-between items-center text-center p-3 bg-slate-50 border border-slate-150 rounded-xl hover:bg-slate-100/50 transition">
                      <span className="text-[8px] font-bold text-slate-400 block tracking-widest">{col.label}</span>
                      <div className="h-20 flex items-end my-3">
                        <div className={`w-3.5 bg-indigo-500 rounded-t-sm ${col.w} mx-auto`} />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-slate-900 block">{col.value}</span>
                        <span className="text-[9px] text-slate-500 block">{col.count}</span>
                        <span className="text-[8px] text-[#C9922E] font-medium block italic">{col.prob}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval Queue preview card list */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider">Approval Queue</h3>
                  <div className="flex items-center space-x-2 text-[10px]">
                    <span className="bg-[#1B1F2A] text-white px-2 py-0.5 rounded font-bold">Legal (12)</span>
                    <span className="bg-slate-100 text-slate-650 px-2 py-0.5 rounded font-bold">Finance (8)</span>
                  </div>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {[
                    { deal: 'Global Logistics Expansion', company: 'Sovereign State Corp', val: '₹4.2L', risk: 'High', style: 'bg-rose-50 text-rose-700 border-rose-250' },
                    { deal: 'North Star SaaS Implementation', company: 'Apex Digital Ltd.', val: '₹850k', risk: 'Low', style: 'bg-emerald-50 text-emerald-700 border-emerald-250' },
                    { deal: 'Infrastructure Refresh PH-2', company: 'Pacific Rim Energy', val: '₹1.1L', risk: 'Medium', style: 'bg-amber-50 text-amber-700 border-amber-250' }
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 hover:bg-slate-50/40 px-2 rounded-lg transition">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 text-sm">{row.deal}</span>
                        <span className="text-[10px] text-slate-500 block">{row.company}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-bold text-slate-900 text-sm">{row.val}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${row.style}`}>
                          {row.risk} Risk
                        </span>
                        <button
                          onClick={() => router.push('/approvals')}
                          className="text-xs text-[#C9922E] hover:underline font-bold"
                        >
                          Review & Sign
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => router.push('/approvals')}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-3 rounded-xl font-bold uppercase transition"
                  >
                    View All 42 Approvals
                  </button>
                </div>
              </div>

              {/* Delivery Capacity and SVG Forecast Graph Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Delivery Capacity meters */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                  <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider border-b border-slate-100 pb-3">Delivery Capacity</h3>
                  
                  <div className="space-y-3.5">
                    {[
                      { l: 'Legal / Compliance', v: '94% Capacity', w: 'w-[94%] bg-rose-500' },
                      { l: 'Solution Architecture', v: '72% Capacity', w: 'w-[72%] bg-indigo-500' },
                      { l: 'Customer Success', v: '45% Capacity', w: 'w-[45%] bg-indigo-500' }
                    ].map((cap, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10.5px]">
                          <span className="text-slate-600 font-bold">{cap.l}</span>
                          <span className="text-slate-800 font-bold">{cap.v}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${cap.w}`} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-[10.5px] leading-relaxed">
                    <strong>Capacity Alert:</strong> Legal department will reach bottleneck threshold in 48 hours based on current pipeline velocity.
                  </div>
                </div>

                {/* SVG Forecast Graph */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider">Forecast Analysis</h3>
                    <div className="flex items-center space-x-2 text-[9px] font-bold text-slate-500">
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
                  
                  {/* Clean SVG Line graph */}
                  <div className="h-32 w-full relative pt-2">
                    <svg className="h-full w-full" viewBox="0 0 100 35" preserveAspectRatio="none">
                      {/* Actual Line */}
                      <path d="M 0 30 Q 25 28 50 18 T 100 8" fill="none" stroke="#6366f1" strokeWidth="2" />
                      {/* Forecast Line */}
                      <path d="M 0 30 Q 25 27 50 20 T 100 15" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2" />
                    </svg>
                    <div className="flex justify-between items-center text-[8.5px] text-slate-400 font-mono mt-1 border-t border-slate-100 pt-1.5">
                      <span>OCT</span>
                      <span>NOV</span>
                      <span>DEC [TARGET]</span>
                      <span>JAN</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Area (Col Span 1) */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* AI Command Center Briefing Card */}
              <div className="bg-[#1B1F2A] border border-slate-800 text-white rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#C9922E] border-b border-slate-800 pb-3">
                  <Sparkles className="h-4.5 w-4.5 glowing-ring rounded-full shrink-0" />
                  <span className="uppercase tracking-widest">AI Command Center</span>
                </div>
                
                <div className="space-y-3.5">
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-bold">Morning Executive Brief</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-semibold mt-1">
                      Pipeline healthy at $124M. Primary focus required on 3 legal approvals nearing expiry. North Star deal risk is rising due to extended quiet period.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-855 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center space-x-1.5 text-rose-400">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span className="font-bold text-[10.5px]">Explainable Risk Detected</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Risk in &ldquo;Deal X&rdquo; due to Clause 14.2 (force majeure variance from standard threshold).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-855 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-emerald-450">
                      <Zap className="h-3.5 w-3.5" />
                      <span className="font-bold text-[10.5px]">Optimization Recommendation</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Reassign infrastructure refresh deal to Solution Architect Sarah L for faster closure.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => router.push('/ai-command-center')}
                    className="w-full bg-[#C9922E] hover:bg-[#b07f24] text-white text-xs font-bold py-3 rounded-xl shadow-md transition active-press"
                  >
                    Launch Full AI Audit
                  </button>
                </div>
              </div>

              {/* Quick Actions List */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider border-b border-slate-100 pb-3">Quick Actions</h3>
                
                <div className="space-y-2">
                  {[
                    { a: 'Review High-Risk Deals', d: 'View pending deals flagged as high risk.', action: () => router.push('/approvals') },
                    { a: 'Schedule Capacity Review', d: 'Coordinate resource reallocation schedules.', action: () => alert('Triggered scheduling workspace review workflow.') },
                    { a: 'Distribute Board Memo', d: 'Send pipeline summary metrics to stakeholders.', action: () => alert('Copied strategic brief clipboard data.') }
                  ].map((act, idx) => (
                    <button
                      key={idx}
                      onClick={act.action}
                      className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-xl transition flex justify-between items-center group active-press"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 text-[11px] block">{act.a}</span>
                        <span className="text-[9.5px] text-slate-500 font-medium block">{act.d}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Department Velocity & Recent Activity Split */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider border-b border-slate-100 pb-3">Department Velocity</h3>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Sales Ops', val: '1.2 Days', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
                    { label: 'Finance', val: '1.8 Days', color: 'text-indigo-700 bg-indigo-50 border-indigo-100' },
                    { label: 'Legal/Compliance', val: '4.5 Days', color: 'text-rose-700 bg-rose-50 border-rose-100' }
                  ].map((vel, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border flex flex-col justify-between ${vel.color}`}>
                      <span className="text-[8.5px] font-bold block uppercase tracking-wider">{vel.label}</span>
                      <span className="text-sm font-black block mt-2">{vel.val}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-[9.5px] leading-relaxed text-rose-800">
                  Note: Legal response time has increased by 30% this quarter due to volume overload peaks.
                </div>
              </div>

              {/* Recent Activity feed */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-805 text-sm uppercase tracking-wider border-b border-slate-100 pb-3">Recent Activity</h3>
                
                <div className="space-y-3 font-semibold text-[10.5px] leading-relaxed text-slate-650">
                  <div className="flex items-start space-x-2">
                    <span className="text-emerald-600 shrink-0">✓</span>
                    <span>Legal approved deal Stripe P. <strong className="text-slate-400 block font-normal text-[9px] mt-0.5">2 hours ago • Sarah Miller</strong></span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-rose-600 shrink-0">⚠</span>
                    <span>AI flagged risk in Nexa Acquisition <strong className="text-slate-400 block font-normal text-[9px] mt-0.5">4 hours ago • System Alert</strong></span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-indigo-600 shrink-0">🗒</span>
                    <span>New Advisory Draft: Project Helios <strong className="text-slate-400 block font-normal text-[9px] mt-0.5">Yesterday • Marcus North</strong></span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-emerald-600 shrink-0">✓</span>
                    <span>Finance Review Completed <strong className="text-slate-400 block font-normal text-[9px] mt-0.5">2 days ago • James Chen</strong></span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => router.push('/approvals')}
                    className="w-full text-slate-500 hover:text-slate-700 text-[10px] font-bold uppercase tracking-wider text-center"
                  >
                    View All Activity
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* ========================================================
           ORIGINAL SLIDES APPENDIX & PROMPT LIBRARY VIEW
           ======================================================== */
        <div className="space-y-6 animate-fade-in">
          
          {/* Appendix sub-tab navigation */}
          <div className="border-b border-[#E5E7EB] overflow-x-auto">
            <nav className="flex space-x-6 min-w-max pb-1">
              {[
                { id: 'summary', name: 'Executive Summary' },
                { id: 'problem', name: 'Problem & Goals' },
                { id: 'personas', name: 'User Personas' },
                { id: 'journey', name: 'User journeys' },
                { id: 'matrix', name: 'Decision Matrix' },
                { id: 'roi', name: 'ROI Dashboard' },
                { id: 'roadmap', name: 'MVP & Roadmap' },
                { id: 'readiness', name: 'Risks & Readiness' },
                { id: 'why', name: 'Why doodleblue' },
                { id: 'appendix', name: 'Technical Appendix' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-3 px-1 border-b-2 text-xs font-bold transition duration-150 shrink-0 ${
                    activeTab === tab.id
                      ? 'border-[#C9922E] text-[#C9922E]'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="animate-fade-in text-xs font-semibold">
            
            {/* Tab 1: Executive Summary */}
            {activeTab === 'summary' && (
              <div className="space-y-8">
                {/* Strategy Hero */}
                <div className="bg-[#1B1F2A] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
                  <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-[#C9922E]/5 to-transparent opacity-60 hidden md:block" />
                  <div className="max-w-2xl space-y-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-950 rounded uppercase tracking-wider font-extrabold">
                      Executive Recommendation Summary
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight">
                      CRM Transformation Strategy: Hybrid CRM Overlay
                    </h2>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                      We recommend deploying a lightweight **Hybrid CRM Overlay** built with Next.js and Supabase rather than executing a total CRM migration or upgrading to expensive HubSpot Enterprise plans.
                    </p>
                    <div className="border-t border-slate-800 pt-4 mt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs">
                      <div className="flex items-center space-x-2 text-[#C9922E]">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span className="font-bold">Preserves HubSpot as the System of Record</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#C9922E]">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span className="font-bold">Avoids Seat Licensing Upgrades</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategy KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: 'Business Challenge',
                      desc: 'SaaS CRM cannot efficiently support custom approvals, capacity logs, and AI operational alerts without expensive licensing seats.',
                      icon: AlertTriangle,
                      iconBg: 'bg-red-50 text-red-600 border-red-100',
                    },
                    {
                      title: 'Recommendation',
                      desc: 'Retain standard HubSpot pipelines as the database of record, while extending approval logic via a Next.js/Supabase custom overlay.',
                      icon: Layers,
                      iconBg: 'bg-indigo-50 text-[#C9922E] border-[#C9922E]/20',
                    },
                    {
                      title: 'Business Value',
                      desc: 'Avoids costly database replacements and full user training, reducing implementation budgets by approximately 60–70%.',
                      icon: DollarSign,
                      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                    },
                    {
                      title: 'Timeline to Market',
                      desc: 'Production ready within 3–4 months using iterative milestone releases, preventing pipeline downtime or record migrations.',
                      icon: Clock,
                      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
                    },
                  ].map((kpi, idx) => {
                    const Icon = kpi.icon;
                    return (
                      <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs flex flex-col justify-between hover-card-glow transition duration-200">
                        <div className="space-y-3">
                          <div className={`h-9 w-9 rounded-lg border flex items-center justify-center ${kpi.iconBg}`}>
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <h4 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">{kpi.title}</h4>
                          <p className="text-xs text-slate-650 leading-relaxed font-medium">{kpi.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recommendation Summary Statement */}
                <div className="bg-[#FBF1DE]/40 border-l-4 border-[#C9922E] p-6 rounded-r-xl">
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-semibold">
                    &ldquo;We recommend a Hybrid CRM Overlay because it preserves existing CRM investments while enabling enterprise approval workflows, AI-assisted decision support, and blended operational reporting without rebuilding the core CRM database.&rdquo;
                  </p>
                </div>

                {/* Executive Snapshot Grid */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-[#E5E7EB]">
                    <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">Executive Snapshot</h3>
                  </div>
                  <div className="p-6 grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
                    {[
                      { label: 'Current CRM', value: 'HubSpot Standard' },
                      { label: 'Overlay Tech', value: 'Next.js + Supabase' },
                      { label: 'Deployment', value: '3–4 months' },
                      { label: 'Estimated CapEx', value: '₹12L–18L (60–70% Saving)' },
                      { label: 'Operational Risk', value: 'Low' },
                      { label: 'AI Strategy', value: 'Enabled' }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{item.label}</span>
                        <span className="text-xs font-bold text-[#1B1F2A] block">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Problem & Goals */}
            {activeTab === 'problem' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Problem Statement Card */}
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-805 border-b border-slate-100 pb-2">Current SaaS CRM Limitations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Expensive Seats', desc: 'Upgrading all sales/delivery staff is cost-prohibitive.' },
                        { title: 'Workflow Blockers', desc: 'Approvals queue lacks structured priority routing.' },
                        { title: 'Disconnected Plans', desc: 'CRM deals are isolated from ResourceOps capacity levels.' },
                        { title: 'No AI Warnings', desc: 'Stalling contract negotiations go unnoticed.' },
                        { title: 'Manual Escalation', desc: 'Sales managers must manually track legal response times.' },
                        { title: 'No Blended Reports', desc: 'Cannot verify team capacity against sales pipeline volume.' }
                      ].map((prob, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5">
                          <X className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-700">{prob.title}</h4>
                            <p className="text-[11px] text-slate-505 font-semibold">{prob.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Solutions Card */}
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-805 border-b border-slate-100 pb-2">Overlay Layer Capabilities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Zero License Growth', desc: 'Custom portals bypass direct HubSpot seat fees.' },
                        { title: 'Prioritized Approvals', desc: 'Pulls high-risk deals to the top of the review list.' },
                        { title: 'Capacity Validation', desc: 'Verifies active resourcing metrics before contract signing.' },
                        { title: 'RAG Alert Engines', desc: 'Indexes legal documents to detect contract clauses.' },
                        { title: 'One-Click Escalation', desc: 'Triggers automated alerts directly in Slack/Resend.' },
                        { title: 'Integrated Dashboards', desc: 'Pulls HubSpot deals & ResourceOps data into one screen.' }
                      ].map((sol, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5">
                          <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-700">{sol.title}</h4>
                            <p className="text-[11px] text-slate-505 font-semibold">{sol.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Strategy Objective Statement */}
                <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Core Strategic Objective</h4>
                  <p className="text-xs text-slate-655 leading-relaxed font-semibold">
                    The principal goal of the Overlay Portal is to unblock contract signing speed (reducing target SLA times from **4.4 days to 1.5 days**), surface delivery capacity constraints to Sales prior to deal closing, and avoid custom CRM seat license upgrades.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: User Personas */}
            {activeTab === 'personas' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { role: 'Sales Representative', goal: 'Close deals rapidly', friction: 'Lack of legal status visibility', kpi: 'Sales Cycle (Days)' },
                    { role: 'Sales Manager', goal: 'Accurate revenue forecast', friction: 'Siloed status updates', kpi: 'Pipeline Win Rate' },
                    { role: 'Legal Operations', goal: 'Ensure contract compliance', friction: 'SLA queues with zero sorting', kpi: 'Review Turnaround' },
                    { role: 'Finance Team', goal: 'Validate billing details', friction: 'Manual sign-off alerts', kpi: 'Billing Cycle Speed' },
                    { role: 'Delivery Lead', goal: 'Optimize team capacity', friction: 'Blind to sales pipelines', kpi: 'Resource Utilization' },
                    { role: 'Executive Leadership', goal: 'Control software costs', friction: 'CRM license overheads', kpi: 'Overall Software CapEx' }
                  ].map((p, idx) => (
                    <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-3 hover-card-glow transition duration-200 shadow-xs">
                      <h4 className="text-xs font-bold text-[#C9922E] border-b border-slate-100 pb-1.5 uppercase tracking-wider">{p.role}</h4>
                      <div className="space-y-2 text-[10.5px] leading-relaxed text-slate-600">
                        <p><strong>Primary Goal:</strong> {p.goal}</p>
                        <p><strong>Workflow Friction:</strong> {p.friction}</p>
                        <p><strong>Primary Metrics:</strong> {p.kpi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: User Journeys */}
            {activeTab === 'journey' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Before */}
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="flex items-center space-x-2 text-rose-700 font-bold border-b border-slate-100 pb-2">
                      <X className="h-4.5 w-4.5 shrink-0" />
                      <h3 className="text-xs uppercase tracking-wider">Before (Siloed Workflow - Average 4.4 Days)</h3>
                    </div>
                    <ol className="list-decimal pl-4 space-y-3 text-slate-650 leading-relaxed font-semibold">
                      <li>Sales Representative marks HubSpot deal &ldquo;Closed Pending approvals&rdquo;.</li>
                      <li>Rep manually emails contract attachment to Legal and Finance leads.</li>
                      <li>Review items sit in queue; Legal Counsel checks drafts chronologically with zero prioritizations.</li>
                      <li>Delivery capacity checked manually via spreadsheets before staffing.</li>
                      <li>Deal is stalled in signing holds, causing overallocation resourcing burnout.</li>
                    </ol>
                  </div>

                  {/* After */}
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="flex items-center space-x-2 text-emerald-700 font-bold border-b border-slate-100 pb-2">
                      <Check className="h-4.5 w-4.5 shrink-0" />
                      <h3 className="text-xs uppercase tracking-wider">After (Proposed Hybrid Workflow - Target 1.5 Days)</h3>
                    </div>
                    <ol className="list-decimal pl-4 space-y-3 text-slate-655 leading-relaxed font-semibold">
                      <li>HubSpot deal triggers automated webhook syncs to Supabase.</li>
                      <li>Custom Approvals Queue pulls high-risk deals to the top using AI scoring.</li>
                      <li>Legal & Finance approve deals inside Next.js portal (no SaaS seat license needed).</li>
                      <li>System runs live checks against ResourceOps capacity loads.</li>
                      <li>One-click Resend trigger alerts reps when contract signing holds clear.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Decision Matrix */}
            {activeTab === 'matrix' && (
              <div className="space-y-6">
                <div className="overflow-x-auto border border-[#E5E7EB] rounded-2xl bg-white shadow-xs">
                  <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px] border-b border-[#E5E7EB]">
                      <tr>
                        <th className="p-4">Evaluation Parameter</th>
                        <th className="p-4">Option A: Stay SaaS</th>
                        <th className="p-4 bg-[#FBF1DE]/10 text-[#C9922E]">Option B: Hybrid CRM Overlay</th>
                        <th className="p-4">Option C: Custom CRM Rewrite</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB] text-slate-700 font-semibold">
                      <tr>
                        <td className="p-4 font-bold">Implementation Cost</td>
                        <td className="p-4">High (HubSpot upgrade seats)</td>
                        <td className="p-4 bg-[#FBF1DE]/10 font-bold text-emerald-700">Low (₹12L–18L CapEx)</td>
                        <td className="p-4">Very High (₹45L–65L)</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold">Deployment Timeline</td>
                        <td className="p-4">Immediate</td>
                        <td className="p-4 bg-[#FBF1DE]/10 font-bold text-emerald-700">3–4 months (Overlay build)</td>
                        <td className="p-4">6–9 months</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold">Migration Risk</td>
                        <td className="p-4">Zero</td>
                        <td className="p-4 bg-[#FBF1DE]/10 font-bold text-emerald-700">Low (HubSpot Retained)</td>
                        <td className="p-4">High (Full DB Move)</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold">Workflow Customization</td>
                        <td className="p-4">Poor (Rigid SaaS Rules)</td>
                        <td className="p-4 bg-[#FBF1DE]/10 font-bold text-emerald-700">Unrestricted (Next.js/Supabase)</td>
                        <td className="p-4">Unrestricted</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 6: ROI */}
            {activeTab === 'roi' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: 'Development Cost', val: '₹12L–18L CapEx', desc: '60–70% cheaper than a full custom rewrite (₹45L–65L).', color: 'text-indigo-650' },
                    { title: 'Annual License Savings', val: '₹8.5L/year', desc: 'Avoids custom HubSpot Enterprise seat overheads.', color: 'text-[#C9922E]' },
                    { title: 'Payback Period', val: '< 3 Months', desc: 'Transition period based on accelerated deal closure.', color: 'text-emerald-600' }
                  ].map((roi, idx) => (
                    <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-2 hover-card-glow transition">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{roi.title}</h4>
                      <p className={`text-lg font-bold ${roi.color}`}>{roi.val}</p>
                      <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">{roi.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 7: Roadmap */}
            {activeTab === 'roadmap' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  {[
                    { phase: 'Phase 1: Overlay', wks: 'Weeks 1-3', task: 'Deploy Next.js portal layout and connect Supabase database schemas.' },
                    { phase: 'Phase 2: AI Strategy', wks: 'Weeks 4-6', task: 'Integrate OpenAI risk-scoring engines and briefing models.' },
                    { phase: 'Phase 3: Enterprise', wks: 'Weeks 7-9', task: 'Connect live HubSpot webhooks and field mappings registries.' },
                    { phase: 'Phase 4: Automation', wks: 'Weeks 10-12', task: 'Configure Resend email triggers and complete audit logs.' }
                  ].map((step, idx) => (
                    <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-2 hover-card-glow transition">
                      <span className="text-[#C9922E] font-bold text-[9px] uppercase block">{step.wks}</span>
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider">{step.phase}</h4>
                      <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">{step.task}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 8: Readiness */}
            {activeTab === 'readiness' && (
              <div className="space-y-6">
                <div className="overflow-x-auto border border-[#E5E7EB] rounded-2xl bg-white shadow-xs">
                  <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px] border-b border-[#E5E7EB]">
                      <tr>
                        <th className="p-4">Identified Risk Factor</th>
                        <th className="p-4">Probability</th>
                        <th className="p-4">Severity Impact</th>
                        <th className="p-4">Mitigation Safeguard</th>
                        <th className="p-4">Owner</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB] text-slate-700 font-semibold text-[10.5px]">
                      {[
                        { r: 'HubSpot API Rate Limits', p: 'Low', i: 'Medium', m: 'Deploy Redis webhook caching queues to throttle peaks.', o: 'Lead Engineer', s: 'Mitigated' },
                        { r: 'Low User Adoption', p: 'Medium', i: 'High', m: 'Integrate interactive in-app guide walkthroughs.', o: 'UX Director', s: 'Mitigated' },
                        { r: 'Scope Creep', p: 'Medium', i: 'Medium', m: 'Strictly freeze MVP scope; defer payments to Phase 2.', o: 'Product Manager', s: 'Managed' },
                        { r: 'AI Model Hallucinations', p: 'Low', i: 'High', m: 'Inject pgvector context; require manual manager check.', o: 'AI Strategist', s: 'Mitigated' },
                        { r: 'GDPR Data Compliance', p: 'Low', i: 'High', m: 'Encrypt contract logs; strip PII customer name feeds.', o: 'Legal Ops', s: 'Active' }
                      ].map((risk, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-slate-800">{risk.r}</td>
                          <td className="p-4">
                            <span className="py-0.5 px-2 rounded-full text-[9px] bg-slate-100 text-slate-655">{risk.p}</span>
                          </td>
                          <td className="p-4">
                            <span className="py-0.5 px-2 rounded-full text-[9px] bg-slate-100 text-slate-655">{risk.i}</span>
                          </td>
                          <td className="p-4 text-slate-605">{risk.m}</td>
                          <td className="p-4 font-mono text-[9px] text-[#C9922E]">{risk.o}</td>
                          <td className="p-4">
                            <span className="py-0.5 px-2 rounded font-bold text-[9px] uppercase text-emerald-700 bg-emerald-50 border border-emerald-200">
                              {risk.s}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 9: Why doodleblue */}
            {activeTab === 'why' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-2 hover-card-glow transition shadow-xs">
                    <h4 className="font-bold text-slate-805 uppercase tracking-wider border-b border-slate-100 pb-1">Specialized Capabilities</h4>
                    <p className="text-[10.5px] text-slate-605 leading-relaxed font-semibold">
                      Proven expertise in building lightweight SaaS overlay layers that hook into legacy systems without migration risks.
                    </p>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-2 hover-card-glow transition shadow-xs">
                    <h4 className="font-bold text-slate-805 uppercase tracking-wider border-b border-slate-100 pb-1">Agile Delivery Model</h4>
                    <p className="text-[10.5px] text-slate-650 leading-relaxed font-semibold">
                      Structured 3–4 months sprint timeline mapping, ensuring active client reviews and feedback loops.
                    </p>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-2 hover-card-glow transition shadow-xs">
                    <h4 className="font-bold text-slate-805 uppercase tracking-wider border-b border-slate-100 pb-1">Enterprise Security</h4>
                    <p className="text-[10.5px] text-slate-655 leading-relaxed font-semibold">
                      Strict compliance protocols, deploying secure RBAC configurations and GDPR-ready data policies.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 10: Technical Appendix (AI usage register & Prompt library) */}
            {activeTab === 'appendix' && (
              <div className="space-y-8">
                
                {/* AI usage register */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#1B1F2A]">Responsible AI Usage Register</h3>
                  <div className="overflow-x-auto border border-[#E5E7EB] rounded-2xl bg-white shadow-xs">
                    <table className="w-full text-xs text-left border-collapse min-w-[750px]">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px] border-b border-[#E5E7EB]">
                        <tr>
                          <th className="p-3">Project Activity</th>
                          <th className="p-3">AI Tool</th>
                          <th className="p-3">Prompt Purpose</th>
                          <th className="p-3">AI Contribution</th>
                          <th className="p-3">Human Validation & Refinement</th>
                          <th className="p-3 text-[#C9922E]">Outcome</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB] text-slate-700 font-semibold text-[10px]">
                        {[
                          { t: 'Research Phase', a: 'OpenAI GPT-4o', p: 'Synthesize standard HubSpot multi-signature workflow limits.', g: 'Comparative outline of seat licensing vs overlay modules.', m: 'Added Northbridge specific parameters and doodleblue integration models.', o: 'Validated and refined architecture' },
                          { t: 'Architecture Map', a: 'Claude 3.5 Sonnet', p: 'Draft Supabase serverless webhook sync database schema.', g: 'PostgreSQL relational diagram connecting deals and approvals.', m: 'Verified RAG pgvector semantic match nodes manually.', o: 'Adopted reference design' },
                          { t: 'ROI Calculation', a: 'OpenAI GPT-4o', p: 'Calculate payback cycles for ₹12L-18L CapEx vs HubSpot seat overhead.', g: 'Excel mathematical payback equation models.', m: 'Adjusted target payback timeline limits to < 3 months.', o: 'Validated cash targets' },
                          { t: 'Risk Register', a: 'Claude 3.5 Sonnet', p: 'Formulate mitigation matrix for HubSpot API rate throttling.', g: 'Mitigations table outlining caching and queueing systems.', m: 'Added Redis cache throttle rules specific to Northbridge load levels.', o: 'Mitigation plan confirmed' }
                        ].map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 leading-relaxed">
                            <td className="p-3 font-bold text-slate-805">{item.t}</td>
                            <td className="p-3 font-mono text-[9px] text-[#C9922E]">{item.a}</td>
                            <td className="p-3 text-slate-600 truncate max-w-[130px]">{item.p}</td>
                            <td className="p-3 text-slate-600 truncate max-w-[130px]">{item.g}</td>
                            <td className="p-3 text-slate-600 truncate max-w-[135px]">{item.m}</td>
                            <td className="p-3 bg-[#FBF1DE]/10 text-[#C9922E] font-bold">{item.o}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Prompt Library */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#1B1F2A]">Structured Prompt Repository</h3>
                  <div className="space-y-3 text-xs font-semibold">
                    {[
                      { id: 'summary', title: 'Executive Summary Prompt', text: 'Act as a Principal McKinsey Strategy Consultant. Review an enterprise transformation project for doodleblue. Design a slide deck comparing standard HubSpot SaaS upgrades against a lightweight Next.js overlay. Emphasize CapEx payback, multi-signature approval blocks, and delivery capacity limits.' },
                      { id: 'roi', title: 'Financial ROI Prompt', text: 'Act as an Enterprise Solution Architect. Formulate an Excel formula template calculating CapEx savings of a custom portal overlay (budget ₹12L-18L) compared to standard HubSpot license seats (over 50 users in Legal/Finance). Clamp payback period parameters.' },
                      { id: 'arch', title: 'AI Architecture Prompt', text: 'Design a system architecture flowchart representing a context-injected RAG engine. Include data matching blocks utilizing LangChain + pgvector against legal documents (contracts/NDAs) before querying OpenAI GPT-4 APIs. Add validation check nodes.' },
                      { id: 'risk', title: 'Risk Register Prompt', text: 'Draft a Risk Mitigation matrix mapping probability and impact parameters for rate-limiting blocks during CRM synchronization. Detail Redis caching rules and GDPR compliance strategies.' }
                    ].map((item) => {
                      const isExpanded = expandedPromptTab === item.id;
                      return (
                        <div key={item.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 hover-card-glow transition">
                          <button
                            onClick={() => setExpandedPromptTab(isExpanded ? null : item.id)}
                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 transition border-b border-slate-200"
                          >
                            <span className="font-bold text-slate-800 text-[11px]">{item.title}</span>
                            <div className="flex items-center space-x-1.5 text-slate-450">
                              <span className="text-[9px] uppercase tracking-wider">View Prompt</span>
                              {isExpanded ? <ChevronUp className="h-4.5 w-4.5 text-[#C9922E]" /> : <ChevronDown className="h-4.5 w-4.5 text-[#C9922E]" />}
                            </div>
                          </button>
                          {isExpanded && (
                            <div className="p-4 font-mono text-[10px] text-[#C9922E] bg-slate-900 leading-relaxed select-all whitespace-pre-wrap animate-fade-in">
                              {item.text}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
