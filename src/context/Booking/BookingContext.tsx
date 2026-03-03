import { createContext, useContext, useEffect, useReducer } from "react";
import type { AddressUI, BookingState, DeliveryType, PackagePayload } from "./Booking.types";
import { clearBookingState, loadBookingState, saveBookingState } from "./bookingStorage";
import type { getServiceableHubWithAgencyDTO, getServiceableTravelerDTO } from "../../constants_Types/types/User/Booking/bookingResponse.dto";

type BookingContextValue = {
  state: BookingState;
  dispatch: React.Dispatch<Action>;
};


type Action =
  | { type: "SET_ADDRESS"; payload: { slot: "PICKUP" | "DELIVERY"; address: AddressUI } }
  | { type: "SET_SERVICEABILITY"; payload: { agencies: getServiceableHubWithAgencyDTO[]; travelers: getServiceableTravelerDTO[]; } }
  | { type: "SET_DELIVERY_TYPE"; payload: DeliveryType }
  | { type: "SELECT_AGENCY"; payload: { agencyId: string; fromHubId: string; toHubId: string } }
  | { type: "SELECT_TRAVELER"; payload: { travelerId: string; travelRequestId: string } }
  | { type: "SET_PACKAGE_DETAILS"; payload: PackagePayload }
  | { type: "SET_PRICING"; payload: BookingState["pricing"] }
  | { type: "SET_STEP"; payload: 1 | 2 | 3 }
  | { type: "RESET_BOOKING" };

const initialState: BookingState =
  loadBookingState() ?? {};

const BookingContext = createContext<BookingContextValue | null>(null);

const reducer = (state: BookingState, action: Action): BookingState => {
  switch (action.type) {

    case "SET_ADDRESS":
      return {
        ...state,
        pickupAddress:
          action.payload.slot === "PICKUP"
            ? action.payload.address
            : state.pickupAddress,
        deliveryAddress:
          action.payload.slot === "DELIVERY"
            ? action.payload.address
            : state.deliveryAddress,
      };

    case "SET_SERVICEABILITY":
      return {
        ...state,
        serviceableAgencies: action.payload.agencies,
        serviceableTravelers: action.payload.travelers,
        step: 2,
      };

    case "SET_DELIVERY_TYPE":
      return {
        ...state,
        deliveryType: action.payload,
        partnerId: undefined,
        selectedFromHubId: undefined,
        selectedToHubId: undefined,
        selectedTravelRequestId: undefined,
      };

    case "SELECT_AGENCY":
      return {
        ...state,
        deliveryType: "AGENCY",
        partnerId: action.payload.agencyId,
        selectedFromHubId: action.payload.fromHubId,
        selectedToHubId: action.payload.toHubId,
        selectedTravelRequestId: undefined,
      };

    case "SELECT_TRAVELER":
      return {
        ...state,
        deliveryType: "TRAVELER",
        partnerId: action.payload.travelerId,
        selectedTravelRequestId: action.payload.travelRequestId,
        selectedFromHubId: undefined,
        selectedToHubId: undefined,
      };

    case "SET_PACKAGE_DETAILS":
      return {
        ...state,
        packageDetails: action.payload,
      };

    case "SET_PRICING":
      return {
        ...state,
        pricing: action.payload,
        step: 3,
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
