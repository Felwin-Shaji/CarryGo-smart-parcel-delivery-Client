import { API_USER } from "../../../constants_Types/apiRoutes";
import { useAxios } from "../../../hooks/useAxios";
import type { AddressDTO, BookingDetailsUI, ServiceableAgencyAndTravelerDTO, PricingResponseDTO, BookingListResponse } from "../../../constants_Types/types/User/Booking/bookingResponse.dto";
import type { CalculatePricePayload, CreateBookingPayload } from "../../../constants_Types/types/User/Booking/createBookingType";
import type { BookingFilterParams } from "../../../pages/User/UserBookingList";

export const useBooking = () => {
    const axiosInstance = useAxios();

    const validatePincode = async (values: { fromPincode: string, toPincode: string }) => {
        const res = await axiosInstance.post(API_USER.BOOKING_PINCODE_VALIDATE, values);

        if (!res.data.success) {
            throw new Error("Pincode not serviceable");
        }
        return res.data.data as ServiceableAgencyAndTravelerDTO;
    };

    const getAddressesByPincode = async (
        pincode: string
    ): Promise<AddressDTO[]> => {
        const res = await axiosInstance.get(
            API_USER.USER_ADDRESSES,
            { params: { pincode } }
        );

        return res.data.data;
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
        validatePincode,
        getAddressesByPincode,
        getPricing,
        createBooking,
        listBooking,
        getBookingById
    };
}