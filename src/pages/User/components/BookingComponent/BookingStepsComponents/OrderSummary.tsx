import { useState } from "react";
import type { CreateBookingPayload } from "../../../../../shared/constants_Types/types/User/Booking/createBookingType";
import { useBookingContext } from "../../../../../context/Booking/BookingContext";
import { openRazorpayCheckout } from "../../../../../Services/Payment/razorpay";
import { usePayment } from "../../../../../Services/Payment/usePayment";
import { useBooking } from "../../../../../Services/User/Booking/createBooking";
import BookingNavigation from "./BookingNavigation";
import toast from "react-hot-toast";

export function OrderSummary() {
  const { state, dispatch } = useBookingContext();
  const pickupCity = state.pickupAddress?.city;
  const deliveryCity = state.deliveryAddress?.city;
  const packageCategory = state.packageDetails?.category;
  const weight = state.packageDetails?.weightKg;
  const total = state.pricing?.totalPrice;

  const { createBooking } = useBooking();
  const { initiatePayment, verifyPayment, paymentCancelled } = usePayment();

  const [loading, setLoading] = useState(false);


  const partnerName =
    state.deliveryType === "AGENCY"
      ? state.serviceableAgencies?.find(
        (a) => a.agency.agencyId === state.partnerId
      )?.agency.name
      : state.serviceableTravelers?.find(
        (t) => t.traveler.travelerId === state.partnerId
      )?.traveler.name;

  const handleCheckout = async () => {
    try {
      if (
        !state.deliveryType ||
        !state.partnerId ||
        !state.pickupAddress ||
        !state.deliveryAddress ||
        !state.packageDetails ||
        !state.pricing
      ) {
        alert("Booking data incomplete");
        return;
      }

      setLoading(true);

      let payload: CreateBookingPayload;

      if (state.deliveryType === "TRAVELER") {
        payload = {
          deliveryType: "TRAVELER",
          partnerId: state.partnerId,
          travelRequestId: state.selectedTravelRequestId!,
          pickupAddress: state.pickupAddress,
          deliveryAddress: state.deliveryAddress,
          packageDetails: state.packageDetails,
        };
      } else {
        if(!state.selectedFromHubId || !state.selectedToHubId){
          toast.error("agency selected not found ")
          return 
        }
        payload = {
          deliveryType: "AGENCY",
          partnerId: state.partnerId,
          fromHubId:state.selectedFromHubId,
          toHubId:state.selectedToHubId,
          pickupAddress: state.pickupAddress,
          deliveryAddress: state.deliveryAddress,
          packageDetails: state.packageDetails,
        };
        console.log(payload,"00002222222000033333333")
      }

      // 1️⃣ Create booking
      const bookingRes = await createBooking(payload);
      const bookingId = bookingRes.bookingId;

      // 2️⃣ Initiate payment
      const order = await initiatePayment(bookingId);

      // 3️⃣ Open Razorpay
      openRazorpayCheckout({
        key: order.key,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        role: "user",

        title: "CarryGo Delivery",
        description: "Delivery booking payment",

        referenceId: bookingId,

        onSuccess: async (response) => {
          await verifyPayment(response, bookingId);
          dispatch({ type: "RESET_BOOKING" });
        },

        onFailure: async (error) => {
          await paymentCancelled(bookingId, error);
          dispatch({ type: "RESET_BOOKING" });
        }
      });

    } catch (err) {
      console.error("Checkout failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5 space-y-4">

      <p className="text-sm font-semibold">
        ORDER SUMMARY
      </p>

      <Row
        label="Route"
        value={`${pickupCity ?? "-"} → ${deliveryCity ?? "-"}`}
      />

      <Row
        label="Partner"
        value={partnerName}
      />

      <Row
        label="Package"
        value={packageCategory ?? "-"}
      />

      <Row
        label="Weight"
        value={weight ? `${weight} kg` : "-"}
      />

      <div className="border-t pt-3 flex justify-between text-base font-semibold">
        <span>Total</span>
        <span className="text-primary">₹{total ?? 0}</span>
      </div>

      <div className="space-y-3 pt-3">

        <BookingNavigation
          onBack={() => dispatch({ type: "SET_STEP", payload: 3 })}
          onReset={() => dispatch({ type: "RESET_BOOKING" })}
        />

        <button
          onClick={handleCheckout}
          disabled={!state.pricing || loading}
          className="w-full px-4 py-2 text-sm bg-primary text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Processing..." : "Checkout"}
        </button>

      </div>

    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between text-sm items-center">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value ?? "-"}</span>
    </div>
  );
}