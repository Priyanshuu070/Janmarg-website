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
} from "lucide-react";

// Mock KPI data
const kpiData = {
  totalReports: {
    total: 1247,
    today: 23,
    change: +12,
    trend: "up" as const,
  },
  pendingVsResolved: {
    pending: 156,
    resolved: 1091,
    pendingPercentage: 12.5,
  },
  avgResolutionTime: {
    days: 3.2,
    hours: 76.8,
    change: -0.5,
    trend: "down" as const,
  },
  contractors: {
    active: 28,
    idle: 7,
    total: 35,
    activePercentage: 80,
  },
};

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
}> = ({ value, trend, suffix = "%" }) => (
  <div
    className={`flex items-center gap-1 text-sm ${
      trend === "up" ? "text-green-600" : "text-red-600"
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

const KPICards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Reports */}
      <KPICard title="Total Reports">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-foreground">
                {kpiData.totalReports.total.toLocaleString()}
              </span>
            </div>
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
      </KPICard>

      {/* Pending vs Resolved */}
      <KPICard title="Pending vs Resolved">
        <div className="space-y-3">
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
          <div className="pt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Pending Rate</span>
              <span>{kpiData.pendingVsResolved.pendingPercentage}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full"
                style={{
                  width: `${kpiData.pendingVsResolved.pendingPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>
      </KPICard>

      {/* Average Resolution Time */}
      <KPICard title="Avg Resolution Time">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-foreground">
                {kpiData.avgResolutionTime.days}
              </span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                ({kpiData.avgResolutionTime.hours}h total)
              </span>
              <TrendIndicator
                value={kpiData.avgResolutionTime.change}
                trend={kpiData.avgResolutionTime.trend}
                suffix=" days"
              />
            </div>
          </div>
        </div>
      </KPICard>

      {/* Active vs Idle Contractors */}
      <KPICard title="Contractors Status">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
            <span className="font-semibold text-green-600">
              {kpiData.contractors.active}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-muted-foreground">Idle</span>
            </div>
            <span className="font-semibold text-gray-600">
              {kpiData.contractors.idle}
            </span>
          </div>
          <div className="pt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Active Rate</span>
              <span>{kpiData.contractors.activePercentage}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{ width: `${kpiData.contractors.activePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </KPICard>
    </div>
  );
};

export default KPICards;
