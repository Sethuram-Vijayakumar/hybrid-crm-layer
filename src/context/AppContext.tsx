'use client';

import React, { createContext, useContext, useState } from 'react';
import { Deal, initialDeals, FieldMapping, initialFieldMappings } from '@/lib/mock-data';

interface AppContextType {
  deals: Deal[];
  syncStatus: string;
  isSyncing: boolean;
  fieldMappings: FieldMapping[];
  triggerSync: () => Promise<void>;
  toggleFieldMapping: (field: string) => void;
  escalateDeal: (dealId: string) => void;
  updateDealStage: (dealId: string, newStage: Deal['stage']) => void;
  highRiskApprovalsCount: number;
  tourActive: boolean;
  setTourActive: (active: boolean) => void;
  tourStep: number;
  setTourStep: (step: number) => void;
  presentationMode: boolean;
  setPresentationMode: (active: boolean) => void;
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  darkMode: boolean;
  setDarkMode: (active: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [syncStatus, setSyncStatus] = useState<string>('Synced with HubSpot • 2 min ago');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>(initialFieldMappings);
  
  // Presentation & Style States
  const [presentationMode, setPresentationMode] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Guided Tour State
  const [tourActive, setTourActiveState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('tourActive') === 'true';
    }
    return false;
  });
  const [tourStep, setTourStepState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('tourStep');
      return saved ? parseInt(saved, 10) : 1;
    }
    return 1;
  });

  const setTourActive = (active: boolean) => {
    setTourActiveState(active);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tourActive', active ? 'true' : 'false');
      if (!active) {
        sessionStorage.removeItem('tourStep');
      }
    }
  };

  const setTourStep = (step: number) => {
    setTourStepState(step);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tourStep', step.toString());
    }
  };

  // Calculate high-risk pending approvals (Pending Approval or Legal Review stages with risk === 'High')
  const highRiskApprovalsCount = deals.filter(
    (deal) =>
      (deal.stage === 'Pending Approval' || deal.stage === 'Legal Review') &&
      deal.risk === 'High' &&
      !deal.aiSuggestion?.includes('Escalated')
  ).length;

  const triggerSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncStatus('Syncing with HubSpot...');
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSyncing(false);
    setSyncStatus('Synced with HubSpot • Just now');
  };

  const toggleFieldMapping = (hubspotField: string) => {
    setFieldMappings((prev) =>
      prev.map((mapping) =>
        mapping.hubspotField === hubspotField
          ? { ...mapping, enabled: !mapping.enabled }
          : mapping
      )
    );
  };

  const escalateDeal = (dealId: string) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) => {
        if (deal.id === dealId) {
          // Update deal history and AI suggestion to reflect escalation
          const updatedHistory = [
            { event: 'Escalated to Lead Level', timeAgo: 'Just now' },
            ...deal.dealHistory
          ];
          return {
            ...deal,
            aiSuggestion: 'Escalated — pending review with Lead',
            dealHistory: updatedHistory
          };
        }
        return deal;
      })
    );
  };

  const updateDealStage = (dealId: string, newStage: Deal['stage']) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) => {
        if (deal.id === dealId) {
          const oldStage = deal.stage;
          if (oldStage === newStage) return deal;
          
          const updatedHistory = [
            { event: `Moved to ${newStage}`, timeAgo: 'Just now' },
            ...deal.dealHistory
          ];

          // If moving into approval stages, initialize risk and approvals if not present
          let risk = deal.risk;
          let riskExplanation = deal.riskExplanation;
          let daysPending = deal.daysPending;
          let aiSuggestion = deal.aiSuggestion;
          let approvalChain = deal.approvalChain;

          if (newStage === 'Pending Approval' || newStage === 'Legal Review') {
            if (!risk) {
              risk = 'Medium';
              riskExplanation = 'Medium Risk — deal stage changed manually. Custom verification pending.';
              daysPending = 1;
              aiSuggestion = 'Review details';
              approvalChain = [
                { role: 'Sales Rep', status: 'completed' },
                { role: 'Delivery Lead', status: 'pending' },
                { role: 'Legal', status: 'upcoming' },
                { role: 'Finance', status: 'upcoming' }
              ];
            }
          } else {
            // Remove risk properties if moved out of approval stages
            risk = undefined;
            riskExplanation = undefined;
            daysPending = undefined;
            aiSuggestion = undefined;
            approvalChain = undefined;
          }

          return {
            ...deal,
            stage: newStage,
            dealHistory: updatedHistory,
            risk,
            riskExplanation,
            daysPending,
            aiSuggestion,
            approvalChain
          };
        }
        return deal;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        deals,
        syncStatus,
        isSyncing,
        fieldMappings,
        triggerSync,
        toggleFieldMapping,
        escalateDeal,
        updateDealStage,
        highRiskApprovalsCount,
        tourActive,
        setTourActive,
        tourStep,
        setTourStep,
        presentationMode,
        setPresentationMode,
        currentSlide,
        setCurrentSlide,
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
