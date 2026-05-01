import type { TripDetailsUI } from "../../../../../shared/constants_Types/types/User/Traveler/TravelerType";
import { StatusBadge } from "./StatusBadge";

export const TripCard = ({ trip }: { trip: TripDetailsUI }) => {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">

      {/* Top */}
      <div className="flex justify-between items-start">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            🚚
          </div>

          <div>
            <p className="text-xs text-gray-500">
              TRIP #{trip.id.slice(0, 8)}
            </p>
            <p className="text-sm text-gray-600">{trip.modeOfTransport}</p>
          </div>
        </div>

        <StatusBadge status={trip.status} />

      </div>

      {/* Route */}
      <h2 className="text-lg font-semibold">
        {trip.startCity} → {trip.endCity}
      </h2>

      {/* Dates */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>Departs {new Date(trip.departureAt).toLocaleString()}</p>
        {trip.arrivalAt && (
          <p>Arrives {new Date(trip.arrivalAt).toLocaleString()}</p>
        )}
      </div>

      {/* Description */}
      {trip.description && (
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
          {trip.description}
        </div>
      )}

    </div>
  );
};