// Enhanced bidding data structures and mock data
export interface Contractor {
  id: string;
  name: string;
  rating: number;
  experience: string;
  completedProjects: number;
  onTimeDelivery: number;
  averageCost: number;
  specializations: string[];
  trustLevel: 'Trusted' | 'Verified' | 'New' | 'Flagged';
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  financials: {
    avgBidAmount: number;
    totalEarned: number;
    bondAmount: number;
  };
  performance: {
    qualityScore: number;
    timelyCompletion: number;
    budgetAdherence: number;
    customerSatisfaction: number;
  };
}

export interface EnhancedBid {
  id: string;
  reportId: string;
  contractorId: string;
  contractor: Contractor;
  amount: number;
  estimatedDuration: number; // in days
  timeline: string;
  submittedAt: string;
  lastUpdatedAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'under_review';
  proposal: string;
  warranty: string;
  materials: string[];
  methodology: string;
  riskFactors: string[];
  bondAmount: number;
  paymentTerms: string;
  compliance: {
    licenses: boolean;
    insurance: boolean;
    taxClearance: boolean;
    previousWork: boolean;
  };
}

export interface EnhancedReport {
  id: string;
  title: string;
  description: string;
  location: string;
  zone: string;
  department: string;
  estimatedBudget: number;
  actualBudget?: number;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  deadline: string;
  createdAt: string;
  biddingStatus: 'open' | 'under_review' | 'awarded' | 'closed';
  bids: EnhancedBid[];
  awardedBidId?: string;
  awardedAt?: string;
  awardedBy?: string;
  completionStatus?: 'not_started' | 'in_progress' | 'completed' | 'delayed';
  lastBidAt?: string;
  category: string;
  priorityScore: number;
}

// Mock contractors data
export const mockContractors: Contractor[] = [
  {
    id: 'CONT-001',
    name: 'Jharkhand Construction Ltd',
    rating: 4.5,
    experience: '15 years',
    completedProjects: 145,
    onTimeDelivery: 89,
    averageCost: 185000,
    specializations: ['Road Construction', 'Infrastructure', 'Repair Work'],
    trustLevel: 'Trusted',
    contact: {
      phone: '+91-98765-43210',
      email: 'contracts@jharkhandconstruction.com',
      address: 'Industrial Area, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 195000,
      totalEarned: 28500000,
      bondAmount: 500000
    },
    performance: {
      qualityScore: 4.3,
      timelyCompletion: 89,
      budgetAdherence: 92,
      customerSatisfaction: 4.5
    }
  },
  {
    id: 'CONT-002',
    name: 'Steel City Infrastructure',
    rating: 4.2,
    experience: '12 years',
    completedProjects: 98,
    onTimeDelivery: 85,
    averageCost: 205000,
    specializations: ['Steel Work', 'Infrastructure', 'Industrial Projects'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43211',
      email: 'bids@steelcityinfra.com',
      address: 'Steel Plant Road, Jamshedpur, Jharkhand'
    },
    financials: {
      avgBidAmount: 215000,
      totalEarned: 21100000,
      bondAmount: 400000
    },
    performance: {
      qualityScore: 4.1,
      timelyCompletion: 85,
      budgetAdherence: 88,
      customerSatisfaction: 4.2
    }
  },
  {
    id: 'CONT-003',
    name: 'Ranchi Municipal Works',
    rating: 3.8,
    experience: '8 years',
    completedProjects: 67,
    onTimeDelivery: 78,
    averageCost: 165000,
    specializations: ['Municipal Works', 'Maintenance', 'Emergency Repairs'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43212',
      email: 'projects@ranchimunicipal.com',
      address: 'Municipal Office Complex, Ranchi'
    },
    financials: {
      avgBidAmount: 175000,
      totalEarned: 11750000,
      bondAmount: 250000
    },
    performance: {
      qualityScore: 3.9,
      timelyCompletion: 78,
      budgetAdherence: 82,
      customerSatisfaction: 3.8
    }
  },
  {
    id: 'CONT-004',
    name: 'Tata Power Solutions',
    rating: 4.7,
    experience: '20 years',
    completedProjects: 234,
    onTimeDelivery: 94,
    averageCost: 345000,
    specializations: ['Electrical Work', 'Smart Infrastructure', 'LED Systems'],
    trustLevel: 'Trusted',
    contact: {
      phone: '+91-98765-43213',
      email: 'contracts@tatapower.com',
      address: 'Tata Steel Complex, Jamshedpur'
    },
    financials: {
      avgBidAmount: 355000,
      totalEarned: 83070000,
      bondAmount: 1000000
    },
    performance: {
      qualityScore: 4.6,
      timelyCompletion: 94,
      budgetAdherence: 91,
      customerSatisfaction: 4.7
    }
  },
  {
    id: 'CONT-005',
    name: 'Quick Fix Emergency Services',
    rating: 3.5,
    experience: '5 years',
    completedProjects: 34,
    onTimeDelivery: 72,
    averageCost: 145000,
    specializations: ['Emergency Repairs', 'Quick Fixes', 'Maintenance'],
    trustLevel: 'New',
    contact: {
      phone: '+91-98765-43214',
      email: 'emergency@quickfix.com',
      address: 'Service Center, Industrial Area'
    },
    financials: {
      avgBidAmount: 155000,
      totalEarned: 5270000,
      bondAmount: 150000
    },
    performance: {
      qualityScore: 3.4,
      timelyCompletion: 72,
      budgetAdherence: 85,
      customerSatisfaction: 3.5
    }
  }
];

