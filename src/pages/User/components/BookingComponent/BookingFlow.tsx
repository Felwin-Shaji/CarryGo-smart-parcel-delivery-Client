
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import BookingStepOne from "./BookingStepOne";
import BookingStepTwo from "./BookingStepTwo";
import BookingStepThree from "./BookingStepThree";
import BookingStepFour from "./BookingStepFour";


const BookingFlow = () => {
  const { state } = useBookingContext();
  const step = state.step ?? 1;

  switch (step) {
    case 1:
      return <BookingStepOne />;

    case 2:
      return <BookingStepTwo />;

    case 3:
      return <BookingStepThree />;

    case 4:
      return <BookingStepFour />;

    default:
      return <BookingStepOne />;
  }
};


export default BookingFlow;
