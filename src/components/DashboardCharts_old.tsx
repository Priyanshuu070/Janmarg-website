import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts";
import {
  Clock,
  MapPin,
  User,
  Award,
  AlertCircle,
  CheckCircle,
  Building,
  TrendingUp,
} from "lucide-react";

// Import mock data
import { reports } from "@/data/mockReports.json";

// Calculate enhanced analytics data from mock reports
const calculateAnalyticsData = () => {
  // Longest Pending Reports
  const pendingReports = reports
    .filter(r => r.status === "PENDING" || r.status === "IN_PROGRESS")
    .sort((a, b) => b.ageInDays - a.ageInDays)
    .slice(0, 5)
    .map(report => ({
      id: report.id,
      type: report.issueType.title,
      ward: report.ward.name.split(" - ")[0],
      ageInDays: report.ageInDays,
      assignedContractor: report.assignedContractorId || "Unassigned",
      severity: report.severity,
    }));

  // Ward Comparison - reports count and avg resolution time per ward
  const wardStats = reports.reduce((acc, report) => {
    const wardName = report.ward.name.split(" - ")[0];
    if (!acc[wardName]) {
      acc[wardName] = { name: wardName, reportCount: 0, totalResolutionTime: 0, resolvedCount: 0 };
    }
    acc[wardName].reportCount++;
    
    if (report.resolvedAt && report.createdAt) {
      const resolutionTime = (new Date(report.resolvedAt).getTime() - new Date(report.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      acc[wardName].totalResolutionTime += resolutionTime;
      acc[wardName].resolvedCount++;
    }
    return acc;
  }, {} as Record<string, any>);

  const wardComparisonData = Object.values(wardStats).map((ward: any) => ({
    ward: ward.name,
    reportCount: ward.reportCount,
    avgResolutionTime: ward.resolvedCount > 0 ? (ward.totalResolutionTime / ward.resolvedCount).toFixed(1) : 0,
  }));

  // Reopened Report Rate
  const reopenedReports = reports.filter(r => r.status === "REOPENED").length;
  const resolvedReports = reports.filter(r => r.resolvedAt).length;
  const reopenedRate = resolvedReports > 0 ? (reopenedReports / resolvedReports) * 100 : 0;

  // Departmental Efficiency
  const deptStats = reports.reduce((acc, report) => {
    const deptName = report.department.name;
    if (!acc[deptName]) {
      acc[deptName] = { name: deptName, totalTime: 0, resolvedCount: 0, totalReports: 0, onTime: 0 };
    }
    acc[deptName].totalReports++;
    
    if (report.resolvedAt && report.createdAt) {
      const resolutionTime = (new Date(report.resolvedAt).getTime() - new Date(report.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      acc[deptName].totalTime += resolutionTime;
      acc[deptName].resolvedCount++;
      // Mock SLA: assume 7 days is the target
      if (resolutionTime <= 7) acc[deptName].onTime++;
    }
    return acc;
  }, {} as Record<string, any>);

  const departmentalEfficiencyData = Object.values(deptStats).map((dept: any) => ({
    department: dept.name.length > 15 ? dept.name.substring(0, 15) + "..." : dept.name,
    avgResolutionTime: dept.resolvedCount > 0 ? (dept.totalTime / dept.resolvedCount).toFixed(1) : 0,
    slaCompliance: dept.resolvedCount > 0 ? ((dept.onTime / dept.resolvedCount) * 100).toFixed(0) : 0,
    totalReports: dept.totalReports,
  }));

  // Contractor Leaderboard
  const contractorStats = reports.reduce((acc, report) => {
    if (report.assignedContractorId && report.resolvedAt) {
      const contractorId = report.assignedContractorId;
      if (!acc[contractorId]) {
        acc[contractorId] = { id: contractorId, totalTime: 0, resolvedCount: 0, totalAssigned: 0 };
      }
      acc[contractorId].totalAssigned++;
      
      if (report.resolvedAt && report.createdAt) {
        const resolutionTime = (new Date(report.resolvedAt).getTime() - new Date(report.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        acc[contractorId].totalTime += resolutionTime;
        acc[contractorId].resolvedCount++;
      }
    }
    return acc;
  }, {} as Record<string, any>);

  const contractorsLeaderboard = Object.values(contractorStats)
    .map((contractor: any) => ({
      id: contractor.id,
      name: `Contractor ${contractor.id.slice(-3)}`, // Mock name from ID
      avgResolutionTime: contractor.resolvedCount > 0 ? (contractor.totalTime / contractor.resolvedCount).toFixed(1) : "N/A",
      slaCompliance: contractor.resolvedCount > 0 ? Math.round((Math.random() * 30 + 70)) : 0, // Mock SLA
      totalAssigned: contractor.totalAssigned,
    }))
    .sort((a, b) => (parseFloat(a.avgResolutionTime as string) || 999) - (parseFloat(b.avgResolutionTime as string) || 999))
    .slice(0, 5);

  return {
    longestPendingReports: pendingReports,
    wardComparisonData,
    reopenedRate,
    departmentalEfficiencyData,
    contractorsLeaderboard,
  };
};

const analyticsData = calculateAnalyticsData();

// Gauge component for reopened rate
const GaugeChart: React.FC<{ value: number; maxValue?: number }> = ({ value, maxValue = 100 }) => {
  const percentage = (value / maxValue) * 100;
  const rotation = (percentage / 100) * 180 - 90;
  
  const getColor = (val: number) => {
    if (val <= 5) return "#10b981"; // Green
    if (val <= 15) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  return (
    <div className="relative w-32 h-20 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 120 60">
        <path
          d="M 10 50 A 40 40 0 0 1 110 50"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 110 50"
          stroke={getColor(value)}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${(percentage / 100) * 125.66} 125.66`}
        />
        <circle cx="60" cy="50" r="3" fill="#374151" />
        <line
          x1="60"
          y1="50"
          x2="60"
          y2="20"
          stroke="#374151"
          strokeWidth="2"
          transform={`rotate(${rotation} 60 50)`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <span className="text-lg font-bold">{value.toFixed(1)}%</span>
      </div>
    </div>
  );
};

const DashboardCharts: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Primary Row - Longest Pending Reports and Ward Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Longest Pending Reports Table */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold">Longest Pending Reports</h3>
          </div>
          <div className="space-y-3">
            {analyticsData.longestPendingReports.map((report, index) => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {report.id}
                    </Badge>
                    <span className="text-sm font-medium">{report.type}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {report.ward?.name || 'N/A'}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {report.assignedContractor}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">{report.ageInDays}</div>
                  <div className="text-xs text-muted-foreground">days</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Ward Comparison Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Ward Comparison</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={analyticsData.wardComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ward" angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="reportCount" 
                fill="#3b82f6" 
                name="Report Count" 
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="avgResolutionTime" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Avg Resolution Time (days)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Secondary Row - Reopened Rate, Departmental Efficiency, Contractor Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reopened Report Rate Gauge */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold">Reopened Report Rate</h3>
          </div>
          <div className="text-center">
            <GaugeChart value={analyticsData.reopenedRate} />
            <p className="text-sm text-muted-foreground mt-2">
              {analyticsData.reopenedRate <= 5 ? "Excellent" : analyticsData.reopenedRate <= 15 ? "Good" : "Needs Attention"}
            </p>
          </div>
        </Card>

        {/* Departmental Efficiency */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">Departmental Efficiency</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData.departmentalEfficiencyData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="department" type="category" width={80} />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}${name === "avgResolutionTime" ? " days" : "%"}`, 
                  name === "avgResolutionTime" ? "Avg Resolution Time" : "SLA Compliance"
                ]}
              />
              <Bar dataKey="avgResolutionTime" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Contractor Leaderboard */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">Contractor Leaderboard</h3>
          </div>
          <div className="space-y-3">
            {analyticsData.contractorsLeaderboard.map((contractor, index) => (
              <div key={contractor.id} className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-gray-500"
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{contractor.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {contractor.totalAssigned} assigned
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">
                    {contractor.avgResolutionTime} days
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {contractor.slaCompliance}% SLA
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCharts;
