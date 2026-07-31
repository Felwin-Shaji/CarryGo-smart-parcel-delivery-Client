import { useEffect, useState } from "react";
import type {
    AddressUI,
    TemporaryAddress,
} from "../../../../../../context/Booking/Booking.types";
import { useAddress } from "../../../../../../Services/User/useAddress";
import { FaSpinner } from "react-icons/fa6";

import SavedAddressMode from "./components/SavedAddressMode";
import MapAddressMode from "./components/MapAddressMode";
import AddressModalHeader from "./components/AddressModalHeader";
import AddressModeTabs from "./components/AddressModeTabs";
import AddressModalFooter from "./components/AddressModalFooter";
import toast from "react-hot-toast";

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
    onSelectAddress,
}: Props) => {
    const { reverseGeocode, saveAddress } = useAddress();

    const [coords, setCoords] = useState<[number, number] | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<AddressUI | null>(null);
    const [detectedAddress, setDetectedAddress] = useState<AddressUI | null>(null);
    const [detecting, setDetecting] = useState(false);
    const [saveAddressNow, setSaveAddressNow] = useState(false);

    const [mode, setMode] = useState<"SAVED" | "MAP">("SAVED");

    const handleConfirm = () => {
        if (!selectedAddress) return;
        if (!selectedAddress.pincode) {
            toast.error("Couldn't detect the pincode. Please choose another nearby location.");
            return;
        }

        onSelectAddress?.(selectedAddress);
        onClose();
    };

    const handleUseThisAddress = async () => {
        try {
            let addressToUse = detectedAddress;

            if (saveAddressNow && detectedAddress) {

                if (!detectedAddress.pincode) {
                    toast.error(
                        "We couldn't determine the postal code for this location. Please select a nearby point or enter an address with a valid pincode."
                    );
                    return;
                }
                await saveAddress({
                    label: "Other",
                    formattedAddress: detectedAddress.formattedAddress ?? "",
                    city: detectedAddress.city,
                    state: detectedAddress.state,
                    country: "India",
                    pincode: detectedAddress.pincode,
                    location: detectedAddress.location,
                });

                addressToUse = detectedAddress;
            }

            if (!addressToUse) return;

            onSelectAddress?.(addressToUse);
            onClose();
        } catch (err) {
            console.error("Failed to save address", err);
        }
    };

    useEffect(() => {
        if (!coords) return;

        const detect = async () => {
            try {
                setDetecting(true);

                const result = await reverseGeocode([
                    coords[0],
                    coords[1],
                ]);

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
                    },
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
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 backdrop-blur-md">
                <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-10 py-10 shadow-2xl">
                    <FaSpinner className="animate-spin text-3xl text-[#102467]" />
                    <p className="text-sm font-medium text-neutral-500">
                        Loading addresses...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-lg p-6">

            <div className="flex h-[88vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

                {/* Header */}
                <AddressModalHeader
                    type={type}
                    onClose={onClose}
                />

                {/* Tabs */}
                <div className="border-b border-slate-200 bg-white">
                    <AddressModeTabs
                        mode={mode}
                        setMode={setMode}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">

                    {mode === "SAVED" && (
                        <div className="h-full overflow-y-auto pr-2">
                            <SavedAddressMode
                                savedAddresses={savedAddresses}
                                selectedAddress={selectedAddress}
                                setSelectedAddress={setSelectedAddress}
                            />
                        </div>
                    )}

                    {mode === "MAP" && (
                        <div className="h-full">
                            <MapAddressMode
                                coords={coords}
                                setCoords={setCoords}
                                detecting={detecting}
                                detectedAddress={detectedAddress}
                                saveAddressNow={saveAddressNow}
                                setSaveAddressNow={setSaveAddressNow}
                                handleUseThisAddress={handleUseThisAddress}
                            />
                        </div>
                    )}

                </div>

                {/* Footer only for Saved Addresses */}
                {mode === "SAVED" && (
                    <AddressModalFooter
                        handleConfirm={handleConfirm}
                        mode={mode}
                        onClose={onClose}
                        selectedAddress={selectedAddress}
                    />
                )}

            </div>

        </div>
    );
};

export default AddressModal;