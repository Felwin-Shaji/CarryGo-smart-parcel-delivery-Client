import { Truck, Pencil } from "lucide-react";
import { useBookingContext } from "../../../../../context/Booking/BookingContext";

export default function ServicePartnerCard() {
  const { state, dispatch } = useBookingContext();

  const deliveryType = state.deliveryType;

  const agency =
    deliveryType === "AGENCY"
      ? state.serviceableAgencies?.find(
          (a) => a.agency.agencyId === state.partnerId
        )
      : undefined;

  const traveler =
    deliveryType === "TRAVELER"
      ? state.serviceableTravelers?.find(
          (t) => t.traveler.travelerId === state.partnerId
        )
      : undefined;

  const handleEdit = () => {
    dispatch({ type: "SET_STEP", payload: 2 });
  };

  const partnerName = agency?.agency.name || traveler?.traveler.name;

  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Truck size={16} />
          SERVICE PARTNER
        </div>

        <button
          onClick={handleEdit}
          className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-800"
        >
          <Pencil size={14} /> Edit
        </button>
      </div>

      {partnerName ? (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-lg">
            {deliveryType === "AGENCY" ? "🏢" : "🧳"}
          </div>

          <div>
            <p className="font-medium">{partnerName}</p>

            <p className="text-xs text-gray-400 uppercase">
              {deliveryType}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400">No partner selected</p>
      )}
    </div>
  );
}