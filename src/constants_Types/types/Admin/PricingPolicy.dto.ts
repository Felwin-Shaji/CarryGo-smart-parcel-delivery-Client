
export interface PricingPolicyResponseDTO{
  _id: string;
  deliveryModel: "AGENCY" | "TRAVELER";
  minBasePrice: number;
  maxBasePrice: number;
  minPricePerKm: number;
  maxPricePerKm: number;
  minPricePerKg: number;
  maxPricePerKg: number;
  platformFeePercent: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};


export interface PricingPolicyDTO {
  minBasePrice: number;
  maxBasePrice: number;

  minPricePerKm: number;
  maxPricePerKm: number;

  minSizePrice: number;
  maxSizePrice: number;

  platformFeePercent: number;
}

