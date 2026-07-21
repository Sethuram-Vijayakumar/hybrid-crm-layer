'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { Deal } from '@/lib/mock-data';
import { 
  Check, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  ArrowRight
} from 'lucide-react';

export default function ApprovalsPage() {
  const { deals, escalateDeal, tourActive, tourStep, setTourActive, setTourStep } = useApp();
  const router = useRouter();
  
  // States
  const [highRiskOnly, setHighRiskOnly] = useState(false);
  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);

  // Filter and sort deals in approval stages
  const approvalDeals = useMemo(() => {
    // 1. Get deals in "Pending Approval" or "Legal Review"
    const relevantDeals = deals.filter(
      (deal) => deal.stage === 'Pending Approval' || deal.stage === 'Legal Review'
    );

    // 2. Filter by High Risk if toggled
    const filtered = highRiskOnly
      ? relevantDeals.filter((deal) => deal.risk === 'High')
      : relevantDeals;

    // 3. Sort by Risk Level (High -> Medium -> Low)
    return [...filtered].sort((a, b) => {
      const riskWeight = { High: 3, Medium: 2, Low: 1, undefined: 0 };
      const weightA = riskWeight[a.risk || 'undefined'];
      const weightB = riskWeight[b.risk || 'undefined'];
      return weightB - weightA; // Descending weight
    });
  }, [deals, highRiskOnly]);

  const handleRowClick = (dealId: string) => {
    setExpandedDealId((prev) => (prev === dealId ? null : dealId));
  };

  const getRiskBadgeStyles = (risk: Deal['risk']) => {
    switch (risk) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Helper to extract the currently pending step from the approval chain
  const getCurrentPendingRole = (deal: Deal) => {
    if (!deal.approvalChain) return 'N/A';
    const pendingStep = deal.approvalChain.find((step) => step.status === 'pending');
    return pendingStep ? `${pendingStep.role} Lead` : 'Finance Lead';
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1B1F2A] tracking-tight">Approval Queue</h1>
        <p className="text-sm text-slate-600 font-semibold mt-1">
          Deals awaiting sign-off across Legal, Finance, and Delivery.
        </p>
      </div>

      {/* Approval Intelligence Banner */}
      <div className="bg-[#1B1F2A] text-white p-5 rounded-xl flex flex-wrap items-center justify-between gap-6 text-xs font-semibold shadow-xs">
        <div className="flex items-center space-x-2">
          <Zap className="h-4.5 w-4.5 text-[#C9922E] glowing-ring rounded-full" />
          <span className="font-bold text-sm tracking-tight text-white">Approval Intelligence</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-350">
          <span>8 Active Approvals</span>
          <span className="text-[#C9922E] font-bold">3 High Risk</span>
          <span>Average Delay: <strong className="text-white">4.4 Days</strong></span>
          <span>Highest Pending: <strong className="text-rose-400">Legal</strong></span>
          <span className="text-emerald-450">AI Recommendation: <strong className="underline">Escalate immediately</strong></span>
        </div>
      </div>

      {/* Filter / Toggle Control */}
      <div className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setHighRiskOnly(false)}
            className={`text-xs font-bold py-1.5 px-4 rounded-md transition duration-150 ${
              !highRiskOnly
                ? 'bg-white text-[#1B1F2A] shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            All Pending ({deals.filter(d => d.stage === 'Pending Approval' || d.stage === 'Legal Review').length})
          </button>
          <button
            onClick={() => setHighRiskOnly(true)}
            className={`text-xs font-bold py-1.5 px-4 rounded-md transition duration-150 ${
              highRiskOnly
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-rose-600'
            }`}
          >
            High Risk Only ({deals.filter(d => (d.stage === 'Pending Approval' || d.stage === 'Legal Review') && d.risk === 'High').length})
          </button>
        </div>

        <span className="text-xs font-medium text-slate-600">
          Showing {approvalDeals.length} active approvals
        </span>
      </div>

      {/* Approvals Table with Tour Pointer 1 */}
      <div className="relative">
        {tourActive && tourStep === 2 && (
          <div className="absolute -top-36 left-4 z-45 bg-white border-2 border-[#C9922E] p-4 rounded-xl shadow-xl w-72 animate-fade-in text-xs text-left">
            <div className="flex items-center space-x-2 text-[#C9922E] font-bold mb-1">
              <span className="h-5 w-5 rounded-full bg-[#C9922E] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
              <span className="font-semibold text-slate-800">Priority Sorted Queue</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed mb-2.5">
              Deals currently in approvals or legal review stages are sorted to bring high-risk items to the top automatically.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setTourStep(1);
                  router.push('/pipeline');
                }}
                className="text-[10px] text-slate-500 hover:text-slate-700 font-bold uppercase transition"
              >
                ← Back
              </button>
              <button
                onClick={() => setTourActive(false)}
                className="text-[10px] text-slate-400 hover:text-slate-655 font-bold uppercase transition"
              >
                Skip
              </button>
              <button
                onClick={() => {
                  setTourStep(3);
                  router.push('/analytics');
                }}
                className="bg-[#C9922E] hover:bg-[#b07f24] text-white text-[10px] py-1 px-2.5 rounded font-bold uppercase shadow-sm transition duration-150 active-press"
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E5E7EB] text-xs font-bold text-slate-650 uppercase tracking-wider">
                  <th className="py-4.5 px-6 whitespace-nowrap">Company</th>
                  <th className="py-4.5 px-6 whitespace-nowrap">Value</th>
                  <th className="py-4.5 px-6 whitespace-nowrap">Current Approval Stage</th>
                  <th className="py-4.5 px-6 whitespace-nowrap">Days Pending</th>
                  <th className="py-4.5 px-6 whitespace-nowrap">AI Risk Score</th>
                  <th className="py-4.5 px-6 whitespace-nowrap">AI Suggestion</th>
                  <th className="py-4.5 px-6 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {approvalDeals.length > 0 ? (
                  approvalDeals.map((deal) => {
                    const isExpanded = expandedDealId === deal.id;
                    const isEscalated = deal.aiSuggestion?.includes('Escalated');
                    const pendingRole = getCurrentPendingRole(deal);
                    
                    return (
                      <React.Fragment key={deal.id}>
                        {/* Main Row */}
                        <tr 
                          onClick={() => handleRowClick(deal.id)}
                          className={`hover:bg-slate-50/70 transition cursor-pointer select-none ${
                            isExpanded ? 'bg-slate-50/40' : ''
                          }`}
                        >
                          <td className="py-4 px-6 font-bold text-sm text-[#1B1F2A]">
                            {deal.companyName}
                          </td>
                          <td className="py-4 px-6 font-bold text-sm text-[#1B1F2A]">
                            {deal.dealValue}
                          </td>
                          <td className="py-4 px-6 text-xs font-semibold text-slate-700">
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="h-2 w-2 rounded-full bg-indigo-500" />
                              <span>{pendingRole}</span>
                            </span>
                          </td>
                          <td className="py-4 px-6 text-xs text-slate-600 font-medium">
                            {deal.daysPending} days
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${getRiskBadgeStyles(deal.risk)}`}>
                              {deal.risk} Risk
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`text-xs font-semibold ${
                              deal.risk === 'High' && !isEscalated
                                ? 'text-rose-700 font-bold'
                                : 'text-slate-600'
                            }`}>
                              {deal.aiSuggestion}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end space-x-2">
                              {!isEscalated && (deal.risk === 'High' || deal.risk === 'Medium') ? (
                                <button
                                  onClick={() => escalateDeal(deal.id)}
                                  className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-semibold text-[10px] px-3 py-1.5 rounded-lg shadow-sm transition active:scale-95"
                                >
                                  Escalate
                                </button>
                              ) : isEscalated ? (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                                  Escalated
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium text-slate-500">
                                  None Required
                                </span>
                              )}
                              <button
                                onClick={() => handleRowClick(deal.id)}
                                className="text-slate-400 hover:text-slate-600 p-1 transition"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Section */}
                        {isExpanded && (
                          <tr>
                            <td colSpan={7} className="p-0 bg-slate-50/20 border-b border-[#E5E7EB]">
                              <div className="p-6 space-y-6 animate-fade-in max-w-[1200px]">
                                
                                {/* Horizontal Stepper Chain with Tour Pointer 2 */}
                                <div className="relative">
                                  {tourActive && tourStep === 2 && (
                                    <div className="absolute -top-28 left-6 z-40 bg-white border-2 border-[#C9922E] p-3 rounded-xl shadow-xl w-64 animate-fade-in text-xs text-left">
                                      <div className="flex items-center space-x-2 text-[#C9922E] font-bold mb-1">
                                        <span className="h-5 w-5 rounded-full bg-[#C9922E] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                                        <span className="font-semibold text-slate-800">Approval Stepper Chain</span>
                                      </div>
                                      <p className="text-slate-600 font-medium leading-relaxed">
                                        Renders checkboxes for completed items, pulsing clock nodes for pending reviews, and open icons for future stages.
                                      </p>
                                    </div>
                                  )}

                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-650 mb-4">
                                    Approval Chain Flow
                                  </h4>
                                  <div className="flex items-center space-x-0 w-full max-w-2xl py-2 overflow-x-auto pb-4">
                                    {deal.approvalChain?.map((step, index) => {
                                      const isCompleted = step.status === 'completed';
                                      const isPending = step.status === 'pending';
                                      const isLast = index === (deal.approvalChain?.length ?? 0) - 1;

                                      return (
                                        <div key={step.role} className="flex items-center flex-1 last:flex-initial min-w-[110px]">
                                          {/* Stepper Node */}
                                          <div className="flex flex-col items-center relative z-10 shrink-0">
                                            <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                              isCompleted
                                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-100'
                                                : isPending
                                                ? 'bg-amber-50 border-amber-500 text-amber-600 shadow-sm animate-pulse'
                                                : 'bg-white border-slate-200 text-slate-400'
                                            }`}>
                                              {isCompleted ? (
                                                <Check className="h-4 w-4" />
                                              ) : isPending ? (
                                                <Clock className="h-4 w-4" />
                                              ) : (
                                                <span className="text-xs font-bold">{index + 1}</span>
                                              )}
                                            </div>
                                            <span className={`text-[10px] font-bold mt-2 tracking-tight ${
                                              isPending ? 'text-amber-655 font-black' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                                            }`}>
                                              {step.role}
                                            </span>
                                          </div>

                                          {/* Stepper Connect Line */}
                                          {!isLast && (
                                            <div className="flex-1 h-0.5 mx-2 bg-slate-200">
                                              <div 
                                                className={`h-full transition-all duration-300 ${
                                                  isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                                                }`} 
                                                style={{ width: isCompleted ? '100%' : '0%' }}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Highlighted AI Box with Tour Pointer 3 */}
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-l-4 border-[#C9922E] bg-[#FBF1DE] p-5 rounded-r-xl shadow-xs space-y-4 md:space-y-0 md:space-x-6 relative">
                                  <div className="space-y-1.5 flex-1">
                                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-800">
                                      <Zap className="h-4 w-4 text-[#C9922E] glowing-ring rounded-full" />
                                      <span>AI Escalation Intelligence</span>
                                    </div>
                                    <p className="text-xs text-slate-805 leading-relaxed font-medium">
                                      This deal has been pending {getCurrentPendingRole(deal).split(' ')[0]} review for {deal.daysPending} days. 
                                      Similar deals ({deal.rawValue >= 1000000 ? '₹10L+' : '₹5-10L'} range) average {deal.risk === 'High' ? '1.5' : '3.0'} days at this stage. 
                                      Recommend escalating directly to clear contract roadblocks.
                                    </p>
                                  </div>

                                  <div className="shrink-0 flex items-center space-x-3 relative">
                                    {tourActive && tourStep === 2 && (
                                      <div className="absolute -top-28 right-0 z-40 bg-white border-2 border-[#C9922E] p-3 rounded-xl shadow-xl w-64 animate-fade-in text-xs text-left">
                                        <div className="flex items-center space-x-2 text-[#C9922E] font-bold mb-1">
                                          <span className="h-5 w-5 rounded-full bg-[#C9922E] text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                                          <span className="font-semibold text-slate-800">One-Click Escalation</span>
                                        </div>
                                        <p className="text-slate-600 font-medium leading-relaxed">
                                          Instantly unblocks contract roadblocks by escalating to Lead level, updating statuses, and adding log entries.
                                        </p>
                                      </div>
                                    )}

                                    {!isEscalated ? (
                                      <button
                                        onClick={() => escalateDeal(deal.id)}
                                        className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-semibold text-xs py-2.5 px-5 rounded-lg shadow-sm transition duration-200 flex items-center space-x-1 active-press"
                                      >
                                        <span>Escalate Now</span>
                                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                                      </button>
                                    ) : (
                                      <div className="flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 py-2.5 px-5 rounded-lg text-xs font-semibold shadow-xs">
                                        <Check className="h-4 w-4 text-emerald-600" />
                                        <span>Escalation Complete</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 text-sm font-semibold">
                      No deals awaiting approvals matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
