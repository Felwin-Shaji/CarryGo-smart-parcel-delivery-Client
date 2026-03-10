import { Filter, X } from "lucide-react";
import { useState } from "react";
import type { TravelRequestStatus } from "../TravelerTravelRequestList";

interface TravelRequestFilterProps {
  status: TravelRequestStatus | "ALL";
  setStatus: (status: TravelRequestStatus | "ALL") => void;
}

export const TravelRequestFilter = ({
  status,
  setStatus,
}: TravelRequestFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const clearFilters = () => {
    setStatus("ALL");
  };

  return (
    <>
      {/* Filter Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">

          <div className="w-full sm:w-[420px] bg-white h-full shadow-2xl flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-semibold text-lg">
                Travel Filters
              </h2>

              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 flex-1">

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">
                  Travel Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as TravelRequestStatus | "ALL")
                  }
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="ALL">All</option>
                  <option value="DRAFT">Draft</option>
                  <option value="PENDING_APPROVAL">Pending Approval</option>
                  <option value="ACTIVE">Active</option>
                  <option value="PARTIALLY_BOOKED">Partially Booked</option>
                  <option value="FULLY_BOOKED">Fully Booked</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

            </div>

            {/* Footer */}
            <div className="p-5 border-t flex gap-3">

              <button
                onClick={clearFilters}
                className="flex-1 border border-gray-200 rounded-xl py-2 text-sm hover:bg-gray-50"
              >
                Clear
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-indigo-600 text-white rounded-xl py-2 text-sm"
              >
                Apply
              </button>

            </div>
          </div>

        </div>
      )}
    </>
  );
};