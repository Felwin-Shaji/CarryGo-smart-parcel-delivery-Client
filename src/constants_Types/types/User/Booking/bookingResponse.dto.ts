import type { BookingUI } from "../../../../pages/User/components/BookingComponent/BookingListing/BookingCard";

export interface getServiceableHubWithAgencyResponseDTO {
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



export interface AddressDTO {
  id: string;
  label: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
};


export interface PricingResponseDTO {
  distanceKm: number;

  basePrice: number;
  distanceCharge: number;
  sizeCharge: number;

  platformFee: number;
  totalPrice: number;

  currency: "INR";
}


export interface BookingDetailsUI extends BookingUI {

//   pricing: {
//     basePrice: number;
//     distanceCharge: number;
//     sizeCharge: number;
//     platformFee: number;
//   };

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


export type HubJourneyStatusType =  "PENDING" | "RECEIVED" | "DISPATCHED";
export type AddressLabelType = "Home" | "Office" | "Warehouse" | "Other";
export type PaymentGatewayType = "RAZORPAY" ;
export type PaymentMethodType = "CARD" | "UPI" | "NETBANKING" | "WALLET";


