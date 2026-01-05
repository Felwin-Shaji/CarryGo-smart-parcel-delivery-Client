import * as Yup from "yup";

export const pricingPolicySchema = Yup.object({
  minBasePrice: Yup.number()
    .min(0, "Must be positive")
    .required("Required"),
  maxBasePrice: Yup.number()
    .moreThan(
      Yup.ref("minBasePrice"),
      "Max must be greater than Min"
    )
    .required("Required"),

  minPricePerKm: Yup.number().min(0).required(),
  maxPricePerKm: Yup.number()
    .moreThan(Yup.ref("minPricePerKm"))
    .required(),

  minPricePerKg: Yup.number().min(0).required(),
  maxPricePerKg: Yup.number()
    .moreThan(Yup.ref("minPricePerKg"))
    .required(),

  platformFeePercent: Yup.number()
    .min(0)
    .max(30, "Too high")
    .required(),
});
