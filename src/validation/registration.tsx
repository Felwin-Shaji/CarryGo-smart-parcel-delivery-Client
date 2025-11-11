import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),


  role: Yup.string()
    .oneOf(["user", "agency", "admin", "hub", "worker"], "Invalid role")
    .required("Role is required"),

  mobile: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .min(10, "Enter a valid 10-digit mobile number")
    .max(10, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),

  password: Yup.string()
    .trim()
    .strict(true)
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain one uppercase, one lowercase, one number, and one special character"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .trim()
    .strict(true)
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
