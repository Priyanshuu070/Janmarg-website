import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getBadgeColors,
  getUrgencyFromScore,
  getIconColor,
} from "@/lib/badgeColors";
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
import { Textarea } from "@/components/ui/textarea";
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign as RupeeIcon,
  Clock,
  Star,
  FileText,
  Filter,
  Flag,
  Users,
  MapPin,
} from "lucide-react";

// Mock bidding data
const mockOpenReports = [
  {
    id: "RPT-001",
    title: "Pothole Repair on Station Road",
    description: "Large pothole on Station Road causing traffic issues",
    location: "Station Road & Albert Ekka Chowk",
    zone: "Ranchi Urban",
    estimatedBudget: 200000,
    urgency: "High",
    deadline: "2024-01-25",
    department: "Roads & Infrastructure",
    bids: [
      {
        id: "BID-001",
        contractor: "Jharkhand Construction Ltd",
        amount: 175000,
        timeline: "3 days",
        rating: 4.5,
        experience: "15 years",
        proposal:
          "We will use high-grade asphalt and complete the work during off-peak hours.",
        submittedDate: "2024-01-18",
        warranty: "2 years",
      },
      {
        id: "BID-002",
        contractor: "Steel City Infrastructure",
        amount: 220000,
        timeline: "2 days",
        rating: 4.2,
        experience: "12 years",
        proposal:
          "Quick completion with premium materials and traffic management.",
        submittedDate: "2024-01-19",
        warranty: "3 years",
      },
      {
        id: "BID-003",
        contractor: "Ranchi Municipal Works",
        amount: 155000,
        timeline: "4 days",
        rating: 3.8,
        experience: "8 years",
        proposal: "Cost-effective solution with standard materials.",
        submittedDate: "2024-01-17",
        warranty: "1 year",
      },
    ],
  },
  {
    id: "RPT-002",
    title: "Streetlight Installation",
    description: "Install new LED streetlights on Bistupur Main Road",
    location: "Bistupur Main Road (Sector 1-3)",
    zone: "Jamshedpur Industrial",
    estimatedBudget: 360000,
    urgency: "Medium",
    deadline: "2024-02-05",
    department: "Streetlights",
    bids: [
      {
        id: "BID-004",
        contractor: "Tata Power Solutions",
        amount: 335000,
        timeline: "5 days",
        rating: 4.7,
        experience: "20 years",
        proposal: "Energy-efficient LED installation with smart controls.",
        submittedDate: "2024-01-19",
        warranty: "5 years",
      },
      {
        id: "BID-005",
        contractor: "Jharkhand Electrical Works",
        amount: 380000,
        timeline: "4 days",
        rating: 4.1,
        experience: "10 years",
        proposal: "Premium LED system with motion sensors.",
        submittedDate: "2024-01-20",
        warranty: "3 years",
      },
    ],
  },
  {
    id: "RPT-003",
    title: "Water Main Repair",
    description: "Emergency water main repair",
    location: "Industrial Park Road",
    zone: "Industrial East",
    estimatedBudget: 640000,
    urgency: "High",
    deadline: "2024-01-22",
    department: "Water Supply",
    bids: [],
  },
];

