import { useEffect, useState } from "react";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import AddressModal from "./BookingStepsComponents/AddressModal";
// import StepIndicator, { StepDivider } from "./BookingStepsComponents/StepIndicator";
import LocationBlock, { SummaryItem } from "./BookingStepsComponents/LocationBlock";
import { useBooking } from "../../../../Services/User/Booking/createBooking";
import type { AddressUI } from "../../../../context/Booking/Booking.types";
import toast from "react-hot-toast";
import BookingLayout from "./BookingStepsComponents/BookingLayout";

const BookingStepOne = () => {
    const { state, dispatch } = useBookingContext();
    const { getUserAddresses } = useBooking();

    const [mapFor, setMapFor] = useState<"PICKUP" | "DELIVERY" | null>(null);
    const [savedAddresses, setSavedAddresses] = useState<AddressUI[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    // const [checkingService, setCheckingService] = useState(false);

    useEffect(() => {
        if (!mapFor) return;
        const fetchAddresses = async () => {
            try {
                setLoadingAddresses(true);
                const data = await getUserAddresses();
                setSavedAddresses(data);
            } catch (error) {
                console.error("Failed to fetch addresses", error);
            } finally {
                setLoadingAddresses(false);
            }
        };
        fetchAddresses();
    }, [mapFor]);

    const canContinue =
        !!state.pickupAddress &&
        !!state.deliveryAddress;

    const handleContinue = () => {
        if (!canContinue) {
            toast.error("Select pickup and delivery locations");
            return;
        }

        dispatch({ type: "SET_STEP", payload: 2 });
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50/80">
            {mapFor && (
                <AddressModal
                    type={mapFor}
                    onClose={() => setMapFor(null)}
                    savedAddresses={savedAddresses}
                    loading={loadingAddresses}
                />
            )}
            <BookingLayout
                step={1}
                title="Select Locations"
                description="Choose pickup and delivery locations for your shipment."
                left={
                    <div className="space-y-5">

                        <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">

                            <div
                                className="p-6 border-b hover:bg-neutral-50 cursor-pointer"
                                onClick={() => setMapFor("PICKUP")}
                            >
                                <LocationBlock
                                    icon="📍"
                                    title="Pickup Location"
                                    description="Select the exact pickup point."
                                    address={state.pickupAddress}
                                    onClick={() => setMapFor("PICKUP")}
                                />
                            </div>

                            <div
                                className="p-6 hover:bg-neutral-50 cursor-pointer"
                                onClick={() => setMapFor("DELIVERY")}
                            >
                                <LocationBlock
                                    icon="📦"
                                    title="Delivery Location"
                                    description="Choose the destination address."
                                    address={state.deliveryAddress}
                                    onClick={() => setMapFor("DELIVERY")}
                                />
                            </div>

                        </div>

                    </div>
                }
                right={
                    <div className="rounded-2xl border border-neutral-200 bg-white p-6 sticky top-24">

                        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6">
                            Booking Overview
                        </h3>

                        <SummaryItem
                            label="Pickup"
                            value={state.pickupAddress?.formattedAddress}
                        />

                        <SummaryItem
                            label="Delivery"
                            value={state.deliveryAddress?.formattedAddress}
                        />

                        <div className="border-t border-dashed my-6" />

                        {state.pickupAddress && state.deliveryAddress && (
                            <p className="text-sm text-neutral-500">
                                We'll check service availability in the next step.
                            </p>
                        )}

                        <button
                            onClick={handleContinue}
                            disabled={!canContinue}
                            className={`w-full mt-8 py-3 rounded-xl text-sm font-semibold transition ${canContinue
                                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                                    : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                                }`}
                        >
                            Continue
                        </button>

                    </div>
                }
            />

        </div>
    );
};

export default BookingStepOne;
