import { useNavigate } from "react-router-dom";
import type { TravelRequestStatus, TravelRequestUI } from "./TravelerBookingContents";

export const TravelRequestCard = ({ trip }: { trip: TravelRequestUI }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-gray-500">
                        #{trip.id}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {new Date(trip.departureAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="text-right">
                    <p className="font-semibold text-lg text-green-600">
                        ₹{trip.totalEarnings}
                    </p>
                    <TripStatusBadge status={trip.status} />
                </div>
            </div>

            {/* Route */}
            <div className="flex items-start gap-3">

                <div className="text-sm">
                    <p className="font-medium">
                        {trip.startAddress.split(",")[trip.startAddress.split(",").length - 3]} ({trip.startAddress.split(",")[trip.startAddress.split(",").length - 2]})
                    </p>
                    <p className="text-gray-400 text-xs">From</p>
                </div>

                <div className="mx-2 text-gray-300">→</div>

                <div className="text-sm">
                    <p className="font-medium">
                        {trip.endAddress.split(",")[trip.endAddress.split(",").length - 3]} ({trip.endAddress.split(",")[trip.endAddress.split(",").length - 2]})
                    </p>
                    <p className="text-gray-400 text-xs">To</p>
                </div>
            </div>

            {/* Capacity + Orders */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>
                    📦 {trip.capacityKg - trip.remainingCapacityKg}/{trip.capacityKg} kg booked
                </span>

                <span>
                    📑 {trip.totalOrders} Orders
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate(`/traveler/trip/${trip.id}`)}
                    className="text-sm font-medium"
                >
                    View
                </button>
            </div>
        </div>
    );
};


const TripStatusBadge = ({ status }: { status: TravelRequestStatus }) => {

    const config: Record<TravelRequestStatus, { label: string; className: string }> = {
        DRAFT: { label: "Draft", className: "text-gray-500" },
        PENDING_APPROVAL: { label: "Pending", className: "text-yellow-600" },
        ACTIVE: { label: "Active", className: "text-green-600" },
        PARTIALLY_BOOKED: { label: "Partially Booked", className: "text-blue-600" },
        FULLY_BOOKED: { label: "Full", className: "text-purple-600" },
        COMPLETED: { label: "Completed", className: "text-gray-700" },
        CANCELLED: { label: "Cancelled", className: "text-red-600" },
    };

    const current = config[status];

    return (
        <span className={`text-xs font-semibold ${current.className}`}>
            {current.label}
        </span>
    );
};
