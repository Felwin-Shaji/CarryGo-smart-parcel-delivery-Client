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

  minSizePrice: yup
    .number()
    .typeError("Minimum size price is required")
    .required()
    .min(0),

  maxSizePrice: yup
    .number()
    .typeError("Maximum size price is required")
    .required()
    .min(yup.ref("minSizePrice"), "Must be ≥ minimum"),

  platformFeePercent: yup
    .number()
    .typeError("Platform fee is required")
    .required()
    .min(0)
    .max(100),
});
