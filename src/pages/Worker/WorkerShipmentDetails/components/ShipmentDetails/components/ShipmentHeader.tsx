import type { WorkerShipmentDetails } from "../../../../../../shared/constants_Types/types/Worker/workerShipment";

export function ShipmentHeader({ data }: { data: WorkerShipmentDetails }) {
  return (
    <div className="flex justify-between items-center">

      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
          ➜
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            {data.id}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex gap-2">
        <span className="px-3 py-1 text-xs bg-orange-100 text-orange-600 rounded-full">
          {data.type}
        </span>
        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
          {data.status}
        </span>
      </div>
    </div>
  );
}

