import { useAxios } from "../../../hooks/useAxios";
import { API_HUB } from "../../../shared/constants_Types/apiRoutes";
import type { GetHubDashboardShipmentsPreviewResponseDTO, GetHubDashboardSummaryResponseDTO, GetHubDashboardTrendResponseDTO, GetHubDashboardTypesResponseDTO } from "../../../shared/constants_Types/types/Hub/HubDashboard";

export const useHubDashboardService = () => {
    const axiosInstance = useAxios();

    const getSummary = async (
        params?: { from?: string; to?: string }
    ): Promise<GetHubDashboardSummaryResponseDTO> => {

        const res = await axiosInstance.get(
            API_HUB.GET_DASHBOARD_SUMMARY,
            // { params }
        );

        console.log("111111111111111111111", res.data.data)

        return res.data.data;
    };
    const getTrend = async (params?: {
        from?: string;
        to?: string;
    }): Promise<GetHubDashboardTrendResponseDTO> => {
        const res = await axiosInstance.get(API_HUB.GET_DASHBOARD_TREND, {
            params,
        });
        return res.data.data;
    };

    const getTypes = async (): Promise<GetHubDashboardTypesResponseDTO> => {
        const res = await axiosInstance.get(API_HUB.GET_DASHBOARD_TYPES);
        return res.data.data;
    };

    const getShipmentsPreview =
        async (): Promise<GetHubDashboardShipmentsPreviewResponseDTO> => {
            const res = await axiosInstance.get(
                API_HUB.GET_DASHBOARD_SHIPMENTS_PREVIEW
            );
            return res.data.data;
        };

    return {
        getSummary,
        getTrend,
        getTypes,
        getShipmentsPreview,
    };
};