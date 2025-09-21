import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  Calendar,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Users,
  MapPin,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import mockReportsData from "@/data/mockReports.json";

interface ExportJob {
  id: string;
  type: string;
  format: 'csv' | 'excel' | 'pdf' | 'json';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  filename: string;
  createdAt: Date;
  filters: any;
}

const ExportReportPage: React.FC = () => {
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'excel' | 'pdf' | 'json'>('csv');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [filters, setFilters] = useState({
    status: [] as string[],
    department: [] as string[],
    priority: [] as string[],
    ward: [] as string[]
  });

  // Mock export function
  const handleExport = async (type: string, format: 'csv' | 'excel' | 'pdf' | 'json') => {
    setIsExporting(true);

    const jobId = `export-${Date.now()}`;
    const filename = `${type}-report-${new Date().toISOString().split('T')[0]}.${format}`;

    // Create export job
    const newJob: ExportJob = {
      id: jobId,
      type,
      format,
      status: 'pending',
      progress: 0,
      filename,
      createdAt: new Date(),
      filters: { ...filters, dateRange }
    };

    setExportJobs(prev => [newJob, ...prev]);

    // Simulate export process
    try {
      // Step 1: Preparing data
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateJobProgress(jobId, 25, 'processing');

      // Step 2: Applying filters
      await new Promise(resolve => setTimeout(resolve, 1500));
      updateJobProgress(jobId, 50, 'processing');

      // Step 3: Generating file
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateJobProgress(jobId, 75, 'processing');

      // Step 4: Finalizing
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateJobProgress(jobId, 100, 'completed');

      // Simulate download
      setTimeout(() => {
        const blob = generateMockFile(type, format);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 500);

    } catch (error) {
      updateJobProgress(jobId, 0, 'failed');
    } finally {
      setIsExporting(false);
    }
  };

  const updateJobProgress = (jobId: string, progress: number, status: ExportJob['status']) => {
    setExportJobs(prev => prev.map(job =>
      job.id === jobId
        ? { ...job, progress, status }
        : job
    ));
  };

  const generateMockFile = (type: string, format: 'csv' | 'excel' | 'pdf' | 'json') => {
    let content = '';
    let mimeType = '';

    switch (format) {
      case 'csv':
        content = generateCSVContent(type);
        mimeType = 'text/csv';
        break;
      case 'json':
        content = JSON.stringify(generateJSONContent(type), null, 2);
        mimeType = 'application/json';
        break;
      case 'excel':
        // For demo purposes, we'll create a CSV that Excel can open
        content = generateCSVContent(type);
        mimeType = 'application/vnd.ms-excel';
        break;
      case 'pdf':
        // Mock PDF content
        content = `PDF Report: ${type}\nGenerated on: ${new Date().toISOString()}\n\nThis is a mock PDF export.`;
        mimeType = 'application/pdf';
        break;
    }

    return new Blob([content], { type: mimeType });
  };

  const generateCSVContent = (type: string): string => {
    const headers = ['ID', 'Title', 'Status', 'Priority', 'Department', 'Ward', 'Reporter', 'Date', 'Description'];
    let rows = [headers.join(',')];

    // Filter reports based on type and filters
    let filteredReports = mockReportsData.reports;

    if (type !== 'all') {
      // Apply type-specific filtering
      switch (type) {
        case 'citizen-reports':
          filteredReports = filteredReports.filter(r => r.status !== 'RESOLVED');
          break;
        case 'resolved-reports':
          filteredReports = filteredReports.filter(r => r.status === 'RESOLVED');
          break;
        case 'high-priority':
          filteredReports = filteredReports.filter(r => (r.priorityScore || 0) >= 70);
          break;
      }
    }

    // Apply additional filters
    if (filters.status.length > 0) {
      filteredReports = filteredReports.filter(r => filters.status.includes(r.status));
    }
    if (filters.department.length > 0) {
      filteredReports = filteredReports.filter(r => r.department && filters.department.includes(r.department.name));
    }
    if (filters.ward.length > 0) {
      filteredReports = filteredReports.filter(r => filters.ward.includes(r.ward.name));
    }

    filteredReports.forEach(report => {
      const row = [
        report.id,
        `"${report.title.replace(/"/g, '""')}"`,
        report.status,
        report.priorityScore || 'N/A',
        report.department?.name || 'N/A',
        report.ward.name,
        report.reporter.name,
        report.createdAt,
        `"${(report.description || '').replace(/"/g, '""')}"`
      ];
      rows.push(row.join(','));
    });

    return rows.join('\n');
  };

  const generateJSONContent = (type: string) => {
    let filteredReports = mockReportsData.reports;

    // Apply same filters as CSV
    if (type !== 'all') {
      switch (type) {
        case 'citizen-reports':
          filteredReports = filteredReports.filter(r => r.status !== 'RESOLVED');
          break;
        case 'resolved-reports':
          filteredReports = filteredReports.filter(r => r.status === 'RESOLVED');
          break;
        case 'high-priority':
          filteredReports = filteredReports.filter(r => (r.priorityScore || 0) >= 70);
          break;
      }
    }

    return {
      exportType: type,
      generatedAt: new Date().toISOString(),
      totalRecords: filteredReports.length,
      filters: { ...filters, dateRange },
      data: filteredReports
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const exportOptions = [
    {
      id: 'all-reports',
      title: 'All Reports',
      description: 'Complete export of all citizen reports',
      icon: FileText,
      count: mockReportsData.reports.length
    },
    {
      id: 'citizen-reports',
      title: 'Active Citizen Reports',
      description: 'Reports that are currently being processed',
      icon: Clock,
      count: mockReportsData.reports.filter(r => r.status !== 'RESOLVED').length
    },
    {
      id: 'resolved-reports',
      title: 'Resolved Reports',
      description: 'Reports that have been completed',
      icon: CheckCircle,
      count: mockReportsData.reports.filter(r => r.status === 'RESOLVED').length
    },
    {
      id: 'high-priority',
      title: 'High Priority Reports',
      description: 'Reports with priority score above 70',
      icon: AlertCircle,
      count: mockReportsData.reports.filter(r => (r.priorityScore || 0) >= 70).length
    },
    {
      id: 'department-summary',
      title: 'Department Summary',
      description: 'Aggregated data by department',
      icon: Users,
      count: 5
    },
    {
      id: 'ward-analytics',
      title: 'Ward Analytics',
      description: 'Reports grouped by ward/location',
      icon: MapPin,
      count: 23
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Download className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Export Reports</h1>
          <p className="text-muted-foreground">Generate and download comprehensive reports in various formats</p>
        </div>
      </div>

      <Tabs defaultValue="export" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="export">Export Data</TabsTrigger>
          <TabsTrigger value="history">Export History</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
        </TabsList>

        {/* Export Data Tab */}
        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Export Options */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Available Reports
                  </CardTitle>
                  <CardDescription>
                    Choose the type of report you want to export
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exportOptions.map((option) => (
                      <div
                        key={option.id}
                        className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => setSelectedReportType(option.id)}
                      >
                        <div className="flex items-start gap-3">
                          <option.icon className="w-8 h-8 text-primary mt-1" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{option.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {option.description}
                            </p>
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {option.count} records
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters & Options
                  </CardTitle>
                  <CardDescription>
                    Customize your export with filters and format options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-3">
                    <Label>Status</Label>
                    <div className="flex flex-wrap gap-2">
                      {['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={`status-${status}`}
                            checked={filters.status.includes(status)}
                            onCheckedChange={(checked) => {
                              setFilters(prev => ({
                                ...prev,
                                status: checked
                                  ? [...prev.status, status]
                                  : prev.status.filter(s => s !== status)
                              }));
                            }}
                          />
                          <Label htmlFor={`status-${status}`} className="text-sm">
                            {status.replace('_', ' ')}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Format Selection */}
                  <div className="space-y-3">
                    <Label>Export Format</Label>
                    <div className="flex gap-2">
                      {[
                        { value: 'csv', label: 'CSV', icon: FileSpreadsheet },
                        { value: 'excel', label: 'Excel', icon: FileSpreadsheet },
                        { value: 'pdf', label: 'PDF', icon: FileText },
                        { value: 'json', label: 'JSON', icon: FileJson }
                      ].map((format) => (
                        <Button
                          key={format.value}
                          variant={selectedFormat === format.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedFormat(format.value as any)}
                          className="flex items-center gap-2"
                        >
                          <format.icon className="w-4 h-4" />
                          {format.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export Summary & Actions */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Export Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Report Type:</span>
                      <span className="font-medium">
                        {exportOptions.find(o => o.id === selectedReportType)?.title || 'All Reports'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Format:</span>
                      <span className="font-medium uppercase">{selectedFormat}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Records:</span>
                      <span className="font-medium">
                        {exportOptions.find(o => o.id === selectedReportType)?.count || mockReportsData.reports.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Filters:</span>
                      <span className="font-medium">
                        {Object.values(filters).flat().length + (dateRange.start || dateRange.end ? 1 : 0)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <Button
                    className="w-full"
                    onClick={() => handleExport(selectedReportType, selectedFormat)}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Start Export
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Exports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleExport('all-reports', 'csv')}
                    disabled={isExporting}
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    All Reports (CSV)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleExport('high-priority', 'pdf')}
                    disabled={isExporting}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    High Priority (PDF)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleExport('department-summary', 'json')}
                    disabled={isExporting}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Department Summary (JSON)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Export History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Export History
              </CardTitle>
              <CardDescription>
                View and download previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              {exportJobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No export history yet</p>
                  <p className="text-sm">Your generated reports will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {exportJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(job.status)}
                        <div>
                          <div className="font-medium">{job.filename}</div>
                          <div className="text-sm text-muted-foreground">
                            {job.type} • {job.createdAt.toLocaleDateString()}
                          </div>
                          {job.status === 'processing' && (
                            <Progress value={job.progress} className="mt-2 w-32" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        {job.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Exports Tab */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Scheduled Exports
              </CardTitle>
              <CardDescription>
                Set up automatic report generation and delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Scheduled exports feature</p>
                <p className="text-sm">Coming soon - automate your report generation</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportReportPage;