import toast from "react-hot-toast";
import { API_AGENCY, API_HUB } from "../../shared/constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios";
import type { GetHubOverviewResponseDTO, GetHubWorkersResponseDTO } from "../../shared/constants_Types/types/Agency/HubOverview.type";
import type { GetHubsResponseDTO } from "../../shared/constants_Types/types/Admin/AdminAgency.dto";

export const useAgency = () => {
    const axiosInstance = useAxios();

    const getAllHubs = async ({
        page = 1,
        limit = 10,
        search = "",
        sortBy = "",
        sortOrder = "asc",
        blocked = null,
        kycStatus = "",
        startDate = "",
        endDate = ""
    }) => {
        const res = await axiosInstance.get(API_AGENCY.GET_HUBS, {
            params: { page, limit, search, sortBy, sortOrder, blocked, kycStatus, startDate, endDate }
        });
        toast.loading
        return res.data.data as GetHubsResponseDTO
    }

    const getHubDetailsById = async (hubId: string) => {

        const res = await axiosInstance.get(`${API_AGENCY.GET_HUBS}/${hubId}`);

        const hub = res.data.data.hub;
        const workers = res.data.data.workers

        return { hub, workers } as GetHubOverviewResponseDTO

    };

    const getHubWrokersList = async (
        hubId: string,
        {
            page = 1,
            limit = 10,
            search = "",
            sortBy = "",
            sortOrder = "asc",
            blocked = null,
            kycStatus = "",
            startDate = "",
            endDate = "",
            workerRole = "",
            workingStatus = ""
        }) => {
        const res = await axiosInstance.get(`${API_HUB.HUB}/${hubId}/workers`, {
            params: { page, limit, search, sortBy, sortOrder, blocked, kycStatus, startDate, endDate, workerRole, workingStatus }
        })
        toast.loading

        console.log(res)
        return res.data.data as GetHubWorkersResponseDTO
    }

    return { getAllHubs, getHubDetailsById, getHubWrokersList }

}