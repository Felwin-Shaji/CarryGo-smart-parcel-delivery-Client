import { useEffect, useState } from "react";
import { useBooking } from "../../Services/User/Booking/createBooking";
import { Header } from "./components/Header";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { UserPagination } from "./components/UserPagination";
import { NoBookings } from "./components/BookingComponent/BookingListing/NoBookings";
import { AdvancedBookingFilter } from "./components/BookingComponent/BookingListing/AdvancedBookingFilter";
import type { BookingStatusType, BookingUI, PackageSizeType, PaymentStatusType } from "../../constants_Types/types/User/Booking/bookingResponse.dto";
import { BookingCard } from "./components/BookingComponent/BookingListing/BookingCard";

export interface BookingFilterParams {
  page: number;
  limit: number;

  deliveryType?: "AGENCY" | "TRAVELER" | "ALL";
  status?: BookingStatusType | "ALL";
  paymentStatus?: PaymentStatusType | "ALL";

  size?: PackageSizeType | "ALL";

  minPrice?: number;
  maxPrice?: number;
}
export const UserBookingList = () => {
  const [bookings, setBookings] = useState<BookingUI[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<
    Omit<BookingFilterParams, "page" | "limit">
  >({
    deliveryType: "ALL",
    status: "ALL",
    paymentStatus: "ALL",
    size: "ALL",
    minPrice: undefined,
    maxPrice: undefined,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { listBooking } = useBooking();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        const response = await listBooking({
          page: currentPage,
          limit: 5,
          ...filters,
        });

        setBookings(response.data);
        setTotalPages(response.totalPages);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentPage, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (loading) return <LoadingScreen />;


  return (
    <>
      <Header isLoggedIn={true} />

      {bookings.length === 0 ? (
        <div className="text-center mt-24 text-gray-500">
          <NoBookings />
        </div>
      ) : (
        <>

          <div className="max-w-5xl mx-auto pt-20 mt-10 space-y-5">
            <AdvancedBookingFilter
              filters={filters}
              setFilters={setFilters}
            />
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  );
};
