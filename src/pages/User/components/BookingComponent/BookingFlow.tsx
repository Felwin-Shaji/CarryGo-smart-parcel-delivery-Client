
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import SelectDeleveryDetailsStep from "./SelectDeleveryDetailsStep";
// import BookingPincodeStep from "./BookingPincodeStep";
// import AddressStep from "./AddressStep";
import PricingReviewStep from "./PricingReviewStep";
import BookingStepOne from "./BookingPincodeStep";


const BookingFlow = () => {
  const { state, dispatch } = useBookingContext();
  const step = state.step ?? 1;

  switch (step) {
    case 1:
      return <BookingStepOne />;

    case 2:
      return <SelectDeleveryDetailsStep />;

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
