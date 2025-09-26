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

// Mock contractors data - Expanded to 25 contractors
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
      address: 'Municipal Office Complex, Ranchi, Jharkhand'
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
      address: 'Tata Steel Complex, Jamshedpur, Jharkhand'
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
      address: 'Service Center, Industrial Area, Ranchi, Jharkhand'
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
  },
  {
    id: 'CONT-006',
    name: 'Green Valley Contractors',
    rating: 4.4,
    experience: '10 years',
    completedProjects: 89,
    onTimeDelivery: 91,
    averageCost: 225000,
    specializations: ['Environmental Projects', 'Landscaping', 'Green Infrastructure'],
    trustLevel: 'Trusted',
    contact: {
      phone: '+91-98765-43215',
      email: 'projects@greenvalley.com',
      address: 'Green Valley Complex, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 235000,
      totalEarned: 20915000,
      bondAmount: 350000
    },
    performance: {
      qualityScore: 4.4,
      timelyCompletion: 91,
      budgetAdherence: 89,
      customerSatisfaction: 4.4
    }
  },
  {
    id: 'CONT-007',
    name: 'Metro Engineering Solutions',
    rating: 4.1,
    experience: '14 years',
    completedProjects: 112,
    onTimeDelivery: 87,
    averageCost: 275000,
    specializations: ['Civil Engineering', 'Bridge Construction', 'Highway Projects'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43216',
      email: 'engineering@metroeng.com',
      address: 'Engineering Hub, Jamshedpur, Jharkhand'
    },
    financials: {
      avgBidAmount: 285000,
      totalEarned: 31920000,
      bondAmount: 600000
    },
    performance: {
      qualityScore: 4.0,
      timelyCompletion: 87,
      budgetAdherence: 86,
      customerSatisfaction: 4.1
    }
  },
  {
    id: 'CONT-008',
    name: 'Urban Development Corp',
    rating: 4.6,
    experience: '18 years',
    completedProjects: 178,
    onTimeDelivery: 92,
    averageCost: 320000,
    specializations: ['Urban Planning', 'Commercial Projects', 'Residential Development'],
    trustLevel: 'Trusted',
    contact: {
      phone: '+91-98765-43217',
      email: 'development@urbandev.com',
      address: 'Business District, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 330000,
      totalEarned: 58740000,
      bondAmount: 750000
    },
    performance: {
      qualityScore: 4.5,
      timelyCompletion: 92,
      budgetAdherence: 90,
      customerSatisfaction: 4.6
    }
  },
  {
    id: 'CONT-009',
    name: 'Precision Builders',
    rating: 3.9,
    experience: '7 years',
    completedProjects: 56,
    onTimeDelivery: 83,
    averageCost: 195000,
    specializations: ['Precision Work', 'Renovation', 'Interior Finishing'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43218',
      email: 'build@precisionbuilders.com',
      address: 'Construction Plaza, Jamshedpur, Jharkhand'
    },
    financials: {
      avgBidAmount: 205000,
      totalEarned: 11480000,
      bondAmount: 300000
    },
    performance: {
      qualityScore: 3.8,
      timelyCompletion: 83,
      budgetAdherence: 87,
      customerSatisfaction: 3.9
    }
  },
  {
    id: 'CONT-010',
    name: 'Elite Construction Group',
    rating: 4.8,
    experience: '22 years',
    completedProjects: 267,
    onTimeDelivery: 96,
    averageCost: 450000,
    specializations: ['High-End Construction', 'Luxury Projects', 'Commercial Buildings'],
    trustLevel: 'Trusted',
    contact: {
      phone: '+91-98765-43219',
      email: 'elite@eliteconstruction.com',
      address: 'Elite Tower, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 465000,
      totalEarned: 124155000,
      bondAmount: 1200000
    },
    performance: {
      qualityScore: 4.7,
      timelyCompletion: 96,
      budgetAdherence: 94,
      customerSatisfaction: 4.8
    }
  },
  {
    id: 'CONT-011',
    name: 'Budget Builders Ltd',
    rating: 3.6,
    experience: '6 years',
    completedProjects: 42,
    onTimeDelivery: 76,
    averageCost: 135000,
    specializations: ['Budget Construction', 'Affordable Housing', 'Basic Infrastructure'],
    trustLevel: 'New',
    contact: {
      phone: '+91-98765-43220',
      email: 'budget@budgetbuilders.com',
      address: 'Affordable Housing Complex, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 145000,
      totalEarned: 6090000,
      bondAmount: 100000
    },
    performance: {
      qualityScore: 3.5,
      timelyCompletion: 76,
      budgetAdherence: 88,
      customerSatisfaction: 3.6
    }
  },
  {
    id: 'CONT-012',
    name: 'TechBuild Innovations',
    rating: 4.3,
    experience: '9 years',
    completedProjects: 73,
    onTimeDelivery: 88,
    averageCost: 285000,
    specializations: ['Tech-Integrated Construction', 'Smart Buildings', 'IoT Solutions'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43221',
      email: 'tech@techbuild.com',
      address: 'Innovation Center, Jamshedpur, Jharkhand'
    },
    financials: {
      avgBidAmount: 295000,
      totalEarned: 21535000,
      bondAmount: 450000
    },
    performance: {
      qualityScore: 4.2,
      timelyCompletion: 88,
      budgetAdherence: 91,
      customerSatisfaction: 4.3
    }
  },
  {
    id: 'CONT-013',
    name: 'Heritage Restoration Co',
    rating: 4.5,
    experience: '16 years',
    completedProjects: 95,
    onTimeDelivery: 90,
    averageCost: 395000,
    specializations: ['Heritage Restoration', 'Historical Buildings', 'Cultural Preservation'],
    trustLevel: 'Trusted',
    contact: {
      phone: '+91-98765-43222',
      email: 'heritage@heritagerestoration.com',
      address: 'Heritage District, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 405000,
      totalEarned: 38475000,
      bondAmount: 800000
    },
    performance: {
      qualityScore: 4.4,
      timelyCompletion: 90,
      budgetAdherence: 93,
      customerSatisfaction: 4.5
    }
  },
  {
    id: 'CONT-014',
    name: 'Rapid Response Team',
    rating: 3.7,
    experience: '4 years',
    completedProjects: 28,
    onTimeDelivery: 79,
    averageCost: 125000,
    specializations: ['Emergency Response', 'Disaster Recovery', 'Rapid Repairs'],
    trustLevel: 'New',
    contact: {
      phone: '+91-98765-43223',
      email: 'rapid@rapidresponse.com',
      address: 'Emergency Services Center, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 135000,
      totalEarned: 3780000,
      bondAmount: 80000
    },
    performance: {
      qualityScore: 3.6,
      timelyCompletion: 79,
      budgetAdherence: 84,
      customerSatisfaction: 3.7
    }
  },
  {
    id: 'CONT-015',
    name: 'Sustainable Build Corp',
    rating: 4.4,
    experience: '11 years',
    completedProjects: 84,
    onTimeDelivery: 89,
    averageCost: 265000,
    specializations: ['Sustainable Construction', 'Eco-Friendly Materials', 'Green Building'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43224',
      email: 'sustainable@sustainablebuild.com',
      address: 'Green Building Center, Jamshedpur, Jharkhand'
    },
    financials: {
      avgBidAmount: 275000,
      totalEarned: 23100000,
      bondAmount: 500000
    },
    performance: {
      qualityScore: 4.3,
      timelyCompletion: 89,
      budgetAdherence: 92,
      customerSatisfaction: 4.4
    }
  },
  {
    id: 'CONT-016',
    name: 'Mega Infrastructure Ltd',
    rating: 4.6,
    experience: '19 years',
    completedProjects: 203,
    onTimeDelivery: 93,
    averageCost: 425000,
    specializations: ['Large Scale Projects', 'Infrastructure Development', 'Government Contracts'],
    trustLevel: 'Trusted',
    contact: {
      phone: '+91-98765-43225',
      email: 'mega@mega-infra.com',
      address: 'Infrastructure Plaza, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 435000,
      totalEarned: 88305000,
      bondAmount: 1000000
    },
    performance: {
      qualityScore: 4.5,
      timelyCompletion: 93,
      budgetAdherence: 91,
      customerSatisfaction: 4.6
    }
  },
  {
    id: 'CONT-017',
    name: 'Local Artisan Builders',
    rating: 3.8,
    experience: '8 years',
    completedProjects: 61,
    onTimeDelivery: 81,
    averageCost: 175000,
    specializations: ['Local Construction', 'Community Projects', 'Small Scale Works'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43226',
      email: 'local@localartisans.com',
      address: 'Community Center, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 185000,
      totalEarned: 11285000,
      bondAmount: 200000
    },
    performance: {
      qualityScore: 3.7,
      timelyCompletion: 81,
      budgetAdherence: 85,
      customerSatisfaction: 3.8
    }
  },
  {
    id: 'CONT-018',
    name: 'Future Tech Construction',
    rating: 4.2,
    experience: '8 years',
    completedProjects: 67,
    onTimeDelivery: 86,
    averageCost: 310000,
    specializations: ['Technology Integration', 'Smart Cities', 'Digital Infrastructure'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43227',
      email: 'future@futuretech.com',
      address: 'Tech Park, Jamshedpur, Jharkhand'
    },
    financials: {
      avgBidAmount: 320000,
      totalEarned: 21440000,
      bondAmount: 550000
    },
    performance: {
      qualityScore: 4.1,
      timelyCompletion: 86,
      budgetAdherence: 89,
      customerSatisfaction: 4.2
    }
  },
  {
    id: 'CONT-019',
    name: 'Quality First Builders',
    rating: 4.0,
    experience: '13 years',
    completedProjects: 108,
    onTimeDelivery: 84,
    averageCost: 245000,
    specializations: ['Quality Assurance', 'Standard Compliance', 'Regulatory Projects'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43228',
      email: 'quality@qualityfirst.com',
      address: 'Quality Assurance Center, Ranchi, Jharkhand'
    },
    financials: {
      avgBidAmount: 255000,
      totalEarned: 27540000,
      bondAmount: 400000
    },
    performance: {
      qualityScore: 4.0,
      timelyCompletion: 84,
      budgetAdherence: 87,
      customerSatisfaction: 4.0
    }
  },
  {
    id: 'CONT-020',
    name: 'Express Construction Services',
    rating: 3.4,
    experience: '3 years',
    completedProjects: 19,
    onTimeDelivery: 68,
    averageCost: 115000,
    specializations: ['Fast Track Construction', 'Time-Sensitive Projects', 'Rush Orders'],
    trustLevel: 'New',
    contact: {
      phone: '+91-98765-43229',
      email: 'express@expressconstruct.com',
      address: 'Express Services Hub, Jamshedpur, Jharkhand'
    },
    financials: {
      avgBidAmount: 125000,
      totalEarned: 2375000,
      bondAmount: 60000
    },
    performance: {
      qualityScore: 3.3,
      timelyCompletion: 68,
      budgetAdherence: 82,
      customerSatisfaction: 3.4
    }
  },
  {
    id: 'CONT-021',
    name: 'Global Standards Inc',
    rating: 4.7,
    experience: '21 years',
    completedProjects: 245,
    onTimeDelivery: 95,
    averageCost: 485000,
    specializations: ['International Standards', 'Quality Certification', 'Global Projects'],
    trustLevel: 'Trusted',
    contact: {
      phone: '+91-98765-43230',
      email: 'global@globalstandards.com',
      address: 'International Business Center, Ranchi'
    },
    financials: {
      avgBidAmount: 495000,
      totalEarned: 121275000,
      bondAmount: 1500000
    },
    performance: {
      qualityScore: 4.6,
      timelyCompletion: 95,
      budgetAdherence: 93,
      customerSatisfaction: 4.7
    }
  },
  {
    id: 'CONT-022',
    name: 'EcoBuild Solutions',
    rating: 4.3,
    experience: '10 years',
    completedProjects: 76,
    onTimeDelivery: 87,
    averageCost: 295000,
    specializations: ['Eco-Friendly Construction', 'Sustainable Materials', 'Carbon Neutral'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43231',
      email: 'eco@ecobuild.com',
      address: 'Eco Center, Jamshedpur'
    },
    financials: {
      avgBidAmount: 305000,
      totalEarned: 23180000,
      bondAmount: 480000
    },
    performance: {
      qualityScore: 4.2,
      timelyCompletion: 87,
      budgetAdherence: 90,
      customerSatisfaction: 4.3
    }
  },
  {
    id: 'CONT-023',
    name: 'Reliable Partners Ltd',
    rating: 4.1,
    experience: '12 years',
    completedProjects: 94,
    onTimeDelivery: 85,
    averageCost: 235000,
    specializations: ['Partnership Projects', 'Joint Ventures', 'Collaborative Construction'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43232',
      email: 'partners@reliablepartners.com',
      address: 'Partnership Plaza, Ranchi'
    },
    financials: {
      avgBidAmount: 245000,
      totalEarned: 23030000,
      bondAmount: 380000
    },
    performance: {
      qualityScore: 4.0,
      timelyCompletion: 85,
      budgetAdherence: 88,
      customerSatisfaction: 4.1
    }
  },
  {
    id: 'CONT-024',
    name: 'Innovation Builders',
    rating: 4.4,
    experience: '9 years',
    completedProjects: 71,
    onTimeDelivery: 89,
    averageCost: 335000,
    specializations: ['Innovative Solutions', 'R&D Projects', 'Experimental Construction'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43233',
      email: 'innovation@innovationbuilders.com',
      address: 'Innovation Hub, Jamshedpur'
    },
    financials: {
      avgBidAmount: 345000,
      totalEarned: 24495000,
      bondAmount: 650000
    },
    performance: {
      qualityScore: 4.3,
      timelyCompletion: 89,
      budgetAdherence: 91,
      customerSatisfaction: 4.4
    }
  },
  {
    id: 'CONT-025',
    name: 'Community Builders Network',
    rating: 3.9,
    experience: '7 years',
    completedProjects: 53,
    onTimeDelivery: 82,
    averageCost: 185000,
    specializations: ['Community Development', 'Social Projects', 'NGO Partnerships'],
    trustLevel: 'Verified',
    contact: {
      phone: '+91-98765-43234',
      email: 'community@communitybuilders.com',
      address: 'Community Center, Ranchi'
    },
    financials: {
      avgBidAmount: 195000,
      totalEarned: 10335000,
      bondAmount: 250000
    },
    performance: {
      qualityScore: 3.8,
      timelyCompletion: 82,
      budgetAdherence: 86,
      customerSatisfaction: 3.9
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
    estimatedBudget: 85000,
    actualBudget: 92000,
    urgency: 'High',
    deadline: '2025-01-25',
    createdAt: '2025-01-15T10:00:00Z',
    biddingStatus: 'awarded',
    awardedBidId: 'BID-001',
    awardedAt: '2025-01-21T10:00:00Z',
    awardedBy: 'Municipal Engineer - Rajesh Kumar',
    completionStatus: 'in_progress',
    lastBidAt: '2025-01-20T14:30:00Z',
    category: 'Road Maintenance',
    priorityScore: 85,
    bids: [
      {
        id: 'BID-001',
        reportId: 'RPT-001',
        contractorId: 'CONT-001',
        contractor: mockContractors[0],
        amount: 78000,
        estimatedDuration: 3,
        timeline: '3 days',
        submittedAt: '2025-01-18T09:30:00Z',
        lastUpdatedAt: '2025-01-18T09:30:00Z',
        status: 'accepted',
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
  },
  {
    id: 'RPT-005',
    title: 'Traffic Signal Maintenance',
    description: 'Repair and maintenance of traffic signals at major intersections',
    location: 'Multiple Intersections - City Center',
    zone: 'Central Ranchi',
    department: 'Traffic & Transportation',
    estimatedBudget: 125000,
    actualBudget: 118000,
    urgency: 'Medium',
    deadline: '2025-02-10',
    createdAt: '2025-01-18T09:00:00Z',
    biddingStatus: 'awarded',
    awardedBidId: 'BID-011',
    awardedAt: '2025-01-23T11:00:00Z',
    awardedBy: 'Traffic Engineer - Priya Singh',
    completionStatus: 'completed',
    lastBidAt: '2025-01-22T13:20:00Z',
    category: 'Traffic Infrastructure',
    priorityScore: 68,
    bids: [
      {
        id: 'BID-011',
        reportId: 'RPT-005',
        contractorId: 'CONT-005',
        contractor: mockContractors[4],
        amount: 112000,
        estimatedDuration: 4,
        timeline: '4 days',
        submittedAt: '2025-01-20T10:45:00Z',
        lastUpdatedAt: '2025-01-20T10:45:00Z',
        status: 'accepted',
        proposal: 'Comprehensive traffic signal maintenance with LED upgrades.',
        warranty: '2 years',
        materials: ['LED Signal Heads', 'Controller Units', 'Cable Infrastructure'],
        methodology: 'Systematic replacement with minimal traffic disruption',
        riskFactors: ['Traffic coordination', 'Power outages'],
        bondAmount: 16500,
        paymentTerms: '30-70 (30% advance, 70% on completion)',
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
    id: 'RPT-006',
    title: 'Drainage System Cleaning',
    description: 'Clean and maintain stormwater drainage system in residential area',
    location: 'Sector 7 Residential Colony',
    zone: 'South Ranchi',
    department: 'Water Supply & Sanitation',
    estimatedBudget: 95000,
    urgency: 'Medium',
    deadline: '2025-02-15',
    createdAt: '2025-01-16T11:30:00Z',
    biddingStatus: 'open',
    category: 'Drainage Maintenance',
    priorityScore: 55,
    bids: []
  },
  {
    id: 'RPT-007',
    title: 'Public Toilet Renovation',
    description: 'Complete renovation of public toilet facility with modern amenities',
    location: 'Central Bus Stand',
    zone: 'Central Ranchi',
    department: 'Public Facilities',
    estimatedBudget: 320000,
    urgency: 'High',
    deadline: '2025-02-20',
    createdAt: '2025-01-14T14:00:00Z',
    biddingStatus: 'under_review',
    lastBidAt: '2025-01-23T15:10:00Z',
    category: 'Public Infrastructure',
    priorityScore: 78,
    bids: [
      {
        id: 'BID-012',
        reportId: 'RPT-007',
        contractorId: 'CONT-006',
        contractor: mockContractors[5],
        amount: 295000,
        estimatedDuration: 7,
        timeline: '7 days',
        submittedAt: '2025-01-21T08:30:00Z',
        lastUpdatedAt: '2025-01-21T08:30:00Z',
        status: 'under_review',
        proposal: 'Modern renovation with eco-friendly materials and accessibility features.',
        warranty: '3 years',
        materials: ['Ceramic Tiles', 'Stainless Steel Fittings', 'Eco-friendly Paints', 'Accessibility Ramps'],
        methodology: 'Complete gut renovation with modern plumbing and electrical systems',
        riskFactors: ['Public access during construction', 'Material delays'],
        bondAmount: 29500,
        paymentTerms: '25-25-50 (25% advance, 25% midway, 50% on completion)',
        compliance: {
          licenses: true,
          insurance: true,
          taxClearance: true,
          previousWork: true
        }
      },
      {
        id: 'BID-013',
        reportId: 'RPT-007',
        contractorId: 'CONT-007',
        contractor: mockContractors[6],
        amount: 310000,
        estimatedDuration: 6,
        timeline: '6 days',
        submittedAt: '2025-01-22T12:15:00Z',
        lastUpdatedAt: '2025-01-22T12:15:00Z',
        status: 'pending',
        proposal: 'Premium renovation with smart sanitation features.',
        warranty: '4 years',
        materials: ['Premium Tiles', 'Smart Faucets', 'Anti-bacterial Coatings'],
        methodology: 'Smart facility with automated cleaning systems',
        riskFactors: ['Technology integration', 'Public convenience'],
        bondAmount: 31000,
        paymentTerms: '20-80 (20% advance, 80% on completion)',
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
    id: 'RPT-008',
    title: 'School Building Repairs',
    description: 'Structural repairs and maintenance for Government School Building',
    location: 'Sector 4 Government School',
    zone: 'Doranda Education Zone',
    department: 'Education Infrastructure',
    estimatedBudget: 550000,
    urgency: 'High',
    deadline: '2025-02-28',
    createdAt: '2025-01-17T10:00:00Z',
    biddingStatus: 'open',
    lastBidAt: '2025-01-24T11:45:00Z',
    category: 'Educational Infrastructure',
    priorityScore: 82,
    bids: [
      {
        id: 'BID-014',
        reportId: 'RPT-008',
        contractorId: 'CONT-008',
        contractor: mockContractors[7],
        amount: 485000,
        estimatedDuration: 14,
        timeline: '14 days',
        submittedAt: '2025-01-23T09:20:00Z',
        lastUpdatedAt: '2025-01-23T09:20:00Z',
        status: 'pending',
        proposal: 'Comprehensive structural repairs with safety compliance.',
        warranty: '5 years',
        materials: ['Structural Steel', 'Concrete Mix', 'Safety Barriers', 'Fire-resistant Paints'],
        methodology: 'Phased construction to minimize disruption to classes',
        riskFactors: ['Student safety', 'Weather conditions', 'Material quality'],
        bondAmount: 48500,
        paymentTerms: '15-35-50 (15% advance, 35% midway, 50% on completion)',
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
    id: 'RPT-009',
    title: 'Community Center Construction',
    description: 'New community center construction with recreational facilities',
    location: 'Sector 9 Community Ground',
    zone: 'North Ranchi',
    department: 'Parks & Recreation',
    estimatedBudget: 1200000,
    urgency: 'Medium',
    deadline: '2025-04-15',
    createdAt: '2025-01-19T13:00:00Z',
    biddingStatus: 'open',
    category: 'Community Development',
    priorityScore: 65,
    bids: []
  },
  {
    id: 'RPT-010',
    title: 'Waste Management System',
    description: 'Installation of automated waste collection system in commercial area',
    location: 'Commercial District - MG Road',
    zone: 'Central Ranchi',
    department: 'Solid Waste Management',
    estimatedBudget: 750000,
    urgency: 'Medium',
    deadline: '2025-03-10',
    createdAt: '2025-01-20T15:30:00Z',
    biddingStatus: 'under_review',
    lastBidAt: '2025-01-25T14:00:00Z',
    category: 'Waste Management',
    priorityScore: 70,
    bids: [
      {
        id: 'BID-015',
        reportId: 'RPT-010',
        contractorId: 'CONT-009',
        contractor: mockContractors[8],
        amount: 695000,
        estimatedDuration: 10,
        timeline: '10 days',
        submittedAt: '2025-01-24T10:30:00Z',
        lastUpdatedAt: '2025-01-24T10:30:00Z',
        status: 'under_review',
        proposal: 'Smart waste management with IoT sensors and automated collection.',
        warranty: '3 years',
        materials: ['IoT Sensors', 'Automated Bins', 'Solar Panels', 'Control System'],
        methodology: 'Integrated smart waste management system',
        riskFactors: ['Technology integration', 'Power supply', 'Maintenance access'],
        bondAmount: 69500,
        paymentTerms: '20-40-40 (20% advance, 40% midway, 40% on completion)',
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
    id: 'RPT-011',
    title: 'Bridge Repair Project',
    description: 'Structural repairs to pedestrian bridge over railway tracks',
    location: 'Railway Crossing - Sector 3',
    zone: 'Industrial West',
    department: 'Bridges & Structures',
    estimatedBudget: 680000,
    urgency: 'High',
    deadline: '2025-02-25',
    createdAt: '2025-01-21T08:45:00Z',
    biddingStatus: 'awarded',
    awardedBidId: 'BID-016',
    awardedAt: '2025-01-26T11:00:00Z',
    awardedBy: 'Chief Engineer - Amit Sharma',
    completionStatus: 'not_started',
    lastBidAt: '2025-01-24T16:20:00Z',
    category: 'Structural Engineering',
    priorityScore: 88,
    bids: [
      {
        id: 'BID-016',
        reportId: 'RPT-011',
        contractorId: 'CONT-010',
        contractor: mockContractors[9],
        amount: 625000,
        estimatedDuration: 12,
        timeline: '12 days',
        submittedAt: '2025-01-23T14:45:00Z',
        lastUpdatedAt: '2025-01-26T11:00:00Z',
        status: 'accepted',
        proposal: 'Expert structural repairs with safety engineering.',
        warranty: '7 years',
        materials: ['Structural Steel', 'Concrete Reinforcement', 'Safety Barriers'],
        methodology: 'Engineered repairs with load testing and safety certifications',
        riskFactors: ['Railway coordination', 'Load-bearing requirements', 'Safety protocols'],
        bondAmount: 62500,
        paymentTerms: '10-30-60 (10% advance, 30% midway, 60% on completion)',
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
    id: 'RPT-012',
    title: 'Street Lighting Upgrade',
    description: 'Replace conventional streetlights with energy-efficient LED lights',
    location: 'Residential Streets - Sector 2 & 3',
    zone: 'South Ranchi',
    department: 'Electrical & Lighting',
    estimatedBudget: 420000,
    urgency: 'Low',
    deadline: '2025-03-20',
    createdAt: '2025-01-22T12:00:00Z',
    biddingStatus: 'open',
    category: 'Energy Efficiency',
    priorityScore: 52,
    bids: []
  },
  {
    id: 'RPT-013',
    title: 'Fire Station Expansion',
    description: 'Expand existing fire station with additional bays and equipment storage',
    location: 'Central Fire Station',
    zone: 'Central Ranchi',
    department: 'Fire & Emergency Services',
    estimatedBudget: 950000,
    urgency: 'Medium',
    deadline: '2025-04-05',
    createdAt: '2025-01-23T09:15:00Z',
    biddingStatus: 'open',
    lastBidAt: '2025-01-27T13:30:00Z',
    category: 'Emergency Infrastructure',
    priorityScore: 75,
    bids: [
      {
        id: 'BID-017',
        reportId: 'RPT-013',
        contractorId: 'CONT-011',
        contractor: mockContractors[10],
        amount: 875000,
        estimatedDuration: 20,
        timeline: '20 days',
        submittedAt: '2025-01-26T11:20:00Z',
        lastUpdatedAt: '2025-01-26T11:20:00Z',
        status: 'pending',
        proposal: 'Specialized construction for emergency services with safety standards.',
        warranty: '5 years',
        materials: ['Fire-resistant Materials', 'Heavy-duty Doors', 'Emergency Lighting'],
        methodology: 'Construction meeting fire safety and emergency access standards',
        riskFactors: ['Operational continuity', 'Safety compliance', 'Equipment integration'],
        bondAmount: 87500,
        paymentTerms: '15-25-60 (15% advance, 25% midway, 60% on completion)',
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
    id: 'RPT-014',
    title: 'Park Bench Installation',
    description: 'Install weather-resistant benches and picnic tables in city parks',
    location: 'Multiple City Parks',
    zone: 'Multiple Ranchi Zones',
    department: 'Parks & Recreation',
    estimatedBudget: 150000,
    urgency: 'Low',
    deadline: '2025-03-05',
    createdAt: '2025-01-24T14:30:00Z',
    biddingStatus: 'awarded',
    awardedBidId: 'BID-018',
    awardedAt: '2025-01-28T09:45:00Z',
    awardedBy: 'Parks Department Head - Priya Singh',
    completionStatus: 'completed',
    lastBidAt: '2025-01-26T15:45:00Z',
    category: 'Public Amenities',
    priorityScore: 35,
    bids: [
      {
        id: 'BID-018',
        reportId: 'RPT-014',
        contractorId: 'CONT-012',
        contractor: mockContractors[11],
        amount: 135000,
        estimatedDuration: 5,
        timeline: '5 days',
        submittedAt: '2025-01-25T10:15:00Z',
        lastUpdatedAt: '2025-01-28T09:45:00Z',
        status: 'accepted',
        proposal: 'Durable outdoor furniture installation with maintenance.',
        warranty: '2 years',
        materials: ['Weather-resistant Wood', 'Stainless Steel Hardware', 'Anti-slip Treatments'],
        methodology: 'Professional installation with landscaping integration',
        riskFactors: ['Weather conditions', 'Site accessibility'],
        bondAmount: 13500,
        paymentTerms: '50-50 (50% advance, 50% on completion)',
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
    id: 'RPT-015',
    title: 'Road Resurfacing Project',
    description: 'Complete resurfacing of main arterial road with traffic management',
    location: 'NH-33 Highway Section',
    zone: 'NH-33 Highway Zone',
    department: 'Roads & Infrastructure',
    estimatedBudget: 2500000,
    urgency: 'High',
    deadline: '2025-03-30',
    createdAt: '2025-01-25T11:00:00Z',
    biddingStatus: 'under_review',
    lastBidAt: '2025-01-29T12:00:00Z',
    category: 'Highway Maintenance',
    priorityScore: 90,
    bids: [
      {
        id: 'BID-019',
        reportId: 'RPT-015',
        contractorId: 'CONT-013',
        contractor: mockContractors[12],
        amount: 2250000,
        estimatedDuration: 21,
        timeline: '21 days',
        submittedAt: '2025-01-27T08:30:00Z',
        lastUpdatedAt: '2025-01-27T08:30:00Z',
        status: 'under_review',
        proposal: 'Highway resurfacing with advanced traffic management.',
        warranty: '5 years',
        materials: ['High-grade Asphalt', 'Traffic Signals', 'Safety Barriers'],
        methodology: 'Night-time construction with full traffic diversion',
        riskFactors: ['Traffic management', 'Weather conditions', 'Material quality'],
        bondAmount: 225000,
        paymentTerms: '10-20-70 (10% advance, 20% midway, 70% on completion)',
        compliance: {
          licenses: true,
          insurance: true,
          taxClearance: true,
          previousWork: true
        }
      },
      {
        id: 'BID-020',
        reportId: 'RPT-015',
        contractorId: 'CONT-014',
        contractor: mockContractors[13],
        amount: 2350000,
        estimatedDuration: 18,
        timeline: '18 days',
        submittedAt: '2025-01-28T14:20:00Z',
        lastUpdatedAt: '2025-01-28T14:20:00Z',
        status: 'pending',
        proposal: 'Accelerated completion with premium materials.',
        warranty: '6 years',
        materials: ['Premium Asphalt Mix', 'Polymer Additives', 'Reflective Markers'],
        methodology: 'Fast-track construction with quality assurance',
        riskFactors: ['Time constraints', 'Quality control', 'Traffic impact'],
        bondAmount: 235000,
        paymentTerms: '15-85 (15% advance, 85% on completion)',
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
    id: 'RPT-016',
    title: 'Water Tank Cleaning',
    description: 'Professional cleaning and disinfection of overhead water tanks',
    location: 'Multiple Residential Complexes',
    zone: 'Ranchi Residential Zones',
    department: 'Water Supply & Sanitation',
    estimatedBudget: 120000,
    urgency: 'Medium',
    deadline: '2025-02-18',
    createdAt: '2025-01-26T10:30:00Z',
    biddingStatus: 'open',
    category: 'Water Quality',
    priorityScore: 60,
    bids: []
  },
  {
    id: 'RPT-017',
    title: 'Bus Stop Shelter Construction',
    description: 'Construct modern bus stop shelters with seating and lighting',
    location: 'Major Bus Routes - City Center',
    zone: 'Central Ranchi',
    department: 'Public Transport',
    estimatedBudget: 280000,
    urgency: 'Medium',
    deadline: '2025-03-25',
    createdAt: '2025-01-27T13:45:00Z',
    biddingStatus: 'open',
    lastBidAt: '2025-01-30T11:15:00Z',
    category: 'Public Transport',
    priorityScore: 58,
    bids: [
      {
        id: 'BID-021',
        reportId: 'RPT-017',
        contractorId: 'CONT-015',
        contractor: mockContractors[14],
        amount: 255000,
        estimatedDuration: 8,
        timeline: '8 days',
        submittedAt: '2025-01-29T09:45:00Z',
        lastUpdatedAt: '2025-01-29T09:45:00Z',
        status: 'pending',
        proposal: 'Modern bus shelters with smart features and accessibility.',
        warranty: '3 years',
        materials: ['Tempered Glass', 'Steel Structure', 'Solar Lighting', 'Anti-graffiti Coating'],
        methodology: 'Modular construction with minimal disruption to traffic',
        riskFactors: ['Traffic coordination', 'Weather conditions', 'Material delivery'],
        bondAmount: 25500,
        paymentTerms: '30-70 (30% advance, 70% on completion)',
        compliance: {
          licenses: true,
          insurance: true,
          taxClearance: true,
          previousWork: true
        }
      }
    ]
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

// Convert a report from ReportsPage to an EnhancedReport for bidding
export const convertReportToTender = (report: any): EnhancedReport => {
  // Map urgency based on priority score
  let urgency: 'Low' | 'Medium' | 'High' | 'Critical' = 'Medium';
  if (report.priorityScore >= 80) urgency = 'Critical';
  else if (report.priorityScore >= 65) urgency = 'High';
  else if (report.priorityScore >= 45) urgency = 'Medium';
  else urgency = 'Low';

  // Estimate budget based on issue type and severity - More realistic Jharkhand pricing
  let estimatedBudget = 25000; // Base minimum for small repairs
  const issueType = report.issueType?.title?.toLowerCase() || '';
  const location = report.ward?.name?.toLowerCase() || '';
  
  // Road and infrastructure work
  if (issueType.includes('road') || issueType.includes('pothole') || issueType.includes('asphalt')) {
    estimatedBudget = location.includes('main') || location.includes('highway') ? 150000 : 75000;
  } else if (issueType.includes('streetlight') || issueType.includes('electric') || issueType.includes('lighting')) {
    estimatedBudget = 45000;
  } else if (issueType.includes('water') || issueType.includes('drainage') || issueType.includes('sewage')) {
    estimatedBudget = 85000;
  } else if (issueType.includes('park') || issueType.includes('garden') || issueType.includes('tree')) {
    estimatedBudget = 35000;
  } else if (issueType.includes('building') || issueType.includes('construction') || issueType.includes('repair')) {
    estimatedBudget = 200000;
  } else if (issueType.includes('traffic') || issueType.includes('signal')) {
    estimatedBudget = 120000;
  } else if (issueType.includes('sanitation') || issueType.includes('waste')) {
    estimatedBudget = 55000;
  }

  // Adjust budget based on severity (1-10 scale)
  const severityMultiplier = 1 + ((report.severity || 5) - 5) * 0.15;
  estimatedBudget = Math.round(estimatedBudget * severityMultiplier);

  // Calculate deadline (30 days from now for high priority, 60 for medium, 90 for low)
  const deadlineDays = urgency === 'Critical' ? 15 : urgency === 'High' ? 30 : urgency === 'Medium' ? 60 : 90;
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + deadlineDays);

  return {
    id: `TENDER-${report.id}`,
    title: report.title,
    description: report.description || 'No description provided',
    location: report.address || report.ward?.name || 'Location not specified',
    zone: report.ward?.zone || 'Unknown Zone',
    department: report.department?.name || 'General',
    estimatedBudget,
    urgency,
    deadline: deadline.toISOString().split('T')[0], // YYYY-MM-DD format
    createdAt: new Date().toISOString(),
    biddingStatus: 'open',
    category: report.issueType?.title || 'General Maintenance',
    priorityScore: report.priorityScore || 50,
    completionStatus: 'not_started',
    bids: []
  };
};