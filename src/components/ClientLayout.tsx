'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  Clock,
  Play,
  HelpCircle,
  Minimize2,
  Maximize2,
  FileText
} from 'lucide-react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const { 
    highRiskApprovalsCount,
    presentationMode,
    setPresentationMode,
    currentSlide,
    setCurrentSlide,
    setTourActive,
    setTourStep
  } = useApp();

  // Mode Selection States: 'presentation' | 'crm' | 'architecture'
  const [activeMode, setActiveMode] = useState<'presentation' | 'crm' | 'architecture'>('presentation');
  
  // Transition Loader State
  const [loadingMode, setLoadingMode] = useState<boolean>(false);
  const [loaderText, setLoaderText] = useState<string>('');

  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState<boolean>(true);
  const [activeAIFeature, setActiveAIFeature] = useState<'risk' | 'brief' | 'summary' | 'email'>('risk');
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Presenter View (split view for presenter dashboard)
  const [presenterMode, setPresenterMode] = useState<boolean>(false);

  // Auto-hide toolbar timer
  const [toolbarVisible, setToolbarVisible] = useState<boolean>(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Presentation Timer State (5 minute target = 300 seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  // Laser Pointer Coordinates & Activity
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [laserActive, setLaserActive] = useState<boolean>(false);

  // Laser Pointer Alt/Shift handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt' || e.key === 'Shift') {
        setLaserActive(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt' || e.key === 'Shift') {
        setLaserActive(false);
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Timer Tick EFFECT
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (presentationMode) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [presentationMode]);

  // Fullscreen State Listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Enter Fullscreen on Presentation Mode Activation
  useEffect(() => {
    if (presentationMode) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [presentationMode]);

  // Auto-hide toolbar controls after 3 seconds of inactivity
  useEffect(() => {
    const resetHideTimeout = () => {
      setToolbarVisible(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        if (presentationMode) {
          setToolbarVisible(false);
        }
      }, 3000);
    };

    window.addEventListener('mousemove', resetHideTimeout);
    window.addEventListener('keydown', resetHideTimeout);
    resetHideTimeout();

    return () => {
      window.removeEventListener('mousemove', resetHideTimeout);
      window.removeEventListener('keydown', resetHideTimeout);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [presentationMode]);

  // Redirect standard mode root path to /pipeline
  useEffect(() => {
    if (!presentationMode && pathname === '/') {
      router.push('/pipeline');
    }
  }, [presentationMode, pathname, router]);

  // Keyboard navigation for Presentation Mode
  useEffect(() => {
    if (!presentationMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        setCurrentSlide(Math.min(currentSlide + 1, 13));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlide(Math.max(currentSlide - 1, 1));
      } else if (e.key === 'Home') {
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        setCurrentSlide(13);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        setPresentationMode(false);
      } else if (e.key === '?') {
        setShowShortcuts(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, currentSlide, setCurrentSlide, setPresentationMode]);

  // Mode Transition Handler
  const handleModeSwitch = (mode: 'presentation' | 'crm' | 'architecture') => {
    setLoadingMode(true);
    if (mode === 'crm') {
      setLoaderText('Loading Interactive CRM...');
      setPresentationMode(false);
      router.push('/pipeline');
    } else if (mode === 'presentation') {
      setLoaderText('Returning to Executive Strategy...');
      setPresentationMode(true);
      setCurrentSlide(1);
    } else if (mode === 'architecture') {
      setLoaderText('Opening System Architecture...');
      setPresentationMode(true);
      setCurrentSlide(10); // Directly jump to Slide 10
    }
    
    setTimeout(() => {
      setActiveMode(mode);
      setLoadingMode(false);
    }, 400);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTimer = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const formatRemainingTimer = (secs: number) => {
    const totalTarget = 300; // 5 minute target
    const rem = totalTarget - secs;
    if (rem <= 0) return '00:00 remaining';
    const minutes = Math.floor(rem / 60);
    const remaining = rem % 60;
    return `${minutes.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')} remaining`;
  };

  // Keyboard Navigation / Left-Right Screen Click Boundaries
  const handleScreenClick = (e: React.MouseEvent) => {
    if (!presentationMode) return;
    
    // Ignore clicks on buttons/inputs/toolbars
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('header') || target.closest('.fixed')) {
      return;
    }
    
    const screenWidth = window.innerWidth;
    if (e.clientX > screenWidth / 2) {
      setCurrentSlide(Math.min(currentSlide + 1, 13));
    } else {
      setCurrentSlide(Math.max(currentSlide - 1, 1));
    }
  };

  // Speaker notes content map
  const speakerNotesMap = {
    1: 'Highlight the 60–70% CapEx savings. Emphasize that HubSpot remains doodleblue\'s System of Record. Outline the 3–4 months MVP launch window.',
    2: 'Explain the 6 core roles. Focus on Legal Operations and Finance. Custom overlay approvals eliminate the seat-license overhead.',
    3: 'Discuss the 4.4 days hold cycle. Explain how disconnected pipelines cause blindspots in delivery capacity resources.',
    4: 'Walk through the options matrix. Emphasize why the Hybrid CRM Overlay represents the optimal tradeoff of speed, risk, and cost.',
    5: 'Illustrate the journey before vs after. Emphasize how the overlay interface automates approvals without database migration risk.',
    6: 'Discuss the ₹12L–18L CapEx vs ₹45L–65L custom rewrite. Point out the <3 months payback period and the immediate unblocking of pipeline deals.',
    7: 'Detail the 3–4 months timeline mapping. Explain how each phase builds incrementally to prevent workflow downtime.',
    8: 'Review critical rate-limiting parameters. Explain cache mitigation setups and the anonymization of customer data for GDPR.',
    9: 'Describe embedded AI workflows: Risk scoring, Executive briefs, Summaries, and Email generators. AI assists rather than replacing operators.',
    10: 'Walk through doodleblue\'s Enterprise Tech stack. Detail the specific roles of Supabase, LangChain, Sentry, and Next.js React routing.',
    11: 'Explain Retrieval-Augmented Generation (RAG). Discuss how it securely queries localized vector documents to feed OpenAI prompt context.',
    12: 'Discuss doodleblue\'s capability profile, agile cloud credentials, team alignment structure, and delivery commitment.',
    13: 'Deliver the closing strategy recommendation statement. Request the panel to toggle the switcher to the Demo CRM to view live actions.'
  };

  // Standard Mode Side Navigation Items
  const standardNavItems = [
    { name: 'Pipeline Board', href: '/pipeline', icon: Columns },
    { name: 'Approvals Queue', href: '/approvals', icon: CheckCircle2, badge: highRiskApprovalsCount > 0 ? highRiskApprovalsCount : undefined },
    { name: 'Blended Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'AI Command Center', href: '/ai-command-center', icon: Sparkles },
    { name: 'Settings & Sync', href: '/settings', icon: Settings },
  ];

  // Helper to render slides in Light Theme
  const renderSlideContent = (slideIndex: number) => {
    switch (slideIndex) {
      case 1: // Executive Summary
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 1 of 13 • Executive Summary
            </span>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">CRM Transformation Strategy</h2>
              <h3 className="text-xs font-bold text-[#C9922E] uppercase tracking-wider">Strategic Recommendation: Hybrid CRM Overlay</h3>
              <p className="text-sm text-slate-655 leading-relaxed font-semibold">
                To eliminate approval delays and integrate delivery workloads at Northbridge Advisory, we recommend deploying a lightweight **Hybrid CRM Overlay** built with Next.js and Supabase. This approach preserves HubSpot as the core System of Record while introducing targeted approval portals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Business Problem', desc: 'Standard CRM seats lack custom multi-signature workflows, blocking contract sign-offs in Legal/Finance.', color: 'border-l-rose-500' },
                { title: 'Recommendation', desc: 'Overlay light custom portals on HubSpot, syncing data securely via serverless APIs.', color: 'border-l-4 border-l-[#C9922E]' },
                { title: 'Expected ROI', desc: 'Avoids custom CRM rebuilding risks, reducing upfront CapEx by approximately 60–70%.', color: 'border-l-4 border-l-emerald-500' },
                { title: 'Timeline & Timeline', desc: 'Production-ready MVP deployment in 3–4 months with zero sales workflow downtime.', color: 'border-l-4 border-l-amber-500' }
              ].map((kpi, idx) => (
                <div key={idx} className={`bg-slate-50 border border-slate-150 border-l-4 ${kpi.color} rounded-xl p-4 shadow-2xs hover-card-glow`}>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{kpi.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-semibold">{kpi.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#FBF1DE]/30 border-l-4 border-[#C9922E] p-4 rounded-r-xl text-xs font-bold text-slate-655">
              &ldquo;The Hybrid CRM Overlay model maximizes doodleblue&apos;s product strategy objectives, delivering enterprise workflows without custom migration risk.&rdquo;
            </div>
          </div>
        );

      case 2: // Business Personas
        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 2 of 13 • Business Personas
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Enterprise Personas & Core Workflows</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Outlining goals, friction, and metrics for the six primary roles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              {[
                { role: 'Sales Representative', goal: 'Close deals rapidly', friction: 'Lack of legal status visibility', kpi: 'Sales Cycle (Days)' },
                { role: 'Sales Manager', goal: 'Accurate revenue forecast', friction: 'Siloed status updates', kpi: 'Pipeline Win Rate' },
                { role: 'Legal Operations', goal: 'Ensure contract compliance', friction: 'SLA queues with zero sorting', kpi: 'Review Turnaround' },
                { role: 'Finance Team', goal: 'Validate billing details', friction: 'Manual sign-off alerts', kpi: 'Billing Cycle Speed' },
                { role: 'Delivery Lead', goal: 'Optimize team capacity', friction: 'Blind to sales pipelines', kpi: 'Resource Utilization' },
                { role: 'Executive Leadership', goal: 'Control software costs', friction: 'CRM license overheads', kpi: 'Overall Software CapEx' }
              ].map((p, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 hover-card-glow">
                  <h4 className="text-xs font-bold text-[#C9922E] border-b border-slate-200 pb-1.5 uppercase tracking-wider">{p.role}</h4>
                  <div className="space-y-1 text-[10.5px] leading-relaxed text-slate-655">
                    <p><strong>Goal:</strong> {p.goal}</p>
                    <p><strong>Friction:</strong> {p.friction}</p>
                    <p><strong>KPI:</strong> {p.kpi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Current Problems
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 3 of 13 • Current Problems
            </span>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">The Current Bottleneck Statement</h2>
              <p className="text-xs text-slate-500 font-semibold">Identifying workflow friction under standard SaaS CRM setups.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="bg-rose-50/30 border border-rose-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-rose-700 border-b border-rose-100 pb-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  <h4 className="font-bold uppercase tracking-wider">Siloed SaaS Blocks</h4>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Standard CRM seats do not accommodate cross-department approvers (Legal & Finance), creating dark communication silos.
                </p>
              </div>

              <div className="bg-rose-50/30 border border-rose-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-rose-700 border-b border-rose-100 pb-1.5">
                  <Clock className="h-4 w-4" />
                  <h4 className="font-bold uppercase tracking-wider">Contract Hold Delays</h4>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Deals sit stagnant in queues for an average of 4.4 days due to manual email routing notifications.
                </p>
              </div>

              <div className="bg-rose-50/30 border border-rose-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-rose-700 border-b border-rose-100 pb-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  <h4 className="font-bold uppercase tracking-wider">Capacity Blind Spots</h4>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Sales contracts close without visibility into team capacity, resulting in delivery overloads (90%+ load levels).
                </p>
              </div>
            </div>
          </div>
        );

      case 4: // Solution Evaluation
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 4 of 13 • Solution Evaluation & Matrix
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Executive Decision Matrix</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Comparing standard alternatives to highlight the Hybrid CRM Overlay approach.</p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
              <table className="w-full text-xs text-left border-collapse min-w-[600px]">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Evaluation Parameter</th>
                    <th className="p-3.5">Option A: Stay SaaS</th>
                    <th className="p-3.5 bg-[#FBF1DE]/10 text-[#C9922E]">Option B: Hybrid CRM</th>
                    <th className="p-3.5">Option C: Custom CRM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                  <tr>
                    <td className="p-3.5 font-bold">Implementation Cost</td>
                    <td className="p-3.5">High (SaaS Seat Overhead)</td>
                    <td className="p-3.5 bg-[#FBF1DE]/10 font-bold text-emerald-700">Low (₹12L–18L CapEx)</td>
                    <td className="p-3.5">Very High (₹45L–65L)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Deployment Timeline</td>
                    <td className="p-3.5">Immediate</td>
                    <td className="p-3.5 bg-[#FBF1DE]/10 font-bold text-emerald-700">3–4 months (Rapid Overlay)</td>
                    <td className="p-3.5">6–9 months</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Migration Risk</td>
                    <td className="p-3.5">Zero</td>
                    <td className="p-3.5 bg-[#FBF1DE]/10 font-bold text-emerald-700">Low (HubSpot Retained)</td>
                    <td className="p-3.5">High (Full DB Move)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Workflow Customization</td>
                    <td className="p-3.5">Poor (Rigid SaaS Rules)</td>
                    <td className="p-3.5 bg-[#FBF1DE]/10 font-bold text-emerald-700">Unrestricted (Next.js/Supabase)</td>
                    <td className="p-3.5">Unrestricted</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Selected Route: Option B (Hybrid Overlay) - High flexibility with low cost risk.</span>
              <span className="bg-emerald-600 text-white text-[9px] px-2 py-0.5 rounded-full uppercase">Winner</span>
            </div>
          </div>
        );

      case 5: // User Journey
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 5 of 13 • User Journey Transition
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Streamlining the Operational Journey</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Comparison of the contract lifecycle before and after overlay implementation.</p>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="bg-rose-50/20 border border-rose-100 p-4 rounded-xl space-y-2">
                <h4 className="text-rose-600 font-bold uppercase tracking-wider text-[10px]">Before (Siloed Workflow - Average 4.4 Days)</h4>
                <p className="text-slate-600 leading-relaxed">
                  Opportunity logged ➔ Legal/Finance manually emailed ➔ Contract sits in inbox queue ➔ Project delivery capacity checked manually ➔ Delayed contract signatures.
                </p>
              </div>

              <div className="bg-[#FBF1DE]/25 border border-[#C9922E]/20 p-4 rounded-xl space-y-2">
                <h4 className="text-[#C9922E] font-bold uppercase tracking-wider text-[10px]">After (Proposed Hybrid Workflow - Target 1.5 Days)</h4>
                <p className="text-slate-700 leading-relaxed">
                  Opportunity logged ➔ Webhooks auto-sync to Supabase ➔ Custom Approvals dashboard ➔ AI risk scoring prioritize queues ➔ Automated capacity check alerts ➔ Rapid contract sign-off.
                </p>
              </div>
            </div>
          </div>
        );

      case 6: // Business Case & ROI
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 6 of 13 • Business Case & ROI
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Financial Projections & Business Value</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Clear ROI metrics and payback parameters for executive stakeholders.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Development Cost', val: '₹12L–18L CapEx', desc: '60–70% cheaper than a full custom rebuild (₹45L–65L).', color: 'text-indigo-650' },
                { title: 'Annual License Savings', val: '₹8.5L/year', desc: 'Avoids custom HubSpot Enterprise seat overheads.', color: 'text-[#C9922E]' },
                { title: 'Payback Period', val: '< 3 Months', desc: 'Rapid break-even based on accelerated deal closure.', color: 'text-emerald-600' }
              ].map((roi, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-150 rounded-xl p-4 shadow-2xs space-y-2 hover-card-glow">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{roi.title}</h4>
                  <p className={`text-lg font-bold ${roi.color}`}>{roi.val}</p>
                  <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">{roi.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold pt-2">
              <div className="p-3 border border-slate-150 rounded-xl bg-slate-50/20">
                <span className="text-[#C9922E] font-bold uppercase tracking-wider text-[9px] block">Contract Cycle Reduction</span>
                <p className="text-slate-700 mt-1 leading-relaxed">
                  Average approval hold times fall from **4.4 days to 1.5 days**, unblocking ₹45L+ in pending contracts.
                </p>
              </div>
              <div className="p-3 border border-slate-150 rounded-xl bg-slate-50/20">
                <span className="text-[#C9922E] font-bold uppercase tracking-wider text-[9px] block">Resource Optimization</span>
                <p className="text-slate-700 mt-1 leading-relaxed">
                  Aligns sales closings with live capacity levels, preventing overallocation resource burnout.
                </p>
              </div>
            </div>
          </div>
        );

      case 7: // MVP Roadmap
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 7 of 13 • MVP Implementation Roadmap
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Incremental 3–4 months Timeline</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Four phases built iteratively to guarantee zero deployment friction.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold">
              {[
                { phase: 'Phase 1: Overlay', wks: 'Weeks 1-3', task: 'Deploy Next.js portal layout and connect Supabase database schemas.' },
                { phase: 'Phase 2: AI Strategy', wks: 'Weeks 4-6', task: 'Integrate OpenAI risk-scoring engines and briefing models.' },
                { phase: 'Phase 3: Enterprise', wks: 'Weeks 7-9', task: 'Connect live HubSpot webhooks and field mappings registries.' },
                { phase: 'Phase 4: Automation', wks: 'Weeks 10-12', task: 'Configure Resend email triggers and complete audit logs.' }
              ].map((step, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 hover-card-glow">
                  <span className="text-[#C9922E] font-bold text-[9px] uppercase block">{step.wks}</span>
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider">{step.phase}</h4>
                  <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">{step.task}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 8: // Risks & Readiness
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 8 of 13 • Risks & Readiness
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Implementation Risks & Mitigations</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Minimizing deployment exposure through strategic rollout safeguards.</p>
            </div>

            <div className="overflow-x-auto">
              <div className="space-y-3.5 text-xs font-semibold min-w-[600px] p-0.5">
                <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-2 text-[10px] text-slate-400 font-bold uppercase">
                  <span>Identified Risk</span>
                  <span>Potential Business Impact</span>
                  <span>Mitigation Safeguard</span>
                </div>
                
                {[
                  { r: 'API Rate Limits (HubSpot)', i: 'Delayed database sync status updates', m: 'Implement Redis caching to throttle HubSpot payloads' },
                  { r: 'Legal / Compliance (GDPR)', i: 'PII data exposure risk', m: 'Filter customer names using hash opportunity IDs' },
                  { r: 'Operational Adoption', i: 'Siloed teams revert to legacy flows', m: 'Deploy interactive product walkthroughs (Tour System)' }
                ].map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-4 py-2 border-b border-slate-50 font-semibold text-slate-700">
                    <span className="text-[#1B1F2A] font-bold">{item.r}</span>
                    <span className="text-slate-600">{item.i}</span>
                    <span className="text-[#C9922E]">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 9: { // AI Strategy
        const features = {
          risk: {
            title: 'AI Risk Scoring',
            problem: 'Deals get delayed in contract stages, and managers notice only after client stakeholders raise complaints.',
            pipeline: 'HubSpot Deal + Approval History + Delivery Capacity + Historical Delay ➔ Context Builder ➔ Prompt Template ➔ GPT-4 ➔ Risk Classification ➔ Validation ➔ Confidence Score ➔ Human Approval ➔ CRM Sync',
            common: 'Spots unusual pattern delays early and flags warning markers on active cards before pipeline holdups become costly.'
          },
          brief: {
            title: 'AI Executive Briefing',
            problem: 'Executive leaders waste valuable daily time logging into multiple dashboard analytics feeds to identify pipeline bottlenecks.',
            pipeline: 'CRM Data + Active Revenue + Approval Hold Times + Delivery Load ➔ AI Briefing Engine ➔ GPT ➔ Executive Summary ➔ Email / Slack Alerts',
            common: 'Summarizes massive amounts of CRM records in seconds into a direct, readable daily briefing showing action recommendations.'
          },
          summary: {
            title: 'AI Meeting Summarizer',
            problem: 'Crucial action items and risks agreed on customer alignment calls are lost in unread transcripts and emails.',
            pipeline: 'Meeting Transcript ➔ Speech Recognition Text ➔ LLM Context Analysis ➔ Extract Deliverables & Owners ➔ HubSpot CRM Timeline Sync ➔ Team Alert',
            common: 'Like a smart virtual secretary attending alignment meetings, logging task assignments directly in the CRM automatically.'
          },
          email: {
            title: 'AI Email Generator',
            problem: 'Staff waste operational hours drafting personalized escalation requests and client contract follow-ups from scratch.',
            pipeline: 'CRM Context + Customer Sign-off History ➔ Prompt Template ➔ LLM Email Draft ➔ Developer/Manager Review ➔ Click to Send',
            common: 'Prepares the first draft of emails with complete client context, allowing staff to review, tweak, and send in one click.'
          }
        };

        const active = features[activeAIFeature];

        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 9 of 13 • Strategic AI Integration
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Embedded Explainable AI Strategy</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">AI is deeply integrated into actual workflows rather than isolated inside simple chatbots.</p>
            </div>

            {/* AI tab selectors */}
            <div className="flex border-b border-slate-100 pb-1.5 overflow-x-auto gap-2">
              {(Object.keys(features) as Array<keyof typeof features>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveAIFeature(key)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition whitespace-nowrap active-press ${
                    activeAIFeature === key
                      ? 'bg-[#C9922E] text-white font-extrabold'
                      : 'bg-slate-55 hover:bg-slate-100 text-slate-655'
                  }`}
                >
                  {features[key].title}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-150 rounded-xl space-y-2">
                  <span className="text-[#C9922E] font-bold uppercase tracking-wider text-[9px] block">Business Problem</span>
                  <p className="text-xs text-slate-655 leading-relaxed font-semibold">{active.problem}</p>
                </div>
                <div className="p-4 border border-slate-150 rounded-xl space-y-2">
                  <span className="text-emerald-700 font-bold uppercase tracking-wider text-[9px] block">Common Language Explanation</span>
                  <p className="text-xs text-slate-655 leading-relaxed font-semibold">{active.common}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-2">
                <span className="text-[#1B1F2A] font-bold uppercase tracking-wider text-[9px] block">How AI Works (Workflow Pipeline)</span>
                <p className="font-mono text-[9px] text-[#C9922E] bg-slate-900 p-3 rounded-lg leading-relaxed overflow-x-auto">
                  {active.pipeline}
                </p>
              </div>
            </div>
          </div>
        );
      }

      case 10: { // Enterprise Architecture Stack
        const stackItems = [
          { l: 'Frontend', t: 'Next.js + React', w: 'Builds a fast, modern web application that loads quickly and scales well.' },
          { l: 'UI Layout', t: 'Tailwind CSS + shadcn/ui', w: 'Provides a consistent, accessible enterprise interface without reinventing components.' },
          { l: 'Backend Storage', t: 'Supabase Serverless', w: 'Handles the application\'s data, authentication, and server-side logic in one managed platform.' },
          { l: 'Core Database', t: 'PostgreSQL DB', w: 'Reliably stores structured business data such as deals, approvals, and audit logs.' },
          { l: 'CRM Source', t: 'HubSpot CRM Integration', w: 'Remains the single source of truth for customer and sales information.' },
          { l: 'AI Orchestrator', t: 'OpenAI GPT-4 / Claude', w: 'Understands language, summarizes information, drafts content, and generates recommendations.' },
          { l: 'Notifications', t: 'Resend / Slack Webhooks', w: 'Delivers alerts, approvals, and updates to the right people instantly.' },
          { l: 'Monitoring', t: 'Sentry + OpenTelemetry', w: 'Detects issues early and helps engineers maintain system reliability.' }
        ];

        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 10 of 13 • Enterprise Technology Architecture
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">Enterprise Technology Stack</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Selected infrastructure layers mapped directly to doodleblue business requirements.</p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
              <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Layer</th>
                    <th className="p-3">Technology Partner</th>
                    <th className="p-3">Why Chosen (Simple Business Reason)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                  {stackItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-[#1B1F2A]">{item.l}</td>
                      <td className="p-3 font-mono text-[10.5px] text-[#C9922E]">{item.t}</td>
                      <td className="p-3 text-slate-650 text-[10.5px] font-semibold">{item.w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      case 11: { // AI Architecture & Intelligence Platform
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 11 of 13 • AI Architecture & Intelligence Platform
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">AI Orchestration & RAG Layout</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Architectural blueprint of our custom Retrieval-Augmented Generation context engine.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* RAG Description */}
              <div className="p-4 border border-slate-150 rounded-xl space-y-2">
                <span className="text-[#C9922E] font-bold uppercase tracking-wider text-[9px] block">Retrieval Augmented Generation (RAG)</span>
                <h4 className="font-bold text-xs text-slate-800">Context-Aware AI Answers</h4>
                <p className="text-[11px] text-slate-605 leading-relaxed font-semibold">
                  Instead of guessing or hallucinating, semantic vectors run pgvector searches against local NDAs, contracts, and summaries to feed accurate context to the model.
                </p>
                <p className="text-[10.5px] text-slate-550 font-bold bg-[#FBF1DE]/20 p-2.5 rounded-lg border border-[#C9922E]/15 animate-pulse">
                  <strong>Analogy:</strong> Like an employee searching internal files before drafting a reply, rather than guessing.
                </p>
              </div>

              {/* RAG Flow */}
              <div className="p-4 border border-slate-150 rounded-xl space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-emerald-700 font-bold uppercase tracking-wider text-[9px] block">How RAG Works</span>
                  <p className="font-mono text-[9px] text-[#C9922E] bg-slate-900 p-3 rounded-lg leading-relaxed mt-2 overflow-x-auto">
                    User Question ➔ Vector Search ➔ Match Documents ➔ Inject Context to GPT-4 ➔ Accurate Answer
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-505 font-semibold">
                  Secures data integrity while satisfying GDPR parameters.
                </div>
              </div>
            </div>

            {/* General AI Orchestrator Schematic */}
            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-2 font-mono text-[9px] leading-relaxed overflow-x-auto">
              <span className="text-slate-800 font-bold block uppercase tracking-wider text-[8px] font-sans">Full AI Orchestrator Schema</span>
              <p>Users ➔ Next.js Workspace ➔ AI Orchestrator (Prompts + Guardrails) ➔ Vector Database (pgvector) ➔ GPT-4 API ➔ Validation ➔ Human Approval ➔ HubSpot Sync</p>
            </div>
          </div>
        );
      }

      case 12: // Recommended Delivery Partner
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 12 of 13 • Recommended Delivery Partner
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Why doodleblue</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Leveraging doodleblue&apos;s product development, enterprise UX, and cloud engineering expertise.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 hover-card-glow">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">Specialized Capabilities</h4>
                <p className="text-[10.5px] text-slate-605 leading-relaxed font-semibold">
                  Proven expertise in building lightweight SaaS overlay layers that hook into legacy systems without migration risks.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 hover-card-glow">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">Agile Delivery Model</h4>
                <p className="text-[10.5px] text-slate-650 leading-relaxed font-semibold">
                  Structured 3–4 months sprint timeline mapping, ensuring active client reviews and feedback loops.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 hover-card-glow">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">Enterprise Security</h4>
                <p className="text-[10.5px] text-slate-655 leading-relaxed font-semibold">
                  Strict compliance protocols, deploying secure RBAC configurations and GDPR-ready data policies.
                </p>
              </div>
            </div>
          </div>
        );

      case 13: // Final Concluding & Action Screen
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs text-center">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md uppercase tracking-wider">
              Slide 13 of 13 • Strategy Study Complete
            </span>
            
            <div className="space-y-4 py-4">
              <h2 className="text-4xl font-extrabold text-[#1B1F2A] tracking-tight">🎉 Thank You</h2>
              <p className="text-sm text-slate-505 font-bold max-w-md mx-auto leading-relaxed">
                We are ready to align with doodleblue to implement the Hybrid CRM Overlay.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-xs font-bold">
              <button
                onClick={() => handleModeSwitch('crm')}
                className="p-4 bg-[#C9922E] hover:bg-[#b07f24] text-white rounded-2xl shadow-md transition duration-200 active-press"
              >
                View Demo CRM Portal
              </button>
              <button
                onClick={() => setCurrentSlide(1)}
                className="p-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl shadow-md transition duration-200 active-press"
              >
                Back to Executive Summary
              </button>
              <button
                onClick={() => handleModeSwitch('architecture')}
                className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-2xl transition duration-200 active-press"
              >
                Open System Architecture
              </button>
            </div>

            <p className="text-[10px] text-slate-400 font-semibold pt-6 border-t border-slate-100 max-w-xs mx-auto">
              Prepared by Sethuram Vijayakumar for the doodleblue Transformation Review.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getSlideNotes = (slideIndex: number) => {
    return speakerNotesMap[slideIndex as keyof typeof speakerNotesMap] || 'No speaker guidelines logged.';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1B1F2A] text-white px-4 sm:px-8 flex items-center justify-between z-30 shadow-md">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <Database className="h-4.5 w-4.5 text-[#C9922E]" />
            <span className="font-bold text-sm tracking-tight text-white uppercase tracking-wider">Hybrid CRM Layer</span>
          </div>
          <span className="text-[9px] text-slate-400 font-semibold tracking-wide hidden sm:inline">
            Enterprise CRM Transformation • Strategy Study Prepared for doodleblue Consulting
          </span>
        </div>

        {/* Header Right Segmented Controls Switcher */}
        <div className="flex items-center space-x-4 shrink-0 text-xs font-semibold">
          <span className="text-slate-405 hidden lg:inline">Prepared by: Sethuram Vijayakumar</span>
          
          <div className="hidden md:flex items-center space-x-3 text-slate-400 text-[10px] font-bold border-l border-slate-800 pl-4 uppercase tracking-wider mr-2">
            <span>⏱️ 5 min read</span>
            <span>v1.1.0</span>
          </div>

          {/* Three-Way Segmented Switcher Control */}
          <div className="relative">
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#1B1F2A] animate-ping" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#1B1F2A]" />
            
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 shadow-md">
              <button
                onClick={() => handleModeSwitch('presentation')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-150 active-press ${
                  activeMode === 'presentation'
                    ? 'bg-[#C9922E] text-white font-extrabold glowing-ring'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📑 Strategy Deck
              </button>
              <button
                onClick={() => handleModeSwitch('crm')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-150 active-press ${
                  activeMode === 'crm'
                    ? 'bg-[#C9922E] text-white font-extrabold glowing-ring'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                💻 Live CRM
              </button>
              <button
                onClick={() => handleModeSwitch('architecture')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-150 active-press ${
                  activeMode === 'architecture'
                    ? 'bg-[#C9922E] text-white font-extrabold glowing-ring'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🏗 Architecture
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Laser Pointer Neon Follower */}
      {laserActive && (
        <div 
          className="fixed pointer-events-none z-50 h-5 w-5 rounded-full bg-rose-600 border border-rose-400 opacity-90 shadow-[0_0_15px_rgba(220,38,38,0.9)] -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{ left: mousePos.x, top: mousePos.y }}
        />
      )}
      {laserActive && (
        <div 
          className="fixed pointer-events-none z-50 h-3 w-3 rounded-full bg-rose-600 shadow-[0_0_10px_rgba(220,38,38,0.95)] -translate-x-1/2 -translate-y-1/2"
          style={{ left: mousePos.x, top: mousePos.y }}
        />
      )}

      {/* Transition Loader screen */}
      {loadingMode && (
        <div className="fixed inset-0 bg-[#0F111A] flex flex-col items-center justify-center p-8 z-50 animate-fade-in font-sans">
          <div className="max-w-xs w-full space-y-4 text-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">{loaderText}</h3>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#C9922E] animate-loading-bar" />
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Container */}
      {presentationMode ? (
        // PRESENTATION MODE SCREEN (Header = 16 (64px), Sub-Header = 14 (56px) -> pt-40 (160px) layout spacing to prevent overlaps)
        <div className="flex-1 flex flex-col pt-40 font-sans bg-[#F8F9FB]">
          
          {/* Slide Navigation Sub-Header - Placed directly below Header Panel */}
          <div className="fixed top-16 left-0 right-0 h-14 bg-[#1B1F2A] border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between text-white z-25 shadow-md">
            <div className="flex items-center space-x-2 shrink-0">
              <span className="h-2 w-2 rounded-full bg-[#C9922E] animate-pulse shrink-0" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Slide {currentSlide} of 13
              </span>
            </div>

            {/* Clickable Slide Indicator Dots */}
            <div className="hidden md:flex items-center space-x-2.5">
              {Array.from({ length: 13 }).map((_, idx) => {
                const step = idx + 1;
                return (
                  <button
                    key={step}
                    onClick={() => setCurrentSlide(step)}
                    className={`h-2.5 w-2.5 rounded-full transition duration-150 ${
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
                className="bg-slate-800 hover:bg-slate-750 text-white disabled:opacity-30 disabled:hover:bg-slate-855 font-bold text-[10px] px-3.5 py-2 rounded-lg border border-slate-700 transition active-press flex items-center space-x-1"
              >
                <ChevronLeft className="h-3 w-3" />
                <span>Prev</span>
              </button>
              <button
                onClick={() => {
                  if (currentSlide < 13) {
                    setCurrentSlide(currentSlide + 1);
                  } else {
                    setPresentationMode(false);
                    router.push('/pipeline');
                  }
                }}
                className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-bold text-[10px] px-4 py-2 rounded-lg transition active-press flex items-center space-x-1"
              >
                <span>{currentSlide === 13 ? 'View Demo CRM' : 'Next'}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          {/* Deck Body Content */}
          <main 
            onClick={handleScreenClick}
            className="flex-1 flex items-start justify-center pt-8 pb-24 px-4 sm:px-6 md:px-8 overflow-y-auto max-w-[1440px] mx-auto w-full relative"
          >
            {/* Presenter Split Screen View */}
            {presenterMode ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full text-slate-855 font-semibold">
                
                {/* Current Slide Display */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Presenter View • Live Stream</div>
                  <div className="scale-95 origin-top">{renderSlideContent(currentSlide)}</div>
                </div>

                {/* Speaker guidelines, timers, and previews */}
                <div className="lg:col-span-1 space-y-6">
                  
                  {/* Speaker notes */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                      <FileText className="h-4 w-4 text-[#C9922E]" />
                      <span>Speaker notes</span>
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{getSlideNotes(currentSlide)}</p>
                  </div>

                  {/* Presenter info dashboard */}
                  <div className="bg-[#1B1F2A] border border-slate-800 text-white rounded-xl p-5 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 border-b border-slate-800 pb-2">
                      <Clock className="h-4 w-4 text-[#C9922E]" />
                      <span>Presentation Timer</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-bold">Elapsed</span>
                        <span className="text-lg font-bold text-emerald-400 font-mono mt-1 block">{formatTimer(timerSeconds)}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-bold">Remaining</span>
                        <span className="text-lg font-bold text-amber-500 font-mono mt-1 block">{formatRemainingTimer(timerSeconds)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Slide Preview */}
                  {currentSlide < 13 && (
                    <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 space-y-3">
                      <h4 className="text-xs font-bold text-slate-505 uppercase tracking-wider border-b border-slate-200 pb-2">
                        Next Slide Preview
                      </h4>
                      <div className="opacity-55 scale-90 origin-top pointer-events-none truncate max-h-[15vh]">
                        {renderSlideContent(currentSlide + 1)}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            ) : (
              // Normal fullscreen slide view
              renderSlideContent(currentSlide)
            )}
          </main>

          {/* Floating Keynote Presentation Toolbar */}
          {toolbarVisible && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1B1F2A]/90 text-white border border-slate-800 py-3 px-6 rounded-2xl shadow-2xl flex items-center justify-between space-x-6 backdrop-blur-md animate-slide-up w-[95%] sm:w-auto">
              
              {/* Previous Button */}
              <button 
                disabled={currentSlide === 1}
                onClick={() => setCurrentSlide(Math.max(currentSlide - 1, 1))}
                className="hover:text-[#C9922E] disabled:opacity-30 disabled:hover:text-white transition flex items-center space-x-1 text-xs font-bold"
                title="Previous Slide (← / PageUp)"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Progress counter */}
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-350">
                <span>Slide</span>
                <span className="text-white font-extrabold">{currentSlide}</span>
                <span>/</span>
                <span>13</span>
              </div>

              {/* Next Button */}
              <button 
                onClick={() => {
                  if (currentSlide < 13) {
                    setCurrentSlide(currentSlide + 1);
                  } else {
                    setPresentationMode(false);
                    router.push('/pipeline');
                  }
                }}
                className="hover:text-[#C9922E] transition flex items-center space-x-1 text-xs font-bold"
                title="Next Slide (→ / Space / PageDown)"
              >
                <span className="hidden sm:inline">{currentSlide === 13 ? 'View Demo' : 'Next'}</span>
                <ChevronRight className="h-4.5 w-4.5" />
              </button>

              {/* Vertical divider */}
              <div className="h-5 w-px bg-slate-800" />

              {/* Timer metrics display */}
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>

              {/* Interactive full screen toggle */}
              <button 
                onClick={toggleFullscreen}
                className="hover:text-[#C9922E] text-slate-300 transition"
                title="Toggle Fullscreen (F)"
              >
                {isFullscreen ? <Minimize2 className="h-4.5 w-4.5" /> : <Maximize2 className="h-4.5 w-4.5" />}
              </button>

              {/* Presenter view mode button */}
              <button 
                onClick={() => setPresenterMode(!presenterMode)}
                className={`hover:text-[#C9922E] transition text-xs font-bold flex items-center space-x-1 ${
                  presenterMode ? 'text-[#C9922E]' : 'text-slate-300'
                }`}
                title="Toggle Presenter split dashboard"
              >
                <FileText className="h-4.5 w-4.5" />
                <span className="hidden lg:inline">{presenterMode ? 'Audience View' : 'Presenter View'}</span>
              </button>

              {/* Help Keyboard Shortcuts button */}
              <button 
                onClick={() => setShowShortcuts(!showShortcuts)}
                className="hover:text-[#C9922E] text-slate-300 transition"
                title="Show Keyboard Shortcuts (?)"
              >
                <HelpCircle className="h-4.5 w-4.5" />
              </button>

              {/* Close presentation mode */}
              <button 
                onClick={() => setPresentationMode(false)}
                className="text-xs bg-rose-600 hover:bg-rose-700 text-white py-1.5 px-3 rounded-lg font-bold transition active-press"
                title="Exit Strategy presentation (Esc)"
              >
                Exit
              </button>

            </div>
          )}

        </div>
      ) : (
        // STANDARD DEMO CRM MODE SCREEN
        <div className="flex flex-1 pt-16">
          
          {/* Mobile Hamburg drawer trigger */}
          <div className="md:hidden fixed top-4 left-4 z-40">
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
                    {standardNavItems.map((item) => {
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
                {standardNavItems.map((item) => {
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
          <main className="flex-1 pl-0 md:pl-60 min-h-[calc(100vh-4rem)] flex flex-col bg-[#F8F9FB] overflow-x-hidden">
            <div className="flex-1 p-6 sm:p-10 max-w-[1440px] mx-auto w-full">
              {children}
            </div>
            
            {/* Footer and Fictional Disclaimer */}
            <footer className="border-t border-[#E5E7EB] py-4 px-8 text-center text-xs text-slate-500 bg-white">
              <p>© 2026 Hybrid CRM Layer. Build verification Case Study for doodleblue. System design powered by Next.js & Supabase overlay.</p>
              <p className="text-[10px] text-slate-400 mt-1">Northbridge Advisory is a fictional example client created for this case study exercise.</p>
            </footer>
          </main>
        </div>
      )}

      {/* Keyboard Shortcuts Dialog Help overlay */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#1B1F2A] uppercase tracking-wider">Keyboard Navigation Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="text-slate-405 hover:text-slate-650">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            <div className="space-y-2 text-xs font-semibold">
              {[
                { k: '➔ / Space / PageDown', d: 'Go to Next Slide' },
                { k: '← / PageUp', d: 'Go to Previous Slide' },
                { k: 'Home', d: 'Jump to Slide 1' },
                { k: 'End', d: 'Jump to Slide 13' },
                { k: 'F', d: 'Toggle Fullscreen Mode' },
                { k: 'Alt / Shift', d: 'Hold to show Laser Pointer' },
                { k: 'Esc', d: 'Exit Presentation Mode' },
                { k: '?', d: 'Toggle this Shortcuts Menu' }
              ].map((s, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-slate-50">
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-[10px] text-[#C9922E]">{s.k}</span>
                  <span className="text-slate-600">{s.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Welcome Mode Choice Modal */}
      {showChoiceModal && (
        <div className="fixed inset-0 bg-[#0F111A]/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center text-slate-800">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full bg-[#FBF1DE] flex items-center justify-center">
                <Database className="h-6 w-6 text-[#C9922E]" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#1B1F2A]">Welcome to the Hybrid CRM Strategy Portfolio</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Select how you would like to begin reviewing this case study prepared for the doodleblue Strategy Consulting engagement.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => {
                  setPresentationMode(true);
                  setCurrentSlide(1);
                  setShowChoiceModal(false);
                }}
                className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition duration-200 active-press flex items-center justify-center space-x-2"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Launch Presentation Mode</span>
              </button>
              <button
                onClick={() => {
                  setPresentationMode(false);
                  setTourActive(true);
                  setTourStep(1);
                  router.push('/pipeline');
                  setShowChoiceModal(false);
                }}
                className="bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition duration-205 active-press"
              >
                Explore Demo CRM (With Walkthrough)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
