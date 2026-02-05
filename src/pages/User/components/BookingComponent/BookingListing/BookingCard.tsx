export const BookingCard = ({ booking }: { booking: BookingUI }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500">
            #{booking.id}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold text-lg">
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
            {booking.pickupAddress.city} ({booking.pickupAddress.pincode})
          </p>
          <p className="text-gray-400 text-xs">Pickup</p>
        </div>

        <div className="mx-2 text-gray-300">→</div>

        <div className="text-sm">
          <p className="font-medium">
            {booking.deliveryAddress.city} ({booking.deliveryAddress.pincode})
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
          📦 {booking.packageDetails.category} • {booking.packageDetails.size} • {booking.packageDetails.weightKg}kg
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <BookingStatusBadge status={booking.status} />

        <div className="flex gap-3">
          <button className="text-sm font-medium text-blue-600 hover:underline">
            View details
          </button>
          <button className="text-sm font-medium text-green-600 hover:underline">
            Track
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingStatusBadge = ({ status }: { status: BookingStatusType }) => {
  const config = BOOKING_STATUS_CONFIG[status];

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${config.className}`}
    >
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


export type BookingStatusType =
    | "CREATED"
    | "PAYMENT_PENDING"
    | "PAID_PENDING_PICKUP"
    | "PICKUP_STARTED"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "CANCELLED_BEFORE_PICKUP"
    | "CANCELLED_AFTER_PICKUP"
    | "REFUNDED"
    | "SETTLED";


export type PaymentStatusType =
    | "NOT_INITIATED"
    | "ORDER_CREATED"
    | "PAID"
    | "FAILED"
    | "REFUNDED";


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


///////////////////////////////////////////////
export type DeliveryPartnerType = "AGENCY" | "TRAVELER";

export type PackageSizeType = "SMALL" | "MEDIUM" | "LARGE";

export interface BookingUI {
  id: string;

  createdAt: string;

  deliveryPartnerType: DeliveryPartnerType;
  partnerSnapshot?: {
    name: string;
    type: DeliveryPartnerType;
  } | null;

  pickupAddress: {
    city: string;
    pincode: string;
  };

  deliveryAddress: {
    city: string;
    pincode: string;
  };

  packageDetails: {
    category: string;
    size: PackageSizeType;
    weightKg: number;
  };

  pricing: {
    totalAmount: number;
    currency: "INR";
  };

  distanceKm: number;

  payment: {
    paymentStatus: PaymentStatusType;
  };

  status: BookingStatusType;
}


///////////////////////////////////////