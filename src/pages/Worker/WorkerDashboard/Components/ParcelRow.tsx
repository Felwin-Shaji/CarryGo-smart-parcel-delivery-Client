
import type { WorkerParcelItemDTO } from "../../../../constants_Types/types/Worker/WorkerDashboard";

export const ParcelRow = ({ item }: { item: WorkerParcelItemDTO }) => {
  const formatDate = (date?: string | Date | null) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition">

      {/* Booking ID */}
      <td className="p-3 font-medium text-gray-800">
        {item.bookingId}
      </td>

      {/* Shipment ID (shortened) */}
      <td className="p-3 text-gray-500 text-xs">
        {item.shipmentId.slice(0, 8)}...
      </td>

      {/* Status Badge */}
      <td className="p-3">
        <StatusBadge status={item.status} />
      </td>

      {/* Unloaded */}
      <td className="p-3 text-gray-600">
        {formatDate(item.updatedAt)}
      </td>
    </tr>
  );
};

/**
 * helpers
 */
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    PENDING: "bg-red-100 text-red-600",
    LOADED: "bg-yellow-100 text-yellow-600",
    IN_TRANSIT: "bg-blue-100 text-blue-600",
    UNLOADED: "bg-green-100 text-green-600",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
};