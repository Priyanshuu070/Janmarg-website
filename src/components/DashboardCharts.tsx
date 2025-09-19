import React from "react";
import { Card } from "@/components/ui/card";
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
} from "recharts";

// Mock data for charts
const reportsPerDayData = [
  { date: "Mon", reports: 12 },
  { date: "Tue", reports: 19 },
  { date: "Wed", reports: 8 },
  { date: "Thu", reports: 15 },
  { date: "Fri", reports: 22 },
  { date: "Sat", reports: 6 },
  { date: "Sun", reports: 4 },
];

const issueTypesData = [
  { type: "Potholes", count: 45, percentage: 35 },
  { type: "Streetlights", count: 32, percentage: 25 },
  { type: "Water Leaks", count: 28, percentage: 22 },
  { type: "Graffiti", count: 15, percentage: 12 },
  { type: "Other", count: 8, percentage: 6 },
];

const slaComplianceData = [
  { name: "On-Time", value: 78, color: "#10b981" },
  { name: "Delayed", value: 22, color: "#ef4444" },
];

const zoneHeatmapData = [
  { zone: "Zone 1", reports: 23, lat: 40.7589, lng: -73.9851 },
  { zone: "Zone 2", reports: 31, lat: 40.7505, lng: -73.9934 },
  { zone: "Zone 3", reports: 18, lat: 40.7614, lng: -73.9776 },
  { zone: "Zone 4", reports: 45, lat: 40.7829, lng: -73.9654 },
  { zone: "Zone 5", reports: 12, lat: 40.758, lng: -73.9855 },
];

const DashboardCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Reports per Day Line Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reports This Week</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={reportsPerDayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="reports"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Issue Types Bar Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top 5 Issue Types</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={issueTypesData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="type" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="count" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Zone Heatmap */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reports by Zone</h3>
        <div className="space-y-3">
          {zoneHeatmapData.map((zone, index) => (
            <div key={zone.zone} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: `hsl(${220 - zone.reports * 2}, 70%, ${
                      60 - zone.reports * 0.5
                    }%)`,
                  }}
                />
                <span className="text-sm font-medium">{zone.zone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {zone.reports} reports
                </span>
                <div className="w-20 bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(zone.reports / 50) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* SLA Compliance Pie Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">SLA Compliance</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={slaComplianceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {slaComplianceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">78%</div>
            <div className="text-xs text-muted-foreground">On-Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">22%</div>
            <div className="text-xs text-muted-foreground">Delayed</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardCharts;
