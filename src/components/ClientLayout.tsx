'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Columns, 
  CheckCircle2, 
  Settings, 
  RefreshCw, 
  Database,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    syncStatus, 
    isSyncing, 
    triggerSync, 
    highRiskApprovalsCount,
    tourActive,
    setTourActive,
    tourStep,
    setTourStep
  } = useApp();

  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('onboardingDismissed') !== 'true';
    }
    return true;
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Pipeline',
      href: '/',
      icon: Columns,
    },
    {
      name: 'Approvals',
      href: '/approvals',
      icon: CheckCircle2,
      badge: highRiskApprovalsCount > 0 ? highRiskApprovalsCount : undefined,
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
    },
    {
      name: 'Settings & Sync',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans">
      {/* Onboarding Overlay */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-[#1B1F2A]/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div className="bg-white border-2 border-[#C9922E]/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto flex flex-col transform transition-all duration-300">
            {/* Header */}
            <div className="bg-[#1B1F2A] text-white p-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-950 rounded-md uppercase tracking-wider font-extrabold mr-2">
                  Executive Case Study recommendation
                </span>
                <h2 className="text-base font-bold inline-block tracking-tight text-white mt-1 sm:mt-0">
                  SaaS CRM → Custom CRM Overlay Recommendation
                </h2>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                Prepared by doodleblue Strategy Consulting for Acme Services Inc.
              </span>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 bg-slate-50/30">
              {/* ROI & recommendation */}
              <div className="space-y-3">
                <div className="h-10 w-10 bg-[#FBF1DE] text-[#C9922E] rounded-xl flex items-center justify-center shadow-xs">
                  <span className="font-extrabold text-sm">1</span>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">The Hybrid Case & ROI</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Migrating completely off SaaS to a custom CRM causes severe sales disruption and costs <strong>₹15L+</strong> in custom development. Staying on SaaS requires upgrading to expensive tiers for approval features.
                </p>
                <p className="text-xs text-slate-700 leading-relaxed font-bold border-t border-slate-100 pt-2">
                  <strong>Recommendation</strong>: A Hybrid Layer. Retain HubSpot as the sales system of record, and overlay this custom light framework for approvals and resource sync. <strong>Saves 75% in dev time.</strong>
                </p>
              </div>

              {/* AI Value-Add */}
              <div className="space-y-3">
                <div className="h-10 w-10 bg-[#FBF1DE] text-[#C9922E] rounded-xl flex items-center justify-center shadow-xs">
                  <span className="font-extrabold text-sm">2</span>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">AI Value-Add (Scoring)</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Standard CRMs lack native intelligence to identify hold-ups. The Custom Layer introduces automated AI risk scoring. By comparing deal metrics (value and days pending) against historic pipeline performance, it flags <strong>High Risk</strong> contract roadblocks.
                </p>
                <p className="text-xs text-slate-700 leading-relaxed font-bold border-t border-slate-100 pt-2">
                  <strong>Actionable Suggestions</strong>: Generates micro-explanations and direct &quot;Escalate Now&quot; pathways for sales leads, bypassing traditional approval bottlenecks.
                </p>
              </div>

              {/* Blended capacity */}
              <div className="space-y-3">
                <div className="h-10 w-10 bg-[#FBF1DE] text-[#C9922E] rounded-xl flex items-center justify-center shadow-xs">
                  <span className="font-extrabold text-sm">3</span>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Blended Reporting Sync</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Combines CRM deal pipelines with delivery resources (via a simulated <strong>ResourceOps</strong> API integration). It alerts managers if closed deals will exceed staffing availability, preventing delivery delays.
                </p>
                <p className="text-xs text-slate-700 leading-relaxed font-bold border-t border-slate-100 pt-2">
                  <strong>Blended Visibility</strong>: Live pipeline volume feeds are blended directly with delivery capacity logs in the <strong>Analytics</strong> page to anticipate resource bottlenecks.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#E5E7EB] bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-600 font-semibold">
                Status: Connected to HubSpot Instance • acme-hubspot-prd
              </span>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('onboardingDismissed', 'true');
                  }
                  setShowOnboarding(false);
                  setTourActive(true);
                  setTourStep(1);
                }}
                className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-semibold text-xs py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition duration-200 active:scale-98 flex items-center space-x-2"
              >
                <span>Launch Interactive Demo</span>
                <span className="text-xs font-normal">→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6 z-30">
        <div className="flex items-center space-x-3">
          {/* Hamburger Menu Icon for Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-[#1B1F2A] hover:bg-slate-100 p-2 rounded-lg mr-1 transition active:scale-95"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="h-9 w-9 rounded-lg bg-[#1B1F2A] flex items-center justify-center shadow-md shrink-0">
            <span className="text-[#C9922E] font-bold text-lg">H</span>
          </div>
          <div>
            <span className="font-bold text-base md:text-lg tracking-tight text-[#1B1F2A]">Hybrid CRM Layer</span>
            <span className="hidden sm:inline-block text-[10px] ml-2 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold uppercase tracking-wider">doodleblue Case</span>
          </div>
        </div>
        
        {/* HubSpot Sync Pill */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={triggerSync}
            disabled={isSyncing}
            className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] rounded-full py-1.5 px-3 md:px-4 text-xs text-slate-700 font-semibold transition duration-200 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <span className={`h-2 w-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="max-w-[120px] sm:max-w-[200px] truncate">{syncStatus}</span>
            <RefreshCw className={`h-3 w-3 text-slate-600 ml-1 ${isSyncing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Body Wrapper */}
      <div className="flex flex-1 pt-16">
        {/* Mobile Left Sidebar Overlay (Drawer) */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer Content */}
            <aside className="relative w-64 max-w-xs bg-[#1B1F2A] h-full flex flex-col justify-between p-4 z-50 animate-slide-over text-white pt-16">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded transition"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="py-6 flex-1 flex flex-col justify-between">
                {/* Nav Menu */}
                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-slate-800 to-[#1b263b] text-white border-l-4 border-[#C9922E]'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border-l-4 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-4.5 w-4.5 transition-colors duration-200 ${
                            isActive ? 'text-[#C9922E]' : 'text-slate-400 group-hover:text-slate-200'
                          }`} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className="flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-[#C9922E] text-white text-[10px] font-bold shadow-md">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Sidebar Bottom branding details */}
                <div className="pt-4 border-t border-slate-800 mt-auto">
                  <div className="flex items-start space-x-3 mb-2">
                    <Database className="h-4 w-4 text-[#C9922E] mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-300">Connected Instance</h4>
                      <p className="text-[10px] text-slate-500">acme-hubspot-prd</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Left Sidebar Navigation (Desktop) */}
        <aside className="hidden md:flex fixed top-16 left-0 bottom-0 w-60 bg-[#1B1F2A] flex flex-col justify-between z-20 shadow-xl border-r border-[#1B1F2A]">
          <div className="py-6 flex-1 flex flex-col justify-between">
            {/* Nav Menu */}
            <nav className="space-y-1.5 px-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-slate-800 to-[#1b263b] text-white border-l-4 border-[#C9922E]'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-4.5 w-4.5 transition-colors duration-200 ${
                        isActive ? 'text-[#C9922E]' : 'text-slate-400 group-hover:text-slate-200'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-[#C9922E] text-slate-900 text-[10px] font-bold shadow-md animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar Bottom Branding & Architect Details */}
            <div className="px-6 py-4 border-t border-slate-800 mx-3 mt-auto">
              <div className="flex items-start space-x-3 mb-2">
                <Database className="h-4 w-4 text-[#C9922E] mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-300">Connected Instance</h4>
                  <p className="text-[10px] text-slate-500">acme-hubspot-prd</p>
                </div>
              </div>
              <div className="mt-3 py-2 px-3 bg-slate-800/40 rounded border border-slate-800 text-[10px] text-slate-400">
                <span className="font-semibold text-white block mb-1">Architecture Note:</span>
                Custom approval overlay built to extend standard HubSpot deal entities with local DB properties.
              </div>
            </div>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 pl-0 md:pl-60 min-h-[calc(100vh-4rem)] flex flex-col bg-[#F8F9FB] overflow-x-hidden">
          <div className="flex-1 p-4 sm:p-8 max-w-[1440px] mx-auto w-full">
            {children}
          </div>
          
          {/* Footer */}
          <footer className="border-t border-[#E5E7EB] py-4 px-8 text-center text-xs text-slate-500 bg-white">
            <p>© 2026 Hybrid CRM Layer. Build verification Case Study for doodleblue. System design powered by Next.js & Supabase overlay.</p>
          </footer>
        </main>
      </div>

      {/* Guided Tour Overlay Controller */}
      {tourActive && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1B1F2A]/95 text-white py-3 px-4 md:px-6 rounded-2xl shadow-2xl flex items-center justify-between space-x-4 md:space-x-6 border border-slate-700 w-[95%] sm:w-[90%] max-w-lg font-sans backdrop-blur-md animate-fade-in">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-[#C9922E] animate-ping shrink-0" />
            <span className="text-xs font-semibold text-slate-300 whitespace-nowrap">
              Guided Tour: <span className="text-white font-bold">Step {tourStep} of 3</span>
            </span>
          </div>
          <div className="text-xs font-medium text-slate-300 hidden sm:block truncate">
            {tourStep === 1 ? 'Explore the pipeline stages' : tourStep === 2 ? 'Review the approvals queue' : 'Check out blended workloads'}
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            {tourStep > 1 && (
              <button
                onClick={() => {
                  const prevStep = tourStep - 1;
                  setTourStep(prevStep);
                  if (prevStep === 1) router.push('/');
                  if (prevStep === 2) router.push('/approvals');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-[10px] md:text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-700 transition active:scale-95"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (tourStep < 3) {
                  const nextStep = tourStep + 1;
                  setTourStep(nextStep);
                  if (nextStep === 2) router.push('/approvals');
                  if (nextStep === 3) router.push('/analytics');
                } else {
                  setTourActive(false);
                }
              }}
              className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-semibold text-[10px] md:text-[11px] px-3.5 py-1.5 rounded-lg transition active:scale-95 flex items-center space-x-1"
            >
              <span>{tourStep === 3 ? 'Finish Tour' : 'Next Step'}</span>
              <span>→</span>
            </button>
            <button
              onClick={() => setTourActive(false)}
              className="text-slate-400 hover:text-white font-medium text-[10px] md:text-[11px] px-2 py-1.5 transition"
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
