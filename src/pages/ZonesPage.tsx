import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ZoneMap from "@/components/ZoneMap";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  MoreHorizontal,
  MapPin,
  BarChart3,
  Download,
  Edit,
  Trash2,
  Users,
  Eye,
} from "lucide-react";

// Mock zones data
const mockZones = [
  {
    id: 1,
    name: "Central Business District",
    code: "CBD-001",
    wards: 8,
    reports: 156,
    activeContractors: 12,
    status: "Active",
    urgencyScore: 85,
    color: "#ef4444", // Red for high urgency
  },
  {
    id: 2,
    name: "Residential North",
    code: "RN-002",
    wards: 6,
    reports: 89,
    activeContractors: 8,
    status: "Active",
    urgencyScore: 65,
    color: "#f59e0b", // Orange for medium urgency
  },
  {
    id: 3,
    name: "Industrial East",
    code: "IE-003",
    wards: 4,
    reports: 34,
    activeContractors: 5,
    status: "Active",
    urgencyScore: 40,
    color: "#10b981", // Green for low urgency
  },
  {
    id: 4,
    name: "Suburban West",
    code: "SW-004",
    wards: 10,
    reports: 67,
    activeContractors: 9,
    status: "Active",
    urgencyScore: 55,
    color: "#f59e0b", // Orange for medium urgency
  },
  {
    id: 5,
    name: "Historic Downtown",
    code: "HD-005",
    wards: 5,
    reports: 23,
    activeContractors: 3,
    status: "Maintenance",
    urgencyScore: 25,
    color: "#10b981", // Green for low urgency
  },
];

const ZonesPage: React.FC = () => {
  const [view, setView] = useState<"table" | "map">("table");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newZone, setNewZone] = useState({
    name: "",
    code: "",
    wards: "",
  });

  const getStatusBadge = (status: string) => {
    const variant = status === "Active" ? "default" : "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };

  const getUrgencyBadge = (score: number) => {
    if (score >= 80) return <Badge variant="destructive">High</Badge>;
    if (score >= 50) return <Badge className="bg-orange-500">Medium</Badge>;
    return <Badge className="bg-green-500">Low</Badge>;
  };

  const handleAddZone = () => {
    // Mock add functionality
    console.log("Adding zone:", newZone);
    setShowAddDialog(false);
    setNewZone({ name: "", code: "", wards: "" });
  };

  const exportData = (format: "PDF" | "CSV") => {
    // Mock export functionality
    console.log(`Exporting zones data as ${format}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Zones</h2>
          <p className="text-muted-foreground">
            Manage zones, wards, and monitor civic activities
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === "table" ? "default" : "outline"}
            onClick={() => setView("table")}
          >
            Table View
          </Button>
          <Button
            variant={view === "map" ? "default" : "outline"}
            onClick={() => setView("map")}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Map View
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Zone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Zone</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="zone-name">Zone Name</Label>
                <Input
                  id="zone-name"
                  value={newZone.name}
                  onChange={(e) =>
                    setNewZone({ ...newZone, name: e.target.value })
                  }
                  placeholder="Enter zone name"
                />
              </div>
              <div>
                <Label htmlFor="zone-code">Zone Code</Label>
                <Input
                  id="zone-code"
                  value={newZone.code}
                  onChange={(e) =>
                    setNewZone({ ...newZone, code: e.target.value })
                  }
                  placeholder="Enter zone code"
                />
              </div>
              <div>
                <Label htmlFor="zone-wards">Number of Wards</Label>
                <Input
                  id="zone-wards"
                  type="number"
                  value={newZone.wards}
                  onChange={(e) =>
                    setNewZone({ ...newZone, wards: e.target.value })
                  }
                  placeholder="Enter number of wards"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddZone}>Add Zone</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => exportData("PDF")}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportData("CSV")}>
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      {view === "table" ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Wards</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Active Contractors</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockZones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>{zone.code}</TableCell>
                  <TableCell>{zone.wards}</TableCell>
                  <TableCell>{zone.reports}</TableCell>
                  <TableCell>{zone.activeContractors}</TableCell>
                  <TableCell>{getUrgencyBadge(zone.urgencyScore)}</TableCell>
                  <TableCell>{getStatusBadge(zone.status)}</TableCell>
                  <TableCell className="text-right">
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
                          Edit Zone
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Assign Wards
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Zone Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Zone
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Interactive Zone Map</h3>
            <p className="text-muted-foreground mb-4">
              Click on zones to view details and urgency scores. Colored areas
              represent urgency levels.
            </p>
          </div>

          {/* Real Map Component */}
          <ZoneMap
            zones={mockZones}
            onZoneClick={(zone) => {
              console.log("Zone clicked:", zone);
              // You can add more interaction logic here
            }}
          />

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">High Urgency (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm">Medium Urgency (50-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Low Urgency (0-49%)</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ZonesPage;
