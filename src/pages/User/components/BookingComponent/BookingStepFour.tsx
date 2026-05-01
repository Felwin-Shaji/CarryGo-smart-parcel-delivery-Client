import RouteDetailsCard from "./BookingStepsComponents/RouteDetailsCard";
import PackageDetailsCard from "./BookingStepsComponents/PackageDetailsCard";
import BookingLayout from "./BookingStepsComponents/BookingLayout";
import PricingBreakdownCard from "./BookingStepsComponents/PricingBreakdownCard";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import ServicePartnerCard from "./BookingStepsComponents/ServicePartnerCard";
import { useBooking } from "../../../../Services/User/Booking/createBooking";
import type { CalculatePricePayload } from "../../../../shared/constants_Types/types/User/Booking/createBookingType";
import { useEffect } from "react";
import { OrderSummary } from "./BookingStepsComponents/OrderSummary";

export default function BookingStepFour() {

  const { state, dispatch } = useBookingContext();
  const { getPricing } = useBooking();

  async function handleGetPricing() {

    if (
      !state.deliveryType ||
      !state.partnerId ||
      !state.pickupAddress ||
      !state.deliveryAddress ||
      !state.packageDetails
    ) return;

    const buildPricingPayload: CalculatePricePayload = {
      deliveryType: state.deliveryType,
      partnerId: state.partnerId,
      travelRequestId: state.selectedTravelRequestId,
      pickupAddress: state.pickupAddress,
      deliveryAddress: state.deliveryAddress,
      packageDetails: state.packageDetails,
    };

    const res = await getPricing(buildPricingPayload);

    dispatch({ type: "SET_PRICING", payload: res });
  }

  useEffect(() => {
    if (
      state.deliveryType &&
      state.partnerId &&
      state.pickupAddress &&
      state.deliveryAddress &&
      state.packageDetails
    ) {
      handleGetPricing();
    }
  }, [
    state.deliveryType,
    state.partnerId,
    state.selectedTravelRequestId,
    state.pickupAddress,
    state.deliveryAddress,
    state.packageDetails
  ]);

  return (
    <BookingLayout
      step={4}
      title="Review & Confirm"
      description="Please review your booking before confirming."
      left={
        <>
          <RouteDetailsCard />
          <ServicePartnerCard />
          <PackageDetailsCard />
          <PricingBreakdownCard />
        </>
      }
      right={<OrderSummary />}
    />
  );
}


