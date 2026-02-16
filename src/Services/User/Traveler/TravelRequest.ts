import { API_USER } from "../../../constants_Types/apiRoutes";
import type { CreateTravelRequestDTO, TripDetailsUI } from "../../../constants_Types/types/User/Traveler/TravelerType";
import { useAxios } from "../../../hooks/useAxios"
import type { TravelRequestUI } from "../../../pages/User/Traveler/TravelerConponents/TravelerBookingContents";

export const useTravelRequest = () => {
    const axiosInstance = useAxios();

    const createTravelRequest = async (data: CreateTravelRequestDTO) => {
        await axiosInstance.post(API_USER.TRAVELER_REQUEST, data);
    };

    const getTravelRequestList = async () => {
        const response = await axiosInstance.get(API_USER.TRAVELER_REQUEST);
        return response.data.data as  TravelRequestUI[];
    };

    const getTripById = async (id: string) => {
        const response = await axiosInstance.get(`${API_USER.TRAVELER_REQUEST}/${id}`);
        return response.data.data as TripDetailsUI;
    }

    return {
        createTravelRequest,
        getTravelRequestList,
        getTripById
    };
} 