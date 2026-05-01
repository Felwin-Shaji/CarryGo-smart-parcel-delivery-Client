import type { TravelerActionStatus } from "../../../../../shared/constants_Types/types/User/Traveler/TravelerType";

    export const STATUS_TRANSITIONS: Record<TravelerActionStatus, TravelerActionStatus[]> = {
        PAID_PENDING_PICKUP: ["READY_FOR_PICKUP"],
        READY_FOR_PICKUP: ["PICKUP_STARTED"],
        PICKUP_STARTED: ["IN_TRANSIT"],
        IN_TRANSIT: ["DELIVERED"],
        DELIVERED: [],
    };

        export const STATUS_FLOW: TravelerActionStatus[] = [
        "PAID_PENDING_PICKUP",
        "READY_FOR_PICKUP",
        "PICKUP_STARTED",
        "IN_TRANSIT",
        "DELIVERED",
    ];

    export const STATUS_LABELS = {
        PAID_PENDING_PICKUP: "Paid - Waiting Pickup",
        READY_FOR_PICKUP: "Ready for Pickup",
        PICKUP_STARTED: "Pickup Started",
        IN_TRANSIT: "On the Way",
        DELIVERED: "Delivered",
    };




        export const getStatusColor = (status: string) => {
        const map: Record<string, string> = {
            PAID_PENDING_PICKUP: "bg-yellow-100 text-yellow-700",
            READY_FOR_PICKUP: "bg-orange-100 text-orange-700",
            PICKUP_STARTED: "bg-blue-100 text-blue-700",
            IN_TRANSIT: "bg-indigo-100 text-indigo-700",
            DELIVERED: "bg-green-100 text-green-700",
        };
        return map[status] || "bg-gray-100 text-gray-600";
    };

    export const getStatusButtonColor = (status: string) => {
        const map: Record<string, string> = {
            PAID_PENDING_PICKUP: "bg-yellow-500 text-white",
            READY_FOR_PICKUP: "bg-orange-500 text-white",
            PICKUP_STARTED: "bg-blue-500 text-white",
            IN_TRANSIT: "bg-indigo-500 text-white",
            DELIVERED: "bg-green-500 text-white",
        };

        return map[status] || "bg-gray-500 text-white";
    };