const BiddingPage: React.FC = () => {
  const [sortBy, setSortBy] = useState("cost");
  const [selectedReport, setSelectedReport] = useState<
    (typeof mockOpenReports)[0] | null
  >(null);
  const [showBidsDialog, setShowBidsDialog] = useState(false);
  const [showNoBidsOnly, setShowNoBidsOnly] = useState(false);

  const getUrgencyBadge = (urgency: string) => {
    return <Badge className={getBadgeColors.urgency(urgency)}>{urgency}</Badge>;
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const sortBids = (bids: (typeof mockOpenReports)[0]["bids"]) => {
    const sorted = [...bids];
    switch (sortBy) {
      case "cost":
        return sorted.sort((a, b) => a.amount - b.amount);
      case "timeline":
        return sorted.sort(
          (a, b) => parseInt(a.timeline) - parseInt(b.timeline)
        );
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  };

  const approveBid = (reportId: string, bidId: string) => {
    console.log(`Approving bid ${bidId} for report ${reportId}`);
  };

  const rejectBid = (reportId: string, bidId: string) => {
    console.log(`Rejecting bid ${bidId} for report ${reportId}`);
  };

  const flagBid = (reportId: string, bidId: string) => {
    console.log(`Flagging bid ${bidId} for report ${reportId} as suspicious`);
  };

  const viewBids = (report: (typeof mockOpenReports)[0]) => {
    setSelectedReport(report);
    setShowBidsDialog(true);
  };

  const filteredReports = mockOpenReports.filter((report) =>
    showNoBidsOnly ? report.bids.length === 0 : true
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Bidding</h2>
          <p className="text-muted-foreground">
            Manage contractor bids and award contracts for open reports
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={showNoBidsOnly ? "default" : "outline"}
            onClick={() => setShowNoBidsOnly(!showNoBidsOnly)}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            No Bids Cases
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <FileText className={`w-5 h-5 ${getIconColor("info")}`} />
            <div>
              <div className="text-sm text-muted-foreground">Open Reports</div>
              <div className="text-2xl font-bold">{mockOpenReports.length}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className={`w-5 h-5 ${getIconColor("success")}`} />
            <div>
              <div className="text-sm text-muted-foreground">Total Bids</div>
              <div className="text-2xl font-bold">
                {mockOpenReports.reduce(
                  (sum, report) => sum + report.bids.length,
                  0
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${getIconColor("error")}`} />
            <div>
              <div className="text-sm text-muted-foreground">No Bids</div>
              <div className="text-2xl font-bold">
                {mockOpenReports.filter((r) => r.bids.length === 0).length}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <RupeeIcon className={`w-5 h-5 ${getIconColor("neutral")}`} />
            <div>
              <div className="text-sm text-muted-foreground">Total Budget</div>
              <div className="text-2xl font-bold">
                $
                {mockOpenReports
                  .reduce((sum, report) => sum + report.estimatedBudget, 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Bids</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{report.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.id}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{report.location}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.zone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{report.department}</TableCell>
                <TableCell>
                  ₹{report.estimatedBudget.toLocaleString()}
                </TableCell>
                <TableCell>{getUrgencyBadge(report.urgency)}</TableCell>
                <TableCell
                  className={
                    new Date(report.deadline) < new Date()
                      ? "text-red-500 font-medium"
                      : ""
                  }
                >
                  {report.deadline}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.bids.length === 0 ? "destructive" : "default"
                    }
                  >
                    {report.bids.length} bids
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => viewBids(report)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Bids
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        View Report Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Bids Detail Dialog */}
      <Dialog open={showBidsDialog} onOpenChange={setShowBidsDialog}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Bids for {selectedReport?.title} ({selectedReport?.id})
            </DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6">
              {/* Report Summary */}
              <Card className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Location
                    </div>
                    <div className="font-medium">{selectedReport.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Budget</div>
                    <div className="font-medium">
                      ₹{selectedReport.estimatedBudget.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Urgency</div>
                    <div>{getUrgencyBadge(selectedReport.urgency)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Deadline
                    </div>
                    <div className="font-medium">{selectedReport.deadline}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground">
                    Description
                  </div>
                  <div className="mt-1">{selectedReport.description}</div>
                </div>
              </Card>

              {selectedReport.bids.length === 0 ? (
                <Card className="p-8 text-center">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Bids Received
                  </h3>
                  <p className="text-muted-foreground">
                    This report hasn't received any contractor bids yet.
                    Consider adjusting the budget or deadline.
                  </p>
                </Card>
              ) : (
                <>
                  {/* Sort Controls */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cost">Lowest Cost</SelectItem>
                        <SelectItem value="timeline">
                          Fastest Timeline
                        </SelectItem>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bids List */}
                  <div className="space-y-4">
                    {sortBids(selectedReport.bids).map((bid, index) => (
                      <Card
                        key={bid.id}
                        className={`p-6 ${
                          index === 0 ? "ring-2 ring-blue-500" : ""
                        }`}
                      >
                        {index === 0 && (
                          <Badge className="mb-4 bg-blue-500">
                            Recommended
                          </Badge>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Contractor Info */}
                          <div>
                            <h4 className="font-semibold text-lg mb-2">
                              {bid.contractor}
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span>{bid.rating}</span>
                                <div className="flex">
                                  {getRatingStars(bid.rating)}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Experience: {bid.experience}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Warranty: {bid.warranty}
                              </div>
                            </div>
                          </div>

                          {/* Bid Details */}
                          <div>
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Bid Amount
                                </div>
                                <div className="text-2xl font-bold text-green-600">
                                  ₹{bid.amount.toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Timeline
                                </div>
                                <div className="font-medium">
                                  {bid.timeline}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Submitted
                                </div>
                                <div className="font-medium">
                                  {bid.submittedDate}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div>
                            <div className="mb-3">
                              <div className="text-sm text-muted-foreground">
                                Proposal
                              </div>
                              <div className="text-sm">{bid.proposal}</div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() =>
                                  approveBid(selectedReport.id, bid.id)
                                }
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  rejectBid(selectedReport.id, bid.id)
                                }
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  flagBid(selectedReport.id, bid.id)
                                }
                              >
                                <Flag className="w-4 h-4 mr-1" />
                                Flag
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BiddingPage;
