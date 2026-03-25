import { useState } from "react";
import type { Shipment } from "../../../constants_Types/types/Hub/HubShipment";
import { AlertCircle, Truck } from "lucide-react";
import ShipmentCard from "./components/ShipmentCard";
import AssignWorkerModal, { MOCK_SHIPMENTS, MOCK_WORKERS } from "./components/AssignWorkerModal";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { ROLES } from "../../../constants_Types/types/roles";
import { DashboardLayout } from "../../../layouts/DashboardLayout";

const FILTER_TABS = ["ALL", "PENDING", "LOADING", "DISPATCHED", "ARRIVED", "COMPLETED"] as const;
type FilterTab = typeof FILTER_TABS[number];


const HubShipmentsPage = () => {
    const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS);
    const [activeFilter, setActiveFilter] = useState<FilterTab>("ALL");
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

    const filtered = shipments.filter(
        (s) => activeFilter === "ALL" || s.status === activeFilter
    );

    const pendingCount = shipments.filter((s) => s.status === "PENDING").length;

    const handleAssign = async (
        shipmentId: string,
        workerId: string,
        vehicleNumber: string,
        capacity: number
    ) => {
        // Replace with real API call:
        // await api.patch(`/shipments/${shipmentId}/assign-worker`, { workerId, vehicleNumber, capacity })
        await new Promise((res) => setTimeout(res, 1000));
        const worker = MOCK_WORKERS.find((w) => w.id === workerId);
        setShipments((prev) =>
            prev.map((s) =>
                s.id === shipmentId
                    ? { ...s, assignedWorkerName: worker?.name ?? null, vehicleNumber, capacity }
                    : s
            )
        );
    };

    return (
        <DashboardProvider role={ROLES.HUB}>
            <DashboardLayout>


                <div className="p-6 max-w-6xl mx-auto">

                    {/* Page header */}
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                                Shipments
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Manage and dispatch hub shipments
                            </p>
                        </div>
                        {pendingCount > 0 && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                                style={{ backgroundColor: "#FEF9C3", color: "#854d0e" }}>
                                <AlertCircle size={16} />
                                {pendingCount} pending assignment{pendingCount > 1 ? "s" : ""}
                            </div>
                        )}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: "Total", value: shipments.length, color: "var(--color-primary)" },
                            { label: "Pending", value: shipments.filter(s => s.status === "PENDING").length, color: "#d97706" },
                            { label: "In Transit", value: shipments.filter(s => s.status === "DISPATCHED").length, color: "#7c3aed" },
                            { label: "Completed", value: shipments.filter(s => s.status === "COMPLETED").length, color: "#059669" },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                                <p className="text-xs text-gray-400 font-medium mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filter tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                        {FILTER_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
                                style={{
                                    backgroundColor: activeFilter === tab ? "var(--color-primary)" : "#fff",
                                    color: activeFilter === tab ? "#fff" : "#6b7280",
                                    border: activeFilter === tab ? "none" : "1px solid #e5e7eb",
                                }}>
                                {tab === "ALL" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
                                {tab !== "ALL" && (
                                    <span className="ml-1.5 text-xs opacity-70">
                                        ({shipments.filter(s => s.status === tab).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Shipment grid */}
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <Truck size={40} className="mb-3 opacity-30" />
                            <p className="text-sm">No shipments found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filtered.map((shipment) => (
                                <ShipmentCard
                                    key={shipment.id}
                                    shipment={shipment}
                                    onAssignClick={setSelectedShipment}
                                />
                            ))}
                        </div>
                    )}

                    {/* Assign Worker Modal */}
                    {selectedShipment && (
                        <AssignWorkerModal
                            shipment={selectedShipment}
                            onClose={() => setSelectedShipment(null)}
                            onAssign={handleAssign}
                        />
                    )}
                </div>
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default HubShipmentsPage;