import { MapPin, Calendar, ArrowRight } from "lucide-react";
import type { AgencyParcelTrackingDTO } from "../../../../../constants_Types/types/User/Booking/ParcelTracking";

interface Props {
  booking: AgencyParcelTrackingDTO["booking"];
  shipment?: AgencyParcelTrackingDTO["shipment"];
}

export default function ShipmentDetails({ booking, shipment }: Props) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">

      {/* Header */}
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-600" />
        <h3 className="font-semibold text-gray-800">
          Shipment Details
        </h3>
      </div>

      {/* ROUTE CARD */}
      <div className="bg-gray-50 border rounded-lg p-4 space-y-3">

        {/* Pickup */}
        <div>
          <p className="text-[11px] text-gray-500 uppercase tracking-wide">
            Pickup
          </p>
          <p className="text-sm font-medium text-gray-800">
            {booking.from.city}
          </p>
          <p className="text-xs text-gray-500 leading-snug">
            {booking.from.formattedAddress}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>

        {/* Delivery */}
        <div>
          <p className="text-[11px] text-gray-500 uppercase tracking-wide">
            Delivery
          </p>
          <p className="text-sm font-medium text-gray-800">
            {booking.to.city}
          </p>
          <p className="text-xs text-gray-500 leading-snug">
            {booking.to.formattedAddress}
          </p>
        </div>
      </div>

      {/* META INFO */}
      <div className="flex items-center justify-between text-xs text-gray-500">

        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            {new Date(booking.createdAt).toLocaleString()}
          </span>
        </div>

        {shipment && (
          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
            {shipment.status || "Pending"}
          </span>
        )}
      </div>
    </div>
  );
}