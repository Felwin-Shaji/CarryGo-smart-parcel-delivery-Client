import { useState } from "react";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import AgencyCardSelector from "./SelectDeleveryDetailsStep/AgencyDropdown";
import BookingStepNav from "./BookingStepNav";


const CATEGORIES = ["DOCUMENTS", "FRAGILE", "FOOD", "ELECTRONICS", "OTHER"];
const SIZES = ["SMALL", "MEDIUM", "LARGE"];

const SelectDeleveryDetailsStep = () => {
  const { state, dispatch } = useBookingContext();
  if (state.step !== 2) {
    return null;
  }

  const agencies = state.serviceableOptions ?? [];

  const deliveryType = state.deliveryType ?? "AGENCY";
  const [errors, setErrors] = useState<Record<string, string>>({});

  console.log("serviceableOptions:", state.serviceableOptions);
  console.log("isArray:", Array.isArray(state.serviceableOptions));


  const [category, setCategory] = useState<string | null>(null);
  const [size, setSize] = useState<"SMALL" | "MEDIUM" | "LARGE" | null>(null);
  const [weight, setWeight] = useState<number>(1);

  const validateStep = () => {
    const errors: Record<string, string> = {};

    if (!state.fromPincode || !state.toPincode) {
      errors.flow = "Invalid booking flow. Please start again.";
    }

    if (deliveryType === "AGENCY") {
      if (!state.partnerId) {
        errors.agency = "Please select an agency";
      }

      if (!category) errors.category = "Please select a package category";
      if (!size) errors.size = "Please select a package size";
      if (!weight || weight < 1 || weight > 50) {
        errors.weight = "Weight must be between 1 and 50 kg";
      }
    }

    return errors;
  };

  const canGoForward =

    (
      state.deliveryType === "TRAVELER" &&
      !!state.partnerId &&
      !!state.packageDetails?.category &&
      !!state.packageDetails?.size &&
      !!state.packageDetails?.weightKg
    )
    ||
    (
      state.deliveryType === "AGENCY" &&
      !!state.partnerId &&
      !!state.packageDetails?.category &&
      !!state.packageDetails?.size &&
      !!state.packageDetails?.weightKg
    );


  const handleBack = () => {
    dispatch({ type: "SET_STEP", payload: 1 });
  };

  const handleForward = () => {
    if (!canGoForward) return;
    dispatch({ type: "SET_STEP", payload: 3 });
  };

  const errorsMap = validateStep();
  const isValid = Object.keys(errorsMap).length === 0;


  const handleContinue = () => {
    const validationErrors = validateStep();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    if (deliveryType === "AGENCY") {
      dispatch({
        type: "SET_PACKAGE_DETAILS",
        payload: {
          category: category!,
          size: size!,
          weightKg: weight,
        },
      });
    }

    dispatch({ type: "SET_STEP", payload: 3 });
  };

  return (
    <>
      <BookingStepNav
        canGoForward={canGoForward}
        onBack={handleBack}
        onForward={handleForward}
      />

      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-6">

          {/* Delivery Type */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Select Delivery Type</h2>

            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => dispatch({ type: "SET_DELIVERY_TYPE", payload: "AGENCY" })}
                className={`cursor-pointer rounded-lg border px-4 py-4 text-sm transition
                ${deliveryType === "AGENCY"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 bg-white"}
                `}>
                <p className="font-medium">Agency Delivery</p>
                <p className="text-xs text-gray-500 mt-1">
                  Fast & reliable courier service
                </p>
              </div>

              <div
                onClick={() => dispatch({ type: "SET_DELIVERY_TYPE", payload: "TRAVELER" })}
                className={`cursor-pointer rounded-lg border px-4 py-4 text-sm transition
                ${deliveryType === "TRAVELER"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 bg-white"}
                  `}>
                <p className="font-medium">User as Delivery Agent</p>
                <p className="text-xs text-gray-500 mt-1">
                  Flexible, community-based delivery
                </p>
              </div>
            </div>
          </section>


          {/* Agency Dropdown */}
          {deliveryType === "AGENCY" && (
            <>
              <AgencyCardSelector
                agencies={agencies}
                selectedAgencyId={state.partnerId}
                onSelect={(option) =>
                  dispatch({
                    type: "SELECT_AGENCY",
                    payload: {
                      agencyId: option.agency.agencyId,
                      fromHubId: option.fromHub.hubId,
                      toHubId: option.toHub.hubId,
                    },
                  })
                }
              />
              {errors.agency && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.agency}
                </p>
              )}
            </>

          )}

          {deliveryType === "AGENCY" && agencies.length === 0 && (
            <div className="border border-dashed rounded-xl p-6 text-center">
              <p className="text-sm font-medium text-gray-900">
                Service not available
              </p>
              <p className="text-xs text-gray-500 mt-1">
                We currently don’t have any delivery partners for these locations.
              </p>

              <p className="text-xs text-gray-400 mt-3">
                Try changing pickup or delivery address.
              </p>
            </div>
          )}

        </section>


        {/* Package Details */}
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Package details</h3>
            <p className="text-sm text-gray-500">
              Required for pricing & routing
            </p>
          </div>

          {/* Category */}
          <div>
            <p className="text-sm font-medium mb-2">Category</p>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                <>
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 rounded-full text-sm border
                    ${category === c
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {c}
                  </button>
                  {errors.category && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.category}
                    </p>
                  )}

                </>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="text-sm font-medium mb-2">Size</p>
            <div className="flex gap-3">
              {SIZES.map((s) => (
                <>
                  <button
                    key={s}
                    onClick={() => setSize(s as "SMALL" | "MEDIUM" | "LARGE")}
                    className={`px-6 py-2 rounded-full text-sm border
                    ${size === s
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {s}
                  </button>
                  {errors.size && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.size}
                    </p>
                  )}

                </>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Weight
            </label>

            <div className="flex items-center transition">
              <input
                type="number"
                min={1}
                max={50}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                placeholder="Enter weight"
                className="flex-1 text-sm outline-none bg-transparent"
              />
              <span className="text-sm text-gray-500 ml-2">kg</span>
            </div>
            {errors.weight && (
              <p className="mt-1 text-xs text-red-500">
                {errors.weight}
              </p>
            )}

            <p className="text-xs text-gray-500 mt-1">
              Maximum allowed weight is 50 kg
            </p>
          </div>



        </section>

        {/* Continue */}
        <button
          disabled={!isValid}
          onClick={handleContinue}
          className={`w-full py-4 rounded-xl font-semibold transition
          ${isValid
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default SelectDeleveryDetailsStep;
