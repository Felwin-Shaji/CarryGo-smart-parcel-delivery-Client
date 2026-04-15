import type { ShipmentAction } from "../../../../../../constants_Types/types/Worker/workerShipment";

export function ActionPanel({
  status,
  onAction,
}: {
  status: string;
  onAction?: (a: ShipmentAction) => void;
}) {
const getAction = (): ShipmentAction | null => {
  switch (status) {
    case "PENDING":
      return "START_LOADING";

    case "LOADING":
      return "DISPATCH";

    case "DISPATCHED":
      return "MARK_ARRIVED";

    case "ARRIVED":
      return "COMPLETE";

    default:
      return null;
  }
};

  const action = getAction();

  if (!action) return null;

  return (
    <button
      onClick={() => onAction?.(action)}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      {action}
    </button>
  );
}