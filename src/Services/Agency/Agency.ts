import toast from "react-hot-toast";
import { API_ADMIN, API_AGENCY, API_HUB } from "../../shared/constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios";
import type { GetHubOverviewResponseDTO, GetHubWorkersResponseDTO } from "../../shared/constants_Types/types/Agency/HubOverview.type";
import type { GetHubsResponseDTO } from "../../shared/constants_Types/types/Admin/AdminAgency.dto";
import { ROLES, type Roles } from "../../shared/constants_Types/types/roles";

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
    };

    const getAllHubsById = async (
        agencyId: string,
        {
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
        const res = await axiosInstance.get(`${API_ADMIN.GET_AGENCIES}/${agencyId}/hubs`, {
            params: { page, limit, search, sortBy, sortOrder, blocked, kycStatus, startDate, endDate }
        });
        toast.loading
        return res.data.data as GetHubsResponseDTO
    };


    const getHubDetailsById = async (hubId: string) => {

        const res = await axiosInstance.get(`${API_AGENCY.GET_HUBS}/${hubId}`);

        const hub = res.data.data.hub;
        const workers = res.data.data.workers

        return { hub, workers } as GetHubOverviewResponseDTO

    };

    const getHubWrokersList = async (
        hubId: string,
        roles: Roles,
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

        const getHubWorkersApi = (role: Roles) => {
            switch (role) {
                case ROLES.ADMIN:
                    return API_ADMIN.HUB_WORKERS;

                case ROLES.AGENCY:
                    return API_AGENCY.HUB_WORKERS;

                case ROLES.HUB:
                default:
                    return API_HUB.HUB_WORKERS;
            }
        };

        const baseApi = getHubWorkersApi(roles);

        const url = roles === ROLES.HUB
            ? `${baseApi}`
            : `${baseApi}/${hubId}/workers`;

        const res = await axiosInstance.get(url, {
            params: { page, limit, search, sortBy, sortOrder, blocked, kycStatus, startDate, endDate, workerRole, workingStatus }
        })
        toast.loading

        return res.data.data as GetHubWorkersResponseDTO
    }

    return { getAllHubs, getAllHubsById, getHubDetailsById, getHubWrokersList }

}