export interface PricingPolicyFormDTO {
  minBasePrice: number;
  maxBasePrice: number;

  minPricePerKm: number;
  maxPricePerKm: number;

  minPricePerKg: number;
  maxPricePerKg: number;

  platformFeePercent: number;
}

export interface TravelerPricingFormType {
  basePrice: number;

  pricePerKm: number;

  basePricePerKg: number;

  transportMultipliers: {
    FLIGHT: number;
    TRAIN: number;
    CAR: number;
    BUS: number;
    BIKE: number;
  };

  platformFeePercent: number;
}
