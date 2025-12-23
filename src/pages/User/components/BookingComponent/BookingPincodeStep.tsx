import { useFormik } from "formik";
import { useState } from "react";
import { PincodeValidationSchema } from "../../../../validation/picodeValidation";
import { useBooking } from "../../../../Services/User/Booking/createBooking";


const BookingPincodeStep = ({ onSuccess }: { onSuccess: () => void }) => {
    const { isPincodeValied } = useBooking()
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | "success" | "error">(null);
    const [message, setMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            fromPincode: "",
            toPincode: "",
        },
        validationSchema: PincodeValidationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                setStatus(null);

                await isPincodeValied(values)

                setStatus("success");
                setMessage("Service available between selected locations");
                onSuccess();
            } catch (err) {
                setStatus("error");
                setMessage("Service not available for these pincodes");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg p-8 mt-20"
        >
            <h2 className="text-2xl font-bold text-gray-800">
                Create Booking
            </h2>
            <p className="text-sm text-gray-500 mt-1">
                Verify pickup and delivery locations
            </p>

            {/* Inputs */}
            <div className="mt-6 space-y-5">
                {/* From Pincode */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        From Pincode
                    </label>
                    <input
                        name="fromPincode"
                        value={formik.values.fromPincode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength={6}
                        className="mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                        placeholder="Enter pickup pincode"
                    />
                    {formik.touched.fromPincode && formik.errors.fromPincode && (
                        <p className="mt-1 text-xs text-red-500">
                            {formik.errors.fromPincode}
                        </p>
                    )}
                </div>

                {/* To Pincode */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        To Pincode
                    </label>
                    <input
                        name="toPincode"
                        value={formik.values.toPincode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength={6}
                        className="mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none"
                        placeholder="Enter delivery pincode"
                    />
                    {formik.touched.toPincode && formik.errors.toPincode && (
                        <p className="mt-1 text-xs text-red-500">
                            {formik.errors.toPincode}
                        </p>
                    )}
                </div>
            </div>

            {/* Status */}
            {status && (
                <div
                    className={`mt-4 text-sm font-medium ${status === "success" ? "text-green-600" : "text-red-500"
                        }`}
                >
                    {message}
                </div>
            )}

            {/* CTA */}
            <button
                type="submit"
                disabled={!formik.isValid || loading}
                className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition
          ${formik.isValid
                        ? "bg-black hover:bg-gray-800"
                        : "bg-gray-300 cursor-not-allowed"
                    }
        `}
            >
                {loading ? "Verifying..." : "Verify & Continue"}
            </button>
        </form>
    );
};

export default BookingPincodeStep;
