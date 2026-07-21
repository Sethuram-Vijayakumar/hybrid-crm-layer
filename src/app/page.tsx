'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Deal, mockOwners } from '@/lib/mock-data';
import DealCard from '@/components/DealCard';
import DealDetailDrawer from '@/components/DealDetailDrawer';
import { Search, Filter, RefreshCw, User, ClipboardList } from 'lucide-react';

export default function PipelinePage() {
  const { deals, isSyncing, triggerSync, tourActive, tourStep } = useApp();
  
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

  // Filter deals dynamically
  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      // 1. Search Query Match
      const matchesSearch = deal.companyName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // 2. Owner Match
      const matchesOwner =
        ownerFilter === 'All' || deal.owner.name === ownerFilter;

      // 3. Stage Match
      const matchesStage =
        stageFilter === 'All' || deal.stage === stageFilter;

      return matchesSearch && matchesOwner && matchesStage;
    });
  }, [deals, searchQuery, ownerFilter, stageFilter]);

  // Group deals by stage for the Kanban Board
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
    // Format value: e.g. 1500000 -> ₹15.0L
    return `₹${(total / 100000).toFixed(1)}L`;
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setOwnerFilter('All');
    setStageFilter('All');
  };

  return (
    <div className="space-y-6 font-sans select-none relative">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1F2A] tracking-tight">Deal Pipeline</h1>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Synced live from HubSpot. Managing local Custom Approval Workflows.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={triggerSync}
            disabled={isSyncing}
            className="bg-[#1B1F2A] hover:bg-slate-800 text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition duration-200 flex items-center space-x-2 active:scale-95 disabled:opacity-75"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync HubSpot Data'}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar with Tour Pointer 1 */}
      <div className="relative">
        {tourActive && tourStep === 1 && (
          <div className="absolute -top-28 left-4 z-40 bg-white border-2 border-[#C9922E] p-3 rounded-xl shadow-xl w-64 animate-fade-in text-xs text-left">
            <div className="flex items-center space-x-2 text-[#C9922E] font-bold mb-1">
              <span className="h-5 w-5 rounded-full bg-[#C9922E] text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
              <span className="font-semibold text-slate-800">Search & Pipeline Filters</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed">
              Filter incoming sales opportunities by company name, HubSpot owner, or deal pipeline stage instantly.
            </p>
          </div>
        )}

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search companies (e.g. Bluepeak)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-[#E5E7EB] focus:bg-white focus:border-slate-400 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none transition duration-150"
            />
          </div>

          {/* Owner Dropdown */}
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-slate-500 shrink-0" />
            <select
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              className="bg-slate-50 border border-[#E5E7EB] hover:border-slate-300 rounded-lg py-2 px-3 text-xs focus:outline-none focus:bg-white font-semibold text-slate-700 transition"
            >
              <option value="All">All Owners</option>
              {mockOwners.map((owner) => (
                <option key={owner.name} value={owner.name}>
                  {owner.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stage Dropdown */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-500 shrink-0" />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-slate-50 border border-[#E5E7EB] hover:border-slate-300 rounded-lg py-2 px-3 text-xs focus:outline-none focus:bg-white font-semibold text-slate-700 transition"
            >
              <option value="All">All Stages</option>
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Link */}
          {(searchQuery || ownerFilter !== 'All' || stageFilter !== 'All') && (
            <button 
              onClick={handleClearFilters}
              className="text-xs text-[#C9922E] hover:text-[#b07f24] font-bold md:pl-2 shrink-0 transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Kanban Board columns */}
      <div className="flex gap-5 overflow-x-auto pb-6 w-full select-none relative">
        {stages.map((stage) => {
          const columnDeals = stageColumns[stage] || [];
          const totalValue = getStageTotalValue(columnDeals);
          const isApprovalOrLegal = stage === 'Pending Approval' || stage === 'Legal Review';

          return (
            <div 
              key={stage} 
              className={`flex flex-col w-[270px] shrink-0 rounded-xl p-4 bg-slate-50 border relative ${
                isApprovalOrLegal 
                  ? 'border-indigo-100 bg-indigo-50/5' 
                  : 'border-[#E5E7EB]'
              }`}
            >
              {/* Tour Pointer 2 for Stage Headers (Qualification Lane) */}
              {tourActive && tourStep === 1 && stage === 'Qualification' && (
                <div className="absolute -top-28 left-0 z-40 bg-white border-2 border-[#C9922E] p-3 rounded-xl shadow-xl w-64 animate-fade-in text-xs text-left">
                  <div className="flex items-center space-x-2 text-[#C9922E] font-bold mb-1">
                    <span className="h-5 w-5 rounded-full bg-[#C9922E] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                    <span className="font-semibold text-slate-800">Live Stage Totals</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Visualizes total deals inside this lane, and summarizes estimated pipeline value aggregates in Indian Rupees.
                  </p>
                </div>
              )}

              {/* Tour Pointer 3 for Risk Indicators (Pending Approval Lane) */}
              {tourActive && tourStep === 1 && stage === 'Pending Approval' && (
                <div className="absolute -top-28 left-0 z-40 bg-white border-2 border-[#C9922E] p-3 rounded-xl shadow-xl w-64 animate-fade-in text-xs text-left">
                  <div className="flex items-center space-x-2 text-[#C9922E] font-bold mb-1">
                    <span className="h-5 w-5 rounded-full bg-[#C9922E] text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                    <span className="font-semibold text-slate-800">AI Risk Scoring</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    AI flags high/medium risk tags on contracts stalling in review. Click a card to read full risk summaries.
                  </p>
                </div>
              )}

              {/* Column Header */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">{stage}</span>
                <span className="flex h-5 min-w-[20px] px-1.5 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                  {columnDeals.length}
                </span>
              </div>

              {/* Column Sub-Header showing Total Value */}
              <div className="text-[11px] text-slate-500 font-semibold mb-4">
                {totalValue} Total
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {columnDeals.length > 0 ? (
                  columnDeals.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onClick={() => setSelectedDealId(deal.id)}
                    />
                  ))
                ) : (
                  <div className="h-24 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-3 text-center">
                    <ClipboardList className="h-5 w-5 text-slate-300 mb-1" />
                    <span className="text-[10px] font-medium text-slate-400">No deals in stage</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over Drawer Panel */}
      <DealDetailDrawer 
        dealId={selectedDealId} 
        onClose={() => setSelectedDealId(null)} 
      />
    </div>
  );
}