// Enhanced mock reports with bidding data
export const mockEnhancedReports: EnhancedReport[] = [
  {
    id: 'RPT-001',
    title: 'Pothole Repair on Station Road',
    description: 'Large pothole on Station Road causing traffic issues and vehicle damage',
    location: 'Station Road & Albert Ekka Chowk',
    zone: 'Central Ranchi',
    department: 'Roads & Infrastructure',
    estimatedBudget: 200000,
    urgency: 'High',
    deadline: '2025-01-25',
    createdAt: '2025-01-15T10:00:00Z',
    biddingStatus: 'open',
    lastBidAt: '2025-01-20T14:30:00Z',
    category: 'Road Maintenance',
    priorityScore: 85,
    bids: [
      {
        id: 'BID-001',
        reportId: 'RPT-001',
        contractorId: 'CONT-001',
        contractor: mockContractors[0],
        amount: 175000,
        estimatedDuration: 3,
        timeline: '3 days',
        submittedAt: '2025-01-18T09:30:00Z',
        lastUpdatedAt: '2025-01-18T09:30:00Z',
        status: 'pending',
        proposal: 'We will use high-grade asphalt and complete the work during off-peak hours to minimize traffic disruption.',
        warranty: '2 years',
        materials: ['High-grade Asphalt', 'Road Marking Paint', 'Traffic Cones'],
        methodology: 'Cold patch method with proper compaction and curing',
        riskFactors: ['Weather conditions', 'Traffic management'],
        bondAmount: 17500,
        paymentTerms: '30-7-7 (30% advance, 70% on completion)',
        compliance: {
          licenses: true,
          insurance: true,
          taxClearance: true,
          previousWork: true
        }
      },
      {
        id: 'BID-002',
        reportId: 'RPT-001',
        contractorId: 'CONT-002',
        contractor: mockContractors[1],
        amount: 220000,
        estimatedDuration: 2,
        timeline: '2 days',
        submittedAt: '2025-01-19T11:15:00Z',
        lastUpdatedAt: '2025-01-19T11:15:00Z',
        status: 'pending',
        proposal: 'Quick completion with premium materials and comprehensive traffic management.',
        warranty: '3 years',
        materials: ['Premium Asphalt Mix', 'Polymer Modified Bitumen', 'Reflective Markers'],
        methodology: 'Hot mix asphalt with steel reinforcement',
        riskFactors: ['Material availability', 'Weather window'],
        bondAmount: 22000,
        paymentTerms: '25-75 (25% advance, 75% on completion)',
        compliance: {
          licenses: true,
          insurance: true,
          taxClearance: true,
          previousWork: true
        }
      }
    ]
  },
  {
    id: 'RPT-002',
    title: 'LED Streetlight Installation',
    description: 'Install energy-efficient LED streetlights on Bistupur Main Road',
    location: 'Bistupur Main Road (Sector 1-3)',
    zone: 'Jamshedpur Industrial',
    department: 'Electrical & Lighting',
    estimatedBudget: 360000,
    urgency: 'Medium',
    deadline: '2025-02-05',
    createdAt: '2025-01-12T08:00:00Z',
    biddingStatus: 'under_review',
    lastBidAt: '2025-01-20T16:45:00Z',
    category: 'Electrical Infrastructure',
    priorityScore: 72,
    bids: [
      {
        id: 'BID-003',
        reportId: 'RPT-002',
        contractorId: 'CONT-004',
        contractor: mockContractors[3],
        amount: 335000,
        estimatedDuration: 5,
        timeline: '5 days',
        submittedAt: '2025-01-19T14:20:00Z',
        lastUpdatedAt: '2025-01-20T16:45:00Z',
        status: 'under_review',
        proposal: 'Energy-efficient LED installation with smart controls and IoT monitoring.',
        warranty: '5 years',
        materials: ['LED Fixtures (50W)', 'Smart Controllers', 'IoT Sensors', 'Galvanized Poles'],
        methodology: 'Smart grid integration with automated fault detection',
        riskFactors: ['Power grid integration', 'Equipment procurement'],
        bondAmount: 33500,
        paymentTerms: '20-30-50 (20% advance, 30% on delivery, 50% on completion)',
        compliance: {
          licenses: true,
          insurance: true,
          taxClearance: true,
          previousWork: true
        }
      }
    ]
  },
  {
    id: 'RPT-003',
    title: 'Emergency Water Main Repair',
    description: 'Critical water main burst requiring immediate attention',
    location: 'Industrial Park Road, Sector 5',
    zone: 'Industrial East',
    department: 'Water Supply & Sanitation',
    estimatedBudget: 85000,
    urgency: 'Critical',
    deadline: '2025-01-22',
    createdAt: '2025-01-20T06:00:00Z',
    biddingStatus: 'open',
    category: 'Emergency Repair',
    priorityScore: 95,
    bids: []
  },
  {
    id: 'RPT-004',
    title: 'Park Renovation Project',
    description: 'Complete renovation of community park including playground equipment',
    location: 'Gandhi Park, Central Square',
    zone: 'Central Ranchi',
    department: 'Parks & Recreation',
    estimatedBudget: 450000,
    actualBudget: 425000,
    urgency: 'Low',
    deadline: '2025-03-15',
    createdAt: '2025-01-10T12:00:00Z',
    biddingStatus: 'awarded',
    awardedBidId: 'BID-010',
    awardedAt: '2025-01-21T10:00:00Z',
    awardedBy: 'Municipal Engineer - Rajesh Kumar',
    completionStatus: 'in_progress',
    lastBidAt: '2025-01-18T17:30:00Z',
    category: 'Civil Works',
    priorityScore: 45,
    bids: []
  }
];

