'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Database, 
  RefreshCw, 
  Check, 
  ToggleLeft, 
  ToggleRight, 
  Network,
  Cpu,
  Layers
} from 'lucide-react';

export default function SettingsPage() {
  const { 
    syncStatus, 
    isSyncing, 
    triggerSync, 
    fieldMappings, 
    toggleFieldMapping 
  } = useApp();

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1B1F2A] tracking-tight">Settings & Sync</h1>
        <p className="text-sm text-slate-600 font-semibold mt-1">
          Manage what syncs between HubSpot and this custom workspace overlay.
        </p>
      </div>

      {/* Grid: Connection & Capacity Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Section 1: HubSpot Connection Status */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between h-48 md:col-span-2">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-[#1B1F2A]">HubSpot Connection</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 py-0.5 px-2 rounded-full">
                Connected
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-slate-500 font-semibold">ACCOUNT NAME</p>
              <p className="text-sm font-bold text-[#1B1F2A] mt-0.5">Northbridge Advisory</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
            <span className="text-xs text-slate-600 font-semibold">{syncStatus}</span>
            <button
              onClick={triggerSync}
              disabled={isSyncing}
              className="bg-[#1B1F2A] hover:bg-slate-800 text-white font-semibold text-xs py-2 px-4 rounded-lg shadow-sm transition duration-200 active:scale-95 disabled:opacity-75 flex items-center space-x-1.5"
            >
              <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* Section 4: Delivery Capacity Integration Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between h-48">
          <div>
            <div className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-sm text-[#1B1F2A]">Resource Planning</h3>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-slate-500 font-semibold">EXTERNAL PLATFORM</p>
              <p className="text-sm font-bold text-[#1B1F2A] mt-0.5">ResourceOps CRM v4</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs text-slate-650 font-semibold">
            <span>Joined for Capacity Reporting</span>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 py-0.5 px-2 rounded-full">
              Synced: 12 min ago
            </span>
          </div>
        </div>

      </div>

      {/* Section 2: Field Sync Map */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-slate-500" />
            <h3 className="font-bold text-sm text-[#1B1F2A]">Field Synchronization Map</h3>
          </div>
          <span className="text-xs text-slate-600 font-semibold">Controls HubSpot entity flow</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-[#E5E7EB]">
                <th className="py-3 px-6">HubSpot Source Field</th>
                <th className="py-3 px-6">Synced Destination Field</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Synchronization Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-xs font-medium">
              {fieldMappings.map((mapping) => (
                <tr key={mapping.hubspotField} className="hover:bg-slate-50/50 transition">
                  <td className="py-4.5 px-6 font-semibold text-[#1B1F2A]">
                    {mapping.hubspotField}
                  </td>
                  <td className="py-4.5 px-6 text-slate-600 font-mono">
                    {mapping.syncedTo}
                  </td>
                  <td className="py-4.5 px-6">
                    <span className={`inline-flex items-center space-x-1 ${
                      mapping.enabled ? 'text-emerald-700' : 'text-slate-400'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${mapping.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span>{mapping.enabled ? 'Active Sync' : 'Disabled'}</span>
                    </span>
                  </td>
                  <td className="py-4.5 px-6 text-right">
                    <button
                      onClick={() => toggleFieldMapping(mapping.hubspotField)}
                      className="text-slate-400 hover:text-slate-600 transition"
                    >
                      {mapping.enabled ? (
                        <ToggleRight className="h-7 w-7 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-7 text-slate-300" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Hybrid Architecture Cards */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="h-5 w-5 text-slate-700" />
          <h3 className="font-bold text-sm text-[#1B1F2A]">Hybrid System Architecture</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* HubSpot System of Record */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
            <div className="bg-[#1B1F2A] px-5 py-4 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">HubSpot</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                System of Record
              </span>
            </div>
            
            <div className="p-5">
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Core database storage containing master CRM records, client records, communication audits, and raw pipeline metrics.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Contacts & Companies',
                  'Email Sync',
                  'Calendar',
                  'Mobile Access',
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3 text-xs text-slate-700 font-semibold">
                    <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5 text-slate-600" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Custom Approval Layer */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-xs">
            <div className="bg-[#C9922E] px-5 py-4 text-slate-950 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">Custom Layer</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#b07f24] text-slate-950 rounded">
                Built Here
              </span>
            </div>
            
            <div className="p-5">
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Supabase overlay executing validation rules, pipeline scoring, and multi-signature custom approvals not natively in HubSpot.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Approval Workflows',
                  'Blended Reporting',
                  'AI Risk Scoring',
                  'Escalation Suggestions',
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3 text-xs text-slate-700 font-semibold">
                    <div className="h-5 w-5 rounded-full bg-[#FBF1DE] flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5 text-[#C9922E]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
