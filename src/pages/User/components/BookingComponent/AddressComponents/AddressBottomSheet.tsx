import { useEffect, useState } from "react";
import type { Address } from "../AddressStep";

const AddressBottomSheet = ({
  excludeId,
  onSelect,
  onClose,
}: {
  excludeId?: string;
  onSelect: (address: Address) => void;
  onClose: () => void;
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    setAddresses([
      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },
            {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },      {
        id: "1",
        label: "Home",
        line1: "MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        phone: "9876543210",
      },
      {
        id: "2",
        label: "Office",
        line1: "Infopark",
        city: "Kochi",
        state: "Kerala",
        pincode: "682030",
        phone: "9876500000",
      },
      // repeated mock data is fine for now
    ]);
  }, []);

  const filtered = addresses.filter(
    (a) => a.id !== excludeId
  );

  return (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
    <div className="bg-white w-full rounded-t-3xl p-6 max-h-[85vh] flex flex-col">

      {/* ✅ TOP HEADER ACTIONS */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="text-sm font-semibold underline"
          onClick={() => alert("Add new address")}
        >
          + Add New Address
        </button>

        {/* Close / Cancel Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="
          
            h-9 w-9 flex items-center justify-center
            rounded-full border font-semibold
          "
        >
          ✕
        </button>
      </div>

      {/* Handle (optional visual cue) */}
      <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

      {/* ✅ SCROLLABLE ADDRESS LIST */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {filtered.map((addr, index) => (
          <div
            key={`${addr.id}-${index}`}
            onClick={() => onSelect(addr)}
            className="p-4 border rounded-xl cursor-pointer hover:border-black"
          >
            <p className="font-semibold">{addr.label}</p>
            <p className="text-sm text-gray-600">
              {addr.line1}, {addr.city}
            </p>
          </div>
        ))}
      </div>

    </div>
  </div>
);

};

export default AddressBottomSheet;
