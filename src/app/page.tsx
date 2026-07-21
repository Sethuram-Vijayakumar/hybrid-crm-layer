'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  TrendingUp, Users, DollarSign, Clock, AlertTriangle, 
  CheckCircle2, Layers, 
  Activity, Settings, 
  User, Check, X, Play, Sparkles
} from 'lucide-react';

export default function ExecutiveStrategyPage() {
  const { setPresentationMode, setCurrentSlide } = useApp();
  const [activeTab, setActiveTab] = useState<'summary' | 'problem' | 'personas' | 'journey' | 'matrix' | 'roi' | 'roadmap' | 'readiness' | 'why' | 'appendix'>('summary');

  const handleStartPresentation = () => {
    setPresentationMode(true);
    setCurrentSlide(1);
  };

  return (
    <div className="space-y-8 font-sans select-none pb-12">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 pb-2 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E]/10 text-[#C9922E] rounded uppercase tracking-wider font-extrabold mr-2">
            Strategic Case Study Hub
          </span>
          <h1 className="text-2xl font-bold text-[#1B1F2A] tracking-tight mt-1">Enterprise CRM Transformation</h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Northbridge Advisory • doodleblue Strategy Consulting Recommendation
          </p>
        </div>
        
        <button
          onClick={handleStartPresentation}
          className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-semibold text-xs py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 active-press flex items-center space-x-2 glowing-ring shrink-0"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>Launch Executive Presentation</span>
        </button>
      </div>

      {/* Case Study Tab Navigation */}
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

      {/* TAB CONTENT SPACES */}
      <div className="animate-fade-in">
        
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
                  desc: 'Avoids costly database replacements and full user training, reducing implementation budgets by approximately 70%.',
                  icon: DollarSign,
                  iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                },
                {
                  title: 'Timeline to Market',
                  desc: 'Production ready within 6–8 weeks using iterative milestone releases, preventing pipeline downtime or record migrations.',
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
                  { label: 'Deployment', value: '6–8 Weeks' },
                  { label: 'Estimated CapEx', value: '₹15L (70% Saving)' },
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
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Current SaaS CRM Limitations</h3>
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
                        <p className="text-[11px] text-slate-500 font-semibold">{prob.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Goals Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Target Strategic Outcomes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Reduce Costs', desc: 'Avoid seat licensing upgrades and custom rebuilds.' },
                    { title: 'Speed Up Approvals', desc: 'Establish priority queues to reduce cycle delays.' },
                    { title: 'Visible Pipelines', desc: 'Enable full pipeline transparency across divisions.' },
                    { title: 'Resource Allocation', desc: 'Avoid developer overallocations prior to signing.' },
                    { title: 'Save CRM Investments', desc: 'Avoid custom migration risks by retaining HubSpot.' },
                    { title: 'Future-Proof AI', desc: 'Build local database logs to execute predictive insights.' },
                    { title: 'Increase Adoption', desc: 'Interface matches current workflows with zero training.' },
                    { title: 'Lower Delivery Risk', desc: 'Roll out MVP modules incrementally to test sync stability.' }
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-700">{goal.title}</h4>
                        <p className="text-[11px] text-slate-500 font-semibold">{goal.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current vs Future Visual Comparison */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
              <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider mb-6 text-center">Current Siloed Model vs. Future Blended Model</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="border border-red-100 bg-red-50/10 p-5 rounded-xl text-center space-y-2">
                  <h4 className="text-xs font-bold text-red-700">HubSpot Sales CRM</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">Tracks deal values & stages, but lacks delivery visibility.</p>
                </div>
                <div className="text-center font-bold text-slate-400 text-sm hidden md:block">
                  VS
                </div>
                <div className="border border-[#C9922E]/20 bg-[#FBF1DE]/10 p-5 rounded-xl text-center space-y-2">
                  <h4 className="text-xs font-bold text-[#C9922E]">Hybrid CRM Overlay</h4>
                  <p className="text-[11px] text-slate-700 font-bold">Blends HubSpot pipeline volumes with ResourceOps capacity and custom approvals in one dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: User Personas */}
        {activeTab === 'personas' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                role: 'Sales Representative',
                goals: 'Close deals quickly without admin bottleneck delays.',
                pains: 'No status alerts once proposals enter Legal Review or Planning.',
                resp: 'Log leads and deal values inside standard HubSpot portal.',
                kpi: 'Pipeline stage velocity, total closed-won deal volume in INR.'
              },
              {
                role: 'Delivery Manager',
                goals: 'Verify engineering staff levels before new project contract signs.',
                pains: 'Sales closing accounts when delivery teams are overallocated.',
                resp: 'Monitor upcoming resource utilization demands.',
                kpi: 'Delivery capacity utilization target, zero staff overallocation.'
              },
              {
                role: 'Legal & Finance Director',
                goals: 'Access a simplified queue to review contract clauses rapidly.',
                pains: 'No automated notification signals when high-value deals stall.',
                resp: 'Authorize contract signatures in order of urgency.',
                kpi: 'Contract review cycle time, pending queue throughput.'
              },
              {
                role: 'Sales Manager',
                goals: 'Identify pipeline blockage reasons to forecast revenue.',
                pains: 'Siloed data prevents assessing risk scores on critical proposals.',
                resp: 'Escalate stagnant deals, review pipeline owner allocations.',
                kpi: 'Average deal cycle time, team quota achievement rate.'
              },
              {
                role: 'Executive Director (CEO/CTO)',
                goals: 'Deploy custom workflow controls without expensive database rebuilds.',
                pains: 'Upgrading software subscription seats for occasional approvers.',
                resp: 'Approve software engineering budgets and integration strategies.',
                kpi: 'Software CapEx savings, user CRM platform adoption rates.'
              }
            ].map((persona, idx) => (
              <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs space-y-4 hover-card-glow">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                  <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 shrink-0">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">{persona.role}</h4>
                </div>
                
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-[#C9922E] block uppercase text-[10px]">Goals</span>
                    <p className="text-slate-600 mt-0.5 font-medium">{persona.goals}</p>
                  </div>
                  <div>
                    <span className="font-bold text-rose-500 block uppercase text-[10px]">Pain Points</span>
                    <p className="text-slate-600 mt-0.5 font-medium">{persona.pains}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block uppercase text-[10px]">Key Focus</span>
                    <p className="text-slate-600 mt-0.5 font-medium">{persona.resp}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-50/50">
                    <span className="font-bold text-slate-500 block uppercase text-[10px]">Success Metrics</span>
                    <p className="text-[#1B1F2A] mt-0.5 font-bold">{persona.kpi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: User Journeys */}
        {activeTab === 'journey' && (
          <div className="space-y-8">
            {/* Current User Journey */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                <div className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">Current Siloed User Journey (Pain Points Highlighted)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-center">
                {[
                  { step: '1. Lead Logged', desc: 'Rep creates deal card in HubSpot.', pain: 'Standard workflow entry' },
                  { step: '2. Proposal Sent', desc: 'Contract drafted and value input.', pain: 'Familiar UI works well' },
                  { step: '3. Approval Request', desc: 'Emailed to Delivery lead.', pain: '⚠️ Deal stalls in inbox' },
                  { step: '4. Legal Review', desc: 'Sent to Legal director.', pain: '⚠️ No tracking notifications' },
                  { step: '5. Resource Planning', desc: 'Closed without checking loads.', pain: '⚠️ Delivery overload conflicts' },
                  { step: '6. Close Sign', desc: 'Contract complete.', pain: '⚠️ Client projects delayed' },
                ].map((item, idx) => (
                  <div key={idx} className="border border-slate-100 p-4 rounded-xl relative bg-slate-50/30 flex flex-col justify-between min-h-[140px]">
                    <div>
                      <h4 className="text-xs font-bold text-slate-705">{item.step}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-2 ${
                      item.pain.includes('⚠️') ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.pain}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Future User Journey */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">Future Hybrid Journey (Integrated Overlay Model)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-center">
                {[
                  { step: '1. Lead Created', desc: 'Rep creates deal card in HubSpot.', imp: 'Keeps HubSpot speed' },
                  { step: '2. AI Validation', desc: 'AI reviews contract parameters.', imp: '✨ Risk score assigned' },
                  { step: '3. Approval Queue', desc: 'Deals route to custom interface.', imp: '✨ Multi-signature track' },
                  { step: '4. Resource Check', desc: 'Overlay syncs with ResourceOps load.', imp: '✨ Warns before signing' },
                  { step: '5. Direct Escalation', desc: 'Managers bypass blockages via CTA.', imp: '✨ One-click email alerts' },
                  { step: '6. Delivery Launch', desc: 'Contract closed with zero delay.', imp: '✨ Customer satisfaction' },
                ].map((item, idx) => (
                  <div key={idx} className="border border-indigo-50/50 p-4 rounded-xl relative bg-indigo-50/5 flex flex-col justify-between min-h-[140px]">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{item.step}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-2 ${
                      item.imp.includes('✨') ? 'bg-emerald-50 text-emerald-700 font-extrabold' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.imp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Decision Matrix */}
        {activeTab === 'matrix' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-[#E5E7EB]">
                <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">Executive Decision Matrix</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-4 px-6">Evaluation Criteria</th>
                      <th className="py-4 px-6">Stay on SaaS & Upgrade</th>
                      <th className="py-4 px-6 bg-[#FBF1DE]/40 text-[#C9922E]">Hybrid Overlay Model (Recommended)</th>
                      <th className="py-4 px-6">Build 100% Custom CRM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {[
                      { item: 'Implementation Cost', saas: 'High (₹12L/year seat licensing)', hybrid: 'Low (₹3L–5L up-front CapEx)', custom: 'Very High (₹45L–65L custom development)' },
                      { item: 'Timeline to Launch', saas: 'Immediate', hybrid: 'Fast (3–4 Months)', custom: 'Slow (6–9 Months)' },
                      { item: 'Business Transition Risk', saas: 'Low', hybrid: 'Low (HubSpot remains database source)', custom: 'High (Complex data migrations)' },
                      { item: 'Platform Flexibility', saas: 'Low (Locked to SaaS pipeline designs)', hybrid: 'High (Custom Next.js layout structures)', custom: 'Very High' },
                      { item: 'AI Engine Integration', saas: 'Medium (Basic SaaS intelligence integrations)', hybrid: 'High (Direct local DB analysis metrics)', custom: 'Very High' },
                      { item: 'Sales Team Training', saas: 'None', hybrid: 'None (Reps stay inside HubSpot)', custom: 'High (Complete UI retraining required)' },
                      { item: 'Overall Recommendation', saas: 'Not Recommended (Cost-prohibitive)', hybrid: 'Highly Recommended (Best ROI & Speed)', custom: 'Not Recommended (High risk)' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-4 px-6 font-bold text-slate-800">{row.item}</td>
                        <td className="py-4 px-6 text-slate-605">{row.saas}</td>
                        <td className="py-4 px-6 bg-[#FBF1DE]/20 font-bold text-[#C9922E]">{row.hybrid}</td>
                        <td className="py-4 px-6 text-slate-600">{row.custom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#FBF1DE]/40 border-l-4 border-[#C9922E] p-6 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-[#C9922E] uppercase tracking-wider">Why the Hybrid Model Wins:</h4>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                Building a completely custom CRM is slow and creates huge database migration risks. Conversely, upgrading every occasional approver in Legal, Finance, or Delivery to enterprise SaaS tiers causes recurring licensing waste. The Hybrid Overlay addresses this by keeping standard HubSpot seats cheap, while providing a custom database layer for approval workflows.
              </p>
            </div>
          </div>
        )}

        {/* Tab 6: ROI Dashboard */}
        {activeTab === 'roi' && (
          <div className="space-y-8">
            {/* ROI Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Development Cost Savings', saas: 'Traditional custom CRM: ₹45L', overlay: 'Hybrid Overlay: ₹15L', saving: 'Net Saved: ₹30L CapEx', icon: DollarSign, color: 'text-[#C9922E]' },
                { label: 'Timeline Launch Speedup', saas: 'Traditional build: 9 Months', overlay: 'Hybrid build: 8 Weeks', saving: '60–70% Faster Delivery', icon: Clock, color: 'text-amber-500' },
                { label: 'Approval Cycle Reduction', saas: 'Current delay: 4.4 Days', overlay: 'Target delay: 1.5 Days', saving: '65% Cycle Reduction', icon: Activity, color: 'text-emerald-500' }
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs space-y-4 hover-card-glow">
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center ${card.color}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <h4 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">{card.label}</h4>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="text-slate-500 font-semibold">{card.saas}</p>
                      <p className="text-slate-700 dark:text-slate-300 font-semibold">{card.overlay}</p>
                      <p className={`font-bold border-t border-slate-100 pt-2 ${card.color}`}>{card.saving}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* expected outcomes */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">Expected Strategic Outcomes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { title: '70% Lower Cost', desc: 'Bypasses custom database migrations and platform seat licensing fees.' },
                  { title: '35% Faster Sales Cycle', desc: 'Priority queues and one-click lead notifications unblock contract delays.' },
                  { title: '50% Fewer Resource Conflicts', desc: 'Live capacity logs prevent signing contracts when delivery teams are overloaded.' },
                  { title: '95% CRM User Adoption', desc: 'Reps keep standard HubSpot forms, avoiding platform transition dropouts.' },
                  { title: '80% Faster Reporting', desc: 'Real-time sync compiles pipeline volumes alongside resource metrics instantly.' }
                ].map((out, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{out.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-semibold leading-relaxed">{out.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: MVP & Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            {/* Phase scope */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { phase: 'Phase 1: Foundations (Core Sync)', title: 'MVP Scope', items: ['Deals API sync', 'Priority Approvals Queue', 'Event logging triggers', 'Connected settings page'] },
                { phase: 'Phase 2: Automation (Integrations)', title: 'Custom Workflows', items: ['AI Risk Scoring badges', 'ResourceOps capacity dashboard', 'Webhook action triggers', 'Lead-level email alerts'] },
                { phase: 'Phase 3: Optimization (Analytics)', title: 'Future Expansion', items: ['Predictive resource hiring metrics', 'Intelligent pipeline forecasting', 'Executive automated highlights', 'Mobile overlay portal'] }
              ].map((p, idx) => (
                <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs space-y-4 hover-card-glow">
                  <div>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md uppercase tracking-wider">{p.phase}</span>
                    <h4 className="text-xs font-bold text-slate-850 mt-2">{p.title}</h4>
                  </div>
                  <ul className="space-y-2 text-xs">
                    {p.items.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2 text-slate-600 font-semibold">
                        <Check className="h-3.5 w-3.5 text-slate-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Implementation Timeline */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">8-Week Implementation Roadmap</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                {[
                  { week: 'Weeks 1–2', title: 'Data foundations', desc: 'Configure HubSpot API connections, deploy basic Supabase postgres schema mapping.' },
                  { week: 'Weeks 3–4', title: 'Approvals & Analytics', desc: 'Deliver approvals table, implement signature sequence logic, build resource planning graphs.' },
                  { week: 'Weeks 5–6', title: 'Resource & AI alerts', desc: 'Deploy automated AI risk metrics, build ResourceOps simulator tool, configure webhook listeners.' },
                  { week: 'Weeks 7–8', title: 'Security & Launch', desc: 'Set role authentication rules, execute performance tests, deploy production Vercel container.' }
                ].map((w, idx) => (
                  <div key={idx} className="border border-slate-100 p-4 rounded-xl bg-slate-50/20">
                    <span className="text-[10px] font-bold text-[#C9922E] block uppercase tracking-wider">{w.week}</span>
                    <h4 className="text-xs font-bold text-slate-700 mt-1">{w.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1.5 font-semibold leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: Risks & Readiness */}
        {activeTab === 'readiness' && (
          <div className="space-y-8">
            {/* Risk Matrix */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-[#E5E7EB]">
                <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">Strategic Risk Assessment</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-4 px-6">Identified Threat</th>
                      <th className="py-4 px-6">Risk Level</th>
                      <th className="py-4 px-6">Mitigation Action Plan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {[
                      { risk: 'HubSpot API downtime blocks CRM updates', level: 'Medium', mitigation: 'Enable automatic retry queue workers and cache mapping metrics in local PostgreSQL overlay database.' },
                      { risk: 'System transition causes active sales pipeline halt', level: 'Low', mitigation: 'Reps keep standard HubSpot forms; deploy overlay system parallelly with standard configurations.' },
                      { risk: 'AI risk assessment reports false bottleneck tags', level: 'Medium', mitigation: 'Keep human oversight active; approvals queue allows managers to override AI classifications manually.' },
                      { risk: 'Database rate-limits restrict sync speeds during scaling', level: 'Low', mitigation: 'Implement serverless edge routes, query bulk cron triggers, and optimize database indexing keys.' },
                      { risk: 'Data leakage exposes customer contract clauses', level: 'High', mitigation: 'Enforce strict JWT tokens, encrypt details at rest, and deploy role-based access control (RBAC).' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-4 px-6 font-bold text-slate-800">{row.risk}</td>
                        <td className="py-4 px-6">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            row.level === 'High' ? 'bg-rose-50 text-rose-700' : row.level === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {row.level}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-600 leading-relaxed">{row.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Production Checklist */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">Production Readiness Audit Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { title: 'Environment Variables', desc: 'Secure encryption parameters mapped for client SDKs.' },
                  { title: 'CI/CD Pipeline', desc: 'GitHub Actions trigger automatic compilation and builds on Vercel.' },
                  { title: 'Observability & Logs', desc: 'Performance monitoring logs enabled for serverless routes.' },
                  { title: 'Supabase Data Backups', desc: 'Automated weekly database backups configured.' },
                  { title: 'Webhook Resiliency', desc: 'Retry queue handling protects sync functions.' },
                  { title: 'Authentication Logic', desc: 'Strict JWT role authorization prevents data leaks.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-850">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 9: Why doodleblue */}
        {activeTab === 'why' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Product Strategy', desc: 'Balances business objectives, up-front CapEx costs, development speed, and client usability goals.', icon: TrendingUp },
                { title: 'Design Excellence', desc: 'Extends familiar HubSpot UI patterns with almost zero user retraining or overhead.', icon: Users },
                { title: 'Engineering Excellence', desc: 'Leverages serverless cloud tools (Next.js, Supabase API webhooks) for scaling.', icon: Settings },
                { title: 'AI Integration Strategy', desc: 'Injects machine learning cues only where they verify resource blockages.', icon: Sparkles }
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs space-y-3 hover-card-glow">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#C9922E]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">{card.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">{card.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#FBF1DE]/40 border-l-4 border-[#C9922E] p-6 rounded-r-xl space-y-2">
              <h4 className="text-xs font-bold text-[#C9922E] uppercase tracking-wider">Strategic Consulting Alignment</h4>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                This case study aligns directly with doodleblue&apos;s core strengths in enterprise product engineering, UX transformation, AI advisory, cloud-native deployments, and rapid digital product delivery.
              </p>
            </div>
          </div>
        )}

        {/* Tab 10: Technical Appendix */}
        {activeTab === 'appendix' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* API and Data Contracts */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Supabase PostgreSQL Schema (Custom Approvals)</h3>
                <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-[10px] font-mono overflow-x-auto leading-relaxed">
{`CREATE TABLE custom_deals (
  id VARCHAR(255) PRIMARY KEY, -- Maps to HubSpot ID
  company_name VARCHAR(255) NOT NULL,
  deal_value VARCHAR(100) NOT NULL,
  risk VARCHAR(50), -- High/Medium/Low
  days_pending INT DEFAULT 0
);

CREATE TABLE approval_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id VARCHAR(255) REFERENCES custom_deals(id),
  role VARCHAR(100) NOT NULL, -- Delivery/Legal/Finance
  status VARCHAR(50) DEFAULT 'upcoming'
);`}
                </pre>
              </div>

              {/* Webhook Automation */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Edge Function Webhook Routing Flow</h3>
                <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-[10px] font-mono overflow-x-auto leading-relaxed">
{`// Supabase Edge Function: trigger-escalation-email
Deno.serve(async (req) => {
  const { record } = await req.json(); // Custom deal details
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": \`Bearer \${API_KEY}\` },
    body: JSON.stringify({
      to: "lead-approver@northbridgeadvisory.com",
      subject: \`⚠️ URGENT: Deal Escalation - \${record.company_name}\`
    })
  });
  return new Response("OK", { status: 200 });
});`}
                </pre>
              </div>
            </div>

            {/* AI Prompt Engineering log */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">AI Prompt Engineering Log</h3>
              <div className="space-y-3 text-xs leading-relaxed text-slate-600 font-medium">
                <p>
                  *   **System Setup**: Initialized directory structures using Next.js App Router, configured routing states, and structured JSON seed files.
                </p>
                <p>
                  *   **Guided Tour Implementation**: Automated tooltip coordinate alignments to overlay pointers on active targets. Refined layouts to prevent clipping on small screen heights.
                </p>
                <p>
                  *   **Reconciling Figures**: Renamed fictional client identifiers to Northbridge Advisory and instance settings to `northbridge-hubspot-prd` to ensure total consistency across documentation files.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
