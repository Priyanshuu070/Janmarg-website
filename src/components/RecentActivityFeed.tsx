import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  User,
  MapPin,
  Clock,
} from "lucide-react";

// Mock activity data
const recentActivities = [
  {
    id: 1,
    type: "report",
    title: "Citizen X reported Pothole in Ward 12",
    description: "New pothole report submitted with photo evidence",
    timestamp: "2 minutes ago",
    priority: "high",
    icon: FileText,
    user: "John Citizen",
    location: "Ward 12, Main Street",
  },
  {
    id: 2,
    type: "contractor",
    title: "Contractor ABC uploaded completion proof for Streetlight fix",
    description: "Repair completed with before/after photos",
    timestamp: "15 minutes ago",
    priority: "medium",
    icon: Upload,
    user: "ABC Contractors",
    location: "Zone 5, Park Avenue",
  },
  {
    id: 3,
    type: "alert",
    title: "Zone 5 has 12 reports pending > 7 days",
    description: "Multiple reports exceeding SLA deadlines",
    timestamp: "1 hour ago",
    priority: "high",
    icon: AlertTriangle,
    location: "Zone 5",
  },
  {
    id: 4,
    type: "completion",
    title: "Water leak repair completed in Ward 8",
    description: "Emergency repair finished ahead of schedule",
    timestamp: "2 hours ago",
    priority: "low",
    icon: CheckCircle,
    user: "XYZ Plumbing",
    location: "Ward 8, Industrial District",
  },
  {
    id: 5,
    type: "report",
    title: "Multiple graffiti reports in downtown area",
    description: "5 new graffiti reports within 500m radius",
    timestamp: "3 hours ago",
    priority: "medium",
    icon: FileText,
    user: "Various Citizens",
    location: "Downtown District",
  },
  {
    id: 6,
    type: "contractor",
    title: "Contractor DEF assigned to urgent pothole repair",
    description: "Emergency assignment for traffic safety issue",
    timestamp: "4 hours ago",
    priority: "high",
    icon: User,
    user: "DEF Road Works",
    location: "Ward 3, Highway Junction",
  },
];

const getActivityIcon = (type: string, IconComponent: React.ElementType) => {
  const iconColors = {
    report: "text-blue-600 bg-blue-100",
    contractor: "text-green-600 bg-green-100",
    alert: "text-red-600 bg-red-100",
    completion: "text-green-600 bg-green-100",
  };

  return (
    <div
      className={`p-2 rounded-lg ${
        iconColors[type as keyof typeof iconColors] ||
        "text-gray-600 bg-gray-100"
      }`}
    >
      <IconComponent className="w-4 h-4" />
    </div>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "border-l-red-500";
    case "medium":
      return "border-l-yellow-500";
    case "low":
      return "border-l-green-500";
    default:
      return "border-l-gray-500";
  }
};

const RecentActivityFeed: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <Badge variant="secondary" className="text-xs">
          Live Updates
        </Badge>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recentActivities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex gap-4 p-4 border-l-4 ${getPriorityColor(
              activity.priority
            )} bg-accent/50 rounded-r-lg hover:bg-accent/70 transition-colors`}
          >
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type, activity.icon)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {activity.user && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{activity.user}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>

                <Badge
                  variant={
                    activity.priority === "high"
                      ? "destructive"
                      : activity.priority === "medium"
                      ? "default"
                      : "secondary"
                  }
                  className="text-xs ml-2"
                >
                  {activity.priority}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-primary hover:underline">
          View All Activities
        </button>
      </div>
    </Card>
  );
};

export default RecentActivityFeed;
