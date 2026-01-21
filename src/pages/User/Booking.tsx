import { useState } from "react";
import BookingPincodeStep from "./components/BookingComponent/BookingPincodeStep";
import { Header } from "./components/Header";
// import HubAvailabilityStep from "./components/BookingComponent/HubAvailabilityStep";
// import PackageDetailsStep from "./components/BookingComponent/PackageDetailsStep";
import SelectDeleveryDetailsStep from "./components/BookingComponent/SelectDeleveryDetailsStep";
import { BookingProvider } from "../../context/Booking/BookingContext";
import AddressStep from "./components/BookingComponent/AddressStep";
import PricingReviewStep from "./components/BookingComponent/PricingReviewStep";

const Booking = () => {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BookingPincodeStep onSuccess={() => setStep(2)} />;
      case 2:
        return <SelectDeleveryDetailsStep onSuccess={() => setStep(3)} />;
      case 3:
        return <AddressStep onSuccess={() => setStep(4)} />;
      case 4:
        return <PricingReviewStep onSuccess={() => setStep(5)} />;
      default:
        return null;
    }
  };

  return (
    <BookingProvider>
      <Header isLoggedIn />
      <main className="pt-20 mt-10">{renderStep()}</main>
    </BookingProvider>
  );
};

export default Booking;
