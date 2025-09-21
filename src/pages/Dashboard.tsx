import React, { useState } from "react";
import SideNavigation from "@/components/SideNavigation";
import DashboardHeader from "@/components/DashboardHeader";
import KPICards from "@/components/KPICards";
import DashboardCharts from "@/components/DashboardCharts";
import RecentActivityFeed from "@/components/RecentActivityFeed";
import ZonesPage from "./ZonesPage";
import WardsPage from "./WardsPage";
import DepartmentsPage from "./DepartmentsPage";
import ReportsPage from "./ReportsPage";
import BiddingPage from "./BiddingPage";
import SettingsPage from "./SettingsPage";
import ExportReportPage from "./ExportReportPage";
import ReportDialog from "@/components/ReportDialog";
import mockReportsData from "@/data/mockReports.json";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearchResultClick = (report: any) => {
    setSelectedReport(report);
    setDialogOpen(true);
    setCurrentPage("reports"); // Switch to reports page
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div className="space-y-8">
            {/* Hero Section - Enhanced KPI Cards */}
            <KPICards />
            
            {/* Secondary Analytics Widgets */}
            <DashboardCharts />
            
            {/* Recent Activity Feed */}
            <RecentActivityFeed />
          </div>
        );
      case "reports":
        return <ReportsPage />;
      case "zones":
        return <ZonesPage />;
      case "wards":
        return <WardsPage />;
      case "departments":
        return <DepartmentsPage />;
      case "bidding":
        return <BiddingPage />;
      case "export-report":
        return <ExportReportPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <div className="p-6 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
            </h2>
            <p className="text-muted-foreground">
              This section is under development...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Side Navigation - Fixed */}
      <div className="flex-shrink-0">
        <SideNavigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <DashboardHeader
            userName="Rajesh Kumar"
            userRole="City Manager"
            notificationCount={13}
            onSearchResultClick={handleSearchResultClick}
          />
        </div>

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}

            {/* Dynamic Content */}
            {renderPageContent()}
          </div>
        </main>
      </div>

      {/* Report Dialog */}
      <ReportDialog
        report={selectedReport}
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedReport(null);
        }}
      />
    </div>
  );
};

export default Dashboard;
