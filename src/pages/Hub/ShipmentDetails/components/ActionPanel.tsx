import type { ShipmentDetailsUI } from "../../../../constants_Types/types/Hub/HubShipment";


export default function ActionPanel({
  shipment,
}: {
  shipment: ShipmentDetailsUI;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-wrap gap-3">

      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Assign Worker
      </button>

      <button className="px-4 py-2 bg-gray-200 rounded">
        Edit Capacity
      </button>

      <button className="px-4 py-2 bg-green-600 text-white rounded">
        Mark Dispatched
      </button>

    </div>
  );
}