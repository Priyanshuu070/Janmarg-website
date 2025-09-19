import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getBadgeColors, getIconColor } from "@/lib/badgeColors";
import ReportMap from "@/components/ReportMap";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Forward,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  MapPin,
  Calendar,
  User,
} from "lucide-react";

// Mock reports data
const mockReports = [
  {
    id: "RPT-001",
    citizen: "Rajesh Kumar",
    citizenContact: "+91-9876543210",
    issueType: "Pothole",
    department: "Roads & Infrastructure",
    zone: "Ranchi Urban",
    ward: "RCH-W001",
    status: "In-Progress",
    urgency: "High",
    created: "2025-01-15",
    slaDeadline: "2025-01-20",
    description: "Large pothole on Station Road causing traffic issues",
    location: "Station Road & Albert Ekka Chowk",
    coordinates: { lat: 23.3441, lng: 85.3096 },
    photos: ["photo1.jpg"],
    assignedContractor: "Jharkhand Construction Ltd",
    estimatedCost: 2500,
  },
  {
    id: "RPT-002",
    citizen: "Priya Sharma",
    citizenContact: "+91-9876543211",
    issueType: "Streetlight Outage",
    department: "Streetlights",
    zone: "Jamshedpur Industrial",
    ward: "JSR-W001",
    status: "Pending",
    urgency: "Medium",
    created: "2025-01-16",
    slaDeadline: "2025-01-21",
    description: "Multiple streetlights not working on Bistupur Main Road",
    location: "Bistupur Main Road (Sector 1-3)",
    coordinates: { lat: 22.8046, lng: 86.2029 },
    photos: ["photo2.jpg", "photo3.jpg"],
    assignedContractor: null,
    estimatedCost: 1200,
  },
  {
    id: "RPT-003",
    citizen: "Vikash Singh",
    citizenContact: "+91-9876543212",
    issueType: "Water Leak",
    department: "Water Supply",
    zone: "Dhanbad Mining",
    ward: "DHN-W001",
    status: "Resolved",
    urgency: "High",
    created: "2025-01-10",
    slaDeadline: "2025-01-15",
    description: "Major water leak causing flooding",
    location: "Coal Mines Area Road",
    coordinates: { lat: 23.7957, lng: 86.4304 },
    photos: ["photo4.jpg"],
    assignedContractor: "Jharkhand Water Solutions",
    estimatedCost: 4500,
    resolvedDate: "2025-01-14",
  },
  {
    id: "RPT-004",
    citizen: "Sunita Devi",
    citizenContact: "+91-9876543213",
    issueType: "Garbage Collection",
    department: "Sanitation",
    zone: "Bokaro Steel City",
    ward: "BOK-W001",
    status: "Pending",
    urgency: "Low",
    created: "2025-01-17",
    slaDeadline: "2025-01-24",
    description: "Missed garbage collection for 3 days",
    location: "Sector 4, Steel City Area",
    coordinates: { lat: 23.6693, lng: 86.1511 },
    photos: [],
    assignedContractor: null,
    estimatedCost: 0,
  },
];

const ReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<
    (typeof mockReports)[0] | null
  >(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    return <Badge className={getBadgeColors.status(status)}>{status}</Badge>;
  };

  const getUrgencyBadge = (urgency: string) => {
    return <Badge className={getBadgeColors.urgency(urgency)}>{urgency}</Badge>;
  };

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    const matchesUrgency =
      urgencyFilter === "all" || report.urgency === urgencyFilter;
    const matchesZone = zoneFilter === "all" || report.zone === zoneFilter;

    return matchesSearch && matchesStatus && matchesUrgency && matchesZone;
  });

  const changeStatus = (reportId: string, newStatus: string) => {
    console.log(`Changing status of ${reportId} to ${newStatus}`);
  };

  const forwardReport = (reportId: string, target: string) => {
    console.log(`Forwarding report ${reportId} to ${target}`);
  };

  const downloadReport = (reportId: string) => {
    console.log(`Downloading report ${reportId} as PDF`);
  };

  const openReportDetail = (report: (typeof mockReports)[0]) => {
    setSelectedReport(report);
    setShowDetailDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground">
            Monitor and manage citizen reports and service requests
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In-Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgency</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={zoneFilter} onValueChange={setZoneFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="Central Business District">
                Central Business District
              </SelectItem>
              <SelectItem value="Residential North">
                Residential North
              </SelectItem>
              <SelectItem value="Industrial East">Industrial East</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Reports Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Citizen</TableHead>
              <TableHead>Issue Type</TableHead>
              <TableHead>Zone/Ward</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>SLA Deadline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.id}</TableCell>
                <TableCell>{report.citizen}</TableCell>
                <TableCell>{report.issueType}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{report.zone}</div>
                    <div className="text-muted-foreground">{report.ward}</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(report.status)}</TableCell>
                <TableCell>{getUrgencyBadge(report.urgency)}</TableCell>
                <TableCell>{report.created}</TableCell>
                <TableCell
                  className={
                    new Date(report.slaDeadline) < new Date() &&
                    report.status !== "Resolved"
                      ? "text-red-500 font-medium"
                      : ""
                  }
                >
                  {report.slaDeadline}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => openReportDetail(report)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Report
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => downloadReport(report.id)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changeStatus(report.id, "In-Progress")}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changeStatus(report.id, "Resolved")}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => forwardReport(report.id, "contractor")}
                      >
                        <Forward className="mr-2 h-4 w-4" />
                        Forward to Contractor
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Report Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Details - {selectedReport?.id}</DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Citizen Information
                      </Label>
                      <div className="mt-1 p-3 bg-muted rounded-lg">
                        <div className="font-medium">
                          {selectedReport.citizen}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {selectedReport.citizenContact}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Issue Details
                      </Label>
                      <div className="mt-1 p-3 bg-muted rounded-lg">
                        <div className="font-medium">
                          {selectedReport.issueType}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {selectedReport.department}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Status & Priority
                      </Label>
                      <div className="mt-1 p-3 bg-muted rounded-lg">
                        <div className="flex gap-2 mb-2">
                          {getStatusBadge(selectedReport.status)}
                          {getUrgencyBadge(selectedReport.urgency)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Created: {selectedReport.created}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          SLA Deadline: {selectedReport.slaDeadline}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Assignment</Label>
                      <div className="mt-1 p-3 bg-muted rounded-lg">
                        <div className="font-medium">
                          {selectedReport.assignedContractor || "Not Assigned"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Estimated Cost: $
                          {selectedReport.estimatedCost.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <div className="mt-1 p-3 bg-muted rounded-lg">
                      {selectedReport.description}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Location Details
                    </Label>
                    <div className="mt-1 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">
                          {selectedReport.location}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Zone: {selectedReport.zone} | Ward:{" "}
                        {selectedReport.ward}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Coordinates: {selectedReport.coordinates.lat},{" "}
                        {selectedReport.coordinates.lng}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Interactive Map
                    </Label>
                    <div className="mt-2">
                      <ReportMap report={selectedReport} height="300px" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="photos" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Photos ({selectedReport.photos.length})
                    </Label>
                    <div className="mt-1 grid grid-cols-2 gap-4">
                      {selectedReport.photos.length > 0 ? (
                        selectedReport.photos.map((photo, index) => (
                          <div
                            key={index}
                            className="h-32 bg-muted rounded-lg flex items-center justify-center"
                          >
                            <div className="text-center">
                              <FileText className="w-8 h-8 mx-auto mb-1 text-muted-foreground" />
                              <div className="text-sm text-muted-foreground">
                                {photo}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 h-32 bg-muted rounded-lg flex items-center justify-center">
                          <div className="text-muted-foreground">
                            No photos available
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Activity History
                    </Label>
                    <div className="mt-1 space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">Report Created</span>
                          <span className="text-muted-foreground">
                            - {selectedReport.created}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Initial report submitted by {selectedReport.citizen}
                        </div>
                      </div>

                      {selectedReport.status === "Resolved" &&
                        selectedReport.resolvedDate && (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle
                                className={`w-4 h-4 ${getIconColor("success")}`}
                              />
                              <span className="font-medium">
                                Report Resolved
                              </span>
                              <span className="text-muted-foreground">
                                - {selectedReport.resolvedDate}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Completed by {selectedReport.assignedContractor}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <FileText className={`w-5 h-5 ${getIconColor("info")}`} />
            <div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
              <div className="text-2xl font-bold">{mockReports.length}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${getIconColor("warning")}`} />
            <div>
              <div className="text-sm text-muted-foreground">Pending</div>
              <div className="text-2xl font-bold">
                {mockReports.filter((r) => r.status === "Pending").length}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className={`w-5 h-5 ${getIconColor("success")}`} />
            <div>
              <div className="text-sm text-muted-foreground">Resolved</div>
              <div className="text-2xl font-bold">
                {mockReports.filter((r) => r.status === "Resolved").length}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${getIconColor("error")}`} />
            <div>
              <div className="text-sm text-muted-foreground">SLA Breaches</div>
              <div className="text-2xl font-bold">
                {
                  mockReports.filter(
                    (r) =>
                      new Date(r.slaDeadline) < new Date() &&
                      r.status !== "Resolved"
                  ).length
                }
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
