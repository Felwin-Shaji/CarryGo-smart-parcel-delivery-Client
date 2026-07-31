import { API_ADMIN, API_AGENCY, API_HUB, API_WORKER } from "../../../shared/constants_Types/apiRoutes";
import type { GetParcelsResponse, GetWorkerDashboardResponseDTO } from "../../../shared/constants_Types/types/Worker/WorkerDashboard";
import { useAxios } from "../../../hooks/useAxios";
import { ROLES, type Roles } from "../../../shared/constants_Types/types/roles";


export const useWorkerDashboardService = () => {
    const axiosInstance = useAxios();

    const getWorkerApi = (role?: Roles) => {
        switch (role) {
            case ROLES.ADMIN:
                return API_ADMIN;

            case ROLES.AGENCY:
                return API_AGENCY;

            case ROLES.HUB:
                return API_HUB;

            default:
                return API_WORKER;
        }
    };

    const getDashboard = async (
        role?: Roles,
        workerId?: string
    ): Promise<GetWorkerDashboardResponseDTO> => {

        const api = getWorkerApi(role);

        const url = workerId
            ? `${api.GET_WORKER_DASHBOARD}/${workerId}`
            : api.GET_WORKER_DASHBOARD;

        const res = await axiosInstance.get(url);

        return res.data.data;
    };

    const getParcels = async (
        params: {
            page: number;
            limit: number;
            status?: string;
            fromDate?: string;
            toDate?: string;
        },
        role?: Roles,
        workerId?: string
    ): Promise<GetParcelsResponse> => {

        const api = getWorkerApi(role);

        const url = workerId
            ? `${api.GET_WORKER_PARCELS}/${workerId}`
            : api.GET_WORKER_PARCELS;

        const res = await axiosInstance.get(url, { params });

        return res.data.data;
    };

    const getGraph = async (
        params?: {
            fromDate?: string;
            toDate?: string;
            granularity?: "DAY" | "WEEK" | "MONTH";
        },
        role?: Roles,
        workerId?: string
    ) => {

        const api = getWorkerApi(role);

        const url = workerId
            ? `${api.GET_WORKER_ANALYTICS_GRAPH}/${workerId}`
            : api.GET_WORKER_ANALYTICS_GRAPH;

        const res = await axiosInstance.get(url, { params });

        return res.data.data;
    };

    const exportParcels = (
        format: "pdf" | "excel",
        role?: Roles,
        workerId?: string
    ) => {

        const api = getWorkerApi(role);

        const url = workerId
            ? `${api.EXPORT_WORKER_PARCELS}/${workerId}?format=${format}`
            : `${api.EXPORT_WORKER_PARCELS}?format=${format}`;

        window.open(url, "_blank");
    };

    return {
        getDashboard,
        getParcels,
        getGraph,
        exportParcels,
    };
};