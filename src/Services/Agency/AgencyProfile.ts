import toast from "react-hot-toast";
import { API_AGENCY } from "../../shared/constants_Types/apiRoutes";
import type { AgencyResetPasswordRequestDTO, GetAgencyProfileDTO } from "../../shared/constants_Types/types/Agency/AgencyProfile.dto";
import { useAxios } from "../../hooks/useAxios";

export const useAgencyProfile = () => {

    const axiosInstance = useAxios();

    /**
     * Fetch logged-in agency profile
     */
    const getAgencyProfile = async (): Promise<GetAgencyProfileDTO | null> => {
        const res = await axiosInstance.get(API_AGENCY.GET_PROFILE);

        return res.data.data as GetAgencyProfileDTO;
    };

    /**       
     *    * Update agency profile (name, mobile)
     */
    const updateAgencyProfile = async (data: {
        name: string;
        mobile: string;
    }): Promise<GetAgencyProfileDTO> => {
        const res = await axiosInstance.put(API_AGENCY.UPDATE_PROFILE, data);
        toast.success(res.data?.message || "Profile updated successfully");
        return res.data.data as GetAgencyProfileDTO;
    };
    /**
     * Reset agency password
     */
    const resetAgencyPassword = async (

        data: AgencyResetPasswordRequestDTO
    ): Promise<void> => {
        const res = await axiosInstance.put(
            API_AGENCY.RESET_PASSWORD,
            data
        );
        toast.success(res.data?.message || "Password reset successfully");
        return;
    }
    return {
        getAgencyProfile,
        updateAgencyProfile,
        resetAgencyPassword,
    };
}