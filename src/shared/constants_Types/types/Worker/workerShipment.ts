import type { ShipmentParcelUI, ShipmentType } from "../Hub/HubShipment";
import type { AddressLabelType, BookingStatusType, DeliveryPartnerType, HubJourneyStatusType, PaymentGatewayType, PaymentMethodType, PaymentStatusType } from "../User/Booking/bookingResponse.dto";

export type WorkerShipment = {
  id: string;

  type: ShipmentType;
  status: ShipmentStatus;

  parcelCount: number;
  capacity: number | null;

  estimatedDispatchAt: string | null;
  departedAt: string | null;
  arrivedAt: string | null;

  createdAt: string;
};

export interface HubShipmentPaginatedData {
    data: WorkerShipment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type ShipmentStatus =
    | "PENDING"
    | "LOADING"
    | "DISPATCHED"
    | "ARRIVED"
    | "COMPLETED"
    | "CANCELLED";

    export type ShipmentAction =
  | "START_LOADING"
  | "DISPATCH"
  | "MARK_ARRIVED"
  | "COMPLETE";


export type WorkerShipmentDetails = {
  id: string;
  type: ShipmentType;
  status: ShipmentStatus;

  parcelCount: number;
  capacity: number | null;

  createdAt: string;

  parcels: ShipmentParcelUI[];
};

export type ParcelAction = "PENDING" | "LOAD" | "TRANSIT" | "UNLOAD";

export type WorkerShipmentParcel = {
  id: string;
  bookingId: string;

  status: "PENDING" | "LOADED" | "IN_TRANSIT" | "UNLOADED";

  loadedAt: string;
  unloadedAt: string | null;
};

export interface AddressEntity {
    label: AddressLabelType,
    formattedAddress: string,
    city: string;
    state: string;
    country: string;
    pincode: string;
    location: {
        lat: number;
        lng: number;
    };
}


export interface WorkersBookingDetailsUI {
  id: string;
  createdAt: string;
  updatedAt: string;

  deliveryPartnerType: DeliveryPartnerType;

  partnerSnapshot?: {
    partnerId?: string | null;
    name: string;
    type: DeliveryPartnerType;
    contact?: {
      email?: string;
      phone?: string | null;
    };
  } | null;

  pickupAddress: AddressEntity;
  deliveryAddress: AddressEntity;

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
    basePrice: number;
    distanceCharge: number;
    volumetricCharge: number;
    platformFee: number;
    totalAmount: number;
    currency: "INR";
  };

  distanceKm: number;

  payment: {
    gateway: PaymentGatewayType;
    paymentStatus: PaymentStatusType;

    orderRef?: string;
    paymentRef?: string;
    paymentMethod?: PaymentMethodType;

    paidAt?: string;
    refundedAt?: string;
  };

  logistics?: {
    fromHubId?: string | null;
    toHubId?: string | null;
    parcelRouteId?: string | null;

    routeHubs?: {
      hubId: string;
      hubName: string;
      status: HubJourneyStatusType;
      arrivedAt?: string;
      departedAt?: string;
    }[];

    currentHubId?: string;
    lastUpdatedAt?: string;
  };

  status: BookingStatusType;

  travelerJourney?: {
    acceptedAt?: string;
    pickedUpAt?: string;
    deliveredAt?: string;
  };
}