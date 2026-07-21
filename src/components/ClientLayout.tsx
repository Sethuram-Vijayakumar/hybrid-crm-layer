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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  Clock
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
    tourActive,
    setTourActive,
    tourStep,
    setTourStep
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState<boolean>(true);
  const [activeAIFeature, setActiveAIFeature] = useState<'risk' | 'brief' | 'summary' | 'email'>('risk');

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
      if (e.key === 'ArrowRight') {
        setCurrentSlide(Math.min(currentSlide + 1, 13));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(Math.max(currentSlide - 1, 1));
      } else if (e.key === 'Escape') {
        setPresentationMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, currentSlide, setCurrentSlide, setPresentationMode]);

  // Standard Mode Side Navigation Items
  const navItems = [
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
      name: 'AI Command Center',
      href: '/ai-command-center',
      icon: Sparkles,
    },
    {
      name: 'Settings & Sync',
      href: '/settings',
      icon: Settings,
    },
  ];

  // Helper to render slides in Light Theme
  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1: // Executive Summary
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 1 of 13 • Executive Summary
            </span>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">CRM Transformation Strategy</h2>
              <h3 className="text-xs font-bold text-[#C9922E] uppercase tracking-wider">Strategic Recommendation: Hybrid CRM Overlay</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                To eliminate approval delays and integrate delivery workloads at Northbridge Advisory, we recommend deploying a lightweight **Hybrid CRM Overlay** built with Next.js and Supabase. This approach preserves HubSpot as the core System of Record while introducing targeted approval portals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Business Problem', desc: 'Standard CRM seats lack custom multi-signature workflows, blocking contract sign-offs in Legal/Finance.', color: 'border-l-rose-500' },
                { title: 'Recommendation', desc: 'Overlay light custom portals on HubSpot, syncing data securely via serverless APIs.', color: 'border-l-4 border-l-[#C9922E]' },
                { title: 'Expected ROI', desc: 'Avoids custom CRM rebuilding risks, reducing upfront CapEx by approximately 70%.', color: 'border-l-4 border-l-emerald-500' },
                { title: 'Timeline & Timeline', desc: 'Production-ready MVP deployment in 8 weeks with zero sales workflow downtime.', color: 'border-l-4 border-l-amber-500' }
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
          <div className="space-y-6 max-w-5xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 2 of 13 • Business Personas
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">Enterprise Personas & Core Workflows</h2>
              <p className="text-xs text-slate-500 font-semibold">Outlining goals, friction, and metrics for the six primary roles.</p>
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
                  <div className="space-y-1 text-[10.5px] leading-relaxed text-slate-600">
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 3 of 13 • Current Problems
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">The Current Bottleneck Statement</h2>
              <p className="text-xs text-slate-500 font-semibold">Identifying workflow friction under standard SaaS CRM setups.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="bg-rose-50/30 border border-rose-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-rose-700 border-b border-rose-100 pb-1">
                  <AlertTriangle className="h-4 w-4" />
                  <h4 className="font-bold uppercase tracking-wider">Siloed SaaS Blocks</h4>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Standard CRM seats do not accommodate cross-department approvers (Legal & Finance), creating dark communication silos.
                </p>
              </div>

              <div className="bg-rose-50/30 border border-rose-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-rose-700 border-b border-rose-100 pb-1">
                  <Clock className="h-4 w-4" />
                  <h4 className="font-bold uppercase tracking-wider">Contract Hold Delays</h4>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Deals sit stagnant in queues for an average of 4.4 days due to manual email routing notifications.
                </p>
              </div>

              <div className="bg-rose-50/30 border border-rose-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-rose-700 border-b border-rose-100 pb-1">
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 4 of 13 • Solution Evaluation & Matrix
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">Executive Decision Matrix</h2>
              <p className="text-xs text-slate-500 font-semibold">Comparing standard alternatives to highlight the Hybrid CRM Overlay approach.</p>
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
                    <td className="p-3.5 bg-[#FBF1DE]/10 font-bold text-emerald-700">Low (₹15L CapEx)</td>
                    <td className="p-3.5">Very High (₹45L+)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Deployment Timeline</td>
                    <td className="p-3.5">Immediate</td>
                    <td className="p-3.5 bg-[#FBF1DE]/10 font-bold text-emerald-700">8 Weeks (Rapid Overlay)</td>
                    <td className="p-3.5">6-9 Months</td>
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 5 of 13 • User Journey Transition
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">Streamlining the Operational Journey</h2>
              <p className="text-xs text-slate-500 font-semibold">Comparison of the contract lifecycle before and after overlay implementation.</p>
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 6 of 13 • Business Case & ROI
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">Financial Projections & Business Value</h2>
              <p className="text-xs text-slate-500 font-semibold">Clear ROI metrics and payback parameters for executive stakeholders.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Development Cost', val: '₹15L CapEx', desc: '70% cheaper than a full custom rebuild (₹45L+).', color: 'text-indigo-650' },
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 7 of 13 • MVP Implementation Roadmap
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">Incremental 8-Week Timeline</h2>
              <p className="text-xs text-slate-500 font-semibold">Four phases built iteratively to guarantee zero deployment friction.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold">
              {[
                { phase: 'Phase 1: Overlay', wks: 'Weeks 1-2', task: 'Deploy Next.js portal layout and connect Supabase database schemas.' },
                { phase: 'Phase 2: AI Strategy', wks: 'Weeks 3-4', task: 'Integrate OpenAI risk-scoring engines and briefing models.' },
                { phase: 'Phase 3: Enterprise', wks: 'Weeks 5-6', task: 'Connect live HubSpot webhooks and field mappings registries.' },
                { phase: 'Phase 4: Automation', wks: 'Weeks 7-8', task: 'Configure Resend email triggers and complete audit logs.' }
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 8 of 13 • Risks & Readiness
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">Implementation Risks & Mitigations</h2>
              <p className="text-xs text-slate-500 font-semibold">Minimizing deployment exposure through strategic rollout safeguards.</p>
            </div>

            <div className="overflow-x-auto">
              <div className="space-y-3.5 text-xs font-semibold min-w-[600px] p-0.5">
                <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-2 text-[10px] text-slate-400 font-bold uppercase">
                  <span>Identified Risk</span>
                  <span>Potential Business Impact</span>
                  <span>Mitigation Safeguard</span>
                </div>
                
                {[
                  { r: 'API Rate Limits (HubSpot)', i: 'Delayed database sync status updates', m: 'Implement Redis caching to throttle webhook payloads' },
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 9 of 13 • Strategic AI Integration
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">Embedded Explainable AI Strategy</h2>
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
                      ? 'bg-[#C9922E] text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-655'
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
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">{active.problem}</p>
                </div>
                <div className="p-4 border border-slate-150 rounded-xl space-y-2">
                  <span className="text-emerald-700 font-bold uppercase tracking-wider text-[9px] block">Common Language Explanation</span>
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">{active.common}</p>
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
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
                      <td className="p-3 text-slate-600 text-[10.5px] font-semibold">{item.w}</td>
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 11 of 13 • AI Architecture & Intelligence Platform
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">AI Orchestration & RAG Layout</h2>
              <p className="text-xs text-slate-500 font-semibold font-bold">Architectural blueprint of our custom Retrieval-Augmented Generation context engine.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* RAG Description */}
              <div className="p-4 border border-slate-150 rounded-xl space-y-2">
                <span className="text-[#C9922E] font-bold uppercase tracking-wider text-[9px] block font-bold">Retrieval Augmented Generation (RAG)</span>
                <h4 className="font-bold text-xs text-slate-800">Context-Aware AI Answers</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                  Instead of guessing or hallucinating, semantic vectors run pgvector searches against local NDAs, contracts, and summaries to feed accurate context to the model.
                </p>
                <p className="text-[10.5px] text-slate-550 font-bold bg-[#FBF1DE]/20 p-2.5 rounded-lg border border-[#C9922E]/15">
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
                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-semibold">
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
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 12 of 13 • Recommended Delivery Partner
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-[#1B1F2A] tracking-tight">Why doodleblue</h2>
              <p className="text-xs text-slate-500 font-semibold">Leveraging doodleblue&apos;s product development, enterprise UX, and cloud engineering expertise.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 hover-card-glow">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider">Specialized Capabilities</h4>
                <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">
                  Proven expertise in building lightweight SaaS overlay layers that hook into legacy systems without migration risks.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 hover-card-glow">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider">Agile Delivery Model</h4>
                <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">
                  Structured 8-week sprint timeline mapping, ensuring active client reviews and feedback loops.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 hover-card-glow">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider">Enterprise Security</h4>
                <p className="text-[10.5px] text-slate-600 leading-relaxed font-semibold">
                  Strict compliance protocols, deploying secure RBAC configurations and GDPR-ready data policies.
                </p>
              </div>
            </div>
          </div>
        );

      case 13: // Final Recommendation
        return (
          <div className="space-y-6 max-w-4xl mx-auto p-5 animate-fade-in text-slate-700 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#C9922E]/10 text-[#C9922E] rounded-md uppercase tracking-wider">
              Slide 13 of 13 • Concluding Recommendation
            </span>
            
            <div className="bg-slate-50 border-2 border-[#C9922E]/30 rounded-2xl p-6 shadow-md text-center space-y-4">
              <h2 className="text-2xl font-bold text-[#1B1F2A] tracking-tight">Strategic Recommendation Summary</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold max-w-xl mx-auto">
                Adopt the **Hybrid CRM Overlay** architecture to preserve HubSpot as doodleblue&apos;s System of Record, while unblocking signature cycles via custom, serverless approver portals.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold pt-2 max-w-lg mx-auto">
                {[
                  '✔ Lower Custom CapEx',
                  '✔ Fast 8-Week MVP',
                  '✔ Low Transition Risk',
                  '✔ High Adoption Rate',
                  '✔ Enterprise Scale',
                  '✔ AI Integration Ready'
                ].map((item, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 text-[#C9922E] py-1.5 px-3 rounded-lg">
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed max-w-md mx-auto pt-4 border-t border-slate-200 font-medium">
                This strategy maximizes existing HubSpot CRM investments and deploys new custom code only where it resolves measurable operational bottlenecks.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans">
      
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

        {/* Header Right Controls Switcher */}
        <div className="flex items-center space-x-4 shrink-0 text-xs font-semibold">
          <span className="text-slate-405 hidden lg:inline">Prepared by: Sethuram Vijayakumar</span>
          
          <div className="hidden md:flex items-center space-x-3 text-slate-400 text-[10px] font-bold border-l border-slate-800 pl-4 uppercase tracking-wider mr-2">
            <span>⏱️ 5 min read</span>
            <span>v1.1.0</span>
          </div>

          {/* Presentation Mode / Demo CRM Switching Switcher */}
          <div className="relative">
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#1B1F2A] animate-ping" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#1B1F2A]" />
            
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 shadow-md">
              <button
                onClick={() => setPresentationMode(true)}
                className={`py-1.5 px-3.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-150 active-press ${
                  presentationMode
                    ? 'bg-[#C9922E] text-white font-extrabold glowing-ring'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Presentation Mode
              </button>
              <button
                onClick={() => {
                  setPresentationMode(false);
                  router.push('/pipeline');
                }}
                className={`py-1.5 px-3.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-150 active-press ${
                  !presentationMode
                    ? 'bg-[#C9922E] text-white font-extrabold glowing-ring'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Demo CRM
              </button>
            </div>
          </div>
        </div>
      </header>

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
          <main className="flex-1 flex items-start justify-center pt-8 pb-12 px-4 sm:px-6 md:px-8 overflow-y-auto max-w-[1440px] mx-auto w-full">
            {renderSlideContent()}
          </main>
        </div>
      ) : (
        // STANDARD MODE SCREEN
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
                className="bg-slate-800 hover:bg-slate-750 text-white font-semibold text-[10px] md:text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-700 transition active-press"
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
              className="text-slate-405 hover:text-white font-medium text-[10px] md:text-[11px] px-2 py-1.5 transition"
            >
              Skip
            </button>
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
                className="bg-[#C9922E] hover:bg-[#b07f24] text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition duration-200 active-press"
              >
                Launch Presentation Mode
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
