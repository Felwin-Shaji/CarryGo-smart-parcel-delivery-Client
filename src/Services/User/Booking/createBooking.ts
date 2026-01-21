import toast from "react-hot-toast";
import { API_USER } from "../../../constants_Types/apiRoutes";
import { useAxios } from "../../../hooks/useAxios";
import type { AddressDTO, getServiceableHubWithAgencyResponseDTO, PricingResponseDTO } from "../../../constants_Types/types/User/Booking/bookingResponse.dto";

export interface CalculatePricePayload {
    deliveryType: "AGENCY" | "TRAVELER";
    partnerId?: string;
    packageDetails: {
        category: string;
        size: string;
        weightKg: number;
    };
    pickupAddressId: string;
    deliveryAddressId: string;
}


export const useBooking = () => {
    const axiosInstance = useAxios();

    const isPincodeValied = async (values: { fromPincode: string, toPincode: string }) => {
        const res = await axiosInstance.post(API_USER.BOOKING_PINCODE_VALIDATE, values);

        if (res.data.success) toast.success("Picode is avilable ");
        return res.data.data as getServiceableHubWithAgencyResponseDTO[];
    };

    const getServiceableAgencies = async (
        fromPincode: string,
        toPincode: string
    ): Promise<getServiceableHubWithAgencyResponseDTO[]> => {

        const res = await axiosInstance.get(
            API_USER.SERVICEABLE_AGENCIES,
            { params: { fromPincode, toPincode } }
        );

        return res.data.data;
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

        return res.data.data;
    };



    return {
        isPincodeValied,
        getServiceableAgencies,
        getAddressesByPincode,
        getPricing
    };
}