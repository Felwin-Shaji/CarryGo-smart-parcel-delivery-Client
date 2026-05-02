import toast from "react-hot-toast";
import { useAxios } from "../../hooks/useAxios";
import { API_HUB } from "../../shared/constants_Types/apiRoutes";
import type { GetHubProfileDTO, HubResetPasswordRequestDTO } from "../../shared/constants_Types/types/Hub/HubProfile";

export const useHubProfile = () => {

    const axiosInstance = useAxios();

    /**
     * Fetch logged-in Hub profile
     */
    const getHubProfile = async (): Promise<GetHubProfileDTO | null> => {
        const res = await axiosInstance.get(API_HUB.GET_PROFILE);

        toast.success(res.data?.message || "Profile fetched successfully");
        return res.data.data as GetHubProfileDTO;
    };

    /**       
     *    * Update hub profile (name, mobile)
     */
    const updateHubProfile = async (data: {
        name: string;
        mobile: string;
    }): Promise<GetHubProfileDTO> => {
        const res = await axiosInstance.put(API_HUB.UPDATE_PROFILE, data);
        toast.success(res.data?.message || "Profile updated successfully");
        return res.data.data as GetHubProfileDTO;
    };
    /**
     * Reset Hub password
     */
    const resetHubPassword = async (

        data: HubResetPasswordRequestDTO
    ): Promise<void> => {
        const res = await axiosInstance.put(
            API_HUB.RESET_PASSWORD,
            data
        );
        toast.success(res.data?.message || "Password reset successfully");
        return;
    }
    return {
        getHubProfile,
        updateHubProfile,
        resetHubPassword,
    };
}