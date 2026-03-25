import { ChevronRight, MapPin, Package, Truck, User } from "lucide-react";
import type { Shipment } from "../../../../constants_Types/types/Hub/HubShipment";

const StatusBadge = ({ status }: { status: Shipment["status"] }) => {
    const config: Record<Shipment["status"], { label: string; class: string }> = {
        PENDING: { label: "Pending", class: "bg-yellow-100 text-yellow-800 border border-yellow-200" },
        LOADING: { label: "Loading", class: "bg-blue-100 text-blue-800 border border-blue-200" },
        DISPATCHED: { label: "Dispatched", class: "bg-purple-100 text-purple-800 border border-purple-200" },
        ARRIVED: { label: "Arrived", class: "bg-teal-100 text-teal-800 border border-teal-200" },
        COMPLETED: { label: "Completed", class: "bg-green-100 text-green-800 border border-green-200" },
        CANCELLED: { label: "Cancelled", class: "bg-red-100 text-red-800 border border-red-200" },
    };
    const { label, class: cls } = config[status];
    return (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>
            {label}
        </span>
    );
};


interface ShipmentCardProps {
    shipment: Shipment;
    onAssignClick: (shipment: Shipment) => void;
}

const ShipmentCard = ({ shipment, onAssignClick }: ShipmentCardProps) => {
    const isPending = shipment.status === "PENDING";

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">

            {/* Top accent bar for pending */}
            {isPending && (
                <div className="h-1 w-full" style={{ backgroundColor: "var(--color-accent)" }} />
            )}

            <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: isPending ? "#FEF9C3" : "#EFF1F7" }}>
                            <Truck size={20} style={{ color: isPending ? "#854d0e" : "var(--color-primary)" }} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-medium">Shipment</p>
                            <p className="text-sm font-bold text-gray-800">#{shipment.id}</p>
                        </div>
                    </div>
                    <StatusBadge status={shipment.status} />
                </div>

                {/* Route */}
                <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-gray-50">
                    <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-600 truncate">{shipment.fromHub}</span>
                    <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-600 truncate">{shipment.toHub}</span>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Package size={14} className="text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700">{shipment.parcelCount}</span>
                        <span className="text-xs text-gray-400">parcels</span>
                    </div>
                    {shipment.capacity && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-400">capacity</span>
                            <span className="text-sm font-semibold text-gray-700">{shipment.capacity}</span>
                        </div>
                    )}
                    {shipment.vehicleNumber && (
                        <div className="flex items-center gap-1.5">
                            <Truck size={14} className="text-gray-400" />
                            <span className="text-xs font-mono font-semibold text-gray-700">{shipment.vehicleNumber}</span>
                        </div>
                    )}
                </div>

                {/* Worker info or assign button */}
                {shipment.assignedWorkerName ? (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-100 bg-gray-50">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: "var(--color-primary)" }}>
                            {shipment.assignedWorkerName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{shipment.assignedWorkerName}</span>
                    </div>
                ) : isPending ? (
                    <button
                        onClick={() => onAssignClick(shipment)}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                        style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}>
                        <User size={15} />
                        Assign Worker
                    </button>
                ) : (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-100">
                        <User size={14} className="text-gray-300" />
                        <span className="text-sm text-gray-400">No worker assigned</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShipmentCard