'use client';

import React from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  UserCheck, 
  Database
} from 'lucide-react';

export default function PromptLibraryPage() {
  const promptLog = [
    {
      category: 'Pipeline Risk Scoring',
      purpose: 'Assess deal delay probability based on contract stage holding duration and current team capacities.',
      prompt: `You are an AI Risk Operations Analyst. Analyze the contract stage parameters:
Opportunity Value: {{deal_value}}
Days in Current Stage: {{days_pending}}
Current Delivery Lead Capacity: {{utilization}}%
Assess the likelihood of delay (High/Medium/Low), calculate delay probability, and outline the resource bottleneck drivers.`
    },
    {
      category: 'Executive Summary Briefing',
      purpose: 'Compile daily revenue forecasts, bottleneck opportunities, and action items for senior executives.',
      prompt: `You are a Principal Management Consultant. Review the active HubSpot opportunity array and summarize:
1. Today's active pipeline volume
2. Deals delayed beyond SLA limits
3. Urgent recommendations to unblock staff resource allocation.`
    },
    {
      category: 'Meeting & Transcript Summarizer',
      purpose: 'Parse conversational audio transcripts and extract Action Items, Owners, and Deadlines.',
      prompt: `You are a Staff Project Manager. Review this meeting transcript:
Transcript: {{transcript_text}}
Extract action items in key deliverables, assign the appropriate team owner (Sales, Delivery, Legal, Finance), and map target calendar deadlines.`
    }
  ];

  const overrideLogs = [
    {
      id: 'AI-LOG-904',
      tool: 'Pipeline Risk Analyzer',
      proposal: 'Northbridge Advisory (₹45L)',
      aiRating: 'High Risk',
      decision: 'Manually Overridden',
      reason: 'Sales Director approved directly because client Legal team provided an signed NDA ahead of scheduled review.'
    },
    {
      id: 'AI-LOG-881',
      tool: 'Resource Allocator',
      proposal: 'Global Tech Systems (₹15L)',
      aiRating: 'Reject (Over capacity)',
      decision: 'Approved',
      reason: 'Engineering VP allocated contractor budget to cover delivery load before sign-off was processed.'
    },
    {
      id: 'AI-LOG-850',
      tool: 'Escalation Dispatcher',
      proposal: 'Zenith Logistics (₹8L)',
      aiRating: 'High Priority',
      decision: 'Kept Standard',
      reason: 'Account owner requested standard queue to maintain stakeholder relationship during negotiation.'
    }
  ];

  return (
    <div className="space-y-6 font-sans pb-12 select-none text-slate-800">
      
      {/* Header Banner */}
      <div className="pb-3 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#C9922E]/10 text-[#C9922E] rounded uppercase tracking-wider font-bold">
            Auditing & Compliance Logs
          </span>
          <h1 className="text-xl font-semibold text-[#1B1F2A] tracking-tight mt-1">Prompt Library & AI Usage Logs</h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            System prompts auditing logs, manual overrides register, and security compliance parameters.
          </p>
        </div>
      </div>

      {/* Grid: Prompts and Overrides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side: System Prompts */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5 border-b border-slate-50 pb-2">
              <Terminal className="h-4 w-4 text-[#C9922E]" />
              <span>Core AI Prompt Engineering Registry</span>
            </h3>
            
            <div className="space-y-4">
              {promptLog.map((p, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2.5">
                  <div>
                    <span className="text-[10px] font-bold text-[#C9922E] uppercase block">{p.category}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{p.purpose}</span>
                  </div>
                  <pre className="w-full bg-slate-900 text-slate-200 p-3 rounded-lg text-[9px] font-mono whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {p.prompt}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Override Logs and Security specifications */}
        <div className="space-y-6">
          
          {/* Overrides Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5 border-b border-slate-50 pb-2">
              <UserCheck className="h-4 w-4 text-[#C9922E]" />
              <span>Human-in-the-Loop Override Register</span>
            </h3>
            
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Logs detailing where human operators overrode algorithmic recommendations, ensuring strict regulatory audit traces.
            </p>

            <div className="space-y-3">
              {overrideLogs.map((log) => (
                <div key={log.id} className="border border-slate-100 p-4 rounded-xl space-y-2 bg-slate-50/20 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-1.5 font-bold">
                    <span className="text-slate-800">{log.proposal}</span>
                    <span className="text-[9px] text-[#C9922E] bg-[#FBF1DE] py-0.5 px-2 rounded-md font-bold">
                      {log.id}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] py-1 font-semibold">
                    <div>
                      <span className="text-slate-400 uppercase tracking-wider block text-[8px]">AI Tag:</span>
                      <span className="text-rose-600 font-bold">{log.aiRating}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase tracking-wider block text-[8px]">Human Action:</span>
                      <span className="text-emerald-600 font-bold">{log.decision}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-semibold pt-1 border-t border-slate-50">
                    <strong>Reason:</strong> {log.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Security and GDPR details */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5 border-b border-slate-50 pb-2">
              <ShieldCheck className="h-4 w-4 text-[#C9922E]" />
              <span>Security & Compliance Auditing specs</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              {[
                { title: 'RBAC Access Checks', desc: 'Active auth locks ensure contract approvals can only be triggered by signed users matching role parameters.', icon: UserCheck },
                { title: 'GDPR Compliance', desc: 'No customer PII data is transmitted to AI scoring models. Pipelines use anonymized opportunity IDs.', icon: Database }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start space-x-2.5 p-3 border border-slate-100 rounded-lg bg-slate-50/20">
                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[#C9922E]">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-800">{item.title}</h4>
                      <p className="text-[10px] text-slate-550 mt-0.5 leading-relaxed font-semibold">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
