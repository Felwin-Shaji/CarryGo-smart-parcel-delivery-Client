import { Box, Pencil } from "lucide-react";
import { useBookingContext } from "../../../../../context/Booking/BookingContext";

export default function PackageDetailsCard() {
  const { state, dispatch } = useBookingContext();

  const pkg = state.packageDetails;

  const handleEdit = () => {
    dispatch({ type: "SET_STEP", payload: 3 });
  };

  const dimensions =
    pkg?.dimensions
      ? `${pkg.dimensions.lengthCm} × ${pkg.dimensions.widthCm} × ${pkg.dimensions.heightCm} cm`
      : "-";

  return (
    <div className="bg-white border rounded-xl p-5">

      {/* HEADER */}
      <div className="flex justify-between mb-4">

        <div className="flex items-center gap-2 text-sm font-semibold">
          <Box size={16} />
          PACKAGE DETAILS
        </div>

        <button
          onClick={handleEdit}
          className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-800"
        >
          <Pencil size={14} /> Edit
        </button>

      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-4 text-sm gap-4">

        <div>
          <p className="text-xs text-gray-400">Category</p>
          <p className="font-medium">{pkg?.category ?? "-"}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Weight</p>
          <p className="font-medium">
            {pkg?.weightKg ? `${pkg.weightKg} kg` : "-"}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Dimensions</p>
          <p className="font-medium">{dimensions}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Vol. Weight</p>
          <p className="font-medium">
            {pkg?.volumetricWeightKg
              ? `${pkg.volumetricWeightKg} kg`
              : "-"}
          </p>
        </div>

      </div>

      {/* FRAGILE WARNING */}
      {pkg?.fragile && (
        <p className="text-xs text-red-500 mt-3">
          Fragile — requires careful handling
        </p>
      )}

    </div>
  );
}