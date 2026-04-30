import { API_WORKER } from "../../../constants_Types/apiRoutes";
import type { GetParcelsResponse, GetWorkerDashboardResponseDTO } from "../../../constants_Types/types/Worker/WorkerDashboard";
import { useAxios } from "../../../hooks/useAxios";


export const useWorkerDashboardService = () => {
    const axiosInstance = useAxios();

    const getDashboard = async (): Promise<GetWorkerDashboardResponseDTO> => {
        const res = await axiosInstance.get(API_WORKER.GET_DASHBOARD);
        return res.data.data;
    };

    const getParcels = async (params: {
        page: number;
        limit: number;
        status?: string;
        fromDate?: string;
        toDate?: string;
    }): Promise<GetParcelsResponse> => {

        const res = await axiosInstance.get(API_WORKER.GET_PARCELS, {
            params,
        });

        return res.data.data;
    };

    const getGraph = async (params?: {
        fromDate?: string;
        toDate?: string;
        granularity?: "DAY" | "WEEK" | "MONTH";
    }) => {
        const res = await axiosInstance.get(API_WORKER.GET_ANALYTICS_GRAPH, {
            params,
        });

        return res.data.data;
    };

    const exportParcels = (format: "pdf" | "excel") => {
        window.open(`${API_WORKER.EXPORT_PARCELS}?format=${format}`, "_blank");
    };

    return {
        getDashboard,
        getParcels,
        getGraph,
        exportParcels,
    };
};