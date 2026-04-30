import { useState } from "react";
import type { ShipmentParcelStatus } from "../../../constants_Types/types/Hub/HubShipment";
import { useWorkerDashboard, type WorkerParcelFilters } from "../../../Services/Worker/WorkerDashboard/useWorkerDashboard";
import { ParcelTable } from "./Components/ParcelTable";
import { WorkerInfo } from "./Components/WorkerInfo";
import { ActiveShipment } from "./Components/ActiveShipment";
import { useNavigate } from "react-router-dom";
import { ActiveShipmentSkeleton, GraphSkeleton, TableSkeleton, WorkerInfoSkeleton } from "./Components/WorkerSkeleton";
import WorkerGraph from "./Components/WorkerGraph";

export default function WorkerDashboardView() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<{
    fromDate?: string;
    toDate?: string;
    status?: ShipmentParcelStatus;
  }>({});
  const { parcels, graph, exportParcels, dashboard } = useWorkerDashboard(filters, page);


  const handleFilterChange = (newFilters: WorkerParcelFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
    setPage(1);
  };

  if (!dashboard || !parcels || !graph) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Logistics Worker Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-4">

          {/* LEFT */}
          <div className="col-span-1 flex flex-col gap-4">
            <WorkerInfoSkeleton />
            <ActiveShipmentSkeleton />
          </div>

          {/* RIGHT */}
          <div className="col-span-2 flex flex-col gap-4">
            <GraphSkeleton />
            <TableSkeleton />
          </div>

        </div>
      </div>
    );
  }
  const { worker, summary, activeShipment } = dashboard;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Logistics Worker Dashboard
      </h1>


      {/*  Bottom Layout */}
      <div className="grid grid-cols-3 gap-4">

        <div className="col-span-1 flex flex-col gap-4">

          {/*  Worker Card */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <WorkerInfo
              worker={worker}
              summary={summary}
              activeShipment={activeShipment?.id}
            />
          </div>

          {/* Active Shipment Card */}
          <div
            className={`bg-white p-4 rounded-2xl shadow cursor-pointer transition hover:shadow-md ${activeShipment ? "hover:bg-gray-50" : "opacity-60 cursor-not-allowed"
              }`}
            onClick={() => {
              if (activeShipment) {
                navigate(`/worker/shipment/${activeShipment.id}`);
              }
            }}
          >
            <ActiveShipment
              shipment={
                activeShipment
                  ? {
                    id: activeShipment.id,
                    type: activeShipment.type,
                    status: activeShipment.status,
                    from: activeShipment.fromHubId,
                    to: activeShipment.toHubId,
                    count: activeShipment.parcelCount,
                  }
                  : null
              }
            />
          </div>

        </div>

        {/*  RIGHT PANEL */}
        <div className="col-span-2 flex flex-col gap-4">

          {/*  Graph */}
          <WorkerGraph
            graph={graph}
            onApply={handleFilterChange}
            onClear={handleClearFilters}
            onExportPDF={() => exportParcels("pdf")}
            onExportExcel={() => exportParcels("excel")}
          />

          {/* Parcel Table */}
          <ParcelTable
            data={parcels?.data!}
            page={parcels?.page!}
            totalPages={parcels?.totalPages!}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}