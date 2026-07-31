import { CheckCircle2, MapPin } from "lucide-react";
import type { AddressUI } from "../../../../../../../context/Booking/Booking.types";

type Props = {
    savedAddresses: AddressUI[];
    selectedAddress: AddressUI | null;
    setSelectedAddress: (address: AddressUI) => void;
};

const SavedAddressMode = ({
    savedAddresses,
    selectedAddress,
    setSelectedAddress,
}: Props) => {
    return (
        <div className="space-y-4">

            {savedAddresses.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-20">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#102467]/10">
                        <MapPin className="h-6 w-6 text-[#102467]" />
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                        No Saved Addresses
                    </h3>

                    <p className="mt-2 max-w-sm text-center text-sm leading-6 text-slate-500">
                        Save an address from the map to quickly use it for future
                        bookings.
                    </p>

                </div>
            )}

            {savedAddresses.map((addr, index) => {
                const selected = selectedAddress === addr;

                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedAddress(addr)}
                        style={{
                            all: "unset",
                            display: "block",
                            width: "100%",
                            cursor: "pointer",
                        }}
                        className={`group rounded-2xl border transition-all duration-200 ${
                            selected
                                ? "border-2 border-[#365FCB] bg-blue-50"
                                : "border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                        }`}
                    >
                        <div className="flex items-start justify-between gap-6 p-5">

                            {/* Left */}
                            <div className="min-w-0 flex-1">

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-2">

                                        <MapPin
                                            size={17}
                                            className={
                                                selected
                                                    ? "text-[#365FCB]"
                                                    : "text-slate-400"
                                            }
                                        />

                                        <h3 className="text-base font-semibold text-slate-900">
                                            {addr.label}
                                        </h3>

                                    </div>

                                    {selected && (
                                        <CheckCircle2
                                            size={20}
                                            className="text-[#365FCB]"
                                        />
                                    )}

                                </div>

                                <p className="mt-3 text-sm leading-6 text-slate-700">
                                    {addr.formattedAddress}
                                </p>

                                {(addr.city ||
                                    addr.state ||
                                    addr.pincode) && (
                                    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">

                                        {addr.city && (
                                            <span>{addr.city}</span>
                                        )}

                                        {addr.city &&
                                            (addr.state ||
                                                addr.pincode) && (
                                                <span>•</span>
                                            )}

                                        {addr.state && (
                                            <span>{addr.state}</span>
                                        )}

                                        {addr.state &&
                                            addr.pincode && (
                                                <span>•</span>
                                            )}

                                        {addr.pincode && (
                                            <span>{addr.pincode}</span>
                                        )}

                                    </div>
                                )}

                            </div>

                        </div>
                    </button>
                );
            })}

        </div>
    );
};

export default SavedAddressMode;