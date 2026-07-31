import { MapPin, PackageCheck, X } from "lucide-react";

interface AddressModalHeaderProps {
    type: "PICKUP" | "DELIVERY";
    onClose: () => void;
}

const AddressModalHeader = ({
    type,
    onClose,
}: AddressModalHeaderProps) => {
    const isPickup = type === "PICKUP";

    return (
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">

            <div className="flex items-center gap-4">

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${isPickup
                            ? "bg-amber-100 text-amber-600"
                            : "bg-blue-50 text-[#102467]"
                        }`}
                >
                    {isPickup ? (
                        <PackageCheck size={20} />
                    ) : (
                        <MapPin size={20} />
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Select {isPickup ? "Pickup" : "Delivery"} Location
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Choose a saved address or pick one directly on the map.
                    </p>
                </div>

            </div>

            <button
                onClick={onClose}
                className="flex h-13 w-13 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
                <X size={18} />
            </button>

        </div>
    );
};

export default AddressModalHeader;