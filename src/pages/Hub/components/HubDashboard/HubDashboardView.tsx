import { useMemo, useState } from "react";
import { SectionCard } from "./Components/SectionCard";
import { StatsGrid } from "./Components/StatCard";
import { DonutChart } from "./Components/DonutChart";
import { TrendChart } from "./Components/TrendChart";
import { useHubDashboard } from "../../../../Services/Hub/HubDashboard/useHubDashboard";
import { WorkerReadiness } from "./Components/WorkerReadiness";
import { WorkerActions } from "./Components/WorkerActions";
import { TableCard } from "./Components/TableCard";


import type { Roles } from "../../../../shared/constants_Types/types/roles";
import { getShipmentColumns, STATS_CONFIG } from "./configs/dashboard.config";
import type { HubShipmentListItemDTO } from "../../../../shared/constants_Types/types/Hub/HubDashboard";
import { SectionActionButton } from "./Components/SectionActionButton";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HubDashboardSkeleton } from "./Components/HubDashboardSkeleton";
import { TrendFilter } from "./Components/TrendFilter";

type Props = {
  role?: Roles;
};

const HubDashboardView = ({ role }: Props) => {
  const navigate = useNavigate();
  const { summary, trend, types, shipments, fetchTrend } = useHubDashboard();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const columns = useMemo(() => getShipmentColumns(), []);


  const isHub = role === "hub";

  if (!summary || !types) {
    return <HubDashboardSkeleton />;
  }

  return (
    <div className="p-4 space-y-6">

      {/* KPI */}
      <StatsGrid
        stats={STATS_CONFIG.map((stat) => ({
          title: stat.title,
          icon: stat.icon,
          value: summary.shipments[stat.key],
        }))}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SectionCard
            title="Shipment Trend"
            action={
              <TrendFilter
                fromDate={fromDate}
                toDate={toDate}
                onChangeFrom={setFromDate}
                onChangeTo={setToDate}
                onApply={() => fetchTrend({ from: fromDate, to: toDate })}
                onClear={() => {
                  setFromDate("");
                  setToDate("");
                  fetchTrend();
                }}
              />
            }
          >
            <TrendChart
              data={trend.map((t) => ({
                date: t.date,
                value: t.count,
              }))}
            />
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Shipment Types">
            <DonutChart
              data={[
                { name: "Hub Transfer", value: types.hubTransfer },
                { name: "Out for Delivery", value: types.outForDelivery },
                { name: "Bulk Pickup", value: types.bulkPickup },
              ]}
            />
          </SectionCard>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div>
          <SectionCard
            title="Worker Readiness"
            action={isHub ? <WorkerActions /> : undefined}
          >
            <WorkerReadiness workers={summary.workers} />
          </SectionCard>
        </div>

        <div className="lg:col-span-2">
          <SectionCard
            title="Recent Shipments"
            action={
              <SectionActionButton
                label="View All"
                icon={<ArrowRight size={14} />}
                onClick={() => navigate("/hub/shipments")}
              />
            }
          >
            <TableCard<HubShipmentListItemDTO>
              columns={columns}
              data={shipments}
            />
          </SectionCard>
        </div>

      </div>
    </div>
  );
};

export default HubDashboardView;