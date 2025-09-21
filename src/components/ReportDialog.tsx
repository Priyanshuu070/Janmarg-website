import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Calendar,
  User,
  Phone,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  Camera,
  FileText,
  TrendingUp,
  GitBranch,
  GitCommit,
  Trophy,
  Timer,
} from "lucide-react";
import { getScoringBreakdown, getPriorityLevel, ScoringParameters, generateReportScoring } from "@/lib/reportScoring";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mockReportsData from "@/data/mockReports.json";
import contractorsData from "@/data/contractors.csv?raw";

interface ReportDialogProps {
  report: any;
  isOpen: boolean;
  onClose: () => void;
}

interface TimelineItem {
  id: number;
  action: string;
  description: string;
  date: string;
  time: string;
  status: 'completed' | 'in-progress' | 'pending';
  actor: string;
  icon: any;
}

interface ScoringBreakdownItem {
  weight: number;
  score: number;
  contribution: number;
  description: string;
}

interface ScoringBreakdown {
  breakdown: Record<string, ScoringBreakdownItem>;
  totalScore: number;
  formula: string;
}

// Mock timeline data - in real app, this would come from API
const generateTimeline = (reportDate: string) => [
  {
    id: 1,
    action: "Report Submitted",
    description: "Citizen reported the issue with photo evidence",
    date: reportDate,
    time: "09:30 AM",
    status: "completed",
    actor: "Citizen",
    icon: FileText,
  },
  {
    id: 2,
    action: "Initial Verification",
    description: "AI system analyzed the report and verified location accuracy",
    date: new Date(new Date(reportDate).getTime() + 2 * 60 * 60 * 1000).toISOString(),
    time: "11:45 AM",
    status: "completed",
    actor: "AI System",
    icon: CheckCircle,
  },
  {
    id: 3,
    action: "Department Assignment",
    description: "Report assigned to Public Works Department based on category",
    date: new Date(new Date(reportDate).getTime() + 4 * 60 * 60 * 1000).toISOString(),
    time: "01:15 PM",
    status: "completed",
    actor: "System",
    icon: Building,
  },
  {
    id: 4,
    action: "Officer Assigned",
    description: "Field officer Rajesh Kumar assigned for inspection",
    date: new Date(new Date(reportDate).getTime() + 24 * 60 * 60 * 1000).toISOString(),
    time: "10:00 AM",
    status: "completed",
    actor: "Supervisor",
    icon: User,
  },
  {
    id: 5,
    action: "Site Inspection",
    description: "Officer conducted site inspection and documented findings",
    date: new Date(new Date(reportDate).getTime() + 48 * 60 * 60 * 1000).toISOString(),
    time: "02:30 PM",
    status: "completed",
    actor: "Field Officer",
    icon: MapPin,
  },
  {
    id: 6,
    action: "Work Order Created",
    description: "Contractor work order generated for road repair",
    date: new Date(new Date(reportDate).getTime() + 72 * 60 * 60 * 1000).toISOString(),
    time: "11:00 AM",
    status: "in-progress",
    actor: "Department Head",
    icon: AlertCircle,
  },
  {
    id: 7,
    action: "Contractor Assignment",
    description: "ABC Construction assigned for repair work",
    date: new Date(new Date(reportDate).getTime() + 96 * 60 * 60 * 1000).toISOString(),
    time: "09:00 AM",
    status: "pending",
    actor: "Procurement",
    icon: Clock,
  },
];

// Mock officer data
const getOfficerDetails = (reportId: string) => ({
  name: "Rajesh Kumar Singh",
  designation: "Senior Field Inspector",
  department: "Public Works Department",
  phone: "+91-98765-43210",
  email: "rajesh.kumar@pwd.gov.in",
  experience: "8 years",
  zone: "Central Zone",
});

