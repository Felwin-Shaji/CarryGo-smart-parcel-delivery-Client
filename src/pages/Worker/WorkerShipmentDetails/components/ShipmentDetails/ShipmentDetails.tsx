import { useMemo, useState } from "react";
import type { WorkerShipmentDetails } from "../../../../../constants_Types/types/Worker/workerShipment";
import { ShipmentHeader } from "./components/ShipmentHeader";
import { ShipmentStats } from "./components/ShipmentStats";
import { ActionPanel } from "./components/ActionPanel";
import { ParcelList } from "./components/ParcelList";
import { ShipmentProgress } from "./components/ShipmentProgress";

type Roles = "user" | "admin" | "agency" | "hub" | "worker";

type Props = {
  data: WorkerShipmentDetails;
  role: Roles;

  // callbacks (UI only)
  onShipmentAction?: (action: string) => void;
  onParcelAction?: (parcelId: string, action: string) => void;
  onOpenParcel?: (parcelId: string) => void;
};

export default function ShipmentDetails({ data, role, ...actions }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const stats = useMemo(() => {
    const loaded = data.parcels.filter(p => p.status === "LOADED").length;
    const transit = data.parcels.filter(p => p.status === "IN_TRANSIT").length;
    const completed = data.parcels.filter(p => p.status === "UNLOADED").length;

    return { loaded, transit, completed };
  }, [data]);

  return (
    <div className="p-4 space-y-4">

      <ShipmentHeader data={data} />

      <ShipmentProgress status={data.status} />

      <ShipmentStats
        total={data.parcelCount}
        loaded={stats.loaded}
        transit={stats.transit}
        completed={stats.completed}
      />

      {role === "worker" && (
        <ActionPanel
          status={data.status}
          onAction={actions.onShipmentAction}
        />
      )}

      <ParcelList
        parcels={data.parcels}
        role={role}
        selected={selected}
        setSelected={setSelected}
        selectionMode={selectionMode}
        setSelectionMode={setSelectionMode}
        onParcelAction={actions.onParcelAction}
        onOpenParcel={actions.onOpenParcel}
      />
    </div>
  );
}