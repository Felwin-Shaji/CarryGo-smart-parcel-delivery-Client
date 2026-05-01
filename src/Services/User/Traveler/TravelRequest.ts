import { API_USER } from "../../../shared/constants_Types/apiRoutes";
import type { BookingListResponse } from "../../../shared/constants_Types/types/User/Booking/bookingResponse.dto";
import type { CreateTravelRequestDTO, TripDetailsUI } from "../../../shared/constants_Types/types/User/Traveler/TravelerType";
import { useAxios } from "../../../hooks/useAxios"
import type { PaginatedTravelRequestResponse, TravelRequestListParams } from "../../../pages/User/Traveler/TravelerConponents/TravelerTravelRequestList";

export const useTravelRequest = () => {
    const axiosInstance = useAxios();

    const createTravelRequest = async (data: CreateTravelRequestDTO) => {
        await axiosInstance.post(API_USER.TRAVELER_REQUEST, data);
    };

    const getTravelRequestList = async (
        params?: TravelRequestListParams
    ): Promise<PaginatedTravelRequestResponse> => {

        const response = await axiosInstance.get(API_USER.TRAVELER_REQUEST, {
            params
        });

        return response.data.data;
    };

    const getBookingsForTravelRequest = async (id: string): Promise<BookingListResponse> => {
        const response = await axiosInstance.get(`${API_USER.TRAVELER_REQUEST}/${id}/bookings`);

        return response.data.data
    }

    const getTripById = async (id: string) => {
        const response = await axiosInstance.get(`${API_USER.TRAVELER_REQUEST}/${id}`);
        return response.data.data as TripDetailsUI;
    }

    const updateOrderStatus = async (orderId: string, status: string) => {
        const response = await axiosInstance.patch(
            `${API_USER.TRAVELER_REQUEST}/order/${orderId}/status`,
            { status }
        );

        return response.data.data;
    };

    return {
        createTravelRequest,
        getTravelRequestList,
        getTripById,
        getBookingsForTravelRequest,
        updateOrderStatus
    };
} 