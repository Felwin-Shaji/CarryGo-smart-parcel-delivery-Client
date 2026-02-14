import { API_USER } from "../../../constants_Types/apiRoutes";
import type { CreateTravelRequestDTO } from "../../../constants_Types/types/User/Traveler/TravelerType";
import { useAxios } from "../../../hooks/useAxios"

export const useTravelRequest = () => {
    const axiosInstance = useAxios();

    const createTravelRequest = async (data: CreateTravelRequestDTO) => {
        await axiosInstance.post(API_USER.TRAVELER_REQUEST, data);
    };

    return {
        createTravelRequest,
    };
} 