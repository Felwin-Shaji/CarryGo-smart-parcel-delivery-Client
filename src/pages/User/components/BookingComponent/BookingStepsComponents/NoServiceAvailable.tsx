import { FaMapMarkerAlt } from "react-icons/fa";
import { useBookingContext } from "../../../../../context/Booking/BookingContext";

const NoServiceAvailable = () => {
  const { dispatch } = useBookingContext();

  const handleChangeLocation = () => {
    dispatch({ type: "SET_STEP", payload: 1 });
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center">

      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <FaMapMarkerAlt className="text-blue-600 text-lg" />
      </div>

      <h3 className="text-lg font-semibold text-neutral-800">
        No delivery services available yet
      </h3>

      <p className="text-sm text-neutral-500 mt-2 max-w-md">
        We're still expanding our network in this area. Try another pickup or
        delivery location — new partners are joining every day.
      </p>

      <div className="mt-4 text-xs text-neutral-400">
        🚀 CarryGo network is growing across cities
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={handleChangeLocation}
        className="mt-6 px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition"
      >
        Try another location
      </button>

    </div>
  );
};

export default NoServiceAvailable;