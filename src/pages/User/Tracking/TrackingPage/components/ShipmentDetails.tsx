import { MapPin, Calendar } from "lucide-react";
import type { AgencyParcelTrackingDTO } from "../../../../../constants_Types/types/User/Booking/ParcelTracking";

interface Props {
  booking: AgencyParcelTrackingDTO["booking"];
  shipment?: AgencyParcelTrackingDTO["shipment"];
}

export default function ShipmentDetails({ booking, shipment }: Props) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">

      {/* Header */}
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-800">
          Shipment Details
        </h3>
      </div>

      {/* PICKUP */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          Pickup
        </p>

        <p className="text-sm text-gray-800 leading-relaxed">
          {booking.from.formattedAddress}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {booking.from.city}
        </p>
      </div>

      <hr className="border-gray-200" />

      {/* DELIVERY */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          Delivery
        </p>

        <p className="text-sm text-gray-800 leading-relaxed">
          {booking.to.formattedAddress}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {booking.to.city}
        </p>
      </div>

      <hr className="border-gray-200" />

      {/* BOOKED DATE */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>
          Booked on{" "}
          {new Date(booking.createdAt).toLocaleString()}
        </span>
      </div>

      {/* OPTIONAL SHIPMENT INFO */}
      {shipment && (
        <>
          <hr className="border-gray-200" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-500">Vehicle</p>
              <p className="font-medium text-gray-800">
                {shipment.vehicleNumber || "Not assigned"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="font-medium text-gray-800">
                {shipment.status || "Pending"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}