import type { Column, ShipmentRow } from "../../../../../shared/constants_Types/types/Hub/HubDashboard";
import type { ShipmentStatus } from "../../../../../shared/constants_Types/types/Worker/workerShipment";
type ShipmentStats = {
    total: number;
    pending: number;
    active: number;
    arrived: number;
    completed: number;
    cancelled: number;
};

export const STATUS_STYLES: Record<ShipmentStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-600",
    LOADING: "bg-blue-100 text-blue-600",
    DISPATCHED: "bg-indigo-100 text-indigo-600",
    ARRIVED: "bg-purple-100 text-purple-600",
    COMPLETED: "bg-green-100 text-green-600",
    CANCELLED: "bg-red-100 text-red-600",
};

export const DEFAULT_STATUS_STYLE = "bg-gray-100 text-gray-600";

export const STATS_CONFIG: {
    key: keyof ShipmentStats;
    title: string;
    icon: string;
}[] = [
        { key: "total", title: "Total Shipments", icon: "📦" },
        { key: "pending", title: "Pending", icon: "⏳" },
        { key: "active", title: "In Transit", icon: "🚚" },
        { key: "arrived", title: "Arrived", icon: "📍" },
        { key: "completed", title: "Completed", icon: "✅" },
    ];


export const getShipmentColumns = (): Column<ShipmentRow>[] => [
    {
        key: "type",
        label: "Type",
        render: (row) => (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                {row.type.replaceAll("_", " ")}
            </span>
        ),
    },
    {
        key: "status",
        label: "Status",
        render: (row) => (
            <span
                className={`px-2 py-1 text-xs rounded-full ${STATUS_STYLES[row.status] || DEFAULT_STATUS_STYLE
                    }`}
            >
                {row.status}
            </span>
        ),
    },
    {
        key: "parcelCount",
        label: "Parcels",
    },
    {
        key: "assignedWorkerId",
        label: "Worker",
        render: (row) =>
            row.assignedWorkerId ? (
                <span className="text-green-600 text-xs font-medium">Assigned</span>
            ) : (
                <span className="text-red-600 text-xs font-medium">Unassigned</span>
            ),
    },
    {
        key: "createdAt",
        label: "Created",
        render: (row) => (
            <span className="text-xs text-gray-500">
                {new Date(row.createdAt).toLocaleDateString()}
            </span>
        ),
    },
];