import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  MoreHorizontal,
  Users,
  FileText,
  AlertTriangle,
  UserCheck,
  Edit,
  Trash2,
  BarChart3,
  Eye,
} from "lucide-react";

// Mock zones and wards data
const mockZones = [
  {
    id: 1,
    name: "Central Business District",
    code: "CBD-001",
    wards: [
      {
        id: "CBD-W001",
        wardId: "W001",
        population: 15000,
        reportsPending: 23,
        slaBreaches: 3,
        assignedOfficer: "John Smith",
        officerContact: "+1-555-0123",
      },
      {
        id: "CBD-W002",
        wardId: "W002",
        population: 18500,
        reportsPending: 31,
        slaBreaches: 5,
        assignedOfficer: "Sarah Johnson",
        officerContact: "+1-555-0124",
      },
      {
        id: "CBD-W003",
        wardId: "W003",
        population: 12000,
        reportsPending: 18,
        slaBreaches: 1,
        assignedOfficer: "Mike Wilson",
        officerContact: "+1-555-0125",
      },
    ],
  },
  {
    id: 2,
    name: "Residential North",
    code: "RN-002",
    wards: [
      {
        id: "RN-W001",
        wardId: "W004",
        population: 22000,
        reportsPending: 15,
        slaBreaches: 2,
        assignedOfficer: "Emily Davis",
        officerContact: "+1-555-0126",
      },
      {
        id: "RN-W002",
        wardId: "W005",
        population: 19500,
        reportsPending: 12,
        slaBreaches: 0,
        assignedOfficer: "David Brown",
        officerContact: "+1-555-0127",
      },
    ],
  },
  {
    id: 3,
    name: "Industrial East",
    code: "IE-003",
    wards: [
      {
        id: "IE-W001",
        wardId: "W006",
        population: 8500,
        reportsPending: 8,
        slaBreaches: 1,
        assignedOfficer: "Lisa Anderson",
        officerContact: "+1-555-0128",
      },
    ],
  },
];

const WardsPage: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState(mockZones[0]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newWard, setNewWard] = useState({
    wardId: "",
    population: "",
    assignedOfficer: "",
    officerContact: "",
  });

  const getSLABadge = (breaches: number) => {
    if (breaches === 0) return <Badge className="bg-green-500">Good</Badge>;
    if (breaches <= 2) return <Badge className="bg-orange-500">Warning</Badge>;
    return <Badge variant="destructive">Critical</Badge>;
  };

  const handleAddWard = () => {
    // Mock add functionality
    console.log("Adding ward:", newWard);
    setShowAddDialog(false);
    setNewWard({
      wardId: "",
      population: "",
      assignedOfficer: "",
      officerContact: "",
    });
  };

  const compareWards = () => {
    // Mock comparison functionality
    console.log("Comparing wards in zone:", selectedZone.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Wards</h2>
          <p className="text-muted-foreground">
            Manage wards within zones and monitor performance
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={compareWards} variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Compare Wards
          </Button>

          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Ward
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Ward to {selectedZone.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ward-id">Ward ID</Label>
                  <Input
                    id="ward-id"
                    value={newWard.wardId}
                    onChange={(e) =>
                      setNewWard({ ...newWard, wardId: e.target.value })
                    }
                    placeholder="Enter ward ID"
                  />
                </div>
                <div>
                  <Label htmlFor="population">Population</Label>
                  <Input
                    id="population"
                    type="number"
                    value={newWard.population}
                    onChange={(e) =>
                      setNewWard({ ...newWard, population: e.target.value })
                    }
                    placeholder="Enter population"
                  />
                </div>
                <div>
                  <Label htmlFor="officer">Assigned Officer</Label>
                  <Input
                    id="officer"
                    value={newWard.assignedOfficer}
                    onChange={(e) =>
                      setNewWard({
                        ...newWard,
                        assignedOfficer: e.target.value,
                      })
                    }
                    placeholder="Enter officer name"
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Officer Contact</Label>
                  <Input
                    id="contact"
                    value={newWard.officerContact}
                    onChange={(e) =>
                      setNewWard({ ...newWard, officerContact: e.target.value })
                    }
                    placeholder="Enter contact number"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddWard}>Add Ward</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Zone Selection */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="zone-select" className="text-sm font-medium">
            Select Zone:
          </Label>
          <Select
            value={selectedZone.id.toString()}
            onValueChange={(value) => {
              const zone = mockZones.find((z) => z.id.toString() === value);
              if (zone) setSelectedZone(zone);
            }}
          >
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockZones.map((zone) => (
                <SelectItem key={zone.id} value={zone.id.toString()}>
                  {zone.name} ({zone.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Zone Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Total Wards</div>
              <div className="text-2xl font-bold">
                {selectedZone.wards.length}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            <div>
              <div className="text-sm text-muted-foreground">
                Total Population
              </div>
              <div className="text-2xl font-bold">
                {selectedZone.wards
                  .reduce((sum, ward) => sum + ward.population, 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" />
            <div>
              <div className="text-sm text-muted-foreground">
                Pending Reports
              </div>
              <div className="text-2xl font-bold">
                {selectedZone.wards.reduce(
                  (sum, ward) => sum + ward.reportsPending,
                  0
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <div className="text-sm text-muted-foreground">SLA Breaches</div>
              <div className="text-2xl font-bold">
                {selectedZone.wards.reduce(
                  (sum, ward) => sum + ward.slaBreaches,
                  0
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Wards Table */}
      <Card>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Wards in {selectedZone.name}
          </h3>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ward ID</TableHead>
                <TableHead>Population</TableHead>
                <TableHead>Reports Pending</TableHead>
                <TableHead>SLA Status</TableHead>
                <TableHead>Assigned Officer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedZone.wards.map((ward) => (
                <TableRow key={ward.id}>
                  <TableCell className="font-medium">{ward.wardId}</TableCell>
                  <TableCell>{ward.population.toLocaleString()}</TableCell>
                  <TableCell>{ward.reportsPending}</TableCell>
                  <TableCell>{getSLABadge(ward.slaBreaches)}</TableCell>
                  <TableCell>{ward.assignedOfficer}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {ward.officerContact}
                  </TableCell>
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
                          View Reports
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Ward
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Change Officer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Ward
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Ward Comparison Analytics */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">
          Ward Performance Comparison
        </h3>
        <div className="text-center py-8 text-muted-foreground">
          <BarChart3 className="w-16 h-16 mx-auto mb-4" />
          <p>Ward comparison analytics and charts coming soon</p>
          <p className="text-sm">
            Will include population density, report trends, and SLA performance
            metrics
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WardsPage;
