import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Star,
  PieChart,
} from "lucide-react";

// Import mock data
import { reports } from "@/data/mockReports.json";

// Calculate KPI data from mock reports
const calculateKPIData = () => {
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === "PENDING").length;
  const resolvedReports = reports.filter(r => r.status === "RESOLVED" || r.status === "COMPLETED").length;
  const inProgressReports = reports.filter(r => r.status === "IN_PROGRESS").length;
  
  // Calculate average resolution time for resolved reports
  const resolvedWithTime = reports.filter(r => r.resolvedAt);
  const avgResolutionTime = resolvedWithTime.length > 0 
    ? resolvedWithTime.reduce((sum, report) => {
        const created = new Date(report.createdAt);
        const resolved = new Date(report.resolvedAt!);
        return sum + (resolved.getTime() - created.getTime());
      }, 0) / resolvedWithTime.length / (1000 * 60 * 60 * 24)
    : 0;

  // Calculate citizen satisfaction from ratings
  const reportsWithRatings = reports.filter(r => r.citizenRating);
  const avgRating = reportsWithRatings.length > 0
    ? reportsWithRatings.reduce((sum, report) => sum + (report.citizenRating || 0), 0) / reportsWithRatings.length
    : 0;

  // Mock trend data (in real app, this would come from historical data)
  const sparklineData = [12, 15, 18, 14, 20, 16, 23]; // Last 7 days
  
  return {
    totalReports: {
      total: totalReports,
      today: 3, // Mock today's count
      change: +8.5,
      trend: "up" as const,
      sparklineData,
    },
    pendingVsResolved: {
      pending: pendingReports + inProgressReports,
      resolved: resolvedReports,
      pendingPercentage: ((pendingReports + inProgressReports) / totalReports) * 100,
      resolvedPercentage: (resolvedReports / totalReports) * 100,
    },
    avgResolutionTime: {
      days: Math.round(avgResolutionTime * 10) / 10,
      change: -0.8, // Mock trend (negative is good - faster resolution)
      trend: "down" as const,
      previousWeek: avgResolutionTime + 0.8,
    },
    citizenSatisfaction: {
      rating: Math.round(avgRating * 10) / 10,
      maxRating: 5,
      ratingCount: reportsWithRatings.length,
      satisfactionLevel: avgRating >= 4 ? "high" : avgRating >= 3 ? "medium" : "low",
    },
  };
};

const kpiData = calculateKPIData();

const KPICard: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = "" }) => (
  <Card className={`p-6 ${className}`}>
    <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
    {children}
  </Card>
);

const TrendIndicator: React.FC<{
  value: number;
  trend: "up" | "down";
  suffix?: string;
  isGoodWhenDown?: boolean;
}> = ({ value, trend, suffix = "%", isGoodWhenDown = false }) => {
  const isPositive = isGoodWhenDown ? trend === "down" : trend === "up";
  
  return (
    <div
      className={`flex items-center gap-1 text-sm font-medium ${
        isPositive ? "text-green-600" : "text-red-600"
      }`}
    >
      {trend === "up" ? (
        <TrendingUp className="w-4 h-4" />
      ) : (
        <TrendingDown className="w-4 h-4" />
      )}
      <span>
        {Math.abs(value)}
        {suffix}
      </span>
    </div>
  );
};

const Sparkline: React.FC<{ data: number[]; className?: string }> = ({ 
  data, 
  className = "w-16 h-8" 
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        points={points}
      />
    </svg>
  );
};

const DonutChart: React.FC<{
  resolved: number;
  pending: number;
  size?: number;
}> = ({ resolved, pending, size = 60 }) => {
  const total = resolved + pending;
  const resolvedPercentage = (resolved / total) * 100;
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (resolvedPercentage / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(249 115 22)"
          strokeWidth="4"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(34 197 94)"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-muted-foreground">
          {Math.round(resolvedPercentage)}%
        </span>
      </div>
    </div>
  );
};

const StarRating: React.FC<{
  rating: number;
  maxRating: number;
  size?: string;
}> = ({ rating, maxRating, size = "w-4 h-4" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < fullStars
              ? "text-yellow-400 fill-yellow-400"
              : i === fullStars && hasHalfStar
              ? "text-yellow-400 fill-yellow-400/50"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const KPICards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Reports with Sparkline */}
      <KPICard title="Total Reports">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-3xl font-bold text-foreground">
                {kpiData.totalReports.total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Today: {kpiData.totalReports.today}
                </Badge>
                <TrendIndicator
                  value={kpiData.totalReports.change}
                  trend={kpiData.totalReports.trend}
                />
              </div>
            </div>
          </div>
          <div className="text-blue-600 opacity-60">
            <Sparkline data={kpiData.totalReports.sparklineData} />
          </div>
        </div>
      </KPICard>

      {/* Pending vs Resolved with Donut Chart */}
      <KPICard title="Pending vs Resolved">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <span className="font-semibold text-orange-600">
                {kpiData.pendingVsResolved.pending}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Resolved</span>
              </div>
              <span className="font-semibold text-green-600">
                {kpiData.pendingVsResolved.resolved}
              </span>
            </div>
          </div>
          <DonutChart
            resolved={kpiData.pendingVsResolved.resolved}
            pending={kpiData.pendingVsResolved.pending}
          />
        </div>
      </KPICard>

      {/* Average Resolution Time with Trend */}
      <KPICard title="Average Resolution Time">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-3xl font-bold text-foreground">
              {kpiData.avgResolutionTime.days}
            </span>
            <span className="text-lg text-muted-foreground">days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              vs. last week: {kpiData.avgResolutionTime.previousWeek} days
            </span>
            <TrendIndicator
              value={Math.abs(kpiData.avgResolutionTime.change)}
              trend={kpiData.avgResolutionTime.trend}
              suffix=" days"
              isGoodWhenDown={true}
            />
          </div>
        </div>
      </KPICard>

      {/* Citizen Satisfaction with Star Rating */}
      <KPICard title="Citizen Satisfaction">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground">
                {kpiData.citizenSatisfaction.rating}
              </span>
              <span className="text-lg text-muted-foreground">
                /{kpiData.citizenSatisfaction.maxRating}
              </span>
            </div>
            <StarRating
              rating={kpiData.citizenSatisfaction.rating}
              maxRating={kpiData.citizenSatisfaction.maxRating}
              size="w-5 h-5"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Based on {kpiData.citizenSatisfaction.ratingCount} reviews
            </span>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                kpiData.citizenSatisfaction.satisfactionLevel === "high"
                  ? "bg-green-100 text-green-800"
                  : kpiData.citizenSatisfaction.satisfactionLevel === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {kpiData.citizenSatisfaction.satisfactionLevel.toUpperCase()}
            </div>
          </div>
        </div>
      </KPICard>
    </div>
  );
};

export default KPICards;
