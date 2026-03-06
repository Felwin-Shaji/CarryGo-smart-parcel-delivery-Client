
import { useBookingContext } from "../../../../context/Booking/BookingContext";
// import BookingPincodeStep from "./BookingPincodeStep";
// import AddressStep from "./AddressStep";
import PricingReviewStep from "./PricingReviewStep";
import BookingStepOne from "./BookingStepOne";
import BookingStepTwo from "./BookingStepTwo";


const BookingFlow = () => {
  const { state, dispatch } = useBookingContext();
  const step = state.step ?? 1;
// dispatch({ type: "RESET_BOOKING" })
  switch (step) {
    case 1:
      return <BookingStepOne />;

    case 2:
      return <BookingStepTwo />;

    // case 3:
    //   return <AddressStep />;

      return (
        <PricingReviewStep
          onSuccess={() => dispatch({ type: "RESET_BOOKING" })}
        />
      );

    default:
      return null;
  }
};


export default BookingFlow;
