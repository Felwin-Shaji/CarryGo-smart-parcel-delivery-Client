import type { BookingState } from "./Booking.types";

const KEY = "BOOKING_STATE_V1";

export const saveBookingState = (state: BookingState) => {
  sessionStorage.setItem(KEY, JSON.stringify(state));
};

export const loadBookingState = (): BookingState | null => {
  const raw = sessionStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearBookingState = () => {
  sessionStorage.removeItem(KEY);
};
