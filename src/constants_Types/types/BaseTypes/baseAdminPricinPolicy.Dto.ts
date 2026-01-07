export interface PricingPolicyFormDTO {
  minBasePrice: number;
  maxBasePrice: number;

  minPricePerKm: number;
  maxPricePerKm: number;

  minSizePrice: number;
  maxSizePrice: number;

  platformFeePercent: number;
}
