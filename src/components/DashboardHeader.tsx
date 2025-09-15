import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, MessageSquare, Settings } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
  notificationCount?: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = "John Administrator",
  userRole = "City Manager",
  notificationCount = 5,
}) => {
  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search reports by ID, citizen, zone..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right Section - Profile & Notifications */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </Badge>
            )}
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon">
            <MessageSquare className="w-5 h-5" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{userName}</p>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
