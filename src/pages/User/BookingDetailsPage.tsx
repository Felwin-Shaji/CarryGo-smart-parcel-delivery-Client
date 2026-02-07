import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Truck, CreditCard } from "lucide-react";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { useBooking } from "../../Services/User/Booking/createBooking";
import { Header } from "./components/Header";
import type { BookingDetailsUI } from "../../constants_Types/types/User/Booking/bookingResponse.dto";

export const BookingDetailsPage = () => {
    const { bookingId } = useParams();
    const { getBookingById } = useBooking();

    const [booking, setBooking] = useState<BookingDetailsUI | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const data = await getBookingById(bookingId!);
                setBooking(data);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [bookingId]);

    if (loading) return <LoadingScreen />;
    if (!booking) return <div className="mt-24 text-center">Booking not found</div>;

    return (
        <>
            <Header isLoggedIn />

            <div className="mx-auto max-w-4xl pt-20 mt-10 space-y-6 px-4 py-6">

                <HeroStatusCard booking={booking} />

                <InfoGrid booking={booking} />

                <PaymentSection booking={booking} />

                {/* <ActionBar /> */}

            </div>
        </>
    );
};


const HeroStatusCard = ({ booking }: { booking: BookingDetailsUI }) => (
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


const InfoGrid = ({ booking }: { booking: BookingDetailsUI }) => (
    <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard
            icon={<Truck className="h-5 w-5" />}
            title="Delivery Partner"
            value={booking.partnerSnapshot?.name ?? "Traveler"}
        />

        <InfoCard
            icon={<MapPin className="h-5 w-5" />}
            title="Package"
            value={`${booking.packageDetails.category} • ${booking.packageDetails.size}`}
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

const PaymentSection = ({ booking }: { booking: BookingDetailsUI }) => (
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
            <PriceRow label="Size charge" value={booking.pricing?.sizeCharge!} />
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

const Row = ({ label, value }: { label: string; value: string }) => (
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


// const ActionBar = () => (
//   <div className="flex gap-3">
//     <button className="flex-1 rounded-xl border px-4 py-3 font-medium">
//       Contact support
//     </button>

//     <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white">
//       Track live
//       <ArrowRight className="h-4 w-4" />
//     </button>
//   </div>
// );
