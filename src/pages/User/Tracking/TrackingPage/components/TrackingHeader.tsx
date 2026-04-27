import { Package, MapPin } from "lucide-react";
import type { AgencyParcelTrackingDTO } from "../../../../../constants_Types/types/User/Booking/ParcelTracking";

interface Props {
  booking: AgencyParcelTrackingDTO["booking"];
  currentStatus: AgencyParcelTrackingDTO["currentStatus"];
}

export default function TrackingHeader({ booking, currentStatus }: Props) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">

      {/* LEFT SIDE */}
      <div className="space-y-2">

        {/* Booking ID + Status */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 font-medium text-gray-900">
            <Package className="w-5 h-5" />
            {booking.bookingId}
          </div>

          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
            {booking.status}
          </span>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-700 max-w-xl">
          {currentStatus.message}
        </p>

        {/* Last Updated */}
        {currentStatus.updatedAt && (
          <p className="text-xs text-gray-400">
            Last updated:{" "}
            {new Date(currentStatus.updatedAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* RIGHT SIDE (Hub Info Card) */}
      {currentStatus.hub && (
        <div className="border rounded-lg px-4 py-3 flex items-center gap-3 bg-gray-50 min-w-[220px]">
          <MapPin className="w-5 h-5 text-gray-500" />

          <div>
            <p className="text-sm font-medium text-gray-900">
              {currentStatus.hub.name}
            </p>
            <p className="text-xs text-gray-500">
              {currentStatus.hub.address.city},{" "}
              {currentStatus.hub.address.state}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}