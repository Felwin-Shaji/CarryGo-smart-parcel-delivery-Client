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
  fromPincode?: string;
  toPincode?: string;

  deliveryType?: DeliveryType;

  selectedPartner?: PartnerPayload;
  packageDetails?: PackagePayload;

  pickupAddressId?: string;
  deliveryAddressId?: string;
}
