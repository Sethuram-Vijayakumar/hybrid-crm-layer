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
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return '';
    }
  };

  const showRisk = deal.risk && (deal.stage === 'Pending Approval' || deal.stage === 'Legal Review');

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white border border-slate-150 hover:border-slate-300 rounded-xl p-3.5 shadow-2xs hover:shadow-sm transition duration-150 cursor-pointer flex flex-col justify-between space-y-3.5 animate-fade-in hover-card-glow active-press"
    >
      {/* Top Row: Company name & conditional AI risk assessment */}
      <div className="flex justify-between items-start space-x-2.5">
        <h4 className="font-semibold text-xs text-slate-800 tracking-tight group-hover:text-slate-900 leading-snug line-clamp-2">
          {deal.companyName}
        </h4>
        
        {showRisk && (
          <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md border shrink-0 whitespace-nowrap uppercase tracking-wider ${getRiskBadgeColor(deal.risk)}`}>
            {deal.risk}
          </span>
        )}
      </div>

      {/* Bottom Row: Deal Value & Owner initials avatar */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-bold text-slate-905">
          {deal.dealValue}
        </span>

        <div 
          className={`h-5.5 w-5.5 rounded-full flex items-center justify-center text-[9px] font-bold select-none shadow-3xs shrink-0 ${deal.owner.avatarBg}`}
          title={`Owner: ${deal.owner.name}`}
        >
          {deal.owner.initials}
        </div>
      </div>
    </div>
  );
}
