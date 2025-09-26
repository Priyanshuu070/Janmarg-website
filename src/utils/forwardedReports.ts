// Utility functions for managing forwarded reports
import { EnhancedReport } from '../data/biddingData';

const FORWARDED_REPORTS_KEY = 'forwarded_reports';

// Get all forwarded reports from localStorage
export const getForwardedReports = (): EnhancedReport[] => {
  try {
    const stored = localStorage.getItem(FORWARDED_REPORTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading forwarded reports:', error);
    return [];
  }
};

// Add a report to forwarded reports
export const addForwardedReport = (report: EnhancedReport): void => {
  try {
    const forwarded = getForwardedReports();
    // Check if report already exists
    const exists = forwarded.find(r => r.id === report.id);
    if (!exists) {
      forwarded.push(report);
      localStorage.setItem(FORWARDED_REPORTS_KEY, JSON.stringify(forwarded));
    }
  } catch (error) {
    console.error('Error saving forwarded report:', error);
  }
};

// Remove a report from forwarded reports
export const removeForwardedReport = (reportId: string): void => {
  try {
    const forwarded = getForwardedReports();
    const filtered = forwarded.filter(r => r.id !== reportId);
    localStorage.setItem(FORWARDED_REPORTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing forwarded report:', error);
  }
};

// Check if a report is forwarded
export const isReportForwarded = (reportId: string): boolean => {
  const forwarded = getForwardedReports();
  return forwarded.some(r => r.id === reportId);
};