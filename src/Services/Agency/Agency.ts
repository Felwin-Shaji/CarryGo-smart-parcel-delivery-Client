import toast from "react-hot-toast";
import { API_AGENCY } from "../../constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios";

export interface HubResponseDTO {
    id: string;
    name: string;
    email: string;
    mobile: string;
    isBlocked: boolean;
    kycStatus: string;
    createdAt: Date;
}

export interface GetHubsResponseDTO {
    data: HubResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

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
        try {
            const res = await axiosInstance.get(API_AGENCY.GET_HUBS, {
                params: { page, limit, search, sortBy, sortOrder, blocked, kycStatus, startDate, endDate }
            });
            toast.loading
            if (res.data.success) toast.success(res.data.message);

            return res.data.data as GetHubsResponseDTO
        } catch (error:any) {
            toast.success(error.res.data.message)
        }
    }

    return { getAllHubs }

}