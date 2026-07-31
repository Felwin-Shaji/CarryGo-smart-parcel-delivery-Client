import { useAxios } from "../../../hooks/useAxios";
import { API_ADMIN, API_AGENCY, API_HUB } from "../../../shared/constants_Types/apiRoutes";
import type {
    GetHubDashboardShipmentsPreviewResponseDTO,
    GetHubDashboardSummaryResponseDTO,
    GetHubDashboardTrendResponseDTO,
    GetHubDashboardTypesResponseDTO,
} from "../../../shared/constants_Types/types/Hub/HubDashboard";
import { ROLES, type Roles } from "../../../shared/constants_Types/types/roles";

export const useHubDashboardService = () => {
    const axiosInstance = useAxios();

    const getDashboardApi = (role?: Roles) => {
        switch (role) {
            case ROLES.ADMIN:
                return API_ADMIN;
            case ROLES.AGENCY:
                return API_AGENCY;
            default:
                return API_HUB;
        }
    };

    const getSummary = async (
        hubId?: string,
        role?: Roles
    ): Promise<GetHubDashboardSummaryResponseDTO> => {

        const api = getDashboardApi(role);

        const url = hubId
            ? `${api.GET_DASHBOARD_SUMMARY}/${hubId}`
            : api.GET_DASHBOARD_SUMMARY;

        const res = await axiosInstance.get(url);
        return res.data.data;
    };

    const getTrend = async (
        params?: { from?: string; to?: string },
        hubId?: string,
        role?: Roles
    ): Promise<GetHubDashboardTrendResponseDTO> => {

        const api = getDashboardApi(role);

        const url = hubId
            ? `${api.GET_DASHBOARD_TREND}/${hubId}`
            : api.GET_DASHBOARD_TREND;

        const res = await axiosInstance.get(url, { params });
        return res.data.data;
    };

    const getTypes = async (
        hubId?: string,
        role?: Roles
    ): Promise<GetHubDashboardTypesResponseDTO> => {

        const api = getDashboardApi(role);

        const url = hubId
            ? `${api.GET_DASHBOARD_TYPES}/${hubId}`
            : api.GET_DASHBOARD_TYPES;

        const res = await axiosInstance.get(url);
        return res.data.data;
    };

    const getShipmentsPreview = async (
        hubId?: string,
        role?: Roles
    ): Promise<GetHubDashboardShipmentsPreviewResponseDTO> => {

        const api = getDashboardApi(role);

        const url = hubId
            ? `${api.GET_DASHBOARD_SHIPMENTS_PREVIEW}/${hubId}`
            : api.GET_DASHBOARD_SHIPMENTS_PREVIEW;

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