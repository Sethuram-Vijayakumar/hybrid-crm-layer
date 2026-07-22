'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Zap, Shield, Send
} from 'lucide-react';
import { Deal } from '@/lib/mock-data';

export default function ApprovalsPage() {
  const { deals, escalateDeal } = useApp();
  
  const highRiskCount = deals.filter(d => (d.stage === 'Pending Approval' || d.stage === 'Legal Review') && d.risk === 'High').length;
  
  // States
  const [highRiskOnly, setHighRiskOnly] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  
  // Discussion comment state
  const [comments, setComments] = useState<Record<string, { author: string; time: string; text: string }[]>>({
    '1': [
      { author: 'John Doe', time: '1h ago', text: 'Can we double-check the indemnity clause in Section 4.2? The client is requesting a broader scope.' },
      { author: 'Sarah Smith', time: '45m ago', text: 'I\'ve highlighted this for Legal. They are reviewing the risk profile now.' }
    ],
    '2': [
      { author: 'Marcus North', time: '2h ago', text: 'Billing terms set to Net-30. Please confirm if Finance can support Net-45.' }
    ]
  });
  const [newCommentText, setNewCommentText] = useState('');

  // Filter and sort deals in approvals stages
  const approvalDeals = useMemo(() => {
    const relevantDeals = deals.filter(
      (deal) => deal.stage === 'Pending Approval' || deal.stage === 'Legal Review'
    );

    const filtered = highRiskOnly
      ? relevantDeals.filter((deal) => deal.risk === 'High')
      : relevantDeals;

    // Sort: High -> Medium -> Low
    return [...filtered].sort((a, b) => {
      const riskWeight = { High: 3, Medium: 2, Low: 1, undefined: 0 };
      const weightA = riskWeight[a.risk || 'undefined'];
      const weightB = riskWeight[b.risk || 'undefined'];
      return weightB - weightA;
    });
  }, [deals, highRiskOnly]);

  // Set default selected deal
  useMemo(() => {
    if (approvalDeals.length > 0 && !selectedDealId) {
      setSelectedDealId(approvalDeals[0].id);
    }
  }, [approvalDeals, selectedDealId]);

  const selectedDeal = useMemo(() => {
    return deals.find(d => d.id === selectedDealId) || approvalDeals[0] || null;
  }, [deals, selectedDealId, approvalDeals]);

  // SLA helpers matching design parameters
  const getSlaDetails = (risk: Deal['risk']) => {
    switch (risk) {
      case 'High':
        return { label: '2h 15m remaining', percentage: 20, color: 'bg-rose-500' };
      case 'Medium':
        return { label: '1d 4h remaining', percentage: 50, color: 'bg-amber-500' };
      case 'Low':
        return { label: '4d 18h remaining', percentage: 80, color: 'bg-indigo-500' };
      default:
        return { label: '8d remaining', percentage: 90, color: 'bg-indigo-500' };
    }
  };

  const getPriorityDot = (risk: Deal['risk']) => {
    switch (risk) {
      case 'High':
        return { label: 'Critical', color: 'bg-rose-600' };
      case 'Medium':
        return { label: 'High', color: 'bg-amber-500' };
      case 'Low':
        return { label: 'Medium', color: 'bg-indigo-500' };
      default:
        return { label: 'Low', color: 'bg-slate-400' };
    }
  };

  const getDeptBadgeStyles = (role: string) => {
    if (role.toLowerCase().includes('legal')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (role.toLowerCase().includes('finance')) return 'bg-[#FBF1DE] text-[#C9922E] border-[#C9922E]/20';
    return 'bg-amber-50 text-amber-700 border-amber-250';
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeal || !newCommentText.trim()) return;
    
    const targetId = selectedDeal.id;
    const currentList = comments[targetId] || [];
    setComments({
      ...comments,
      [targetId]: [
        ...currentList,
        { author: 'Sarah Smith', time: 'Just now', text: newCommentText }
      ]
    });
    setNewCommentText('');
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">
      
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Overview</span>
          <h1 className="text-2xl font-bold text-[#1B1F2A] tracking-tight mt-0.5">Approval Management</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-700 block leading-none">{approvalDeals.length}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mt-1">Pending Actions</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <span className="text-2xl font-black text-rose-600 block leading-none">{highRiskCount}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mt-1">SLA at Risk</span>
          </div>
        </div>
      </div>

      {/* Top filter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { l: 'Legal', v: `${deals.filter(d => d.stage === 'Legal Review').length} Active`, iconBg: 'bg-indigo-50 text-indigo-700' },
          { l: 'Finance', v: `${deals.filter(d => d.stage === 'Pending Approval').length} Active`, iconBg: 'bg-[#FBF1DE] text-[#C9922E]' },
          { l: 'Delivery', v: `${deals.filter(d => d.stage === 'Qualification').length} Active`, iconBg: 'bg-amber-50 text-amber-700' }
        ].map((c, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex justify-between items-center hover-card-glow transition duration-200">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-bold block">{c.l}</span>
              <span className="text-lg font-black text-slate-900 block">{c.v}</span>
            </div>
            <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${c.iconBg}`}>
              <Shield className="h-4.5 w-4.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Split Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* Left Pane: Pending Approvals list table (Col Span 3) */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            
            {/* Header filters */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <span className="text-xs font-bold text-slate-805">Pending Approvals</span>
              <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setHighRiskOnly(false)}
                  className={`text-[10px] font-bold py-1 px-3.5 rounded transition ${
                    !highRiskOnly ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  All Active
                </button>
                <button
                  onClick={() => setHighRiskOnly(true)}
                  className={`text-[10px] font-bold py-1 px-3.5 rounded transition ${
                    highRiskOnly ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-500 hover:text-rose-600'
                  }`}
                >
                  High Risk
                </button>
              </div>
            </div>

            <div className="overflow-x-auto text-xs font-semibold">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="p-4">Deal / Contract Name</th>
                    <th className="p-4">Dept</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">SLA Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {approvalDeals.map((deal) => {
                    const isSelected = selectedDealId === deal.id;
                    const pendingRole = deal.stage === 'Legal Review' ? 'LEGAL' : 'FINANCE';
                    const sla = getSlaDetails(deal.risk);
                    const pri = getPriorityDot(deal.risk);

                    return (
                      <tr
                        key={deal.id}
                        onClick={() => setSelectedDealId(deal.id)}
                        className={`hover:bg-slate-50/70 transition cursor-pointer select-none ${
                          isSelected ? 'bg-indigo-50/30 border-l-4 border-[#C9922E]' : 'border-l-4 border-transparent'
                        }`}
                      >
                        <td className="p-4">
                          <div className="space-y-1">
                            <span className="font-bold text-slate-900 block text-xs">{deal.companyName} Master Agreement</span>
                            <span className="text-[9.5px] text-slate-400 font-semibold block">REQ-2023-08{deal.id} • John Doe</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${getDeptBadgeStyles(pendingRole)}`}>
                            {pendingRole}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${pri.color}`} />
                            <span className="text-slate-700 text-[10.5px]">{pri.label}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1.5 max-w-[120px]">
                            <span className="text-[10px] text-slate-700 block font-semibold">{sla.label}</span>
                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${sla.color}`} style={{ width: `${sla.percentage}%` }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

        </div>

        {/* Right Pane: Selected Deal Details (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {selectedDeal ? (
            <div className="space-y-6">
              
              {/* Contract Intelligence Panel */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-700 border-b border-slate-100 pb-3">
                  <Zap className="h-4.5 w-4.5 text-[#C9922E] glowing-ring rounded-full" />
                  <span className="uppercase tracking-wider">Contract Intelligence</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-indigo-50/50 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Auto-Detection: Liability Cap</span>
                    <p className="text-[10.5px] text-slate-800 leading-relaxed font-semibold">
                      Clause 14.2 exceeds standard enterprise threshold of $1M. Current: $2.5M.
                    </p>
                  </div>

                  <div className="p-3.5 bg-amber-50/50 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Risk: Governing Law</span>
                    <p className="text-[10.5px] text-slate-850 leading-relaxed font-semibold">
                      Jurisdiction set to Delaware, US. Preferred: London, UK for this entity.
                    </p>
                  </div>

                  {selectedDeal.aiSuggestion?.includes('Escalated') ? (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-[10.5px] text-center font-bold">
                      ✓ Escalation workflow already complete.
                    </div>
                  ) : (
                    <div className="pt-2 flex gap-3">
                      <button
                        onClick={() => escalateDeal(selectedDeal.id)}
                        className="flex-1 bg-[#C9922E] hover:bg-[#b07f24] text-white py-2.5 px-4 rounded-xl text-[10.5px] font-bold uppercase transition active-press"
                      >
                        Escalate Contract Risk
                      </button>
                      <button
                        onClick={() => alert(`Reviewing liability cap details for deal ${selectedDeal.companyName}`)}
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl text-[10.5px] font-bold uppercase transition"
                      >
                        View Full Analysis
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Approval Journey */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-805 text-xs uppercase tracking-wider border-b border-slate-100 pb-3">Approval Journey</h3>
                
                <div className="space-y-4 relative pl-4 border-l border-slate-100 py-1 ml-2 text-xs">
                  {/* Step 1: Submission */}
                  <div className="relative space-y-1">
                    <span className="absolute -left-[20px] top-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
                    <span className="font-bold text-slate-900 block">Submission</span>
                    <span className="text-[9.5px] text-slate-400 font-semibold block">John Doe • Aug 24, 09:12 AM</span>
                  </div>

                  {/* Step 2: Legal Review */}
                  <div className="relative space-y-1">
                    <span className={`absolute -left-[20px] top-0 h-3 w-3 rounded-full border-2 border-white ${
                      selectedDeal.stage === 'Legal Review' ? 'bg-indigo-600 animate-pulse' : 'bg-emerald-500'
                    }`} />
                    <span className="font-bold text-slate-900 block">Legal Review</span>
                    <span className="text-[9.5px] text-slate-500 font-semibold block">
                      {selectedDeal.stage === 'Legal Review' ? 'Pending Approval • Assigned to: Senior Legal Counsel' : 'Complete'}
                    </span>
                  </div>

                  {/* Step 3: Finance Validation */}
                  <div className="relative space-y-1">
                    <span className={`absolute -left-[20px] top-0 h-3 w-3 rounded-full border border-slate-200 bg-white ${
                      selectedDeal.stage === 'Pending Approval' ? 'bg-indigo-600 animate-pulse' : ''
                    }`} />
                    <span className="font-bold text-slate-400 block">Finance Validation</span>
                    <span className="text-[9.5px] text-slate-400 font-semibold block">
                      {selectedDeal.stage === 'Pending Approval' ? 'Pending Approval • Assigned to: Billing Ops Manager' : 'Pending legal sign-off'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Internal Discussion */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-805 text-xs uppercase tracking-wider">Internal Discussion</h3>
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[9px] font-bold">
                    {(comments[selectedDeal.id] || []).length} Comments
                  </span>
                </div>

                {/* Comment feeds */}
                <div className="space-y-3 text-[10.5px] leading-relaxed">
                  {(comments[selectedDeal.id] || []).map((cmt, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">{cmt.author}</span>
                        <span className="text-[9px] text-slate-400 font-normal">{cmt.time}</span>
                      </div>
                      <p className="text-slate-655 font-semibold">{cmt.text}</p>
                    </div>
                  ))}
                </div>

                {/* New comment input form */}
                <form onSubmit={handleAddComment} className="flex gap-2 items-center pt-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs border border-slate-200 rounded-xl px-4 py-2.5 outline-none transition"
                  />
                  <button
                    type="submit"
                    className="bg-[#C9922E] hover:bg-[#b07f24] text-white p-2.5 rounded-xl shadow-xs transition active-press"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-450 font-bold">
              Select a deal from approvals queue list to view contract details.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
