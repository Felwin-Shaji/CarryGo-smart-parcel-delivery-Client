import { MapPin, Navigation } from "lucide-react";
import type { TripOrderUI } from "../../../../../shared/constants_Types/types/User/Traveler/TravelerType";

export default function TrackingModal({
    order,
    onClose,
}: {
    order: TripOrderUI;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-[800px] p-6 space-y-4">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">
                        Tracking #{order.id}
                    </h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* MAP */}
                <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-gray-50 p-6 space-y-6">

                    {/* HEADER */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="p-3 bg-white rounded-full shadow">
                            <MapPin className="text-blue-600" size={20} />
                        </div>

                        <div className="text-center">
                            <p className="font-semibold text-gray-800">
                                Live Navigation
                            </p>
                            <p className="text-xs text-gray-500">
                                {order.status === "PAID_PENDING_PICKUP" && "Heading to pickup location"}
                                {(order.status === "PICKED_UP" || order.status === "IN_TRANSIT") &&
                                    "Heading to delivery location"}
                                {order.status === "DELIVERED" && "Delivery completed"}
                            </p>
                        </div>
                    </div>

                    {/* ROUTE VISUAL */}
                    <div className="flex items-center justify-center gap-4">

                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-700">
                                {order.pickupAddress.city}
                            </p>
                            <p className="text-xs text-gray-400">Pickup</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="w-[2px] h-10 bg-blue-300"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-medium text-gray-700">
                                {order.deliveryAddress.city}
                            </p>
                            <p className="text-xs text-gray-400">Delivery</p>
                        </div>

                    </div>

                    {/* CTA */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => window.open(buildGoogleMapsUrl(order), "_blank")}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                        >
                            <Navigation size={16} />
                            Open in Google Maps
                        </button>
                    </div>

                </div>

                {/* ADDRESSES */}
                <div className="grid grid-cols-2 gap-4 text-sm">

                    {/* PICKUP */}
                    <div className="p-4 rounded-xl border bg-white shadow-sm">
                        <p className="text-xs text-gray-400 mb-1">Pickup</p>
                        <p className="font-medium text-gray-800">
                            {order.pickupAddress.city}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                            {order.pickupAddress.formattedAddress}
                        </p>
                    </div>

                    {/* DELIVERY */}
                    <div className="p-4 rounded-xl border bg-white shadow-sm">
                        <p className="text-xs text-gray-400 mb-1">Delivery</p>
                        <p className="font-medium text-gray-800">
                            {order.deliveryAddress.city}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                            {order.deliveryAddress.formattedAddress}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}

function buildGoogleMapsUrl(order: TripOrderUI) {
    const pickup = order.pickupAddress.location;
    const delivery = order.deliveryAddress.location;

    const destination =
        order.status === "PAID_PENDING_PICKUP"
            ? pickup
            : delivery;

    // If delivered → just show location
    if (order.status === "DELIVERED") {
        return `https://www.google.com/maps?q=${destination.lat},${destination.lng}`;
    }

    // Navigation from current location → destination
    return `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}&travelmode=driving`;
}