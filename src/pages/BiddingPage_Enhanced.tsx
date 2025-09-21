import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Users,
  MapPin,
  TrendingUp,
  Award,
  Gavel,
  UserCheck,
  Calendar,
  Target,
  PieChart,
  BarChart3,
  Wallet,
  ShieldCheck,
  AlertCircle,
  Plus,
  Search,
  Phone,
  Mail,
  Building,
  Trophy,
  Timer,
  Zap,
  Filter,
} from "lucide-react";
import { 
  mockEnhancedReports, 
  mockContractors, 
  calculateBiddingStats, 
  budgetData,
  EnhancedReport,
  EnhancedBid,
  Contractor 
} from "@/data/biddingData";
import { toast } from "sonner";

const BiddingPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<EnhancedReport | null>(null);
  const [showBidsDialog, setShowBidsDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showContractorDialog, setShowContractorDialog] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [sortBy, setSortBy] = useState<'cost' | 'timeline' | 'rating'>('cost');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'under_review' | 'awarded' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedBids, setSelectedBids] = useState<string[]>([]);

  // Calculate statistics
  const stats = useMemo(() => calculateBiddingStats(mockEnhancedReports), []);

  // Filter and search reports
  const filteredReports = useMemo(() => {
    return mockEnhancedReports.filter(report => {
      const matchesStatus = filterStatus === 'all' || report.biddingStatus === filterStatus;
      const matchesSearch = searchQuery === '' || 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }, [filterStatus, searchQuery]);

  // Get urgency badge
  const getUrgencyBadge = (urgency: string) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'High': 'bg-orange-100 text-orange-800 border-orange-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-green-100 text-green-800 border-green-200'
    };
    return <Badge className={colors[urgency as keyof typeof colors] || colors.Medium}>{urgency}</Badge>;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const colors = {
      'open': 'bg-blue-100 text-blue-800 border-blue-200',
      'under_review': 'bg-purple-100 text-purple-800 border-purple-200',
      'awarded': 'bg-green-100 text-green-800 border-green-200',
      'closed': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    const labels = {
      'open': 'Bidding Open',
      'under_review': 'Under Review',
      'awarded': 'Awarded',
      'closed': 'Closed'
    };
    return <Badge className={colors[status as keyof typeof colors] || colors.open}>
      {labels[status as keyof typeof labels] || status}
    </Badge>;
  };

  // Get contractor trust badge
  const getTrustBadge = (trustLevel: string) => {
    const colors = {
      'Trusted': 'bg-green-100 text-green-800 border-green-200',
      'Verified': 'bg-blue-100 text-blue-800 border-blue-200',
      'New': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Flagged': 'bg-red-100 text-red-800 border-red-200'
    };
    return <Badge className={colors[trustLevel as keyof typeof colors] || colors.New}>{trustLevel}</Badge>;
  };

  // Sort bids
  const sortBids = (bids: EnhancedBid[]) => {
    return [...bids].sort((a, b) => {
      switch (sortBy) {
        case 'cost':
          return a.amount - b.amount;
        case 'timeline':
          return a.estimatedDuration - b.estimatedDuration;
        case 'rating':
          return b.contractor.rating - a.contractor.rating;
        default:
          return 0;
      }
    });
  };

  // Action handlers
  const approveBid = (reportId: string, bidId: string) => {
    toast.success(`Bid ${bidId} approved for report ${reportId}`, {
      description: "Contract will be awarded to the selected contractor"
    });
    setShowBidsDialog(false);
  };

  const rejectBid = (reportId: string, bidId: string) => {
    toast.error(`Bid ${bidId} rejected for report ${reportId}`);
  };

  const flagBid = (reportId: string, bidId: string) => {
    toast.warning(`Bid ${bidId} flagged for review`);
  };

  const assignContractor = (reportId: string, contractorId: string) => {
    const contractor = mockContractors.find(c => c.id === contractorId);
    toast.success(`Report ${reportId} assigned to ${contractor?.name}`);
    setShowAssignDialog(false);
  };

  const viewBids = (report: EnhancedReport) => {
    setSelectedReport(report);
    setShowBidsDialog(true);
  };

  const viewContractor = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setShowContractorDialog(true);
  };

  const getBestBidRecommendation = (bids: EnhancedBid[]) => {
    if (bids.length === 0) return null;
    
    // Score bids based on multiple factors
    const scoredBids = bids.map(bid => {
      const costScore = (1 - (bid.amount / Math.max(...bids.map(b => b.amount)))) * 0.4;
      const timeScore = (1 - (bid.estimatedDuration / Math.max(...bids.map(b => b.estimatedDuration)))) * 0.3;
      const ratingScore = (bid.contractor.rating / 5) * 0.3;
      const totalScore = costScore + timeScore + ratingScore;
      
      return { ...bid, score: totalScore };
    });

    return scoredBids.sort((a, b) => b.score - a.score)[0];
  };

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'overdue', color: 'text-red-600', label: `${Math.abs(diffDays)} days overdue` };
    if (diffDays <= 2) return { status: 'urgent', color: 'text-orange-600', label: `${diffDays} days left` };
    if (diffDays <= 7) return { status: 'soon', color: 'text-yellow-600', label: `${diffDays} days left` };
    return { status: 'normal', color: 'text-green-600', label: `${diffDays} days left` };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contractor Bidding Management</h1>
          <p className="text-muted-foreground">
            Manage contractor bids, award contracts, and monitor project assignments
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Tender
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm text-muted-foreground">Open Reports</div>
              <div className="text-2xl font-bold">{stats.totalReports}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-muted-foreground">Total Bids</div>
              <div className="text-2xl font-bold">{stats.totalBids}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <div className="text-sm text-muted-foreground">No Bids</div>
              <div className="text-2xl font-bold">{stats.reportsWithNoBids}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-sm text-muted-foreground">Avg Bids/Report</div>
              <div className="text-2xl font-bold">{stats.avgBidsPerReport}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            <div>
              <div className="text-sm text-muted-foreground">Awarded</div>
              <div className="text-2xl font-bold">{stats.awardedContracts}</div>
              <div className="text-xs text-muted-foreground">vs {stats.pendingAwards} pending</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-sm text-muted-foreground">Total Spend</div>
              <div className="text-lg font-bold">{formatCurrency(stats.totalSpentSoFar)}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <div>
              <div className="text-sm text-muted-foreground">Budget Used</div>
              <div className="text-2xl font-bold">{stats.budgetUtilization}%</div>
              <Progress value={stats.budgetUtilization} className="h-1 mt-1" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search reports, locations, departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* Status Filter */}
            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Bidding Open</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                No Bids Alerts
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Urgent Deadlines
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Reports Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Bids</TableHead>
              <TableHead>Last Bid At</TableHead>
              <TableHead>Est. Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => {
              const deadlineStatus = getDeadlineStatus(report.deadline);
              const bestBid = getBestBidRecommendation(report.bids);
              
              return (
                <TableRow key={report.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{report.title}</div>
                      <div className="text-sm text-muted-foreground">{report.id}</div>
                      <div className="text-xs text-blue-600">Priority: {report.priorityScore}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{report.location}</div>
                      <div className="text-sm text-muted-foreground">{report.zone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{report.department?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatCurrency(report.estimatedBudget)}</div>
                      {bestBid && (
                        <div className="text-xs text-green-600">
                          Best: {formatCurrency(bestBid.amount)}
                          {bestBid.amount < report.estimatedBudget && (
                            <span className="text-green-600 ml-1">
                              ↓ {formatCurrency(report.estimatedBudget - bestBid.amount)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.biddingStatus)}</TableCell>
                  <TableCell>{getUrgencyBadge(report.urgency)}</TableCell>
                  <TableCell className={deadlineStatus.color}>
                    <div>{report.deadline}</div>
                    <div className="text-xs">{deadlineStatus.label}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={report.bids.length === 0 ? "destructive" : "default"}>
                        {report.bids.length} bid{report.bids.length !== 1 ? 's' : ''}
                      </Badge>
                      {bestBid && (
                        <ShieldCheck className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {report.lastBidAt ? (
                      <div className="text-sm">
                        {formatDate(report.lastBidAt)}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">No bids</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {bestBid ? (
                      <div className="flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        <span>{bestBid.estimatedDuration} days</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
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
                          View Bids ({report.bids.length})
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedReport(report);
                          setShowAssignDialog(true);
                        }}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Assign Contractor
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Report Details
                        </DropdownMenuItem>
                        {report.bids.length === 0 && (
                          <DropdownMenuItem className="text-orange-600">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Re-float Tender
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bid Distribution Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Bid Distribution by Department
          </h3>
          <div className="space-y-3">
            {['Roads & Infrastructure', 'Electrical & Lighting', 'Water Supply', 'Parks & Recreation'].map((dept, index) => (
              <div key={dept} className="flex items-center justify-between">
                <span className="text-sm">{dept}</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${[65, 45, 30, 20][index]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{[8, 5, 3, 2][index]}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Budget Utilization */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Budget Utilization
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Allocated</span>
                <span>{formatCurrency(budgetData.totalAllocated)}</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Committed</span>
                <span>{formatCurrency(budgetData.totalCommitted)}</span>
              </div>
              <Progress value={(budgetData.totalCommitted / budgetData.totalAllocated) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Spent</span>
                <span>{formatCurrency(budgetData.totalSpent)}</span>
              </div>
              <Progress value={(budgetData.totalSpent / budgetData.totalAllocated) * 100} className="h-2" />
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between font-medium">
                <span>Available</span>
                <span className="text-green-600">{formatCurrency(budgetData.available)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Top Contractors */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Top Contractors by Bids
          </h3>
          <div className="space-y-3">
            {mockContractors.slice(0, 5).map((contractor, index) => (
              <div key={contractor.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{contractor.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {contractor.rating}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">{[5, 3, 2, 2, 1][index]} bids</div>
                  <div className="text-xs text-muted-foreground">{contractor.completedProjects} projects</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Enhanced Bids Dialog */}
      <Dialog open={showBidsDialog} onOpenChange={setShowBidsDialog}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              Bids for {selectedReport?.title} ({selectedReport?.id})
            </DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6">
              {/* Report Summary */}
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium">{selectedReport.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Budget</div>
                    <div className="font-medium">{formatCurrency(selectedReport.estimatedBudget)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Urgency</div>
                    <div>{getUrgencyBadge(selectedReport.urgency)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Deadline</div>
                    <div className="font-medium">{selectedReport.deadline}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Priority Score</div>
                    <div className="font-bold text-blue-600">{selectedReport.priorityScore}/100</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground">Description</div>
                  <div className="mt-1">{selectedReport.description}</div>
                </div>
              </Card>

              {selectedReport.bids.length === 0 ? (
                <Card className="p-8 text-center">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                  <h3 className="text-lg font-semibold mb-2">No Bids Received</h3>
                  <p className="text-muted-foreground mb-4">
                    This report hasn't received any contractor bids yet.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Re-float Tender
                    </Button>
                    <Button variant="outline">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Emergency Assignment
                    </Button>
                  </div>
                </Card>
              ) : (
                <>
                  {/* Bid Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">Sort by:</span>
                      <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cost">Lowest Cost</SelectItem>
                          <SelectItem value="timeline">Fastest Timeline</SelectItem>
                          <SelectItem value="rating">Highest Rating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Compare Bids
                      </Button>
                      <Button size="sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Auto-Suggest Best
                      </Button>
                    </div>
                  </div>

                  {/* Bids List */}
                  <div className="space-y-4">
                    {sortBids(selectedReport.bids).map((bid, index) => {
                      const isRecommended = bid.id === getBestBidRecommendation(selectedReport.bids)?.id;
                      const savings = selectedReport.estimatedBudget - bid.amount;
                      
                      return (
                        <Card key={bid.id} className={`p-6 ${isRecommended ? 'ring-2 ring-green-500 bg-green-50' : ''}`}>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg">{bid.contractor.name}</h4>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    {bid.contractor.rating}
                                  </span>
                                  <span>{bid.contractor.experience}</span>
                                  <span>{bid.contractor.completedProjects} projects</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {isRecommended && (
                                <Badge className="bg-green-100 text-green-800">
                                  <Trophy className="w-3 h-3 mr-1" />
                                  Recommended
                                </Badge>
                              )}
                              {getTrustBadge(bid.contractor.trustLevel)}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Financial Details */}
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-muted-foreground">Bid Amount</div>
                                <div className="text-2xl font-bold text-green-600">
                                  {formatCurrency(bid.amount)}
                                </div>
                                {savings > 0 && (
                                  <div className="text-sm text-green-600">
                                    ↓ Saves {formatCurrency(savings)}
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Bond Amount</div>
                                <div className="font-medium">{formatCurrency(bid.bondAmount)}</div>
                              </div>
                            </div>

                            {/* Timeline & Performance */}
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-muted-foreground">Estimated Duration</div>
                                <div className="font-bold text-blue-600 flex items-center gap-1">
                                  <Timer className="w-4 h-4" />
                                  {bid.estimatedDuration} days
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">On-time Delivery</div>
                                <div className="font-medium">{bid.contractor.onTimeDelivery}%</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Warranty</div>
                                <div className="font-medium">{bid.warranty}</div>
                              </div>
                            </div>

                            {/* Compliance & Details */}
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-muted-foreground">Submitted</div>
                                <div className="font-medium">{formatDate(bid.submittedAt)}</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Payment Terms</div>
                                <div className="text-sm">{bid.paymentTerms}</div>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="w-4 h-4 text-green-600" />
                                <span>All compliances verified</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-muted-foreground mb-2">Proposal</div>
                                <div className="text-sm bg-gray-50 p-3 rounded">{bid.proposal}</div>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => approveBid(selectedReport.id, bid.id)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Award Contract
                                </Button>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => viewContractor(bid.contractor)}
                                    className="flex-1"
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Profile
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => rejectBid(selectedReport.id, bid.id)}
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contractor Assignment Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Contractor</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="contractor-select">Select Contractor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a contractor" />
                </SelectTrigger>
                <SelectContent>
                  {mockContractors.map((contractor) => (
                    <SelectItem key={contractor.id} value={contractor.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{contractor.name}</span>
                        <div className="flex items-center gap-2 ml-4">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-sm">{contractor.rating}</span>
                          {getTrustBadge(contractor.trustLevel)}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => assignContractor(selectedReport?.id || '', 'CONT-001')}>
                Assign Contractor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contractor Profile Dialog */}
      <Dialog open={showContractorDialog} onOpenChange={setShowContractorDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              {selectedContractor?.name} - Contractor Profile
            </DialogTitle>
          </DialogHeader>

          {selectedContractor && (
            <div className="space-y-6">
              {/* Header Info */}
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{selectedContractor.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{selectedContractor.rating}/5.0 Rating</span>
                      </div>
                      <div>{selectedContractor.experience} Experience</div>
                      <div>{getTrustBadge(selectedContractor.trustLevel)}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div>{selectedContractor.completedProjects} Projects Completed</div>
                      <div>{selectedContractor.onTimeDelivery}% On-time Delivery</div>
                      <div>Avg Cost: {formatCurrency(selectedContractor.averageCost)}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Contact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{selectedContractor.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{selectedContractor.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Tabs defaultValue="performance" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="specializations">Specializations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedContractor.performance.qualityScore}
                      </div>
                      <div className="text-sm text-muted-foreground">Quality Score</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedContractor.performance.timelyCompletion}%
                      </div>
                      <div className="text-sm text-muted-foreground">Timely Completion</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedContractor.performance.budgetAdherence}%
                      </div>
                      <div className="text-sm text-muted-foreground">Budget Adherence</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedContractor.performance.customerSatisfaction}
                      </div>
                      <div className="text-sm text-muted-foreground">Customer Rating</div>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="financials" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-xl font-bold">
                        {formatCurrency(selectedContractor.financials.avgBidAmount)}
                      </div>
                      <div className="text-sm text-muted-foreground">Average Bid Amount</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-xl font-bold">
                        {formatCurrency(selectedContractor.financials.totalEarned)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Earned</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-xl font-bold">
                        {formatCurrency(selectedContractor.financials.bondAmount)}
                      </div>
                      <div className="text-sm text-muted-foreground">Bond Amount</div>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="specializations" className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedContractor.specializations.map((spec) => (
                      <Badge key={spec} variant="outline" className="px-3 py-1">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BiddingPage;