import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";
import { getBadgeColors } from "@/lib/badgeColors";

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Report {
  id: string;
  issueType: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: string;
  urgency: string;
  citizen: string;
  description: string;
  created: string;
}

interface ReportMapProps {
  report: Report;
  height?: string;
}

const ReportMap: React.FC<ReportMapProps> = ({ report, height = "300px" }) => {
  const getStatusBadge = (status: string) => {
    return <Badge className={getBadgeColors.status(status)}>{status}</Badge>;
  };

  const getUrgencyBadge = (urgency: string) => {
    return <Badge className={getBadgeColors.urgency(urgency)}>{urgency}</Badge>;
  };

  // Create custom marker icon based on urgency
  const getMarkerIcon = (urgency: string) => {
    const color =
      urgency === "High"
        ? "#ef4444"
        : urgency === "Medium"
        ? "#f59e0b"
        : "#10b981";

    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="rounded-lg overflow-hidden border" style={{ height }}>
      <MapContainer
        center={[report.coordinates.lat, report.coordinates.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker
          position={[report.coordinates.lat, report.coordinates.lng]}
          icon={getMarkerIcon(report.urgency)}
        >
          <Popup>
            <div className="p-2 min-w-[250px]">
              <h3 className="font-semibold text-lg mb-2">{String(report.issueType || 'Unknown Issue')}</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Report ID:</strong> {report.id}
                </div>
                <div>
                  <strong>Location:</strong> {report.location}
                </div>
                <div>
                  <strong>Citizen:</strong> {report.citizen}
                </div>
                <div>
                  <strong>Created:</strong> {report.created}
                </div>
                <div className="flex items-center gap-2">
                  <strong>Status:</strong> {getStatusBadge(report.status)}
                </div>
                <div className="flex items-center gap-2">
                  <strong>Urgency:</strong> {getUrgencyBadge(report.urgency)}
                </div>
                <div>
                  <strong>Description:</strong>
                </div>
                <div className="text-xs text-muted-foreground italic">
                  {report.description}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ReportMap;
