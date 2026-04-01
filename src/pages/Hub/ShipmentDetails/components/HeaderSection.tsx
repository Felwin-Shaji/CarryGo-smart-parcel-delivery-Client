import type { ShipmentDetailsUI } from "../../../../constants_Types/types/Hub/HubShipment";

export default function HeaderSection({
  shipment,
}: {
  shipment: ShipmentDetailsUI;
}) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl border">

      <div>
        <h1 className="text-2xl font-bold">
          Shipment #{shipment.id.slice(-6)}
        </h1>

        <p className="text-sm text-gray-500">
          Created {new Date(shipment.createdAt).toLocaleString()}
        </p>
      </div>

      <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
        {shipment.status}
      </span>
    </div>
  );
}