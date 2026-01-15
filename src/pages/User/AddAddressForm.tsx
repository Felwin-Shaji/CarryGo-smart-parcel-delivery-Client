import { useEffect, useState } from "react";
import MapLocationPicker from "../../components/Map/MapLocationPicker";
import { MdMyLocation } from "react-icons/md";
import { Header } from "./components/Header";
import { useAddress } from "../../Services/User/useAddress";
import { useDebounce } from "../../hooks/useDebounce";
import toast from "react-hot-toast";
import type { AddressFormState, SaveAddressPayload } from "../../constants_Types/types/User/Address/address.type";
import { confirmToast } from "../../components/globelcomponents/confirmToast";

export default function AddAddressMapFirst() {
    const { reverseGeocode, saveAddress } = useAddress();

    const [coords, setCoords] = useState<[number, number] | null>(null);
    const [loadingAddress, setLoadingAddress] = useState(false);

    const debouncedCoords = useDebounce(coords, 700);

    const [address, setAddress] = useState<AddressFormState>({
        label: "Home",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        formattedAddress: "",
    });

    /* ---------------- Use Current Location ---------------- */
    const useCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords([pos.coords.latitude, pos.coords.longitude]);
            },
            () => toast.error("Location permission denied"),
            { enableHighAccuracy: true }
        );
    };

    /* ---------------- Reverse Geocode ---------------- */
    useEffect(() => {
        if (!debouncedCoords) return;

        const fetchAddress = async () => {
            try {
                setLoadingAddress(true);

                const res = await reverseGeocode(debouncedCoords);

                // const line1 = `${res.house_number ?? ""} ${res.road ?? ""}`.trim();

                setAddress((prev) => ({
                    ...prev,
                    addressLine1: res.addressLine1 || "",
                    city: res.city || "",
                    state: res.state || "",
                    pincode: res.pincode || "",
                    formattedAddress: res.formattedAddress || "",
                }));

            } catch (err) {
                console.error("Reverse geocode failed", err);
            } finally {
                setLoadingAddress(false);
            }
        };

        fetchAddress();
    }, [debouncedCoords]);


    /* ---------------- Save ---------------- */
    const handleSave = async () => {
        if (!coords) {
            toast.error("Please select a location on the map");
            return;
        };


        if (!address.addressLine1 || !address.city || !address.state) {
            console.log(address.addressLine1, " =>addressline1     ", address.city, "=>city      ", address.state, "=>:state");
            toast.error("Address details are incomplete");
            return;
        }

        const payload: SaveAddressPayload = {
            label: address.label,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            country: address.country,
            pincode: address.pincode,
            formattedAddress: address.formattedAddress,
            location: {
                lat: coords[0],
                lng: coords[1],
            },
        };

        confirmToast(
            "Save this address for future deliveries?",
            async () => {
                await saveAddress(payload);
            }
        );
    };


    return (
        <>
            <Header isLoggedIn={true} />

            <div className="max-w-3xl mx-auto mt-20 bg-white rounded-2xl shadow overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b">
                    <h2 className="text-lg font-semibold">📍 Select Location</h2>
                    <p className="text-sm text-gray-500">
                        Move the pin to your exact location
                    </p>
                </div>

                {/* Use current location */}
                <div className="px-5 py-3">
                    <button
                        onClick={useCurrentLocation}
                        className="flex items-center gap-2 text-sm font-medium border px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                        <MdMyLocation />
                        Use current location
                    </button>
                </div>

                {/* Map */}
                <div className="px-5">
                    <MapLocationPicker
                        position={coords}
                        onSelect={(lat, lng) => setCoords([lat, lng])}
                    />
                </div>

                {/* Address Preview */}
                <div className="p-5 border-t space-y-4">
                    <div>
                        <p className="text-xs text-gray-500">Detected address</p>

                        {loadingAddress ? (
                            <AddressDetectingLoader />
                        ) : (
                            <p className="font-medium text-sm">
                                {address.formattedAddress || "Move pin to detect address"}
                            </p>
                        )}
                    </div>


                    {/* Minimal Form */}
                    <div className="space-y-3">
                        <select
                            value={address.label}
                            onChange={(e) =>
                                setAddress({ ...address, label: e.target.value as AddressFormState["label"] })
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option>Home</option>
                            <option>Office</option>
                            <option>Warehouse</option>
                            <option>Other</option>
                        </select>

                        <input
                            placeholder="Flat / Building / Landmark"
                            value={address.addressLine2}
                            onChange={(e) =>
                                setAddress({ ...address, addressLine2: e.target.value })
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full bg-black text-white py-3 rounded-xl font-semibold"
                    >
                        Save Address
                    </button>
                </div>
            </div>
        </>
    );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function AddressDetectingLoader() {
    return (
        <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3">
            {/* Spinner */}
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black" />

            {/* Text */}
            <div>
                <p className="text-sm font-medium text-gray-700">
                    Detecting address
                </p>
                <p className="text-xs text-gray-500">
                    Please wait a moment…
                </p>
            </div>
        </div>
    );
}
