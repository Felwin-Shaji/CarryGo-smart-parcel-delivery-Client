import type { ShipmentDetailsUI } from "../../../../shared/constants_Types/types/Hub/HubShipment";

export default function RouteCard({
  shipment,
}: {
  shipment: ShipmentDetailsUI;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border shadow-sm">

      <h3 className="font-semibold mb-3">Route</h3>

      <div className="flex items-center gap-4 text-sm">

        <span>
          {shipment.fromHubName || "Sender / Origin"}
        </span>

        <span className="text-gray-400">→</span>

        <span>
          {shipment.toHubName || "Destination"}
        </span>

      </div>

    </div>
  );
}