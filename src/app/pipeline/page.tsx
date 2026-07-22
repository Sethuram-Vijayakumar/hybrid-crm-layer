'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Deal, mockOwners } from '@/lib/mock-data';
import DealCard from '@/components/DealCard';
import DealDetailDrawer from '@/components/DealDetailDrawer';
import { 
  Search, RefreshCw, DollarSign, TrendingUp, AlertTriangle, Briefcase
} from 'lucide-react';

export default function PipelinePage() {
  const { deals, isSyncing, triggerSync } = useApp();
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);

  const stages: Deal['stage'][] = [
    'Qualification',
    'Proposal Sent',
    'Pending Approval',
    'Legal Review',
    'Closed Won',
  ];

  // Map database stage names to cleaner labels in Screenshot 4
  const stageLabels: Record<Deal['stage'], string> = {
    'Qualification': 'Lead',
    'Proposal Sent': 'Qualified',
    'Pending Approval': 'Proposal',
    'Legal Review': 'Legal Review',
    'Closed Won': 'Won'
  };

  // Filter deals dynamically
  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch = deal.companyName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOwner = ownerFilter === 'All' || deal.owner.name === ownerFilter;
      const matchesStage = stageFilter === 'All' || deal.stage === stageFilter;
      return matchesSearch && matchesOwner && matchesStage;
    });
  }, [deals, searchQuery, ownerFilter, stageFilter]);

  // Group deals by stage for Kanban Board
  const stageColumns = useMemo(() => {
    const columns: Record<Deal['stage'], Deal[]> = {
      Qualification: [],
      'Proposal Sent': [],
      'Pending Approval': [],
      'Legal Review': [],
      'Closed Won': [],
    };

    filteredDeals.forEach((deal) => {
      if (columns[deal.stage]) {
        columns[deal.stage].push(deal);
      }
    });

    return columns;
  }, [filteredDeals]);

  // Calculate sum of values in each stage column
  const getStageTotalValue = (stageDeals: Deal[]) => {
    const total = stageDeals.reduce((sum, deal) => sum + deal.rawValue, 0);
    return `₹${(total / 100000).toFixed(1)}L`;
  };

  return (
    <div className="space-y-6 font-sans text-slate-805 select-none relative">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Enterprise CRM</span>
          <h1 className="text-2xl font-bold text-[#1B1F2A] tracking-tight mt-0.5">Pipeline Management</h1>
        </div>
        
        <button
          onClick={triggerSync}
          disabled={isSyncing}
          className="bg-[#1B1F2A] hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition duration-150 flex items-center space-x-2 shrink-0 active-press disabled:opacity-75"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing...' : 'Sync HubSpot Data'}</span>
        </button>
      </div>

      {/* Top Metrics Cards Grid (Screenshot 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Total Pipeline Value */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
          <div className="flex justify-between items-start text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[9px]">Total Pipeline Value</span>
            <div className="p-1.5 bg-slate-50 rounded-lg text-slate-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <span className="text-2xl font-black text-slate-900 tracking-tight">₹42.5M</span>
            <span className="flex items-center space-x-1 text-emerald-600 text-[10px] font-bold">
              <TrendingUp className="h-3 w-3" />
              <span>+12% vs last month</span>
            </span>
          </div>
        </div>

        {/* Metric 2: Weighted Forecast */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
          <div className="flex justify-between items-start text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[9px]">Weighted Forecast</span>
            <div className="p-1.5 bg-slate-50 rounded-lg text-slate-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <span className="text-2xl font-black text-slate-900 tracking-tight">₹18.2M</span>
            <span className="text-slate-500 text-[10px] block font-semibold mt-0.5">72% confidence interval</span>
          </div>
        </div>

        {/* Metric 3: Active Deals */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
          <div className="flex justify-between items-start text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[9px]">Active Deals</span>
            <div className="p-1.5 bg-slate-50 rounded-lg text-slate-600">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <span className="text-2xl font-black text-slate-900 tracking-tight">124</span>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-indigo-500 rounded-full w-[65%]" />
            </div>
          </div>
        </div>

        {/* Metric 4: High Risk Deals */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover-card-glow transition duration-200">
          <div className="flex justify-between items-start text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[9px]">High Risk Deals</span>
            <div className="p-1.5 bg-slate-50 rounded-lg text-slate-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <span className="text-2xl font-black text-rose-600 tracking-tight">8</span>
            <span className="text-rose-600 text-[10px] font-bold block mt-0.5">Action required today</span>
          </div>
        </div>

      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
        <div className="flex items-center space-x-3 w-full sm:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search deals, companies..."
              className="bg-slate-50 border border-slate-200 text-xs text-slate-800 pl-10 pr-4 py-2.5 rounded-xl w-full focus:bg-white focus:border-slate-350 outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          {/* Owner Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500 font-bold">Owner:</span>
            <select
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-xs font-bold text-slate-700 outline-none hover:bg-slate-100 transition"
            >
              <option value="All">All Owners</option>
              {mockOwners.map((owner) => (
                <option key={owner.name} value={owner.name}>{owner.name}</option>
              ))}
            </select>
          </div>

          {/* Stage Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500 font-bold">Stage:</span>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-xs font-bold text-slate-700 outline-none hover:bg-slate-100 transition"
            >
              <option value="All">All Stages</option>
              {stages.map((stage) => (
                <option key={stage} value={stage}>{stageLabels[stage]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns Wrapper */}
      <div className="relative">
        
        {/* Kanban Board Grid */}
        <div className="flex space-x-6 items-start overflow-x-auto pb-6 min-h-[600px] scrollbar-thin">
          {stages.map((stage) => {
            const stageDeals = stageColumns[stage] || [];
            
            return (
              <div key={stage} className="bg-slate-50/45 border border-slate-200 rounded-2xl p-4.5 flex flex-col space-y-4 w-72 shrink-0 shadow-3xs">
                
                {/* Column header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-slate-900 text-xs block">{stageLabels[stage]}</h3>
                    <span className="text-[10px] text-slate-450 font-bold block">{stageDeals.length} Deals</span>
                  </div>
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-black text-[10px]">
                    {getStageTotalValue(stageDeals)}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3.5 min-h-[300px]">
                  {stageDeals.length > 0 ? (
                    stageDeals.map((deal) => (
                      <DealCard
                        key={deal.id}
                        deal={deal}
                        onClick={() => setSelectedDealId(deal.id)}
                      />
                    ))
                  ) : (
                    <div className="h-32 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-[10px] font-bold">
                      Empty stage
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Selected Deal Details drawer overlay */}
      {selectedDealId && (
        <DealDetailDrawer
          dealId={selectedDealId}
          onClose={() => setSelectedDealId(null)}
        />
      )}

    </div>
  );
}
