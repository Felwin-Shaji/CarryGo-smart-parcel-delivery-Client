import { useEffect, useState } from "react";
import { useBooking } from "../../Services/User/Booking/createBooking";
import { BookingCard, type BookingUI } from "./components/BookingComponent/BookingListing/BookingCard";
import { Header } from "./components/Header";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";

export const UserBookingList = () => {
  const [bookings, setBookings] = useState<BookingUI[]>([]);
  const [loading, setLoading] = useState(true);

  const { listBooking } = useBooking();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await listBooking();
        setBookings(data);
      } finally {
        setLoading(false); // ✅ important
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <LoadingScreen />
  }


  return (
    <>
      <Header isLoggedIn={true} />

      {bookings.length === 0 ? (
        <div className="text-center mt-24 text-gray-500">
          <p className="text-lg font-medium">No bookings yet</p>
          <p className="text-sm mt-1">Your future deliveries will appear here</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto pt-20 mt-10 space-y-5">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </>
  );
};
