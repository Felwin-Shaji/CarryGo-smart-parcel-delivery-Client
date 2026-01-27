
import type { BookingState } from "../../../../context/Booking/Booking.types";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import SelectDeleveryDetailsStep from "./SelectDeleveryDetailsStep";
import BookingPincodeStep from "./BookingPincodeStep";
import AddressStep from "./AddressStep";
import PricingReviewStep from "./PricingReviewStep";
import { useEffect, useState } from "react";

const deriveStep = (state: BookingState) => {
    if (!state.fromPincode) return 1;
    if (!state.deliveryType) return 2;
    if (!state.pickupAddressId || !state.deliveryAddressId) return 3;
    return 4;
};

const BookingFlow = () => {
    // const { state } = useBookingContext();
    // const step = deriveStep(state);

    const { state } = useBookingContext();
    const maxStep = deriveStep(state);

    const [activeStep, setActiveStep] = useState(maxStep);

    // Sync activeStep if state changes forward
    useEffect(() => {
        if (activeStep < maxStep) {
            setActiveStep(maxStep);
        }
    }, [maxStep]);

    switch (activeStep) {
        case 1:
            return <BookingPincodeStep onSuccess={() => { }} />;

        case 2:
            return <SelectDeleveryDetailsStep onSuccess={() => { }} />;

        case 3:
            return <AddressStep onSuccess={() => { }} />;

        case 4:
            return <PricingReviewStep onSuccess={() => { }} />;

        default:
            return null;
    }
};

export default BookingFlow;
