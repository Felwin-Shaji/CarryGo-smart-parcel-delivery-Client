import { API_AGENCY } from "../../constants_Types/apiRoutes";
import type { KYCStatus } from "../../constants_Types/types/roles";
import type { GetWorkerOverviewResponseDTO } from "../../constants_Types/types/Worker/workerRequest.dto";
import { useAxios } from "../../hooks/useAxios";

export const useAgencyHubWorker = () => {
    const axiosInstance = useAxios();

    const getAgencyHubWorker = async (id: string) => {
        const res = await axiosInstance.get(`${API_AGENCY.GET_HUBS_WORKER}/${id}`);
        return res.data.data as GetWorkerOverviewResponseDTO;
    };

    /**
   * Update worker KYC status (approve / reject)
   */
    const updateWorkerKycStatus = async (
        id: string,
        status: KYCStatus,
        rejectReason?: string
    ) => {
        const res = await axiosInstance.patch(
            `${API_AGENCY.GET_HUBS_WORKER}/${id}/kyc-status`,
            { status, rejectReason }
        );

        return res.data;
    };

    return {
        getAgencyHubWorker,
        updateWorkerKycStatus
    };
};