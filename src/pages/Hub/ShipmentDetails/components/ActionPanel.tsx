import type { ShipmentDetailsUI } from "../../../../constants_Types/types/Hub/HubShipment";

interface Props {
  shipment: ShipmentDetailsUI;
  onEdit: () => void;
}

export default function ActionPanel({
  shipment,
  onEdit,
}: Props) {
  const isDispatched = shipment.status === "DISPATCHED";

  return (
    <div >

      <button
        onClick={onEdit}
        disabled={isDispatched}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Assign / Edit
      </button>

      {/* <button
        disabled
        className="px-4 py-2 bg-gray-200 rounded"
      >
        Edit Capacity
      </button>

      <button
        disabled={isDispatched}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        Mark Dispatched
      </button> */}

    </div>
  );
}