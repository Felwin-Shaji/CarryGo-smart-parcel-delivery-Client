import { Box } from "lucide-react";
import type { BookingDetailsUI } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";

export const PackageSummaryCard = ({booking} :{booking:BookingDetailsUI}) => {

  const dims = booking.packageDetails.dimensions;

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <div className="flex items-center gap-2 mb-4">
        <Box className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-700">Package</h3>
      </div>

      <div className="space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">Category</span>
          <span>{booking.packageDetails.category}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Weight</span>
          <span>{booking.packageDetails.weightKg} kg</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Dimensions</span>
          <span>
            {dims.lengthCm} × {dims.widthCm} × {dims.heightCm}
          </span>
        </div>

      </div>

    </div>
  );
};