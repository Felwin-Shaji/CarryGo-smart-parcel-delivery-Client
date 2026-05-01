import { Formik, Form, Field, ErrorMessage } from "formik";
import { Step3Schema } from "../../../../validation/agencyAddHubb";
import type { AddHubPayload } from "../AgencyAddHubs";
import { lazy, Suspense } from "react";
import { INDIA_STATE_CITY_MAP } from "../../../../shared/constants_Types/Indiacities";

const MapLocationPicker = lazy(() =>
    import("../../../../components/Map/MapLocationPicker")
);

interface Step3AddressPayload {
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
    location_lat: number;
    location_lng: number;
}

interface Step3Props {
    formData: AddHubPayload;
    setFormData: (data: AddHubPayload) => void;
    setStep: (n: number) => void;
    showMap: boolean;
    setShowMap: (v: boolean) => void;
    resetFlow: () => void;
}

const Step3Address = ({ formData, setFormData, setStep, showMap, setShowMap, resetFlow }: Step3Props) => {

    const initialValues: Step3AddressPayload = {
        addressLine1: formData.addressLine1,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        location_lat: formData.location_lat,
        location_lng: formData.location_lng,
    };

    const handleSubmit = (values: Step3AddressPayload) => {
        setFormData({
            ...formData,
            ...values,
        });

        setStep(4);
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Step3Schema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, touched, errors }) => {

                const citiesForState: string[] = values.state
                    ? (INDIA_STATE_CITY_MAP[values.state] ?? [])
                    : [];

                return (
                    <Form className="space-y-10">

                        {/* HEADER */}
                        <div>
                            <h2 className="text-3xl font-bold" style={{ color: "var(--color-primary)" }}>
                                Hub Address
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                Provide the complete address and pick the accurate hub location.
                            </p>
                        </div>

                        {/* SECTION 1: ADDRESS */}
                        <div
                            className="rounded-xl p-6 border bg-white"
                            style={{
                                borderColor: "var(--color-secondary)",
                                boxShadow: "var(--shadow-base)",
                                borderRadius: "var(--radius-lg)"
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--color-primary)" }}>
                                Address Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Address Line 1 */}
                                <div>
                                    <label className="text-sm text-gray-700 font-medium">Address Line 1</label>
                                    <Field
                                        name="addressLine1"
                                        placeholder="Building / Street"
                                        className="w-full border px-4 py-2 rounded-md mt-1"
                                    />
                                    <ErrorMessage name="addressLine1" component="p" className="text-red-500 text-sm" />
                                </div>

                                {/* State */}
                                <div>
                                    <label className="text-sm text-gray-700 font-medium">State</label>
                                    <Field
                                        as="select"
                                        name="state"
                                        placeholder="State"
                                        className="w-full border px-4 py-2 rounded-md mt-1"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            const newState = e.target.value;
                                            // Reset city and pincode when state changes
                                            setFieldValue("state", newState);
                                            setFieldValue("city", "");
                                            setFieldValue("pincode", "");
                                            setFormData({ ...formData, state: newState, city: "", pincode: "" });
                                        }}
                                    >
                                        <option value="">Select State</option>
                                        {Object.keys(INDIA_STATE_CITY_MAP).sort().map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="state" component="p" className="text-red-500 text-sm" />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="text-sm text-gray-700 font-medium">City</label>
                                    <Field
                                        as="select"
                                        name="city"
                                        disabled={!values.state}
                                        className="w-full border px-4 py-2 rounded-md mt-1"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            const newCity = e.target.value;
                                            setFieldValue("city", newCity);
                                            setFieldValue("pincode", "");
                                            setFormData({ ...formData, city: newCity, pincode: "" });
                                        }}
                                    >
                                        <option value="">Select City</option>
                                        {citiesForState.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
                                </div>



                                {/* Pincode */}
                                <div>
                                    <label className="text-sm text-gray-700 font-medium">Pincode</label>
                                    <Field
                                        name="pincode"
                                        placeholder="6-digit postal code"
                                        maxLength={6}
                                        className="w-full border px-4 py-2 rounded-md mt-1"
                                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                                        }}
                                    />
                                    <ErrorMessage name="pincode" component="p" className="text-red-500 text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: COORDINATES */}
                        <div
                            className="rounded-xl p-6 border bg-white"
                            style={{
                                borderColor: "var(--color-secondary)",
                                boxShadow: "var(--shadow-base)",
                                borderRadius: "var(--radius-lg)"
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--color-primary)" }}>
                                Coordinates
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Lat */}
                                <div>
                                    <label className="text-sm text-gray-700 font-medium">Latitude</label>
                                    <input
                                        type="number"
                                        step="0.000001"
                                        placeholder="Latitude"
                                        className="w-full border px-4 py-2 rounded-md mt-1"
                                        value={values.location_lat}
                                        onChange={(e) => {
                                            const n = Number(e.target.value);
                                            setFieldValue("location_lat", n);
                                            setFormData({ ...formData, location_lat: n });
                                        }}
                                    />
                                    {touched.location_lat && errors.location_lat && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location_lat}</p>
                                    )}
                                </div>

                                {/* Lng */}
                                <div>
                                    <label className="text-sm text-gray-700 font-medium">Longitude</label>
                                    <input
                                        type="number"
                                        step="0.000001"
                                        placeholder="Longitude"
                                        className="w-full border px-4 py-2 rounded-md mt-1"
                                        value={values.location_lng}
                                        onChange={(e) => {
                                            const n = Number(e.target.value);
                                            setFieldValue("location_lng", n);
                                            setFormData({ ...formData, location_lng: n });
                                        }}
                                    />
                                    {touched.location_lng && errors.location_lng && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location_lng}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: MAP */}
                        <div
                            className="rounded-xl p-6 border bg-white"
                            style={{
                                borderColor: "var(--color-secondary)",
                                boxShadow: "var(--shadow-base)",
                                borderRadius: "var(--radius-lg)"
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--color-primary)" }}>
                                Map Location
                            </h3>

                            {!showMap && (
                                <button
                                    type="button"
                                    onClick={() => setShowMap(true)}
                                    className="px-5 py-2 font-semibold shadow"
                                    style={{
                                        backgroundColor: "var(--color-primary)",
                                        borderRadius: "var(--radius-md)",
                                        boxShadow: "var(--shadow-base)"
                                    }}
                                >
                                    Select From Map
                                </button>
                            )}

                            {showMap && (
                                <div className="space-y-4">

                                    {/* MAP FALLBACK */}
                                    <Suspense
                                        fallback={
                                            <div className="h-[350px] flex items-center justify-center bg-gray-100 rounded-lg">
                                                <span className="text-gray-500">Loading map...</span>
                                            </div>
                                        }
                                    >
                                        <MapLocationPicker
                                            position={
                                                values.location_lat && values.location_lng
                                                    ? [values.location_lat, values.location_lng]
                                                    : null
                                            }
                                            onSelect={(lat, lng) => {
                                                setFieldValue("location_lat", lat);
                                                setFieldValue("location_lng", lng);
                                                setFormData({ ...formData, location_lat: lat, location_lng: lng });
                                            }}
                                        />
                                    </Suspense>

                                    {/* BUTTON ROW */}
                                    <div className="flex gap-4">

                                        {/* HIDE MAP */}
                                        <button
                                            type="button"
                                            onClick={() => setShowMap(false)}
                                            className="px-5 py-2 font-semibold shadow"
                                            style={{
                                                backgroundColor: "var(--color-secondary)",
                                                color: "var(--color-text)",
                                                borderRadius: "var(--radius-md)",
                                                boxShadow: "var(--shadow-base)"
                                            }}
                                        >
                                            Hide Map
                                        </button>

                                        {/* CURRENT LOCATION */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigator.geolocation.getCurrentPosition((pos) => {
                                                    const lat = pos.coords.latitude;
                                                    const lng = pos.coords.longitude;
                                                    setFieldValue("location_lat", lat);
                                                    setFieldValue("location_lng", lng);
                                                    setFormData({ ...formData, location_lat: lat, location_lng: lng });
                                                });
                                            }}
                                            className="px-5 py-2 font-semibold shadow"
                                            style={{
                                                backgroundColor: "var(--color-primary)",
                                                color: "white",
                                                borderRadius: "var(--radius-md)",
                                                boxShadow: "var(--shadow-base)"
                                            }}
                                        >
                                            Use Current Location
                                        </button>

                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FOOTER */}
                        <div className="flex gap-4">

                            {/* BACK */}
                            {/* <button
        type="button"
        onClick={() => setStep(2)}
        className="px-5 py-3 font-semibold"
        style={{
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-text)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-base)"
        }}
    >
        Back
    </button> */}

                            {/* CANCEL */}
                            <button
                                type="button"
                                onClick={resetFlow}
                                className="px-5 py-3 font-semibold"
                                style={{
                                    backgroundColor: "#f3f4f6",
                                    border: "1px solid #ccc",
                                    borderRadius: "var(--radius-md)",
                                    boxShadow: "var(--shadow-base)"
                                }}
                            >
                                Cancel
                            </button>

                            {/* CONTINUE */}
                            <button
                                type="submit"
                                className="flex-1 py-3 font-semibold text-white"
                                style={{
                                    backgroundColor: "var(--color-primary)",
                                    borderRadius: "var(--radius-md)",
                                    boxShadow: "var(--shadow-base)"
                                }}
                            >
                                Continue to Verification
                            </button>

                        </div>

                    </Form>
                )
            }}
        </Formik>



    );
};

export default Step3Address;
