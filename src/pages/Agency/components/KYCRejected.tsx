import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { validationSchema } from "../../../validation/agencyKYCRegistration";
import { useEffect, useState } from "react";
import { useResubmitAgencyKyc } from "../../../Services/Agency/AgencyResubmitAgency";
import { AlertTriangle,  } from "lucide-react";
import { useFormik } from "formik";
import FilePreview from "./PreviewComponent/FilePreview";
import { useNavigate } from "react-router-dom";

const KYCRejected = () => {
  const navigate = useNavigate();
  const { fetchRejectedAgencyKyc, resubmitAgencyKyc } = useResubmitAgencyKyc();

  const { agency } = useSelector((state: RootState) => state.agencyState);
  const [agencyData, setAgencyData] = useState<any>(null);
  const [agencyKyc, setAgencyKyc] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRejectedAgencyKyc(agency!.id).then((data) => {
      setAgencyData(data);
      setAgencyKyc(data.data.kyc);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      agencyId: agency?.id || "",
      tradeLicenseNumber: agencyKyc?.tradeLicenseNumber || "",
      tradeLicenseDocument: agencyKyc?.tradeLicenseDocument || null,

      PANnumber: agencyKyc?.PANnumber || "",
      PAN_photo: agencyKyc?.PAN_photo || null,

      gst_number: agencyKyc?.gst_number || "",
      gst_certificate: agencyKyc?.gst_certificate || null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);

      console.log("Raw Formik values:", values);

      // Convert to FormData
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      console.log("Submitting FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      try {
        await resubmitAgencyKyc(formData);
        navigate("/agency/dashboard", { replace: true });
        console.log("KYC Successfully Resubmitted!");
      } catch (error) {
        console.error("Error submitting KYC:", error);
      } finally {
        setLoading(false);
      }
    }

  });







  return (
    <div className="p-3">

      {/* rejection reason */}
      <div className="-mx-4">
        <div className="bg-red-100 p-3 border border-red-300 text-center">
          <AlertTriangle size={35} className="text-red-500 mx-auto" />
          <h1 className="text-xl font-bold text-red-600 mt-2">KYC Rejected</h1>

          <h2 className="text-sm font-semibold text-red-700 mt-2">Reason</h2>
          <p className="text-red-700 text-sm mt-1">
            {agencyData?.data?.rejectReason}
          </p>
        </div>
      </div>

      {/* resubmission form */}
      <form
        onSubmit={formik.handleSubmit}
        key={agencyData ? agencyData.kyc?.id : "initial"}
        className="max-w-5xl mx-auto mt-10 bg-white border rounded-2xl shadow-lg p-10"
        style={{ backgroundColor: "#dbe0f7ff" }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Fix & Resubmit KYC
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">

          {/* TRADE LICENSE NUMBER */}
          <div>
            <label className="font-semibold text-gray-800 mb-2 block">Trade License Number</label>
            <input
              type="text"
              name="tradeLicenseNumber"
              onChange={formik.handleChange}
              value={formik.values.tradeLicenseNumber}
              className="p-3 rounded-xl bg-white shadow-sm border border-gray-300 w-full"
            />

            {formik.touched.tradeLicenseNumber &&
              typeof formik.errors.tradeLicenseNumber === "string" && (
                <p className="text-red-600 text-sm mt-1">
                  {formik.errors.tradeLicenseNumber}
                </p>
              )}
          </div>

          {/* TRADE LICENSE DOCUMENT */}
          <div>
            <label className="font-semibold text-gray-800 mb-2 block">Trade License Document</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                setAgencyKyc({ ...agencyKyc, tradeLicenseDocument: e.target.files?.[0] });
                formik.setFieldValue("tradeLicenseDocument", e.target.files?.[0] || null)
              }}
              onBlur={() => formik.setFieldTouched("tradeLicenseDocument", true)}

              className="w-full p-3 bg-white rounded-xl border shadow-sm"
            />

            {formik.touched.tradeLicenseDocument &&
              typeof formik.errors.tradeLicenseDocument === "string" &&  (
              <p className="text-red-600 text-sm mt-1">{formik.errors.tradeLicenseDocument}</p>
            )}


            {/* PREVIEW HERE 👇 */}
            <FilePreview
              file={formik.values.tradeLicenseDocument || agencyKyc?.tradeLicenseDocument}
              onRemove={() => {

                setAgencyKyc({ ...agencyKyc, tradeLicenseDocument: null });
                formik.setFieldValue("tradeLicenseDocument", null)
              }
              }
            />
          </div>

          {/* PAN NUMBER */}
          <div>
            <label className="font-semibold text-gray-800 mb-2 block">PAN Number</label>
            <input
              type="text"
              name="PANnumber"
              onChange={formik.handleChange}
              value={formik.values.PANnumber}
              className="p-3 rounded-xl bg-white shadow-sm border border-gray-300 w-full"
            />
            {formik.touched.PANnumber &&
              typeof formik.errors.PANnumber === "string" &&  (
              <p className="text-red-600 text-sm mt-1">{formik.errors.PANnumber}</p>
            )}

          </div>
          {/* PAN PHOTO */}
          <div>
            <label className="font-semibold text-gray-800 mb-2 block">PAN Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setAgencyKyc({ ...agencyKyc, PAN_photo: e.target.files?.[0] });
                formik.setFieldValue("PAN_photo", e.target.files?.[0] || null)
              }}
              onBlur={() => formik.setFieldTouched("PAN_photo", true)}

              className="w-full p-3 bg-white rounded-xl border shadow-sm"
            />
            {formik.touched.PAN_photo &&
              typeof formik.errors.PAN_photo === "string" &&  (
              <p className="text-red-600 text-sm mt-1">{formik.errors.PAN_photo}</p>
            )}


            {/* PREVIEW HERE 👇 */}
            <FilePreview
              file={formik.values.PAN_photo || agencyKyc?.PAN_photo}
              onRemove={() => {
                setAgencyKyc({ ...agencyKyc, PAN_photo: null });
                formik.setFieldValue("PAN_photo", null)
              }
              }
            />

          </div>

          {/* GST NUMBER */}
          <div>
            <label className="font-semibold text-gray-800 mb-2 block">GST Number</label>
            <input
              type="text"
              name="gst_number"
              onChange={formik.handleChange}
              value={formik.values.gst_number}
              className="p-3 rounded-xl bg-white shadow-sm border border-gray-300 w-full"
            />
            {formik.touched.gst_number &&
              typeof formik.errors.gst_number === "string" &&  (
              <p className="text-red-600 text-sm mt-1">{formik.errors.gst_number}</p>
            )}

          </div>
          {/* GST CERTIFICATE */}
          <div>
            <label className="font-semibold text-gray-800 mb-2 block">GST Certificate</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                setAgencyKyc({ ...agencyKyc, gst_certificate: e.target.files?.[0] });
                formik.setFieldValue("gst_certificate", e.target.files?.[0] || null)
              }}
              onBlur={() => formik.setFieldTouched("gst_certificate", true)}

              className="w-full p-3 bg-white rounded-xl border shadow-sm"
            />
            {formik.touched.gst_certificate &&
              typeof formik.errors.gst_certificate === "string" &&  (
              <p className="text-red-600 text-sm mt-1">{formik.errors.gst_certificate}</p>
            )}

            {/* /* PREVIEW HERE 👇 */}

            <FilePreview
              file={formik.values.gst_certificate || agencyKyc?.gst_certificate}
              onRemove={() => {
                setAgencyKyc({ ...agencyKyc, gst_certificate: null });
                formik.setFieldValue("gst_certificate", null)
              }}
            />

          </div>
        </div>

        <button
          type="submit"
          className="mt-10 w-full bg-blue-600 text-white p-4 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "loading..." : "Resubmit KYC"}
        </button>
      </form>
    </div>
  );
}
export default KYCRejected;