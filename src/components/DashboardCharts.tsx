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
  
  // Enhanced mock data for realistic appearance
  const reportsThisWeek = [
    { day: 'Mon', thisWeek: 23, lastWeek: 18 },
    { day: 'Tue', thisWeek: 34, lastWeek: 29 },
    { day: 'Wed', thisWeek: 19, lastWeek: 31 },
    { day: 'Thu', thisWeek: 42, lastWeek: 25 },
    { day: 'Fri', thisWeek: 38, lastWeek: 33 },
    { day: 'Sat', thisWeek: 21, lastWeek: 28 },
    { day: 'Sun', thisWeek: 27, lastWeek: 19 }
  ];

  const topIssueTypes = [
    { type: 'Road Maintenance', count: 127, percentage: 28 },
    { type: 'Waste Management', count: 98, percentage: 22 },
    { type: 'Street Lighting', count: 86, percentage: 19 }
  ];

  const reportsByZone = [
    { zone: 'Central Zone', reports: 89, slaCompliance: 85 },
    { zone: 'North Zone', reports: 76, slaCompliance: 72 },
    { zone: 'South Zone', reports: 94, slaCompliance: 90 },
    { zone: 'East Zone', reports: 67, slaCompliance: 78 },
    { zone: 'West Zone', reports: 54, slaCompliance: 88 }
  ];

  const slaComplianceData = [
    { category: 'On-Time', value: 78 },
    { category: 'Delayed', value: 22 }
  ];

  // Longest pending reports from actual data
  const longestPendingReports = reports
    .filter(report => ['PENDING', 'IN_PROGRESS', 'ASSIGNED'].includes(report.status))
    .sort((a, b) => b.ageInDays - a.ageInDays)
    .slice(0, 4);

  // Ward comparison data - enhanced
  const wardComparison = [
    { ward: 'Central Ward', reports: 45, avgResolution: 4.2 },
    { ward: 'Highway Ward', reports: 32, avgResolution: 5.8 },
    { ward: 'Sector 15', reports: 38, avgResolution: 3.6 },
    { ward: 'Park View', reports: 29, avgResolution: 4.9 },
    { ward: 'Model Town', reports: 22, avgResolution: 3.1 },
    { ward: 'Tech Park', reports: 41, avgResolution: 4.7 },
    { ward: 'Old City', reports: 36, avgResolution: 6.3 }
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

  // Departmental efficiency data - enhanced
  const departmentalEfficiency = [
    { dept: 'Roads & Infrastructure', avgTime: 5.2, slaCompliance: 78 },
    { dept: 'Sanitation & Waste', avgTime: 2.8, slaCompliance: 92 }
  ];

  // Top 3 contractors - enhanced data
  const topContractors = [
    { name: 'QuickFix Solutions Pvt Ltd', avgTime: 2.3, slaCompliance: 96, totalAssigned: 127 },
    { name: 'CityWorks Infrastructure', avgTime: 2.8, slaCompliance: 91, totalAssigned: 98 },
    { name: 'Urban Repairs & Maintenance', avgTime: 3.1, slaCompliance: 87, totalAssigned: 86 }
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
                <div key={issue.type} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-semibold text-gray-800">{issue.type}</span>
                    <span className="bg-white border border-gray-300 rounded px-2 py-1 text-xs font-medium text-gray-700">
                      {issue.count} ({issue.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
                    <div
                      className="h-3 rounded-full border border-gray-400"
                      style={{
                        width: `${(issue.percentage / 28) * 100}%`,
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

        {/* SLA Compliance Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={slaComplianceData}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    innerRadius={25}
                    paddingAngle={2}
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#EF4444" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                  <Legend 
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span style={{ color: value === 'On-Time' ? '#10B981' : '#EF4444' }}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
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
                <div key={report.id} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-orange-100 border border-orange-300 rounded-md px-2 py-1">
                          <span className="text-lg font-bold text-orange-600">#{report.id}</span>
                        </div>
                        <Badge variant={report.status === 'PENDING' ? 'destructive' : 'secondary'} className="border">
                          {report.status}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{report.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded px-2 py-1">
                          <MapPin className="h-3 w-3" />
                          {report.ward.name}
                        </span>
                        <span className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded px-2 py-1">
                          <Building2 className="h-3 w-3" />
                          {report.issueType.title}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-red-100 border border-red-300 rounded-lg px-3 py-2 text-center">
                        <div className="text-2xl font-bold text-red-600">{report.ageInDays}</div>
                        <div className="text-xs text-red-500 font-medium">days pending</div>
                      </div>
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
                <div key={contractor.name} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 ${
                      index === 0 ? 'bg-yellow-500 border-yellow-600' : index === 1 ? 'bg-gray-400 border-gray-500' : 'bg-orange-600 border-orange-700'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-semibold text-sm text-gray-800">{contractor.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs bg-white rounded border px-2 py-1">
                      <span className="font-medium">Avg Time: {contractor.avgTime} days</span>
                      <span className="font-medium text-blue-600">{contractor.slaCompliance}% SLA</span>
                    </div>
                    <Progress value={contractor.slaCompliance} className="h-2" />
                    <div className="text-xs text-gray-600 bg-white rounded border px-2 py-1">
                      <strong>{contractor.totalAssigned}</strong> reports assigned
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
            <div className="space-y-4">
              {departmentalEfficiency.map((dept, index) => (
                <div key={dept.dept} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 border border-blue-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">{dept.dept}</span>
                    <span className="bg-white border border-gray-300 rounded px-2 py-1 text-xs font-medium text-gray-700">
                      {dept.avgTime} days avg
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Progress value={dept.slaCompliance} className="h-3 border border-gray-300" />
                    </div>
                    <span className="text-sm font-bold text-green-600 bg-green-100 border border-green-300 rounded px-2 py-1">
                      {dept.slaCompliance}%
                    </span>
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