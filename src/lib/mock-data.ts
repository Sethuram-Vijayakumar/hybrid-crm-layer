export interface Owner {
  name: string;
  initials: string;
  avatarBg: string; // Tailwind color class
}

export interface HistoryEvent {
  event: string;
  timeAgo: string;
}

export interface ApprovalStep {
  role: 'Sales Rep' | 'Delivery Lead' | 'Legal' | 'Finance';
  status: 'completed' | 'pending' | 'upcoming';
}

export interface Deal {
  id: string;
  companyName: string;
  dealValue: string; // E.g., "₹8.5L"
  rawValue: number;  // Numeric for value-based logic
  owner: Owner;
  stage: 'Qualification' | 'Proposal Sent' | 'Pending Approval' | 'Legal Review' | 'Closed Won';
  risk?: 'High' | 'Medium' | 'Low';
  riskExplanation?: string;
  dealHistory: HistoryEvent[];
  approvalChain?: ApprovalStep[];
  daysPending?: number;
  aiSuggestion?: string;
}

export const mockOwners: Owner[] = [
  { name: 'Aditya Sen', initials: 'AS', avatarBg: 'bg-indigo-500 text-white' },
  { name: 'Sarah Jenkins', initials: 'SJ', avatarBg: 'bg-emerald-500 text-white' },
  { name: 'David Miller', initials: 'DM', avatarBg: 'bg-amber-500 text-white' },
  { name: 'Priya Sharma', initials: 'PS', avatarBg: 'bg-rose-500 text-white' },
  { name: 'Marcus Vance', initials: 'MV', avatarBg: 'bg-sky-500 text-white' },
];

export const initialDeals: Deal[] = [
  {
    id: 'deal-1',
    companyName: 'Bluepeak Logistics',
    dealValue: '₹8.5L',
    rawValue: 850000,
    owner: mockOwners[0],
    stage: 'Pending Approval',
    risk: 'High',
    riskExplanation: 'High Risk — this deal has been in Pending Approval for 6 days, 3 days longer than average for deals of this size.',
    daysPending: 6,
    aiSuggestion: 'Escalate — pending 2.5x longer than average',
    dealHistory: [
      { event: 'Moved to Pending Approval', timeAgo: '6 days ago' },
      { event: 'Proposal Sent to client', timeAgo: '12 days ago' },
      { event: 'Qualification completed', timeAgo: '20 days ago' },
      { event: 'Deal created', timeAgo: '21 days ago' }
    ],
    approvalChain: [
      { role: 'Sales Rep', status: 'completed' },
      { role: 'Delivery Lead', status: 'completed' },
      { role: 'Legal', status: 'pending' },
      { role: 'Finance', status: 'upcoming' }
    ]
  },
  {
    id: 'deal-2',
    companyName: 'Meridian Retail Group',
    dealValue: '₹12.0L',
    rawValue: 1200000,
    owner: mockOwners[1],
    stage: 'Legal Review',
    risk: 'High',
    riskExplanation: 'High Risk — pending Legal Review for 8 days. Standard legal review duration for ₹10L+ contracts is 3.5 days.',
    daysPending: 8,
    aiSuggestion: 'Escalate — pending 2.3x longer than average',
    dealHistory: [
      { event: 'Moved to Legal Review', timeAgo: '8 days ago' },
      { event: 'Delivery Lead Approved', timeAgo: '10 days ago' },
      { event: 'Moved to Pending Approval', timeAgo: '14 days ago' },
      { event: 'Deal created', timeAgo: '30 days ago' }
    ],
    approvalChain: [
      { role: 'Sales Rep', status: 'completed' },
      { role: 'Delivery Lead', status: 'completed' },
      { role: 'Legal', status: 'pending' },
      { role: 'Finance', status: 'upcoming' }
    ]
  },
  {
    id: 'deal-3',
    companyName: 'Northfield Manufacturing',
    dealValue: '₹5.2L',
    rawValue: 520000,
    owner: mockOwners[2],
    stage: 'Proposal Sent',
    dealHistory: [
      { event: 'Moved to Proposal Sent', timeAgo: '3 days ago' },
      { event: 'Requirements verified', timeAgo: '7 days ago' },
      { event: 'Deal created', timeAgo: '10 days ago' }
    ]
  },
  {
    id: 'deal-4',
    companyName: 'Zenith Energy Solutions',
    dealValue: '₹9.8L',
    rawValue: 980000,
    owner: mockOwners[3],
    stage: 'Pending Approval',
    risk: 'Medium',
    riskExplanation: 'Medium Risk — Financial model has minor revisions. Delivery Lead check pending resource allocation review.',
    daysPending: 4,
    aiSuggestion: 'Review delivery allocation logs',
    dealHistory: [
      { event: 'Moved to Pending Approval', timeAgo: '4 days ago' },
      { event: 'Sales Rep self-signed off', timeAgo: '4 days ago' },
      { event: 'Proposal Submitted', timeAgo: '9 days ago' }
    ],
    approvalChain: [
      { role: 'Sales Rep', status: 'completed' },
      { role: 'Delivery Lead', status: 'pending' },
      { role: 'Legal', status: 'upcoming' },
      { role: 'Finance', status: 'upcoming' }
    ]
  },
  {
    id: 'deal-5',
    companyName: 'Apex Global Logistics',
    dealValue: '₹6.0L',
    rawValue: 600000,
    owner: mockOwners[4],
    stage: 'Legal Review',
    risk: 'Medium',
    riskExplanation: 'Medium Risk — Liability indemnity clauses redlined. Standard back-and-forth ongoing.',
    daysPending: 3,
    aiSuggestion: 'Review redlines with Sales Rep',
    dealHistory: [
      { event: 'Moved to Legal Review', timeAgo: '3 days ago' },
      { event: 'Delivery Lead Approved', timeAgo: '5 days ago' },
      { event: 'Proposal Accepted', timeAgo: '8 days ago' }
    ],
    approvalChain: [
      { role: 'Sales Rep', status: 'completed' },
      { role: 'Delivery Lead', status: 'completed' },
      { role: 'Legal', status: 'pending' },
      { role: 'Finance', status: 'upcoming' }
    ]
  },
  {
    id: 'deal-6',
    companyName: 'Solarwinds Enterprises',
    dealValue: '₹14.5L',
    rawValue: 1450000,
    owner: mockOwners[0],
    stage: 'Qualification',
    dealHistory: [
      { event: 'Lead qualified', timeAgo: '1 day ago' },
      { event: 'Inbound enquiry received', timeAgo: '3 days ago' }
    ]
  },
  {
    id: 'deal-7',
    companyName: 'Vertex Biotech',
    dealValue: '₹18.0L',
    rawValue: 1800000,
    owner: mockOwners[1],
    stage: 'Closed Won',
    dealHistory: [
      { event: 'Deal Closed Won', timeAgo: '2 days ago' },
      { event: 'Finance Approved', timeAgo: '5 days ago' },
      { event: 'Legal Approved', timeAgo: '9 days ago' }
    ]
  },
  {
    id: 'deal-8',
    companyName: 'Horizon Fleet Care',
    dealValue: '₹4.5L',
    rawValue: 450000,
    owner: mockOwners[2],
    stage: 'Proposal Sent',
    dealHistory: [
      { event: 'Moved to Proposal Sent', timeAgo: '5 days ago' },
      { event: 'Initial RFQ received', timeAgo: '12 days ago' }
    ]
  },
  {
    id: 'deal-9',
    companyName: 'Quantum Digital Systems',
    dealValue: '₹7.2L',
    rawValue: 720000,
    owner: mockOwners[3],
    stage: 'Pending Approval',
    risk: 'Low',
    riskExplanation: 'Low Risk — Standard template contract used. Awaiting routine Finance Lead validation.',
    daysPending: 1,
    aiSuggestion: 'On track',
    dealHistory: [
      { event: 'Moved to Pending Approval', timeAgo: '1 day ago' },
      { event: 'Proposal accepted', timeAgo: '3 days ago' }
    ],
    approvalChain: [
      { role: 'Sales Rep', status: 'completed' },
      { role: 'Delivery Lead', status: 'completed' },
      { role: 'Legal', status: 'completed' },
      { role: 'Finance', status: 'pending' }
    ]
  },
  {
    id: 'deal-10',
    companyName: 'Vanguard Heavy Industries',
    dealValue: '₹22.0L',
    rawValue: 2200000,
    owner: mockOwners[4],
    stage: 'Legal Review',
    risk: 'Low',
    riskExplanation: 'Low Risk — High value but using pre-approved MSA. Quick turnaround expected.',
    daysPending: 2,
    aiSuggestion: 'On track',
    dealHistory: [
      { event: 'Moved to Legal Review', timeAgo: '2 days ago' },
      { event: 'Delivery Lead Approved', timeAgo: '3 days ago' }
    ],
    approvalChain: [
      { role: 'Sales Rep', status: 'completed' },
      { role: 'Delivery Lead', status: 'completed' },
      { role: 'Legal', status: 'pending' },
      { role: 'Finance', status: 'upcoming' }
    ]
  },
  {
    id: 'deal-11',
    companyName: 'Titan Real Estate',
    dealValue: '₹11.2L',
    rawValue: 1120000,
    owner: mockOwners[0],
    stage: 'Closed Won',
    dealHistory: [
      { event: 'Deal Closed Won', timeAgo: '6 days ago' },
      { event: 'All signatures gathered', timeAgo: '7 days ago' }
    ]
  },
  {
    id: 'deal-12',
    companyName: 'Cobalt Security Partners',
    dealValue: '₹3.8L',
    rawValue: 380000,
    owner: mockOwners[1],
    stage: 'Qualification',
    dealHistory: [
      { event: 'Requirements gathered', timeAgo: '2 days ago' }
    ]
  },
  {
    id: 'deal-13',
    companyName: 'Crimson Analytics',
    dealValue: '₹6.5L',
    rawValue: 650000,
    owner: mockOwners[2],
    stage: 'Proposal Sent',
    dealHistory: [
      { event: 'Proposal Sent to client', timeAgo: '1 day ago' }
    ]
  },
  {
    id: 'deal-14',
    companyName: 'Sierra Mining & Metals',
    dealValue: '₹28.5L',
    rawValue: 2850000,
    owner: mockOwners[3],
    stage: 'Pending Approval',
    risk: 'High',
    riskExplanation: 'High Risk — resource bottlenecks flagged. Delivery Lead holds approval due to capacity constraints.',
    daysPending: 7,
    aiSuggestion: 'Escalate — capacity constraints on Delivery',
    dealHistory: [
      { event: 'Moved to Pending Approval', timeAgo: '7 days ago' },
      { event: 'Proposal signed by client', timeAgo: '10 days ago' }
    ],
    approvalChain: [
      { role: 'Sales Rep', status: 'completed' },
      { role: 'Delivery Lead', status: 'pending' },
      { role: 'Legal', status: 'upcoming' },
      { role: 'Finance', status: 'upcoming' }
    ]
  },
  {
    id: 'deal-15',
    companyName: 'OmniCorp Retail',
    dealValue: '₹16.0L',
    rawValue: 1600000,
    owner: mockOwners[4],
    stage: 'Legal Review',
    risk: 'Medium',
    riskExplanation: 'Medium Risk — SLA response times under negotiation. Standard legal feedback in queue.',
    daysPending: 4,
    aiSuggestion: 'On track',
    dealHistory: [
      { event: 'Moved to Legal Review', timeAgo: '4 days ago' },
      { event: 'Delivery Lead Approved', timeAgo: '6 days ago' }
    ],
    approvalChain: [
      { role: 'Sales Rep', status: 'completed' },
      { role: 'Delivery Lead', status: 'completed' },
      { role: 'Legal', status: 'pending' },
      { role: 'Finance', status: 'upcoming' }
    ]
  }
];

export interface FieldMapping {
  hubspotField: string;
  syncedTo: string;
  enabled: boolean;
}

export const initialFieldMappings: FieldMapping[] = [
  { hubspotField: 'Deal Name', syncedTo: 'Pipeline Card Title', enabled: true },
  { hubspotField: 'Deal Amount', syncedTo: 'Pipeline Card Value', enabled: true },
  { hubspotField: 'Deal Stage', syncedTo: 'Column Position', enabled: true },
  { hubspotField: 'Deal Owner', syncedTo: 'Card Avatar', enabled: true },
  { hubspotField: 'Company Name', syncedTo: 'Card Header', enabled: true }
];
