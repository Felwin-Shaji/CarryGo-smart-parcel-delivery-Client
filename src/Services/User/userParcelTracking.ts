import { API_USER } from "../../constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios";

export const useUserParcelTracking = () => {
    const axiosInstance = useAxios();

    const getUserParcelTracking = async (bookingId: string) => {
        const res = await axiosInstance.get(`${API_USER.TRACKING}/${bookingId}`);

        return res.data.data;
    }

    return {
        getUserParcelTracking
    }   

}