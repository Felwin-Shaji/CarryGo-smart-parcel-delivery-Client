import { useEffect, useState } from "react";
import { useBooking } from "../../../../Services/User/Booking/createBooking";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import type { getServiceableHubWithAgencyResponseDTO } from "../../../../constants_Types/types/User/Booking/bookingResponse.dto";
import AgencyCardSelector from "./SelectDeleveryDetailsStep/AgencyDropdown";

interface Props {
  onSuccess: () => void;
}

const CATEGORIES = ["DOCUMENTS", "FRAGILE", "FOOD", "ELECTRONICS", "OTHER"];
const SIZES = ["SMALL", "MEDIUM", "LARGE"];

const SelectDeleveryDetailsStep = ({ onSuccess }: Props) => {
  const { getServiceableAgencies } = useBooking();
  const { state, dispatch } = useBookingContext();

  const [deliveryType, setDeliveryType] = useState<"AGENCY" | "TRAVELER">("AGENCY");
  const [agencies, setAgencies] = useState<getServiceableHubWithAgencyResponseDTO[]>([]);
  const [selectedAgencyIndex, setSelectedAgencyIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);



  const [category, setCategory] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [weight, setWeight] = useState<number>(1);

  const validateStep = () => {
    const errors: Record<string, string> = {};

    // Step order guard
    if (!state.fromPincode || !state.toPincode) {
      errors.flow = "Invalid booking flow. Please start again.";
    }

    if (deliveryType === "AGENCY") {
      if (selectedAgencyIndex === null) {
        errors.agency = "Please select an agency";
      }

      if (!category) {
        errors.category = "Please select a package category";
      }

      if (!size) {
        errors.size = "Please select a package size";
      }

      if (!weight || weight < 1 || weight > 50) {
        errors.weight = "Weight must be between 1 and 50 kg";
      }
    }

    return errors;
  };

  const errorsMap = validateStep();
  const isValid = Object.keys(errorsMap).length === 0;


  /* Fetch agencies */
  useEffect(() => {
    if (!state.fromPincode || !state.toPincode) return;

    setLoading(true);

    getServiceableAgencies(state.fromPincode, state.toPincode)
      .then(setAgencies)
      .finally(() => setLoading(false));
  }, [state.fromPincode, state.toPincode]);

  useEffect(() => {
    if (deliveryType === "TRAVELER") {
      setSelectedAgencyIndex(null);
    }
  }, [deliveryType]);


  const handleContinue = () => {
    const validationErrors = validateStep();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    dispatch({ type: "SET_DELIVERY_TYPE", payload: deliveryType });
    dispatch({
      type: "SET_PARTNER",
      payload: agencies[selectedAgencyIndex!],
    });
    dispatch({
      type: "SET_PACKAGE_DETAILS",
      payload: {
        category,
        size,
        weightKg: weight,
      },
    });

    onSuccess();
  };



  return (

    <div className="max-w-5xl mx-auto px-6 space-y-10">
      <section className="bg-white rounded-xl p-6 shadow-sm space-y-6">

        {/* Delivery Type */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Select Delivery Type</h2>

          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setDeliveryType("AGENCY")}
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
              onClick={() => setDeliveryType("TRAVELER")}
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
              selectedIndex={selectedAgencyIndex}
              onSelect={setSelectedAgencyIndex}
            />
            {errors.agency && (
              <p className="mt-2 text-xs text-red-500">
                {errors.agency}
              </p>
            )}
          </>

        )}

        {!loading && deliveryType === "AGENCY" && agencies.length === 0 && (
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
                  onClick={() => setSize(s)}
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
  );
};

export default SelectDeleveryDetailsStep;
