import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "../../shared/components/loading/CarryGoLoadingScreen";
import { useBooking } from "../../Services/User/Booking/createBooking";
import { Header } from "./components/Header";
import type { BookingDetailsUI } from "../../shared/constants_Types/types/User/Booking/bookingResponse.dto";
import { HeroStatusCard } from "./components/BookingComponent/BookingDetailsComponent/HeroStatusCard";
import { DeliveryPartnerCard } from "./components/BookingComponent/BookingDetailsComponent/DeliveryPartnerCard";
import { PaymentSection } from "./components/BookingComponent/BookingDetailsComponent/PaymentSection";
import {  PackageSummaryCard } from "./components/BookingComponent/BookingDetailsComponent/PackageSummaryCard";

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

            <div className="mx-auto max-w-5xl pt-24 px-4 pb-10 space-y-6">

                {/* HERO */}
                <HeroStatusCard booking={booking} />

                {/* SUMMARY */}
                <div className="grid md:grid-cols-2 gap-6">
                    <DeliveryPartnerCard booking={booking} />
                    <PackageSummaryCard booking={booking} />
                </div>

                {/* PAYMENT */}
                <PaymentSection booking={booking} />

            </div>
        </>
    );
};