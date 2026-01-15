import { FiHome, FiBriefcase, FiMapPin } from "react-icons/fi";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { confirmToast } from "../../../../components/globelcomponents/confirmToast";
import { Header } from "../Header";

export interface AddressItem {
  _id: string;
  label: "Home" | "Office" | "Warehouse" | "Other";
  formattedAddress: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface Props {
  addresses: AddressItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect?: (id: string) => void;
}

const labelIcon = {
  Home: <FiHome />,
  Office: <FiBriefcase />,
  Warehouse: <FiMapPin />,
  Other: <FiMapPin />,
};

export default function AddressList({
  addresses,
  onEdit,
  onDelete,
  onSelect,
}: Props) {
  if (!addresses.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No addresses saved yet
      </div>
    );
  }

  return (
    <>
    <Header isLoggedIn={true} />
    <div className="space-y-4">
      {addresses.map((address) => (
          <div
          key={address._id}
          onClick={() => onSelect?.(address._id)}
          className="group cursor-pointer rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition"
          >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-sm font-semibold">
              {labelIcon[address.label]}
              {address.label}
            </div>

            {address.isDefault && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                Default
              </span>
            )}
          </div>

          {/* Address */}
          <p className="mt-2 text-sm text-gray-700">
            {address.formattedAddress}
          </p>

          <p className="text-xs text-gray-500">
            {address.city}, {address.state} – {address.pincode}
          </p>

          {/* Actions */}
          <div className="mt-3 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={(e) => {
                  e.stopPropagation();
                  onEdit(address._id);
                }}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
              <MdEdit /> Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                confirmToast("Delete this address?", () =>
                  onDelete(address._id)
            );
              }}
              className="flex items-center gap-1 text-sm text-red-600 hover:underline"
            >
              <MdDeleteOutline /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
      </>
  );
}
