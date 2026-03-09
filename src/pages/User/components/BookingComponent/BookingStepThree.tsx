import { useState } from "react";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import type { PackagePayload } from "../../../../context/Booking/Booking.types";
import BookingLayout from "./BookingStepsComponents/BookingLayout";
import BookingOverview from "./BookingStepsComponents/BookingOverview";
import BookingNavigation from "./BookingStepsComponents/BookingNavigation";
import { Package, Ruler, Weight } from "lucide-react";

export default function BookingStepThree() {
    const { state, dispatch } = useBookingContext();

    const [category, setCategory] = useState(state.packageDetails?.category ?? "");
    const [weightKg, setWeightKg] = useState(state.packageDetails?.weightKg ?? 0);
    const [lengthCm, setLengthCm] = useState(state.packageDetails?.dimensions?.lengthCm ?? 0);
    const [widthCm, setWidthCm] = useState(state.packageDetails?.dimensions?.widthCm ?? 0);
    const [heightCm, setHeightCm] = useState(state.packageDetails?.dimensions?.heightCm ?? 0);
    const [fragile, setFragile] = useState(state.packageDetails?.fragile ?? false);

    const [errors, setErrors] = useState<{ category?: string; weightKg?: string; dimensions?: string; }>({});

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!category) {
            newErrors.category = "Please select a package category.";
        }

        if (!weightKg || weightKg <= 0) {
            newErrors.weightKg = "Please enter a valid weight.";
        }

        if (lengthCm <= 0 || widthCm <= 0 || heightCm <= 0) {
            newErrors.dimensions = "Please enter valid dimensions.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleBack = () => {
        dispatch({ type: "SET_STEP", payload: 2 });
    };

    const handleContinue = async () => {
        const isValid = validateForm();

        if (!isValid) return;

        const payload: PackagePayload = {
            category,
            weightKg,
            dimensions: {
                lengthCm,
                widthCm,
                heightCm,
            },
            fragile,
            volumetricWeightKg: calculateVolumetricWeight(),
        };

        dispatch({
            type: "SET_PACKAGE_DETAILS",
            payload,
        }); 

        dispatch({ type: "SET_STEP", payload: 4 });
    };


    const calculateVolumetricWeight = () => {
        const volumetric = (lengthCm * widthCm * heightCm) / 5000;
        return Number(volumetric.toFixed(2));
    };

    return (
        <BookingLayout
          step={3}
  title="Package Details"
  description="Tell us about your package."
            left={
                <div className="space-y-6">

                    {/* CATEGORY */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">

                        <div className="flex items-center gap-2 text-primary font-semibold">
                            <Package size={18} />
                            <span>PACKAGE CATEGORY</span>
                        </div>

                        <p className="text-sm text-gray-500">
                            What are you sending?
                        </p>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">Select a category</option>
                            <option value="DOCUMENTS">Documents</option>
                            <option value="ELECTRONICS">Electronics</option>
                            <option value="CLOTHING">Clothing</option>
                            <option value="FOOD">Food Items</option>
                            <option value="OTHER">Other</option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-xs">{errors.category}</p>
                        )}

                    </div>

                    {/* WEIGHT */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">

                        <div className="flex items-center gap-2 text-primary font-semibold">
                            <Weight size={18} />
                            <span>WEIGHT</span>
                        </div>

                        <p className="text-sm text-gray-500">
                            Package weight (kg)
                        </p>

                        <input
                            type="number"
                            placeholder="e.g. 2.5"
                            value={weightKg}
                            onChange={(e) => setWeightKg(Number(e.target.value))}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.weightKg && (
                            <p className="text-red-500 text-xs">{errors.weightKg}</p>
                        )}

                    </div>

                    {/* DIMENSIONS */}

                    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">

                        <div className="flex items-center gap-2 text-primary font-semibold">
                            <Ruler size={18} />
                            <span>DIMENSIONS</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4">

                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Length (cm)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 30"
                                    value={lengthCm}
                                    onChange={(e) => setLengthCm(Number(e.target.value))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Width (cm)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 20"
                                    value={widthCm}
                                    onChange={(e) => setWidthCm(Number(e.target.value))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Height (cm)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 15"
                                    value={heightCm}
                                    onChange={(e) => setHeightCm(Number(e.target.value))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                                />
                            </div>

                        </div>

                        <p className="text-xs text-gray-500">
                            Volumetric Weight: {calculateVolumetricWeight()} kg
                        </p>

                        {errors.dimensions && (
                            <p className="text-red-500 text-xs">{errors.dimensions}</p>
                        )}

                    </div>

                    {/* FRAGILE */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center">

                        <div>
                            <h3 className="font-semibold text-gray-800">
                                Fragile Package
                            </h3>

                            <p className="text-sm text-gray-500">
                                Enable if this package requires careful handling
                            </p>
                        </div>

                        <button
                            onClick={() => setFragile(!fragile)}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition 
                            ${fragile ? "bg-blue-600" : "bg-gray-300"}`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow transform transition
                                ${fragile ? "translate-x-6" : ""}`}
                            />
                        </button>

                    </div>
                </div>
            }

            right={
                <BookingOverview
                    pickup={state.pickupAddress?.formattedAddress}
                    delivery={state.deliveryAddress?.formattedAddress}
                    partnerSelected={true}
                >
                    <BookingNavigation
                        onBack={handleBack}
                        onReset={() => dispatch({ type: "RESET_BOOKING" })}
                        onContinue={handleContinue}
                    />
                </BookingOverview>
            }
        />
    );
}