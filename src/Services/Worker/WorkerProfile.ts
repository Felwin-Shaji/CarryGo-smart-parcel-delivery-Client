
import toast from "react-hot-toast";
import { useAxios } from "../../hooks/useAxios";
import { API_WORKER } from "../../shared/constants_Types/apiRoutes";
import type { GetWorkerProfileDTO, WorkerResetPasswordRequestDTO } from "../../shared/constants_Types/types/Worker/WorkerProfile.dto";

export const useWorkerProfile = () => {

    const axiosInstance = useAxios();

    /**
     * Fetch logged-in Worker profile
     */
    const getWorkerProfile = async (): Promise<GetWorkerProfileDTO | null> => {
        const res = await axiosInstance.get(API_WORKER.GET_PROFILE);

        toast.success(res.data?.message || "Profile fetched successfully");
        return res.data.data as GetWorkerProfileDTO;
    };

    /**       
     *    * Update worker profile (name, mobile)
     */
    const updateWorkerProfile = async (data: {
        name: string;
        mobile: string;
    }): Promise<GetWorkerProfileDTO> => {
        const res = await axiosInstance.put(API_WORKER.UPDATE_PROFILE, data);
        toast.success(res.data?.message || "Profile updated successfully");
        return res.data.data as GetWorkerProfileDTO;
    };
    /**
     * Reset Worker password
     */
    const resetWorkerPassword = async (

        data: WorkerResetPasswordRequestDTO
    ): Promise<void> => {
        const res = await axiosInstance.put(
            API_WORKER.RESET_PASSWORD,
            data
        );
        toast.success(res.data?.message || "Password reset successfully");
        return;
    }
    return {
        getWorkerProfile,
        updateWorkerProfile,
        resetWorkerPassword,
    };
}