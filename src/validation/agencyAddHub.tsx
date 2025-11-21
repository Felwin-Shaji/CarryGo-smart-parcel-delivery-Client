import * as Yup from "yup";

export const addhubSchema = Yup.object({
  name: Yup.string().required("Hub name is required"),
  addressLine1: Yup.string().required("Address Line 1 is required"),
  addressLine2: Yup.string(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  location_lat: Yup.number()
    .required("Latitude required")
    .notOneOf([0], "Please select a valid latitude"),
  location_lng: Yup.number()
    .required("Longitude required")
    .notOneOf([0], "Please select a valid longitude"),
  verificationImage: Yup.mixed().required("Verification image is required"),
});
