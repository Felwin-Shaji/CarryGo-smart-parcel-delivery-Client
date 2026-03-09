export interface getServiceableHubWithAgencyDTO {
  agency: {
    agencyId: string;
    name: string;
    commissionRate: number;
  };

  fromHub: {
    hubId: string;
    hubName: string;
    address: {
      city: string;
      state: string;
      pincode: string;
    };
    location: {
      lat: number;
      lng: number;
    };
  };

  toHub: {
    hubId: string;
    hubName: string;
    address: {
      city: string;
      state: string;
      pincode: string;
    };
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface getServiceableTravelerDTO {
  traveler: {
    travelerId: string;
    name: string;
  };

  travelRequest: {
    travelRequestId: string;
    from: {
      city: string;
      state: string;
      pincode: string;
    };
    to: {
      city: string;
      state: string;
      pincode: string;
    };
    departureAt: Date;
    arrivalAt: Date | null;
    remainingCapacityKg: number;
    pricePerKg: number | null;
    modeOfTransport: string;
  };
}

// export interface ServiceableAgencyAndTravelerDTO{
//     agencies:getServiceableHubWithAgencyDTO[],
//   travelers:getServiceableTravelerDTO[]
// }



export interface PricingResponseDTO {
  distanceKm: number;

  basePrice: number;
  distanceCharge: number;
  volumetricCharge: number;

  platformFee: number;

  totalPrice: number;

  currency: "INR";
}


export interface BookingDetailsUI extends BookingUI {

  paymentDetails: {
    gateway: PaymentGatewayType;
    paymentMethod?: PaymentMethodType;

    orderRef?: string;
    paymentRef?: string;

    paidAt?: string;
    refundedAt?: string;
  };

  fullPickupAddress: {
    label: AddressLabelType;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    country: string;
    pincode: string;
    location: {
      lat: number;
      lng: number;
    };
  };

  fullDeliveryAddress: {
    label: AddressLabelType;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    country: string;
    pincode: string;
    location: {
      lat: number;
      lng: number;
    };
  };

  logistics?: {
    routeHubs: {
      hubId: string;
      hubName: string;
      status: HubJourneyStatusType;
      arrivedAt?: string;
      departedAt?: string;
    }[];
    currentHubId?: string;
    lastUpdatedAt?: string;
  };
}


export type HubJourneyStatusType = "PENDING" | "RECEIVED" | "DISPATCHED";
export type AddressLabelType = "Home" | "Office" | "Warehouse" | "Other";
export type PaymentGatewayType = "RAZORPAY";
export type PaymentMethodType = "CARD" | "UPI" | "NETBANKING" | "WALLET";

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



export type DeliveryPartnerType = "AGENCY" | "TRAVELER";

export type BookingStatusFilter =
  | "ALL"
  | "ACTIVE"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatusFilter =
  | "ALL"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";




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

    weightKg: number;

    dimensions: {
      lengthCm: number;
      widthCm: number;
      heightCm: number;
    };

    volumetricWeightKg?: number;

    fragile?: boolean;
  };

  pricing: {
    totalAmount: number;
    currency: "INR";
    basePrice?: number;
    distanceCharge?: number;
    sizeCharge?: number;
    platformFee?: number;
  };

  distanceKm: number;

  payment: {
    paymentStatus: PaymentStatusType;
  };

  status: BookingStatusType;
}



export interface BookingListResponse {
  bookings: BookingUI[];
  totalPages: number;
  totalCount: number;
}