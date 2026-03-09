import type { BookingDetailsUI } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";
import { Row } from "./PaymentSection";

export const PackageDetailsCard = ({ booking }: { booking: BookingDetailsUI }) => {
    const dims = booking.packageDetails.dimensions;

    return (
        <div className="rounded-2xl border bg-white p-6 space-y-4">
            <h3 className="font-semibold text-gray-700">Package Details</h3>

            <Row label="Category" value={booking.packageDetails.category} />

            <Row
                label="Weight"
                value={`${booking.packageDetails.weightKg} kg`}
            />

            <Row
                label="Dimensions"
                value={`${dims.lengthCm} × ${dims.widthCm} × ${dims.heightCm} cm`}
            />

            <Row
                label="Fragile"
                value={booking.packageDetails.fragile ? "Yes" : "No"}
            />
        </div>
    );
};