import { useState } from "react";
import { confirmToast } from "../../../../../shared/components/globelcomponents/confirmToast";
import RouteMapPreview from "../../../../../shared/components/Map/RouteMapPreview";
import type { RouteGroupDetailDTO, RouteSegmentDTO } from "../../../../../shared/constants_Types/types/Agency/AgencyRouteSegment.dto";
import { formatTime, totalDistance, totalTime } from "../utils/routeHelpers";
import toast from "react-hot-toast";
import { useAgencyRouteGroup } from "../../../../../Services/Agency/AgencyRouteGroup";


interface Props {
  detail: RouteGroupDetailDTO
  segments: RouteSegmentDTO[];
  groupActive: boolean;
  onToggle: () => void;
}
export default function RouteSummaryHeader({ detail, segments, groupActive, onToggle, }: Props) {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const { updateRouteGroupStatus } = useAgencyRouteGroup();

  const sorted = [...detail.segments].sort(
    (a, b) => a.segmentOrder - b.segmentOrder
  );

  const start = sorted[0]?.originHubName ?? "—";
  const end = sorted[sorted.length - 1]?.destinationHubName ?? "—";

  const activeSegments = detail.segments.filter(s => s.isActive).length;


  const handleToggleStatus = async () => {

    try {

      setUpdatingStatus(true);

      await updateRouteGroupStatus(
        detail.id,
        !groupActive
      );

      onToggle();

      toast.success(
        groupActive
          ? "Route group deactivated"
          : "Route group activated"
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update route group status"
      );

    } finally {

      setUpdatingStatus(false);

    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm hover:shadow-md transition">

      {/* 🔹 TOP ROW */}
      <div className="flex items-start justify-between flex-wrap gap-4">

        {/* LEFT */}
        <div>
          <div className="flex items-center gap-3 flex-wrap">

            <h1 className="text-lg font-bold text-[#1E3A8A]">
              {detail.name}
            </h1>

            {/* TOGGLE */}
            <div className="flex items-center gap-3">

              {/* STATUS BADGE */}
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${groupActive
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-100 text-red-600 border border-red-200"
                  }`}
              >

                <div
                  className={`h-2 w-2 rounded-full ${groupActive
                    ? "bg-emerald-500"
                    : "bg-red-400"
                    }`}
                />

                {groupActive ? "Active" : "Inactive"}

              </div>

              {/* ACTION BUTTON */}
              <button
                disabled={updatingStatus}
                onClick={() => {

                  if (updatingStatus) return;

                  confirmToast(
                    groupActive
                      ? "Deactivate this route group?"
                      : "Activate this route group?",
                    handleToggleStatus
                  );

                }}
                className={`group relative flex h-10 items-center gap-2 overflow-hidden rounded-xl px-4 text-sm font-semibold text-white transition-all duration-300 border-none cursor-pointer shadow-md ${updatingStatus
                  ? "opacity-70 cursor-not-allowed"
                  : groupActive
                    ? "bg-gradient-to-r from-rose-500 to-red-500 hover:shadow-red-200 hover:-translate-y-[1px]"
                    : "bg-gradient-to-r from-[#1E3A8A] to-[#2854c5] hover:shadow-blue-200 hover:-translate-y-[1px]"
                  }`}
              >

                {/* Glow */}
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-white/20">

                  {updatingStatus ? (

                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />

                  ) : groupActive ? (

                    <div className="h-2 w-2 rounded-full bg-white" />

                  ) : (

                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 5V19"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      <path
                        d="M5 12H19"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>

                  )}

                </div>

                {/* Text */}
                <span className="relative z-10 tracking-wide">

                  {updatingStatus
                    ? "Updating..."
                    : groupActive
                      ? "Deactivate Route"
                      : "Activate Route"}

                </span>

              </button>

            </div>

          </div>

          {/* ROUTE FLOW */}
          <p className="text-xs text-gray-500 mt-2">
            {start} → {end}
          </p>

          {/* DESCRIPTION */}
          <p className="text-xs text-gray-400 mt-1 max-w-md">
            {detail.description ?? "No description provided."}
          </p>
        </div>

        {/* 🔹 STATS */}
        <div className="flex gap-3 flex-wrap">

          <Stat label="Segments" value={detail.segments.length} />
          <Stat label="Distance" value={`${totalDistance(detail.segments)} km`} />
          <Stat label="Time" value={formatTime(totalTime(detail.segments))} />
          <Stat label="Stops" value={detail.segments.length + 1} />

        </div>
      </div>

      {/* 🔹 BOTTOM ROW */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">

        <div>
          Created on{" "}
          <span className="text-gray-600 font-medium">
            {new Date(detail.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <div>
          {activeSegments} active segments
        </div>
      </div>

      {/* 🔹 MAP PREVIEW */}
      {segments.length > 0 && (
        <div className="mt-4 rounded-xl overflow-hidden border border-gray-100">

          {/* Map header */}
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-600">
              Route Preview
            </p>

            <p className="text-[11px] text-gray-400">
              {segments.length} segments
            </p>
          </div>

          {/* Map */}
          <div className="h-[220px] isolate">
            <RouteMapPreview segments={segments} />
          </div>

        </div>
      )}
    </div>
  );
}

/* 🔹 SMALL REUSABLE STAT COMPONENT */
function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 min-w-[90px] text-center">
      <p className="text-[10px] text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-[#1E3A8A]">{value}</p>
    </div>
  );
}