import { lazy, Suspense, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { INDIA_STATE_CITY_MAP } from "../../../../shared/constants_Types/Indiacities";
import { Step3Schema } from "../../../../validation/agencyAddHubb";
import type { HubResubmitPayload } from "../AgencyHubResubmit";

const MapLocationPicker = lazy(() => import("../../../../shared/components/Map/MapLocationPicker"));

interface ResubmitAddressFormProps {
    formData: HubResubmitPayload;
    onSubmit: (values: Partial<HubResubmitPayload>) => void;
    onCancel: () => void;
}

export default function ResubmitAddressForm({ formData, onSubmit, onCancel }: ResubmitAddressFormProps) {
    const [showMap, setShowMap] = useState(false);

    return (
        <Formik
            initialValues={{
                addressLine1: formData.addressLine1,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                location_lat: formData.location_lat,
                location_lng: formData.location_lng,
            }}
            validationSchema={Step3Schema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ values, setFieldValue, touched, errors }) => {
                const citiesForState: string[] = values.state
                    ? (INDIA_STATE_CITY_MAP[values.state] ?? [])
                    : [];

                return (
                    <Form className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
                                Update Hub Location
                            </h2>
                            <p className="text-gray-500 text-xs mt-0.5">
                                Review details below and correct entries rejected by administrative staff.
                            </p>
                        </div>

                        {/* Address Container */}
                        <div className="p-6 border bg-white" style={{ borderColor: "var(--color-secondary)", boxShadow: "var(--shadow-base)", borderRadius: "var(--radius-lg)" }}>
                            <h3 className="text-base font-semibold mb-4" style={{ color: "var(--color-primary)" }}>Address Fields</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs text-gray-700 font-medium">Address Line 1</label>
                                    <Field name="addressLine1" placeholder="Building / Street" className="w-full border px-4 py-2 text-sm rounded-md mt-1 focus:outline-indigo-500" />
                                    <ErrorMessage name="addressLine1" component="p" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-700 font-medium">State</label>
                                    <Field as="select" name="state" className="w-full border px-4 py-2 text-sm rounded-md mt-1 bg-white focus:outline-indigo-500"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            const newState = e.target.value;
                                            setFieldValue("state", newState);
                                            setFieldValue("city", "");
                                            setFieldValue("pincode", "");
                                        }}
                                    >
                                        <option value="">Select State</option>
                                        {Object.keys(INDIA_STATE_CITY_MAP).sort().map((st) => (
                                            <option key={st} value={st}>{st}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="state" component="p" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-700 font-medium">City</label>
                                    <Field as="select" name="city" disabled={!values.state} className="w-full border px-4 py-2 text-sm rounded-md mt-1 bg-white focus:outline-indigo-500 disabled:bg-gray-50">
                                        <option value="">Select City</option>
                                        {citiesForState.map((ct) => (
                                            <option key={ct} value={ct}>{ct}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="city" component="p" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-700 font-medium">Pincode</label>
                                    <Field name="pincode" placeholder="6-digit postal code" maxLength={6} className="w-full border px-4 py-2 text-sm rounded-md mt-1 focus:outline-indigo-500"
                                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                                        }}
                                    />
                                    <ErrorMessage name="pincode" component="p" className="text-red-500 text-xs mt-1" />
                                </div>
                            </div>
                        </div>

                        {/* Coordinates Container */}
                        <div className="p-6 border bg-white" style={{ borderColor: "var(--color-secondary)", boxShadow: "var(--shadow-base)", borderRadius: "var(--radius-lg)" }}>
                            <h3 className="text-base font-semibold mb-3" style={{ color: "var(--color-primary)" }}>Geographical Coordinates</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs text-gray-700 font-medium">Latitude</label>
                                    <input type="number" step="0.000001" className="w-full border px-4 py-2 text-sm rounded-md mt-1 focus:outline-indigo-500" value={values.location_lat} onChange={(e) => setFieldValue("location_lat", Number(e.target.value))} />
                                    {touched.location_lat && errors.location_lat && <p className="text-red-500 text-xs mt-1">{errors.location_lat}</p>}
                                </div>
                                <div>
                                    <label className="text-xs text-gray-700 font-medium">Longitude</label>
                                    <input type="number" step="0.000001" className="w-full border px-4 py-2 text-sm rounded-md mt-1 focus:outline-indigo-500" value={values.location_lng} onChange={(e) => setFieldValue("location_lng", Number(e.target.value))} />
                                    {touched.location_lng && errors.location_lng && <p className="text-red-500 text-xs mt-1">{errors.location_lng}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Map Picker Container */}
                        <div className="p-6 border bg-white" style={{ borderColor: "var(--color-secondary)", boxShadow: "var(--shadow-base)", borderRadius: "var(--radius-lg)" }}>
                            <h3 className="text-base font-semibold mb-3" style={{ color: "var(--color-primary)" }}>Map Reference Pick</h3>
                            {!showMap ? (
                                <button type="button" onClick={() => setShowMap(true)} className="px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "var(--color-primary)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-base)" }}>
                                    Open Map Dynamic Picker
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <Suspense fallback={<div className="h-[300px] flex items-center justify-center bg-gray-50 border border-dashed rounded-lg"><span className="text-gray-400 text-sm">Loading map canvas...</span></div>}>
                                        <MapLocationPicker position={values.location_lat && values.location_lng ? [values.location_lat, values.location_lng] : null} onSelect={(lat, lng) => {
                                            setFieldValue("location_lat", lat);
                                            setFieldValue("location_lng", lng);
                                        }} />
                                    </Suspense>
                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setShowMap(false)} className="px-4 py-1.5 text-xs font-semibold border text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Hide Map</button>
                                        <button type="button" onClick={() => {
                                            navigator.geolocation.getCurrentPosition((pos) => {
                                                setFieldValue("location_lat", pos.coords.latitude);
                                                setFieldValue("location_lng", pos.coords.longitude);
                                            });
                                        }} className="px-4 py-1.5 text-xs font-semibold text-white rounded-md hover:opacity-95" style={{ backgroundColor: "var(--color-primary)" }}>
                                            Use Live Device GPS
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-semibold border border-gray-300 rounded-md bg-white hover:bg-gray-50">Cancel Flow</button>
                            <button type="submit" className="px-6 py-2.5 text-sm font-semibold text-white rounded-md hover:opacity-95" style={{ backgroundColor: "var(--color-primary)" }}>
                                Continue to Verification
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}