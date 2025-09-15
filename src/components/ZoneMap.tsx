import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";

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

// Mock coordinates for different zones in a city (using NYC-like coordinates)
const mockZoneData = [
  {
    id: 1,
    coordinates: { lat: 40.7831, lng: -73.9712 }, // Central Manhattan
    boundary: [
      { lat: 40.7731, lng: -73.9812 },
      { lat: 40.7931, lng: -73.9812 },
      { lat: 40.7931, lng: -73.9612 },
      { lat: 40.7731, lng: -73.9612 },
    ],
  },
  {
    id: 2,
    coordinates: { lat: 40.8176, lng: -73.9782 }, // Upper Manhattan
    boundary: [
      { lat: 40.8076, lng: -73.9882 },
      { lat: 40.8276, lng: -73.9882 },
      { lat: 40.8276, lng: -73.9682 },
      { lat: 40.8076, lng: -73.9682 },
    ],
  },
  {
    id: 3,
    coordinates: { lat: 40.7505, lng: -73.9934 }, // Lower East Side
    boundary: [
      { lat: 40.7405, lng: -74.0034 },
      { lat: 40.7605, lng: -74.0034 },
      { lat: 40.7605, lng: -73.9834 },
      { lat: 40.7405, lng: -73.9834 },
    ],
  },
  {
    id: 4,
    coordinates: { lat: 40.7282, lng: -74.0776 }, // West Side
    boundary: [
      { lat: 40.7182, lng: -74.0876 },
      { lat: 40.7382, lng: -74.0876 },
      { lat: 40.7382, lng: -74.0676 },
      { lat: 40.7182, lng: -74.0676 },
    ],
  },
  {
    id: 5,
    coordinates: { lat: 40.7614, lng: -73.9776 }, // Midtown
    boundary: [
      { lat: 40.7514, lng: -73.9876 },
      { lat: 40.7714, lng: -73.9876 },
      { lat: 40.7714, lng: -73.9676 },
      { lat: 40.7514, lng: -73.9676 },
    ],
  },
];

const ZoneMap: React.FC<ZoneMapProps> = ({ zones, onZoneClick }) => {
  const getUrgencyBadge = (urgency: number) => {
    if (urgency >= 80) return <Badge variant="destructive">High</Badge>;
    if (urgency >= 50) return <Badge className="bg-orange-500">Medium</Badge>;
    return <Badge className="bg-green-500">Low</Badge>;
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
      coordinates: mockData?.coordinates || { lat: 40.7128, lng: -73.9851 },
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
        zoom={12}
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
