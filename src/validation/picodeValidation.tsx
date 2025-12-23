import * as Yup from "yup";

const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

export const PincodeValidationSchema = Yup.object({
    fromPincode: Yup.string()
        .matches(PINCODE_REGEX, "Enter a valid 6-digit pincode")
        .required("From pincode is required"),
    toPincode: Yup.string()
        .matches(PINCODE_REGEX, "Enter a valid 6-digit pincode")
        .required("To pincode is required"),
});