// Budget and financial data
export const budgetData = {
  totalAllocated: 15000000, // 1.5 Crores
  totalCommitted: 8450000,  // 84.5 Lakhs
  totalSpent: 3200000,      // 32 Lakhs
  available: 6550000,       // 65.5 Lakhs
  pendingAwards: 1250000,   // 12.5 Lakhs
  emergencyReserve: 2000000 // 20 Lakhs (emergency fund)
};

// Statistical calculations
export const calculateBiddingStats = (reports: EnhancedReport[]) => {
  const totalReports = reports.length;
  const totalBids = reports.reduce((sum, report) => sum + report.bids.length, 0);
  const reportsWithNoBids = reports.filter(r => r.bids.length === 0).length;
  const totalBudget = reports.reduce((sum, report) => sum + report.estimatedBudget, 0);
  const avgBidsPerReport = totalBids > 0 ? Math.round((totalBids / totalReports) * 10) / 10 : 0;
  
  const awardedContracts = reports.filter(r => r.biddingStatus === 'awarded').length;
  const pendingAwards = reports.filter(r => r.biddingStatus === 'under_review').length;
  
  const totalSpentSoFar = reports
    .filter(r => r.biddingStatus === 'awarded' && r.actualBudget)
    .reduce((sum, report) => sum + (report.actualBudget || 0), 0);

  return {
    totalReports,
    totalBids,
    reportsWithNoBids,
    totalBudget,
    avgBidsPerReport,
    awardedContracts,
    pendingAwards,
    totalSpentSoFar,
    budgetUtilization: Math.round((totalSpentSoFar / budgetData.totalAllocated) * 100)
  };
};