import { Truck } from "lucide-react";
import type { BookingDetailsUI } from "../../../../../shared/constants_Types/types/User/Booking/bookingResponse.dto";

export const DeliveryPartnerCard = ( {booking} :{booking:BookingDetailsUI}) => (
  <div className="bg-white border rounded-xl p-6 shadow-sm">

    <div className="flex items-center gap-2 mb-4">
      <Truck className="w-5 h-5 text-blue-600" />
      <h3 className="font-semibold text-gray-700">Delivery Partner</h3>
    </div>

    <p className="text-lg font-medium">
      {booking.partnerSnapshot?.name ?? "Traveler"}
    </p>

  </div>
);