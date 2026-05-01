import type { ShipmentDetailsUI } from "../../../../shared/constants_Types/types/Hub/HubShipment";

export default function SummaryCards({
  shipment,
}: {
  shipment: ShipmentDetailsUI;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <Card title="Worker">
        {shipment.assignedWorker?.name ||
          shipment.assignedWorkerName ||
          "Unassigned"}
      </Card>

      <Card title="Capacity">
        {shipment.parcelCount}/{shipment.capacity ?? "∞"}
      </Card>

      <Card title="Type">{shipment.type}</Card>

      <Card title="Dispatch Time">
        {shipment.estimatedDispatchAt
          ? new Date(shipment.estimatedDispatchAt).toLocaleString()
          : "Not set"}
      </Card>

    </div>
  );
}

function Card({ title, children }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold mt-1">{children}</p>
    </div>
  );
}