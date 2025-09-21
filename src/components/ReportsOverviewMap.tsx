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
  zone: string;
  ward: string;
}

interface ReportsOverviewMapProps {
  reports: Report[];
  height?: string;
  onReportClick?: (report: Report) => void;
}

const ReportsOverviewMap: React.FC<ReportsOverviewMapProps> = ({
  reports,
  height = "400px",
  onReportClick,
}) => {
  const getStatusBadge = (status: string) => {
    return <Badge className={getBadgeColors.status(status)}>{status}</Badge>;
  };

  const getUrgencyBadge = (urgency: string) => {
    return <Badge className={getBadgeColors.urgency(urgency)}>{urgency}</Badge>;
  };

  // Create custom marker icon based on urgency and status
  const getMarkerIcon = (urgency: string, status: string) => {
    let color = "#6b7280"; // Default gray

    if (status === "Resolved") {
      color = "#10b981"; // Green for resolved
    } else {
      switch (urgency) {
        case "High":
          color = "#ef4444"; // Red
          break;
        case "Medium":
          color = "#f59e0b"; // Orange
          break;
        case "Low":
          color = "#10b981"; // Green
          break;
      }
    }

    const opacity = status === "Resolved" ? 0.6 : 1;

    return L.divIcon({
      html: `<div style="background-color: ${color}; opacity: ${opacity}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  // Calculate center point based on all report locations
  const centerLat =
    reports.length > 0
      ? reports.reduce((sum, report) => sum + report.coordinates.lat, 0) /
        reports.length
      : 40.7128;
  const centerLng =
    reports.length > 0
      ? reports.reduce((sum, report) => sum + report.coordinates.lng, 0) /
        reports.length
      : -74.006;

  return (
    <div className="rounded-lg overflow-hidden border" style={{ height }}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.coordinates.lat, report.coordinates.lng]}
            icon={getMarkerIcon(report.urgency, report.status)}
            eventHandlers={{
              click: () => onReportClick?.(report),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-base mb-2">
                  {String(report.issueType || 'Unknown Issue')}
                </h3>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>ID:</strong> {report.id}
                  </div>
                  <div>
                    <strong>Location:</strong> {report.location}
                  </div>
                  <div>
                    <strong>Zone:</strong> {report.zone}
                  </div>
                  <div>
                    <strong>Citizen:</strong> {report.citizen}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(report.status)}
                    {getUrgencyBadge(report.urgency)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {report.description.length > 80
                      ? `${report.description.substring(0, 80)}...`
                      : report.description}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ReportsOverviewMap;
