import { useEffect, useState } from "react";
import { useBooking } from "../../../../Services/User/Booking/createBooking";
import { useBookingContext } from "../../../../context/Booking/BookingContext";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  onSuccess: () => void;
}

const AddressStep = ({ onSuccess }: Props) => {
  const location = useLocation()

  const navigate = useNavigate();

  const { getAddressesByPincode  } = useBooking();
  const { state, dispatch } = useBookingContext();

  const [pickupAddresses, setPickupAddresses] = useState<any[]>([]);
  const [deliveryAddresses, setDeliveryAddresses] = useState<any[]>([]);
  const [pickupId, setPickupId] = useState<string | null>(null);
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location.state?.refreshAddresses) return;
    if (!state.fromPincode || !state.toPincode) return

    setLoading(true);

    Promise.all([
      getAddressesByPincode(state.fromPincode),
      getAddressesByPincode(state.toPincode),
    ]).then(([pickup, delivery]) => {
      setPickupAddresses(pickup);
      setDeliveryAddresses(delivery);

      if (location.state.for === "PICKUP" && pickup.length > 0) {
        setPickupId(pickup[0].id);
      }

      if (location.state.for === "DELIVERY" && delivery.length > 0) {
        setDeliveryId(delivery[0].id);
      }
    }).finally(() => setLoading(false));
  }, [location.state]);


  /* Guards */
  useEffect(() => {
    if (!state.fromPincode || !state.toPincode) {
      dispatch({ type: "RESET_BOOKING" });
    }
  }, []);

  /* Fetch addresses */
  useEffect(() => {
    if (!state.fromPincode || !state.toPincode) return;

    setLoading(true);

    Promise.all([
      getAddressesByPincode(state.fromPincode),
      getAddressesByPincode(state.toPincode),
    ])
      .then(([pickup, delivery]) => {
        setPickupAddresses(pickup);
        setDeliveryAddresses(delivery);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleContinue = () => {
    if (!pickupId || !deliveryId) return;

    dispatch({ type: "SET_PICKUP_ADDRESS", payload: pickupId });
    dispatch({ type: "SET_DELIVERY_ADDRESS", payload: deliveryId });

    onSuccess();
  };

  if (loading) {
    return <p className="text-center mt-10">Loading addresses...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 space-y-10">
      <button
        onClick={() =>
          navigate("/add-address", {
            state: {
              from: "BOOKING",
              for: "PICKUP",
              pincode: state.fromPincode,
            },
          })
        }
        className="text-sm text-blue-600 underline"
      >
        + Add new pickup address
      </button>


      {/* Pickup Address */}
      <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Pickup Address</h2>

        {pickupAddresses.length === 0 && (
          <p className="text-sm text-gray-500">
            No saved addresses for this pincode
          </p>
        )}

        <div className="grid gap-3">
          {pickupAddresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => setPickupId(addr.id)}
              className={`cursor-pointer rounded-lg border p-4 transition
                ${pickupId === addr.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 bg-white"}
              `}
            >
              <p className="font-medium text-sm">{addr.label}</p>
              <p className="text-xs text-gray-500 mt-1">
                {addr.addressLine1}, {addr.city}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Address */}
      <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Delivery Address</h2>

        {deliveryAddresses.length === 0 && (
          <p className="text-sm text-gray-500">
            No saved addresses for this pincode
          </p>
        )}

        <div className="grid gap-3">
          {deliveryAddresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => {
                console.log(addr)
                return setDeliveryId(addr.id)
              }}
              className={`cursor-pointer rounded-lg border p-4 transition
                ${deliveryId === addr.id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 bg-white"}
              `}
            >
              <p className="font-medium text-sm">{addr.label}</p>
              <p className="text-xs text-gray-500 mt-1">
                {addr.addressLine1}, {addr.city},
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Continue */}
      <button
        disabled={!pickupId || !deliveryId}
        onClick={handleContinue}
        className={`w-full py-4 rounded-xl font-semibold transition
          ${pickupId && deliveryId
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"}
        `}
      >
        Continue
      </button>
    </div>
  );
};

export default AddressStep;
