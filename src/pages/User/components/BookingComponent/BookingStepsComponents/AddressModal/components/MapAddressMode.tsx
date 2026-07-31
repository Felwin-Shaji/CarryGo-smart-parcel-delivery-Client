import { FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import type { AddressUI } from "../../../../../../../context/Booking/Booking.types";
import MapLocationPicker from "../../../../../../../shared/components/Map/MapLocationPicker";

type Props = {
    coords: [number, number] | null;
    setCoords: (coords: [number, number]) => void;

    detecting: boolean;

    detectedAddress: AddressUI | null;

    saveAddressNow: boolean;
    setSaveAddressNow: (checked: boolean) => void;

    handleUseThisAddress: () => void;
};

const MapAddressMode = ({
    coords,
    setCoords,
    detecting,
    detectedAddress,
    saveAddressNow,
    setSaveAddressNow,
    handleUseThisAddress,
}: Props) => {
    return (
        <div className="grid h-full gap-6 lg:grid-cols-[1.7fr_380px]">

            {/* Left - Map */}
            <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <MapLocationPicker
                    position={coords}
                    onSelect={(lat, lng) => setCoords([lat, lng])}
                />
            </div>

            {/* Right - Address Panel */}
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* Header */}
                <div className="border-b border-slate-200 px-6 py-5">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Selected Location
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Click anywhere on the map to choose your location.
                    </p>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col px-6 py-5">

                    {/* Loading */}
                    {detecting && (
                        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4">
                            <FaSpinner className="animate-spin text-blue-600" />
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    Detecting Address...
                                </p>
                                <p className="text-xs text-slate-500">
                                    Reverse geocoding selected location.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!detecting && !detectedAddress && (
                        <div className="flex flex-1 items-center justify-center">

                            <div className="text-center">

                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                                    <FaMapMarkerAlt className="text-2xl text-blue-600" />
                                </div>

                                <h4 className="text-lg font-semibold text-slate-900">
                                    Pick a Location
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Click anywhere on the map to automatically
                                    detect the address.
                                </p>

                            </div>

                        </div>
                    )}

                    {/* Address */}
                    {detectedAddress && (
                        <>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

                                <div className="mb-4 flex items-center gap-2">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                        <FaMapMarkerAlt className="text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Detected Address
                                        </p>

                                        <p className="font-semibold text-slate-900">
                                            {detectedAddress.city || "Selected Location"}
                                        </p>
                                    </div>

                                </div>

                                <p className="text-sm leading-6 text-slate-600">
                                    {detectedAddress.formattedAddress}
                                </p>

                                {(detectedAddress.state || detectedAddress.pincode) && (
                                    <div className="mt-4 rounded-lg bg-white px-3 py-2 text-sm text-slate-600">

                                        {detectedAddress.state}

                                        {detectedAddress.pincode &&
                                            ` • ${detectedAddress.pincode}`}

                                    </div>
                                )}

                            </div>

                            <button
                                type="button"
                                onClick={() => setSaveAddressNow(!saveAddressNow)}
                                className="flex items-center justify-between rounded-xl border  bg-white  border-slate-200 p-4 transition hover:bg-white"
                            >
                                <div className="text-left">
                                    <p className="text-sm font-medium text-slate-900">
                                        Save this address
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Available for future bookings.
                                    </p>
                                </div>

                                <div
                                    className={`relative h-7 w-12 rounded-full transition ${saveAddressNow
                                        ? "bg-blue-600"
                                        : "bg-slate-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition ${saveAddressNow ? "left-6" : "left-1"
                                            }`}
                                    />
                                </div>
                            </button>

                            <button
                                onClick={handleUseThisAddress}
                                className="mt-auto w-full rounded-xl bg-[#102467] px-5 py-3 font-semibold text-white transition hover:bg-[#0b1b4f]"
                            >
                                Use This Address
                            </button>

                        </>
                    )}

                </div>

            </div>

        </div>
    );
};

export default MapAddressMode;