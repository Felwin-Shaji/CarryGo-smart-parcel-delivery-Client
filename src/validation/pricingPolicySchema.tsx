import * as yup from "yup";

export const pricingPolicySchema = yup.object({
  minBasePrice: yup
    .number()
    .typeError("Minimum base price is required")
    .required()
    .min(0),

  maxBasePrice: yup
    .number()
    .typeError("Maximum base price is required")
    .required()
    .min(yup.ref("minBasePrice"), "Must be ≥ minimum"),

  minPricePerKm: yup
    .number()
    .typeError("Minimum km price is required")
    .required()
    .min(0),

  maxPricePerKm: yup
    .number()
    .typeError("Maximum km price is required")
    .required()
    .min(yup.ref("minPricePerKm"), "Must be ≥ minimum"),

  minPricePerKg: yup
    .number()
    .typeError("Minimum KG price is required")
    .required()
    .min(0),

  maxPricePerKg: yup
    .number()
    .typeError("Maximum KG price is required")
    .required()
    .min(yup.ref("minPricePerKg"), "Must be ≥ minimum"),

  platformFeePercent: yup
    .number()
    .typeError("Platform fee is required")
    .required()
    .min(0)
    .max(100),
});
