import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { BookingDetailsUI } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";

export const HeroStatusCard = ({ booking }: { booking: BookingDetailsUI }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm hover:text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <span className="text-sm text-gray-500">
          Booking ID <span className="font-mono text-gray-800"> : {booking.bookingId}</span>
        </span>

        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          {booking.status.replaceAll("_", " ")}
        </span>

      </div>

      <div className="flex items-end justify-between">

        <div>
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-4xl font-bold text-gray-900">
            ₹{booking.pricing.totalAmount}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4 text-blue-500" />
          {booking.distanceKm} km delivery
        </div>

      </div>

    </div>
  );
};