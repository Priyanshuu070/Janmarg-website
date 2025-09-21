import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, Search, MessageSquare, LogOut, User, X, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mockReportsData from "@/data/mockReports.json";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  onSearchResultClick?: (report: any) => void;
}

interface Notification {
  id: string;
  type: 'report' | 'sla_breach';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  reportId?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = "Rajesh Kumar",
  userRole = "City Manager",
  notificationCount = 5,
  onSearchResultClick,
}) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Generate random notifications
  const generateNotifications = (): Notification[] => {
    const reports = mockReportsData.reports;
    const notifications: Notification[] = [];
    
    // Generate 5 random notifications
    for (let i = 0; i < 5; i++) {
      const isSlaBreach = Math.random() > 0.6; // 40% chance of SLA breach
      const randomReport = reports[Math.floor(Math.random() * reports.length)];
      
      if (isSlaBreach) {
        notifications.push({
          id: `sla-${i}`,
          type: 'sla_breach',
          title: 'SLA Breach Alert',
          message: `Report ${randomReport.id} has exceeded SLA deadline by ${Math.floor(Math.random() * 5) + 1} days`,
          timestamp: new Date(Date.now() - Math.random() * 86400000), // Random time within last 24h
          priority: 'high',
          reportId: randomReport.id
        });
      } else {
        notifications.push({
          id: `report-${i}`,
          type: 'report',
          title: 'New High Priority Report',
          message: `${randomReport.title} in ${randomReport.ward.name} requires immediate attention`,
          timestamp: new Date(Date.now() - Math.random() * 3600000), // Random time within last hour
          priority: Math.random() > 0.7 ? 'high' : 'medium',
          reportId: randomReport.id
        });
      }
    }
    
    return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  useEffect(() => {
    setNotifications(generateNotifications());
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = mockReportsData.reports.filter(report => 
      report.title.toLowerCase().includes(query.toLowerCase()) ||
      report.description?.toLowerCase().includes(query.toLowerCase()) ||
      report.id.toLowerCase().includes(query.toLowerCase()) ||
      report.reporter.name.toLowerCase().includes(query.toLowerCase()) ||
      report.ward.name.toLowerCase().includes(query.toLowerCase()) ||
      report.issueType?.title.toLowerCase().includes(query.toLowerCase()) ||
      report.department?.name.toLowerCase().includes(query.toLowerCase()) ||
      report.address?.toLowerCase().includes(query.toLowerCase()) ||
      report.tags?.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'sla_breach':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'report':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-green-500 bg-green-50';
    }
  };

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center flex-1 max-w-md relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search reports by ID, citizen, zone..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
            />
          </div>
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
              <div className="p-2">
                <div className="text-sm text-muted-foreground mb-2 px-2">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </div>
                {searchResults.map((report) => (
                  <div
                    key={report.id}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer border-l-4 border-l-blue-500 mb-2 last:mb-0 transition-colors"
                    onClick={() => {
                      setShowSearchResults(false);
                      setSearchQuery("");
                      if (onSearchResultClick) {
                        onSearchResultClick(report);
                      } else {
                        // Navigate to reports page with this report
                        navigate(`/reports?highlight=${report.id}`);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{report.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {report.id} • {report.ward.name} • {report.reporter.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Priority: {report.priorityScore || 'N/A'}
                        </div>
                      </div>
                      <Badge 
                        variant={report.status === 'RESOLVED' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Click outside to close search results */}
          {showSearchResults && (
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setShowSearchResults(false)}
            />
          )}
        </div>

        {/* Right Section - Profile & Notifications */}
        <div className="flex items-center gap-4">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {notifications.length > 9 ? "9+" : notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96 max-h-96 overflow-y-auto">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <span className="text-xs text-muted-foreground">{notifications.length} new</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No new notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-l-4 ${getPriorityColor(notification.priority)} relative group`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Messages */}
          <Button variant="ghost" size="icon">
            <MessageSquare className="w-5 h-5" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 pl-3 border-l border-border hover:bg-accent"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {userName}
                  </p>
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
