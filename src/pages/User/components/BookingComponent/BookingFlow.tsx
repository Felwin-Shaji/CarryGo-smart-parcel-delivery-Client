
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import SelectDeleveryDetailsStep from "./SelectDeleveryDetailsStep";
import BookingPincodeStep from "./BookingPincodeStep";
import AddressStep from "./AddressStep";
import PricingReviewStep from "./PricingReviewStep";


const BookingFlow = () => {
  const { state, dispatch } = useBookingContext();
  const step = state.step ?? 1;

  switch (step) {
    case 1:
      return <BookingPincodeStep />;

    case 2:
      return <SelectDeleveryDetailsStep />;

    case 3:
      return <AddressStep />;

    case 4:
        // dispatch({ type: "RESET_BOOKING" })
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
