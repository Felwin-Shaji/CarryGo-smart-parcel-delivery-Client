import toast from "react-hot-toast";
import { useAxios } from "../../hooks/useAxios";
import { API_ADMIN } from "../../constants_Types/apiRoutes";
import type { AdminResetPasswordRequestDTO, GetAdminProfileDTO } from "../../constants_Types/types/Admin/AdminProfile.dto";

export const useAdminProfile = () => {
    const axiosInstance = useAxios();

    /**
     * Fetch logged-in admin profile
     */
    const getAdminProfile = async (): Promise<GetAdminProfileDTO | null> => {

        const res = await axiosInstance.get(API_ADMIN.GET_PROFILE);

        toast.success(res.data?.message || "Profile fetched successfully");

        return res.data.data as GetAdminProfileDTO;


    };

    /**
     * Update admin profile (name, mobile)
     */
    const updateAdminProfile = async (data: {
        name: string;
        mobile: string;
    }): Promise<GetAdminProfileDTO> => {

        const res = await axiosInstance.put(API_ADMIN.UPDATE_PROFILE, data);
        toast.success(res.data?.message || "Profile updated successfully");
        return res.data.data as GetAdminProfileDTO;

    };

    /**
     * Reset admin password
     */
    const resetAdminPassword = async (
        data: AdminResetPasswordRequestDTO
    ): Promise<void> => {
        const res = await axiosInstance.put(
            API_ADMIN.RESET_PASSWORD,
            data
        );
        toast.success(res.data?.message || "Password reset successfully");
        return;
    };

    return {
        getAdminProfile,
        updateAdminProfile,
        resetAdminPassword,
    };
};
