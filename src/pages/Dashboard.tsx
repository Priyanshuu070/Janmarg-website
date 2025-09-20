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

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

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
      case "contractors":
        return (
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contractors</h2>
            <p className="text-muted-foreground">
              Contractor management interface coming soon...
            </p>
          </div>
        );
      case "export-report":
        return (
          <div className="p-6 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Export Report</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Generate and download comprehensive reports for all city data.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-2">Zone Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Export all zone data and statistics
                  </p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-2">Citizen Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Download citizen complaint reports
                  </p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-2">Bidding Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Export contract and bidding data
                  </p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-2">Department Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate department activity reports
                  </p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-2">Financial Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Export budget and expense reports
                  </p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-2">Comprehensive Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Download complete city overview
                  </p>
                </button>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">
              System settings interface coming soon...
            </p>
          </div>
        );
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
    </div>
  );
};

export default Dashboard;
