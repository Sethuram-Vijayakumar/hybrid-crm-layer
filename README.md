# Hybrid CRM Overlay — Strategy Case Study Portfolio

An enterprise strategy recommendation and interactive demo website prepared for the **doodleblue Product Manager Assessment**. 

This repository presents the strategic proposal, product proposal, system architecture, UX prototypes, ROI metrics, risk mitigation registers, and prompt co-creation logs for deploying a lightweight custom **CRM Overlay Layer** on top of **HubSpot** for Northbridge Advisory.

---

## 📑 Project Overview

Northbridge Advisory faces operational hold delays in contract sign-off cycles (averaging **4.4 days**) due to the lack of custom multi-department approval flows (Legal & Finance) in standard CRM seat licenses.

Instead of a high-risk, expensive custom CRM rewrite (estimated at **₹45L–65L**), this study recommends a **Hybrid CRM Overlay** (budgeted at **₹12L–18L**) built with Next.js, Supabase, and OpenAI.

---

## 🏆 doodleblue Assignment Deliverables Checklist

All core deliverables from the assessment briefing are fully implemented and visible directly in the interactive presentation deck:

- [x] **Deliverable 1: CRM Option Evaluation Matrix** (Slide 5) - Evaluating Stay SaaS, Custom CRM, and Hybrid Overlay.
- [x] **Deliverable 2: Figma UX Prototype Wireframe** (Slide 7) - Interactive prototype coverage and WCAG principles.
- [x] **Deliverable 3: User Journey Progression** (Slide 8) - Streamlined approvals timeline dropping hold times from 4.4 to 1.5 days.
- [x] **Deliverable 4: Product Proposal MVP Scope** (Slide 6) - Stakeholders, boundary scopes, metrics, and KPI definitions.
- [x] **Deliverable 5: Technology Architecture Stack** (Slide 11) - Next.js, Supabase PostgreSQL, LangChain vector indexes, OpenAI APIs.
- [x] **Deliverable 6: AI Strategic Value Add Mappings** (Slide 13) - Delay risk scoring, email assistants, and explainability score guardrails.
- [x] **Deliverable 7: Responsible AI Usage Log** (Slide 14) - Complete audit trails of GPT-4/Claude prompts and expert refinement steps.
- [x] **Deliverable 8: Structured Prompt Library** (Slide 15) - Actual prompt templates used to construct the strategy framework.

---

## 🏗 System Architecture & Technology Stack

The reference architecture implements a zero-migration, real-time sync model:

```
[ HubSpot CRM REST APIs ] ◄──(Serverless Webhooks)──► [ Supabase DB / Postgres ]
                                                               ▲
                                                               │
                                                     [ Next.js React Portal ]
                                                               ▲
                                                               │
                                                    [ OpenAI Vector Search ]
```

* **Frontend**: Next.js 14, React, Tailwind CSS, Lucide icons, Framer Motion.
* **Database & Auth**: Supabase Serverless PostgreSQL Database.
* **AI Orchestration**: OpenAI GPT-4 API context-injected via vector pgvector NDA documents.
* **Notifications**: Resend serverless email queues + Slack webhooks.

---

## 💻 How to Run Locally

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Sethuram-Vijayakumar/hybrid-crm-layer.git
cd hybrid-crm-layer
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Compilation Build
```bash
npm run build
npm run start
```

---

## 💡 AI Usage Transparency Statement

AI tools (specifically OpenAI GPT-4o and Claude 3.5 Sonnet) were utilized to accelerate strategic ideation, content drafting, database schema planning, and layout design. Final architecture configurations, calculations, recommendations, and code checks were manually reviewed, edited, and verified.
