import { API_WORKER } from "../../../constants_Types/apiRoutes";
import type { GetParcelsResponse, GetWorkerDashboardResponseDTO } from "../../../constants_Types/types/Worker/WorkerDashboard";
import { useAxios } from "../../../hooks/useAxios";


export const useWorkerDashboardService = () => {
    const axiosInstance = useAxios();

    const getDashboard = async (
        workerId?: string
    ): Promise<GetWorkerDashboardResponseDTO> => {
        const url = workerId
            ? `${API_WORKER.GET_DASHBOARD}/${workerId}`
            : API_WORKER.GET_DASHBOARD;

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
        workerId?: string
    ): Promise<GetParcelsResponse> => {
        const url = workerId
            ? `${API_WORKER.GET_PARCELS}/${workerId}`
            : API_WORKER.GET_PARCELS;

        const res = await axiosInstance.get(url, { params });

        return res.data.data;
    };

    const getGraph = async (
        params?: {
            fromDate?: string;
            toDate?: string;
            granularity?: "DAY" | "WEEK" | "MONTH";
        },
        workerId?: string
    ) => {
        const url = workerId
            ? `${API_WORKER.GET_ANALYTICS_GRAPH}/${workerId}`
            : API_WORKER.GET_ANALYTICS_GRAPH;

        const res = await axiosInstance.get(url, { params });

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