import type { getServiceableHubWithAgencyDTO, getServiceableTravelerDTO } from "../../constants_Types/types/User/Booking/bookingResponse.dto";

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
  size: "SMALL" | "MEDIUM" | "LARGE";
  weightKg: number;

  itemType?: string;
  approxWeightKg?: number;
  notes?: string;
}

export interface BookingState {
  step?: 1 | 2 | 3 | 4;

  fromPincode?: string;
  toPincode?: string;

  serviceableAgencies?: getServiceableHubWithAgencyDTO[];
  serviceableTravelers?: getServiceableTravelerDTO[];

  deliveryType?: DeliveryType;

  // selectedAgencyId?: string;
  partnerId?: string;
  selectedFromHubId?: string;
  selectedToHubId?: string;
  selectedTravelRequestId?: string;

  selectedPartner?: PartnerPayload;
  packageDetails?: PackagePayload;

  pickupAddressId?: string;
  deliveryAddressId?: string;
}
