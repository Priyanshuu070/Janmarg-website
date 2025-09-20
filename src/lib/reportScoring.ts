// Report Priority Scoring System
// Based on the formula: Priority Score = (0.30×U)+(0.15×D)+(0.15×C)+(0.10×T)+(0.10×S)+(0.10×A)+(0.07×P)+(0.03×E)

export interface ScoringParameters {
  urgency: number;           // U = Upvote score (0-1, normalized by ward/population)
  duplicates: number;        // D = Duplicate count score (0-1, normalized frequency of repeats)
  areaCriticality: number;   // C = Area criticality (0-1, e.g. hospital zone > residential street)
  reporterTrust: number;     // T = Reporter trust (0-1, based on historical accuracy/flag ratio)
  aiSeverity: number;        // S = AI severity (0-1, ML hazard detection)
  age: number;              // A = Age factor (0-1, scaled by how long it's pending)
  proofCompleteness: number; // P = Proof completeness (0-1, clear photo + description + geo)
  eventFlag: number;        // E = Event flag (0 or 1, toggled during special situations)
}

export interface ScoringWeights {
  urgency: 0.30;
  duplicates: 0.15;
  areaCriticality: 0.15;
  reporterTrust: 0.10;
  aiSeverity: 0.10;
  age: 0.10;
  proofCompleteness: 0.07;
  eventFlag: 0.03;
}

export const SCORING_WEIGHTS: ScoringWeights = {
  urgency: 0.30,
  duplicates: 0.15,
  areaCriticality: 0.15,
  reporterTrust: 0.10,
  aiSeverity: 0.10,
  age: 0.10,
  proofCompleteness: 0.07,
  eventFlag: 0.03,
};

// Calculate priority score based on weighted parameters
export function calculatePriorityScore(params: ScoringParameters): number {
  const score = 
    (SCORING_WEIGHTS.urgency * params.urgency) +
    (SCORING_WEIGHTS.duplicates * params.duplicates) +
    (SCORING_WEIGHTS.areaCriticality * params.areaCriticality) +
    (SCORING_WEIGHTS.reporterTrust * params.reporterTrust) +
    (SCORING_WEIGHTS.aiSeverity * params.aiSeverity) +
    (SCORING_WEIGHTS.age * params.age) +
    (SCORING_WEIGHTS.proofCompleteness * params.proofCompleteness) +
    (SCORING_WEIGHTS.eventFlag * params.eventFlag);
  
  // Return score as percentage (0-100)
  return Math.round(score * 100);
}

// Get detailed scoring breakdown for transparency
export function getScoringBreakdown(params: ScoringParameters) {
  const breakdown = {
    urgency: {
      weight: SCORING_WEIGHTS.urgency,
      score: params.urgency,
      contribution: SCORING_WEIGHTS.urgency * params.urgency,
      description: "Community validation through upvotes, normalized by ward population"
    },
    duplicates: {
      weight: SCORING_WEIGHTS.duplicates,
      score: params.duplicates,
      contribution: SCORING_WEIGHTS.duplicates * params.duplicates,
      description: "Multiple reports of same issue indicate water impact and prevent waste"
    },
    areaCriticality: {
      weight: SCORING_WEIGHTS.areaCriticality,
      score: params.areaCriticality,
      contribution: SCORING_WEIGHTS.areaCriticality * params.areaCriticality,
      description: "Location importance (hospitals, schools > residential areas)"
    },
    reporterTrust: {
      weight: SCORING_WEIGHTS.reporterTrust,
      score: params.reporterTrust,
      contribution: SCORING_WEIGHTS.reporterTrust * params.reporterTrust,
      description: "Reporter's historical accuracy reduces spam and fake reports"
    },
    aiSeverity: {
      weight: SCORING_WEIGHTS.aiSeverity,
      score: params.aiSeverity,
      contribution: SCORING_WEIGHTS.aiSeverity * params.aiSeverity,
      description: "AI analysis of hazard level from photos and description"
    },
    age: {
      weight: SCORING_WEIGHTS.age,
      score: params.age,
      contribution: SCORING_WEIGHTS.age * params.age,
      description: "Older unresolved issues automatically climb priority"
    },
    proofCompleteness: {
      weight: SCORING_WEIGHTS.proofCompleteness,
      score: params.proofCompleteness,
      contribution: SCORING_WEIGHTS.proofCompleteness * params.proofCompleteness,
      description: "Well-documented reports (photo, description, GPS) are easier to act on"
    },
    eventFlag: {
      weight: SCORING_WEIGHTS.eventFlag,
      score: params.eventFlag,
      contribution: SCORING_WEIGHTS.eventFlag * params.eventFlag,
      description: "Special situation flag (festival, emergency, election period)"
    }
  };

  const totalScore = calculatePriorityScore(params);
  
  return {
    breakdown,
    totalScore,
    formula: "Priority Score = (0.30×U)+(0.15×D)+(0.15×C)+(0.10×T)+(0.10×S)+(0.10×A)+(0.07×P)+(0.03×E)"
  };
}

// Generate scoring parameters for a report (mock implementation)
export function generateReportScoring(reportData: any): ScoringParameters {
  // This would normally come from real data analysis
  // For now, generating realistic mock scores
  
  const isHighPriority = Math.random() > 0.7;
  const isMediumPriority = Math.random() > 0.5;
  
  return {
    urgency: isHighPriority ? 0.8 + Math.random() * 0.2 : 
             isMediumPriority ? 0.5 + Math.random() * 0.3 : 
             Math.random() * 0.5,
    duplicates: Math.random() * 0.8,
    areaCriticality: reportData.category === 'Infrastructure' ? 0.7 + Math.random() * 0.3 :
                     reportData.category === 'Safety' ? 0.6 + Math.random() * 0.4 :
                     0.3 + Math.random() * 0.4,
    reporterTrust: 0.6 + Math.random() * 0.4, // Most reporters are trustworthy
    aiSeverity: Math.random(),
    age: Math.min(1.0, (new Date().getTime() - new Date(reportData.date).getTime()) / (1000 * 60 * 60 * 24 * 30)), // Age in months
    proofCompleteness: reportData.image ? 0.7 + Math.random() * 0.3 : 0.3 + Math.random() * 0.4,
    eventFlag: Math.random() > 0.8 ? 1 : 0 // 20% chance of special event
  };
}

// Priority level classification
export function getPriorityLevel(score: number): {
  level: 'Critical' | 'High' | 'Medium' | 'Low';
  color: string;
  bgColor: string;
} {
  if (score >= 80) {
    return { level: 'Critical', color: 'text-red-700', bgColor: 'bg-red-100 border-red-200' };
  } else if (score >= 65) {
    return { level: 'High', color: 'text-orange-700', bgColor: 'bg-orange-100 border-orange-200' };
  } else if (score >= 45) {
    return { level: 'Medium', color: 'text-yellow-700', bgColor: 'bg-yellow-100 border-yellow-200' };
  } else {
    return { level: 'Low', color: 'text-green-700', bgColor: 'bg-green-100 border-green-200' };
  }
}