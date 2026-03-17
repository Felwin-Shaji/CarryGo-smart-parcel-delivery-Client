import { Clock, Route } from "lucide-react";
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
        <div className="flex items-start gap-3">

            {/* Card */}
            <div className="flex-1 bg-white border border-gray-100 rounded-xl px-5 py-4 mb-4 shadow-sm hover:shadow-md transition">

                {/* Top Row */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            #{String(segment.segmentOrder).padStart(2, "0")}
                        </span>

                    </div>

                </div>

                {/* Hub names */}
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-[15px] font-semibold text-[#102467]">
                        {segment.originHubName}
                    </span>

                    <div className="flex-1 flex items-center gap-1.5">
                        <div className="h-px flex-1 bg-gray-200" />
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                                d="M2 6h8M7 3l3 3-3 3"
                                stroke="#1E3A8A"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <span className="text-[15px] font-semibold text-[#102467]">
                        {segment.destinationHubName}
                    </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Route size={11} className="text-gray-400" />
                        Distance
                        <span className="text-[#1E3A8A] font-semibold">
                            {segment.distanceKm ?? "—"}
                        </span>
                        <span className="text-gray-400">km</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock size={11} className="text-gray-400" />
                        Time
                        <span className="text-[#1E3A8A] font-semibold">
                            {formatTime(segment.estimatedTimeMinutes)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}