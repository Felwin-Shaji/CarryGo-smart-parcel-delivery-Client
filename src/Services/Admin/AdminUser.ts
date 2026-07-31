import { API_ADMIN } from "../../shared/constants_Types/apiRoutes";
import type { UserWithKYCResponseDTO } from "../../shared/constants_Types/types/Admin/AdminUserTypes";
import { useAxios } from "../../hooks/useAxios";

export const useAdminUser = () => {
    const axqiosInstance = useAxios();

    const getUserOverview = async (userId: string) => {

        const response = await axqiosInstance.get(
            `${API_ADMIN.GET_USERS}/${userId}`
        );

        return response.data.data as UserWithKYCResponseDTO;
    };

    const updateUserKycStatus = async (userId: string, kycStatus: string, rejectReason?: string) => {

        const response = await axqiosInstance.patch(
            `${API_ADMIN.GET_USERS}/${userId}/kyc-status`,
            { kycStatus, rejectReason }
        )

        return response.data.data as { success: boolean; message: string };
    }

    return { getUserOverview, updateUserKycStatus };
};