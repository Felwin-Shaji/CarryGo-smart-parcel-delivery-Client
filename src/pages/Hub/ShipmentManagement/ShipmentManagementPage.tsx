import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShipmentCard } from "./components/ShipmentCard";
import type { Shipment, UIShipmentFilters, } from "../../../constants_Types/types/Hub/HubShipment";
import { useHubShipment } from "../../../Services/Hub/HubShipment";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { ROLES } from "../../../constants_Types/types/roles";
import { FilterBar } from "./components/FilterBar";

export type ShipmentType = "BULK_PICKUP" | "HUB_TRANSFER" | "OUT_FOR_DELIVERY";

const TAB_CONFIG = [
    { label: "First Mile", type: "BULK_PICKUP" },
    { label: "Linehaul", type: "HUB_TRANSFER" },
    { label: "Last Mile", type: "OUT_FOR_DELIVERY" },
];

export const ShipmentManagementPage = () => {

    const [searchParams] = useSearchParams();

    const typeFromUrl = searchParams.get("type") as ShipmentType | null;
    const { getShipments } = useHubShipment();

    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(false);

    const [activeTab, setActiveTab] = useState<ShipmentType>(
        typeFromUrl || "BULK_PICKUP"
    );
    const [filters, setFilters] = useState<UIShipmentFilters>({
        search: "",
        status: "ALL",
        workerId: "ALL",
        type: "BULK_PICKUP",
        dateRange: "Today",
    });

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                setLoading(true);

                const data = await getShipments({
                    type: activeTab,
                    status: filters.status !== "ALL" ? filters.status : undefined,
                    workerId: filters.workerId !== "ALL" ? filters.workerId : undefined,
                    search: filters.search || undefined,

                    fromDate: filters.fromDate,
                    toDate: filters.toDate,

                    page: 1,
                    limit: 10,
                });

                setShipments(data.shipments);
            } catch (err) {
                console.error("Failed to fetch shipments:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchShipments();
    }, [activeTab, filters]);

    return (
        <DashboardProvider role={ROLES.HUB}>
            <DashboardLayout pageTitle="Shipment Management">
                <div className="w-full">
                    <div
                        className="
                            !flex !items-center !bg-white !border !border-gray-200 !rounded-2xl !px-1 !py-1 !shadow-sm !gap-2 w-full ">
                        {TAB_CONFIG.map((tab, index) => {
                            const isActive = activeTab === tab.type;

                            return (
                                <div key={tab.type} className="flex items-center flex-1">

                                    {/* TAB */}
                                    <button
                                        onClick={() => setActiveTab(tab.type as ShipmentType)}
                                        className={`
                                            relative flex items-center justify-center gap-2
                                            w-full px-4 py-2.5
                                            text-sm font-medium
                                            rounded-xl
                                            transition-all duration-100 border

                                            ${isActive
                                                ? "bg-blue text-white  shadow-md"
                                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                            }
                                        `}>

                                        {/* ICON */}
                                        <span className="text-base">
                                            {tab.type === "BULK_PICKUP" && "📦"}
                                            {tab.type === "HUB_TRANSFER" && "⇄"}
                                            {tab.type === "OUT_FOR_DELIVERY" && "🚚"}
                                        </span>

                                        {tab.label}

                                        {/* ACTIVE GLOW */}
                                        {isActive && (
                                            <span className="absolute inset-0 rounded-xl ring-2 ring-blue-200"></span>
                                        )}
                                    </button>

                                    {/* CONNECTOR LINE */}
                                    {index !== TAB_CONFIG.length - 1 && (
                                        <div className="flex-1 h-[2px] bg-gray-200 mx-2 relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-transparent"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tabs */}

                {/* Filters */}
                <FilterBar
                    filters={filters}
                    setFilters={setFilters}
                    activeTab={activeTab}
                />
                {/* Shipment List */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-40 bg-white rounded-2xl shadow-sm animate-pulse"
                            />
                        ))}
                    </div>
                ) : shipments.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        📦 No shipments found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {shipments.map((shipment) => (
                            <ShipmentCard key={shipment.id} shipment={shipment} activeTab={activeTab} />
                        ))}
                    </div>
                )}
                {/* </div> */}
            </DashboardLayout>
        </DashboardProvider>
    );
};