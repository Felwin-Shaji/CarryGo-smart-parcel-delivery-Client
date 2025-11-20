
import { X } from "lucide-react";
import { useFormik } from "formik";
import { validationSchema } from "../../../validation/agencyKYCRegistration";
import toast from "react-hot-toast";
import { useAxios } from "../../../hooks/useAxios";
import { API_AGENCY } from "../../../constants/apiRoutes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { updateAgencyKycStatus } from "../../../store/Slice/agencySlice";
import { useState } from "react";




const KYCRegistrationForm = () => {
    const { agency } = useSelector((state: RootState) => state.agencyState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    if (!agency) {
        return
    }
    const axiosInstence = useAxios()
    const formik = useFormik({
        initialValues: {
            id: agency.id,
            tradeLicenseNumber: "",
            tradeLicenseDocument: null as File | null,
            PANnumber: "",
            PAN_photo: null as File | null,
            gst_number: "",
            gst_certificate: null as File | null,
        },
        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append("tradeLicenseNumber", values.tradeLicenseNumber);
            formData.append("tradeLicenseDocument", values.tradeLicenseDocument!);
            formData.append("PANnumber", values.PANnumber);
            formData.append("PAN_photo", values.PAN_photo!);
            formData.append("gst_number", values.gst_number);
            formData.append("gst_certificate", values.gst_certificate!);
            formData.append("id", agency?.id)

            try {
                console.log(formData)
                const response = await axiosInstence.post(API_AGENCY.KYC_CARIFICATION, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log(response.data)

                if (response.data.success) {
                    toast.success(response.data.message || "form submited successfuly")
                    dispatch(updateAgencyKycStatus(response.data.kycStatus));
                    navigate("/agency/dashboard")
                    setLoading(false)
                }

            } catch (error: any) {
                toast.error(error.response.date.message || "Upload failed");
            }
        },
    });

    const isImage = (file: File | null) => file?.type.startsWith("image/");
    //   const isPDF = (file: File | null) => file?.type === "application/pdf";

    const FilePreview = ({
        file,
        onRemove,
    }: {
        file: File | null;
        onRemove: () => void;
    }) =>
        file ? (
            <div className="relative mt-3 inline-block">
                <button
                    type="button"
                    onClick={onRemove}
                    className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 hover:bg-red-600"
                >
                    <X size={12} />
                </button>

                {isImage(file) ? (
                    <img
                        src={URL.createObjectURL(file)}
                        className="h-24 w-24 rounded-lg object-cover border shadow"
                    />
                ) : (
                    <div className="bg-gray-200 rounded p-3 w-40 flex items-center gap-2 shadow">
                        📄 {file.name}
                    </div>
                )}
            </div>
        ) : null;

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-5xl mx-auto mt-10 bg-white border rounded-2xl shadow-lg p-10"
            style={{ backgroundColor: "#dbe0f7ff" }}
        >
            <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                Agency KYC Verification
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">

                {/* Trade License Number */}
                <div>
                    <label className="font-semibold text-gray-800 mb-2 block">
                        Trade License Number
                    </label>
                    <input
                        type="text"
                        name="tradeLicenseNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tradeLicenseNumber}
                        className="p-3 rounded-xl bg-white shadow-sm border border-gray-300 w-full"
                    />
                    {formik.touched.tradeLicenseNumber && formik.errors.tradeLicenseNumber && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.tradeLicenseNumber}</p>
                    )}
                </div>

                {/* Trade License Document */}
                <div>
                    <label className="font-semibold text-gray-800 mb-2 block">
                        Trade License Document
                    </label>

                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => formik.setFieldValue("tradeLicenseDocument", e.target.files?.[0] || null)}
                        onBlur={formik.handleBlur}
                        className="w-full p-3 bg-white rounded-xl border shadow-sm"
                    />

                    {formik.touched.tradeLicenseDocument && formik.errors.tradeLicenseDocument && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.tradeLicenseDocument}</p>
                    )}

                    <FilePreview
                        file={formik.values.tradeLicenseDocument}
                        onRemove={() => formik.setFieldValue("tradeLicenseDocument", null)}
                    />
                </div>

                {/* PAN Number */}
                <div>
                    <label className="font-semibold text-gray-800 mb-2 block">PAN Number</label>
                    <input
                        type="text"
                        name="PANnumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.PANnumber}
                        className="p-3 rounded-xl bg-white shadow-sm border border-gray-300 w-full"
                    />
                    {formik.touched.PANnumber && formik.errors.PANnumber && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.PANnumber}</p>
                    )}
                </div>

                {/* PAN Photo */}
                <div>
                    <label className="font-semibold text-gray-800 mb-2 block">PAN Photo</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => formik.setFieldValue("PAN_photo", e.target.files?.[0] || null)}
                        className="w-full p-3 bg-white rounded-xl border shadow-sm"
                    />

                    {formik.touched.PAN_photo && formik.errors.PAN_photo && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.PAN_photo}</p>
                    )}

                    <FilePreview
                        file={formik.values.PAN_photo}
                        onRemove={() => formik.setFieldValue("PAN_photo", null)}
                    />
                </div>

                {/* GST Number */}
                <div>
                    <label className="font-semibold text-gray-800 mb-2 block">GST Number</label>
                    <input
                        type="text"
                        name="gst_number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gst_number}
                        className="p-3 rounded-xl bg-white shadow-sm border border-gray-300 w-full"
                    />
                    {formik.touched.gst_number && formik.errors.gst_number && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.gst_number}</p>
                    )}
                </div>

                {/* GST Certificate */}
                <div>
                    <label className="font-semibold text-gray-800 mb-2 block">
                        GST Certificate
                    </label>

                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => formik.setFieldValue("gst_certificate", e.target.files?.[0] || null)}
                        className="w-full p-3 bg-white rounded-xl border shadow-sm"
                    />

                    {formik.touched.gst_certificate && formik.errors.gst_certificate && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.gst_certificate}</p>
                    )}

                    <FilePreview
                        file={formik.values.gst_certificate}
                        onRemove={() => formik.setFieldValue("gst_certificate", null)}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`mt-12 w-full p-4 text-lg rounded-xl font-semibold shadow-md transition-all 
        ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                    </div>
                ) : (
                    "Submit KYC"
                )}
            </button>
        </form>
    );
};

export default KYCRegistrationForm;
