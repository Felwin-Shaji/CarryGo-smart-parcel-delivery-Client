export interface BaseAgencyPricingDTO {
  serviceType: "STANDARD" | "EXPRESS";

  basePrice: number;
  pricePerKm: number;
  pricePerKg: number;

}
