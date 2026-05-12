import { useEffect, useState } from "react";
import type { AddressUI, TemporaryAddress } from "../../../../../context/Booking/Booking.types";
import MapLocationPicker from "../../../../../shared/components/Map/MapLocationPicker";
import { useAddress } from "../../../../../Services/User/useAddress";
import { FaSpinner } from "react-icons/fa6";

interface Props {
    type: "PICKUP" | "DELIVERY";
    onClose: () => void;
    savedAddresses?: AddressUI[];
    loading: boolean;
    onSelectAddress?: (address: AddressUI) => void;
}

const AddressModal = ({
    type,
    onClose,
    savedAddresses = [],
    loading = false,
    onSelectAddress
}: Props) => {
    // const { dispatch } = useBookingContext();
    const { reverseGeocode, saveAddress } = useAddress();

    const [coords, setCoords] = useState<[number, number] | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<AddressUI | null>(null);
    const [detectedAddress, setDetectedAddress] = useState<AddressUI | null>(null);
    const [detecting, setDetecting] = useState(false);
    const [saveAddressNow, setSaveAddressNow] = useState(false);
    const [mode, setMode] = useState<"SAVED" | "MAP">("SAVED");

    const handleConfirm = () => {
        if (!selectedAddress) return;
        onSelectAddress?.(selectedAddress);
        onClose();
    };

    const handleUseThisAddress = async () => {
        try {

            let addressToUse = detectedAddress;

            if (saveAddressNow && detectedAddress) {

                await saveAddress({
                    label: "Other",
                    formattedAddress: detectedAddress.formattedAddress ?? "",
                    city: detectedAddress.city,
                    state: detectedAddress.state,
                    country: "India",
                    pincode: detectedAddress.pincode,
                    location: detectedAddress.location
                });

                addressToUse = detectedAddress;
            }

            if (!addressToUse) {
                return
            }
            onSelectAddress?.(addressToUse);
            onClose();

        } catch (err) {
            console.error("Failed to save address", err);
        }
    }

    useEffect(() => {
        if (!coords) return;
        const detect = async () => {
            try {
                setDetecting(true);
                const result = await reverseGeocode([coords[0], coords[1]]);
                const address: TemporaryAddress = {
                    type: "TEMP",
                    label: "Temporary",
                    city: result.city ?? "",
                    state: result.state ?? "",
                    pincode: result.pincode ?? "",
                    formattedAddress: result.formattedAddress ?? "",
                    country: result.country,
                    location: {
                        lat: coords[0],
                        lng: coords[1],
                    }
                };

                setDetectedAddress(address);
            } catch (error) {
                console.error("Reverse geocode failed", error);
            } finally {
                setDetecting(false);
            }
        };
        detect();
    }, [coords]);

    useEffect(() => {
        setSelectedAddress(null);
    }, [mode]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]">
                <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                    <FaSpinner className="animate-spin text-2xl text-neutral-800" />
                    <p className="text-sm font-medium text-neutral-500 tracking-wide">Loading addresses…</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999] px-4">
                <div className="bg-white w-full max-w-4xl rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] flex flex-col max-h-[92vh] overflow-hidden border border-neutral-200/60">

                    <div className="px-8 py-6 border-b border-neutral-100 flex justify-between items-center bg-gradient-to-b from-neutral-50/80 to-white">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-1">
                                {type === "PICKUP" ? "Pickup" : "Delivery"}
                            </p>
                            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                                Select Location
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
                        >
                            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
                        </button>
                    </div>

                    <div className="px-8 pt-5 pb-2">
                        <div className="relative inline-flex bg-neutral-100 rounded-xl p-1 isolate overflow-hidden">
                            <span
                                className={`absolute top-1 bottom-1 w-1/2 rounded-lg bg-white shadow-sm ring-1 ring-black/[0.04] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${mode === "MAP" ? "translate-x-full" : "translate-x-0"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setMode("SAVED")}
                                className="relative z-10 flex-1 px-7 py-2.5 text-[13px] font-semibold tracking-wide !appearance-none !border-0 !bg-transparent hover:!bg-transparent focus:!outline-none transition-colors duration-200"
                            >
                                <span className={mode === "SAVED" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"}>
                                    Saved
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("MAP")}
                                className="relative z-10 flex-1 px-7 py-2.5 text-[13px] font-semibold tracking-wide !appearance-none !border-0 !bg-transparent hover:!bg-transparent focus:!outline-none transition-colors duration-200"
                            >
                                <span className={mode === "MAP" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"}>
                                    Map
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-8 py-5">

                        {mode === "SAVED" && (
                            <div className="space-y-3">
                                {savedAddresses.length === 0 && (
                                    <div className="text-center py-16">
                                        <div className="w-12 h-12 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 1C6.13 1 3 4.13 3 8c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" /><circle cx="10" cy="8" r="2.5" /></svg>
                                        </div>
                                        <p className="text-sm font-medium text-neutral-400">No saved addresses yet</p>
                                    </div>
                                )}

                                {savedAddresses.map((addr, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedAddress(addr)}
                                        className={`group p-5 rounded-xl border-[1.5px] transition-all duration-200 cursor-pointer ${selectedAddress === addr
                                            ? "border-neutral-900 bg-neutral-900/[0.02] shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
                                            : "border-neutral-150 hover:border-neutral-300 hover:shadow-md bg-white"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex items-start gap-4 min-w-0">
                                                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${selectedAddress === addr ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200"}`}>
                                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 1C6.13 1 3 4.13 3 8c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" /><circle cx="10" cy="8" r="2.5" /></svg>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-sm text-neutral-900">{addr.label}</p>
                                                    <p className="text-[13px] text-neutral-500 mt-0.5 leading-relaxed truncate">{addr.formattedAddress}</p>
                                                </div>
                                            </div>

                                            <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${selectedAddress === addr ? "border-neutral-900 bg-neutral-900" : "border-neutral-300"}`}>
                                                {selectedAddress === addr && (
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5l2.5 2.5L8 3" /></svg>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {mode === "MAP" && (
                            <div className="space-y-5">
                                <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm ring-1 ring-black/[0.03]">
                                    <MapLocationPicker
                                        position={coords}
                                        onSelect={(lat, lng) => setCoords([lat, lng])}
                                    />
                                </div>

                                {detecting && (
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100">
                                        <FaSpinner className="animate-spin text-neutral-400 text-sm" />
                                        <span className="text-sm font-medium text-neutral-500">Detecting address…</span>
                                    </div>
                                )}

                                {detectedAddress && (
                                    <div className="p-5 bg-gradient-to-br from-neutral-50 to-white rounded-xl border border-neutral-200 shadow-sm space-y-4">

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-400 mb-2">
                                                Detected Location
                                            </p>
                                            <p className="text-sm font-medium text-neutral-800 leading-relaxed">
                                                {detectedAddress.formattedAddress}
                                            </p>
                                        </div>

                                        {/* Save option */}
                                        <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={saveAddressNow}
                                                onChange={(e) => setSaveAddressNow(e.target.checked)}
                                                className="w-4 h-4 rounded border-neutral-300"
                                            />
                                            Save this address for future use
                                        </label>

                                        <button
                                            onClick={handleUseThisAddress}
                                            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white text-[13px] font-semibold hover:bg-neutral-800 active:bg-neutral-950 transition-all duration-150 shadow-sm"
                                        >
                                            Use This Address
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M2 6h8M7 3l3 3-3 3" />
                                            </svg>
                                        </button>

                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    <div className="px-8 py-5 border-t border-neutral-100 flex justify-end gap-3 bg-gradient-to-t from-neutral-50/50 to-white">

                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 hover:shadow-sm active:bg-neutral-50 transition-all duration-150"
                        >
                            Cancel
                        </button>

                        {mode === "SAVED" && (
                            <button
                                onClick={handleConfirm}
                                disabled={!selectedAddress}
                                className="px-7 py-3 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 active:bg-neutral-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 shadow-sm hover:shadow-md"
                            >
                                Confirm Location
                            </button>
                        )}

                    </div>

                </div>
            </div>
        </>
    );
};

export default AddressModal;
