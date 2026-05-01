import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { RouteSegmentDTO } from "../../shared/constants_Types/types/Agency/AgencyRouteSegment.dto";
// import type { RouteSegmentDTO } from "../../pages/Agency/RouteGroups/RouteGroupDetailPage";

// 🔧 Fix default marker icons (important for React + Vite)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

/**
 * Auto fit map bounds to route
 */
function MapController({ points }: { points: [number, number][] }) {
    const map = useMap();

    useEffect(() => {
        if (points.length > 0) {
            map.fitBounds(points, { padding: [30, 30] });
        }
    }, [points]);

    return null;
}

export default function RouteMapPreview({
    segments,
}: {
    segments: RouteSegmentDTO[];
}) {
    if (!segments.length) return null;

    // 🔗 Build route points in correct order
    const points: [number, number][] = [];

    segments.forEach((seg, index) => {
        if (index === 0) {
            points.push([seg.originHubLocation.lat, seg.originHubLocation.lng]);
        }
        points.push([seg.destinationHubLocation.lat, seg.destinationHubLocation.lng]);
    });

    return (
        <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">

            <MapContainer
                center={points[0]}
                zoom={6}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {/* Auto zoom to fit full route */}
                <MapController points={points} />

                {/* 📍 Markers */}
                {segments.map((seg, index) => (
                    <Marker
                        key={`origin-${index}`}
                        position={[seg.originHubLocation.lat, seg.originHubLocation.lng]}
                    >
                        <Popup>
                            <div className="text-xs">
                                <strong>{seg.originHubName}</strong>
                                <br />
                                Stop #{index + 1}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Last destination marker */}
                <Marker
                    position={[
                        segments[segments.length - 1].destinationHubLocation.lat,
                        segments[segments.length - 1].destinationHubLocation.lng,
                    ]}
                >
                    <Popup>
                        <div className="text-xs">
                            <strong>
                                {
                                    segments[segments.length - 1]
                                        .destinationHubName
                                }
                            </strong>
                            <br />
                            Final Destination
                        </div>
                    </Popup>
                </Marker>

                {/* 🔵 Route line */}
                <Polyline
                    positions={points}
                    pathOptions={{
                        color: "#1E3A8A",
                        weight: 4,
                    }}
                />
            </MapContainer>
        </div>
    );
}