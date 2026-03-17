
import * as Yup from "yup";

export const addRouteGroupValidationSchema = Yup.object({
  name: Yup.string()
    .required("Route name is required")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters"),

  description: Yup.string()
    .max(200, "Maximum 200 characters"),
});
