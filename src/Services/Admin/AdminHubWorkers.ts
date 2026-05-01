import { API_ADMIN } from "../../shared/constants_Types/apiRoutes";
import type { GetWorkerOverviewResponseDTO } from "../../shared/constants_Types/types/Worker/workerRequest.dto";
import { useAxios } from "../../hooks/useAxios";

export const useAdminHubWorkers = () => {
    const axiosInstance = useAxios();

    const getWorkerById = async (id:string)=>{
        const res = await axiosInstance.get(`${API_ADMIN.AGENCY_HUB_WORKER}/${id}`);

        return res.data.data as GetWorkerOverviewResponseDTO
    }

    return {getWorkerById}
}