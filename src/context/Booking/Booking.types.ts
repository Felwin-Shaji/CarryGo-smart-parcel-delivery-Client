export type DeliveryType = "AGENCY" | "TRAVELER";

export interface BookingState {
  // Step 1
  fromPincode?: string;
  toPincode?: string;

  // Step 2
  deliveryType?: DeliveryType;
  selectedPartner?: any; // agency DTO or traveler DTO
  packageDetails?: {
    // Agency
    weightKg?: number;
    size?: "SMALL" | "MEDIUM" | "LARGE";
    category?: string;

    // Traveler
    itemType?: string;
    approxWeightKg?: number;
    notes?: string;
  };

  // Step 3
  pickupAddressId?: string;
  deliveryAddressId?: string;
}
