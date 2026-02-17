export interface PricingPolicyFormDTO {
  minBasePrice: number;
  maxBasePrice: number;

  minPricePerKm: number;
  maxPricePerKm: number;

  minSizePrice: number;
  maxSizePrice: number;

  platformFeePercent: number;
}

export interface TravelerPricingFormType {
    basePricePerKg: number;

    flightMultiplier: number;
    trainMultiplier: number;
    carMultiplier: number;
    busMultiplier: number;
    bikeMultiplier: number;

    platformFeePercent: number;
}
