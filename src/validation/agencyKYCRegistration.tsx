import * as Yup from "yup";
const FILE_SIZE = 5 * 1024 * 1024; // 5MB max
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

export const validationSchema = Yup.object({
    tradeLicenseNumber: Yup.string()
        .required("Trade license number is required")
        .matches(/^[A-Za-z0-9\/\-]{5,20}$/, "Invalid trade license number"),

    PANnumber: Yup.string()
        .required("PAN number is required")
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN number")
        .uppercase(),

    gst_number: Yup.string()
        .required("GST number is required")
        .matches(/^[A-Z0-9]{15}$/, "Invalid GST number")
        .uppercase(),



    tradeLicenseDocument: Yup.mixed<File>()
        .required("Trade license document required")
        .test("fileSize", "File too big", (value) => {
            if (!value) return true;
            if (typeof value === "string") return true;
            return value.size <= FILE_SIZE;
        })
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true;
            if (typeof value === "string") return true;
            return SUPPORTED_FORMATS.includes(value.type);
        }),

    PAN_photo: Yup.mixed<File>()
        .required("PAN photo required")
        .test("fileSize", "File too big", (value) => {
            if (!value) return true;
            if (typeof value === "string") return true;
            return value.size <= FILE_SIZE;
        })
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true;
            if (typeof value === "string") return true;
            return SUPPORTED_FORMATS.includes(value.type);
        }),

    gst_certificate: Yup.mixed<File>()
        .required("GST certificate required")
        .test("fileSize", "File too big", (value) => {
            if (!value) return true;
            if (typeof value === "string") return true;
            return value.size <= FILE_SIZE;
        })
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true;
            if (typeof value === "string") return true;
            return SUPPORTED_FORMATS.includes(value.type);
        })
});
