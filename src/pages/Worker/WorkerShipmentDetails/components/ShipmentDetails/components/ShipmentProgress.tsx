

import type { ShipmentStatus } from "../../../../../../constants_Types/types/Hub/HubShipment";

export function ShipmentProgress({ status }: { status: ShipmentStatus }) {
  const steps = ["PENDING", "LOADING", "DISPATCHED", "ARRIVED", "COMPLETED"];

  const currentIndex = steps.indexOf(status);

  return (
    <div className="space-y-2">

      {/* Bars */}
      <div className="flex gap-2">
        {steps.map((step, i) => (
          <div
            key={step}
            className={`flex-1 h-2 rounded-full ${
              i <= currentIndex
                ? "bg-blue-600"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Created</span>
        <span>Loading</span>
        <span>Dispatched</span>
        <span>Arrived</span>
        <span>Completed</span>
      </div>
    </div>
  );
}