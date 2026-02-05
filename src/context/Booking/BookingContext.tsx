import { createContext, useContext, useEffect, useReducer } from "react";
import type { BookingState, DeliveryType, PackagePayload } from "./Booking.types";
import { clearBookingState, loadBookingState, saveBookingState } from "./bookingStorage";
import type { getServiceableHubWithAgencyResponseDTO } from "../../constants_Types/types/User/Booking/bookingResponse.dto";

type BookingContextValue = {
  state: BookingState;
  dispatch: React.Dispatch<Action>;
};


type Action =
  // | { type: "SET_PINCODES"; payload: { fromPincode: string; toPincode: string } }
  | { type: "PINCODE_VERIFIED"; payload: { fromPincode: string; toPincode: string; options: getServiceableHubWithAgencyResponseDTO[] } } ////////////////
  | { type: "SET_DELIVERY_TYPE"; payload: DeliveryType } //////////////////////////////
  | { type: "SELECT_AGENCY"; payload: { agencyId: string; fromHubId: string; toHubId: string } }/////////////
  // | { type: "SET_PARTNER"; payload: PartnerPayload }
  | { type: "SET_PACKAGE_DETAILS"; payload: PackagePayload }
  | { type: "SET_PICKUP_ADDRESS"; payload: string }
  | { type: "SET_DELIVERY_ADDRESS"; payload: string }
  | { type: "SET_STEP"; payload: 1 | 2 | 3 | 4 }
  | { type: "RESET_BOOKING" };

const initialState: BookingState =
  loadBookingState() ?? {};

const BookingContext = createContext<BookingContextValue | null>(null);

const reducer = (state: BookingState, action: Action): BookingState => {
  switch (action.type) {
    case "PINCODE_VERIFIED":
      return {
        step: 2,
        fromPincode: action.payload.fromPincode,
        toPincode: action.payload.toPincode,
        serviceableOptions: action.payload.options,

        deliveryType: undefined,
        partnerId: undefined,
        selectedFromHubId: undefined,
        selectedToHubId: undefined,

        packageDetails: undefined,
        pickupAddressId: undefined,
        deliveryAddressId: undefined,
      };

    case "SET_DELIVERY_TYPE":
      return {
        ...state,
        deliveryType: action.payload,
        partnerId: undefined,
        selectedFromHubId: undefined,
        selectedToHubId: undefined,
      };

    case "SELECT_AGENCY":
      return {
        ...state,
        deliveryType: "AGENCY",
        partnerId: action.payload.agencyId,
        selectedFromHubId: action.payload.fromHubId,
        selectedToHubId: action.payload.toHubId,
      };


    case "SET_PACKAGE_DETAILS":
      return {
        ...state,
        packageDetails: action.payload,
      };

    case "SET_PICKUP_ADDRESS":
      return {
        ...state,
        pickupAddressId: action.payload,
      };

    case "SET_DELIVERY_ADDRESS":
      return {
        ...state,
        deliveryAddressId: action.payload,
      };

    case "SET_STEP":
      return {
        ...state,
        step: action.payload,
      };

    case "RESET_BOOKING":
      clearBookingState();
      return { step: 1 };

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
