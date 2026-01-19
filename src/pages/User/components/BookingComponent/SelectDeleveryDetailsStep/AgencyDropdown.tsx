import type { getServiceableHubWithAgencyResponseDTO } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";

interface Props {
  agencies: getServiceableHubWithAgencyResponseDTO[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const AgencyCardSelector = ({ agencies, selectedIndex, onSelect }: Props) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {agencies.map((a, i) => {
        const isSelected = selectedIndex === i;

        return (
          <div
            key={i}
            onClick={() => onSelect(i)}
            className={`
              min-w-[180px]
              cursor-pointer
              rounded-lg
              border
              px-4
              py-3
              text-sm
              transition
              ${isSelected
                ? "border-black bg-gray-50"
                : "border-gray-200 bg-white"
              }
            `}
          >
            <p className="font-medium text-gray-900 truncate">
              {a.agency.name}
            </p>
{/* 
            <p className="text-xs text-gray-500 mt-1">
              Commission: {a.agency.commissionRate}%
            </p> */}
          </div>
        );
      })}
    </div>
  );
};

export default AgencyCardSelector;
