import { BookingCard, type BookingUI } from "./components/BookingComponent/BookingListing/BookingCard";

interface Props {
  bookings: BookingUI[];
}

export const UserBookingList = ({ bookings }: Props) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center mt-24 text-gray-500">
        <p className="text-lg font-medium">No bookings yet</p>
        <p className="text-sm mt-1">Your future deliveries will appear here</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};
