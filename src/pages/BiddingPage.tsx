import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { Input } from "@/components/ui/input";
import {
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Star,
  FileText,
  Users,
  MapPin,
  Award,
  Gavel,
  UserCheck,
  Target,
  Plus,
  Search,
  Building,
  Timer,
  Shield
} from "lucide-react";
import {
  mockEnhancedReports,
  mockContractors,
  calculateBiddingStats,
  EnhancedReport,
  EnhancedBid,
  Contractor
} from "@/data/biddingData";
import { getForwardedReports } from "@/utils/forwardedReports";
import { toast } from "sonner";

const BiddingPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<EnhancedReport | null>(null);
  const [showBidsDialog, setShowBidsDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showCreateTenderDialog, setShowCreateTenderDialog] = useState(false);
  const [showContractorProfile, setShowContractorProfile] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [sortBy, setSortBy] = useState<'cost' | 'timeline' | 'rating'>('cost');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'under_review' | 'awarded' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // New tender form state
  const [newTenderForm, setNewTenderForm] = useState({
    title: '',
    description: '',
    location: '',
    zone: '',
    department: '',
    estimatedBudget: '',
    urgency: 'Medium' as 'Low' | 'Medium' | 'High' | 'Critical',
    deadline: '',
    category: ''
  });

  // Combine mock reports with forwarded reports
  const allReports = useMemo(() => {
    const forwarded = getForwardedReports();
    return [...mockEnhancedReports, ...forwarded];
  }, []);

  // Calculate statistics
  const stats = useMemo(() => calculateBiddingStats(allReports), [allReports]);

  // Filter and search reports
  const filteredReports = useMemo(() => {
    return allReports.filter(report => {
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
      'open': 'Open',
      'under_review': 'Review',
      'awarded': 'Awarded',
      'closed': 'Closed'
    };
    return <Badge className={colors[status as keyof typeof colors] || colors.open}>
      {labels[status as keyof typeof labels] || status}
    </Badge>;
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
    toast.success(`Bid approved successfully`, {
      description: "Contract will be awarded to the selected contractor"
    });
    setShowBidsDialog(false);
  };

  const rejectBid = (reportId: string, bidId: string) => {
    toast.error(`Bid rejected`);
  };

  const assignContractor = (reportId: string, contractorId: string) => {
    const contractor = mockContractors.find(c => c.id === contractorId);
    toast.success(`Contractor assigned successfully`);
    setShowAssignDialog(false);
  };

  const createTender = () => {
    // Validate form
    if (!newTenderForm.title || !newTenderForm.description || !newTenderForm.location ||
        !newTenderForm.zone || !newTenderForm.department || !newTenderForm.estimatedBudget ||
        !newTenderForm.deadline || !newTenderForm.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create new tender object
    const newTender: EnhancedReport = {
      id: `RPT-${String(mockEnhancedReports.length + 1).padStart(3, '0')}`,
      title: newTenderForm.title,
      description: newTenderForm.description,
      location: newTenderForm.location,
      zone: newTenderForm.zone,
      department: newTenderForm.department,
      estimatedBudget: parseInt(newTenderForm.estimatedBudget),
      urgency: newTenderForm.urgency,
      deadline: newTenderForm.deadline,
      createdAt: new Date().toISOString(),
      biddingStatus: 'open',
      category: newTenderForm.category,
      priorityScore: newTenderForm.urgency === 'Critical' ? 95 :
                   newTenderForm.urgency === 'High' ? 80 :
                   newTenderForm.urgency === 'Medium' ? 60 : 40,
      bids: []
    };

    // In a real app, this would be sent to an API
    // For now, we'll just show a success message
    toast.success('New tender created successfully!', {
      description: `${newTender.title} is now open for bidding`
    });

    // Reset form and close dialog
    setNewTenderForm({
      title: '',
      description: '',
      location: '',
      zone: '',
      department: '',
      estimatedBudget: '',
      urgency: 'Medium',
      deadline: '',
      category: ''
    });
    setShowCreateTenderDialog(false);
  };

  const viewBids = (report: EnhancedReport) => {
    setSelectedReport(report);
    setShowBidsDialog(true);
  };

  const getBestBidRecommendation = (bids: EnhancedBid[]) => {
    if (bids.length === 0) return null;

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
      day: 'numeric'
    });
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contract Bidding</h1>
          <p className="text-muted-foreground mt-1">
            Manage contractor bids and award contracts efficiently
          </p>
        </div>

        <Button onClick={() => setShowCreateTenderDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Tender
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Tenders</p>
                <p className="text-3xl font-bold">{stats.totalReports}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bids</p>
                <p className="text-3xl font-bold">{stats.totalBids}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Awarded</p>
                <p className="text-3xl font-bold">{stats.awardedContracts}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Budget Used</p>
                <p className="text-3xl font-bold">{stats.budgetUtilization}%</p>
                <Progress value={stats.budgetUtilization} className="h-2 mt-2" />
              </div>
              <Target className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tenders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tenders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReports.map((report) => {
          const deadlineStatus = getDeadlineStatus(report.deadline);
          const bestBid = getBestBidRecommendation(report.bids);

          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{report.title}</CardTitle>
                    <CardDescription className="mt-1">{report.id}</CardDescription>
                  </div>
                  {getStatusBadge(report.biddingStatus)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-semibold">{formatCurrency(report.estimatedBudget)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deadline</p>
                    <p className={`font-semibold ${deadlineStatus.color}`}>
                      {formatDate(report.deadline)}
                    </p>
                  </div>
                </div>

                {/* Location & Department */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{report.location}</span>
                  <span className="mx-2">•</span>
                  <Building className="w-4 h-4" />
                  <span>{report.department}</span>
                </div>

                {/* Urgency & Priority */}
                <div className="flex items-center justify-between">
                  {getUrgencyBadge(report.urgency)}
                  <div className="text-sm text-muted-foreground">
                    Priority: {report.priorityScore}
                  </div>
                </div>

                {/* Bids Summary */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Bids Received</span>
                    <Badge variant={report.bids.length === 0 ? "destructive" : "default"}>
                      {report.bids.length}
                    </Badge>
                  </div>

                  {bestBid && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Best Offer</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(bestBid.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration</span>
                        <span className="flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          {bestBid.estimatedDuration} days
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getRatingStars(bestBid.contractor.rating)}
                        <span className="text-xs text-muted-foreground ml-1">
                          {bestBid.contractor.name}
                        </span>
                      </div>
                    </div>
                  )}

                  {report.bids.length === 0 && (
                    <p className="text-sm text-muted-foreground">No bids received yet</p>
                  )}
                </div>

                {/* Completion Progress for Awarded Tenders */}
                {report.biddingStatus === 'awarded' && report.completionStatus && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">Work Progress</span>
                      <Badge variant="outline" className={
                        report.completionStatus === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
                        report.completionStatus === 'in_progress' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        'bg-gray-100 text-gray-800 border-gray-300'
                      }>
                        {report.completionStatus === 'completed' ? 'Completed' :
                         report.completionStatus === 'in_progress' ? 'In Progress' :
                         report.completionStatus === 'not_started' ? 'Not Started' : 'Delayed'}
                      </Badge>
                    </div>
                    <Progress
                      value={
                        report.completionStatus === 'completed' ? 100 :
                        report.completionStatus === 'in_progress' ? 65 :
                        report.completionStatus === 'not_started' ? 5 : 25
                      }
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-xs text-blue-700 mt-1">
                      <span>Awarded: {report.awardedAt ? formatDate(report.awardedAt.split('T')[0]) : 'N/A'}</span>
                      <span>{report.awardedBy || 'Municipal Authority'}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => viewBids(report)}
                    disabled={report.bids.length === 0}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Bids
                  </Button>

                  {report.biddingStatus === 'open' && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedReport(report);
                        setShowAssignDialog(true);
                      }}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Award
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tenders found</h3>
            <p className="text-muted-foreground">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first tender to get started'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Bids Dialog */}
      <Dialog open={showBidsDialog} onOpenChange={setShowBidsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              Bids for {selectedReport?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6">
              {/* Tender Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Budget</p>
                      <p className="font-semibold">{formatCurrency(selectedReport.estimatedBudget)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deadline</p>
                      <p className="font-semibold">{formatDate(selectedReport.deadline)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Bids</p>
                      <p className="font-semibold">{selectedReport.bids.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      {getStatusBadge(selectedReport.biddingStatus)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Sort by:</span>
                <div className="flex gap-2">
                  {[
                    { value: 'cost', label: 'Lowest Cost' },
                    { value: 'timeline', label: 'Fastest Delivery' },
                    { value: 'rating', label: 'Highest Rated' }
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={sortBy === option.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy(option.value as any)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bids List */}
              <div className="space-y-4">
                {sortBids(selectedReport.bids).map((bid, index) => (
                  <Card key={bid.id} className={index === 0 ? 'border-green-200 bg-green-50/50' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{bid.contractor.name}</h3>
                            {index === 0 && <Badge className="bg-green-100 text-green-800">Recommended</Badge>}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-muted-foreground">Bid Amount</p>
                              <p className="font-semibold text-lg">{formatCurrency(bid.amount)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Duration</p>
                              <p className="font-semibold">{bid.estimatedDuration} days</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Rating</p>
                              <div className="flex items-center gap-1">
                                {getRatingStars(bid.contractor.rating)}
                                <span className="ml-1">({bid.contractor.rating})</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Submitted</p>
                              <p className="font-semibold">{formatDate(bid.submittedAt)}</p>
                            </div>
                          </div>

                          {bid.proposal && (
                            <div className="mb-3">
                              <p className="text-muted-foreground text-sm">Proposal</p>
                              <p className="text-sm bg-gray-50 p-2 rounded">{bid.proposal}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.info(`Viewing ${bid.contractor.name}'s profile`)}
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Profile
                          </Button>

                          {selectedReport.biddingStatus === 'open' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => approveBid(selectedReport.id, bid.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => rejectBid(selectedReport.id, bid.id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Contractor Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Award Contract: {selectedReport?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6">
              {/* Tender Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Budget</p>
                      <p className="font-semibold text-lg">{formatCurrency(selectedReport.estimatedBudget)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deadline</p>
                      <p className="font-semibold">{formatDate(selectedReport.deadline)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Bids</p>
                      <p className="font-semibold text-lg">{selectedReport.bids.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Best Bid</p>
                      <p className="font-semibold text-green-600">
                        {selectedReport.bids.length > 0
                          ? formatCurrency(Math.min(...selectedReport.bids.map(b => b.amount)))
                          : 'No bids'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bid Comparison Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bid Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Contractor</th>
                          <th className="text-left p-2">Bid Amount</th>
                          <th className="text-left p-2">Duration</th>
                          <th className="text-left p-2">Rating</th>
                          <th className="text-left p-2">Experience</th>
                          <th className="text-left p-2">Compliance</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReport.bids
                          .sort((a, b) => a.amount - b.amount)
                          .map((bid) => (
                          <tr key={bid.id} className="border-b hover:bg-muted/50">
                            <td className="p-2">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-semibold">
                                    {bid.contractor.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">{bid.contractor.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {bid.contractor.specializations?.[0]}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div>
                                <p className="font-semibold text-green-600">
                                  {formatCurrency(bid.amount)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {((bid.amount / selectedReport.estimatedBudget) * 100 - 100).toFixed(1)}% vs budget
                                </p>
                              </div>
                            </td>
                            <td className="p-2">
                              <p className="font-medium">{bid.timeline}</p>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center gap-1">
                                {getRatingStars(bid.contractor.rating)}
                                <span className="text-xs ml-1">({bid.contractor.rating})</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <p className="font-medium">{bid.contractor.experience}</p>
                            </td>
                            <td className="p-2">
                              <div className="flex gap-1">
                                {bid.compliance.licenses && <CheckCircle className="w-4 h-4 text-green-500" />}
                                {bid.compliance.insurance && <Shield className="w-4 h-4 text-blue-500" />}
                                {bid.compliance.taxClearance && <FileText className="w-4 h-4 text-purple-500" />}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    // Show detailed contractor profile
                                    setSelectedContractor(bid.contractor);
                                    setShowContractorProfile(true);
                                  }}
                                >
                                  Profile
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => assignContractor(selectedReport.id, bid.contractor.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Award
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Assign Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Assign</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select from pre-qualified contractors or assign to the best bid
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Best Value Bid</h4>
                      {selectedReport.bids.length > 0 && (
                        <div className="p-3 border rounded-lg bg-green-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                {selectedReport.bids.sort((a, b) => a.amount - b.amount)[0].contractor.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatCurrency(selectedReport.bids.sort((a, b) => a.amount - b.amount)[0].amount)}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => assignContractor(
                                selectedReport.id,
                                selectedReport.bids.sort((a, b) => a.amount - b.amount)[0].contractor.id
                              )}
                            >
                              Award Best Bid
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Top Rated Contractors</h4>
                      <div className="space-y-2">
                        {mockContractors
                          .filter(c => c.rating >= 4.5)
                          .slice(0, 2)
                          .map((contractor) => (
                          <div key={contractor.id} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold">
                                  {contractor.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium">{contractor.name}</p>
                                <div className="flex items-center gap-1">
                                  {getRatingStars(contractor.rating)}
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => assignContractor(selectedReport.id, contractor.id)}
                            >
                              Assign
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create New Tender Dialog */}
      <Dialog open={showCreateTenderDialog} onOpenChange={setShowCreateTenderDialog}>
        <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle>Create New Tender</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  placeholder="Enter tender title"
                  value={newTenderForm.title}
                  onChange={(e) => setNewTenderForm({...newTenderForm, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select
                  value={newTenderForm.category}
                  onValueChange={(value) => setNewTenderForm({...newTenderForm, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Road Maintenance">Road Maintenance</SelectItem>
                    <SelectItem value="Electrical Infrastructure">Electrical Infrastructure</SelectItem>
                    <SelectItem value="Water Supply & Sanitation">Water Supply & Sanitation</SelectItem>
                    <SelectItem value="Public Facilities">Public Facilities</SelectItem>
                    <SelectItem value="Educational Infrastructure">Educational Infrastructure</SelectItem>
                    <SelectItem value="Parks & Recreation">Parks & Recreation</SelectItem>
                    <SelectItem value="Traffic Infrastructure">Traffic Infrastructure</SelectItem>
                    <SelectItem value="Drainage Maintenance">Drainage Maintenance</SelectItem>
                    <SelectItem value="Community Development">Community Development</SelectItem>
                    <SelectItem value="Waste Management">Waste Management</SelectItem>
                    <SelectItem value="Structural Engineering">Structural Engineering</SelectItem>
                    <SelectItem value="Energy Efficiency">Energy Efficiency</SelectItem>
                    <SelectItem value="Emergency Infrastructure">Emergency Infrastructure</SelectItem>
                    <SelectItem value="Public Amenities">Public Amenities</SelectItem>
                    <SelectItem value="Highway Maintenance">Highway Maintenance</SelectItem>
                    <SelectItem value="Water Quality">Water Quality</SelectItem>
                    <SelectItem value="Public Transport">Public Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <textarea
                className="w-full p-3 border rounded-md resize-none"
                rows={3}
                placeholder="Describe the work required..."
                value={newTenderForm.description}
                onChange={(e) => setNewTenderForm({...newTenderForm, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location *</label>
                <Input
                  placeholder="Enter location"
                  value={newTenderForm.location}
                  onChange={(e) => setNewTenderForm({...newTenderForm, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Zone *</label>
                <Select
                  value={newTenderForm.zone}
                  onValueChange={(value) => setNewTenderForm({...newTenderForm, zone: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central Ranchi">Central Ranchi</SelectItem>
                    <SelectItem value="Jamshedpur Industrial">Jamshedpur Industrial</SelectItem>
                    <SelectItem value="Industrial East">Industrial East</SelectItem>
                    <SelectItem value="South Ranchi">South Ranchi</SelectItem>
                    <SelectItem value="North Ranchi">North Ranchi</SelectItem>
                    <SelectItem value="Education District">Education District</SelectItem>
                    <SelectItem value="Industrial West">Industrial West</SelectItem>
                    <SelectItem value="Highway District">Highway District</SelectItem>
                    <SelectItem value="Various Zones">Various Zones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department *</label>
                <Select
                  value={newTenderForm.department}
                  onValueChange={(value) => setNewTenderForm({...newTenderForm, department: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Roads & Infrastructure">Roads & Infrastructure</SelectItem>
                    <SelectItem value="Electrical & Lighting">Electrical & Lighting</SelectItem>
                    <SelectItem value="Water Supply & Sanitation">Water Supply & Sanitation</SelectItem>
                    <SelectItem value="Public Facilities">Public Facilities</SelectItem>
                    <SelectItem value="Education Infrastructure">Education Infrastructure</SelectItem>
                    <SelectItem value="Parks & Recreation">Parks & Recreation</SelectItem>
                    <SelectItem value="Traffic & Transportation">Traffic & Transportation</SelectItem>
                    <SelectItem value="Solid Waste Management">Solid Waste Management</SelectItem>
                    <SelectItem value="Bridges & Structures">Bridges & Structures</SelectItem>
                    <SelectItem value="Fire & Emergency Services">Fire & Emergency Services</SelectItem>
                    <SelectItem value="Public Transport">Public Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Estimated Budget (₹) *</label>
                <Input
                  type="number"
                  placeholder="Enter budget amount"
                  value={newTenderForm.estimatedBudget}
                  onChange={(e) => setNewTenderForm({...newTenderForm, estimatedBudget: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency Level</label>
                <Select
                  value={newTenderForm.urgency}
                  onValueChange={(value: 'Low' | 'Medium' | 'High' | 'Critical') => setNewTenderForm({...newTenderForm, urgency: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Deadline *</label>
                <Input
                  type="date"
                  value={newTenderForm.deadline}
                  onChange={(e) => setNewTenderForm({...newTenderForm, deadline: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowCreateTenderDialog(false)}>
                Cancel
              </Button>
              <Button onClick={createTender}>
                Create Tender
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contractor Profile Dialog */}
      <Dialog open={showContractorProfile} onOpenChange={setShowContractorProfile}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Contractor Profile: {selectedContractor?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedContractor && (
            <div className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-semibold">
                        {selectedContractor.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{selectedContractor.name}</h3>
                        <Badge className={
                          selectedContractor.trustLevel === 'Trusted' ? 'bg-green-100 text-green-800' :
                          selectedContractor.trustLevel === 'Verified' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {selectedContractor.trustLevel}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{selectedContractor.rating} rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span>{selectedContractor.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{selectedContractor.completedProjects} projects</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedContractor.specializations?.map((spec, index) => (
                          <Badge key={index} variant="outline">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedContractor.performance.qualityScore}%</p>
                      <p className="text-sm text-muted-foreground">Quality Score</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{selectedContractor.performance.timelyCompletion}%</p>
                      <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{selectedContractor.performance.budgetAdherence}%</p>
                      <p className="text-sm text-muted-foreground">Budget Adherence</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Financial Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Bid Amount</p>
                      <p className="text-lg font-semibold">{formatCurrency(selectedContractor.financials.avgBidAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earned</p>
                      <p className="text-lg font-semibold text-green-600">{formatCurrency(selectedContractor.financials.totalEarned)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bond Amount</p>
                      <p className="text-lg font-semibold">{formatCurrency(selectedContractor.financials.bondAmount)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedContractor.contact.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedContractor.contact.email}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{selectedContractor.contact.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Projects */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Building className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Project history would be displayed here</p>
                    <p className="text-sm">Completed {selectedContractor.completedProjects} projects total</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BiddingPage;