import { useEffect, useState } from "react";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { ROLES } from "../../../shared/constants_Types/types/roles";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { FilterBar } from "../../Hub/ShipmentManagement/components/FilterBar";
import type { UIShipmentFilters } from "../../../shared/constants_Types/types/Hub/HubShipment";
import { useWorkerShipments } from "../../../Services/Worker/WorkersShipment";
import { WorkerShipmentCard } from "./components/WorkerShipmentCard";
import type { WorkerShipment } from "../../../shared/constants_Types/types/Worker/workerShipment";

const WorkerShipmentPage = () => {
  const { getShipments } = useWorkerShipments();

  const [shipments, setShipments] = useState<WorkerShipment[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<UIShipmentFilters>({
    search: "",
    status: "ALL",
    workerId: "",
    type: "BULK_PICKUP",
    dateRange: "Today",
  });

  const fetchShipments = async () => {
    try {
      setLoading(true);

      const data = await getShipments({
        status: filters.status !== "ALL" ? filters.status : undefined,
        search: filters.search || undefined,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
        page: 1,
        limit: 10,
      });

      console.log(data, "Worker Shipments Data");

      // ✅ FIXED HERE
      setShipments(data.data);

    } catch (err) {
      console.error("Failed to fetch shipments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, [filters]);

  return (
    <DashboardProvider role={ROLES.WORKER}>
      <DashboardLayout pageTitle="My Shipments">

        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900">
            My Shipments
          </h1>
          <p className="text-sm text-gray-500">
            Track and manage your assigned shipments
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border rounded-xl shadow-sm p-3">
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            activeTab={filters.type}
            role="worker"
          />
        </div>

        {/* Shipment List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-44 bg-white border rounded-xl shadow-sm animate-pulse"
              />
            ))}
          </div>
        ) : shipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-sm">No shipments assigned</p>
          </div>
        ) : (
          <div className="grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {shipments.map((shipment) => (
              <WorkerShipmentCard
                key={shipment.id}
                shipment={shipment}
              />
            ))}
          </div>
        )}

      </DashboardLayout>
    </DashboardProvider>
  );
};

export default WorkerShipmentPage;