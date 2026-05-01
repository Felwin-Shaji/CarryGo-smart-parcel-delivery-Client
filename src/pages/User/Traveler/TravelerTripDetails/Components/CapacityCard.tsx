import type { TripDetailsUI } from "../../../../../shared/constants_Types/types/User/Traveler/TravelerType";

export const CapacityCard = ({ trip }: { trip: TripDetailsUI }) => {
    const usedWeight = trip.capacityKg - trip.remainingCapacityKg;
    const weightPercent = (usedWeight / trip.capacityKg) * 100;

    return (
        <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">

            <h3 className="font-semibold">Capacity</h3>

            {/* Weight */}
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span>Weight</span>
                    <span>{usedWeight} / {trip.capacityKg} kg</span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-2 bg-black rounded-full"
                        style={{ width: `${weightPercent}%` }}
                    />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                    {trip.remainingCapacityKg} kg remaining
                </p>
            </div>

            {/* Volume */}
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span>Volume</span>
                    <span>{trip.totalVolumeCm3 - trip.remainingVolumeCm3} / {trip.totalVolumeCm3}</span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-black rounded-full w-1/2" />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                    {trip.remainingVolumeCm3} remaining
                </p>
            </div>

            {/* Package */}
            <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-600">
                Max size: {trip.allowedPackageDimensions.maxLengthCm} ×{" "}
                {trip.allowedPackageDimensions.maxWidthCm} ×{" "}
                {trip.allowedPackageDimensions.maxHeightCm} cm
            </div>

        </div>
    );
};