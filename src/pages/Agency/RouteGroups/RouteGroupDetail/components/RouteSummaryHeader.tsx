import RouteMapPreview from "../../../../../shared/components/Map/RouteMapPreview";
import type { RouteSegmentDTO } from "../../../../../shared/constants_Types/types/Agency/AgencyRouteSegment.dto";
import { formatTime, totalDistance, totalTime } from "../utils/routeHelpers";


interface Props {
  detail: {
    name: string;
    description: string | null;
    createdAt: string;
    segments: RouteSegmentDTO[];
  };
  segments: RouteSegmentDTO[];
  groupActive: boolean;
  onToggle: () => void;
}
export default function RouteSummaryHeader({
  detail,
  segments,
  groupActive,
  onToggle,
}: Props) {

  const sorted = [...detail.segments].sort(
    (a, b) => a.segmentOrder - b.segmentOrder
  );

  const start = sorted[0]?.originHubName ?? "—";
  const end = sorted[sorted.length - 1]?.destinationHubName ?? "—";

  const activeSegments = detail.segments.filter(s => s.isActive).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm hover:shadow-md transition">

      {/* 🔹 TOP ROW */}
      <div className="flex items-start justify-between flex-wrap gap-4">

        {/* LEFT */}
        <div>
          <div className="flex items-center gap-3 flex-wrap">

            <h1 className="text-lg font-semibold text-[#1E3A8A]">
              {detail.name}
            </h1>

            {/* STATUS */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${groupActive
                ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                : "text-gray-500 bg-gray-100 border-gray-200"
                }`}
            >
              {groupActive ? "Active" : "Inactive"}
            </span>

            {/* TOGGLE */}
            <button
              onClick={onToggle}
              className={`w-10 h-[22px] rounded-full p-0.5 flex items-center transition-colors ${groupActive ? "bg-[#1E3A8A]" : "bg-gray-300"
                }`}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${groupActive ? "translate-x-[18px]" : ""
                  }`}
              />
            </button>

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