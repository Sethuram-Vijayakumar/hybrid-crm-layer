'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Deal } from '@/lib/mock-data';
import { 
  Sparkles, 
  Search, 
  Sliders, 
  Mail, 
  FileText, 
  Activity 
} from 'lucide-react';

export default function AICommandCenter() {
  const { deals } = useApp();
  
  // Dynamic Calculations from HubSpot Deal Data
  const stats = useMemo(() => {
    const totalPipeline = deals.reduce((sum, d) => sum + d.rawValue, 0);
    const totalPipelineStr = `₹${(totalPipeline / 100000).toFixed(1)}L`;

    const activeApprovals = deals.filter(
      (d) => d.stage === 'Pending Approval' || d.stage === 'Legal Review'
    );
    const approvalsCount = activeApprovals.length;

    return {
      totalPipelineStr,
      approvalsCount
    };
  }, [deals]);
  
  // States for interactive simulations & controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(deals[0] || null);
  const [legalTeamSize, setLegalTeamSize] = useState(3);
  const [deliveryTeamSize, setDeliveryTeamSize] = useState(4);
  const [copilotOutput, setCopilotOutput] = useState<string>('Select an action from the right-hand panel to generate strategic materials.');
  const [outputTitle, setOutputTitle] = useState<string>('Copilot Terminal Output');

  // Simulated AI calculations based on What-If Sliders
  const simulationResults = useMemo(() => {
    // Baseline averages
    const baseDays = 4.4;
    const baseRevenueConfidence = 82;
    
    // Adjust values dynamically
    // More legal team members reduce hold times significantly
    const legalFactor = 3 / legalTeamSize; 
    // More delivery leads handle load spikes better
    const deliveryFactor = 4 / deliveryTeamSize; 
    
    const simulatedDays = Math.max(1.2, parseFloat((baseDays * legalFactor).toFixed(1)));
    const simulatedUtilization = Math.max(50, Math.min(98, Math.round(90 * deliveryFactor)));
    const simulatedRevenueConfidence = Math.min(99, Math.round(baseRevenueConfidence + (legalTeamSize - 3) * 4 + (deliveryTeamSize - 4) * 3));
    
    return {
      approvalDays: simulatedDays,
      utilization: simulatedUtilization,
      revenueConfidence: simulatedRevenueConfidence
    };
  }, [legalTeamSize, deliveryTeamSize]);

  // Natural Language search filter simulation
  const filteredDeals = useMemo(() => {
    if (!searchQuery) return deals;
    const query = searchQuery.toLowerCase();
    
    // Simple natural language matching rules
    if (query.includes('high risk') || query.includes('high-risk')) {
      return deals.filter(d => d.risk === 'High');
    }
    if (query.includes('above 10') || query.includes('over 10') || query.includes('10l')) {
      return deals.filter(d => {
        const val = parseFloat(d.dealValue.replace(/[^0-9.]/g, ''));
        return val >= 10;
      });
    }
    if (query.includes('legal')) {
      return deals.filter(d => d.stage === 'Legal Review');
    }
    
    return deals.filter(d => 
      d.companyName.toLowerCase().includes(query) || 
      d.stage.toLowerCase().includes(query)
    );
  }, [searchQuery, deals]);

  // Copilot Generator actions
  const handleGenerateEscalation = (deal: Deal) => {
    setOutputTitle(`Escalation Email: ${deal.companyName}`);
    setCopilotOutput(`To: legal-escalations@northbridgeadvisory.com
Subject: URGENT: Approval Escalation Required for ${deal.companyName} [HubSpot ID: ${deal.id}]

Dear Legal Operations Team,

This is an automated escalation initiated via the Northbridge Advisory Hybrid CRM Layer. The opportunity with ${deal.companyName} valued at ${deal.dealValue} has spent ${deal.daysPending} days in the Legal Review stage, which exceeds our target threshold of 3 days.

AI Operational Analysis:
- Pipeline Friction Index: 87% (Probability of delivery delay)
- Confidence Level: 91%
- Resource Impact: High. Project Delivery slots are currently at 90% load and are projected to hit 98% capacity in Q3.

Action Required:
Please prioritize review of the attached contract clauses. If no action is logged within 24 hours, this item will escalate to executive management.

Sincerely,
Strategic Sales Operations Assistant
[HubSpot CRM Overlay Integration]`);
  };

  const handleGenerateBriefing = () => {
    setOutputTitle("AI Executive Briefing Report");
    setCopilotOutput(`# Executive Strategic Briefing - July 2026

## 1. Pipeline Status Summary
*   **Total Revenue Value**: ${stats.totalPipelineStr} Across ${deals.length} active engagements.
*   **Revenue At Risk**: ₹45L in pending Legal Review stages.
*   **High Risk Accounts**: 2 critical bottlenecks identified.

## 2. Operational Constraints
*   **Resource Utilization**: Delivery Management is currently at **90% utilization** (Simulated to spike to **98%** under Q3 volumes).
*   **Legal Hold Times**: Average approval hold is currently ${simulationResults.approvalDays} days (Simulated baseline).

## 3. Key Recommendations
1.  **Immediate Procurement**: Hire 2 contract developers to mitigate Q3 delivery risks.
2.  **Clause Streamlining**: Authorize standard NDAs automatically to unblock the legal queue.`);
  };

  const handleGeneratePRD = (deal: Deal) => {
    setOutputTitle(`Product Requirements Document (PRD): ${deal.companyName}`);
    setCopilotOutput(`# Product Requirements Document
## Project: Hybrid Overlay Sync Integration for ${deal.companyName}

### 1. Business Objective
Deliver custom signature validation portals that integrate HubSpot opportunity logs with Supabase PostgreSQL to prevent deal hold delays.

### 2. User Stories
*   **US-1**: As a Sales Representative, I need real-time email alerts when Legal signs a contract so that I can schedule project kickoffs instantly.
*   **US-2**: As a Delivery Manager, I need to see upcoming deal values so that I can check staff allocations.

### 3. Success Metrics
*   **Target Hold Cycle**: Under 1.5 Days.
*   **Integrity Sync Rate**: 100% (Zero database sync faults).`);
  };

  return (
    <div className="space-y-6 font-sans pb-12 select-none text-slate-800">
      
      {/* Header Banner */}
      <div className="pb-3 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#C9922E]/10 text-[#C9922E] rounded uppercase tracking-wider font-bold">
            Executive Control Panel
          </span>
          <h1 className="text-xl font-semibold text-[#1B1F2A] tracking-tight mt-1">AI Strategy & Command Center</h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Real-time pipeline analytics, What-If simulation engines, and AI-assisted email drafting.
          </p>
        </div>
      </div>

      {/* Main Command Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Briefing & What-If Simulator */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Briefing summary */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5 border-b border-slate-50 pb-2">
              <Sparkles className="h-4 w-4 text-[#C9922E]" />
              <span>Today&apos;s AI Executive Briefing</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
                <span className="font-semibold text-slate-600">Average Approval Hold</span>
                <span className="font-bold text-[#1B1F2A]">{simulationResults.approvalDays} Days</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
                <span className="font-semibold text-slate-600">Simulated Delivery Load</span>
                <span className="font-bold text-[#1B1F2A]">{simulationResults.utilization}%</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1.5">
                <span className="font-semibold text-slate-600">Revenue Confidence Index</span>
                <span className="font-bold text-emerald-600">{simulationResults.revenueConfidence}%</span>
              </div>
            </div>
          </div>

          {/* What-If Simulator */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
            <div className="flex items-center space-x-1.5 border-b border-slate-50 pb-2">
              <Sliders className="h-4 w-4 text-[#C9922E]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">What-If Simulation Engine</h3>
            </div>
            
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Adjust resource counts to simulate the business impact on approval cycle speed and Q3 capacity.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Legal Reviewers:</span>
                  <span className="text-[#1B1F2A] font-bold">{legalTeamSize} Staff</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="6" 
                  value={legalTeamSize} 
                  onChange={(e) => setLegalTeamSize(parseInt(e.target.value))}
                  className="w-full accent-[#C9922E] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Delivery Leads:</span>
                  <span className="text-[#1B1F2A] font-bold">{deliveryTeamSize} Staff</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="8" 
                  value={deliveryTeamSize} 
                  onChange={(e) => setDeliveryTeamSize(parseInt(e.target.value))}
                  className="w-full accent-[#C9922E] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-[#FBF1DE]/25 p-3 rounded-lg border border-[#C9922E]/20 text-[10px] text-slate-700 font-semibold leading-relaxed">
              <strong>Expected Outcome:</strong> Escalating Legal staff to {legalTeamSize} decreases hold cycles by {(100 - (3/legalTeamSize)*100).toFixed(0)}%, securing ₹15L+ in contract closures earlier.
            </div>
          </div>

        </div>

        {/* Center Column: Deal Selector & Risk Analytics */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Natural Language Search bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Natural Language Deal Query</h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text"
                placeholder="e.g. 'high risk' or 'above 10L'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-[#1B1F2A] focus:outline-none focus:border-[#C9922E] transition"
              />
            </div>
            <span className="text-[9px] text-slate-400 font-semibold block">
              Filtered {filteredDeals.length} of {deals.length} deals in workspace context.
            </span>
          </div>

          {/* Deals list */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pipeline Risk Cues</h3>
            
            <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
              {filteredDeals.map((deal) => {
                const isSelected = selectedDeal?.id === deal.id;
                const isHigh = deal.risk === 'High';
                const isMed = deal.risk === 'Medium';
                
                return (
                  <button
                    key={deal.id}
                    onClick={() => setSelectedDeal(deal)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition flex items-center justify-between group active-press ${
                      isSelected 
                        ? 'border-[#C9922E] bg-[#FBF1DE]/10' 
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'
                    }`}
                  >
                    <div className="truncate">
                      <span className="block font-bold text-slate-800 truncate">{deal.companyName}</span>
                      <span className="text-[10px] text-slate-550 block mt-0.5">{deal.stage} • {deal.dealValue}</span>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                      isHigh 
                        ? 'bg-rose-50 text-rose-700' 
                        : isMed 
                        ? 'bg-amber-50 text-amber-700' 
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {deal.risk}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explainability widget */}
          {selectedDeal && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 animate-fade-in">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-50 pb-2">
                AI Risk Explanation: {selectedDeal.companyName}
              </h3>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Delay Probability:</span>
                  <span className={`font-bold ${selectedDeal.risk === 'High' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {selectedDeal.risk === 'High' ? '87%' : '14%'}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Model Confidence Rating:</span>
                  <span className="text-[#1B1F2A] font-bold">91%</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold mt-1">
                  <strong>Trigger:</strong> {selectedDeal.risk === 'High' 
                    ? 'Legal queue workload currently exceeds standard operational limits. Client contract has non-standard SLA clauses requiring direct review.' 
                    : 'Standard NDA parameters verified. High historical turnaround probability.'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: AI Copilot Generator Terminal */}
        <div className="space-y-6 lg:col-span-1">
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-50 pb-2">
              Enterprise AI Copilot
            </h3>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => selectedDeal && handleGenerateEscalation(selectedDeal)}
                disabled={!selectedDeal}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-bold flex flex-col items-center justify-center gap-1.5 transition active-press text-[#C9922E] disabled:opacity-40"
              >
                <Mail className="h-4 w-4" />
                <span>Draft Escalation</span>
              </button>
              <button
                onClick={handleGenerateBriefing}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-bold flex flex-col items-center justify-center gap-1.5 transition active-press text-indigo-600"
              >
                <Activity className="h-4 w-4" />
                <span>Q3 Report Brief</span>
              </button>
              <button
                onClick={() => selectedDeal && handleGeneratePRD(selectedDeal)}
                disabled={!selectedDeal}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-bold flex flex-col items-center justify-center gap-1.5 transition active-press text-emerald-600 disabled:opacity-40"
              >
                <FileText className="h-4 w-4" />
                <span>Generate PRD</span>
              </button>
              <button
                onClick={() => {
                  setOutputTitle("Jira Sprint Automation");
                  setCopilotOutput(`[Sprint-2 Task Automation]
1. Task: Establish Supabase DB overlay schemas for deal field mapping.
   - Owner: Engineering Lead
   - Priority: High
   - Dependency: HubSpot credentials mapping complete.
   
2. Task: Deploy webhook listener functions to catch opportunity updates.
   - Owner: Staff Backend Engineer
   - Priority: Medium
   
3. Task: Configure priority escalation emails via Resend API.
   - Owner: Full Stack Developer
   - Priority: Medium`);
                }}
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-bold flex flex-col items-center justify-center gap-1.5 transition active-press text-amber-600"
              >
                <Sliders className="h-4 w-4" />
                <span>Sprint Tasks</span>
              </button>
            </div>

            {/* Simulated AI text display */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                {outputTitle}
              </span>
              <pre className="w-full bg-slate-900 text-slate-350 p-4 rounded-xl text-[10px] font-mono whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-[30vh] border border-slate-800">
                {copilotOutput}
              </pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
