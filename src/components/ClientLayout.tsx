'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutGrid,
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
  FileText,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowRight
} from 'lucide-react';

interface SlideGuide {
  section: string;
  takeaway: string;
  whyItMatters: string;
  time: string;
  bridge: string;
  checklist: string;
}

const slideGuidesMap: Record<number, SlideGuide> = {
  1: {
    section: 'Understanding the Business',
    takeaway: 'Lays out the scope boundaries and baseline requirements for this PM assessment.',
    whyItMatters: 'Provides a clear frame of reference so leadership understands our evaluation bounds.',
    time: '45s',
    bridge: 'Now that we have established our assumptions, let’s examine the current manual workflow.',
    checklist: '✓ Assessment Context'
  },
  2: {
    section: 'Understanding the Business',
    takeaway: 'Highlights standard CRM manual email bottleneck loops and operational visibility blocks.',
    whyItMatters: 'Visually outlines why manual contract workflows result in 4.4-day delays and dark silos.',
    time: '30s',
    bridge: 'With the current manual process analyzed, let’s inspect the automated solution overlay.',
    checklist: '✓ Current Manual Process'
  },
  3: {
    section: 'Understanding the Business',
    takeaway: 'Explains the 9-step automated overlay workflow, showing how AI acts beside human review.',
    whyItMatters: 'Demonstrates a secure, step-by-step process that preserves HubSpot as the core database.',
    time: '45s',
    bridge: 'Now that we understand the workflow, let’s review our recommended strategic approach.',
    checklist: '✓ Proposed Solution Workflow'
  },
  4: {
    section: 'Understanding the Business',
    takeaway: 'Recommends a Hybrid CRM Overlay on top of HubSpot to unblock contract sign-off cycles.',
    whyItMatters: 'Avoids a high-risk custom rebuild, saving 60-70% in seat licensing and database CapEx.',
    time: '30s',
    bridge: 'Having summarized the recommendation, let’s meet the key roles affected by this workflow.',
    checklist: '✓ Recommendation Summary'
  },
  5: {
    section: 'Understanding the Business',
    takeaway: 'Outlines friction points, goals, and core metrics for the six primary roles.',
    whyItMatters: 'Ensures the product targets real-world needs across Sales, Legal, Finance, and Delivery.',
    time: '45s',
    bridge: 'Understanding these roles, let’s pinpoint the exact bottlenecks blocking their operations.',
    checklist: '✓ Business Personas'
  },
  6: {
    section: 'Understanding the Business',
    takeaway: 'Highlights standard CRM seat-licensing blocks, 4.4-day hold cycles, and capacity blindspots.',
    whyItMatters: 'Siloed communication directly causes delayed revenue realization and delivery burnout.',
    time: '30s',
    bridge: 'With the business bottlenecks identified, let\'s evaluate our available solution options.',
    checklist: '✓ Bottleneck Statement'
  },
  7: {
    section: 'Evaluating Options',
    takeaway: 'Compares stay-SaaS, a custom CRM rewrite, and the Hybrid CRM Overlay across cost, speed, and risk.',
    whyItMatters: 'Justifies the Hybrid CRM Overlay as the winning route, balancing customization and zero migration risk.',
    time: '45s',
    bridge: 'Now that we have justified our approach, let\'s inspect the proposed feature scope.',
    checklist: '✓ Option Evaluation Matrix'
  },
  8: {
    section: 'Designing the Solution',
    takeaway: 'Defines MVP feature boundaries, including custom approver logs, Slack syncs, and success metrics.',
    whyItMatters: 'Prevents scope creep by keeping core HR, payroll, and invoicing systems out of scope.',
    time: '45s',
    bridge: 'With the MVP scope established, let’s see how users experience this interface.',
    checklist: '✓ Product Proposal Scope'
  },
  9: {
    section: 'Designing the Solution',
    takeaway: 'Presents high-fidelity browser mockup wireframe frames designed around accessible WCAG guidelines.',
    whyItMatters: 'Validates the user experience early, ensuring a premium executive-grade flow.',
    time: '30s',
    bridge: 'Now that we have reviewed the layout, let’s check the financial case and ROI.',
    checklist: '✓ Figma UX Prototype'
  },
  10: {
    section: 'Validating Business Value',
    takeaway: 'Projects a ₹12L-18L CapEx vs. ₹45L-65L custom write, with a payback period of under 3 months.',
    whyItMatters: 'Proves the financial viability of this proposal, delivering clear savings to executive stakeholders.',
    time: '45s',
    bridge: 'With the ROI justified, let’s look at the incremental delivery schedule.',
    checklist: '✓ Business Value & ROI'
  },
  11: {
    section: 'Preparing for Delivery',
    takeaway: 'Lays out a 12-week timeline across core integration phases.',
    whyItMatters: 'Ensures incremental value release while guaranteeing zero sales workflow downtime.',
    time: '30s',
    bridge: 'To support this roadmap, let’s inspect the underlying technology stack.',
    checklist: '✓ MVP Roadmap Timeline'
  },
  12: {
    section: 'Building the Technology',
    takeaway: 'Details chosen technologies: Next.js frontend, Supabase serverless storage, and HubSpot integrations.',
    whyItMatters: 'Leverages enterprise cloud standards to minimize infrastructure maintenance overhead.',
    time: '45s',
    bridge: 'Within this stack, let’s examine how AI is integrated securely and responsibly.',
    checklist: '✓ Technology Stack'
  },
  13: {
    section: 'Applying AI Responsibly',
    takeaway: 'Illustrates our pgvector RAG flow, fetching vector-matched context securely before querying GPT-4.',
    whyItMatters: 'Eliminates database hallucinations and protects internal client data privacy.',
    time: '45s',
    bridge: 'With the secure architecture in place, let\'s map these AI features to direct business outcomes.',
    checklist: '✓ RAG Flow & Trust Schema'
  },
  14: {
    section: 'Applying AI Responsibly',
    takeaway: 'Maps AI features—risk scoring, briefs, and capacity planning—to impact metrics and checks.',
    whyItMatters: 'Ensures AI acts as an explainable, human-guided co-pilot rather than an autonomous decision-maker.',
    time: '45s',
    bridge: 'To maintain transparency, let’s log how generative AI assisted in preparing this strategy.',
    checklist: '✓ AI Strategic Value Add'
  },
  15: {
    section: 'Applying AI Responsibly',
    takeaway: 'Details the AI usage log, including models used, prompts, and manual edits.',
    whyItMatters: 'Fosters strategic trust by showing exactly where AI contributions end and human validation begins.',
    time: '30s',
    bridge: 'To verify these prompts, let’s look at the structured Prompt Library.',
    checklist: '✓ Responsible AI Usage Log'
  },
  16: {
    section: 'Applying AI Responsibly',
    takeaway: 'Presents copy-pasteable prompt cards for analysis, coding, and strategy replication.',
    whyItMatters: 'Enables reviewers to easily reproduce and audit our technical logic.',
    time: '30s',
    bridge: 'Having detailed the solution, why is doodleblue the right partner to execute this?',
    checklist: '✓ Structured Prompt Library'
  },
  17: {
    section: 'Preparing for Delivery',
    takeaway: 'Highlights doodleblue\'s specialized agency capabilities, agile models, and security compliance.',
    whyItMatters: 'Ensures delivery alignment and mitigates project initiation risks.',
    time: '30s',
    bridge: 'What potential risks exist, and how will they be managed? Let’s review the Risk Matrix.',
    checklist: '✓ Recommended Delivery Partner'
  },
  18: {
    section: 'Implementation Risks',
    takeaway: 'Outlines rate-limiting, user adoption, and compliance risks with clear mitigation safeguards.',
    whyItMatters: 'Proactively identifies blockers to ensure operational stability at launch.',
    time: '45s',
    bridge: 'With all parameters covered, let’s wrap up with our Final Strategy Recommendation.',
    checklist: '✓ Risk Mitigation Register'
  },
  19: {
    section: 'Final Recommendation',
    takeaway: 'Adopt the Hybrid CRM Overlay to preserve HubSpot as doodleblue\'s System of Record.',
    whyItMatters: 'Unlocks immediate pipeline velocity, reduces cycle hold times, and saves license CapEx.',
    time: '30s',
    bridge: 'Now let\'s experience the proposed solution in action. Transitioning to the live Demo CRM...',
    checklist: '✓ Final Strategic Recommendation'
  }
};

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

  // Transition Loader State
  const [loadingMode, setLoadingMode] = useState<boolean>(false);
  const [loaderText, setLoaderText] = useState<string>('');

  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState<boolean>(true);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [presenterMode, setPresenterMode] = useState<boolean>(false);
  const [showReviewerModal, setShowReviewerModal] = useState<boolean>(false);

  // Review Track States
  const [guidedMode, setGuidedMode] = useState<boolean>(false);
  const [activeTrack, setActiveTrack] = useState<'executive' | 'product' | 'technical' | 'ux' | null>(null);
  const [customSequence, setCustomSequence] = useState<number[]>([]);
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);
  const [presenterCardCollapsed, setPresenterCardCollapsed] = useState<boolean>(false);
  const [showDetailedGuideNotes, setShowDetailedGuideNotes] = useState<boolean>(false);
  const [showHandoffModal, setShowHandoffModal] = useState<boolean>(false);


  // Expandable state for Prompt Library cards (Slide 15)
  const [expandedPromptTab, setExpandedPromptTab] = useState<string | null>(null);

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



  const handleNextSlide = () => {
    if (customSequence.length > 0) {
      if (sequenceIndex < customSequence.length - 1) {
        const nextIdx = sequenceIndex + 1;
        setSequenceIndex(nextIdx);
        setCurrentSlide(customSequence[nextIdx]);
      } else {
        if (guidedMode) {
          setShowHandoffModal(true);
        } else {
          setPresentationMode(false);
          router.push('/pipeline');
        }
      }
    } else {
      if (currentSlide < 20) {
        setCurrentSlide(currentSlide + 1);
      } else {
        if (guidedMode) {
          setShowHandoffModal(true);
        } else {
          setPresentationMode(false);
          router.push('/pipeline');
        }
      }
    }
  };

  const handlePrevSlide = () => {
    if (customSequence.length > 0) {
      if (sequenceIndex > 0) {
        const prevIdx = sequenceIndex - 1;
        setSequenceIndex(prevIdx);
        setCurrentSlide(customSequence[prevIdx]);
      }
    } else {
      setCurrentSlide(Math.max(currentSlide - 1, 1));
    }
  };

  const startReviewTrack = (track: 'executive' | 'product' | 'technical' | 'ux') => {
    setGuidedMode(true);
    setActiveTrack(track);
    setSequenceIndex(0);
    setPresenterCardCollapsed(false);
    setPresentationMode(true);
    setShowChoiceModal(false);

    if (track === 'executive') {
      // Preface (1), Before (2), After (3), Summary (4), ROI (10), Recommendation (19)
      setCustomSequence([1, 2, 3, 4, 10, 19, 20]);
      setCurrentSlide(1);
    } else if (track === 'product') {
      // Complete 19 slide sequence
      setCustomSequence([]);
      setCurrentSlide(1);
    } else if (track === 'technical') {
      // Preface (1), Tech Stack (12), AI RAG (13), Risk Matrix (18)
      setCustomSequence([1, 12, 13, 18]);
      setCurrentSlide(1);
    } else if (track === 'ux') {
      // Prototype (9)
      setCustomSequence([9]);
      setCurrentSlide(9);
    }
  };

  // Keyboard navigation for Presentation Mode (up to 18 slides)
  useEffect(() => {
    if (!presentationMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevSlide();
      } else if (e.key === 'Home') {
        setCurrentSlide(customSequence.length > 0 ? customSequence[0] : 1);
        setSequenceIndex(0);
      } else if (e.key === 'End') {
        if (customSequence.length > 0) {
          setCurrentSlide(customSequence[customSequence.length - 1]);
          setSequenceIndex(customSequence.length - 1);
        } else {
          setCurrentSlide(20);
        }
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
  }, [presentationMode, currentSlide, customSequence, sequenceIndex, setPresentationMode, setCurrentSlide]);

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
      setCurrentSlide(11); // Directly jump to Slide 11 (Tech Stack)
    }
    
    setTimeout(() => {
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
    if (
      target.closest('button') || 
      target.closest('a') || 
      target.closest('input') || 
      target.closest('header') || 
      target.closest('.fixed') ||
      target.closest('.animate-slide-fade')
    ) {
      return;
    }
    
    const screenWidth = window.innerWidth;
    if (e.clientX > screenWidth / 2) {
      handleNextSlide();
    } else {
      handlePrevSlide();
    }
  };

  // Consultant's Note Component
  const renderConsultantsNote = (title: string, text: string) => (
    <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] text-slate-500 font-semibold leading-relaxed">
      <div className="flex items-start space-x-1.5 bg-slate-50/70 p-3 rounded-xl border border-slate-200">
        <span className="text-[#C9922E] shrink-0 font-bold">💡 {title}</span>
        <span>{text}</span>
      </div>
    </div>
  );

  // Narrative Transition Footer
  const renderNarrativeTransition = (nextQuestion: string, answerText: string) => (
    <div className="mt-4 pt-3 border-t border-slate-100/50 flex flex-col items-start space-y-1">
      <span className="text-[9px] uppercase tracking-widest text-[#C9922E] font-bold">Reviewer Context Bridge</span>
      <p className="text-[10px] text-slate-500 font-medium italic">
        &ldquo;{nextQuestion}&rdquo; ➔ <span className="text-[#1B1F2A] font-semibold">{answerText}</span>
      </p>
    </div>
  );

  // Speaker notes content map for 18 slides (1-indexed mapping Slide 1 to 18)
  const speakerNotesMap = {
    1: 'Introduce the Assessment Context & Assumptions prefix. Clarify project boundaries, in-scope requirements, and our overall confidence levels.',
    2: 'Highlight the 60–70% CapEx savings. Emphasize that HubSpot remains doodleblue\'s System of Record. Outline the 3–4 months MVP launch window.',
    3: 'Explain the 6 core roles. Focus on Legal Operations and Finance. Custom overlay approvals eliminate the seat-license overhead.',
    4: 'Discuss the 4.4 days hold cycle. Explain how disconnected pipelines cause blindspots in delivery capacity resources.',
    5: 'Walk through the options matrix. Emphasize why the Hybrid CRM Overlay represents the optimal tradeoff of speed, risk, and cost.',
    6: 'Introduce doodleblue\'s Product Proposal satisfying Deliverable #4. Detail scope limits and metrics for each manager.',
    7: 'Present the Figma UX Prototype placeholder satisfying Deliverable #2. Point out that Figma prototypes align directly with key WCAG accessibility goals.',
    8: 'Illustrate the journey before vs after. Emphasize how the overlay interface automates approvals without database migration risk.',
    9: 'Discuss the ₹12L–18L CapEx vs ₹45L–65L custom rewrite. Point out the <3 months payback period and the immediate unblocking of pipeline deals.',
    10: 'Detail the 3–4 months timeline mapping. Explain how each phase builds incrementally to prevent workflow downtime.',
    11: 'Walk through doodleblue\'s Enterprise Tech stack. Detail the specific roles of Supabase, LangChain, Sentry, and Next.js React routing.',
    12: 'Explain Retrieval-Augmented Generation (RAG) and the Explainable AI sequence. Discuss vector documents feed and safety validation checks.',
    13: 'Highlight the AI Value Add parameters satisfying Deliverable #6. Explain confidence metrics and human-in-the-loop triggers.',
    14: 'Review the AI Usage Log table satisfying Deliverable #7. Emphasize responsible AI co-creation and human-expert review limits.',
    15: 'Demonstrate the Prompt Library satisfying Deliverable #8. Walk through actual prompt templates used for consulting assessments.',
    16: 'Discuss doodleblue\'s capability profile, agile cloud credentials, team alignment structure, and delivery commitment.',
    17: 'Detail the Risk Register matrix with probability/impact ratings. Emphasize mitigations for rate limits and security.',
    18: 'Deliver the closing strategy recommendation statement. Request the panel to toggle the switcher to the Demo CRM to view live actions.'
  };

  // Standard Mode Side Navigation Items
  const standardNavItems = [
    { name: 'Dashboard', href: '/', icon: LayoutGrid },
    { name: 'Pipeline Board', href: '/pipeline', icon: Columns },
    { name: 'Approvals Queue', href: '/approvals', icon: CheckCircle2, badge: highRiskApprovalsCount > 0 ? highRiskApprovalsCount : undefined },
    { name: 'Blended Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'AI Command Center', href: '/ai-command-center', icon: Sparkles },
    { name: 'Settings & Sync', href: '/settings', icon: Settings },
  ];

  // Helper to render slides in Light Theme (18 slides)
  const renderSlideContent = (slideIndex: number) => {
    switch (slideIndex) {
      case 1: // Slide 1: Assessment Context & Assumptions
        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 1 of 18 • Preface: Assessment Context & Assumptions
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Assessment Context & Assumptions</h2>
              <p className="text-xs text-slate-505 leading-relaxed font-semibold">
                This proposal is prepared based on the doodleblue Product Manager assessment and reflects strategic recommendations under the assumptions outlined below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
              {/* Business Assumptions */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                <span className="text-[#C9922E] font-bold uppercase tracking-wider text-[9px] block">Business Assumptions</span>
                <ul className="list-disc pl-4 text-slate-605 text-[10px] space-y-1 leading-relaxed">
                  <li>Existing CRM platform is HubSpot</li>
                  <li>ResourceOps exposes APIs</li>
                  <li>Contract approvals involve Sales, Legal, Finance and Delivery</li>
                  <li>Existing CRM data remains within HubSpot</li>
                  <li>Current workflow contains manual approval bottlenecks</li>
                </ul>
              </div>

              {/* Technical Assumptions */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[9px] block">Technical Assumptions</span>
                <ul className="list-disc pl-4 text-slate-605 text-[10px] space-y-1 leading-relaxed">
                  <li>REST APIs available</li>
                  <li>OAuth authentication supported</li>
                  <li>Cloud deployment permitted</li>
                  <li>Existing CRM does not require migration</li>
                  <li>Enterprise integrations are API-first</li>
                </ul>
              </div>

              {/* AI Assumptions */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                <span className="text-purple-700 font-bold uppercase tracking-wider text-[9px] block">AI Assumptions</span>
                <ul className="list-disc pl-4 text-slate-605 text-[10px] space-y-1 leading-relaxed">
                  <li>AI provides recommendations, not final decisions</li>
                  <li>Historical CRM data is available</li>
                  <li>Internal documents can be indexed</li>
                  <li>Human review is mandatory before execution</li>
                  <li>AI follows explainable and governed workflows</li>
                </ul>
              </div>

              {/* Scope Limits */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                <span className="text-indigo-700 font-bold uppercase tracking-wider text-[9px] block font-bold">Project Scope</span>
                <div className="space-y-1.5 text-[9.5px]">
                  <div className="text-emerald-800 font-bold">In Scope:</div>
                  <ul className="list-disc pl-3 text-slate-605 space-y-0.5">
                    <li>Hybrid CRM Overlay</li>
                    <li>Approval Workflow</li>
                    <li>AI Copilot & Capacity</li>
                    <li>Executive Analytics</li>
                  </ul>
                  <div className="text-rose-800 font-bold pt-1">Out of Scope:</div>
                  <ul className="list-disc pl-3 text-slate-605 space-y-0.5">
                    <li>CRM Replacement & ERP</li>
                    <li>Payroll & HR Systems</li>
                    <li>Mobile Applications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Confidence Levels */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-slate-800 font-bold uppercase tracking-wider text-[9px] block mb-3">Assessment Confidence</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
                <div>
                  <span className="text-[10px] text-slate-500 block">Business Understanding</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="font-mono text-[#C9922E]">█████████░</span>
                    <span className="font-bold text-[#1B1F2A]">92%</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Technology Recommendation</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="font-mono text-[#C9922E]">██████████</span>
                    <span className="font-bold text-[#1B1F2A]">95%</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">ROI Estimation</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="font-mono text-[#C9922E]">█████████░</span>
                    <span className="font-bold text-[#1B1F2A]">88%</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">AI Strategy</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="font-mono text-[#C9922E]">█████████░</span>
                    <span className="font-bold text-[#1B1F2A]">94%</span>
                  </div>
                </div>
              </div>
            </div>

            {renderConsultantsNote(
              'Consultant\'s Note',
              'This proposal represents a recommended implementation approach based on the information provided in the assessment. Final architecture, technologies, timelines, integrations and scope should be validated through stakeholder workshops, technical discovery and engineering planning.'
            )}

            {renderNarrativeTransition(
              'What assumptions are we making?',
              'We assume HubSpot remains the CRM core, manual blocks exist across teams, and secure AI guides operators. Let\'s look at our recommended Executive Summary next.'
            )}
          </div>
        );

      case 2: // Slide 2: How Deals Are Processed Today
        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-rose-50 text-rose-700 rounded-md uppercase tracking-wider">
              Slide 2 of 19 • Current Process
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">How Deals Are Processed Today</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">A typical enterprise workflow after the Sales team closes a customer deal.</p>
            </div>

            {/* Horizontal Workflow Grid */}
            <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto pb-4 gap-2">
              {[
                { title: 'Sales Wins a Deal', label: 'Manual', icon: '🤝' },
                { title: 'Sends Email to Legal', label: 'Email', icon: '✉️' },
                { title: 'Legal Reviews Contract', label: 'Waiting', icon: '📄' },
                { title: 'Sends to Finance', label: 'Email', icon: '➔' },
                { title: 'Finance Validates Pricing', label: 'Waiting', icon: '🧮' },
                { title: 'Sends to Delivery', label: 'Email', icon: '➔' },
                { title: 'Delivery Checks Resources', label: 'Waiting', icon: '👥' },
                { title: 'Project Starts', label: 'Follow-up', icon: '▶️' }
              ].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center text-center space-y-2 min-w-[100px] shrink-0">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100/50">
                      {step.label}
                    </span>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-3xs w-14 h-14 flex items-center justify-center text-xl relative">
                      <span>{step.icon}</span>
                      <span className="absolute -top-1.5 -left-1.5 bg-slate-800 text-white font-extrabold text-[8px] h-4 w-4 rounded-full flex items-center justify-center">
                        {idx + 1}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-800 leading-tight max-w-[90px]">
                      {step.title}
                    </span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="text-slate-300 font-extrabold text-sm select-none leading-none pt-4 text-center shrink-0">➔</div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Bottom Challenges section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider">Operational Challenges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: 'Manual approvals', desc: 'No system triggers; alerts rely entirely on rep emails.' },
                  { title: 'Poor visibility', desc: 'Silos obscure contract review statuses and handoff stages.' },
                  { title: 'Multiple email threads', desc: 'Version discrepancies and lost communications.' },
                  { title: 'Slow project kickoff', desc: 'Holds average 4.4 days due to resource checks.' }
                ].map((c, idx) => (
                  <div key={idx} className="bg-rose-55 bg-rose-50/20 border border-rose-100 rounded-xl p-4 space-y-1 hover-card-glow border-l-4 border-l-rose-500">
                    <h4 className="text-xs font-bold text-rose-800 flex items-center space-x-1">
                      <span>❌</span>
                      <span>{c.title}</span>
                    </h4>
                    <p className="text-[9.5px] text-slate-500 font-medium leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {renderNarrativeTransition(
              'Why change?',
              'Disconnected manual loops create major revenue and delivery blindspots. Let\'s see how the Hybrid CRM Overlay resolves this in Slide 3.'
            )}
          </div>
        );

      case 3: // Slide 3: How the Hybrid CRM Overlay Works
        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md uppercase tracking-wider">
              Slide 3 of 19 • Proposed Solution Workflow
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">How the Hybrid CRM Overlay Works</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">A single workflow that connects every department without replacing the existing CRM.</p>
            </div>

            {/* Horizontal Workflow Flow */}
            <div className="flex flex-col space-y-6 pt-2">
              
              {/* Top Row: Sales Wins -> HubSpot CRM -> Hybrid CRM Overlay */}
              <div className="flex items-center justify-center space-x-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-3xs text-center w-48 relative">
                  <span className="font-bold text-slate-800 text-xs block">🤝 Sales Wins a Deal</span>
                  <span className="text-[9px] text-slate-500 block mt-0.5 font-semibold">Logged by Sales Rep</span>
                </div>
                <div className="text-indigo-405 font-extrabold text-sm select-none">➔</div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-3xs text-center w-48 relative">
                  <span className="font-bold text-slate-800 text-xs block">🗄️ Existing CRM (HubSpot)</span>
                  <span className="text-[9px] text-slate-500 block mt-0.5 font-semibold">Single Source of Record</span>
                </div>
                <div className="text-indigo-405 font-extrabold text-sm select-none">➔</div>
                <div className="bg-indigo-55 bg-indigo-50 border-2 border-indigo-500 rounded-xl p-4 shadow-xs text-center w-52 relative animate-pulse">
                  <span className="font-bold text-indigo-800 text-xs block">⚙️ Hybrid CRM Overlay</span>
                  <span className="text-[9px] text-indigo-600 block mt-0.5 font-semibold">Starts Approval Pipeline</span>
                </div>
              </div>

              {/* Parallel Lanes Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch px-6">
                
                {/* Lane 1: Legal */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-center text-center shadow-3xs space-y-1">
                  <span className="text-xl block">⚖️</span>
                  <span className="font-bold text-slate-808 text-xs block">Legal</span>
                  <span className="text-[9.5px] text-slate-500 font-medium">Contract Review</span>
                </div>

                {/* Lane 2: Finance */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-center text-center shadow-3xs space-y-1">
                  <span className="text-xl block">💳</span>
                  <span className="font-bold text-slate-808 text-xs block">Finance</span>
                  <span className="text-[9.5px] text-slate-500 font-medium font-bold">Pricing & Payment Validation</span>
                </div>

                {/* Lane 3: Delivery */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-center text-center shadow-3xs space-y-1">
                  <span className="text-xl block">📅</span>
                  <span className="font-bold text-slate-808 text-xs block">Delivery</span>
                  <span className="text-[9.5px] text-slate-500 font-medium">Resource & Capacity Planning</span>
                </div>

                {/* AI Assistant Card (Beside lanes) */}
                <div className="bg-[#1B1F2A] text-white rounded-xl p-4 flex flex-col justify-center border border-slate-800 shadow-md space-y-1.5">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">✨</span>
                    <span className="font-bold text-white text-xs block text-[#C9922E]">AI Assistant</span>
                  </div>
                  <ul className="text-[8.5px] text-slate-350 space-y-0.5 list-disc pl-3">
                    <li>Contract Summary</li>
                    <li>Risk Detection</li>
                    <li>Priority Suggestions</li>
                    <li>Resource Insights</li>
                  </ul>
                  <span className="text-[7.5px] text-[#C9922E] block italic leading-tight mt-1 font-semibold">Supporting human reviewers</span>
                </div>

              </div>

              {/* Bottom Merging Row: Final Approval -> CRM Updated -> Project Ready */}
              <div className="flex items-center justify-center space-x-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center w-44 shadow-3xs">
                  <span className="font-bold text-slate-800 text-xs block">✅ Final Approval</span>
                </div>
                <div className="text-indigo-405 font-extrabold text-sm select-none">➔</div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center w-44 shadow-3xs">
                  <span className="font-bold text-slate-800 text-xs block">🔄 CRM Updated</span>
                </div>
                <div className="text-indigo-405 font-extrabold text-sm select-none">➔</div>
                <div className="bg-emerald-50 border border-emerald-250 rounded-xl p-3 text-center w-48 shadow-sm">
                  <span className="font-bold text-emerald-800 text-xs block">🚀 Project Ready for Delivery</span>
                </div>
              </div>

            </div>

            {/* Blue Highlight Takeaway Card */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-indigo-50 border border-indigo-150 p-4 rounded-xl gap-4 text-xs">
              <div className="flex items-start space-x-2 flex-1">
                <span className="text-indigo-700 shrink-0 font-bold text-sm">💡 Key Takeaway</span>
                <p className="text-[10.5px] text-slate-700 leading-relaxed font-semibold">
                  The existing CRM continues managing customer relationships. The Hybrid CRM Overlay coordinates internal approvals, collaboration, and AI-assisted decision support across departments.
                </p>
              </div>
              <div className="text-slate-400 text-[9px] font-bold uppercase tracking-widest text-right shrink-0">
                AI supports decision-making. Final approvals always remain with people.
              </div>
            </div>

            {renderNarrativeTransition(
              'What changes?',
              'HubSpot remains intact while Next.js + AI automates the approval workflow. Let\'s examine the recommended Strategy Summary in Slide 4.'
            )}
          </div>
        );

      case 4: // Slide 4: Executive Recommendation
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 4 of 19 • Executive Recommendation
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
                  <p className="text-xs text-slate-605 mt-1 leading-relaxed font-semibold">{kpi.desc}</p>
                </div>
              ))}
            </div>

            {renderConsultantsNote(
              'Recommendation',
              'The technologies and timelines shown represent an initial recommendation based on the case assumptions. Final implementation should be validated jointly with engineering, security, business stakeholders, and vendor constraints.'
            )}

            {renderNarrativeTransition(
              'What is your recommendation?',
              'Deploy a lightweight Hybrid CRM Overlay rather than replacing HubSpot. Let\'s see who experiences these core workflow blocks in Slide 5.'
            )}
          </div>
        );

      case 5: // Slide 5: Business Personas
        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 5 of 19 • Business Personas
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

            {renderConsultantsNote(
              'Research Assumption',
              'Personas are synthesized from the provided case study and common enterprise CRM roles. They should be validated through user interviews and workflow observation before implementation.'
            )}

            {renderNarrativeTransition(
              'Who experiences this problem?',
              'Sales Reps, Managers, Legal Ops, Finance Teams, and Delivery Leads. Let\'s look at what specific challenges are broken in Slide 6.'
            )}
          </div>
        );

      case 6: // Slide 6: Current Problems
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 6 of 19 • Current Challenges
            </span>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">The Current Bottleneck Statement</h2>
              <p className="text-xs text-slate-505 font-semibold">Identifying workflow friction under standard SaaS CRM setups.</p>
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
                <p className="text-slate-605 leading-relaxed text-[11px]">
                  Deals sit stagnant in queues for an average of 4.4 days due to manual email routing notifications.
                </p>
              </div>

              <div className="bg-rose-50/30 border border-rose-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-rose-700 border-b border-rose-100 pb-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  <h4 className="font-bold uppercase tracking-wider">Capacity Blind Spots</h4>
                </div>
                <p className="text-slate-605 leading-relaxed text-[11px]">
                  Sales contracts close without visibility into team capacity, resulting in delivery overloads (90%+ load levels).
                </p>
              </div>
            </div>

            {renderConsultantsNote(
              'Observation Framework',
              'Bottlenecks are evaluated based on qualitative case reviews and process observations. Quantitative verification should occur during discovery workshops.'
            )}

            {renderNarrativeTransition(
              'What exactly is broken?',
              'Manual bottlenecks keep deals stuck on hold for 4.4 days, and delivery has no pipeline visibility. Let\'s evaluate our strategic options in Slide 7.'
            )}
          </div>
        );

      case 7: // Slide 7: Solution Evaluation
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 7 of 19 • Solution Evaluation & Matrix
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

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2">
              <span>Selected Route: Option B (Hybrid Overlay) - High flexibility with low cost risk.</span>
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">WINNER</span>
            </div>

            {renderConsultantsNote(
              'Evaluation Framework',
              'Scoring is based on implementation complexity, operational impact, scalability, and long-term maintainability under the assumptions provided in the assessment.'
            )}

            {renderNarrativeTransition(
              'Why choose Hybrid over SaaS or Custom?',
              'Hybrid balances speed, customization and low migration risk perfectly. Let\'s see what we are building in our Product Proposal (Slide 8).'
            )}
          </div>
        );

      case 8: // Slide 8: Product Proposal
        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 8 of 19 • Product Proposal
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Scope & Success Parameters</h2>
              <p className="text-xs text-slate-550 font-semibold font-bold">Comprehensive project requirements and boundary definitions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              {/* Problem & Users Card */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-3">
                <span className="text-[#C9922E] font-bold uppercase tracking-wider text-[9px] block">Problem & Stakeholders</span>
                <div>
                  <h4 className="font-bold text-slate-805 text-[11px]">Primary Target Users</h4>
                  <p className="text-slate-600 mt-1 text-[10.5px] leading-relaxed">
                    Sales Representatives, Sales Managers, Legal Counsel, Finance Approvers, and Delivery Team Leads.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <h4 className="font-bold text-slate-805 text-[11px]">Core Goal</h4>
                  <p className="text-slate-655 mt-1 text-[10.5px]">Unblock contract signing speed while maintaining delivery limits.</p>
                </div>
              </div>

              {/* Scope Limits Card */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-3">
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[9px] block">Project Scope</span>
                <div>
                  <h4 className="font-bold text-emerald-800 text-[11px]">In Scope (MVP Focus)</h4>
                  <ul className="list-disc pl-4 text-slate-605 mt-1 text-[10px] space-y-1">
                    <li>Custom approver feedback logs.</li>
                    <li>One-click escalation sync to Slack/Resend.</li>
                    <li>Explainable AI risk scoring panels.</li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <h4 className="font-bold text-slate-805 text-[11px]">Out of Scope</h4>
                  <p className="text-slate-550 mt-1 text-[10px] leading-relaxed">
                    Replacing the main HubSpot CRM database, invoice payment checkouts, or client ERP migrations.
                  </p>
                </div>
              </div>

              {/* Success Metrics Card */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                <span className="text-indigo-700 font-bold uppercase tracking-wider text-[9px] block">Success Metrics</span>
                <div className="space-y-2 text-[10px] leading-relaxed text-slate-655">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <span>Approval Cycle Speed</span>
                    <span className="text-emerald-700 font-bold">1.5 Days Max</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <span>Manual Email Routing</span>
                    <span className="text-emerald-700 font-bold">Reduced 100%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <span>Project Capacity Visibility</span>
                    <span className="text-emerald-700 font-bold">100% Live Feed</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <span>SaaS CRM Seat Saving</span>
                    <span className="text-[#C9922E] font-bold">Saved 60–70%</span>
                  </div>
                </div>
              </div>
            </div>

            {renderConsultantsNote(
              'Proposal Note',
              'Scope represents the recommended MVP based on the assessment scenario. Requirements may evolve following stakeholder workshops, technical discovery, and engineering planning.'
            )}

            {renderNarrativeTransition(
              'What are we actually building?',
              'We are targeting multi-department portals, notifications, and AI risk scoring in MVP. Let\'s see how users experience it in Slide 9.'
            )}
          </div>
        );

      case 9: // Slide 9: UX Prototype
        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 9 of 19 • UX Prototype
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Interactive UX Prototype</h2>
              <p className="text-xs text-slate-555 font-semibold font-bold">
                High-fidelity product screens prepared to validate the proposed Hybrid CRM Overlay experience before implementation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Browser Mockup Area */}
              <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between items-center text-center min-h-[300px]">
                <div className="w-full flex items-center space-x-1.5 border-b border-slate-200 pb-3 mb-6">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <div className="bg-slate-200/60 rounded px-3 py-0.5 text-[9px] font-mono text-slate-500 w-3/4 mx-auto truncate">
                    https://www.figma.com/design/I544lGrdsgBQJscYTdBlbX/Doodle-Blue...
                  </div>
                </div>

                <div className="space-y-3 py-6">
                  <span className="text-[10px] font-extrabold text-[#C9922E] uppercase tracking-widest block font-bold">Figma Live Design</span>
                  <p className="text-xs text-slate-505 max-w-xs font-semibold">
                    The Figma file contains the refined design iteration used as the reference for the final interactive implementation.
                  </p>
                </div>

                <div className="w-full pt-4">
                  <a
                    href="https://www.figma.com/design/I544lGrdsgBQJscYTdBlbX/Doodle-Blue---CRM-Adaptation---Dashboard-Design?node-id=6-6774&t=x8ncvxecePohzVnn-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-slate-900 hover:bg-slate-800 text-white text-xs py-3 px-6 rounded-xl font-bold uppercase transition"
                  >
                    Open Live Figma Design Canvas
                  </a>
                  <span className="text-[8px] text-slate-400 block mt-1.5 font-bold uppercase tracking-wider">
                    Click to view frames and layouts specs
                  </span>
                </div>
              </div>

              {/* Side Cards List */}
              <div className="space-y-4 text-xs font-semibold">
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                  <span className="text-slate-808 font-bold block uppercase tracking-wider text-[9px]">Prototype Coverage</span>
                  <ul className="space-y-1.5 text-[10px] text-slate-655">
                    <li>✓ Executive Dashboard</li>
                    <li>✓ Sales Pipeline</li>
                    <li>✓ Contract Approval Workflow</li>
                    <li>✓ AI Copilot & Resource Planner</li>
                    <li>✓ Analytics Dashboard & Settings</li>
                  </ul>
                </div>

                {/* View Refined Figma Design Card */}
                <div className="bg-indigo-50 border border-indigo-150 rounded-xl p-4 space-y-3">
                  <span className="text-indigo-808 font-bold block uppercase tracking-wider text-[9px]">View Refined Figma Design</span>
                  <a
                    href="https://www.figma.com/design/I544lGrdsgBQJscYTdBlbX/Doodle-Blue---CRM-Adaptation---Dashboard-Design?node-id=6-6774&t=x8ncvxecePohzVnn-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] py-2.5 px-4 rounded-lg font-bold uppercase transition text-center shadow-xs"
                  >
                    Open Refined Figma Design
                  </a>
                  <p className="text-[9.5px] text-slate-500 font-semibold leading-normal">
                    The Figma file contains the refined design iteration used as the reference for the final interactive implementation.
                  </p>
                </div>
              </div>
            </div>

            {/* Design Evolution Section */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <h3 className="text-xs font-bold text-[#1B1F2A] uppercase tracking-wider">Design Evolution</h3>
              
              <div className="flex flex-row items-center justify-between gap-2 overflow-x-auto pb-2">
                
                {/* Stage 1 */}
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex-1 min-w-[200px] space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🪄</span>
                    <h4 className="font-bold text-xs text-slate-800">Google Stitch</h4>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#C9922E] font-bold block">Initial UI Concepts</span>
                  <ul className="text-[10px] text-slate-600 space-y-1 list-disc pl-3 font-semibold">
                    <li>Rapidly generated initial interface concepts</li>
                    <li>Accelerated early design exploration</li>
                  </ul>
                </div>

                <div className="text-slate-300 font-extrabold text-sm select-none">➔</div>

                {/* Stage 2 */}
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex-1 min-w-[200px] space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🎨</span>
                    <h4 className="font-bold text-xs text-slate-800">Figma</h4>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#C9922E] font-bold block">UX & Visual Refinement</span>
                  <ul className="text-[10px] text-slate-600 space-y-1 list-disc pl-3 font-semibold">
                    <li>Refined layouts and user flows</li>
                    <li>Improved visual hierarchy and spacing</li>
                    <li>Increased design consistency and usability</li>
                  </ul>
                </div>

                <div className="text-slate-300 font-extrabold text-sm select-none">➔</div>

                {/* Stage 3 */}
                <div className="bg-indigo-50 border border-indigo-150 rounded-xl p-4 flex-1 min-w-[200px] space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🚀</span>
                    <h4 className="font-bold text-xs text-indigo-900">Antigravity</h4>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-indigo-700 font-bold block">Interactive Implementation</span>
                  <ul className="text-[10px] text-indigo-950 space-y-1 list-disc pl-3 font-semibold">
                    <li>Implemented the refined designs</li>
                    <li>Built an interactive presentation and working prototype</li>
                    <li>Validated navigation and user experience</li>
                  </ul>
                </div>

              </div>

              {/* Design Process Note Card */}
              <div className="bg-indigo-50 border border-indigo-150 rounded-xl p-4 text-[10.5px] text-slate-700 leading-relaxed font-semibold">
                <div className="flex items-start space-x-2">
                  <span className="text-indigo-600 text-sm shrink-0">ℹ️</span>
                  <p>
                    To speed up the design process, initial UI concepts were generated using Google Stitch, refined in Figma for better UX and visual consistency, and implemented as an interactive prototype in Antigravity. In a real product, this design would go through additional user testing and refinement before development.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 text-[9px] uppercase tracking-wider text-slate-400 font-bold">
              <span className="bg-slate-100 px-2 py-0.5 rounded">Wireframes</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">High-Fidelity Screens</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">Interactive Prototype</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">Design System</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">User Flows</span>
            </div>

            {renderConsultantsNote(
              'Figma Note',
              'The prototype represents the recommended MVP experience based on the assessment scenario. User interface components, workflows, interactions, and visual details will continue to evolve through stakeholder validation and engineering discovery.'
            )}

            {renderNarrativeTransition(
              'What will users experience?',
              'An enterprise portal wrapping dashboards, approval logs, and interactive controls. Let\'s see the financial case and ROI in Slide 10.'
            )}
          </div>
        );

      case 10: // Slide 10: Business ROI
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 10 of 19 • Business Case & ROI
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Financial Projections & Business Value</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Clear ROI metrics and payback parameters for executive stakeholders.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Development Cost', val: '₹12L–18L CapEx', desc: '60–70% cheaper than a full custom rebuild (₹45L–65L).', color: 'text-indigo-650' },
                { title: 'Annual License Savings', val: '₹8.5L/year', desc: 'Avoids custom HubSpot Enterprise seat overheads.', color: 'text-[#C9922E]' },
                { title: 'Payback Period', val: '< 3 Months', desc: 'Transition period based on accelerated deal closure.', color: 'text-emerald-600' }
              ].map((roi, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-150 rounded-xl p-4 shadow-2xs space-y-2 hover-card-glow">
                  <h4 className="text-xs font-bold text-slate-550 uppercase tracking-wider">{roi.title}</h4>
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

            {renderConsultantsNote(
              'ROI Note',
              'ROI estimates are directional based on publicly available SaaS pricing assumptions and typical enterprise approval metrics. Actual savings and cost reductions should be validated during discovery.'
            )}

            {renderNarrativeTransition(
              'Why is this worth investing in?',
              'Provides a payback timeline in under 3 months while saving 60–70% in CapEx costs. Let\'s see the MVP implementation plan in Slide 11.'
            )}
          </div>
        );

      case 11: // Slide 11: Implementation Roadmap
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 11 of 19 • MVP Implementation Roadmap
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Incremental 3–4 months Timeline</h2>
              <p className="text-xs text-slate-555 font-semibold font-bold">Four phases built iteratively to guarantee zero deployment friction.</p>
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
                  <h4 className="font-bold text-slate-805 uppercase tracking-wider">{step.phase}</h4>
                  <p className="text-[10.5px] text-slate-605 leading-relaxed font-semibold">{step.task}</p>
                </div>
              ))}
            </div>

            {renderConsultantsNote(
              'Roadmap Note',
              'Implementation schedules are directional and assume technical discovery workshops, resource availability, API stability, and developer alignment.'
            )}

            {renderNarrativeTransition(
              'How can this be delivered safely?',
              'An incremental 12-week MVP roadmap minimizes release friction. Let\'s look at what technology stack powers this overlay in Slide 12.'
            )}
          </div>
        );

      case 12: { // Slide 12: Technology Stack
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
              Slide 12 of 19 • Enterprise Technology Stack
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
                      <td className="p-3 text-slate-655 text-[10.5px] font-semibold">{item.w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {renderConsultantsNote(
              'Stack Note',
              'The proposed stack represents a reference implementation recommendation. Final tooling selection should be validated against the client\'s existing architecture, engineering capabilities, and security policies.'
            )}

            {renderNarrativeTransition(
              'What technology enables this?',
              'An industry-standard Next.js, Supabase, and HubSpot integration architecture. Let\'s see how AI integrates responsibly in Slide 13.'
            )}
          </div>
        );
      }

      case 13: { // Slide 13: AI Architecture & Intelligence Platform
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 13 of 19 • AI Architecture & Intelligence Platform
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">AI Orchestration, RAG Flow, & Governance</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Architectural blueprint of our custom Retrieval-Augmented Generation context engine and safety guardrails.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* RAG Description */}
              <div className="p-4 border border-slate-150 rounded-xl space-y-2">
                <span className="text-[#C9922E] font-bold uppercase tracking-wider text-[9px] block">Retrieval Augmented Generation (RAG)</span>
                <h4 className="font-bold text-xs text-slate-800">Context-Aware AI Answers</h4>
                <p className="text-[11px] text-slate-605 leading-relaxed font-semibold">
                  Instead of guessing or hallucinating, semantic vectors run pgvector searches against local NDAs, contracts, and summaries to feed accurate context to the model.
                </p>
                <p className="text-[10.5px] text-slate-550 font-bold bg-[#FBF1DE]/20 p-2.5 rounded-lg border border-[#C9922E]/15">
                  <strong>Analogy:</strong> Like an employee searching internal files before drafting a reply, rather than guessing.
                </p>
              </div>

              {/* RAG Flow */}
              <div className="p-4 border border-slate-150 rounded-xl space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-emerald-700 font-bold uppercase tracking-wider text-[9px] block">AI Trust & Sequence Processing</span>
                  <div className="overflow-x-auto mt-2">
                    <div className="flex items-center space-x-1.5 text-[9px] font-mono text-slate-800">
                      <span className="px-2 py-0.5 border border-slate-200 rounded">Input Data</span>
                      <span>➔</span>
                      <span className="px-2 py-0.5 border border-[#C9922E]/45 bg-[#FBF1DE]/10 text-[#C9922E] rounded">AI Models</span>
                      <span>➔</span>
                      <span className="px-2 py-0.5 border border-emerald-200 bg-emerald-50 rounded">Human Check</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-550 font-semibold space-y-1">
                  <p><strong>Explainability Matrix:</strong> Explains confidence score parameters.</p>
                  <p><strong>Audit Compliance:</strong> Saves override history logs in Supabase.</p>
                </div>
              </div>
            </div>

            {/* General AI Orchestrator Schematic */}
            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-2 font-mono text-[9px] leading-relaxed overflow-x-auto">
              <span className="text-slate-800 font-bold block uppercase tracking-wider text-[8px] font-sans">Full AI Orchestrator Schema</span>
              <p>Users ➔ Next.js Workspace ➔ AI Orchestrator (Prompts + Guardrails) ➔ Vector Database (pgvector) ➔ GPT-4 API ➔ Validation ➔ Human Approval ➔ HubSpot Sync</p>
            </div>

            {renderConsultantsNote(
              'Architecture Note',
              'This RAG diagram demonstrates a feasible technical implementation model. Specific hosting, cloud nodes, and security parameters will be validated during stakeholder workshops and engineering discovery.'
            )}

            {renderNarrativeTransition(
              'How is AI integrated responsibly?',
              'By feeding local vector context into OpenAI and requiring manager confirmation before any sync. Let\'s evaluate AI Business Value in Slide 14.'
            )}
          </div>
        );
      }

      case 14: { // Slide 14: AI Value Add
        const aiValueItems = [
          { f: 'AI Risk Scoring', p: 'Contract delays are only detected after client complaints occur.', s: 'Scans approval logs, delivery loads, and patterns to predict delays.', m: 'Contract SLA Hold Reduction' },
          { f: 'AI Executive Brief', p: 'Leaders waste hours opening multiple dashboards to review status logs.', s: 'Consolidates approvals and active revenue reports into morning briefs.', m: 'Manager Reporting Overhead Time' },
          { f: 'AI Email Drafts', p: 'Legal reps manually write escalation alerts and contract follow-ups.', s: 'Drafts emails with complete historical contract context in one click.', m: 'Rep Escalation Speed' },
          { f: 'Capacity Predictor', p: 'Sales closes contracts without visibility of resource loads.', s: 'Calculates active employee load levels before approvals finish.', m: 'Project Resourcing Overloads' }
        ];

        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 14 of 19 • AI Strategic Value Add
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Explainable AI Core Value Mappings</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">How embedded intelligence resolves metrics blocks at Northbridge Advisory.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              {aiValueItems.map((val, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 hover-card-glow">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">{val.f}</h4>
                    <span className="text-[9px] bg-[#C9922E] text-white py-0.5 px-2 rounded-md uppercase tracking-widest">Impact Metric</span>
                  </div>
                  <div className="space-y-1 text-[10.5px] leading-relaxed text-slate-600">
                    <p><strong>Business Problem:</strong> {val.p}</p>
                    <p><strong>AI Solution:</strong> {val.s}</p>
                    <p className="text-slate-805 font-bold"><strong>Metric Affected:</strong> {val.m}</p>
                  </div>
                </div>
              ))}
            </div>

            {renderConsultantsNote(
              'AI Governance Note',
              'AI features are designed with strict human-in-the-loop validation, explainability outputs, and confidence indices. Final production parameters must align with internal governance policies.'
            )}

            {renderNarrativeTransition(
              'How does AI improve business outcomes?',
              'By predicting resource overloads, drafting context-rich alerts, and generating risk scores. Let\'s inspect the AI Usage Log in Slide 15.'
            )}
          </div>
        );
      }

      case 15: { // Slide 15: AI Usage Log
        const logItems = [
          { t: 'Research Phase', a: 'OpenAI GPT-4o', p: 'Synthesize standard HubSpot multi-signature workflow limits.', g: 'Comparative outline of seat licensing vs overlay modules.', m: 'Added Northbridge specific parameters and doodleblue integration models.', o: 'Validated and refined architecture' },
          { t: 'Architecture Map', a: 'Claude 3.5 Sonnet', p: 'Draft Supabase serverless webhook sync database schema.', g: 'PostgreSQL relational diagram connecting deals and approvals.', m: 'Verified RAG pgvector semantic match nodes manually.', o: 'Adopted reference design' },
          { t: 'ROI Calculation', a: 'OpenAI GPT-4o', p: 'Calculate payback cycles for ₹12L-18L CapEx vs HubSpot seat overhead.', g: 'Excel mathematical payback equation models.', m: 'Adjusted target payback timeline limits to < 3 months.', o: 'Validated cash targets' },
          { t: 'Risk Register', a: 'Claude 3.5 Sonnet', p: 'Formulate mitigation matrix for HubSpot API rate throttling.', g: 'Mitigations table outlining caching and queueing systems.', m: 'Added Redis cache throttle rules specific to Northbridge load levels.', o: 'Mitigation plan confirmed' }
        ];

        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 15 of 19 • AI Co-Creation & Usage Log
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Responsible AI Usage Register</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Verification of AI assistance limits and manual human expert reviews.</p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
              <table className="w-full text-xs text-left border-collapse min-w-[750px]">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Project Activity</th>
                    <th className="p-3">AI Tool</th>
                    <th className="p-3">Prompt Purpose</th>
                    <th className="p-3">AI Contribution</th>
                    <th className="p-3">Human Validation & Refinement</th>
                    <th className="p-3 text-[#C9922E]">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold text-[10px]">
                  {logItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 leading-relaxed">
                      <td className="p-3 font-bold text-slate-805">{item.t}</td>
                      <td className="p-3 font-mono text-[9px] text-[#C9922E]">{item.a}</td>
                      <td className="p-3 text-slate-600 truncate max-w-[130px]">{item.p}</td>
                      <td className="p-3 text-slate-600 truncate max-w-[130px]">{item.g}</td>
                      <td className="p-3 text-slate-600 truncate max-w-[135px]">{item.m}</td>
                      <td className="p-3 bg-[#FBF1DE]/10 text-[#C9922E] font-bold">{item.o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {renderConsultantsNote(
              'Transparency Statement',
              'AI tools were used to accelerate ideation, drafting, summarization and content generation. Final recommendations, business assumptions, architecture decisions and financial estimates were manually reviewed and refined.'
            )}

            {renderNarrativeTransition(
              'How was AI used to prepare this proposal?',
              'AI structured schemas, computed basic ROI metrics, and drafted risk models. Let\'s inspect the Prompt Library in Slide 16.'
            )}
          </div>
        );
      }

      case 16: { // Slide 16: Prompt Library
        const promptItems = [
          { id: 'summary', title: 'Executive Summary Prompt', text: 'Act as a Principal McKinsey Strategy Consultant. Review an enterprise transformation project for doodleblue. Design a slide deck comparing standard HubSpot SaaS upgrades against a lightweight Next.js overlay. Emphasize CapEx payback, multi-signature approval blocks, and delivery capacity limits.' },
          { id: 'roi', title: 'Financial ROI Prompt', text: 'Act as an Enterprise Solution Architect. Formulate an Excel formula template calculating CapEx savings of a custom portal overlay (budget ₹12L-18L) compared to standard HubSpot license seats (over 50 users in Legal/Finance). Clamp payback period parameters.' },
          { id: 'arch', title: 'AI Architecture Prompt', text: 'Design a system architecture flowchart representing a context-injected RAG engine. Include data matching blocks utilizing LangChain + pgvector against legal documents (contracts/NDAs) before querying OpenAI GPT-4 APIs. Add validation check nodes.' },
          { id: 'risk', title: 'Risk Register Prompt', text: 'Draft a Risk Mitigation matrix mapping probability and impact parameters for rate-limiting blocks during CRM synchronization. Detail Redis caching rules and GDPR compliance strategies.' }
        ];

        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 16 of 19 • Prompt Library
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Structured Prompt Repository</h2>
              <p className="text-xs text-slate-550 font-semibold font-bold">Reusable prompts utilized to formulate strategy parameters and code blueprints.</p>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              {promptItems.map((item) => {
                const isExpanded = expandedPromptTab === item.id;
                return (
                  <div key={item.id} className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50 hover-card-glow">
                    <button
                      onClick={() => setExpandedPromptTab(isExpanded ? null : item.id)}
                      className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 transition border-b border-slate-150"
                    >
                      <span className="font-bold text-slate-800 text-[11px]">{item.title}</span>
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <span className="text-[9px] uppercase tracking-wider">View Prompt</span>
                        {isExpanded ? <ChevronUp className="h-4.5 w-4.5 text-[#C9922E]" /> : <ChevronDown className="h-4.5 w-4.5 text-[#C9922E]" />}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="p-4 font-mono text-[10px] text-[#C9922E] bg-slate-900 leading-relaxed select-all whitespace-pre-wrap animate-fade-in">
                        {item.text}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {renderConsultantsNote(
              'Reproducibility Note',
              'Prompts are cataloged for audit transparency, showing how Generative AI assisted proposal drafting. Execution timelines and logic parameters should be validated during technical scoping workshops.'
            )}

            {renderNarrativeTransition(
              'Can the work be reproduced transparently?',
              'Yes, our prompt library provides direct templates for verification. Let\'s look at doodleblue as the ideal delivery partner in Slide 17.'
            )}
          </div>
        );
      }

      case 17: // Slide 17: Why doodleblue
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 17 of 19 • Recommended Delivery Partner
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Why doodleblue</h2>
              <p className="text-xs text-slate-505 font-semibold">Leveraging doodleblue&apos;s product development, enterprise UX, and cloud engineering expertise.</p>
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
                <h4 className="font-bold text-slate-805 uppercase tracking-wider border-b border-slate-100 pb-1">Enterprise Security</h4>
                <p className="text-[10.5px] text-slate-655 leading-relaxed font-semibold">
                  Strict compliance protocols, deploying secure RBAC configurations and GDPR-ready data policies.
                </p>
              </div>
            </div>

            {renderConsultantsNote(
              'Delivery Framework',
              'Capabilities and resource schedules are illustrative of specialized agency delivery. Resource plans should be customized to fit joint alignment parameters.'
            )}

            {renderNarrativeTransition(
              'Why does this approach align with doodleblue?',
              'doodleblue brings proven agile delivery model, integration skills, and secure engineering. Let\'s evaluate project risks next in Slide 18.'
            )}
          </div>
        );

      case 18: { // Slide 18: Risk Register
        const risks = [
          { r: 'HubSpot API Rate Limits', p: 'Low', i: 'Medium', m: 'Deploy Redis webhook caching queues to throttle peaks.', o: 'Lead Engineer', s: 'Mitigated' },
          { r: 'Low User Adoption', p: 'Medium', i: 'High', m: 'Integrate interactive in-app guide walkthroughs.', o: 'UX Director', s: 'Mitigated' },
          { r: 'Scope Creep', p: 'Medium', i: 'Medium', m: 'Strictly freeze MVP scope; defer payments to Phase 2.', o: 'Product Manager', s: 'Managed' },
          { r: 'AI Model Hallucinations', p: 'Low', i: 'High', m: 'Inject pgvector context; require manual manager check.', o: 'AI Strategist', s: 'Mitigated' },
          { r: 'GDPR Data Compliance', p: 'Low', i: 'High', m: 'Encrypt contract logs; strip PII customer name feeds.', o: 'Legal Ops', s: 'Active' }
        ];

        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-rose-50 text-rose-700 rounded-md uppercase tracking-wider">
              Slide 18 of 19 • Risk Register Matrix
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Project Risks & Mitigation Matrix</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Selected boundary safeguards established to ensure operational stability.</p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
              <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Identified Risk Factor</th>
                    <th className="p-3">Probability</th>
                    <th className="p-3">Severity Impact</th>
                    <th className="p-3">Mitigation Safeguard</th>
                    <th className="p-3">Owner</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold text-[10.5px]">
                  {risks.map((risk, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-800">{risk.r}</td>
                      <td className="p-3">
                        <span className={`py-0.5 px-2 rounded-full text-[9px] uppercase ${
                          risk.p === 'High' ? 'bg-rose-50 text-rose-750 border border-rose-200' : 'bg-slate-100 text-slate-655'
                        }`}>{risk.p}</span>
                      </td>
                      <td className="p-3">
                        <span className={`py-0.5 px-2 rounded-full text-[9px] uppercase ${
                          risk.i === 'High' ? 'bg-rose-50 text-rose-750 border border-rose-200' : 'bg-slate-100 text-slate-655'
                        }`}>{risk.i}</span>
                      </td>
                      <td className="p-3 text-slate-605">{risk.m}</td>
                      <td className="p-3 font-mono text-[9px] text-[#C9922E]">{risk.o}</td>
                      <td className="p-3">
                        <span className={`py-0.5 px-2 rounded font-bold text-[9px] uppercase ${
                          risk.s === 'Active' ? 'text-amber-700 bg-amber-50 border border-amber-200' : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        }`}>{risk.s}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {renderConsultantsNote(
              'Risk Note',
              'The risk register represents a snapshot of initial operational boundaries. These mitigation actions and threat vectors must be reviewed periodically during project sprint cycles.'
            )}

            {renderNarrativeTransition(
              'What could go wrong and how will we mitigate it?',
              'Key API throttle, data compliance, and user adoption risks have clear mitigation safeguards. Let\'s conclude with the Final Recommendation in Slide 19.'
            )}
          </div>
        );
      }

      case 19: // Slide 19: Final Strategic Recommendation
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs text-center">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md uppercase tracking-wider">
              Slide 19 of 19 • Strategic Recommendation Summary
            </span>
            
            <div className="space-y-4 py-4">
              <h2 className="text-4xl font-extrabold text-[#1B1F2A] tracking-tight">Strategic Recommendation Summary</h2>
              <p className="text-sm text-slate-555 font-bold max-w-md mx-auto leading-relaxed">
                Adopt the **Hybrid CRM Overlay** architecture to preserve HubSpot as doodleblue&apos;s System of Record, while unblocking signature cycles via custom, serverless approver portals.
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
                onClick={() => setCurrentSlide(12)}
                className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-2xl transition duration-200 active-press"
              >
                View Technology Architecture
              </button>
              <button
                onClick={() => setCurrentSlide(1)}
                className="p-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl shadow-md transition duration-200 active-press"
              >
                Back to Preface Context
              </button>
            </div>

            {renderConsultantsNote(
              'Final Framework',
              'Recommendations represent the final strategy synthesis. Execution should occur iteratively under proper change management controls.'
            )}

            {renderNarrativeTransition(
              'Where to find resources?',
              'All assets, Figma frames, and repository code are consolidated for assessment hand-off. Let\'s check the Submission Resources in Slide 20.'
            )}
          </div>
        );

      case 20: // Slide 20: Submission Resources
        return (
          <div className="space-y-6 max-w-5xl mx-auto p-6 animate-slide-fade text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md uppercase tracking-wider">
              Slide 20 of 20 • Assessment Hand-off
            </span>
            <div className="space-y-1">
              <h2 className="text-3xl font-semibold text-[#1B1F2A] tracking-tight">Submission Resources</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Everything required to review this assessment in one place.</p>
            </div>

            {/* Three Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              
              {/* Card 1: Interactive Presentation & Live Demo */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 flex flex-col justify-between shadow-3xs space-y-4 hover-card-glow">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-700">
                    <span className="text-xl">🌐</span>
                    <h4 className="font-bold text-xs uppercase tracking-wider">Interactive Demo</h4>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">
                    Explore the complete assessment including the executive presentation, product strategy, workflow, architecture, AI capabilities, and interactive Hybrid CRM Overlay prototype.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[#C9922E] block text-center font-bold">Primary Resource</span>
                  <button
                    onClick={() => handleModeSwitch('crm')}
                    className="w-full bg-[#C9922E] hover:bg-[#b07f24] text-white text-[10px] py-2.5 px-4 rounded-lg font-bold uppercase transition text-center shadow-xs"
                  >
                    Launch Interactive Demo
                  </button>
                  <span className="text-[8px] text-slate-400 block text-center font-semibold">This represents the current application</span>
                </div>
              </div>

              {/* Card 2: Refined Figma Design */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 flex flex-col justify-between shadow-3xs space-y-4 hover-card-glow">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-700">
                    <span className="text-xl">🎨</span>
                    <h4 className="font-bold text-xs uppercase tracking-wider">Refined Figma Design</h4>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">
                    Review the refined high-fidelity UI screens that were generated using Google Stitch, iteratively refined in Figma, and used as the design reference for the interactive implementation.
                  </p>
                </div>
                <div>
                  <a
                    href="https://www.figma.com/design/I544lGrdsgBQJscYTdBlbX/Doodle-Blue---CRM-Adaptation---Dashboard-Design?node-id=6-6774&t=x8ncvxecePohzVnn-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] py-2.5 px-4 rounded-lg font-bold uppercase transition text-center shadow-xs"
                  >
                    Open Figma Design
                  </a>
                  <span className="text-[8px] text-slate-400 block text-center mt-1.5 font-medium select-all">
                    Link: figma.com/design/...
                  </span>
                </div>
              </div>

              {/* Card 3: GitHub Repository */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 flex flex-col justify-between shadow-3xs space-y-4 hover-card-glow">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-700">
                    <span className="text-xl">💻</span>
                    <h4 className="font-bold text-xs uppercase tracking-wider">GitHub Repository</h4>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">
                    Review the complete source code, project structure, implementation approach, and supporting documentation.
                  </p>
                </div>
                <div>
                  <a
                    href="https://github.com/Sethuram-Vijayakumar/hybrid-crm-layer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-slate-905 bg-slate-900 hover:bg-slate-800 text-white text-[10px] py-2.5 px-4 rounded-lg font-bold uppercase transition text-center shadow-xs"
                  >
                    View Repository
                  </a>
                  <span className="text-[8px] text-slate-400 block text-center mt-1.5 font-medium select-all font-bold">
                    Link: github.com/Sethuram-Vijayakumar/hybrid-crm-layer
                  </span>
                </div>
              </div>

            </div>

            {/* Recommended Review Flow */}
            <div className="bg-indigo-50/50 border border-indigo-150 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-indigo-100 pb-2">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Recommended Review Flow</h4>
                <div className="text-[10px] text-indigo-700 font-bold bg-white px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Estimated Review Time: 10–15 minutes
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-[10px] font-bold text-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="bg-indigo-650 text-white w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold">1</span>
                  <span>Review Executive Presentation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-indigo-650 text-white w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold">2</span>
                  <span>Explore CRM Prototype</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-indigo-650 text-white w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold">3</span>
                  <span>Review Refined Figma Designs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-indigo-650 text-white w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold">4</span>
                  <span>Explore GitHub Repository</span>
                </div>
              </div>
            </div>

            {/* Bottom Design Journey Section */}
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <h4 className="text-[10px] font-bold text-[#1B1F2A] uppercase tracking-wider">Design Journey</h4>
              
              <div className="flex items-center justify-center space-x-4 text-[9.5px] font-bold text-slate-600 font-semibold bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                <div className="text-center">
                  <span className="block text-[11px]">🪄</span>
                  <span className="block text-slate-800">Google Stitch</span>
                  <span className="text-[8px] font-normal text-slate-500 block">Concept Exploration</span>
                </div>
                <div className="text-slate-350">➔</div>
                <div className="text-center">
                  <span className="block text-[11px]">🎨</span>
                  <span className="block text-slate-800">Figma</span>
                  <span className="text-[8px] font-normal text-slate-500 block">UX Refinement</span>
                </div>
                <div className="text-slate-350">➔</div>
                <div className="text-center">
                  <span className="block text-[11px]">🚀</span>
                  <span className="block text-indigo-800">Antigravity</span>
                  <span className="text-[8px] font-normal text-indigo-600 block">Prototype Implementation</span>
                </div>
                <div className="text-slate-350">➔</div>
                <div className="bg-indigo-600 text-white px-3 py-1 rounded-md text-center text-[9px] font-bold">
                  Final PM Assessment
                </div>
              </div>

              <p className="text-[9px] text-slate-400 leading-relaxed font-semibold">
                Google Stitch accelerated early concept generation. The designs were then refined in Figma and implemented in Antigravity to create the final interactive prototype. In a production environment, the design would continue to evolve through user research, usability testing, stakeholder feedback, and iterative refinement.
              </p>
            </div>
          </div>
        );default:
        return null;
    }
  };

  const getSlideNotes = (slideIndex: number) => {
    return speakerNotesMap[slideIndex as keyof typeof speakerNotesMap] || 'No speaker guidelines logged.';
  };

  const totalStepsInTrack = customSequence.length > 0 ? customSequence.length : 20;
  const currentStepInTrack = customSequence.length > 0 ? sequenceIndex + 1 : currentSlide;
  const progressPercentage = Math.round((currentStepInTrack / totalStepsInTrack) * 100);

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
          
          <button
            onClick={() => setShowReviewerModal(true)}
            className="hidden sm:flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-[#C9922E] font-bold text-[10px] uppercase py-1.5 px-3 rounded-lg border border-slate-700 transition duration-150 active-press"
          >
            <span>📋 Reviewer Guide</span>
          </button>

          <div className="hidden md:flex items-center space-x-3 text-slate-400 text-[10px] font-bold border-l border-slate-800 pl-4 uppercase tracking-wider mr-2">
            <span>⏱️ 5 min read</span>
            <span>v1.2.0</span>
          </div>

          {/* Switcher Toggle */}
          <div className="relative">
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#1B1F2A] animate-ping" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#1B1F2A]" />
            
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 shadow-md">
              <button
                onClick={() => handleModeSwitch('presentation')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-150 active-press ${
                  presentationMode
                    ? 'bg-[#C9922E] text-white font-extrabold glowing-ring'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📑 Executive Presentation
              </button>
              <button
                onClick={() => handleModeSwitch('crm')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-150 active-press ${
                  !presentationMode
                    ? 'bg-[#C9922E] text-white font-extrabold glowing-ring'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                💻 Interactive Demo CRM
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
                Slide {currentSlide} of 19 {activeTrack && `• ${activeTrack.toUpperCase()} REVIEW`}
              </span>
            </div>

            {/* Clickable Slide Indicator Dots */}
            <div className="hidden md:flex items-center space-x-2.5">
              {Array.from({ length: 19 }).map((_, idx) => {
                const slideNum = idx + 1;
                return (
                  <button
                    key={slideNum}
                    onClick={() => {
                      setCurrentSlide(slideNum);
                      if (customSequence.length > 0) {
                        const seqIdx = customSequence.indexOf(slideNum);
                        if (seqIdx !== -1) setSequenceIndex(seqIdx);
                      }
                    }}
                    className={`h-2.5 w-2.5 rounded-full transition duration-150 ${
                      currentSlide === slideNum
                        ? 'bg-[#C9922E] scale-125'
                        : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Go to Slide ${slideNum}`}
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
                  if (currentSlide < 19) {
                    setCurrentSlide(currentSlide + 1);
                  } else {
                    setPresentationMode(false);
                    router.push('/pipeline');
                  }
                }}
                className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-bold text-[10px] px-4 py-2 rounded-lg transition active-press flex items-center space-x-1"
              >
                <span>{currentSlide === 19 ? 'View Demo CRM' : 'Next'}</span>
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
                    <p className="text-[11px] text-slate-606 leading-relaxed">{getSlideNotes(currentSlide)}</p>
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
                  {currentSlide < 19 && (
                    <div className="bg-slate-55 border border-slate-150 rounded-xl p-5 space-y-3">
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

            {/* Floating Guided Presenter Card */}
            {guidedMode && (
              <div className="fixed bottom-24 right-8 z-40 max-w-sm w-full font-sans animate-slide-up text-slate-800">
                {presenterCardCollapsed ? (
                  <button
                    onClick={() => setPresenterCardCollapsed(false)}
                    className="float-right bg-[#1B1F2A] text-white p-3 rounded-full shadow-2xl hover:bg-slate-800 border border-slate-700 transition flex items-center space-x-1.5 text-xs font-bold active-press"
                  >
                    <span>🧭</span>
                    <span>Guided Presenter Card</span>
                  </button>
                ) : (
                  <div className="bg-[#1B1F2A]/95 text-white border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4.5 w-4.5 text-[#C9922E]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9922E]">Guided Reviewer Mode</span>
                      </div>
                      <button
                        onClick={() => setPresenterCardCollapsed(true)}
                        className="text-slate-400 hover:text-white p-0.5 rounded transition"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                        Current Section: {(() => {
                          const guide = slideGuidesMap[currentSlide];
                          return guide ? guide.section : 'Summary';
                        })()}
                      </span>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Slide Key Takeaway</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                        {(() => {
                          const guide = slideGuidesMap[currentSlide];
                          return guide ? guide.takeaway : 'Lays out strategy parameters.';
                        })()}
                      </p>
                    </div>

                    {/* Collapsible toggle link */}
                    <div className="text-center pt-1">
                      <button
                        onClick={() => setShowDetailedGuideNotes(!showDetailedGuideNotes)}
                        className="text-[9px] uppercase tracking-wider text-[#C9922E] hover:underline font-bold"
                      >
                        {showDetailedGuideNotes ? 'Hide Strategy Details ▴' : 'Show Strategy Details ▾'}
                      </button>
                    </div>

                    {showDetailedGuideNotes && (
                      <div className="space-y-4 animate-fade-in border-t border-slate-800 pt-3">
                        <div className="space-y-1 bg-slate-800/60 p-2.5 rounded-xl border border-slate-800 font-semibold">
                          <h4 className="text-[9px] font-bold text-[#C9922E] uppercase tracking-widest">Why It Matters</h4>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                            {(() => {
                              const guide = slideGuidesMap[currentSlide];
                              return guide ? guide.whyItMatters : 'Essential for review checks.';
                            })()}
                          </p>
                        </div>

                        {/* Bridge */}
                        <div className="text-[10px] text-slate-355 italic leading-relaxed">
                          <strong>Narrative Bridge:</strong> &ldquo;{(() => {
                            const guide = slideGuidesMap[currentSlide];
                            return guide ? guide.bridge : 'Moving to the next slide...';
                          })()}&rdquo;
                        </div>

                        <div className="text-[8.5px] uppercase tracking-widest text-[#C9922E] font-bold flex items-center justify-between">
                          <span>Deliverables covered:</span>
                          <span className="bg-[#C9922E]/10 text-[#C9922E] px-1.5 py-0.5 rounded text-[8px]">
                            {(() => {
                              const guide = slideGuidesMap[currentSlide];
                              return guide ? guide.checklist : '✓ Proposal Section';
                            })()}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] border-t border-slate-800 pt-3">
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-bold">Progress</span>
                        <span className="font-bold text-white mt-0.5 block">{currentStepInTrack}/{totalStepsInTrack}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-bold">Estimated Time</span>
                        <span className="font-bold text-emerald-400 font-mono mt-0.5 block">
                          {(() => {
                            const guide = slideGuidesMap[currentSlide];
                            return guide ? guide.time : '30s';
                          })()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase block tracking-wider font-bold">Completed</span>
                        <span className="font-bold text-emerald-400 mt-0.5 block">{progressPercentage}%</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleNextSlide}
                        className="w-full bg-[#C9922E] hover:bg-[#b07f24] text-white text-[10px] font-bold uppercase py-2 px-4 rounded-xl transition active-press flex items-center justify-center space-x-1"
                      >
                        <span>{currentSlide === 19 || (customSequence.length > 0 && sequenceIndex === customSequence.length - 1) ? 'Go to Demo CRM' : 'Next Strategic Step'}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>

          {/* Floating Keynote Presentation Toolbar */}
          {toolbarVisible && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1B1F2A]/90 text-white border border-slate-800 py-3 px-6 rounded-2xl shadow-2xl flex items-center justify-between space-x-6 backdrop-blur-md animate-slide-up w-[95%] sm:w-auto">
              
              {/* Previous Button */}
              <button 
                disabled={sequenceIndex === 0 && customSequence.length > 0 || currentSlide === 1 && customSequence.length === 0}
                onClick={handlePrevSlide}
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
                <span>19</span>
              </div>

              {/* Next Button */}
              <button 
                onClick={handleNextSlide}
                className="hover:text-[#C9922E] transition flex items-center space-x-1 text-xs font-bold"
                title="Next Slide (→ / Space / PageDown)"
              >
                <span className="hidden sm:inline">{currentSlide === 19 || (customSequence.length > 0 && sequenceIndex === customSequence.length - 1) ? 'View Demo' : 'Next'}</span>
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
                        <h4 className="text-xs font-semibold text-[#303746]">Connected Instance</h4>
                        <p className="text-[10px] text-slate-500">northbridge-hubspot-prd</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* Desktop Left Sidebar */}
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
                    <h4 className="text-xs font-semibold text-slate-350">Connected Instance</h4>
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
                { k: 'End', d: 'Jump to Slide 18' },
                { k: 'F', d: 'Toggle Fullscreen Mode' },
                { k: 'Alt / Shift', d: 'Hold to show Laser Pointer' },
                { k: 'Esc', d: 'Exit Presentation Mode' },
                { k: '?', d: 'Toggle this Shortcuts Menu' }
              ].map((s, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-slate-50">
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-[10px] text-[#C9922E]">{s.k}</span>
                  <span className="text-slate-605">{s.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Welcome Mode Choice Modal */}
      {showChoiceModal && (
        <div className="fixed inset-0 bg-[#0F111A]/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in font-sans text-slate-800">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-[#C9922E]" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1B1F2A]">Welcome 👋</h3>
              </div>
              <span className="text-[8.5px] uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold">Choose your review experience</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Executive Review Track */}
              <button
                onClick={() => startReviewTrack('executive')}
                className="flex flex-col justify-between items-start text-left p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition duration-200 text-xs space-y-2 group active-press"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-[13px]">👔 Executive Review (5 min)</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                    Quick overview of the recommendation, ROI, and final proposal.
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-[#C9922E] text-[9.5px] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Start Review</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </button>

              {/* Product Review Track */}
              <button
                onClick={() => startReviewTrack('product')}
                className="flex flex-col justify-between items-start text-left p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition duration-200 text-xs space-y-2 group active-press"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-[13px]">📦 Product Review (10 min)</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                    Complete walkthrough with proposal, UX, technology, AI, and risks.
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-[#C9922E] text-[9.5px] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Start Review</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </button>

              {/* Technical Review Track */}
              <button
                onClick={() => startReviewTrack('technical')}
                className="flex flex-col justify-between items-start text-left p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition duration-200 text-xs space-y-2 group active-press"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-[13px]">⚙ Technical Review (8 min)</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                    Architecture, integrations, AI, APIs, and implementation.
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-[#C9922E] text-[9.5px] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Start Review</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </button>

              {/* UX Review Track */}
              <button
                onClick={() => startReviewTrack('ux')}
                className="flex flex-col justify-between items-start text-left p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition duration-200 text-xs space-y-2 group active-press"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-[13px]">🎨 UX Review (5 min)</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                    Prototype, user journey, interaction design, and demo CRM.
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-[#C9922E] text-[9.5px] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Start Review</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </button>

            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold">Or explore independent items:</span>
              <button
                onClick={() => {
                  setGuidedMode(false);
                  setPresentationMode(false);
                  setTourActive(true);
                  setTourStep(1);
                  router.push('/pipeline');
                  setShowChoiceModal(false);
                }}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-5 rounded-xl transition duration-150 active-press"
              >
                Explore CRM Directly
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guided Handoff Screen Transition Modal */}
      {showHandoffModal && (
        <div className="fixed inset-0 bg-[#0F111A]/95 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 text-slate-800">
            <div className="flex justify-center">
              <div className="h-14 w-14 rounded-full bg-[#FBF1DE] flex items-center justify-center">
                <Award className="h-7 w-7 text-[#C9922E]" />
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-[#C9922E] font-bold text-[9px] uppercase tracking-widest block">Review Phase Complete</span>
              <h3 className="text-xl font-bold text-[#1B1F2A]">The Strategy Has Been Presented</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Now let&apos;s experience the proposed solution in action. Let&apos;s guide you into the interactive Demo CRM portal.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setGuidedMode(false);
                  setPresentationMode(false);
                  setTourActive(true);
                  setTourStep(1);
                  router.push('/pipeline');
                  setShowHandoffModal(false);
                }}
                className="w-full bg-[#C9922E] hover:bg-[#b07f24] text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition duration-205 active-press flex items-center justify-center space-x-2"
              >
                <Play className="h-4 w-4 fill-current text-white" />
                <span>Experience Demo CRM</span>
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Reviewer Guide Modal */}
      {showReviewerModal && (
        <div className="fixed inset-0 bg-[#0F111A]/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📋</span>
                <h3 className="text-base font-extrabold text-[#1B1F2A] uppercase tracking-wider">Reviewer Guide</h3>
              </div>
              <button onClick={() => setShowReviewerModal(false)} className="text-slate-400 hover:text-slate-600 transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
              
              {/* Flow Path */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">Recommended Flow</h4>
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Target Reading Time</span>
                    <span className="text-emerald-700 font-bold">8 to 10 minutes</span>
                  </div>
                  <ol className="list-decimal pl-4 space-y-1.5 text-slate-655 leading-relaxed text-[10.5px]">
                    <li>Presentation Mode Preface (Slide 1)</li>
                    <li>The Current Process (Slide 2)</li>
                    <li>How the Hybrid CRM Overlay Works (Slide 3)</li>
                    <li>Executive Recommendation (Slide 4)</li>
                    <li>Product Proposal Scope (Slide 8)</li>
                    <li>Figma UX Prototype (Slide 9)</li>
                    <li>ROI Case Study (Slide 10)</li>
                    <li>Technology Stack (Slide 12)</li>
                    <li>AI Value Add mappings (Slide 14)</li>
                    <li>Risk Mitigation Matrix (Slide 18)</li>
                    <li>Final Strategic Recommendation (Slide 19)</li>
                  </ol>
                </div>
              </div>

              {/* Assignment Checklist */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">Deliverables Covered</h4>
                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-1.5 text-slate-700">
                  <div className="flex items-center space-x-2 text-[10.5px]">
                    <span className="text-emerald-600">✓</span>
                    <span>Option Evaluation Matrix (Slide 7)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10.5px]">
                    <span className="text-emerald-600">✓</span>
                    <span>Product Proposal MVP Scope (Slide 8)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10.5px]">
                    <span className="text-emerald-600">✓</span>
                    <span>Figma UX Prototype Layout (Slide 9)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10.5px]">
                    <span className="text-emerald-600">✓</span>
                    <span>Business Value Case & ROI (Slide 10)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10.5px]">
                    <span className="text-emerald-600">✓</span>
                    <span>AI Strategic Value Add (Slide 14)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10.5px]">
                    <span className="text-emerald-600">✓</span>
                    <span>Responsible AI Usage Log (Slide 15)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10.5px]">
                    <span className="text-emerald-600">✓</span>
                    <span>Structured Prompt Library (Slide 16)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10.5px]">
                    <span className="text-emerald-600">✓</span>
                    <span>Risk Mitigation Register (Slide 18)</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowReviewerModal(false)}
                className="bg-[#C9922E] hover:bg-[#b07f24] text-white text-xs font-bold py-2 px-5 rounded-xl transition duration-150 active-press"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
