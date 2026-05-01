import { useMemo, useState } from "react";
import type { ParcelAction, ShipmentAction, WorkerShipmentDetails } from "../../../../../shared/constants_Types/types/Worker/workerShipment";
import { ShipmentHeader } from "./components/ShipmentHeader";
import { ShipmentStats } from "./components/ShipmentStats";
import { ParcelList } from "./components/ParcelList";
import { ShipmentProgress } from "./components/ShipmentProgress";

type Roles = "user" | "admin" | "agency" | "hub" | "worker";

type Props = {
  data: WorkerShipmentDetails;
  role: Roles;

  onShipmentAction?: (action: ShipmentAction) => void;
  onParcelAction?: (parcelId: string[], action: ParcelAction) => void;
  onOpenParcel?: (parcelId: string) => void;
};

export default function ShipmentDetails({ data, role, ...actions }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const stats = useMemo(() => {
    let loaded = 0, transit = 0, completed = 0;

    for (const p of data.parcels) {
      if (p.status === "LOADED") loaded++;
      else if (p.status === "IN_TRANSIT") transit++;
      else if (p.status === "UNLOADED") completed++;
    }


    return { loaded, transit, completed };
  }, [data.parcels]);

  const canShipmentProceed = useMemo(() => {
    const parcels = data.parcels;

    if (parcels.length === 0) return false;

    switch (data.status) {
      case "PENDING":
        return true;

      case "LOADING":
        return parcels.every(p => p.status === "LOADED");

      case "DISPATCHED":
        return parcels.every(p => p.status === "IN_TRANSIT");

      case "ARRIVED":
        return parcels.every(p => p.status === "UNLOADED");

      default:
        return false;
    }
  }, [data.parcels, data.status]);


  const canParcelProceed = (action: ParcelAction) => {
    switch (action) {
      case "LOAD":
        return data.status === "LOADING";

      case "TRANSIT":
        return data.status === "DISPATCHED";

      case "UNLOAD":
        return data.status === "ARRIVED";

      default:
        return false;
    }
  };

  return (
    <div className="p-4 space-y-4">

      <ShipmentHeader data={data} />

      <ShipmentProgress
        status={data.status}
        onShipmentAction={actions.onShipmentAction}
        canProceed={canShipmentProceed}
      />

      <ShipmentStats
        total={data.parcelCount}
        loaded={stats.loaded}
        transit={stats.transit}
        completed={stats.completed}
      />


      <ParcelList
        parcels={data.parcels}
        role={role}
        selected={selected}
        setSelected={setSelected}
        selectionMode={selectionMode}
        setSelectionMode={setSelectionMode}
        onParcelAction={actions.onParcelAction}
        onOpenParcel={actions.onOpenParcel}
        canParcelProceed={canParcelProceed}
      />
    </div>
  );
}