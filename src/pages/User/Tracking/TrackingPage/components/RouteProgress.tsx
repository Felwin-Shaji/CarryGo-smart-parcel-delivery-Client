import { Check, Truck } from "lucide-react";
import type { AgencyParcelTrackingDTO } from "../../../../../shared/constants_Types/types/User/Booking/ParcelTracking";

interface Props {
    legs: AgencyParcelTrackingDTO["route"]["legs"];
    currentStatus: AgencyParcelTrackingDTO["currentStatus"]["status"];
}

export default function RouteProgress({ legs, currentStatus }: Props) {

    const steps = [
        {
            city: legs[0]?.fromHub.address.city,
            hub: legs[0]?.fromHub.name,
        },
        ...legs.map((leg) => ({
            city: leg.toHub.address.city,
            hub: leg.toHub.name,
        })),
    ];

    const STATUS_META = {
        PAID_PENDING_PICKUP: { label: "Awaiting Pickup", color: "text-yellow-600" },
        READY_FOR_PICKUP: { label: "Ready", color: "text-blue-600" },
        PICKUP_STARTED: { label: "Pickup Started", color: "text-purple-600" },
        IN_TRANSIT: { label: "In Transit", color: "text-blue-600" },
        OUT_FOR_DELIVERY: { label: "Out for Delivery", color: "text-orange-600" },
        DELIVERED: { label: "Delivered", color: "text-green-600" },
    };

    const statusMeta = STATUS_META[currentStatus as keyof typeof STATUS_META];

    let activeIndex = 0;

    const isSingleLeg = steps.length === 2;

    switch (currentStatus) {
        case "PAID_PENDING_PICKUP":
        case "READY_FOR_PICKUP":
        case "PICKUP_STARTED":
            activeIndex = 0;
            break;

        case "IN_TRANSIT":
            activeIndex = isSingleLeg ? 1 : Math.min(1, steps.length - 1);
            break;

        case "OUT_FOR_DELIVERY":
            activeIndex = steps.length - 1;
            break;

        case "DELIVERED":
            activeIndex = -1;
            break;

        default:
            activeIndex = 0;
    }

    return (
        <div className="bg-white border rounded-xl p-5 shadow-sm">

            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Truck size={16} className="text-blue-600" />
                Route Progress
            </h3>

            <div className="relative pl-6">

                {/* vertical line */}
                <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-gray-200" />

                {steps.map((step, index) => {

                    const isCompleted =
                        currentStatus === "DELIVERED"
                            ? true
                            : index < activeIndex;

                    const isActive =
                        currentStatus !== "DELIVERED" &&
                        index === activeIndex;

                    return (
                        <div key={index} className="flex items-start gap-3 mb-4">

                            {/* icon */}
                            <div
                                className={`
                                w-6 h-6 flex items-center justify-center rounded-full border z-10
                                ${isCompleted
                                        ? "bg-green-500 border-green-500 text-white"
                                        : isActive
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : "bg-white border-gray-300 text-gray-400"
                                    }
                                `}
                            >
                                {isCompleted && <Check size={12} />}
                                {isActive && <Truck size={12} />}
                            </div>

                            {/* content */}
                            <div className="flex flex-col leading-tight">

                                <span className="text-sm font-medium text-gray-800">
                                    {step.city}
                                </span>

                                <span className="text-xs text-gray-500">
                                    {step.hub}
                                </span>

                                {/* show ONLY ONE status */}
                                {isActive && statusMeta && (
                                    <span className={`text-xs mt-1 ${statusMeta.color}`}>
                                        {statusMeta.label}
                                    </span>
                                )}

                                {isCompleted && currentStatus !== "DELIVERED" && (
                                    <span className="text-xs text-green-600 mt-1">
                                        Passed
                                    </span>
                                )}

                                {currentStatus === "DELIVERED" && index === steps.length - 1 && (
                                    <span className="text-xs text-green-600 mt-1 font-semibold">
                                        Delivered
                                    </span>
                                )}

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}