import type { ParcelAction, ShipmentAction, WorkerShipmentParcel } from "../../../constants_Types/types/Worker/workerShipment";
import type { ShipmentStatus } from "../../../constants_Types/types/Hub/HubShipment";

export const mapShipmentActionToStatus = (action: ShipmentAction): ShipmentStatus => {

    switch (action) {
        case "START_LOADING":
            return "LOADING";

        case "DISPATCH":
            return "DISPATCHED";

        case "MARK_ARRIVED":
            return "ARRIVED";

        case "COMPLETE":
            return "COMPLETED";

        default:
            return "PENDING";
    }
};


export const mapParcelActionToStatus = (
    action: ParcelAction
): WorkerShipmentParcel["status"] => {
    switch (action) {
        case "PENDING":
            return "PENDING";
        case "LOAD":
            return "LOADED";
        case "TRANSIT":
            return "IN_TRANSIT";
        case "UNLOAD":
            return "UNLOADED";
    }
};

export const deriveShipmentStatus = (
    parcels: WorkerShipmentParcel[],
    currentStatus: ShipmentStatus
): ShipmentStatus => {

    if (parcels.length === 0) return currentStatus;

    if (parcels.every(p => p.status === "PENDING")) return "PENDING";

    if (parcels.every(p => p.status === "LOADED")) return "LOADING";

    if (parcels.every(p => p.status === "IN_TRANSIT")) return "DISPATCHED";

    if (parcels.every(p => p.status === "UNLOADED")) return "ARRIVED";

    return currentStatus;
};


export const PARCEL_FLOW: Partial<Record<WorkerShipmentParcel["status"], WorkerShipmentParcel["status"]>> = {
    PENDING: "LOADED",
    LOADED: "IN_TRANSIT",
    IN_TRANSIT: "UNLOADED",
};