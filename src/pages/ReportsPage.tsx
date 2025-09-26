import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getBadgeColors } from "@/lib/badgeColors";
import ReportMap from "@/components/ReportMap";
import ReportCard from "@/components/ReportCard";
import ReportDialog from "@/components/ReportDialog";
import ReportsOverviewMap from "@/components/ReportsOverviewMap";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  LayoutGrid,
  List,
  MapPin,
  Calendar,
  User,
  Plus,
  Download,
  TrendingUp,
  Target,
  Eye,
  FileText,
} from "lucide-react";
import mockReportsData from "@/data/mockReports.json";
import { 
  getPriorityLevel
} from "@/lib/reportScoring";
import { convertReportToTender } from "@/data/biddingData";
import { addForwardedReport, isReportForwarded } from "@/utils/forwardedReports";
import { useNavigate } from "react-router-dom";

const ReportsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [wardFilter, setWardFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [issueTypeFilter, setIssueTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"leaderboard" | "grid">("leaderboard");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const reportsPerPage = 15;

  const navigate = useNavigate();

  // Process reports with priority levels from data
  const processedReports = useMemo(() => {
    return mockReportsData.reports
      .filter((report: any) => !isReportForwarded(`TENDER-${report.id}`))
      .map((report: any) => {
        return {
          ...report,
          priorityLevel: getPriorityLevel(report.priorityScore || 0)
        };
      });
  }, []);

  // Sort reports by priority score (leaderboard style)
  const sortedReports = useMemo(() => {
    return [...processedReports].sort((a, b) => b.priorityScore - a.priorityScore);
  }, [processedReports]);

  // Filter reports based on search and filters
  const filteredReports = useMemo(() => {
    let filtered = sortedReports;

    // Search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((report) =>
        report.title.toLowerCase().includes(query) ||
        report.description?.toLowerCase().includes(query) ||
        report.status.toLowerCase().includes(query) ||
        report.reporter.name.toLowerCase().includes(query) ||
        report.ward.name.toLowerCase().includes(query) ||
        report.issueType?.title.toLowerCase().includes(query) ||
        report.department?.name.toLowerCase().includes(query) ||
        report.address?.toLowerCase().includes(query) ||
        report.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((report) =>
        report.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Priority filter (replacing severity)
    if (severityFilter !== "all") {
      filtered = filtered.filter((report) => {
        if (severityFilter === "critical") return report.priorityScore >= 80;
        if (severityFilter === "high") return report.priorityScore >= 65 && report.priorityScore < 80;
        if (severityFilter === "medium") return report.priorityScore >= 45 && report.priorityScore < 65;
        if (severityFilter === "low") return report.priorityScore < 45;
        return true;
      });
    }

    // Department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter((report) =>
        report.department?.name.toLowerCase() === departmentFilter.toLowerCase()
      );
    }

    // Ward filter
    if (wardFilter !== "all") {
      filtered = filtered.filter((report) =>
        report.ward?.name.toLowerCase() === wardFilter.toLowerCase()
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const reportDate = new Date(report.createdAt);
      const diffTime = Math.abs(now.getTime() - reportDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (dateFilter === "today") {
        filtered = filtered.filter(() => diffDays === 0);
      } else if (dateFilter === "week") {
        filtered = filtered.filter(() => diffDays <= 7);
      } else if (dateFilter === "month") {
        filtered = filtered.filter(() => diffDays <= 30);
      }
    }

    // Issue type filter
    if (issueTypeFilter !== "all") {
      filtered = filtered.filter((report) =>
        report.issueType?.title.toLowerCase() === issueTypeFilter.toLowerCase()
      );
    }

    return filtered;
  }, [sortedReports, searchQuery, statusFilter, severityFilter, departmentFilter, wardFilter, dateFilter, issueTypeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + reportsPerPage);

  // Statistics
  const stats = useMemo(() => {
    const totalReports = processedReports.length;
    const criticalReports = processedReports.filter(r => r.priorityScore >= 80).length;
    const highPriorityReports = processedReports.filter(r => r.priorityScore >= 65 && r.priorityScore < 80).length;
    const mediumPriorityReports = processedReports.filter(r => r.priorityScore >= 45 && r.priorityScore < 65).length;
    const lowPriorityReports = processedReports.filter(r => r.priorityScore < 45).length;
    const averagePriority = Math.round(processedReports.reduce((sum, r) => sum + r.priorityScore, 0) / totalReports);
    return { 
      totalReports, 
      criticalReports, 
      highPriorityReports, 
      mediumPriorityReports, 
      lowPriorityReports,
      averagePriority 
    };
  }, [processedReports]);

  const handleReportView = (reportId: string) => {
    const report = processedReports.find(r => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setDialogOpen(true);
    }
  };

  const handleReportUpvote = (reportId: string) => {
    console.log("Upvoting report:", reportId);
  };

  const handleReportEdit = (reportId: string) => {
    console.log("Editing report:", reportId);
  };

  const handleExportCSV = () => {
    // Create CSV content from filtered reports
    const headers = [
      'ID',
      'Title',
      'Description',
      'Status',
      'Priority Score',
      'Priority Level',
      'Reporter',
      'Ward',
      'Department',
      'Created Date',
      'Latitude',
      'Longitude',
      'Address',
      'Upvotes'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredReports.map(report => [
        report.id,
        `"${report.title.replace(/"/g, '""')}"`,
        `"${(report.description || '').replace(/"/g, '""')}"`,
        report.status,
        report.priorityScore || 0,
        report.priorityLevel?.level || 'Unknown',
        `"${report.reporter?.name || ''}"`,
        `"${report.ward?.name || ''}"`,
        `"${report.department?.name || ''}"`,
        new Date(report.createdAt).toLocaleDateString('en-IN'),
        report.latitude || '',
        report.longitude || '',
        `"${report.address || ''}"`,
        report.upvotes || 0
      ].join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reports_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleForwardToBidding = (report: any) => {
    // Convert the report to a tender
    const tender = convertReportToTender(report);

    // Add to forwarded reports
    addForwardedReport(tender);

    // Show success message
    alert(`Report "${report.title}" has been successfully forwarded to bidding and is now open for contractor bids!`);

    // Close the dialog if it's open
    // Note: We don't navigate to /bidding as the admin should stay on the reports page
    // The bidding page can be accessed separately from the navigation

    // Force a page reload to update the reports list (remove the forwarded report)
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">
                Reports Management
              </h1>
              <p className="text-gray-600 mt-2 font-['Inter']">
                Monitor and manage civic issue reports from citizens
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Priority Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Priority</p>
                  <p className="text-2xl font-bold text-red-600">{stats.criticalReports}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.highPriorityReports}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Medium Priority</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.mediumPriorityReports}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <List className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Priority</p>
                  <p className="text-2xl font-bold text-green-600">{stats.averagePriority}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6 bg-white">
          <div className="flex flex-col gap-6">
            {/* Search and View Mode */}
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "leaderboard" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("leaderboard")}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Normal
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex items-center gap-2"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Grid
                </Button>
              </div>
            </div>

            {/* Filters Grid - 2 rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              {/* Priority Filter */}
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical (80+)</SelectItem>
                  <SelectItem value="high">High (65-79)</SelectItem>
                  <SelectItem value="medium">Medium (45-64)</SelectItem>
                  <SelectItem value="low">Low (0-44)</SelectItem>
                </SelectContent>
              </Select>

              {/* Department Filter */}
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Public Works">Public Works</SelectItem>
                  <SelectItem value="Sanitation">Sanitation</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Parks & Recreation">Parks & Recreation</SelectItem>
                  <SelectItem value="Public Safety">Public Safety</SelectItem>
                </SelectContent>
              </Select>

              {/* Ward Filter */}
              <Select value={wardFilter} onValueChange={setWardFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Wards</SelectItem>
                  <SelectItem value="Ward 1">Ward 1</SelectItem>
                  <SelectItem value="Ward 2">Ward 2</SelectItem>
                  <SelectItem value="Ward 3">Ward 3</SelectItem>
                  <SelectItem value="Ward 4">Ward 4</SelectItem>
                  <SelectItem value="Ward 5">Ward 5</SelectItem>
                  <SelectItem value="Ward 6">Ward 6</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>

              {/* Issue Type Filter */}
              <Select value={issueTypeFilter} onValueChange={setIssueTypeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issue Types</SelectItem>
                  <SelectItem value="Pothole">Pothole</SelectItem>
                  <SelectItem value="Street Light">Street Light</SelectItem>
                  <SelectItem value="Garbage">Garbage</SelectItem>
                  <SelectItem value="Water Leak">Water Leak</SelectItem>
                  <SelectItem value="Traffic Signal">Traffic Signal</SelectItem>
                  <SelectItem value="Drainage">Drainage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + reportsPerPage, filteredReports.length)} of {filteredReports.length} reports
          </p>
        </div>

        {/* Reports Content */}
        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            {paginatedReports.length === 0 ? (
              <Card className="p-12 text-center bg-white">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </Card>
            ) : (
              <>
                {/* Leaderboard View */}
                {viewMode === "leaderboard" && (
                  <div className="space-y-4">
                    
                    
                    {paginatedReports.map((report, index) => {
                      const globalRank = startIndex + index + 1;
                      const isTopThree = globalRank <= 3;
                      const rankColors = {
                        1: 'bg-blue-600 text-white',
                        2: 'bg-blue-500 text-white',
                        3: 'bg-blue-400 text-white'
                      };
                      
                      return (
                        <Card 
                          key={report.id} 
                          className={`p-6 bg-white hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 ${
                            isTopThree ? 'border-l-blue-500 bg-blue-50/30' : 
                            report.priorityScore >= 80 ? 'border-l-red-500' :
                            report.priorityScore >= 65 ? 'border-l-orange-500' :
                            report.priorityScore >= 45 ? 'border-l-yellow-500' : 'border-l-green-500'
                          }`}
                          onClick={() => handleReportView(report.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              {/* Rank Badge */}
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                                globalRank <= 3 ? rankColors[globalRank as keyof typeof rankColors] : 'bg-gray-100 text-gray-700'
                              }`}>
                                #{globalRank}
                              </div>

                              {/* Report Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-lg text-gray-900">{report.title}</h3>
                                  <Badge className={`${report.priorityLevel.bgColor} ${report.priorityLevel.color} text-sm px-3 py-1`}>
                                    {report.priorityLevel.level}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {report.ward.name}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(report.createdAt).toLocaleDateString('en-IN')}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {report.reporter.name}
                                  </span>
                                </div>
                                <p className="text-gray-700 mt-2 line-clamp-2">{report.description}</p>
                              </div>
                            </div>

                            {/* Priority Score */}
                            <div className="text-right ml-6">
                              <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border-2 ${report.priorityLevel.bgColor}`}>
                                <TrendingUp className={`w-5 h-5 ${report.priorityLevel.color}`} />
                                <div>
                                  <div className="text-xs font-medium text-gray-600">Priority Score</div>
                                  <div className={`text-2xl font-bold ${report.priorityLevel.color}`}>
                                    {Number.isFinite(report.priorityScore) ? report.priorityScore : 0}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReportView(report.id);
                              }}
                              className="flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleForwardToBidding(report);
                              }}
                              className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <FileText className="w-4 h-4" />
                              Forward to Bidding
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}

                {/* Grid/List View */}
                {(viewMode === "grid" || viewMode === "list") && (
                  <div className="space-y-4">
                    {paginatedReports.map((report) => (
                      <div key={report.id} className="relative">
                        <ReportCard
                          report={report}
                          onView={handleReportView}
                          onUpvote={handleReportUpvote}
                          onEdit={handleReportEdit}
                          onConvertToTender={handleForwardToBidding}
                        />
                        {/* Priority Score Overlay */}
                        <div className="absolute top-4 right-4">
                          <div className={`px-3 py-2 rounded-lg border-2 ${report.priorityLevel.bgColor} shadow-sm`}>
                            <div className="flex items-center gap-2">
                              <TrendingUp className={`w-4 h-4 ${report.priorityLevel.color}`} />
                              <div className="text-center">
                                <div className="text-xs font-medium text-gray-600">Priority</div>
                                <div className={`text-lg font-bold ${report.priorityLevel.color}`}>
                                  {Number.isFinite(report.priorityScore) ? report.priorityScore : 0}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="map">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Reports Map View
              </h3>
              <div className="w-full h-96 rounded-lg overflow-hidden border">
                <ReportsOverviewMap
                  reports={filteredReports.map(report => ({
                    id: report.id,
                    issueType: report.issueType?.title || report.title,
                    location: report.address || report.ward?.name || 'Unknown Location',
                    coordinates: {
                      lat: report.latitude || 28.6139,
                      lng: report.longitude || 77.2090
                    },
                    status: report.status,
                    urgency: report.priorityLevel?.level || 'Medium',
                    citizen: report.reporter?.name || 'Unknown',
                    description: report.description || '',
                    created: new Date(report.createdAt).toLocaleDateString('en-IN'),
                    zone: report.ward?.zone || 'Unknown Zone',
                    ward: report.ward?.name || 'Unknown Ward'
                  }))}
                  onReportClick={(report) => {
                    const originalReport = filteredReports.find(r => r.id === report.id);
                    if (originalReport) {
                      setSelectedReport(originalReport);
                      setDialogOpen(true);
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span className="text-sm">Critical (80+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
                  <span className="text-sm">High (65-79)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                  <span className="text-sm">Medium (45-64)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="text-sm">Low (0-44)</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Report Detail Dialog */}
        <ReportDialog
          report={selectedReport}
          isOpen={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setSelectedReport(null);
          }}
        />
      </div>
    </div>
  );
};

export default ReportsPage;