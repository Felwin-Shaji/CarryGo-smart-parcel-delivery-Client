import { Filter, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { BookingFilterParams } from "../../../UserBookingList";
import { useNavigate } from "react-router-dom";


interface AdvancedBookingFilterProps {
  filters: Omit<BookingFilterParams, "page" | "limit">;
  setFilters: React.Dispatch<
    React.SetStateAction<Omit<BookingFilterParams, "page" | "limit">>
  >;
  onApply: () => void;
}

export const AdvancedBookingFilter = ({ filters, setFilters, onApply }: AdvancedBookingFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setFilters(filters);
    }
  }, [isOpen]);

  const clearFilters = () => {
    setFilters({
      deliveryType: "ALL",
      status: "ALL",
      paymentStatus: "ALL",
    });
  };

  return (
    <>
      {/* Filter Button */}
      <div className="max-w-6xl gap-3 mx-auto mt-24 px-4 flex justify-end">
        <button
          onClick={() => navigate("/booking")}
          className="flex items-center gap-3 bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          New Parcel
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">

          {/* Modal Panel */}
          <div className="w-full sm:w-[420px] bg-white h-full shadow-2xl animate-slide-in flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-semibold text-lg">
                Advanced Filters
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              <FilterSection title="Delivery">
                <FilterSelect
                  label="Delivery Type"
                  value={filters.deliveryType}
                  onChange={(value: string) =>
                    setFilters((prev: any) => ({
                      ...prev,
                      deliveryType: value,
                    }))
                  }
                  options={[
                    { label: "All", value: "ALL" },
                    { label: "Agency", value: "AGENCY" },
                    { label: "Traveler", value: "TRAVELER" },
                  ]}
                />
              </FilterSection>

              <FilterSection title="Booking Status">
                <FilterSelect
                  label="Status"
                  value={filters.status}
                  onChange={(value: string) =>
                    setFilters((prev: any) => ({
                      ...prev,
                      status: value,
                    }))
                  }
                  options={[
                    { label: "All", value: "ALL" },
                    { label: "Pending", value: "PENDING" },
                    { label: "Confirmed", value: "CONFIRMED" },
                    { label: "Delivered", value: "DELIVERED" },
                    { label: "Cancelled", value: "CANCELLED" },
                  ]}
                />
              </FilterSection>

              <FilterSection title="Payment">
                <FilterSelect
                  label="Payment Status"
                  value={filters.paymentStatus}
                  onChange={(value: string) =>
                    setFilters((prev: any) => ({
                      ...prev,
                      paymentStatus: value,
                    }))
                  }
                  options={[
                    { label: "All", value: "ALL" },
                    { label: "Pending", value: "PENDING" },
                    { label: "Paid", value: "PAID" },
                    { label: "Failed", value: "FAILED" },
                  ]}
                />
              </FilterSection>

            </div>

            {/* Footer */}
            <div className="p-5 border-t flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 border border-gray-200 rounded-xl py-2 text-sm hover:bg-gray-50 transition"
              >
                Clear All
              </button>

              <button
                onClick={() => { onApply(); setIsOpen(false) }}
                className="flex-1 bg-indigo-600 text-white rounded-xl py-2 text-sm hover:bg-indigo-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


const FilterSection = ({ title, children }: any) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-700 mb-3">
      {title}
    </h3>
    {children}
  </div>
);

const FilterSelect = ({ label, value, onChange, options }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-500">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
