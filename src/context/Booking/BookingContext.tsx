import { createContext, useContext, useEffect, useReducer } from "react";
import type { BookingState, DeliveryType, PackagePayload, PartnerPayload } from "./Booking.types";
import { clearBookingState, loadBookingState, saveBookingState } from "./bookingStorage";

type BookingContextValue = {
  state: BookingState;
  dispatch: React.Dispatch<Action>;
};


type Action =
  | { type: "SET_PINCODES"; payload: { fromPincode: string; toPincode: string } }
  | { type: "SET_DELIVERY_TYPE"; payload: DeliveryType }
  | { type: "SET_PARTNER"; payload: PartnerPayload }
  | { type: "SET_PACKAGE_DETAILS"; payload: PackagePayload }
  | { type: "SET_PICKUP_ADDRESS"; payload: string }
  | { type: "SET_DELIVERY_ADDRESS"; payload: string }
  | { type: "RESET_BOOKING" };

const initialState: BookingState =
  loadBookingState() ?? {};

const BookingContext = createContext<BookingContextValue | null>(null);

const reducer = (state: BookingState, action: Action): BookingState => {
  switch (action.type) {
    case "SET_PINCODES":
      return { ...state, ...action.payload };

    case "SET_DELIVERY_TYPE":
      return { ...state, deliveryType: action.payload };

    case "SET_PARTNER":
      return { ...state, selectedPartner: action.payload };

    case "SET_PACKAGE_DETAILS":
      return { ...state, packageDetails: action.payload };

    case "SET_PICKUP_ADDRESS":
      return { ...state, pickupAddressId: action.payload };

    case "SET_DELIVERY_ADDRESS":
      return { ...state, deliveryAddressId: action.payload };

    case "RESET_BOOKING":
      clearBookingState();
      return {};

    default:
      return state;
  }
};

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', state);

  useEffect(() => {
    saveBookingState(state);
  }, [state]);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookingContext must be used inside BookingProvider");
  return ctx;
};
