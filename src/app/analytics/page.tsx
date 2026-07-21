'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { Deal } from '@/lib/mock-data';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Activity, 
  Users, 
  Sparkles
} from 'lucide-react';

export default function AnalyticsPage() {
  const { deals, tourActive, tourStep, setTourActive, setTourStep } = useApp();
  const router = useRouter();
  
  // Simulation State: Toggle between baseline capacity and a spike scenario
  const [simulationMode, setSimulationMode] = useState<'Q2' | 'Q3'>('Q2');

  // 1. Dynamic Calculations from HubSpot Deal Data
  const stats = useMemo(() => {
    // Total Pipeline Value
    const totalPipeline = deals.reduce((sum, d) => sum + d.rawValue, 0);
    const totalPipelineStr = `₹${(totalPipeline / 100000).toFixed(1)}L`;

    // Active Approvals Count (Pending Approval & Legal Review)
    const activeApprovals = deals.filter(
      (d) => d.stage === 'Pending Approval' || d.stage === 'Legal Review'
    );
    const approvalsCount = activeApprovals.length;

    // Average Days Pending for deals in approval queue
    const totalDays = activeApprovals.reduce((sum, d) => sum + (d.daysPending || 0), 0);
    const avgDays = approvalsCount > 0 ? (totalDays / approvalsCount).toFixed(1) : '0';

    // Closed Won Value
    const wonDeals = deals.filter((d) => d.stage === 'Closed Won');
    const wonValue = wonDeals.reduce((sum, d) => sum + d.rawValue, 0);
    const wonValueStr = `₹${(wonValue / 100000).toFixed(1)}L`;

    return {
      totalPipelineStr,
      approvalsCount,
      avgDays,
      wonValueStr,
    };
  }, [deals]);

  // 2. Data Distribution for HubSpot pipeline stages
  const stageDistributions = useMemo(() => {
    const total = deals.length || 1;
    const stages: Deal['stage'][] = [
      'Qualification',
      'Proposal Sent',
      'Pending Approval',
      'Legal Review',
      'Closed Won',
    ];

    return stages.map((stage) => {
      const stageDeals = deals.filter((d) => d.stage === stage);
      const count = stageDeals.length;
      const percentage = Math.round((count / total) * 105); // Calibrated scale
      const rawValSum = stageDeals.reduce((sum, d) => sum + d.rawValue, 0);
      const formatted = `₹${(rawValSum / 100000).toFixed(1)}L`;

      return {
        stage,
        count,
        percentage,
        formatted,
      };
    });
  }, [deals]);

  // 3. Simulated Delivery Resource capacity logs (ResourceOps Feed)
  // Adjusted live in response to the simulation mode toggle
  const resourceMetrics = useMemo(() => {
    const baseline = [
      { role: 'Technical Architects', utilization: 68 },
      { role: 'Dev Leads', utilization: 74 },
      { role: 'Delivery Management', utilization: 90 },
      { role: 'QA & Deploy Ops', utilization: 50 },
    ];

    if (simulationMode === 'Q2') {
      return baseline;
    } else {
      // Simulate Q3 spike capacity levels: +22% or +25% utilization across elements
      return [
        { role: 'Technical Architects', utilization: 92 },
        { role: 'Dev Leads', utilization: 86 },
        { role: 'Delivery Management', utilization: 98 },
        { role: 'QA & Deploy Ops', utilization: 75 },
      ];
    }
  }, [simulationMode]);

  return (
    <div className="space-y-6 font-sans select-none">
      
      {/* Header & Simulation Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 relative">
        <div className="relative">
          {/* Tour Pointer 1 for Blended Metrics (positioned under the description title) */}
          {tourActive && tourStep === 3 && (
            <div className="absolute top-16 left-0 z-45 bg-white border-2 border-[#C9922E] p-4 rounded-xl shadow-xl w-68 animate-fade-in text-xs text-left">
              <div className="flex items-center space-x-2 text-[#C9922E] font-bold mb-1">
                <span className="h-5 w-5 rounded-full bg-[#C9922E] text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span className="font-semibold text-slate-800">Blended Analytics Metrics</span>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-2.5">
                Aggregates sales value metrics from HubSpot alongside simulated project delivery capacity loads from ResourceOps logs.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setTourStep(2);
                    router.push('/approvals');
                  }}
                  className="text-[10px] text-slate-500 hover:text-slate-700 font-bold uppercase transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setTourActive(false)}
                  className="bg-[#C9922E] hover:bg-[#b07f24] text-white text-[10px] py-1 px-3 rounded font-bold uppercase shadow-sm transition duration-150 active-press"
                >
                  Finish Tour
                </button>
              </div>
            </div>
          )}
          
          <h1 className="text-2xl font-bold text-[#1B1F2A] tracking-tight">Blended Analytics</h1>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Correlating CRM pipeline values with active resource capability levels.
          </p>
        </div>

        {/* Simulation Selector pill container with Tour Pointer 3 (positioned floating below) */}
        <div className="relative flex items-center space-x-3 bg-white border border-[#E5E7EB] rounded-xl p-2.5 shadow-xs shrink-0 self-start md:self-auto">
          {tourActive && tourStep === 3 && (
            <div className="absolute top-14 right-0 z-45 bg-white border-2 border-[#C9922E] p-4 rounded-xl shadow-xl w-68 animate-fade-in text-xs text-left">
              <div className="flex items-center space-x-2 text-[#C9922E] font-bold mb-1">
                <span className="h-5 w-5 rounded-full bg-[#C9922E] text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                <span className="font-semibold text-slate-850">Q3 Staff Spike Simulator</span>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-2.5">
                Simulates a 35% surge in deal volume to demonstrate how delivery capacity spikes over limit, triggering real-time alerts.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setTourStep(2);
                    router.push('/approvals');
                  }}
                  className="text-[10px] text-slate-500 hover:text-slate-700 font-bold uppercase transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setTourActive(false)}
                  className="bg-[#C9922E] hover:bg-[#b07f24] text-white text-[10px] py-1 px-3 rounded font-bold uppercase shadow-sm transition duration-150 active-press"
                >
                  Finish Tour
                </button>
              </div>
            </div>
          )}

          <span className="text-xs font-semibold text-slate-600">Simulate Scenario:</span>
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setSimulationMode('Q2')}
              className={`text-xs font-semibold py-1 px-3 rounded-md transition duration-150 ${
                simulationMode === 'Q2'
                  ? 'bg-white text-[#1B1F2A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-850'
              }`}
            >
              Q2 Baseline
            </button>
            <button
              onClick={() => setSimulationMode('Q3')}
              className={`text-xs font-semibold py-1 px-3 rounded-md transition duration-150 ${
                simulationMode === 'Q3'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              Q3 Workload Spike
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 4 Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Pipeline value card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between h-28 hover-card-glow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Pipeline</span>
            <TrendingUp className="h-4.5 w-4.5 text-indigo-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#1B1F2A]">{stats.totalPipelineStr}</span>
            <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">Sum of all opportunities</span>
          </div>
        </div>

        {/* Active approvals */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between h-28 hover-card-glow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Approvals</span>
            <Activity className="h-4.5 w-4.5 text-indigo-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#1B1F2A]">{stats.approvalsCount}</span>
            <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">Awaiting custom sign-off</span>
          </div>
        </div>

        {/* Average hold times */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between h-28 hover-card-glow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Avg approval Hold</span>
            <Clock className="h-4.5 w-4.5 text-[#C9922E]" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#1B1F2A]">{stats.avgDays} Days</span>
            <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">Per deal in approvals</span>
          </div>
        </div>

        {/* Closed Won value */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between h-28 hover-card-glow">
          <div className="flex items-center justify-between text-slate-555">
            <span className="text-xs font-bold uppercase tracking-wider">Closed Revenue</span>
            <Users className="h-4.5 w-4.5 text-emerald-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#1B1F2A]">{stats.wonValueStr}</span>
            <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">Fully signed and processed</span>
          </div>
        </div>

      </div>

      {/* Executive Insight Panel */}
      <div className="bg-[#FBF1DE]/40 border-l-4 border-[#C9922E] p-5 rounded-r-xl shadow-xs animate-fade-in">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 mb-1.5">
          <Sparkles className="h-4 w-4 text-[#C9922E] glowing-ring rounded-full shrink-0 animate-pulse" />
          <span>AI Executive Analytics Insight</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-semibold">
          AI has identified that **Delivery Management utilization reached 90%** (and is simulated to spike to **98% in Q3**). Historical approval delays strongly correlate with current resource utilization. 
          <span className="block mt-1 text-[#1B1F2A]">
            <strong>Recommendation:</strong> Temporarily allocate additional delivery capacity while prioritizing Legal approvals for high-value contracts to mitigate project delay risks.
          </span>
        </p>
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        
        {/* Chart 1: HubSpot Pipeline Volume by Stage */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4.5 w-4.5 text-slate-700" />
              <h3 className="font-bold text-sm text-[#1B1F2A]">CRM Pipeline Volume by Stage</h3>
            </div>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 py-0.5 px-2 rounded">
              HubSpot Feed
            </span>
          </div>

          <div className="space-y-4">
            {stageDistributions.map((stage) => (
              <div key={stage.stage} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="truncate">{stage.stage}</span>
                  <span className="font-bold text-[#1B1F2A] shrink-0">
                    {stage.formatted} <span className="text-slate-500 font-normal">({stage.count})</span>
                  </span>
                </div>
                {/* Horizontal Progress Bar */}
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      stage.stage === 'Closed Won'
                        ? 'bg-emerald-500'
                        : stage.stage === 'Legal Review' || stage.stage === 'Pending Approval'
                        ? 'bg-indigo-500'
                        : 'bg-slate-400'
                    }`}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Blended Delivery Capacity (ResourceOps) with Tour Pointer 2 (positioned floating below title inside card) */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs space-y-6 relative animate-fade-in">
          {tourActive && tourStep === 3 && (
            <div className="absolute top-14 left-4 z-45 bg-white border-2 border-[#C9922E] p-4 rounded-xl shadow-xl w-68 animate-fade-in text-xs text-left">
              <div className="flex items-center space-x-2 text-[#C9922E] font-bold mb-1">
                <span className="h-5 w-5 rounded-full bg-[#C9922E] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <span className="font-semibold text-slate-800">Delivery Team Capacity</span>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-2.5">
                Monitors exact staff utilization. Closed-won pipeline projects are blended in real-time to alert managers of overallocation.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setTourStep(2);
                    router.push('/approvals');
                  }}
                  className="text-[10px] text-slate-500 hover:text-slate-700 font-bold uppercase transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setTourActive(false)}
                  className="bg-[#C9922E] hover:bg-[#b07f24] text-white text-[10px] py-1 px-3 rounded font-bold uppercase shadow-sm transition duration-150 active-press"
                >
                  Finish Tour
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4.5 w-4.5 text-slate-700" />
              <h3 className="font-bold text-sm text-[#1B1F2A]">Delivery Capacity Utilization</h3>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 py-0.5 px-2 rounded">
              ResourceOps Feed
            </span>
          </div>

          <div className="space-y-4">
            {resourceMetrics.map((resource) => {
              const isCritical = resource.utilization >= 90;
              const isWarning = resource.utilization >= 75 && resource.utilization < 90;

              return (
                <div key={resource.role} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span className="truncate">{resource.role}</span>
                    <span className={`font-bold ${isCritical ? 'text-rose-700' : isWarning ? 'text-amber-700' : 'text-slate-700'}`}>
                      {resource.utilization}% {isCritical ? '• Critical' : isWarning ? '• Warning' : ''}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCritical 
                          ? 'bg-rose-500' 
                          : isWarning 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${resource.utilization}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Cross Platform AI Intelligence Report */}
      <div className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#C9922E] p-6 rounded-r-xl shadow-xs space-y-3 hover-card-glow transition duration-200">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#1B1F2A]">
          <Sparkles className="h-4.5 w-4.5 text-[#C9922E] glowing-ring rounded-full shrink-0" />
          <span className="uppercase tracking-wider">Cross-Platform AI Intelligence Report</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
          {simulationMode === 'Q2' ? (
            <span>
              <strong>Utilization Correlation Alert</strong>: Correlating live HubSpot opportunity parameters with ResourceOps logs shows that elevated workloads in <strong>Delivery Management (90%)</strong> are currently the primary drivers behind contract approval bottlenecks (average delay is currently {stats.avgDays} days). Escalating high-value pipelines directly will unblock resource bottlenecks.
            </span>
          ) : (
            <span>
              <strong>Critical Operational Bottleneck (Simulated Q3 Spike)</strong>: A 35% surge in deal volume pushes <strong>Technical Architects to 92% utilization</strong> and <strong>Delivery Management to 98% utilization</strong>. The AI engine predicts a <strong>2.8x increase in transaction friction (averaging 12.5 days delay)</strong> for deals exceeding ₹10L. Mitigate this by initiating contractor procurement before pipeline closures.
            </span>
          )}
        </p>
      </div>

    </div>
  );
}
