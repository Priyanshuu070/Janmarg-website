import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Map,
  Building,
  Users,
  FileText,
  Gavel,
  HardHat,
  BarChart3,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SideNavProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    badge: null,
    description: "Overview & Analytics",
  },
  {
    id: "zones",
    label: "Zones",
    icon: Map,
    badge: "5",
    description: "Geographic Areas",
  },
  {
    id: "wards",
    label: "Wards",
    icon: Building,
    badge: "23",
    description: "Administrative Divisions",
  },
  {
    id: "departments",
    label: "Departments",
    icon: Users,
    badge: null,
    description: "City Departments",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    badge: "156",
    description: "Citizen Reports",
  },
  {
    id: "bidding",
    label: "Bidding",
    icon: Gavel,
    badge: "12",
    description: "Contract Bidding",
  },
  {
    id: "contractors",
    label: "Contractors",
    icon: HardHat,
    badge: "35",
    description: "Service Providers",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    badge: null,
    description: "Data & Insights",
  },
  {
    id: "users",
    label: "Users & Roles",
    icon: UserCog,
    badge: null,
    description: "Access Management",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    badge: null,
    description: "System Configuration",
  },
];

const SideNavigation: React.FC<SideNavProps> = ({
  currentPage = "dashboard",
  onPageChange,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } h-screen flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-foreground">City Dashboard</h2>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Items - Scrollable */}
      <nav className="p-2 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const IconComponent = item.icon;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${
                  isCollapsed ? "px-3" : ""
                } ${isActive ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => onPageChange?.(item.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <IconComponent
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  />

                  {!isCollapsed && (
                    <>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs opacity-70">
                          {item.description}
                        </div>
                      </div>

                      {item.badge && (
                        <Badge
                          variant={isActive ? "secondary" : "default"}
                          className="text-xs min-w-[20px] h-5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default SideNavigation;
