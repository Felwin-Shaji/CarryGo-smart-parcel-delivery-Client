
import { useBookingContext } from "../../../../context/Booking/BookingContext";
// import BookingPincodeStep from "./BookingPincodeStep";
// import AddressStep from "./AddressStep";
import PricingReviewStep from "./BookingStepFour";
import BookingStepOne from "./BookingStepOne";
import BookingStepTwo from "./BookingStepTwo";
import BookingStepThree from "./BookingStepThree";
import BookingStepFour from "./BookingStepFour";


const BookingFlow = () => {
  const { state } = useBookingContext();
  const step = state.step ?? 1;
// dispatch({ type: "RESET_BOOKING" })
  switch (step) {
    case 1:
      return <BookingStepOne />;

    case 2:
      return <BookingStepTwo />;

    case 3:
      return <BookingStepThree />;

      case 4:
        return <BookingStepFour />;

      return (
        <PricingReviewStep
          // onSuccess={() => dispatch({ type: "RESET_BOOKING" })}
        />
      );

    default:
      return null;
  }
};


export default BookingFlow;
