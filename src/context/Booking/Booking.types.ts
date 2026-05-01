import type { getServiceableHubWithAgencyDTO, getServiceableTravelerDTO } from "../../shared/constants_Types/types/User/Booking/bookingResponse.dto";

export type DeliveryType = "AGENCY" | "TRAVELER";

export interface PartnerPayload {
  _id: string;
  name: string;
  type: DeliveryType;
  contact?: {
    email?: string;
    phone?: string;
  };
}

export interface PackagePayload {
  category: string;
  weightKg: number;

  dimensions: {
    lengthCm: number;
    widthCm: number;
    heightCm: number;
  };

  fragile?: boolean;

  volumetricWeightKg?: number;
}


export interface BaseAddress {
  label: "Home" | "Office" | "Warehouse" | "Other" | "Temporary";

  formattedAddress?: string;

  city: string;
  state: string;
  country: string;
  pincode: string;


  location: {
    lat: number;
    lng: number;
  };
}

export interface SavedAddress extends BaseAddress {
  id: string;
  isDefault?: boolean;
  type: "SAVED";
}

export interface TemporaryAddress extends BaseAddress {
  type: "TEMP";
}

export type AddressUI = SavedAddress | TemporaryAddress;

export interface BookingState {
  step?: 1 | 2 | 3 | 4;

  // LOCATION (Step 1)
  pickupAddress?: AddressUI;
  deliveryAddress?: AddressUI;

  // SERVICEABILITY (After Step 1)
  serviceableAgencies?: getServiceableHubWithAgencyDTO[];
  serviceableTravelers?: getServiceableTravelerDTO[];

  // STEP 2
  deliveryType?: DeliveryType;
  partnerId?: string;
  selectedFromHubId?: string;
  selectedToHubId?: string;
  selectedTravelRequestId?: string;

  packageDetails?: PackagePayload;

  // STEP 3
  pricing?: {
    distanceKm: number;

    basePrice: number;
    distanceCharge: number;
    volumetricCharge: number;

    platformFee: number;

    totalPrice: number;

    currency: "INR";
  };
}
