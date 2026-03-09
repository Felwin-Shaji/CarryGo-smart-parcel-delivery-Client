import { CreditCard } from "lucide-react";
import type { BookingDetailsUI } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";

export const PaymentSection = ({ booking }: { booking: BookingDetailsUI }) => (
    <div className="rounded-2xl border bg-white p-6 space-y-4">
        <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gray-500" />
            <h3 className="font-semibold">Payment Details</h3>
        </div>

        {/* Status */}
        <Row label="Status" value={booking.payment.paymentStatus} />

        <hr />

        {/* Pricing breakdown */}
        <div className="space-y-2 text-sm">
            <PriceRow label="Base price" value={booking?.pricing?.basePrice!} />
            <PriceRow label="Distance charge" value={booking.pricing?.distanceCharge!} />
            <PriceRow label="Platform fee" value={booking.pricing?.platformFee!} />
        </div>

        <hr />

        <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{booking.pricing.totalAmount}</span>
        </div>

        {booking.paymentDetails?.paidAt && (
            <p className="text-xs text-gray-400">
                Paid at: {new Date(booking.paymentDetails?.paidAt).toLocaleString()}
            </p>
        )}
    </div>
);

export const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium">{value}</span>
    </div>
);

const PriceRow = ({ label, value }: { label: string; value: number }) => (
    <div className="flex justify-between">
        <span className="text-gray-500">{label}</span>
        <span>₹{value}</span>
    </div>
);