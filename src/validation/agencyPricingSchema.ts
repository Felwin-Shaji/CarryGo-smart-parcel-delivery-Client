import * as Yup from "yup";
import type { PricingPolicyDTO } from "../shared/constants_Types/types/Admin/PricingPolicy.dto";

export const agencyPricingSchema = (policy: PricingPolicyDTO) =>
  Yup.object({
    serviceType: Yup.mixed<"STANDARD" | "EXPRESS">()
      .oneOf(["STANDARD", "EXPRESS"])
      .required(),

    basePrice: Yup.number()
      .min(policy.minBasePrice, `Minimum ₹${policy.minBasePrice}`)
      .max(policy.maxBasePrice, `Maximum ₹${policy.maxBasePrice}`)
      .required(),

    pricePerKm: Yup.number()
      .min(policy.minPricePerKm, `Minimum ₹${policy.minPricePerKm}`)
      .max(policy.maxPricePerKm, `Maximum ₹${policy.maxPricePerKm}`)
      .required(),

    pricePerKg: Yup.number()
      .min(policy.minPricePerKg, `Minimum ₹${policy.minPricePerKg}`)
      .max(policy.maxPricePerKg, `Maximum ₹${policy.maxPricePerKg}`)
      .required(),
  });