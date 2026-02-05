import { API_USER } from "../../../constants_Types/apiRoutes";
import { useAxios } from "../../../hooks/useAxios";
import type { AddressDTO, getServiceableHubWithAgencyResponseDTO, PricingResponseDTO } from "../../../constants_Types/types/User/Booking/bookingResponse.dto";

export interface CalculatePricePayload {
    deliveryType: "AGENCY" | "TRAVELER";
    partnerId: string;
    packageDetails: {
        category: string;
        size: string;
        weightKg: number;
    };
    pickupAddressId: string;
    deliveryAddressId: string;
}

export interface CreateBookingPayload {
    deliveryType: "AGENCY" | "TRAVELER";

    partnerId?: string;

    pickupAddressId: string;
    deliveryAddressId: string;

    packageDetails: {
        category: string;
        size: "SMALL" | "MEDIUM" | "LARGE";
        weightKg: number;
    };
}

export const useBooking = () => {
    const axiosInstance = useAxios();

    const validatePincode = async (values: { fromPincode: string, toPincode: string }) => {
        const res = await axiosInstance.post(API_USER.BOOKING_PINCODE_VALIDATE, values);

        if (!res.data.success) {
            throw new Error("Pincode not serviceable");
        }
        return res.data.data as getServiceableHubWithAgencyResponseDTO[];
    };

    // const getServiceableAgencies = async (
    //     fromPincode: string,
    //     toPincode: string
    // ): Promise<getServiceableHubWithAgencyResponseDTO[]> => {

    //     const res = await axiosInstance.get(
    //         API_USER.SERVICEABLE_AGENCIES,
    //         { params: { fromPincode, toPincode } }
    //     );

    //     return res.data.data;
    // };

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

        return res.data.data;
    };


    const createBooking = async (
        payload: CreateBookingPayload
    ): Promise<{ bookingId: string }> => {
        const res = await axiosInstance.post(API_USER.BOOKING, payload);
        return res.data.data;
    };

    return {
        validatePincode,
        // getServiceableAgencies,
        getAddressesByPincode,
        getPricing,
        createBooking
    };
}