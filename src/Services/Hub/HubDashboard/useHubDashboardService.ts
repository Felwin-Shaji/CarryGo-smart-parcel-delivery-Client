import { useAxios } from "../../../hooks/useAxios";
import { API_HUB } from "../../../shared/constants_Types/apiRoutes";
import type { GetHubDashboardShipmentsPreviewResponseDTO, GetHubDashboardSummaryResponseDTO, GetHubDashboardTrendResponseDTO, GetHubDashboardTypesResponseDTO } from "../../../shared/constants_Types/types/Hub/HubDashboard";

export const useHubDashboardService = () => {
    const axiosInstance = useAxios();

    const getSummary = async (hubId?: string): Promise<GetHubDashboardSummaryResponseDTO> => {

        const url = hubId
            ? `${API_HUB.GET_DASHBOARD_SUMMARY}/${hubId}`
            : API_HUB.GET_DASHBOARD_SUMMARY;

        const res = await axiosInstance.get(url);
        return res.data.data;
    };

    const getTrend = async (
        params?: { from?: string; to?: string },
        hubId?: string
    ): Promise<GetHubDashboardTrendResponseDTO> => {

        const url = hubId
            ? `${API_HUB.GET_DASHBOARD_TREND}/${hubId}`
            : API_HUB.GET_DASHBOARD_TREND;

        const res = await axiosInstance.get(url, { params });
        return res.data.data;
    };

    const getTypes = async (hubId?: string): Promise<GetHubDashboardTypesResponseDTO> => {

        const url = hubId
            ? `${API_HUB.GET_DASHBOARD_TYPES}/${hubId}`
            : API_HUB.GET_DASHBOARD_TYPES;

        const res = await axiosInstance.get(url);

        return res.data.data;
    };

    const getShipmentsPreview = async (hubId?: string): Promise<GetHubDashboardShipmentsPreviewResponseDTO> => {

        const url = hubId
            ? `${API_HUB.GET_DASHBOARD_SHIPMENTS_PREVIEW}/${hubId}`
            : API_HUB.GET_DASHBOARD_SHIPMENTS_PREVIEW;

        const res = await axiosInstance.get(url);

        return res.data.data;
    };

    return {
        getSummary,
        getTrend,
        getTypes,
        getShipmentsPreview,
    };
};