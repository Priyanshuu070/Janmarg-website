import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBadgeColors, getUrgencyFromScore } from "@/lib/badgeColors";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MapPin,
  Download,
  Edit,
  Eye,
  Trash2,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { CSVLink } from 'react-csv';
import { toast } from "sonner";

// Import wards data and process into zones
import { wardsCSVData, parseCSV, processWardsIntoZones, Ward, Zone } from '@/utils/wardsData';

const ZonesPage: React.FC = () => {
  const [view, setView] = useState<"table" | "map">("table");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [sortField, setSortField] = useState<keyof Zone>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [newZone, setNewZone] = useState({
    name: "",
    code: "",
    wards: "",
    state: "",
    district: ""
  });

  // Process wards data into zones
  const zones = useMemo(() => {
    const wards = parseCSV(wardsCSVData);
    return processWardsIntoZones(wards);
  }, []);

  // Sort zones
  const sortedZones = useMemo(() => {
    return [...zones].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }, [zones, sortField, sortDirection]);

  const handleSort = (field: keyof Zone) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Zone) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-2 h-4 w-4" />
      : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const variant = status === "High Priority" ? "destructive" : 
                   status === "Medium Priority" ? "default" : "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };

  const getUrgencyBadge = (score: number) => {
    const urgencyText = getUrgencyFromScore(score);
    return (
      <Badge className={getBadgeColors.urgency(urgencyText)}>
        {urgencyText} ({score})
      </Badge>
    );
  };

  const handleAddZone = () => {
    if (!newZone.name || !newZone.code || !newZone.wards) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Mock add functionality with success notification
    toast.success(`Zone "${newZone.name}" added successfully!`);
    setShowAddDialog(false);
    setNewZone({ name: "", code: "", wards: "", state: "", district: "" });
  };

  const handleViewZone = (zone: Zone) => {
    toast.info(`Viewing details for ${zone.name}`, {
      description: `${zone.wards} wards • ${zone.reports} reports • Urgency: ${zone.urgencyScore}%`
    });
  };

  const handleEditZone = (zone: Zone) => {
    toast.info(`Editing ${zone.name}`);
  };

  const handleDeleteZone = (zone: Zone) => {
    if (window.confirm(`Are you sure you want to delete ${zone.name}?`)) {
      toast.success(`Zone "${zone.name}" deleted successfully!`);
    }
  };

  // CSV export data
  const csvData = zones.map(zone => ({
    'Zone Name': zone.name,
    'Code': zone.code,
    'Wards': zone.wards,
    'Reports': zone.reports,
    'Active Contractors': zone.activeContractors,
    'Population': zone.population,
    'Urgency Score': zone.urgencyScore,
    'Status': zone.status,
    'State': zone.state,
    'District': zone.district
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Zones Management</h1>
          <p className="text-muted-foreground">
            Manage zones, wards, and monitor civic activities ({zones.length} zones total)
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
          <DialogContent className="sm:max-w-md bg-white border border-gray-200 shadow-xl">
            <DialogHeader className="pb-4 border-b border-gray-100">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Add New Zone
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="zone-name" className="text-sm font-medium text-gray-700">
                  Zone Name *
                </Label>
                <Input
                  id="zone-name"
                  value={newZone.name}
                  onChange={(e) =>
                    setNewZone({ ...newZone, name: e.target.value })
                  }
                  placeholder="Enter zone name"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone-code" className="text-sm font-medium text-gray-700">
                  Zone Code *
                </Label>
                <Input
                  id="zone-code"
                  value={newZone.code}
                  onChange={(e) =>
                    setNewZone({ ...newZone, code: e.target.value })
                  }
                  placeholder="Enter zone code (e.g., CEN-001)"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zone-wards" className="text-sm font-medium text-gray-700">
                    Number of Wards *
                  </Label>
                  <Input
                    id="zone-wards"
                    type="number"
                    value={newZone.wards}
                    onChange={(e) =>
                      setNewZone({ ...newZone, wards: e.target.value })
                    }
                    placeholder="0"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zone-state" className="text-sm font-medium text-gray-700">
                    State
                  </Label>
                  <Select onValueChange={(value) => setNewZone({ ...newZone, state: value })}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Haryana">Haryana</SelectItem>
                      <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone-district" className="text-sm font-medium text-gray-700">
                  District
                </Label>
                <Input
                  id="zone-district"
                  value={newZone.district}
                  onChange={(e) =>
                    setNewZone({ ...newZone, district: e.target.value })
                  }
                  placeholder="Enter district name"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddZone}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add Zone
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex gap-2">
          <CSVLink
            data={csvData}
            filename={`zones-data-${new Date().toISOString().split('T')[0]}.csv`}
            className="inline-flex"
          >
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </CSVLink>
        </div>
      </div>

      {/* Content */}
      {view === "table" ? (
        <Card className="border border-gray-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Zone Name
                    {getSortIcon('name')}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('code')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Code
                    {getSortIcon('code')}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('wards')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Wards
                    {getSortIcon('wards')}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('reports')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Reports
                    {getSortIcon('reports')}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">Contractors</TableHead>
                <TableHead className="font-semibold">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('population')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Population
                    {getSortIcon('population')}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('urgencyScore')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Urgency
                    {getSortIcon('urgencyScore')}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedZones.map((zone) => (
                <TableRow 
                  key={zone.id} 
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {zone.code}
                    </code>
                  </TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                      {zone.wards}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {zone.reports}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                      {zone.activeContractors}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {new Intl.NumberFormat('en-IN').format(zone.population)}
                  </TableCell>
                  <TableCell>{getUrgencyBadge(zone.urgencyScore)}</TableCell>
                  <TableCell>{getStatusBadge(zone.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                        <DropdownMenuItem 
                          onClick={() => handleViewZone(zone)}
                          className="hover:bg-gray-50"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleEditZone(zone)}
                          className="hover:bg-gray-50"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Zone
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteZone(zone)}
                          className="text-red-600 hover:bg-red-50"
                        >
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
            zones={zones.map((zone, index) => ({
              id: index + 1,
              name: zone.name,
              code: zone.code,
              wards: zone.wards,
              reports: zone.reports,
              activeContractors: zone.activeContractors,
              status: zone.status,
              urgencyScore: zone.urgencyScore,
              color: zone.urgencyScore > 80 ? '#ef4444' : zone.urgencyScore > 60 ? '#f59e0b' : '#10b981'
            }))}
            onZoneClick={(zone) => {
              toast.info(`Zone: ${zone.name} | Reports: ${zone.reports} | Urgency: ${zone.urgencyScore}`);
            }}
          />

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-sm text-muted-foreground">
                High Priority (80%+)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-600 rounded"></div>
              <span className="text-sm text-muted-foreground">
                Medium Priority (60-79%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-600 rounded"></div>
              <span className="text-sm text-muted-foreground">
                Low Priority (0-59%)
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ZonesPage;