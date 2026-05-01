import type { ShipmentStatus } from "../../../../../../shared/constants_Types/types/Hub/HubShipment";
import type { ShipmentAction } from "../../../../../../shared/constants_Types/types/Worker/workerShipment";

const steps: ShipmentStatus[] = [
  "PENDING",
  "LOADING",
  "DISPATCHED",
  "ARRIVED",
  "COMPLETED",
];

//  map shipment → next action
const NEXT_ACTION: Partial<Record<ShipmentStatus, ShipmentAction>> = {
  PENDING: "START_LOADING",
  LOADING: "DISPATCH",
  DISPATCHED: "MARK_ARRIVED",
  ARRIVED: "COMPLETE",
};

export function ShipmentProgress({
  status,
  onShipmentAction,
  canProceed,
}: {
  status: ShipmentStatus;
  onShipmentAction?: (action: ShipmentAction) => void;
  canProceed?: boolean;
}) {

  const currentIndex = steps.indexOf(status);
  const nextAction = NEXT_ACTION[status];

  return (
    <div className="space-y-3">

      {/* Progress Bars */}
      <div className="flex gap-2">
        {steps.map((step, i) => (
          <div
            key={step}
            className={`flex-1 h-2 rounded-full ${i <= currentIndex ? "bg-blue-600" : "bg-gray-200"
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

      {/*  Action Button */}
      {nextAction && onShipmentAction && (
        <button
          disabled={!canProceed}
          onClick={() => onShipmentAction(nextAction)}
          className={`px-4 py-2 text-sm rounded-lg ${canProceed
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {nextAction}
        </button>
      )}
    </div>
  );
}