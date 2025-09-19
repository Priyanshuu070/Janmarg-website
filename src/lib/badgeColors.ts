/**
 * Government-appropriate color design system for badges and UI elements
 * Professional, accessible, and tasteful colors suitable for civic applications
 */

export const govColors = {
  // Primary government brand colors (from CSS variables)
  brand: {
    primary: "var(--brand)", // #0e7c66
    primaryDark: "var(--brand-dark)", // #0a5d4d
    accent: "var(--color-accent)", // #E6F4F1
  },

  // Semantic status colors - muted and professional
  status: {
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    error: "bg-red-50 text-red-700 border border-red-200",
    info: "bg-slate-50 text-slate-700 border border-slate-200",
    pending: "bg-blue-50 text-blue-700 border border-blue-200",
  },

  // Icon colors - subtle and professional
  icon: {
    primary: "text-slate-600",
    success: "text-emerald-600",
    warning: "text-amber-600",
    error: "text-red-600",
    info: "text-blue-600",
    neutral: "text-gray-500",
  },

  // Background colors for cards and sections
  background: {
    success: "bg-emerald-50 border-emerald-200",
    warning: "bg-amber-50 border-amber-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    neutral: "bg-gray-50 border-gray-200",
  },
};

export const getBadgeColors = {
  // Status colors - government appropriate
  status: (status: string): string => {
    const statusKey = status.toLowerCase().replace(/[-\s]/g, "");

    switch (statusKey) {
      case "pending":
        return `${govColors.status.pending} hover:bg-blue-50`;
      case "inprogress":
      case "assigned":
        return `${govColors.status.info} hover:bg-slate-50`;
      case "resolved":
      case "completed":
      case "acknowledged":
        return `${govColors.status.success} hover:bg-emerald-50`;
      case "rejected":
      case "cancelled":
        return `${govColors.status.error} hover:bg-red-50`;
      default:
        return `${govColors.status.info} hover:bg-slate-50`;
    }
  },

  // Urgency/Priority colors - professional severity levels
  urgency: (urgency: string): string => {
    switch (urgency.toLowerCase()) {
      case "high":
      case "critical":
        return `${govColors.status.error} hover:bg-red-50`;
      case "medium":
      case "moderate":
        return `${govColors.status.warning} hover:bg-amber-50`;
      case "low":
        return `${govColors.status.success} hover:bg-emerald-50`;
      default:
        return `${govColors.status.info} hover:bg-slate-50`;
    }
  },

  // Performance/SLA colors - professional gradients
  performance: (percentage: number): string => {
    if (percentage >= 95) {
      return `${govColors.status.success} hover:bg-emerald-50`;
    } else if (percentage >= 85) {
      return `${govColors.status.info} hover:bg-slate-50`;
    } else if (percentage >= 70) {
      return `${govColors.status.warning} hover:bg-amber-50`;
    } else {
      return `${govColors.status.error} hover:bg-red-50`;
    }
  },

  // General severity colors for scores/ratings
  severity: (score: number, maxScore: number = 100): string => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 75) {
      return `${govColors.status.error} hover:bg-red-50`;
    } else if (percentage >= 50) {
      return `${govColors.status.warning} hover:bg-amber-50`;
    } else {
      return `${govColors.status.success} hover:bg-emerald-50`;
    }
  },

  // System status colors - professional and clear
  systemStatus: (status: string): string => {
    switch (status.toLowerCase()) {
      case "active":
      case "operational":
      case "good":
        return `${govColors.status.success} hover:bg-emerald-50`;
      case "warning":
      case "attention":
        return `${govColors.status.warning} hover:bg-amber-50`;
      case "critical":
      case "down":
      case "error":
        return `${govColors.status.error} hover:bg-red-50`;
      case "maintenance":
        return `${govColors.status.info} hover:bg-slate-50`;
      default:
        return `${govColors.status.info} hover:bg-slate-50`;
    }
  },
};

// Helper function for score-based urgency
export const getUrgencyFromScore = (score: number): string => {
  if (score >= 75) return "High";
  if (score >= 50) return "Medium";
  return "Low";
};

// Helper function for performance text
export const getPerformanceText = (percentage: number): string => {
  if (percentage >= 95) return "Excellent";
  if (percentage >= 85) return "Good";
  if (percentage >= 70) return "Fair";
  return "Needs Improvement";
};

// Government-appropriate icon colors
export const getIconColor = (
  type: "success" | "warning" | "error" | "info" | "neutral" = "neutral"
): string => {
  return govColors.icon[type];
};
