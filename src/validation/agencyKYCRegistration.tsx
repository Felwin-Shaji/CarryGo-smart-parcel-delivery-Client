import * as Yup from "yup";
const FILE_SIZE = 5 * 1024 * 1024; // 5MB max
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

export const validationSchema = Yup.object({
    tradeLicenseNumber: Yup.string()
        .required("Trade license number is required")
        .matches(/^\d+$/, "Must be a number")
        .min(5, "Too short")
        .max(20, "Too long"),

    PANnumber: Yup.string()
        .required("PAN number is required")
        .matches(/^\d+$/, "Must be a number")
        .min(5)
        .max(20),

    gst_number: Yup.string()
        .required("GST number is required")
        .matches(/^\d+$/, "Must be a number"),

    tradeLicenseDocument: Yup.mixed<File>()
        .required("Trade license document required")
        .test("fileSize", "File too large", (value) => {
            const file = value as File;
            return !file || file.size <= FILE_SIZE;
        })
        .test("fileFormat", "Unsupported Format", (value) => {
            const file = value as File;
            return !file || SUPPORTED_FORMATS.includes(file.type);
        }),

    PAN_photo: Yup.mixed<File>()
        .required("PAN photo required")
        .test("fileSize", "File too large", (value) => {
            const file = value as File;
            return !file || file.size <= FILE_SIZE;
        })
        .test("fileFormat", "Unsupported Format", (value) => {
            const file = value as File;
            return !file || SUPPORTED_FORMATS.includes(file.type);
        }),

    gst_certificate: Yup.mixed<File>()
        .required("GST certificate required")
        .test("fileSize", "File too large", (value) => {
            const file = value as File;
            return !file || file.size <= FILE_SIZE;
        })
        .test("fileFormat", "Unsupported Format", (value) => {
            const file = value as File;
            return !file || SUPPORTED_FORMATS.includes(file.type);
        }),
});
