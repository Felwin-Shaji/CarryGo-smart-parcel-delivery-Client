import { useFormik } from "formik";
import { useState } from "react";
import { PincodeValidationSchema } from "../../../../validation/picodeValidation";
import { useBooking } from "../../../../Services/User/Booking/createBooking";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import toast from "react-hot-toast";
import BookingStepNav from "./BookingStepNav";


const BookingPincodeStep = () => {
    const { validatePincode } = useBooking();
    const { state, dispatch } = useBookingContext();

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | "success" | "error">(null);
    const [message, setMessage] = useState("");

    const canGoForward =
        !!state.fromPincode &&
        !!state.toPincode &&
        Array.isArray(state.serviceableOptions) &&
        state.serviceableOptions.length > 0;

    const handleForward = () => {
        if (!canGoForward) return;
        dispatch({ type: "SET_STEP", payload: 2 });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fromPincode: state.fromPincode ?? "",
            toPincode: state.toPincode ?? "",
        },
        validationSchema: PincodeValidationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                setStatus(null);

                const options = await validatePincode(values);

                dispatch({
                    type: "PINCODE_VERIFIED",
                    payload: {
                        fromPincode: values.fromPincode,
                        toPincode: values.toPincode,
                        options,
                    },
                });

                toast.success("Service available between selected locations");
            } catch {
                setStatus("error");
                setMessage("Service not available for these pincodes");
            } finally {
                setLoading(false);
            }
        },
    });

    const isSuccess = status === "success";

    return (
        <>
            <BookingStepNav
                showBack={false}
                showForward={true}
                canGoForward={canGoForward}
                onForward={handleForward}
            />

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

                <div className="mt-6 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            From Pincode
                        </label>
                        <input
                            name="fromPincode"
                            value={formik.values.fromPincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={isSuccess}
                            maxLength={6}
                            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100"
                            placeholder="Enter pickup pincode"
                        />
                        {formik.touched.fromPincode && formik.errors.fromPincode && (
                            <p className="mt-1 text-xs text-red-500">
                                {formik.errors.fromPincode}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            To Pincode
                        </label>
                        <input
                            name="toPincode"
                            value={formik.values.toPincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={isSuccess}
                            maxLength={6}
                            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100"
                            placeholder="Enter delivery pincode"
                        />
                        {formik.touched.toPincode && formik.errors.toPincode && (
                            <p className="mt-1 text-xs text-red-500">
                                {formik.errors.toPincode}
                            </p>
                        )}
                    </div>
                </div>

                {status && (
                    <div
                        className={`mt-4 text-sm font-medium ${status === "success" ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!formik.isValid || loading || isSuccess}
                    className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition
                    ${isSuccess
                            ? "bg-green-600 cursor-default"
                            : formik.isValid
                                ? "bg-black hover:bg-gray-800"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    {loading
                        ? "Verifying..."
                        : isSuccess
                            ? "Verified ✓"
                            : "Verify & Continue"}
                </button>
            </form>
        </>
    );
};

export default BookingPincodeStep;
