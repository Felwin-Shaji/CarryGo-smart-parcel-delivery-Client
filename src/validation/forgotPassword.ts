import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
});


export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
