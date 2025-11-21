import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";

interface Props {
    onSelect: (lat: number, lng: number) => void;
    position: [number, number] | null;
}

function MapController({ position }: { position: [number, number] | null }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position, 15);
        }
    }, [position]);

    return null;
}

export default function MapLocationPicker({ onSelect, position }: Props) {
    const [marker, setMarker] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (position) {
            setMarker(position);
        }
    }, [position]);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const lat = e.latlng.lat;
                const lng = e.latlng.lng;
                setMarker([lat, lng]);
                onSelect(lat, lng);
            },
        });

        return marker ? (
            <Marker
                position={marker}
                draggable
                eventHandlers={{
                    dragend(e) {
                        const lat = e.target.getLatLng().lat;
                        const lng = e.target.getLatLng().lng;
                        setMarker([lat, lng]);
                        onSelect(lat, lng);
                    },
                }}
            />
        ) : null;
    };

    return (
        <div className="w-full h-[350px] rounded-xl overflow-hidden border shadow">
            <MapContainer
                center={marker ? marker : [10.457738, 76.288194]}
                zoom={marker ? 10 : 5}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                <MapController position={marker} />
                <LocationMarker />
            </MapContainer>
        </div>
    );
}
