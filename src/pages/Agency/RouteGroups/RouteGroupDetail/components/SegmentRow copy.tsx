import { ArrowRight, Clock3, Route, MapPin, } from "lucide-react";
import { formatTime } from "../utils/routeHelpers";

interface RouteSegmentDTO {
    id: string;
    routeGroupId: string;
    originHubId: string;
    originHubName: string;
    destinationHubId: string;
    destinationHubName: string;
    segmentOrder: number;
    estimatedTimeMinutes: number | null;
    distanceKm: number | null;
    isActive: boolean;
}

export function SegmentRow({
    segment,
}: {
    segment: RouteSegmentDTO;
}) {
    return (
        <div
            className="
                group
                rounded-2xl
                border border-slate-200
                bg-white
                px-5
                py-4
                shadow-sm
                transition-all duration-300
                hover:border-blue-200
                hover:shadow-lg
            "
        >
            <div className="flex items-center gap-5">
                {/* Segment Number */}
                <div
                    className="
                        hidden sm:flex
                        h-12 w-12 shrink-0
                        items-center justify-center
                        rounded-2xl
                        bg-gradient-to-br from-blue-600 to-indigo-700
                        text-white
                        shadow-md
                    "
                >
                    <span className="text-sm font-bold">
                        #{String(segment.segmentOrder).padStart(2, "0")}
                    </span>
                </div>

                {/* Route Content */}
                <div className="min-w-0 flex-1">
                    {/* Route */}
                    <div className="flex items-center gap-3">
                        {/* From */}
                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                                From
                            </p>

                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                                    <MapPin size={15} />
                                </div>

                                <h3 className="truncate text-sm font-semibold text-slate-800">
                                    {segment.originHubName}
                                </h3>
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center gap-2 px-2">
                            <div className="h-[2px] w-10 bg-blue-200 rounded-full" />

                            <div className="rounded-full border border-blue-100 bg-blue-50 p-2 text-blue-700">
                                <ArrowRight size={14} />
                            </div>

                            <div className="h-[2px] w-10 bg-blue-200 rounded-full" />
                        </div>

                        {/* To */}
                        <div className="min-w-0 flex-1 text-right">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                                To
                            </p>

                            <div className="flex items-center justify-end gap-2">
                                <h3 className="truncate text-sm font-semibold text-slate-800">
                                    {segment.destinationHubName}
                                </h3>

                                <div className="rounded-lg bg-indigo-50 p-2 text-indigo-700">
                                    <MapPin size={15} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Meta */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div
                            className="
                                flex items-center gap-2
                                rounded-xl
                                bg-slate-50
                                px-3 py-2
                            "
                        >
                            <Route
                                size={14}
                                className="text-slate-500"
                            />

                            <span className="text-xs text-slate-500">
                                Distance:
                            </span>

                            <span className="text-sm font-semibold text-slate-800">
                                {segment.distanceKm ?? "—"} km
                            </span>
                        </div>

                        <div
                            className="
                                flex items-center gap-2
                                rounded-xl
                                bg-slate-50
                                px-3 py-2
                            "
                        >
                            <Clock3
                                size={14}
                                className="text-slate-500"
                            />

                            <span className="text-xs text-slate-500">
                                ETA:
                            </span>

                            <span className="text-sm font-semibold text-slate-800">
                                {formatTime(
                                    segment.estimatedTimeMinutes
                                )}
                            </span>
                        </div>

                        {/* Status */}
                        <div
                            className={`
                                ml-auto rounded-full px-3 py-1 text-[11px] font-semibold
                                ${segment.isActive
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                    : "bg-gray-100 text-gray-500 border border-gray-200"
                                }
                            `}
                        >
                            {segment.isActive
                                ? "Active"
                                : "Inactive"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}