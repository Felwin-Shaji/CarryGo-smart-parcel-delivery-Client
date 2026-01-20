import toast from "react-hot-toast";
import { API_ADMIN } from "../../constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios";
import type { GetHubOverviewResponseDTO } from "../../constants_Types/types/Agency/HubOverview.type";
import type { KYCStatus } from "../../constants_Types/types/roles";

export const useAdminHub = () => {
    const axiosInstance = useAxios();

    const getHubDetailsById = async (hubId: string) => {
        const res = await axiosInstance.get(`${API_ADMIN.GET_AGENCY_HUB}/${hubId}`);
        // if (res.data.success) toast.success(res.data.message);

        const hub = res.data.data.hub;
        const workers = res.data.data.workers

        return { hub, workers } as GetHubOverviewResponseDTO
    };

    const updateHubKycStatus = async (hubId: string, status: KYCStatus, reason?: String) => {
        await axiosInstance.patch(
            `${API_ADMIN.GET_AGENCY_HUB}/${hubId}`,
            { status, reason },
        );
    }

    return {
        getHubDetailsById,
        updateHubKycStatus
    }
}