const ReportDialog: React.FC<ReportDialogProps> = ({ report, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("details");
  
  if (!report) return null;

  // Parse contractor data
  const parseContractors = (csvData: string) => {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {} as any);
    });
  };

  const contractors = parseContractors(contractorsData);
  const assignedContractor = contractors.find(c => c.contractor_id === report.assignedContractorId);

  const timeline = generateTimeline(report.createdAt || report.date);
  const officer = getOfficerDetails(report.id);
  
  // Generate scoring parameters if not available
  let scoringParams;
  let scoringBreakdown;
  
  try {
    scoringParams = report.scoringParams || generateReportScoring(report);
    scoringBreakdown = getScoringBreakdown(scoringParams);
  } catch (error) {
    console.error("Error generating scoring breakdown:", error);
    // Fallback scoring breakdown
    scoringBreakdown = {
      breakdown: {
        urgency: {
          weight: 0.30,
          score: 0,
          contribution: 0,
          description: "Community validation through upvotes, normalized by ward population"
        },
        duplicates: {
          weight: 0.15,
          score: 0,
          contribution: 0,
          description: "Multiple reports of same issue indicate water impact and prevent waste"
        },
        areaCriticality: {
          weight: 0.15,
          score: 0,
          contribution: 0,
          description: "Location importance (hospitals, schools > residential areas)"
        },
        reporterTrust: {
          weight: 0.10,
          score: 0,
          contribution: 0,
          description: "Reporter's historical accuracy reduces spam and fake reports"
        },
        aiSeverity: {
          weight: 0.10,
          score: 0,
          contribution: 0,
          description: "AI analysis of hazard level from photos and description"
        },
        age: {
          weight: 0.10,
          score: 0,
          contribution: 0,
          description: "Older unresolved issues automatically climb priority"
        },
        proofCompleteness: {
          weight: 0.07,
          score: 0,
          contribution: 0,
          description: "Well-documented reports (photo, description, GPS) are easier to act on"
        },
        eventFlag: {
          weight: 0.03,
          score: 0,
          contribution: 0,
          description: "Special situation flag (festival, emergency, election period)"
        }
      },
      totalScore: 0,
      formula: "Priority Score = (0.30×U)+(0.15×D)+(0.15×C)+(0.10×T)+(0.10×S)+(0.10×A)+(0.07×P)+(0.03×E)"
    };
  }
  
  const priorityInfo = getPriorityLevel(report.priorityScore || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Report #{report.id}
              </DialogTitle>
              <p className="text-gray-600 mt-1">{report.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg border-2 ${priorityInfo.bgColor}`}>
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-5 h-5 ${priorityInfo.color}`} />
                  <div>
                    <div className="text-sm font-medium text-gray-600">Priority Score</div>
                    <div className={`text-2xl font-bold ${priorityInfo.color}`}>
                      {report.priorityScore}
                    </div>
                  </div>
                </div>
              </div>
              <Badge className={priorityInfo.bgColor + " " + priorityInfo.color + " text-lg px-4 py-2"}>
                {priorityInfo.level}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Status & Actions
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="scoring" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Scoring
            </TabsTrigger>
          </TabsList>

          {/* Report Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Report Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Report Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <p className="text-gray-900 mt-1">{report.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Category</label>
                      <p className="text-gray-900 mt-1">{report.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <Badge className="mt-1">{report.status}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date Reported</label>
                      <p className="text-gray-900 mt-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(report.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Ward</label>
                      <p className="text-gray-900 mt-1">{report.ward?.name || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Location & Media */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location & Evidence
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-gray-900 mt-1">{report.location}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-xs font-medium text-gray-600">Latitude</label>
                      <p className="text-gray-900">28.6139° N</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Longitude</label>
                      <p className="text-gray-900">77.2090° E</p>
                    </div>
                  </div>
                  {report.image && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4" />
                        Photo Evidence
                      </label>
                      <img
                        src={report.image}
                        alt="Report evidence"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Status & Actions Tab */}
          <TabsContent value="status" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Location Map */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Report Location
                </h3>
                <div className="space-y-4">
                  <div className="h-64 rounded-lg overflow-hidden border">
                    <MapContainer
                      center={[report.latitude || 28.6139, report.longitude || 77.2090]}
                      zoom={15}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[report.latitude || 28.6139, report.longitude || 77.2090]}>
                        <Popup>
                          <div className="text-sm">
                            <strong>{report.title}</strong><br />
                            {report.address || report.location}<br />
                            Status: {report.status}<br />
                            Priority: {report.priorityScore || 'N/A'}
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-xs font-medium text-gray-600">Coordinates</label>
                      <p className="text-gray-900 mt-1">
                        {report.latitude?.toFixed(4) || '28.6139'}, {report.longitude?.toFixed(4) || '77.2090'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">Accuracy</label>
                      <p className="text-gray-900 mt-1">±5 meters</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Current Status */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Current Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <Badge className="mt-1 text-lg px-3 py-1">{report.status}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Progress</label>
                    <div className="mt-2">
                      <Progress value={report.status === 'RESOLVED' ? 100 : report.status === 'IN_PROGRESS' ? 60 : 20} className="h-3" />
                      <p className="text-sm text-gray-600 mt-1">
                        {report.status === 'RESOLVED' ? '100%' : report.status === 'IN_PROGRESS' ? '60%' : '20%'} Complete
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Expected Resolution</label>
                    <p className="text-gray-900 mt-1">
                      {report.status === 'RESOLVED' ? 'Completed' : 'Within 7-10 business days'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Updated</label>
                    <p className="text-gray-900 mt-1">
                      {new Date(report.updatedAt || report.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Assigned Contractor */}
            {assignedContractor && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Assigned Contractor
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{assignedContractor.contractor_name}</p>
                      <p className="text-sm text-gray-600">{assignedContractor.business_name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Department</label>
                      <p className="text-gray-900 mt-1">{assignedContractor.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Rating</label>
                      <p className="text-gray-900 mt-1">⭐ {assignedContractor.avg_rating}/5.0</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Public Contact</label>
                      <p className="text-gray-900 mt-1 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {assignedContractor.contact_phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Completion Rate</label>
                      <p className="text-gray-900 mt-1">{(assignedContractor.on_time_rate * 100).toFixed(0)}% on time</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Contractor
                    </Button>
                    <Button className="flex-1" variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Assigned Officer */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Assigned Officer
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{officer.name}</p>
                    <p className="text-sm text-gray-600">{officer.designation}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Department</label>
                    <p className="text-gray-900 mt-1 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      {officer.department}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Public Contact</label>
                    <p className="text-gray-900 mt-1 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {officer.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Experience</label>
                    <p className="text-gray-900 mt-1">{officer.experience}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Zone</label>
                    <p className="text-gray-900 mt-1">{officer.zone}</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Officer
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* History Timeline Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Complete Action History
              </h3>
              <div className="space-y-6">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  const isLast = index === timeline.length - 1;
                  const statusColors = {
                    completed: 'bg-green-100 text-green-600 border-green-200',
                    'in-progress': 'bg-blue-100 text-blue-600 border-blue-200',
                    pending: 'bg-gray-100 text-gray-600 border-gray-200',
                  };

                  return (
                    <div key={item.id} className="flex gap-4">
                      {/* Timeline line */}
                      <div className="flex flex-col items-center min-w-0">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${statusColors[item.status]}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {!isLast && (
                          <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{item.action}</h4>
                          <div className="text-sm text-gray-500">
                            {new Date(item.date).toLocaleDateString('en-IN')} • {item.time}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.actor}
                          </Badge>
                          <Badge className={`text-xs ${statusColors[item.status]}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Scoring Breakdown Tab */}
          <TabsContent value="scoring" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Priority Score Calculation
              </h3>
              <div className="mb-6">
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 ${priorityInfo.bgColor}`}>
                    <TrendingUp className={`w-8 h-8 ${priorityInfo.color}`} />
                    <div>
                      <div className="text-sm font-medium text-gray-600">Total Priority Score</div>
                      <div className={`text-3xl font-bold ${priorityInfo.color}`}>
                        {scoringBreakdown.totalScore}/100
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mb-4">
                  {scoringBreakdown.formula}
                </p>
              </div>

              {/* Parameter Breakdown */}
              <div className="space-y-4">
                {Object.entries(scoringBreakdown.breakdown).map(([key, param]) => {
                  const item = param as ScoringBreakdownItem;
                  return (
                    <div key={key} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium capitalize text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {Math.round(item.contribution * 100)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {(item.weight * 100).toFixed(0)}% × {(item.score * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Progress 
                            value={item.score * 100} 
                            className="h-2" 
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-600 min-w-0">
                          {(item.score * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Transparency Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Transparency & Fairness</h4>
                <p className="text-sm text-blue-800">
                  This scoring system ensures all reports are prioritized fairly based on objective criteria. 
                  The algorithm considers community impact, urgency, available evidence, and resource constraints 
                  to optimize response times and resource allocation.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;