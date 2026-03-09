import { MapPin, Truck } from "lucide-react";
import type { BookingDetailsUI } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";

export const InfoGrid = ({ booking }: { booking: BookingDetailsUI }) => (
    <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard
            icon={<Truck className="h-5 w-5" />}
            title="Delivery Partner"
            value={booking.partnerSnapshot?.name ?? "Traveler"}
        />

        <InfoCard
            icon={<MapPin className="h-5 w-5" />}
            title="Package"
            value={booking.packageDetails.category}
            sub={`${booking.packageDetails.weightKg} kg`}
        />
    </div>
);

const InfoCard = ({ icon, title, value, sub, }: { icon: React.ReactNode; title: string; value: string; sub?: string; }) => (
    <div className="flex gap-4 rounded-xl border bg-white p-4">
        <div className="text-blue-600">{icon}</div>
        <div>
            <p className="text-xs text-gray-400">{title}</p>
            <p className="font-medium">{value}</p>
            {sub && <p className="text-sm text-gray-500">{sub}</p>}
        </div>
    </div>
);