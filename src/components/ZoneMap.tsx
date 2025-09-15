import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";
import { getBadgeColors, getUrgencyFromScore } from "@/lib/badgeColors";

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

interface Zone {
  id: number;
  name: string;
  code: string;
  wards: number;
  reports: number;
  activeContractors: number;
  status: string;
  urgencyScore: number;
  color: string;
  coordinates?: { lat: number; lng: number };
  boundary?: { lat: number; lng: number }[];
}

interface ZoneMapProps {
  zones: Zone[];
  onZoneClick?: (zone: Zone) => void;
}

// Mock coordinates for different zones in Jharkhand state
const mockZoneData = [
  {
    id: 1,
    coordinates: { lat: 23.3441, lng: 85.3096 }, // Ranchi Urban
    boundary: [
      { lat: 23.3241, lng: 85.2896 },
      { lat: 23.3641, lng: 85.2896 },
      { lat: 23.3641, lng: 85.3296 },
      { lat: 23.3241, lng: 85.3296 },
    ],
  },
  {
    id: 2,
    coordinates: { lat: 22.8046, lng: 86.2029 }, // Jamshedpur Industrial
    boundary: [
      { lat: 22.7846, lng: 86.1829 },
      { lat: 22.8246, lng: 86.1829 },
      { lat: 22.8246, lng: 86.2229 },
      { lat: 22.7846, lng: 86.2229 },
    ],
  },
  {
    id: 3,
    coordinates: { lat: 23.7957, lng: 86.4304 }, // Dhanbad Mining
    boundary: [
      { lat: 23.7757, lng: 86.4104 },
      { lat: 23.8157, lng: 86.4104 },
      { lat: 23.8157, lng: 86.4504 },
      { lat: 23.7757, lng: 86.4504 },
    ],
  },
  {
    id: 4,
    coordinates: { lat: 23.6693, lng: 86.1511 }, // Bokaro Steel City
    boundary: [
      { lat: 23.6493, lng: 86.1311 },
      { lat: 23.6893, lng: 86.1311 },
      { lat: 23.6893, lng: 86.1711 },
      { lat: 23.6493, lng: 86.1711 },
    ],
  },
  {
    id: 5,
    coordinates: { lat: 24.4869, lng: 85.3094 }, // Hazaribagh Central
    boundary: [
      { lat: 24.4669, lng: 85.2894 },
      { lat: 24.5069, lng: 85.2894 },
      { lat: 24.5069, lng: 85.3294 },
      { lat: 24.4669, lng: 85.3294 },
    ],
  },
];

const ZoneMap: React.FC<ZoneMapProps> = ({ zones, onZoneClick }) => {
  const getUrgencyBadge = (urgency: number) => {
    const urgencyText = getUrgencyFromScore(urgency);
    return (
      <Badge className={getBadgeColors.urgency(urgencyText)}>
        {urgencyText}
      </Badge>
    );
  };

  const getUrgencyColor = (urgency: number) => {
    if (urgency >= 80) return "#ef4444";
    if (urgency >= 50) return "#f59e0b";
    return "#10b981";
  };

  // Merge zone data with mock coordinates
  const zonesWithCoordinates = zones.map((zone) => {
    const mockData = mockZoneData.find((mock) => mock.id === zone.id);
    return {
      ...zone,
      coordinates: mockData?.coordinates || { lat: 23.3441, lng: 85.3096 }, // Default to Ranchi
      boundary: mockData?.boundary || [],
    };
  });

  // Center the map on the average of all zone coordinates
  const centerLat =
    zonesWithCoordinates.reduce((sum, zone) => sum + zone.coordinates!.lat, 0) /
    zonesWithCoordinates.length;
  const centerLng =
    zonesWithCoordinates.reduce((sum, zone) => sum + zone.coordinates!.lng, 0) /
    zonesWithCoordinates.length;

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {zonesWithCoordinates.map((zone) => (
          <React.Fragment key={zone.id}>
            {/* Zone boundary polygon */}
            {zone.boundary && zone.boundary.length > 0 && (
              <Polygon
                positions={zone.boundary}
                pathOptions={{
                  fillColor: getUrgencyColor(zone.urgencyScore),
                  fillOpacity: 0.3,
                  color: getUrgencyColor(zone.urgencyScore),
                  weight: 2,
                }}
                eventHandlers={{
                  click: () => onZoneClick?.(zone),
                }}
              />
            )}

            {/* Zone marker */}
            <Marker
              position={[zone.coordinates!.lat, zone.coordinates!.lng]}
              eventHandlers={{
                click: () => onZoneClick?.(zone),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-lg mb-2">{zone.name}</h3>
                  <div className="space-y-1 text-sm">
                    <div>
                      <strong>Code:</strong> {zone.code}
                    </div>
                    <div>
                      <strong>Wards:</strong> {zone.wards}
                    </div>
                    <div>
                      <strong>Reports:</strong> {zone.reports}
                    </div>
                    <div>
                      <strong>Active Contractors:</strong>{" "}
                      {zone.activeContractors}
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Urgency:</strong>
                      {getUrgencyBadge(zone.urgencyScore)}
                      <span>({zone.urgencyScore}%)</span>
                    </div>
                    <div>
                      <strong>Status:</strong> {zone.status}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default ZoneMap;
