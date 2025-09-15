import React, { useState } from "react";
import SideNavigation from "@/components/SideNavigation";
import DashboardHeader from "@/components/DashboardHeader";
import KPICards from "@/components/KPICards";
import DashboardCharts from "@/components/DashboardCharts";
import RecentActivityFeed from "@/components/RecentActivityFeed";

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
        return (
          <div className="p-6 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Reports Management</h2>
            <p className="text-muted-foreground">
              Reports management interface coming soon...
            </p>
          </div>
        );
      case "zones":
        return (
          <div className="p-6 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Zone Management</h2>
            <p className="text-muted-foreground">
              Zone management interface coming soon...
            </p>
          </div>
        );
      case "contractors":
        return (
          <div className="p-6 bg-card rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contractor Management</h2>
            <p className="text-muted-foreground">
              Contractor management interface coming soon...
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
    <div className="flex min-h-screen bg-secondary">
      {/* Side Navigation */}
      <SideNavigation currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader
          userName="John Administrator"
          userRole="City Manager"
          notificationCount={5}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
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
