import type { BookingDetailsUI } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";

export const HeroStatusCard = ({ booking }: { booking: BookingDetailsUI }) => (
    <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm opacity-80">Booking ID</p>
                <p className="font-mono text-lg">#{booking.id.slice(-6)}</p>
            </div>

            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
                {booking.status.replaceAll("_", " ")}
            </span>
        </div>

        <div className="mt-6 flex items-end justify-between">
            <div>
                <p className="text-sm opacity-80">Total Amount</p>
                <p className="text-3xl font-bold">₹{booking.pricing.totalAmount}</p>
            </div>

            <div className="text-right text-sm opacity-80">
                {booking.distanceKm} km delivery
            </div>
        </div>
    </div>
);