import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addresses: any[];
  onSelect: (id: string) => void;
  selectedId?: string;
}

const AddressSelectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  addresses,
  onSelect,
  selectedId,
}) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Select Address</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => {
                onSelect(addr._id);
                onClose();
              }}
              className={`border rounded-xl p-4 cursor-pointer transition ${
                selectedId === addr._id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <p className="font-semibold">{addr.label}</p>
              <p className="text-sm text-gray-600">
                {addr.addressLine1}, {addr.city}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            navigate("/add-address");
          }}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg"
        >
          + Add New Address
        </button>

      </div>
    </div>
  );
};

export default AddressSelectModal;
