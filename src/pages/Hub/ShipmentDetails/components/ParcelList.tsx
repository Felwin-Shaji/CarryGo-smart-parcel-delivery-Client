import type { ShipmentParcelUI } from "../../../../shared/constants_Types/types/Hub/HubShipment";

export default function ParcelList({
  parcels,
}: {
  parcels: ShipmentParcelUI[];
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">
          Parcels ({parcels.length})
        </h3>
      </div>

      <div className="max-h-[450px] overflow-y-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 text-left">Booking ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel.bookingId}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  {parcel.bookingTrackId}
                </td>

                <td className="p-3">
                  {parcel.customerName || "—"}
                </td>

                <td className="p-3 max-w-xs truncate">
                  {parcel.address || "—"}
                </td>

                <td className="p-3">
                  <StatusBadge status={parcel.status} />
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    LOADED: "bg-blue-100 text-blue-600",
    IN_TRANSIT: "bg-yellow-100 text-yellow-600",
    UNLOADED: "bg-green-100 text-green-600",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles[status]}`}>
      {status}
    </span>
  );
}