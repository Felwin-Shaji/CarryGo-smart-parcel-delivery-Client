import type {
  getServiceableTravelerDTO,
} from "../../../../../shared/constants_Types/types/User/Booking/bookingResponse.dto";

interface Props {
  travelers: getServiceableTravelerDTO[];
  selectedTravelRequestId?: string;
  onSelect: (option: getServiceableTravelerDTO) => void;
}

const TravelerCardSelector = ({
  travelers,
  selectedTravelRequestId,
  onSelect,
}: Props) => {

  if (!Array.isArray(travelers) || travelers.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {travelers.map((option) => {

        const isSelected =
          selectedTravelRequestId ===
          option.travelRequest.travelRequestId;

        const { traveler, travelRequest } = option;

        return (
          <div
            key={travelRequest.travelRequestId}
            onClick={() => onSelect(option)}
            className={`
              min-w-[240px]
              cursor-pointer
              rounded-lg
              border
              px-4
              py-4
              text-sm
              transition
              space-y-2
              ${
                isSelected
                  ? "border-black bg-gray-50"
                  : "border-gray-200 bg-white"
              }
            `}
          >

            <p className="font-semibold text-gray-900">
              {traveler.name}
            </p>

            <p className="text-xs text-gray-600">
              {travelRequest.from.city} → {travelRequest.to.city}
            </p>

            <p className="text-xs text-gray-500">
              {travelRequest.modeOfTransport}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(travelRequest.departureAt).toLocaleDateString()}
            </p>

            <p className="text-xs text-gray-700">
              Capacity: {travelRequest.remainingCapacityKg} kg left
            </p>

            {travelRequest.pricePerKg && (
              <p className="text-xs font-medium text-gray-900">
                ₹ {travelRequest.pricePerKg} / kg
              </p>
            )}

          </div>
        );
      })}
    </div>
  );
};

export default TravelerCardSelector;
