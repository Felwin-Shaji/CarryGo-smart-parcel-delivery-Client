import { useNavigate } from "react-router-dom";
import type { BookingStatusType, BookingUI, PaymentStatusType } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";

export const BookingCard = ({ booking }: { booking: BookingUI }) => {
  const navigate = useNavigate();
  console.log(booking.payment.paymentStatus, 'kjjjjjjjjjjjjjjjjjjjjk')
  const style =
    DELIVERY_STYLE_CONFIG[booking.deliveryPartnerType];

  return (
    <div
      className={`rounded-2xl shadow-sm border p-6 space-y-4 transition-all duration-200 hover:shadow-md ${style.container}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500">
            #{booking.id}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(booking.createdAt).toLocaleDateString()}
          </p>

          {/* Delivery Type Label */}
          <span
            className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium ${style.badge}`}
          >
            {style.icon} {style.label}
          </span>
        </div>

        <div className="text-right">
          <p className={`font-semibold text-lg ${style.accent}`}>
            ₹{booking.pricing.totalAmount}
          </p>
          <PaymentBadge status={booking.payment.paymentStatus} />
        </div>
      </div>

      {/* Route */}
      <div className="flex items-start gap-3">
        <div className="text-lg">📍</div>

        <div className="text-sm">
          <p className="font-medium">
            {booking.pickupAddress.city} (
            {booking.pickupAddress.pincode})
          </p>
          <p className="text-gray-400 text-xs">Pickup</p>
        </div>

        <div className="mx-2 text-gray-300">→</div>

        <div className="text-sm">
          <p className="font-medium">
            {booking.deliveryAddress.city} (
            {booking.deliveryAddress.pincode})
          </p>
          <p className="text-gray-400 text-xs">Delivery</p>
        </div>
      </div>

      {/* Package + Partner */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span>
          🚚 {booking.partnerSnapshot?.name ?? "Traveler"}
        </span>

        <span>
          📦 {booking.packageDetails.category} •{" "}
          {booking.packageDetails.weightKg}kg
        </span>
      </div>

      {/* Status + Actions */}
      {/* Status + Actions */}
      <div className="flex items-center justify-between">
        <BookingStatusBadge status={booking.status} />

        <div className="flex gap-2">

          <button
            onClick={() => navigate(`/bookings/${booking.id}`)}
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            View Details
          </button>

          <button
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Track
          </button>

          {booking.payment.paymentStatus === "FAILED" && (
            <button
              onClick={() => navigate(`/booking/${booking.id}/pay`)}
              className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry Payment
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

const BookingStatusBadge = ({ status }: { status: BookingStatusType }) => {
  const config = BOOKING_STATUS_CONFIG[status];

  if (!config) {
    console.warn("Invalid booking status:", status);
    return (
      <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
        Unknown
      </span>
    );
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
};

const PaymentBadge = ({ status }: { status: PaymentStatusType }) => {
  const config = PAYMENT_STATUS_CONFIG[status];

  return (
    <span className={`text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
};





const BOOKING_STATUS_CONFIG: Record<
  BookingStatusType,
  { label: string; className: string }
> = {
  CREATED: {
    label: "Created",
    className: "bg-gray-100 text-gray-700",
  },

  PAYMENT_PENDING: {
    label: "Payment pending",
    className: "bg-yellow-100 text-yellow-700",
  },

  PAID_PENDING_PICKUP: {
    label: "Awaiting pickup",
    className: "bg-blue-100 text-blue-700",
  },

  PICKUP_STARTED: {
    label: "Pickup started",
    className: "bg-indigo-100 text-indigo-700",
  },

  IN_TRANSIT: {
    label: "In transit",
    className: "bg-orange-100 text-orange-700",
  },

  DELIVERED: {
    label: "Delivered",
    className: "bg-green-100 text-green-700",
  },

  CANCELLED_BEFORE_PICKUP: {
    label: "Cancelled (before pickup)",
    className: "bg-red-100 text-red-700",
  },

  CANCELLED_AFTER_PICKUP: {
    label: "Cancelled (after pickup)",
    className: "bg-red-200 text-red-800",
  },

  REFUNDED: {
    label: "Refunded",
    className: "bg-purple-100 text-purple-700",
  },

  SETTLED: {
    label: "Settled",
    className: "bg-emerald-100 text-emerald-700",
  },
};


const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatusType,
  { label: string; className: string }
> = {
  NOT_INITIATED: {
    label: "Not initiated",
    className: "text-gray-500",
  },

  ORDER_CREATED: {
    label: "Order created",
    className: "text-blue-600",
  },

  PAID: {
    label: "Paid",
    className: "text-green-600",
  },

  FAILED: {
    label: "Failed",
    className: "text-red-600",
  },

  REFUNDED: {
    label: "Refunded",
    className: "text-purple-600",
  },
};

const DELIVERY_STYLE_CONFIG = {
  AGENCY: {
    container:
      "border-blue-200 bg-gradient-to-br from-blue-50 to-white",
    accent: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    icon: "🏢",
    label: "Agency Delivery",
  },
  TRAVELER: {
    container:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white",
    accent: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "🧳",
    label: "Traveler Delivery",
  },
};

