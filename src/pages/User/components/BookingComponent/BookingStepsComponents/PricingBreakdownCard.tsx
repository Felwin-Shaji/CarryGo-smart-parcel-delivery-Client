import { useBookingContext } from "../../../../../context/Booking/BookingContext";

export default function PricingBreakdownCard() {
  const { state } = useBookingContext();

  const pricing = state.pricing;

  if (!pricing) {
    return (
      <div className="bg-white border rounded-xl p-5">
        <p className="text-sm text-gray-400">Pricing not available</p>
      </div>
    );
  }

  const {
    basePrice,
    distanceCharge,
    volumetricCharge,
    platformFee,
    totalPrice,
  } = pricing;

  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm font-semibold mb-4">
        PRICING BREAKDOWN
      </p>

      <div className="space-y-2 text-sm">

        <Row label="Base Price" value={`₹${basePrice}`} />

        <Row label="Distance Charge" value={`₹${distanceCharge}`} />

        <Row label="Volumetric Charge" value={`₹${volumetricCharge}`} />

        <Row label="Platform Fee" value={`₹${platformFee}`} />

        <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>₹{totalPrice}</span>
        </div>

      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}