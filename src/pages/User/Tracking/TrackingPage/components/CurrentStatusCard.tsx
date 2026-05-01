import { Truck } from "lucide-react";
import type { AgencyParcelTrackingDTO } from "../../../../../shared/constants_Types/types/User/Booking/ParcelTracking";

interface Props {
    shipment: AgencyParcelTrackingDTO["shipment"] | null;
}

export default function ActiveShipmentCard({ shipment }: Props) {

    const getStatusStyle = (status?: string | null) => {
        if (!status) return "bg-gray-100 text-gray-600";

        const s = status.toUpperCase();

        if (s.includes("DISPATCH") || s.includes("TRANSIT"))
            return "bg-blue-100 text-blue-700";

        if (s.includes("DELIVERED"))
            return "bg-green-100 text-green-700";

        return "bg-gray-100 text-gray-600";
    };

    const formatStatus = (status?: string | null) => {
        if (!status) return "Pending";
        return status
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    const formatDate = (date?: Date | null) => {
        return date ? new Date(date).toLocaleString() : "—";
    };

    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">

            {/* Header */}
            <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-800">
                    Active Shipment
                </h3>
            </div>

            {/* EMPTY STATE */}
            {!shipment && (
                <div className="flex flex-col items-center justify-center text-center py-8 space-y-3">

                    {/* Icon */}
                    <div className="bg-gray-100 p-4 rounded-full">
                        <Truck className="w-6 h-6 text-gray-400" />
                    </div>

                    {/* Title */}
                    <p className="text-sm font-medium text-gray-700">
                        Shipment Not Yet Assigned
                    </p>

                    {/* Description */}
                    <p className="text-xs text-gray-500 max-w-xs">
                        Your parcel is being processed and will be assigned to a shipment soon.
                        Please check back later for updates.
                    </p>

                    {/* Optional hint */}
                    <p className="text-[11px] text-gray-400">
                        This usually happens before dispatch.
                    </p>
                </div>
            )}

            {/* CONTENT */}
            {shipment && (
                <div className="space-y-5 text-sm">

                    {/* Vehicle */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Vehicle</span>
                        <span className="font-medium text-gray-800">
                            {shipment.vehicleNumber || "Not assigned"}
                        </span>
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Status</span>
                        <span
                            className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                                shipment.status
                            )}`}
                        >
                            {formatStatus(shipment.status)}
                        </span>
                    </div>

                    {/* Departed */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Departed</span>
                        <span className="text-gray-800">
                            {formatDate(shipment.departedAt)}
                        </span>
                    </div>

                    {/* Arrived (optional but recommended) */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Arrived</span>
                        <span className="text-gray-800">
                            {formatDate(shipment.arrivedAt)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}