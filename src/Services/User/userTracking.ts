import { API_USER } from "../../constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios";

export const useUserTracking = () => {
    const axiosInstance = useAxios();

    const getAgencyTracking = async (bookingId: string) => {
        const res = await axiosInstance.get(
            `${API_USER.TRACKING}/${bookingId}`
        );

        return res.data.data;
    };

    const getTravelerTracking = async (bookingId: string) => {
        const res = await axiosInstance.get(
            `${API_USER.TRACKING}/${bookingId}`
        );

        return res.data.data;
    };

    return {
        getAgencyTracking,
        getTravelerTracking,
    };
};