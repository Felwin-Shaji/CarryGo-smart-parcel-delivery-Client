import { Check, Truck } from "lucide-react";
import type { ParcelTrackingDTO } from "../../../../../constants_Types/types/User/Booking/ParcelTracking";



interface Props {
    legs: ParcelTrackingDTO["route"]["legs"];
}

export default function RouteProgress({ legs }: Props) {

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

    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

            <h3 className="font-semibold text-gray-800 mb-8 flex items-center gap-2">
                🚚 Route Progress
            </h3>

            <div className="flex items-center">

                {steps.map((step, index) => {
                    const lastCompletedIndex = legs.reduce(
                        (acc, l, i) => (l.status === "COMPLETED" ? i : acc),
                        -1
                    );

                    const activeIndex = legs.findIndex(l => l.status === "IN_PROGRESS");

                    const isCompleted = index <= lastCompletedIndex;
                    const isActive = index === activeIndex + 1;


                    return (
                        <div key={index} className="flex items-center flex-1">

                            {/* 🔘 STEP */}
                            <div className="flex flex-col items-center min-w-[90px]">

                                <div
                                    className={`
                                    w-10 h-10 flex items-center justify-center rounded-full border-2
                                    transition-all duration-300
                                        ${isCompleted
                                            ? "bg-green-500 border-green-500 text-white"
                                            : isActive
                                                ? "bg-blue-600 border-blue-600 text-white shadow-md scale-110"
                                                : "bg-white border-gray-300 text-gray-400"
                                        }
                                    `}
                                >
                                    {isCompleted && <Check size={18} />}
                                    {isActive && <Truck size={18} />}
                                    {!isCompleted && !isActive && (
                                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                                    )}
                                </div>

                                <p className="text-sm font-semibold mt-3 text-gray-800 text-center">
                                    {step.city}
                                </p>

                                <p className="text-xs text-gray-500 text-center max-w-[110px]">
                                    {step.hub}
                                </p>
                            </div>

                            {/* 🔗 CONNECTOR */}
                            {index !== steps.length - 1 && (
                                <div className="flex-1 h-[2px] mx-2 relative">
                                    <div className="absolute inset-0 bg-gray-200" />

                                    <div
                                        className={`absolute inset-0 ${isCompleted ? "bg-green-500" : "bg-gray-200"
                                            }`}
                                        style={{ width: isCompleted ? "100%" : "0%" }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}