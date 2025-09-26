import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  User,
  MapPin,
  Clock,
  Eye,
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
    user: "Rajesh Kumar",
    location: "Ward 12, Station Road",
  },
  {
    id: 2,
    type: "contractor",
    title:
      "Jharkhand Construction Ltd uploaded completion proof for Streetlight fix",
    description: "Repair completed with before/after photos",
    timestamp: "15 minutes ago",
    priority: "medium",
    icon: Upload,
    user: "Jharkhand Construction Ltd",
    location: "Jamshedpur Industrial, Bistupur Main Road",
  },
  {
    id: 3,
    type: "alert",
    title: "Ranchi Urban has 12 reports pending > 7 days",
    description: "Multiple reports exceeding SLA deadlines",
    timestamp: "1 hour ago",
    priority: "high",
    icon: AlertTriangle,
    location: "Ranchi Urban",
  },
  {
    id: 4,
    type: "completion",
    title: "Water leak repair completed in Dhanbad Mining",
    description: "Emergency repair finished ahead of schedule",
    timestamp: "2 hours ago",
    priority: "low",
    icon: CheckCircle,
    user: "Jharkhand Water Solutions",
    location: "Dhanbad Mining, Coal Mines Area",
  },
  {
    id: 5,
    type: "report",
    title: "Multiple graffiti reports in Ranchi downtown area",
    description: "5 new graffiti reports within 500m radius",
    timestamp: "3 hours ago",
    priority: "medium",
    icon: FileText,
    user: "Various Citizens",
    location: "Ranchi Central District",
  },
  {
    id: 6,
    type: "contractor",
    title: "Steel City Infrastructure assigned to urgent pothole repair",
    description: "Emergency assignment for traffic safety issue",
    timestamp: "4 hours ago",
    priority: "high",
    icon: User,
    user: "Steel City Infrastructure",
    location: "Bokaro Steel City, Highway Junction",
  },
  {
    id: 7,
    type: "report",
    title: "Broken water pipeline reported in Hazaribagh district",
    description: "Major water supply disruption affecting 200 households",
    timestamp: "5 hours ago",
    priority: "high",
    icon: FileText,
    user: "Priya Sharma",
    location: "Hazaribagh District, Pipeline Road",
  },
  {
    id: 8,
    type: "completion",
    title: "Street lighting installation completed in Gumla tribal area",
    description: "Solar-powered LED lights installed in remote village",
    timestamp: "6 hours ago",
    priority: "medium",
    icon: CheckCircle,
    user: "Tribal Area Development Corp",
    location: "Gumla District, Remote Village",
  },
  {
    id: 9,
    type: "alert",
    title: "Heavy rainfall causing drainage issues in Ranchi",
    description: "Multiple flood reports and drainage blockages",
    timestamp: "8 hours ago",
    priority: "high",
    icon: AlertTriangle,
    location: "Ranchi City, Multiple Areas",
  },
  {
    id: 10,
    type: "contractor",
    title: "Green Valley Contractors submitted bid for park renovation",
    description: "Comprehensive park upgrade proposal with timeline",
    timestamp: "10 hours ago",
    priority: "medium",
    icon: Upload,
    user: "Green Valley Contractors",
    location: "Ranchi South Zone, Gandhi Park",
  },
  {
    id: 11,
    type: "report",
    title: "Illegal dumping site discovered near Jamshedpur railway station",
    description: "Hazardous waste dumping affecting public health",
    timestamp: "12 hours ago",
    priority: "high",
    icon: FileText,
    user: "Environmental Activist",
    location: "Jamshedpur Railway Station Area",
  },
  {
    id: 12,
    type: "completion",
    title: "Traffic signal repair completed at busy intersection",
    description: "Signals restored after electrical fault",
    timestamp: "14 hours ago",
    priority: "low",
    icon: CheckCircle,
    user: "Jamshedpur Electrical Services",
    location: "Jamshedpur Central, Main Junction",
  },
  {
    id: 13,
    type: "alert",
    title: "Power outage affecting commercial district in Dhanbad",
    description: "Business district without electricity for 3 hours",
    timestamp: "16 hours ago",
    priority: "high",
    icon: AlertTriangle,
    location: "Dhanbad Commercial District",
  },
  {
    id: 14,
    type: "contractor",
    title: "Local artisans guild completed community center painting",
    description: "Cultural center exterior repainted with local motifs",
    timestamp: "18 hours ago",
    priority: "low",
    icon: CheckCircle,
    user: "Local Artisans Guild",
    location: "Ranchi Cultural Center",
  },
  {
    id: 15,
    type: "report",
    title: "Road construction causing traffic congestion in Bokaro",
    description: "Essential road work but poor traffic management",
    timestamp: "20 hours ago",
    priority: "medium",
    icon: FileText,
    user: "Commuter Association",
    location: "Bokaro Main Road, Construction Site",
  },
  {
    id: 16,
    type: "completion",
    title: "School building repair completed in rural Jharkhand",
    description: "Classroom roof repaired before monsoon season",
    timestamp: "22 hours ago",
    priority: "medium",
    icon: CheckCircle,
    user: "Rural Development Contractors",
    location: "Rural Jharkhand, Government School",
  },
  {
    id: 17,
    type: "alert",
    title: "Medical waste improperly disposed in hospital area",
    description: "Biohazard risk requiring immediate cleanup",
    timestamp: "1 day ago",
    priority: "high",
    icon: AlertTriangle,
    location: "Ranchi Medical District",
  },
  {
    id: 18,
    type: "contractor",
    title: "Mining safety equipment delivered to Dhanbad coal mines",
    description: "Latest safety gear distributed to 500 workers",
    timestamp: "1 day ago",
    priority: "medium",
    icon: Upload,
    user: "Mining Safety Suppliers",
    location: "Dhanbad Coal Mines",
  },
  {
    id: 19,
    type: "report",
    title: "Community garden project proposal submitted",
    description: "Local residents requesting urban farming space",
    timestamp: "1 day ago",
    priority: "low",
    icon: FileText,
    user: "Community Garden Initiative",
    location: "Ranchi Residential Area",
  },
  {
    id: 20,
    type: "completion",
    title: "Bridge safety inspection completed in West Singhbhum",
    description: "Structural assessment shows bridge needs minor repairs",
    timestamp: "2 days ago",
    priority: "medium",
    icon: CheckCircle,
    user: "Bridge Engineering Consultants",
    location: "West Singhbhum District Bridge",
  }
];

const getActivityIcon = (type: string, IconComponent: React.ElementType) => {
  const iconColors = {
    report: "text-slate-700 bg-slate-100",
    contractor: "text-emerald-700 bg-emerald-100",
    alert: "text-red-700 bg-red-100",
    completion: "text-emerald-700 bg-emerald-100",
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
  const [showAllActivities, setShowAllActivities] = useState(false);

  // Show only first 6 activities in the main feed
  const displayedActivities = recentActivities.slice(0, 6);

  const ActivityItem = ({ activity, index }: { activity: typeof recentActivities[0], index: number }) => (
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
  );

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <Badge variant="secondary" className="text-xs">
            Live Updates
          </Badge>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {displayedActivities.map((activity, index) => (
            <ActivityItem key={activity.id} activity={activity} index={index} />
          ))}
        </div>

        <div className="mt-4 text-center">
          <Dialog open={showAllActivities} onOpenChange={setShowAllActivities}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm text-primary hover:underline">
                <Eye className="w-4 h-4 mr-2" />
                View All Activities ({recentActivities.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  All Activities ({recentActivities.length})
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={activity.id} activity={activity} index={index} />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </>
  );
};

export default RecentActivityFeed;
