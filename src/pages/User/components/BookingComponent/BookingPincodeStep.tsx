import { useEffect, useState } from "react";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import AddressModal from "./BookingStepOne/AddressModal";
import StepIndicator, { StepDivider } from "./BookingStepOne/StepIndicator";
import LocationBlock, { SummaryItem } from "./BookingStepOne/LocationBlock";
import { useBooking } from "../../../../Services/User/Booking/createBooking";
import type { AddressUI } from "../../../../context/Booking/Booking.types";
import toast from "react-hot-toast";

const BookingStepOne = () => {
    const { state, dispatch } = useBookingContext();
    const { getUserAddresses, checkServiceablePartners } = useBooking();

    const [mapFor, setMapFor] = useState<"PICKUP" | "DELIVERY" | null>(null);
    const [savedAddresses, setSavedAddresses] = useState<AddressUI[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [checkingService, setCheckingService] = useState(false);

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

    const handleContinue = async () => {
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
        if (!canContinue || !state.pickupAddress?.location || !state.deliveryAddress?.location) return;

        try {
            setCheckingService(true);


            const result = await checkServiceablePartners(
                state.pickupAddress.location,
                state.deliveryAddress.location
            );

            if (!result.agencies.length && !result.travelers.length) {
                toast.error("No service available for selected route");
                return;
            }

            // Save result to context
            dispatch({
                type: "SET_SERVICEABILITY",
                payload: {
                    agencies: result.agencies,
                    travelers: result.travelers,
                },
            });

            // navigateToStep2();

        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setCheckingService(false);
        }
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10 lg:mb-14">
                    <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto pb-1">
                        <StepIndicator active label="Location" number={1} />
                        <StepDivider />
                        <StepIndicator label="Delivery & Package" number={2} />
                        <StepDivider />
                        <StepIndicator label="Review" number={3} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 tabular-nums">
                        Step 1 of 3
                    </span>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-12 gap-8">

                    <div className="lg:col-span-3 space-y-5">
                        <div className="rounded-2xl border border-neutral-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
                            <div className="p-6 sm:p-8 border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors duration-200 cursor-pointer" onClick={() => setMapFor("PICKUP")}>
                                <LocationBlock
                                    icon="📍"
                                    title="Pickup Location"
                                    description="Select the exact pickup point."
                                    address={state.pickupAddress}
                                    onClick={() => setMapFor("PICKUP")}
                                />
                            </div>
                            <div className="p-6 sm:p-8 hover:bg-neutral-50/50 transition-colors duration-200 cursor-pointer" onClick={() => setMapFor("DELIVERY")}>
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

                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-neutral-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 sm:p-8 lg:sticky lg:top-20">
                            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-neutral-400 mb-6">
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

                            <div className="border-t border-dashed border-neutral-200 my-6" />

                            {state.pickupAddress && state.deliveryAddress && (
                                <div className="mt-5 text-sm text-neutral-500">
                                    We’ll check service availability in the next step.
                                </div>
                            )}

                            <button
                                onClick={handleContinue}
                                disabled={!canContinue || checkingService}
                                className={`hidden lg:flex w-full mt-8 py-3.5 rounded-xl text-sm font-semibold items-center justify-center gap-2 transition-all duration-200 ${canContinue
                                        ? "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 shadow-sm hover:shadow-md"
                                        : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                                    }`}
                            >
                                {checkingService ? "Checking availability..." : "Continue"}
                            </button>
                        </div>
                    </div>

                </div>

                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-neutral-200/60 p-4 z-50">
                    <button
                        onClick={handleContinue}
                        disabled={!canContinue || checkingService}
                        className={`hidden lg:flex w-full mt-8 py-3.5 rounded-xl text-sm font-semibold items-center justify-center gap-2 transition-all duration-200 ${canContinue
                            ? "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 shadow-sm hover:shadow-md"
                            : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                            }`}
                    >
                        {checkingService ? "Checking availability..." : "Continue"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BookingStepOne;
