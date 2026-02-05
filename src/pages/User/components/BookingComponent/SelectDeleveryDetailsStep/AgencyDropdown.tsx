import type { getServiceableHubWithAgencyResponseDTO } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";

interface Props {
  agencies: getServiceableHubWithAgencyResponseDTO[];
  selectedAgencyId?: string;
  onSelect: (option: getServiceableHubWithAgencyResponseDTO) => void;
}


const AgencyCardSelector = ({
  agencies,
  selectedAgencyId,
  onSelect,
}: Props) => {
  if (!Array.isArray(agencies)) {
    return null; // or loader / fallback UI
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {agencies.map((option) => {
        const isSelected =
          selectedAgencyId === option.agency.agencyId;

        return (
          <div
            key={option.agency.agencyId}
            onClick={() => onSelect(option)}
            className={`
              min-w-[180px]
              cursor-pointer
              rounded-lg
              border
              px-4
              py-3
              text-sm
              transition
              ${
                isSelected
                  ? "border-black bg-gray-50"
                  : "border-gray-200 bg-white"
              }
            `}
          >
            <p className="font-medium text-gray-900 truncate">
              {option.agency.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};


export default AgencyCardSelector;
