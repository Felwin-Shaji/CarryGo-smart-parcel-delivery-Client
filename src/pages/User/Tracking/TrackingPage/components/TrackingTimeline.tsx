import { Truck, MapPin, Package, Clock } from "lucide-react";

interface Props {
  timeline: any[];
}

export default function TrackingTimeline({ timeline }: Props) {
  const getIcon = (status: string) => {
    const s = status.toUpperCase();

    if (s.includes("DISPATCH")) return <Truck size={14} />;
    if (s.includes("ARRIVE")) return <MapPin size={14} />;
    if (s.includes("PICK")) return <Package size={14} />;
    return <Clock size={14} />;
  };

  const getStatusStyle = (status: string) => {
    const s = status.toUpperCase();

    if (s.includes("DISPATCH"))
      return "bg-blue-100 text-blue-700";

    if (s.includes("ARRIVE"))
      return "bg-green-100 text-green-700";

    if (s.includes("PICK"))
      return "bg-gray-100 text-gray-700";

    return "bg-gray-100 text-gray-600";
  };

  const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">

      {/* Header */}
      <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
        📦 Tracking History
      </h3>

      <div className="relative">

        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gray-200" />

        <div className="space-y-8">

          {timeline.map((item, index) => {
            const isLatest = index === 0;

            return (
              <div key={index} className="relative flex gap-4">

                {/* ICON */}
                <div className="relative z-10">
                  <div
                    className={`
                      w-9 h-9 flex items-center justify-center rounded-full border
                      ${
                        isLatest
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-500 border-gray-300"
                      }
                    `}
                  >
                    {getIcon(item.status)}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex-1">

                  {/* STATUS + TIME */}
                  <div className="flex items-center gap-3 flex-wrap">

                    <span
                      className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {formatStatus(item.status)}
                    </span>

                    <span className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  {/* MESSAGE */}
                  <p className="text-sm text-gray-800 mt-1 leading-relaxed">
                    {item.message}
                  </p>

                  {/* ROUTE */}
                  {item.fromHub && item.toHub && (
                    <p className="text-xs text-gray-500 mt-1">
                      {item.fromHub.address.city} →{" "}
                      {item.toHub.address.city}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}