import toast from "react-hot-toast";
import { API_AGENCY } from "../../shared/constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios";
import type { GetHubOverviewResponseDTO } from "../../shared/constants_Types/types/Agency/HubOverview.type";
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
        // if (res.data.success) toast.success(res.data.message);
        return res.data.data as GetHubsResponseDTO
    }

    const getHubDetailsById = async (hubId: string) => {

        const res = await axiosInstance.get(`${API_AGENCY.GET_HUBS}/${hubId}`);
        if (res.data.success) toast.success(res.data.message);

        const hub = res.data.data.hub;
        const workers = res.data.data.workers

        return { hub, workers } as GetHubOverviewResponseDTO

    };

    return { getAllHubs, getHubDetailsById }

}