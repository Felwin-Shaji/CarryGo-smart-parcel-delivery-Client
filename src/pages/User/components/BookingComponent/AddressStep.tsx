// import { useEffect, useState } from "react";
// import { useBooking } from "../../../../Services/User/Booking/createBooking";
// import { useBookingContext } from "../../../../context/Booking/BookingContext";
// import BookingStepNav from "./BookingStepNav";
// import { useNavigate } from "react-router-dom";

// const AddressStep = () => {
//   const { getAddressesByPincode } = useBooking();
//   const { state, dispatch } = useBookingContext();
//   const navigate = useNavigate();

//   /* STEP GUARD */
//   if (state.step !== 3) return null;

//   useEffect(() => {
//     if (!state.fromPincode || !state.toPincode) {
//       dispatch({ type: "RESET_BOOKING" });
//     }
//   }, [state.fromPincode, state.toPincode]);
//   if (!state.fromPincode || !state.toPincode) return null;

//   const [pickupAddresses, setPickupAddresses] = useState<any[]>([]);
//   const [deliveryAddresses, setDeliveryAddresses] = useState<any[]>([]);
//   const [pickupId, setPickupId] = useState<string | null>(
//     state.pickupAddressId ?? null
//   );
//   const [deliveryId, setDeliveryId] = useState<string | null>(
//     state.deliveryAddressId ?? null
//   );
//   const [loading, setLoading] = useState(true);

//   /* Fetch addresses ONCE */
//   useEffect(() => {
//     let mounted = true;

//     setLoading(true);

//     Promise.all([
//       getAddressesByPincode(state.fromPincode!),
//       getAddressesByPincode(state.toPincode!),
//     ])
//       .then(([pickup, delivery]) => {
//         if (!mounted) return;
//         setPickupAddresses(pickup);
//         setDeliveryAddresses(delivery);
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => {
//       mounted = false;
//     };
//   }, [state.fromPincode, state.toPincode]);

//   const handleContinue = () => {
//     if (!pickupId || !deliveryId) return;

//     dispatch({ type: "SET_PICKUP_ADDRESS", payload: pickupId });
//     dispatch({ type: "SET_DELIVERY_ADDRESS", payload: deliveryId });
//     dispatch({ type: "SET_STEP", payload: 4 });
//   };

//   const canGoForward =
//     !!state.pickupAddressId && !!state.deliveryAddressId;

//   const handleBack = () => {
//     dispatch({ type: "SET_STEP", payload: 2 });
//   };

//   const handleForward = () => {
//     if (!canGoForward) return;
//     dispatch({ type: "SET_STEP", payload: 4 });
//   };

//   if (loading) {
//     return <p className="text-center mt-10">Loading addresses...</p>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-6 space-y-10">
//       {/* BACK */}
//       <BookingStepNav
//         canGoForward={canGoForward}
//         onBack={handleBack}
//         onForward={handleForward}
//       />
//       <button onClick={() =>
//         navigate("/add-address",
//           {
//             state:
//               { from: "BOOKING", for: "PICKUP", pincode: state.fromPincode, },
//           })
//       }
//         className="text-sm text-blue-600 underline" > + Add new pickup address </button>

//       {/* Pickup */}
//       <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
//         <h2 className="text-lg font-semibold">Pickup Address</h2>

//         {pickupAddresses.length === 0 && (
//           <p className="text-sm text-gray-500">No saved addresses</p>
//         )}

//         <div className="grid gap-3">
//           {pickupAddresses.map((addr) => (
//             <div
//               key={addr.id}
//               onClick={() => setPickupId(addr.id)}
//               className={`cursor-pointer rounded-lg border p-4 transition
//                 ${pickupId === addr.id
//                   ? "border-black bg-gray-50"
//                   : "border-gray-200"
//                 }`}
//             >
//               <p className="font-medium text-sm">{addr.label}</p>
//               <p className="text-xs text-gray-500">
//                 {addr.addressLine1}, {addr.city}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Delivery */}
//       <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
//         <h2 className="text-lg font-semibold">Delivery Address</h2>

//         {deliveryAddresses.length === 0 && (
//           <p className="text-sm text-gray-500">No saved addresses</p>
//         )}

//         <div className="grid gap-3">
//           {deliveryAddresses.map((addr) => (
//             <div
//               key={addr.id}
//               onClick={() => setDeliveryId(addr.id)}
//               className={`cursor-pointer rounded-lg border p-4 transition
//                 ${deliveryId === addr.id
//                   ? "border-black bg-gray-50"
//                   : "border-gray-200"
//                 }`}
//             >
//               <p className="font-medium text-sm">{addr.label}</p>
//               <p className="text-xs text-gray-500">
//                 {addr.addressLine1}, {addr.city}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CONTINUE */}
//       <button
//         disabled={!pickupId || !deliveryId}
//         onClick={handleContinue}
//         className={`w-full py-4 rounded-xl font-semibold transition
//           ${pickupId && deliveryId
//             ? "bg-black text-white"
//             : "bg-gray-200 text-gray-400 cursor-not-allowed"
//           }`}
//       >
//         Continue
//       </button>
//     </div>
//   );
// };

// export default AddressStep;
