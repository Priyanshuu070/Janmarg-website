import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, User, MapPin, Building2, Trophy, TrendingUp, TrendingDown } from "lucide-react";
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
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from 'chart.js';
import { Bar as ChartBar } from 'react-chartjs-2';
import mockReports from "../data/mockReports.json";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  ChartLegend
);

const DashboardCharts = () => {
  // Process reports data
  const reports = mockReports.reports || [];
  
  // Mock data for various charts
  const reportsThisWeek = [
    { day: 'Mon', thisWeek: 12, lastWeek: 8 },
    { day: 'Tue', thisWeek: 15, lastWeek: 12 },
    { day: 'Wed', thisWeek: 8, lastWeek: 15 },
    { day: 'Thu', thisWeek: 20, lastWeek: 10 },
    { day: 'Fri', thisWeek: 18, lastWeek: 16 },
    { day: 'Sat', thisWeek: 10, lastWeek: 14 },
    { day: 'Sun', thisWeek: 14, lastWeek: 9 }
  ];

  const topIssueTypes = [
    { type: 'Road Maintenance', count: 45, percentage: 35 },
    { type: 'Waste Management', count: 32, percentage: 25 },
    { type: 'Street Lighting', count: 28, percentage: 22 },
    { type: 'Water Supply', count: 15, percentage: 12 },
    { type: 'Traffic Management', count: 8, percentage: 6 }
  ];

  const reportsByZone = [
    { zone: 'Central Zone', reports: 32, slaCompliance: 85 },
    { zone: 'North Zone', reports: 28, slaCompliance: 72 },
    { zone: 'South Zone', reports: 35, slaCompliance: 90 },
    { zone: 'East Zone', reports: 25, slaCompliance: 78 },
    { zone: 'West Zone', reports: 20, slaCompliance: 88 }
  ];

  const slaComplianceData = [
    { category: 'On-Time', value: 75 },
    { category: 'Delayed', value: 25 }
  ];

  // Longest pending reports from actual data
  const longestPendingReports = reports
    .filter(report => ['PENDING', 'IN_PROGRESS', 'ASSIGNED'].includes(report.status))
    .sort((a, b) => b.ageInDays - a.ageInDays)
    .slice(0, 5);

  // Ward comparison data
  const wardComparison = [
    { ward: 'Central Ward', reports: 12, avgResolution: 4.5 },
    { ward: 'Highway Ward', reports: 8, avgResolution: 6.2 },
    { ward: 'Sector 15', reports: 15, avgResolution: 3.8 },
    { ward: 'Park View', reports: 10, avgResolution: 5.1 },
    { ward: 'Model Town', reports: 6, avgResolution: 2.9 }
  ];

  // Ward comparison chart.js configuration
  const wardChartData = {
    labels: wardComparison.map(w => w.ward),
    datasets: [
      {
        label: 'Number of Reports',
        data: wardComparison.map(w => w.reports),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      }
    ]
  };

  const wardChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Departmental efficiency data
  const departmentalEfficiency = [
    { dept: 'Roads', avgTime: 5.2, slaCompliance: 78 },
    { dept: 'Sanitation', avgTime: 2.8, slaCompliance: 92 },
    { dept: 'Electricity', avgTime: 4.1, slaCompliance: 85 }
  ];

  // Top 3 contractors
  const topContractors = [
    { name: 'QuickFix Solutions', avgTime: 2.5, slaCompliance: 95, totalAssigned: 45 },
    { name: 'CityWorks Ltd', avgTime: 3.2, slaCompliance: 88, totalAssigned: 38 },
    { name: 'Urban Repairs Co', avgTime: 3.8, slaCompliance: 82, totalAssigned: 32 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const GaugeChart = ({ value, title }: { value: number; title: string }) => {
    const rotation = (value / 100) * 180 - 90;
    
    return (
      <div className="relative w-32 h-20 mx-auto mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 60">
          {/* Background arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            stroke={value < 30 ? '#10B981' : value < 70 ? '#F59E0B' : '#EF4444'}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${(value / 100) * 125.66} 125.66`}
          />
          {/* Needle */}
          <g transform={`translate(50, 50) rotate(${rotation})`}>
            <line
              x1="0"
              y1="0"
              x2="30"
              y2="0"
              stroke="#374151"
              strokeWidth="2"
            />
            <circle cx="0" cy="0" r="2" fill="#374151" />
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-xl font-bold">{value}%</span>
          <span className="text-xs text-gray-500">{title}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* First Row - Original Enhanced Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Reports This Week - Enhanced Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Reports This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportsThisWeek}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="thisWeek"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 4 }}
                    name="This Week"
                  />
                  <Line
                    type="monotone"
                    dataKey="lastWeek"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#94A3B8', r: 3 }}
                    name="Last Week"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Issue Types - Horizontal Bar */}
        <Card>
          <CardHeader>
            <CardTitle>Top Issue Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topIssueTypes.map((issue, index) => (
                <div key={issue.type} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{issue.type}</span>
                    <span className="text-gray-500">{issue.count} ({issue.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${issue.percentage * 2}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row - New Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Reports by Zone */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Reports by Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportsByZone} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" />
                  <YAxis dataKey="zone" type="category" width={80} fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                    formatter={(value, name) => [
                      name === 'reports' ? `${value} reports` : `${value}% SLA compliance`,
                      name === 'reports' ? 'Reports' : 'SLA Compliance'
                    ]}
                  />
                  <Bar 
                    dataKey="reports" 
                    fill="#3B82F6" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* SLA Compliance Stacked Bar */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative w-full h-8 bg-red-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ width: `${slaComplianceData[0].value}%` }}
                >
                  {slaComplianceData[0].value}% On-Time
                </div>
                <div 
                  className="absolute top-0 right-0 h-full bg-red-500 flex items-center justify-center text-white text-sm font-medium"
                  style={{ width: `${slaComplianceData[1].value}%` }}
                >
                  {slaComplianceData[1].value}% Delayed
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>On-Time: {slaComplianceData[0].value}%</span>
                <span>Delayed: {slaComplianceData[1].value}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reopened Report Rate - Fixed Gauge */}
        <Card>
          <CardHeader>
            <CardTitle>Reopened Report Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4">
            <GaugeChart value={12} title="Reopened" />
            <p className="text-sm text-gray-600 mt-2">Low reopened rate indicates good initial resolution quality</p>
          </CardContent>
        </Card>
      </div>

      {/* Third Row - Improved Existing Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Longest Pending Reports - Improved */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Longest Pending Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {longestPendingReports.map((report, index) => (
                <div key={report.id} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border-l-4 border-orange-400">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-orange-600">#{report.id}</span>
                        <Badge variant={report.status === 'PENDING' ? 'destructive' : 'secondary'}>
                          {report.status}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{report.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {report.ward.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {report.issueType.title}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-red-600">{report.ageInDays}</div>
                      <div className="text-xs text-gray-500">days pending</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Contractors - Reduced */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top 3 Contractors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContractors.map((contractor, index) => (
                <div key={contractor.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-sm">{contractor.name}</span>
                  </div>
                  <div className="pl-8 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Avg Time: {contractor.avgTime} days</span>
                      <span>{contractor.slaCompliance}% SLA</span>
                    </div>
                    <Progress value={contractor.slaCompliance} className="h-2" />
                    <div className="text-xs text-gray-500">
                      {contractor.totalAssigned} reports assigned
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fourth Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ward Comparison - Fixed with Chart.js */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Ward Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartBar data={wardChartData} options={wardChartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Departmental Efficiency - Compact Horizontal Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Departmental Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentalEfficiency.map((dept, index) => (
                <div key={dept.dept} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{dept.dept}</span>
                    <span className="text-sm text-gray-600">{dept.avgTime} days avg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Progress value={dept.slaCompliance} className="h-3" />
                    </div>
                    <span className="text-sm font-medium">{dept.slaCompliance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCharts;