import { useState } from "react";
import AddressStep from "./components/BookingComponent/AddressStep";
import BookingPincodeStep from "./components/BookingComponent/BookingPincodeStep";
import { Header } from "./components/Header";
import HubAvailabilityStep from "./components/BookingComponent/HubAvailabilityStep";
import PackageDetailsStep from "./components/BookingComponent/PackageDetailsStep";

const Booking = () => {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BookingPincodeStep onSuccess={() => setStep(2)} />;
      case 2:
        return <AddressStep onSuccess={() => setStep(3)} />;
      case 3:
        return <HubAvailabilityStep onSuccess={() => setStep(4)} />;
      case 4:
        return <PackageDetailsStep onSuccess={() => setStep(5)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header isLoggedIn />

      <main className="pt-20 mt-10">
        {renderStep()}
      </main>
    </>
  );
};

export default Booking;
