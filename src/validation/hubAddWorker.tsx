import * as Yup from "yup";

export const WorkerStep1Schema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile number is required"),
});
