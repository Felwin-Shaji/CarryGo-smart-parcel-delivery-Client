import { API_USER } from "../../../constants_Types/apiRoutes";
import { useAxios } from "../../../hooks/useAxios";
import type { BookingDetailsUI, ServiceableAgencyAndTravelerDTO, PricingResponseDTO, BookingListResponse } from "../../../constants_Types/types/User/Booking/bookingResponse.dto";
import type { CalculatePricePayload, CreateBookingPayload } from "../../../constants_Types/types/User/Booking/createBookingType";
import type { BookingFilterParams } from "../../../pages/User/UserBookingList";
import type { AddressUI } from "../../../context/Booking/Booking.types";

export const useBooking = () => {
    const axiosInstance = useAxios();

    const checkServiceablePartners = async (
        pickupLocation: { lat: number; lng: number },
        deliveryLocation: { lat: number; lng: number }
    ) => {
        const res = await axiosInstance.post(
            API_USER.CHECK_SERVICEABLE,
            {
                pickupLocation,
                deliveryLocation,
            }
        );

        return res.data.data as ServiceableAgencyAndTravelerDTO;
    };

    const getUserAddresses = async (): Promise<AddressUI[]> => {
        const res = await axiosInstance.get(
            API_USER.USER_ADDRESSES,
        );

        return res.data.data as AddressUI[];
    };

    const getPricing = async (
        payload: CalculatePricePayload
    ): Promise<PricingResponseDTO> => {
        const res = await axiosInstance.post(
            API_USER.BOOKING_PRICING,
            payload
        );

        return res.data.data as PricingResponseDTO;
    };


    const createBooking = async (
        payload: CreateBookingPayload
    ): Promise<{ bookingId: string }> => {
        const res = await axiosInstance.post(API_USER.BOOKING, payload);
        return res.data.data;
    };

    const listBooking = async (
        params: BookingFilterParams
    ): Promise<BookingListResponse> => {
        const res = await axiosInstance.get(
            API_USER.BOOKING,
            {
                params,
            }
        );

        console.log(res.data.data)

        return res.data.data as BookingListResponse
    };

    const getBookingById = async (bookingId: string): Promise<BookingDetailsUI> => {
        const res = await axiosInstance.get(`${API_USER.BOOKING}/${bookingId}`);

        return res.data.data as BookingDetailsUI
    }

    return {
        // validatePincode,
        checkServiceablePartners,
        getUserAddresses,
        getPricing,
        createBooking,
        listBooking,
        getBookingById
    };
}