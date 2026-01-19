import { createContext, useContext, useReducer } from "react";
import type { BookingState, DeliveryType } from "./Booking.types";


type Action =
  | { type: "SET_PINCODES"; payload: { fromPincode: string; toPincode: string } }
  | { type: "SET_DELIVERY_TYPE"; payload: DeliveryType }
  | { type: "SET_PARTNER"; payload: any }
  | { type: "SET_PACKAGE_DETAILS"; payload: any }
  | { type: "RESET_BOOKING" };

const initialState: BookingState = {};

const BookingContext = createContext<any>(null);

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

    case "RESET_BOOKING":
      return {};

    default:
      return state;
  }
};

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',state);

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
