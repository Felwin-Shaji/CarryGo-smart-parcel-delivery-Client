import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { useBooking } from "../../Services/User/Booking/createBooking";
import { Header } from "./components/Header";
import type { BookingDetailsUI } from "../../constants_Types/types/User/Booking/bookingResponse.dto";
import { HeroStatusCard } from "./components/BookingComponent/BookingDetailsComponent/HeroStatusCard";
import { InfoGrid } from "./components/BookingComponent/BookingDetailsComponent/InfoGrid";
import { PaymentSection } from "./components/BookingComponent/BookingDetailsComponent/PaymentSection";
import { PackageDetailsCard } from "./components/BookingComponent/BookingDetailsComponent/PackageDetailsCard";

export const BookingDetailsPage = () => {
    const { bookingId } = useParams();
    const { getBookingById } = useBooking();
    const navigate = useNavigate();

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
                <div className="flex items-center mb-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg 
                        bg-white hover:bg-yellow-500 
                        text-black text-sm font-medium 
                        shadow-sm transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>

                <HeroStatusCard booking={booking} />

                <InfoGrid booking={booking} />

                <PaymentSection booking={booking} />

                <PackageDetailsCard booking={booking} />

                {/* <ActionBar /> */}

            </div>
        </>
    );
};













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
