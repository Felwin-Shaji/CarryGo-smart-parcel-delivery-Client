import { useEffect, useMemo, useState } from "react";
import { useBooking } from "../../Services/User/Booking/createBooking";
import { Header } from "./components/Header";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { UserPagination } from "./components/UserPagination";
import { NoBookings } from "./components/BookingComponent/BookingListing/NoBookings";
import { AdvancedBookingFilter } from "./components/BookingComponent/BookingListing/AdvancedBookingFilter";
import type { BookingStatusType, BookingUI, PackageSizeType, PaymentStatusType } from "../../constants_Types/types/User/Booking/bookingResponse.dto";
import { BookingCard } from "./components/BookingComponent/BookingListing/BookingCard";
import { useSearchParams } from "react-router-dom";

export interface BookingFilterParams {
  page: number;
  limit: number;

  deliveryType?: "AGENCY" | "TRAVELER" | "ALL";
  status?: BookingStatusType | "ALL";
  paymentStatus?: PaymentStatusType | "ALL";

  size?: PackageSizeType | "ALL";
}

const parseDeliveryType = (value: string | null): "AGENCY" | "TRAVELER" | "ALL" => {
  if (value === "AGENCY" || value === "TRAVELER") return value;
  return "ALL";
};

const parseStatus = (value: string | null): BookingStatusType | "ALL" => {
  const allowed = ["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"];
  if (value && allowed.includes(value)) return value as BookingStatusType;
  return "ALL";
};

const parsePaymentStatus = (value: string | null): PaymentStatusType | "ALL" => {
  const allowed = ["PENDING", "PAID", "FAILED"];
  if (value && allowed.includes(value)) return value as PaymentStatusType;
  return "ALL";
};

const parseSize = (value: string | null): PackageSizeType | "ALL" => {
  const allowed = ["SMALL", "MEDIUM", "LARGE"];
  if (value && allowed.includes(value)) return value as PackageSizeType;
  return "ALL";
};

export const UserBookingList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams, ".........................................")
  const { listBooking } = useBooking();

  const [bookings, setBookings] = useState<BookingUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const pageParam = Number(searchParams.get("page"));
  const currentPage = pageParam > 0 ? pageParam : 1;

  const filters = useMemo(() => {
    return {
      deliveryType: parseDeliveryType(searchParams.get("deliveryType")),
      status: parseStatus(searchParams.get("status")),
      paymentStatus: parsePaymentStatus(searchParams.get("paymentStatus")),
      size: parseSize(searchParams.get("size")),
    };
  }, [searchParams.toString()]);
  const [draftFilters, setDraftFilters] = useState<Omit<BookingFilterParams, "page" | "limit">>(filters);

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);


  useEffect(() => {
    let isMounted = true;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await listBooking({
          page: currentPage,
          limit: 5,
          ...filters,
        });

        if (!isMounted) return;

        setBookings(response.bookings);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBookings();

    return () => {
      isMounted = false;
    };
  }, [currentPage, filters]);

  if (loading) return <LoadingScreen />;

  const isDefaultFilter =
    filters.deliveryType === "ALL" &&
    filters.status === "ALL" &&
    filters.paymentStatus === "ALL" &&
    filters.size === "ALL";

  if (isDefaultFilter && totalCount === 0) {
    return (
      <>
        <Header isLoggedIn={true} />
        <NoBookings />
      </>
    );
  }


  return (
    <>
      <Header isLoggedIn={true} />

      <div className="max-w-5xl mx-auto mb-10 mt-10 space-y-5">
        <AdvancedBookingFilter
          filters={draftFilters}
          setFilters={setDraftFilters}
          onApply={() => {
            setSearchParams({
              ...draftFilters,
              page: "1",
            });
          }}
        />
        {bookings.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-semibold">
              No bookings match your filters
            </p>
            <p className="text-sm mt-2">
              Try adjusting or clearing filters.
            </p>

            <button
              onClick={() => {
                setSearchParams({
                  deliveryType: "ALL",
                  status: "ALL",
                  paymentStatus: "ALL",
                  size: "ALL",
                  page: "1",
                });
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </div>
      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) =>
          setSearchParams({
            ...filters,
            page: page.toString(),
          })
        }
      />
    </>
  );
};
