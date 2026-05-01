import { API_USER } from "../../../shared/constants_Types/apiRoutes";
import { useAxios } from "../../../hooks/useAxios";
import type { BookingDetailsUI, PricingResponseDTO, BookingListResponse, getServiceableHubWithAgencyDTO, getServiceableTravelerDTO } from "../../../shared/constants_Types/types/User/Booking/bookingResponse.dto";
import type { CalculatePricePayload, CreateBookingPayload } from "../../../shared/constants_Types/types/User/Booking/createBookingType";
import type { BookingFilterParams } from "../../../pages/User/UserBookingList";
import type { AddressUI } from "../../../context/Booking/Booking.types";

export const useBooking = () => {
    const axiosInstance = useAxios();

    const checkServiceableAgency = async (
        pickupLocation: { lat: number; lng: number },
        deliveryLocation: { lat: number; lng: number },
    ) => {
        const res = await axiosInstance.post(API_USER.SERVICEABLE_AGENCIES, {
            pickupLocation,
            deliveryLocation,
        });


        return res.data.data as getServiceableHubWithAgencyDTO[]
        // {
        //     data: getServiceableHubWithAgencyDTO[];
        //     page: number;
        //     total: number;
        //     totalPages: number;
        // };
    };

    const checkServiceableTraveler = async (
        pickupLocation: { lat: number; lng: number },
        deliveryLocation: { lat: number; lng: number },
        page: number = 1,
        limit: number = 5
    ) => {
        const res = await axiosInstance.post(API_USER.SERVICEABLE_TRAVELERS, {
            pickupLocation,
            deliveryLocation,
            page,
            limit,
        });


        return res.data.data as {
            data: getServiceableTravelerDTO[];
            page: number;
            total: number;
            totalPages: number;
        };
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
        return res.data.data as BookingListResponse
    };

    const getBookingById = async (id: string): Promise<BookingDetailsUI> => {
        const res = await axiosInstance.get(`${API_USER.BOOKING}/${id}`);

        return res.data.data as BookingDetailsUI
    }

    return {
        checkServiceableAgency,
        checkServiceableTraveler,
        getUserAddresses,
        getPricing,
        createBooking,
        listBooking,
        getBookingById
    };
}