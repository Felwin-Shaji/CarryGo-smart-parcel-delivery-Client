import { BookingProvider } from "../../context/Booking/BookingContext";
import BookingFlow from "./components/BookingComponent/BookingFlow";
import { Header } from "./components/Header";


const Booking = () => {

  return (
    <BookingProvider>
      <Header isLoggedIn />
      <main className="pt-20 mt-10"><BookingFlow /></main>
    </BookingProvider>
  );
};

export default Booking;
