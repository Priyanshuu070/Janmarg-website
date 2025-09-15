import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  getBadgeColors,
  getPerformanceText,
  getIconColor,
} from "@/lib/badgeColors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  MoreHorizontal,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Wrench,
  Droplets,
  Lightbulb,
  Car,
  Trees,
  Building,
  BarChart3,
  Eye,
  Edit,
  UserPlus,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Mock departments data
const mockDepartments = [
  {
    id: 1,
    name: "Sanitation",
    icon: <Building className="w-5 h-5" />,
    totalReports: 245,
    slaPerformance: 78,
    pendingApprovals: 12,
    activeStaff: 45,
    budget: 250000,
    description: "Waste management and public cleanliness",
    color: "#10b981",
  },
  {
    id: 2,
    name: "Roads & Infrastructure",
    icon: <Car className="w-5 h-5" />,
    totalReports: 156,
    slaPerformance: 85,
    pendingApprovals: 8,
    activeStaff: 32,
    budget: 450000,
    description: "Road maintenance and infrastructure development",
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Streetlights",
    icon: <Lightbulb className="w-5 h-5" />,
    totalReports: 89,
    slaPerformance: 92,
    pendingApprovals: 3,
    activeStaff: 18,
    budget: 120000,
    description: "Street lighting installation and maintenance",
    color: "#f59e0b",
  },
  {
    id: 4,
    name: "Water Supply",
    icon: <Droplets className="w-5 h-5" />,
    totalReports: 67,
    slaPerformance: 71,
    pendingApprovals: 15,
    activeStaff: 28,
    budget: 380000,
    description: "Water distribution and quality management",
    color: "#06b6d4",
  },
  {
    id: 5,
    name: "Parks & Recreation",
    icon: <Trees className="w-5 h-5" />,
    totalReports: 34,
    slaPerformance: 88,
    pendingApprovals: 5,
    activeStaff: 22,
    budget: 180000,
    description: "Public parks and recreational facilities",
    color: "#22c55e",
  },
  {
    id: 6,
    name: "Public Works",
    icon: <Wrench className="w-5 h-5" />,
    totalReports: 112,
    slaPerformance: 82,
    pendingApprovals: 9,
    activeStaff: 38,
    budget: 320000,
    description: "General maintenance and public infrastructure",
    color: "#8b5cf6",
  },
];

// Workload chart data
const workloadData = mockDepartments.map((dept) => ({
  name: dept.name.split(" ")[0], // Short name for chart
  reports: dept.totalReports,
  staff: dept.activeStaff,
}));

const DepartmentsPage: React.FC = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const getSLABadge = (performance: number) => {
    const performanceText = getPerformanceText(performance);
    return (
      <Badge className={getBadgeColors.performance(performance)}>
        {performanceText}
      </Badge>
    );
  };

  const handleAddDepartment = () => {
    // Mock add functionality
    console.log("Adding department:", newDepartment);
    setShowAddDialog(false);
    setNewDepartment({ name: "", description: "", budget: "" });
  };

  const assignReports = (departmentId: number) => {
    // Mock assign reports functionality
    console.log("Assigning reports to department:", departmentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground">
            Manage municipal departments and monitor performance
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="dept-name">Department Name</Label>
                <Input
                  id="dept-name"
                  value={newDepartment.name}
                  onChange={(e) =>
                    setNewDepartment({ ...newDepartment, name: e.target.value })
                  }
                  placeholder="Enter department name"
                />
              </div>
              <div>
                <Label htmlFor="dept-desc">Description</Label>
                <Textarea
                  id="dept-desc"
                  value={newDepartment.description}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter department description"
                />
              </div>
              <div>
                <Label htmlFor="dept-budget">Annual Budget</Label>
                <Input
                  id="dept-budget"
                  type="number"
                  value={newDepartment.budget}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      budget: e.target.value,
                    })
                  }
                  placeholder="Enter annual budget"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddDepartment}>Add Department</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDepartments.map((department) => (
          <Card
            key={department.id}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: `${department.color}20`,
                    color: department.color,
                  }}
                >
                  {department.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{department.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {department.description}
                  </p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Department
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => assignReports(department.id)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Assign Reports
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Manage Staff
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Department Stats */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Total Reports
                </span>
                <span className="font-semibold">{department.totalReports}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    SLA Performance
                  </span>
                  <span className="font-semibold">
                    {department.slaPerformance}%
                  </span>
                </div>
                <Progress value={department.slaPerformance} className="h-2" />
                {getSLABadge(department.slaPerformance)}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Pending Approvals
                </span>
                <Badge
                  variant={
                    department.pendingApprovals > 10
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {department.pendingApprovals}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Active Staff
                </span>
                <span className="font-semibold">{department.activeStaff}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  Annual Budget
                </span>
                <span className="font-semibold">
                  ₹{department.budget.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Department Workload Chart */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">
          Department Workload Overview
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reports" fill="#3b82f6" name="Total Reports" />
              <Bar dataKey="staff" fill="#10b981" name="Active Staff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Building className={`w-5 h-5 ${getIconColor("info")}`} />
            <div>
              <div className="text-sm text-muted-foreground">
                Total Departments
              </div>
              <div className="text-2xl font-bold">{mockDepartments.length}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <FileText className={`w-5 h-5 ${getIconColor("warning")}`} />
            <div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
              <div className="text-2xl font-bold">
                {mockDepartments.reduce(
                  (sum, dept) => sum + dept.totalReports,
                  0
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className={`w-5 h-5 ${getIconColor("success")}`} />
            <div>
              <div className="text-sm text-muted-foreground">Total Staff</div>
              <div className="text-2xl font-bold">
                {mockDepartments.reduce(
                  (sum, dept) => sum + dept.activeStaff,
                  0
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${getIconColor("error")}`} />
            <div>
              <div className="text-sm text-muted-foreground">
                Pending Approvals
              </div>
              <div className="text-2xl font-bold">
                {mockDepartments.reduce(
                  (sum, dept) => sum + dept.pendingApprovals,
                  0
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentsPage;
