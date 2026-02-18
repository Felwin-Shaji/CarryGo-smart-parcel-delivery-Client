import { useEffect, useState } from "react";
import { useBooking } from "../../../../Services/User/Booking/createBooking";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import type { BookingState, DeliveryType } from "../../../../context/Booking/Booking.types";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../../components/loading/CarryGoLoadingScreen";
import BookingStepNav from "./BookingStepNav";
import type { CalculatePricePayload, CreateBookingPayload } from "../../../../constants_Types/types/User/Booking/createBookingType";

interface Props {
    onSuccess: () => void;
}

const PricingReviewStep = ({ onSuccess }: Props) => {
    const navigate = useNavigate()

    const { getPricing, createBooking } = useBooking();
    const { state, dispatch } = useBookingContext();
    if (state.step !== 4) return null;

    const [pricing, setPricing] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    function isPricingReady(
        state: BookingState
    ): state is BookingState & {
        deliveryType: DeliveryType;
        partnerId: string;
        packageDetails: {
            category: string;
            size: "SMALL" | "MEDIUM" | "LARGE";
            weightKg: number;
        };
        pickupAddressId: string;
        deliveryAddressId: string;
    } {
        return (
            !!state.deliveryType &&
            !!state.partnerId &&
            !!state.packageDetails &&
            !!state.pickupAddressId &&
            !!state.deliveryAddressId
        );
    }

    useEffect(() => {
        if (state.step !== 4) return;
        if (!isPricingReady(state)) return;

        setLoading(true);

        let payload: CalculatePricePayload;

        if (state.deliveryType === "TRAVELER") {
            payload = {
                deliveryType: "TRAVELER",
                partnerId: state.partnerId!,
                travelRequestId: state.selectedTravelRequestId!, // required
                packageDetails: state.packageDetails!,
                pickupAddressId: state.pickupAddressId!,
                deliveryAddressId: state.deliveryAddressId!,
            };
        } else {
            payload = {
                deliveryType: "AGENCY",
                partnerId: state.partnerId!,
                packageDetails: state.packageDetails!,
                pickupAddressId: state.pickupAddressId!,
                deliveryAddressId: state.deliveryAddressId!,
            };
        }

        getPricing(payload)
            .then(setPricing)
            .finally(() => setLoading(false));

    }, [state.step]);




    if (loading) {
        return <LoadingScreen />;
    }

    if (!pricing) {
        return (
            <div className="text-center mt-10 text-sm text-gray-500">
                Failed to load pricing.
            </div>
        );
    }

    const handleSubmit = async () => {
        if (!isPricingReady(state)) return;

        let payload: CreateBookingPayload;

        if (state.deliveryType === "TRAVELER") {
            payload = {
                deliveryType: "TRAVELER",
                partnerId: state.partnerId!,
                travelRequestId: state.selectedTravelRequestId!,
                pickupAddressId: state.pickupAddressId!,
                deliveryAddressId: state.deliveryAddressId!,
                packageDetails: state.packageDetails!,
            };
        } else {
            payload = {
                deliveryType: "AGENCY",
                partnerId: state.partnerId!,
                pickupAddressId: state.pickupAddressId!,
                deliveryAddressId: state.deliveryAddressId!,
                packageDetails: state.packageDetails!,
            };
        }
        const res = await createBooking(payload);

        onSuccess(); // RESET_BOOKING
        navigate(`/booking/${res.bookingId}/pay`);
    };


    return (
        <div className="max-w-4xl mx-auto px-6 space-y-8">
            <BookingStepNav
                showBack
                showForward={false}
                onBack={() => dispatch({ type: "SET_STEP", payload: 3 })}
            />

            {/* Summary */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Pricing summary</h2>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Delivery type</p>
                        <p className="font-medium">{state.deliveryType}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Distance</p>
                        <p className="font-medium">{pricing.distanceKm} km</p>
                    </div>
                </div>
            </section>

            {/* Breakdown */}
            <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold">Price breakdown</h3>

                <div className="space-y-2 text-sm">
                    <PriceRow label="Base price" value={pricing.basePrice} />
                    <PriceRow label="Distance charge" value={pricing.distanceCharge} />
                    <PriceRow label="Size charge" value={pricing.sizeCharge} />
                    <PriceRow label="Platform fee" value={pricing.platformFee} />
                </div>

                <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                    <span>Total payable</span>
                    <span>₹{pricing.totalPrice}</span>
                </div>
            </section>

            {/* Info */}
            <section className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600">
                Price is locked for 10 minutes.
                Final amount may change if pickup or delivery address is updated.
            </section>

            {/* CTA */}
            <button
                onClick={handleSubmit}
                className="w-full py-4 rounded-xl bg-black text-white font-semibold"
            >
                Proceed to payment
            </button>
        </div>
    );
};

export default PricingReviewStep;

const PriceRow = ({ label, value }: { label: string; value: number }) => (
    <div className="flex justify-between">
        <span className="text-gray-600">{label}</span>
        <span>₹{value}</span>
    </div>
);
