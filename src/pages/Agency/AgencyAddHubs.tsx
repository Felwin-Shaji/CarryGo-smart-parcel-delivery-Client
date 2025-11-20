import { useState } from "react";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { MapPin, Upload, Building2 } from "lucide-react";
import toast from "react-hot-toast";
import { ROLES } from "../../constants/types/roles";

const initialForm = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    location_lat: "",
    location_lng: "",
    verificationImage: null as File | null,
};

const AgencyAddHubs = () => {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm((prev) => ({ ...prev, verificationImage: file }));
    };

    const submitHub = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (value !== null) formData.append(key, value as any);
            });

            toast.success("Hub created successfully!");
            setForm(initialForm);
        } catch {
            toast.error("Hub creation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardProvider role={ROLES.AGENCY}>
            <DashboardLayout
                pageTitle={
                    <div className="flex items-center gap-3">
                        <Building2 size={26} className="text-graw-300" />
                        <span className="text-[22px] font-semibold text-white tracking-wide">
                            Add New Hub
                        </span>
                    </div>
                }>

                <div>
                    <form onSubmit={submitHub} className="space-y-6">

                        {/* Hub Basic Info */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Hub Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter hub name"
                                className="w-full border rounded-lg px-3 py-2"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Address Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Address Line 1</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    placeholder="Street / Building"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={form.addressLine1}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Address Line 2</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    placeholder="Area / Landmark"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={form.addressLine2}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={form.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={form.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Pincode */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                className="w-full border rounded-lg px-3 py-2"
                                maxLength={6}
                                pattern="[0-9]{6}"
                                value={form.pincode}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Location Coordinates */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 flex items-center gap-2">
                                <MapPin size={18} /> Hub Location
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <input
                                    type="number"
                                    step="0.000001"
                                    name="location_lat"
                                    placeholder="Latitude"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={form.location_lat}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="number"
                                    step="0.000001"
                                    name="location_lng"
                                    placeholder="Longitude"
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={form.location_lng}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Verification Image */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Verification Image</label>
                            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 bg-gray-50">
                                <Upload className="text-purple-700" size={22} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-purple-700 hover:bg-purple-900 text-white px-6 py-2 rounded-lg shadow-md"
                            >
                                {loading ? "Saving..." : "Save Hub"}
                            </button>
                        </div>

                    </form>
                </div>
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default AgencyAddHubs;
