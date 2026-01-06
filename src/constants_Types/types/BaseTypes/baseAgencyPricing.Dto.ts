export interface BaseAgencyPricingDTO {
  serviceType: "STANDARD" | "EXPRESS";

  basePrice: number;
  pricePerKm: number;

  sizePricing: {
    SMALL: { price: number };
    MEDIUM: { price: number };
    LARGE: { price: number };
  };
}
