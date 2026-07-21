'use client';

import React from 'react';
import { Deal } from '@/lib/mock-data';

interface DealCardProps {
  deal: Deal;
  onClick: () => void;
}

export default function DealCard({ deal, onClick }: DealCardProps) {
  const getRiskBadgeColor = (risk: Deal['risk']) => {
    switch (risk) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return '';
    }
  };

  const showRisk = deal.risk && (deal.stage === 'Pending Approval' || deal.stage === 'Legal Review');

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-30 animate-fade-in hover-card-glow active-press"
    >
      {/* Top Row: Company name & conditional AI risk assessment */}
      <div className="flex justify-between items-start space-x-2">
        <h4 className="font-bold text-sm text-[#1B1F2A] tracking-tight group-hover:text-slate-800 line-clamp-2">
          {deal.companyName}
        </h4>
        
        {showRisk && (
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap ${getRiskBadgeColor(deal.risk)} ${deal.risk === 'High' ? 'glowing-ring' : ''}`}>
            {deal.risk}
          </span>
        )}
      </div>

      {/* Bottom Row: Deal Value & Owner initials avatar */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-bold text-[#1B1F2A]">
          {deal.dealValue}
        </span>

        <div 
          className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold select-none shadow-xs shrink-0 ${deal.owner.avatarBg}`}
          title={`Owner: ${deal.owner.name}`}
        >
          {deal.owner.initials}
        </div>
      </div>
    </div>
  );
}
