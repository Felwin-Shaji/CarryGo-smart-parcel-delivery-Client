import type { ShipmentStatus } from "../../../constants_Types/types/Hub/HubShipment";

export const mapShipmentActionToStatus = (action: string): ShipmentStatus => {

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
};;

export const mapParcelActionToStatus = (action: string) => {
    switch (action) {
        case "TRANSIT":
            return "IN_TRANSIT";
        case "UNLOAD":
            return "UNLOADED";
        default:
            return "LOADED";
    }
};