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
          <div className="space-y-6">
            <KPICards />
            <DashboardCharts />
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
          <div className="p-6 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contractor Management</h2>
            <p className="text-muted-foreground">
              Contractor management interface coming soon...
            </p>
          </div>
        );
      case "analytics":
        return (
          <div className="p-6 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p className="text-muted-foreground">
              Advanced analytics interface coming soon...
            </p>
          </div>
        );
      case "users":
        return (
          <div className="p-6 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Users & Roles</h2>
            <p className="text-muted-foreground">
              User management interface coming soon...
            </p>
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
    <div className="flex h-screen bg-secondary overflow-hidden">
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
            userName="John Administrator"
            userRole="City Manager"
            notificationCount={5}
          />
        </div>

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">
                {currentPage === "dashboard"
                  ? "Dashboard Overview"
                  : currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </h1>
              <p className="text-muted-foreground">
                {currentPage === "dashboard"
                  ? "Welcome to your civic management dashboard"
                  : `Manage ${currentPage} efficiently`}
              </p>
            </div>

            {/* Dynamic Content */}
            {renderPageContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
