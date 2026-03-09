import { MapPin, Pencil } from "lucide-react";
import { useBookingContext } from "../../../../../context/Booking/BookingContext";

export default function RouteDetailsCard() {
  const { state, dispatch } = useBookingContext();

  const pickup = state.pickupAddress;
  const delivery = state.deliveryAddress;

  const distanceKm = state.pricing?.distanceKm;

  const handleEdit = () => {
    dispatch({ type: "SET_STEP", payload: 1 });
  };

  return (
    <div className="bg-white border rounded-xl p-5">

      <div className="flex justify-between mb-4">

        <div className="flex items-center gap-2 text-sm font-semibold">
          <MapPin size={16} />
          ROUTE DETAILS
        </div>

        <button
          onClick={handleEdit}
          className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-800"
        >
          <Pencil size={14} /> Edit
        </button>

      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">

        {/* PICKUP */}
        <div>
          <p className="text-xs text-gray-400">Pickup</p>
          <p className="font-medium">
            {pickup?.formattedAddress ?? "Not selected"}
          </p>
        </div>

        {/* DELIVERY */}
        <div>
          <p className="text-xs text-gray-400">Delivery</p>
          <p className="font-medium">
            {delivery?.formattedAddress ?? "Not selected"}
          </p>
        </div>

      </div>

      {distanceKm && (
        <div className="mt-4 bg-gray-100 rounded-lg px-3 py-2 text-xs">
          Estimated Distance: <b>{distanceKm} km</b>
        </div>
      )}

    </div>
  );
}