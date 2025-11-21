import { useState } from "react";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { MapPin, Upload, Building2 } from "lucide-react";
import toast from "react-hot-toast";
import { lazy, Suspense } from "react";
import { useFormik } from "formik";
import { addhubSchema } from "../../validation/agencyAddHub";
import { ROLES } from "../../constants_Types/types/roles";
import { useAgency } from "../../Services/Agency";
import { useNavigate } from "react-router-dom";

const MapLocationPicker = lazy(() =>
    import("../../components/Map/MapLocationPicker")
);

export interface AddHubPayload {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    location_lat: number;
    location_lng: number;
    verificationImage: File | null;
}

const initialForm: AddHubPayload = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    location_lat: 0,
    location_lng: 0,
    verificationImage: null as File | null,
};

const AgencyAddHubs = () => {
    const navigate = useNavigate()
    const { addNewHub } = useAgency()

    const [showMap, setShowMap] = useState(false);
    const [preview, setPreview] = useState("")

    const formik = useFormik({
        initialValues: initialForm,
        validationSchema: addhubSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();

                (Object.keys(values) as (keyof AddHubPayload)[]).forEach((key) => {
                    const value = values[key];

                    if (key === "verificationImage") {
                        if (value instanceof File) {
                            formData.append("verificationImage", value);
                        }
                    } else {
                        formData.append(key, String(value));
                    }
                });

                addNewHub(values);
                resetForm();
                navigate('/agency/hubs')
            } catch {
                toast.error("Hub creation failed");
            }
        }
    })


    return (
        <DashboardProvider role={ROLES.AGENCY}>
            <DashboardLayout
                pageTitle={
                    <div className="flex items-center gap-3">
                        <Building2 size={26} className="text-white/80" />
                        <span className="text-[22px] font-semibold text-white tracking-wide">
                            Add New Hub
                        </span>
                    </div>
                }
            >
                {/* FORM CONTAINER */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <form onSubmit={formik.handleSubmit} className="space-y-8">

                        {/* SECTION 1: HUB INFO */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Hub Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Hub Name</label>
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter hub name"
                                            className="w-full border rounded-lg px-3 py-2"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.name && formik.errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                                        )}
                                    </div>

                                </div>

                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Pincode</label>
                                    <div className="flex flex-col">

                                        <input
                                            type="text"
                                            name="pincode"
                                            className="w-full border rounded-lg px-3 py-2"
                                            maxLength={6}
                                            pattern="[0-9]{6}"
                                            value={formik.values.pincode}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.pincode && formik.errors.pincode && (
                                            <p className="text-red-500 text-sm mt-1">{formik.errors.pincode}</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: ADDRESS */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Address Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col">

                                    <input
                                        type="text"
                                        name="addressLine1"
                                        placeholder="Address Line 1"
                                        className="w-full border rounded-lg px-3 py-2"
                                        value={formik.values.addressLine1}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.addressLine1 && formik.errors.addressLine1 && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.addressLine1}</p>
                                    )}
                                </div>

                                {/* 
                                <input
                                    type="text"
                                    name="addressLine2"
                                    placeholder="Address Line 2"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={formik.values.addressLine2}
                                    onChange={formik.handleChange}
                                /> */}
                                <div className="flex flex-col">

                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        className="w-full border rounded-lg px-3 py-2"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.city && formik.errors.city && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
                                    )}
                                </div>

                                <div className="flex flex-col">

                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        className="w-full border rounded-lg px-3 py-2"
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.state && formik.errors.state && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* SECTION 3: HUB LOCATION */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin size={18} /> Hub Location
                            </h3>

                            {/* LAT + LNG FIELDS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">

                                    <input
                                        type="number"
                                        step="0.000001"
                                        name="location_lat"
                                        placeholder="Latitude"
                                        className="w-full border rounded-lg px-3 py-2"
                                        value={formik.values.location_lat}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.location_lat && formik.errors.location_lat && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.location_lat}</p>
                                    )}
                                </div>

                                <div className="flex flex-col">

                                    <input
                                        type="number"
                                        step="0.000001"
                                        name="location_lng"
                                        placeholder="Longitude"
                                        className="w-full border rounded-lg px-3 py-2"
                                        value={formik.values.location_lng}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.location_lng && formik.errors.location_lng && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.location_lng}</p>
                                    )}
                                </div>

                            </div>

                            {/* SHOW MAP BUTTON */}
                            {!showMap && (
                                <button
                                    type="button"
                                    onClick={() => setShowMap(true)}
                                    className="mt-3 bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md"
                                >
                                    Select From Map
                                </button>
                            )}

                            {/* MAP SECTION */}
                            {showMap && (
                                <div className="mt-4">
                                    <Suspense
                                        fallback={
                                            <div className="h-[350px] flex items-center justify-center bg-gray-100 rounded-lg">
                                                <span className="text-gray-500">Loading map...</span>
                                            </div>
                                        }
                                    >
                                        <MapLocationPicker
                                            position={
                                                formik.values.location_lat && formik.values.location_lng
                                                    ? [formik.values.location_lat, formik.values.location_lng]
                                                    : null

                                            }
                                            onSelect={(lat, lng) =>
                                                formik.setValues({
                                                    ...formik.values,
                                                    location_lat: lat,
                                                    location_lng: lng,
                                                })
                                            }
                                        />
                                    </Suspense>

                                    <button
                                        type="button"
                                        onClick={() => setShowMap(false)}
                                        className="mt-3 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                                    >
                                        Hide Map
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigator.geolocation.getCurrentPosition((pos) => {
                                                const lat = pos.coords.latitude;
                                                const lng = pos.coords.longitude;
                                                formik.setFieldValue("location_lat", lat);
                                                formik.setFieldValue("location_lng", lng);
                                            });
                                        }}
                                        className="mt-3 ml-3 bg-purple-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Use Current Location
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* SECTION 4: VERIFICATION IMAGE */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Verification
                            </h3>

                            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 bg-gray-50">
                                <Upload className="text-purple-700" size={22} />
                                <div className="flex flex-col">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            formik.setFieldValue("verificationImage", file);

                                            if (file) {
                                                const url = URL.createObjectURL(file);
                                                setPreview(url);
                                            }
                                        }}
                                    />
                                    {formik.touched.verificationImage && formik.errors.verificationImage && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.verificationImage}</p>
                                    )}
                                </div>

                            </div>
                            {preview && (
                                <div className="relative inline-block mt-4">

                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-40 h-40 object-cover rounded-xl border shadow-md"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => {
                                            formik.setFieldValue("verificationImage", null);
                                            setPreview("");
                                        }}
                                        className="absolute -top-2 -right-2 rounded-full shadow-md w-7 h-7 flex items-center justify-center hover:bg-black-600 hover:text-white transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* SUBMIT */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="bg-purple-700 hover:bg-purple-900 text-white px-6 py-2 rounded-lg shadow-md"
                            >
                                {formik.isSubmitting ? "Saving..." : "Save Hub"}
                            </button>
                        </div>

                    </form>
                </div>
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default AgencyAddHubs;
