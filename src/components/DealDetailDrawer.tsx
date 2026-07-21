'use client';

import React from 'react';
import { Deal } from '@/lib/mock-data';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Clock, 
  User, 
  Tag, 
  Zap
} from 'lucide-react';

interface DealDetailDrawerProps {
  dealId: string | null;
  onClose: () => void;
}

export default function DealDetailDrawer({ dealId, onClose }: DealDetailDrawerProps) {
  const { deals, updateDealStage, escalateDeal } = useApp();
  
  const deal = deals.find((d) => d.id === dealId);
  if (!deal) return null;

  const showRisk = deal.risk && (deal.stage === 'Pending Approval' || deal.stage === 'Legal Review');
  const isEscalated = deal.aiSuggestion?.includes('Escalated');

  const getRiskColor = (risk: Deal['risk']) => {
    switch (risk) {
      case 'High':
        return 'text-rose-600 border-rose-200 bg-rose-50';
      case 'Medium':
        return 'text-amber-600 border-amber-200 bg-amber-50';
      case 'Low':
        return 'text-emerald-600 border-emerald-200 bg-emerald-50';
      default:
        return 'text-slate-600 border-slate-200 bg-slate-50';
    }
  };

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateDealStage(deal.id, e.target.value as Deal['stage']);
  };

  const handleEscalate = () => {
    escalateDeal(deal.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Background backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md transform transition-all duration-300 animate-slide-over bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="py-6 px-6 border-b border-[#E5E7EB] bg-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md uppercase tracking-wider">
                Deal Workspace
              </span>
            </div>
            <button 
              onClick={onClose}
              className="rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
            
            {/* Title & Value */}
            <div>
              <h2 className="text-xl font-bold text-[#1B1F2A] tracking-tight">{deal.companyName}</h2>
              <div className="mt-2 flex items-baseline space-x-3">
                <span className="text-2xl font-black text-[#1B1F2A]">{deal.dealValue}</span>
                <span className="text-xs text-slate-400 font-medium">Estimated Value</span>
              </div>
            </div>

            {/* AI Risk Card overlay (If Pending Approval or Legal Review) */}
            {showRisk && (
              <div className={`p-4 rounded-xl border ${
                deal.risk === 'High' 
                  ? 'bg-rose-50/50 border-rose-200' 
                  : deal.risk === 'Medium' 
                  ? 'bg-amber-50/50 border-amber-200' 
                  : 'bg-emerald-50/50 border-emerald-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Zap className={`h-4.5 w-4.5 ${
                      deal.risk === 'High' ? 'text-rose-600' : deal.risk === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                    }`} />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">AI Risk Analysis</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getRiskColor(deal.risk)}`}>
                    {deal.risk} Risk
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {deal.riskExplanation}
                </p>
                
                {deal.stage === 'Pending Approval' || deal.stage === 'Legal Review' ? (
                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-200/50">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Current suggestion: <span className="font-semibold text-slate-700">{deal.aiSuggestion}</span>
                    </span>
                    {!isEscalated && (
                      <button
                        onClick={handleEscalate}
                        className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-semibold text-[10px] px-2.5 py-1 rounded shadow-sm transition duration-200"
                      >
                        Escalate Now
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            {/* Core Deal Attributes */}
            <div className="border border-[#E5E7EB] rounded-xl p-4 space-y-4 bg-white">
              {/* Owner Attribute */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-xs text-slate-500 font-medium">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>Deal Owner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${deal.owner.avatarBg}`}>
                    {deal.owner.initials}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{deal.owner.name}</span>
                </div>
              </div>

              {/* Stage Changer Dropdown */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-xs text-slate-500 font-medium">
                  <Tag className="h-4 w-4 text-slate-400" />
                  <span>Pipeline Stage</span>
                </div>
                <select
                  value={deal.stage}
                  onChange={handleStageChange}
                  className="text-xs font-bold text-[#1B1F2A] bg-slate-50 border border-[#E5E7EB] rounded-lg py-1 px-2.5 focus:outline-none focus:border-slate-400 transition"
                >
                  <option value="Qualification">Qualification</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Legal Review">Legal Review</option>
                  <option value="Closed Won">Closed Won</option>
                </select>
              </div>

              {/* CRM ID */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">HubSpot Entity ID</span>
                <span className="text-xs font-mono text-slate-500">{deal.id}</span>
              </div>
            </div>

            {/* Deal History Timeline */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-4 flex items-center space-x-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>Deal History</span>
              </h3>
              
              <div className="relative pl-4 border-l border-slate-200 space-y-5 ml-2.5">
                {deal.dealHistory.map((history, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Node Bullet */}
                    <span className="absolute -left-[20.5px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-slate-400" />
                    
                    <div className="text-xs">
                      <p className="font-semibold text-slate-800">{history.event}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{history.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="py-4 px-6 border-t border-[#E5E7EB] bg-slate-50 flex items-center justify-between">
            <button 
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-700 font-semibold py-2 px-4 transition"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="bg-[#1B1F2A] hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-5 rounded-lg shadow-sm transition active:scale-95 flex items-center space-x-1"
            >
              <span>Done</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
