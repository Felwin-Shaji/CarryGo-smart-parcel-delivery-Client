import { Package, Truck, MapPin, Activity } from "lucide-react";
import type { GetWorkerDashboardResponseDTO } from "../../../../constants_Types/types/Worker/WorkerDashboard";
import { StatCard } from "./StatCard";

type WorkerRole = "PICKUP" | "TRANSPORT" | "OUT_FOR_DELIVERY";

type Props = {
    worker: GetWorkerDashboardResponseDTO["worker"];
    summary: GetWorkerDashboardResponseDTO["summary"];
    activeShipment?: string
};

export const WorkerInfo = ({ worker, summary, activeShipment }: Props) => {

    const roleConfig = {
        PICKUP: {
            icon: Package,
            color: "text-yellow-600",
            label: "Pickup Agent",
        },
        TRANSPORT: {
            icon: Truck,
            color: "text-blue-600",
            label: "Transporter",
        },
        OUT_FOR_DELIVERY: {
            icon: MapPin,
            color: "text-green-600",
            label: "Delivery Agent",
        },
    };

    const current = roleConfig[worker.workerRole as WorkerRole];
    const Icon = current.icon;

    return (
        <div className="bg-white rounded-2xl shadow p-4">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                        <Icon className={current.color} size={18} />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Worker</p>
                        <p className="text-base font-semibold text-gray-900">
                            {worker.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats using StatCard */}
            <div className="grid grid-cols-2 gap-3">

                <StatCard
                    title="Today Stats"
                    value={`${summary.todayShipmentCount} shipments`}
                    sub={`${summary.todayParcelHandledCount} parcels`}
                    icon={<Package size={16} />}
                />

                <StatCard
                    title="Active Shipment"
                    value={activeShipment ? "Active" : "None"}
                    sub={`${summary.pendingParcelCount} pending`}
                    icon={<Truck size={16} />}
                />

                <StatCard
                    title="Completed Work"
                    value={`${summary.completedShipmentCount} shipments`}
                    sub={`${summary.completedParcelCount} parcels`}
                    icon={<Activity size={16} />}
                />

                <StatCard
                    title="Completion rate"
                    value={`${summary.completionRate}%`}
                    icon={<MapPin size={16} />}
                />

            </div>

            {/* Footer */}
            <div className="flex justify-between mt-4 text-xs text-gray-500">
                <span>Role</span>
                <span className="font-medium text-gray-800">
                    {current.label}
                </span>
            </div>

        </div>
    );
};