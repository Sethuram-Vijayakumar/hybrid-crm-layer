'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Columns, 
  CheckCircle2, 
  Settings, 
  Database,
  BarChart3,
  Menu,
  X,
  BookOpen,
  Play,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

// Import prototype pages to render inline in slides
import PipelinePage from '@/app/pipeline/page';
import ApprovalsPage from '@/app/approvals/page';
import AnalyticsPage from '@/app/analytics/page';
import SettingsPage from '@/app/settings/page';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const { 
    highRiskApprovalsCount,
    presentationMode,
    setPresentationMode,
    currentSlide,
    setCurrentSlide,
    darkMode,
    setDarkMode,
    tourActive,
    setTourActive,
    tourStep,
    setTourStep
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keyboard navigation for Presentation Mode
  useEffect(() => {
    if (!presentationMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide(Math.min(currentSlide + 1, 14));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(Math.max(currentSlide - 1, 1));
      } else if (e.key === 'Escape') {
        setPresentationMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, currentSlide, setCurrentSlide, setPresentationMode]);

  const navItems = [
    {
      name: 'Strategy Hub',
      href: '/',
      icon: BookOpen,
      badge: undefined,
    },
    {
      name: 'Pipeline Board',
      href: '/pipeline',
      icon: Columns,
      badge: undefined,
    },
    {
      name: 'Approvals Queue',
      href: '/approvals',
      icon: CheckCircle2,
      badge: highRiskApprovalsCount > 0 ? highRiskApprovalsCount : undefined,
    },
    {
      name: 'Blended Analytics',
      href: '/analytics',
      icon: BarChart3,
    },
    {
      name: 'Settings & Sync',
      href: '/settings',
      icon: Settings,
    },
  ];

  // Helper to render slides
  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1: // Executive Summary
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 1 of 14 • Executive Summary
            </span>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1B1F2A] dark:text-white tracking-tight">CRM Transformation Strategy</h2>
              <h3 className="text-base font-bold text-[#C9922E] uppercase tracking-wider">Executive Recommendation: Hybrid CRM Overlay</h3>
              <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                To unblock approvals and integrate delivery workloads at Northbridge Advisory, we recommend deploying a lightweight **Hybrid CRM Overlay** built with Next.js and Supabase rather than executing a total CRM migration or paying expensive HubSpot subscription upgrades.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Business Challenge', desc: 'Standard CRM seats cannot track multi-signature custom approvals or resource metrics without expensive licensing upgrades.', color: 'border-l-rose-500' },
                { title: 'Selected Strategy', desc: 'Retain standard HubSpot pipelines as the source of truth, and overlay approval logic using light serverless portals.', color: 'border-l-[#C9922E]' },
                { title: 'Financial ROI', desc: 'Prevents database rebuilds and data migrations, reducing upfront implementation CapEx by approximately 70%.', color: 'border-l-emerald-500' },
                { title: 'Roadmap Target', desc: 'Production-ready MVP rolled out incrementally within 6–8 weeks with zero sales workflow downtime.', color: 'border-l-amber-500' }
              ].map((kpi, idx) => (
                <div key={idx} className={`bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 border-l-4 ${kpi.color} rounded-xl p-5 shadow-xs hover-card-glow`}>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">{kpi.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed font-medium">{kpi.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#FBF1DE]/40 dark:bg-slate-900/50 border-l-4 border-[#C9922E] p-4 rounded-r-xl text-xs font-semibold text-slate-700 dark:text-slate-300">
              &ldquo;The Hybrid CRM Overlay maximizes current HubSpot investments while introducing custom workflows and capacity checking only where measurable business value exists.&rdquo;
            </div>
          </div>
        );

      case 2: // Business Problem
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 2 of 14 • Business Problem
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#1B1F2A] dark:text-white tracking-tight">The Current Problem Statement</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Identifying constraints in standard SaaS setups.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider">Current SaaS Limitations</h4>
                <ul className="space-y-2.5 text-xs font-semibold text-slate-650 dark:text-slate-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-500 shrink-0 font-bold">✕</span>
                    <span>Costly seat licensing additions for cross-division approvals.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-500 shrink-0 font-bold">✕</span>
                    <span>Contract bottleneck holds in Legal/Finance go unnotified.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-500 shrink-0 font-bold">✕</span>
                    <span>Sales pipeline is siloed from project delivery loads (ResourceOps).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-[#C9922E] uppercase tracking-wider">doodleblue Strategic Target</h4>
                <ul className="space-y-2.5 text-xs font-semibold text-slate-650 dark:text-slate-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-505 shrink-0 font-bold">✓</span>
                    <span>Cheap standard CRM seats with custom validation portals.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-505 shrink-0 font-bold">✓</span>
                    <span>Automated AI risk flags alert managers to stagnant deals.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-505 shrink-0 font-bold">✓</span>
                    <span>Blended analytics alert sales before overallocation occurs.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 3: // User Personas
        return (
          <div className="space-y-6 max-w-5xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 3 of 14 • User Personas
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#1B1F2A] dark:text-white tracking-tight">Key User Personas & Pain Points</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Providing visual breathing room to explore roles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { role: 'Sales Rep', pain: 'Deal status goes dark in Legal review.', goal: 'Unblock pipeline friction.' },
                { role: 'Delivery Lead', pain: 'Overallocated without advance warning.', goal: 'Align sales pipelines with developer capacity.' },
                { role: 'Approvers (Legal/Finance)', pain: 'No centralized dashboard for contract steps.', goal: 'Approve contracts in priority sequence.' }
              ].map((persona, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3 hover-card-glow">
                  <h4 className="text-xs font-bold text-[#C9922E] uppercase tracking-wider border-b border-slate-105 dark:border-slate-800 pb-2">{persona.role}</h4>
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold text-slate-600 dark:text-slate-400"><strong className="text-rose-500">Pain:</strong> {persona.pain}</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-300"><strong>Goal:</strong> {persona.goal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // User Journey
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 4 of 14 • User Journeys
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#1B1F2A] dark:text-white tracking-tight">Transitioning to the Future State</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Comparing user workflows side-by-side.</p>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="bg-rose-50/10 border border-rose-100 dark:border-rose-950 p-4 rounded-xl space-y-2">
                <h4 className="text-rose-600 font-bold uppercase tracking-wider text-[10px]">Current Loop:</h4>
                <p className="text-slate-650 dark:text-slate-400">
                  Lead logged in HubSpot → Proposal sent → Request emailed manually → Stalls in inbox → Closed without checking resource availability → Delivery delays.
                </p>
              </div>

              <div className="bg-indigo-50/5 border border-[#C9922E]/20 p-4 rounded-xl space-y-2">
                <h4 className="text-[#C9922E] font-bold uppercase tracking-wider text-[10px]">Future Integrated Loop:</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  Lead logged in HubSpot → AI validations risk score → Custom Approvals table → Resource capacity check → One-click escalation alerts → Seamless client project kickoff.
                </p>
              </div>
            </div>
          </div>
        );

      case 5: // Decision Matrix
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 5 of 14 • Decision Matrix
            </span>
            <h2 className="text-2xl font-bold text-[#1B1F2A] dark:text-white tracking-tight">Executive Decision Matrix</h2>

            <div className="overflow-hidden border border-[#E5E7EB] dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
              <table className="w-full text-[11px] text-left">
                <thead className="bg-slate-50 dark:bg-slate-850 text-slate-500 font-bold uppercase text-[9px]">
                  <tr>
                    <th className="p-3">Option</th>
                    <th className="p-3">Implementation Cost</th>
                    <th className="p-3">Launch Timeline</th>
                    <th className="p-3">Business Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  <tr>
                    <td className="p-3 font-bold">Stay on SaaS & Upgrade</td>
                    <td className="p-3">High (Seat Upgrades)</td>
                    <td className="p-3">Immediate</td>
                    <td className="p-3">Low</td>
                  </tr>
                  <tr className="bg-[#FBF1DE]/10 dark:bg-[#C9922E]/5 font-bold text-[#C9922E]">
                    <td className="p-3">Hybrid Overlay Model</td>
                    <td className="p-3">Low (₹3L–5L CapEx)</td>
                    <td className="p-3">3–4 Months</td>
                    <td className="p-3">Low (HubSpot Retained)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Build 100% Custom CRM</td>
                    <td className="p-3">Very High (₹45L–65L)</td>
                    <td className="p-3">6–9 Months</td>
                    <td className="p-3">High (Data Migration)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 6: // Pipeline Demo
        return (
          <div className="space-y-4 animate-fade-in text-slate-800 dark:text-slate-100">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
                Slide 6 of 14 • Working Demonstration • Pipeline Page
              </span>
              <span className="text-[10px] text-slate-505 font-semibold uppercase tracking-wider">Fully Interactive Prototype</span>
            </div>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-950/20 max-w-[1400px] mx-auto overflow-hidden">
              <PipelinePage />
            </div>
          </div>
        );

      case 7: // Approvals Demo
        return (
          <div className="space-y-4 animate-fade-in text-slate-800 dark:text-slate-100">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
                Slide 7 of 14 • Working Demonstration • Approvals Queue
              </span>
              <span className="text-[10px] text-slate-505 font-semibold uppercase tracking-wider">Interactive Workflow Interface</span>
            </div>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-955/20 max-w-[1400px] mx-auto overflow-hidden">
              <ApprovalsPage />
            </div>
          </div>
        );

      case 8: // Analytics Demo
        return (
          <div className="space-y-4 animate-fade-in text-slate-800 dark:text-slate-100">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
                Slide 8 of 14 • Working Demonstration • Blended Analytics
              </span>
              <span className="text-[10px] text-slate-505 font-semibold uppercase tracking-wider">Live Capacity Simulator</span>
            </div>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-955/20 max-w-[1400px] mx-auto overflow-hidden">
              <AnalyticsPage />
            </div>
          </div>
        );

      case 9: // ROI Dashboard
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 9 of 14 • Strategic Business ROI
            </span>
            <h2 className="text-2xl font-bold text-[#1B1F2A] dark:text-white tracking-tight">Business ROI Dashboard</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: 'Development Cost', saas: 'Custom CRM: ₹45L', overlay: 'Hybrid Overlay: ₹15L', metric: 'Saved: ₹30L CapEx', color: 'text-[#C9922E]' },
                { label: 'Launch Speed-to-Market', saas: 'Custom CRM: 9 Months', overlay: 'Hybrid Overlay: 8 Weeks', metric: '60–70% Faster Delivery', color: 'text-amber-500' },
                { label: 'Approval Speed', saas: 'Current delay: 4.4 Days', overlay: 'Target delay: 1.5 Days', metric: '65% Turnaround Cycle', color: 'text-emerald-500' }
              ].map((roi, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-5 shadow-xs hover-card-glow text-xs space-y-2">
                  <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1.5">{roi.label}</h4>
                  <p className="text-slate-505 font-semibold">{roi.saas}</p>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold">{roi.overlay}</p>
                  <p className={`font-bold pt-1.5 ${roi.color}`}>{roi.metric}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 10: // Architecture
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 10 of 14 • Enterprise Integration Architecture
            </span>
            <h2 className="text-2xl font-bold text-[#1B1F2A] dark:text-white tracking-tight">Enterprise Integration Flow</h2>

            <div className="bg-slate-900 text-slate-350 p-6 rounded-xl font-mono text-[10px] leading-relaxed overflow-x-auto space-y-4">
              <div>
                <span className="text-white font-bold">1. User Interaction Flow</span>
                <p>Users ➔ Hybrid CRM UI (Next.js) ➔ HubSpot API / Supabase PostgreSQL ➔ AI Risk Engine ➔ Resend Email Webhooks</p>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <span className="text-white font-bold">2. Automated Deployment Pipeline</span>
                <p>Developer Push ➔ GitHub Repo ➔ GitHub Actions CI/CD (Verify & Lint) ➔ Vercel Serverless hosting ➔ Live Site</p>
              </div>
            </div>
          </div>
        );

      case 11: // Production Readiness
        return (
          <div className="space-y-4 animate-fade-in text-slate-800 dark:text-slate-100">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
                Slide 11 of 14 • Production Readiness & Mappings
              </span>
              <span className="text-[10px] text-slate-505 font-semibold uppercase tracking-wider">Security & System Configuration</span>
            </div>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-955/20 max-w-[1400px] mx-auto overflow-hidden">
              <SettingsPage />
            </div>
          </div>
        );

      case 12: // Why doodleblue
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 12 of 14 • Why This Solution Fits doodleblue
            </span>
            <h2 className="text-2xl font-bold text-[#1B1F2A] dark:text-white tracking-tight">Core Capabilities & Alignment</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Product Strategy', desc: 'Balances business objectives, up-front CapEx costs, development speed, and client usability goals.' },
                { title: 'Design Excellence', desc: 'Extends familiar HubSpot UI patterns with almost zero user retraining or overhead.' },
                { title: 'Engineering Excellence', desc: 'Leverages serverless cloud tools (Next.js, Supabase, API Webhooks) for scalability.' },
                { title: 'AI Integration Strategy', desc: 'Injects machine learning cues only where they verify resource blockages.' }
              ].map((card, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-5 shadow-xs hover-card-glow text-xs space-y-1">
                  <h4 className="font-bold text-[#C9922E] uppercase tracking-wider">{card.title}</h4>
                  <p className="text-slate-650 dark:text-slate-400 font-semibold leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 13: // Future Vision
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 13 of 14 • Future Platform Vision
            </span>
            <h2 className="text-2xl font-bold text-[#1B1F2A] dark:text-white tracking-tight">Today ➔ Predictive ➔ Autonomous</h2>

            <div className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-6 shadow-xs text-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-bold border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-[#C9922E]">1. Phase 1 Scope (Current)</span>
                <span className="text-slate-505 uppercase tracking-wider text-[9px] bg-slate-100 dark:bg-slate-800 py-0.5 px-2 rounded-md">MVP Released</span>
              </div>
              <p className="text-slate-655 dark:text-slate-400 font-semibold leading-relaxed">
                We have built and launched the foundational approvals workflow tables, synced HubSpot pipelines, and created live blended analytics widgets.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-bold border-b border-slate-100 dark:border-slate-800 pt-2 pb-3">
                <span className="text-[#C9922E]">2. Phase 2 Scope (Future)</span>
                <span className="text-slate-550 uppercase tracking-wider text-[9px] bg-slate-100 dark:bg-slate-800 py-0.5 px-2 rounded-md">Upcoming</span>
              </div>
              <p className="text-slate-655 dark:text-slate-400 font-semibold leading-relaxed">
                Deploy automated email notifications via Resend API, implement predictive resource hiring recommendations, and launch advanced pipeline forecasting models.
              </p>
            </div>
          </div>
        );

      case 14: // Executive Recommendation
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in text-slate-800 dark:text-slate-100">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C9922E] text-slate-955 rounded uppercase tracking-wider font-extrabold">
              Slide 14 of 14 • Concluding Strategic Recommendation
            </span>
            
            <div className="bg-[#1B1F2A] text-white rounded-2xl p-6 shadow-xl border border-slate-800 text-center space-y-4">
              <h2 className="text-xl font-bold tracking-tight">Strategic Recommendation Summary</h2>
              <p className="text-xs text-slate-350 leading-relaxed font-semibold max-w-xl mx-auto">
                Adopt a **Hybrid CRM Overlay** architecture that preserves HubSpot as the System of Record while extending enterprise capabilities through AI-powered approval workflows, blended resource analytics, and scalable serverless architecture.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold pt-4 max-w-lg mx-auto">
                {[
                  '✔ 70% Lower CapEx',
                  '✔ Fast 8-Week MVP',
                  '✔ Low Transition Risk',
                  '✔ High Adoption Rate',
                  '✔ Enterprise Scale',
                  '✔ AI Integration Ready'
                ].map((item, idx) => (
                  <span key={idx} className="bg-slate-900 border border-slate-800 text-[#C9922E] py-1.5 px-3 rounded-lg">
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed max-w-md mx-auto pt-4 border-t border-slate-800 font-medium">
                Rather than replacing or rewriting database tables, this solution maximizes current CRM investments and deploys features only where they solve measurable bottlenecks.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#0F111A]' : 'bg-[#F8F9FB]'} flex flex-col font-sans transition-colors duration-300`}>
      
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1B1F2A] text-white px-4 sm:px-8 flex items-center justify-between z-30 shadow-md">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <Database className="h-4.5 w-4.5 text-[#C9922E]" />
            <span className="font-bold text-sm tracking-tight text-white uppercase tracking-wider">Hybrid CRM Layer</span>
          </div>
          <span className="text-[9px] text-slate-400 font-semibold tracking-wide hidden sm:inline">
            Enterprise Product Strategy Case Study • Prepared for doodleblue Strategy Consulting
          </span>
        </div>

        {/* Header Right Controls */}
        <div className="flex items-center space-x-4 shrink-0 text-xs font-semibold">
          <span className="text-slate-400 hidden lg:inline">Prepared by: Sethuram Vijayakumar</span>
          
          <div className="hidden md:flex items-center space-x-3 text-slate-400 text-[10px] font-bold border-l border-slate-800 pl-4 uppercase tracking-wider">
            <span>⏱️ 5 min read</span>
            <span>v1.1.0</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition active-press"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => setPresentationMode(!presentationMode)}
            className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-bold shadow-md transition duration-200 active-press flex items-center space-x-1.5 ${
              presentationMode 
                ? 'bg-[#C9922E] text-slate-950 font-extrabold glowing-ring' 
                : 'border border-slate-700 text-slate-350 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Play className={`h-3 w-3 fill-current ${presentationMode ? 'animate-pulse' : ''}`} />
            <span>{presentationMode ? 'Presentation Mode' : 'Presentation Mode'}</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      {presentationMode ? (
        // PRESENTATION MODE SCREEN
        <div className="flex-1 flex flex-col pt-16 font-sans">
          
          {/* Deck Body Content */}
          <main className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-y-auto max-w-[1440px] mx-auto w-full">
            {renderSlideContent()}
          </main>

          {/* Deck Bottom Navigation Controller */}
          <footer className="h-16 bg-[#1B1F2A] border-t border-slate-800 px-4 sm:px-8 flex items-center justify-between text-white z-35 shadow-xl shrink-0">
            <div className="flex items-center space-x-2 shrink-0">
              <span className="h-2 w-2 rounded-full bg-[#C9922E] animate-pulse shrink-0" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Slide {currentSlide} of 14
              </span>
            </div>

            {/* Clickable Slide Indicator Dots */}
            <div className="hidden md:flex items-center space-x-2.5">
              {Array.from({ length: 14 }).map((_, idx) => {
                const step = idx + 1;
                return (
                  <button
                    key={step}
                    onClick={() => setCurrentSlide(step)}
                    className={`h-2.5 w-2.5 rounded-full transition duration-155 ${
                      currentSlide === step
                        ? 'bg-[#C9922E] scale-125'
                        : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Go to Slide ${step}`}
                  />
                );
              })}
            </div>

            {/* Nav Action Controls */}
            <div className="flex items-center space-x-3 shrink-0">
              <button
                disabled={currentSlide === 1}
                onClick={() => setCurrentSlide(Math.max(currentSlide - 1, 1))}
                className="bg-slate-800 hover:bg-slate-750 text-white disabled:opacity-30 disabled:hover:bg-slate-800 font-bold text-[10px] px-3.5 py-2 rounded-lg border border-slate-700 transition active-press flex items-center space-x-1"
              >
                <ChevronLeft className="h-3 w-3" />
                <span>Prev</span>
              </button>
              <button
                onClick={() => {
                  if (currentSlide < 14) {
                    setCurrentSlide(currentSlide + 1);
                  } else {
                    setPresentationMode(false);
                  }
                }}
                className="bg-[#C9922E] hover:bg-[#b07f24] text-slate-955 font-bold text-[10px] px-4 py-2 rounded-lg transition active-press flex items-center space-x-1"
              >
                <span>{currentSlide === 14 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </footer>
        </div>
      ) : (
        // STANDARD MODE SCREEN
        <div className="flex flex-1 pt-16">
          
          {/* Mobile Hamburg drawer trigger */}
          <div className="md:hidden fixed top-4 left-4 z-45">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 rounded bg-[#1B1F2A] text-white shadow-md active-press"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-45 md:hidden flex">
              <div 
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
                onClick={() => setMobileMenuOpen(false)}
              />
              <aside className="relative w-64 max-w-xs bg-[#1B1F2A] h-full flex flex-col justify-between p-4 z-50 animate-slide-over text-white pt-16">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded transition active-press"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="py-6 flex-1 flex flex-col justify-between">
                  <nav className="space-y-1.5">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 group active-press ${
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

                  <div className="pt-4 border-t border-slate-800 mt-auto">
                    <div className="flex items-start space-x-3 mb-2">
                      <Database className="h-4 w-4 text-[#C9922E] mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-slate-300">Connected Instance</h4>
                        <p className="text-[10px] text-slate-500">northbridge-hubspot-prd</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* Desktop Left Navigation Sidebar */}
          <aside className="hidden md:flex fixed top-16 left-0 bottom-0 w-60 bg-[#1B1F2A] flex flex-col justify-between z-20 shadow-xl border-r border-[#1B1F2A]">
            <div className="py-6 flex-1 flex flex-col justify-between">
              <nav className="space-y-1.5 px-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 group active-press ${
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

              <div className="px-6 py-4 border-t border-slate-800 mx-3 mt-auto">
                <div className="flex items-start space-x-3 mb-2">
                  <Database className="h-4 w-4 text-[#C9922E] mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-300">Connected Instance</h4>
                    <p className="text-[10px] text-slate-500">northbridge-hubspot-prd</p>
                  </div>
                </div>
                <div className="mt-3 py-2 px-3 bg-slate-800/40 rounded border border-slate-800 text-[10px] text-slate-400">
                  <span className="font-semibold text-white block mb-1">Architecture Note:</span>
                  Custom approval overlay built to extend standard HubSpot deal entities with local DB properties.
                </div>
              </div>
            </div>
          </aside>

          {/* Desktop Content Panel */}
          <main className="flex-1 pl-0 md:pl-60 min-h-[calc(100vh-4rem)] flex flex-col bg-[#F8F9FB] dark:bg-[#0F111A] overflow-x-hidden transition-colors duration-300">
            <div className="flex-1 p-6 sm:p-10 max-w-[1440px] mx-auto w-full">
              {children}
            </div>
            
            {/* Footer and Fictional Disclaimer */}
            <footer className="border-t border-[#E5E7EB] dark:border-slate-850 py-4 px-8 text-center text-xs text-slate-500 bg-white dark:bg-slate-950 transition-colors duration-300">
              <p>© 2026 Hybrid CRM Layer. Build verification Case Study for doodleblue. System design powered by Next.js & Supabase overlay.</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-1">Northbridge Advisory is a fictional example client created for this case study exercise.</p>
            </footer>
          </main>
        </div>
      )}

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
                  if (prevStep === 1) router.push('/pipeline');
                  if (prevStep === 2) router.push('/approvals');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-[10px] md:text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-700 transition active-press"
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
              className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-semibold text-[10px] md:text-[11px] px-3.5 py-1.5 rounded-lg transition active-press flex items-center space-x-1"
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
