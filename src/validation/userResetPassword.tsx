import * as Yup from "yup";

export const userResetPasswordSchema = Yup.object({
    currentPassword: Yup.string()
        .required("Current password is required"),

    newPassword: Yup.string()
        .trim()
        .strict(true)
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),

    confirmPassword: Yup.string()
        .trim()
        .strict(true)
        .oneOf([Yup.ref("newPassword")], "Passwords do not match")
        .required("Confirm password is required"),
});
