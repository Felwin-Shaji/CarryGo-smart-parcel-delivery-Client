import * as Yup from "yup";

export const travelRequestValidationSchema = () =>
  Yup.object({
    startAddressId: Yup.string().required("Select pickup address"),
    endAddressId: Yup.string()
      .required("Destination address is required")
      .notOneOf(
        [Yup.ref("startAddressId")],
        "Pickup and Destination cannot be the same"
      ),
    departureAt: Yup.date().required(),
    capacityKg: Yup.number().min(1).required(),
    allowedPackageSizes: Yup.array().min(1).required(),
    modeOfTransport: Yup.string().required(),
  });

