import { FaStar, FaMapMarkerAlt, FaBox } from "react-icons/fa";
import type { getServiceableTravelerDTO } from "../../../../../shared/constants_Types/types/User/Booking/bookingResponse.dto";

interface Props {
  traveler: getServiceableTravelerDTO;
  selected: boolean;
  onSelect: () => void;
}

const TravelerCard = ({ traveler, selected, onSelect }: Props) => {
  const request = traveler.travelRequest;

  return (
    <div
      onClick={onSelect}
      className={`bg-white border rounded-xl p-4 cursor-pointer flex items-center justify-between
        transition-all duration-200 hover:shadow-sm 
        ${selected ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"}`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-start gap-4">

        {/* Avatar */}
        {/* <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
          👤
        </div> */}

        <div>

          {/* NAME + RATING */}
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-800">
              {traveler.traveler.name}
            </h3>

            <span className="flex items-center text-sm text-gray-500 gap-1">
              <FaStar className="text-yellow-500 text-xs" />
              4.5
            </span>

            <span className="text-sm text-gray-400">
              56 trips
            </span>
          </div>

          {/* ROUTE */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <FaMapMarkerAlt className="text-gray-400 text-xs" />
            {request.from?.city} →
            {request.to?.city}
          </div>

          {/* DETAILS */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">

            <span className="flex items-center gap-1">
              🚗 {request.modeOfTransport}
            </span>

            <span className="flex items-center gap-1">
              <FaBox className="text-gray-400 text-xs" />
              Up to {request.remainingCapacityKg} kg
            </span>

            <span>
              Available: Mar 6, 2026
            </span>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE PRICE */}
      <div className="flex items-center gap-6">

        <span className="font-semibold text-gray-800">
          ₹{request.pricePerKg}
        </span>

        <input type="radio" checked={selected} readOnly />

      </div>
    </div>
  );
};

export default TravelerCard;