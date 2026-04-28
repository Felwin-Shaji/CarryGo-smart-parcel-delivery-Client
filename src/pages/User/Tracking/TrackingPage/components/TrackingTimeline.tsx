import { useState } from "react";
import { Truck, MapPin, Package, Clock } from "lucide-react";

interface Props {
  timeline: any[];
}

export default function TrackingTimeline({ timeline }: Props) {
  const [expanded, setExpanded] = useState(false);

  const INITIAL_COUNT = 3;

  const visibleTimeline = expanded
    ? timeline
    : timeline.slice(0, INITIAL_COUNT);

  const getIcon = (status: string) => {
    const s = status.toUpperCase();

    if (s.includes("DISPATCH")) return <Truck size={14} />;
    if (s.includes("ARRIVE")) return <MapPin size={14} />;
    if (s.includes("PICK")) return <Package size={14} />;
    return <Clock size={14} />;
  };

  const getStatusStyle = (status: string) => {
    const s = status.toUpperCase();

    if (s.includes("DISPATCH")) return "bg-blue-100 text-blue-700";
    if (s.includes("ARRIVE")) return "bg-green-100 text-green-700";
    if (s.includes("PICK")) return "bg-gray-100 text-gray-700";

    return "bg-gray-100 text-gray-600";
  };

  const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          📦 Tracking History
        </h3>

        {timeline.length > INITIAL_COUNT && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            {expanded ? "Collapse" : `View all`}
          </button>
        )}
      </div>

      <div className="relative">

        {/* Vertical line */}
        <div className="absolute left-[12px] top-0 bottom-0 w-[2px] bg-gray-200" />

        <div className="space-y-3">

          {visibleTimeline.map((item, index) => {
            const isLatest = index === 0;

            return (
              <div
                key={index}
                className="flex gap-3 group relative"
              >
                {/* ICON */}
                <div className="relative z-10">
                  <div
                    className={`
                      w-6 h-6 flex items-center justify-center rounded-full border
                      ${isLatest
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-500 border-gray-300"
                      }
                    `}
                  >
                    {getIcon(item.status)}
                  </div>
                </div>

                {/* CONTENT CARD */}
                <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 hover:bg-gray-100 transition">

                  {/* top row */}
                  <div className="flex items-center justify-between gap-2">

                    <span
                      className={`px-2 py-[2px] text-[10px] rounded-full font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {formatStatus(item.status)}
                    </span>

                    <span className="text-[10px] text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  {/* message */}
                  <p className="text-xs text-gray-800 mt-1 leading-snug">
                    {item.message}
                  </p>

                  {/* route */}
                  {item.fromHub && item.toHub && (
                    <p className="text-[10px] text-gray-500 mt-1">
                      {item.fromHub.address.city} → {item.toHub.address.city}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom fade + button */}
        {timeline.length > INITIAL_COUNT && !expanded && (
          <div className="relative mt-3 text-center">

            {/* fade effect */}
            <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />

            <button
              onClick={() => setExpanded(true)}
              className="text-sm  transition-all duration-200 font-medium"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}