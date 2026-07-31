import { useAxios } from "../../../hooks/useAxios";
import { API_ADMIN, API_AGENCY } from "../../../shared/constants_Types/apiRoutes";
import type { AgencyDashboardResponseDTO, DeliveriesChartResponseDTO, SalesChartResponseDTO, SalesReportResponseDTO } from "../../../shared/constants_Types/types/Agency/AgencyDashboar.dto";


export const useAgencyDashboardService = () => {
    const axiosInstance = useAxios();

    const getDashboard = async (): Promise<AgencyDashboardResponseDTO> => {
        const res = await axiosInstance.get(API_AGENCY.GET_DASHBOARD);
        return res.data.data;
    };

    const getDashboardById = async (agencyId: string,): Promise<AgencyDashboardResponseDTO> => {
        const res = await axiosInstance.get(`${API_ADMIN.GET_AGENCY_DASHBOARD}/${agencyId}`);
        return res.data.data;
    };

    const getSalesChart = async (
        params?: { fromDate?: string; toDate?: string }
    ): Promise<SalesChartResponseDTO> => {
        const res = await axiosInstance.get(API_AGENCY.GET_SALES_CHART, {
            params,
        });
        return res.data.data;
    };

    const getSalesChartById = async (
        agencyId: string,
        params?: { fromDate?: string; toDate?: string }
    ): Promise<SalesChartResponseDTO> => {
        const res = await axiosInstance.get(`${API_ADMIN.GET_AGENCY_SALES_CHART}/${agencyId}`, {
            params,
        });
        return res.data.data;
    };

    const getDeliveriesChart = async (
        params?: { fromDate?: string; toDate?: string }
    ): Promise<DeliveriesChartResponseDTO> => {
        const res = await axiosInstance.get(API_AGENCY.GET_DELIVERIES_CHART, {
            params,
        });
        return res.data.data;
    };

    const getDeliveriesChartById = async (
        agencyId: string,
        params?: { fromDate?: string; toDate?: string }
    ): Promise<DeliveriesChartResponseDTO> => {
        const res = await axiosInstance.get(`${API_ADMIN.GET_AGENCY_DELIVERIES_CHART}/${agencyId}`, {
            params,
        });
        return res.data.data;
    };

    const getSalesReport = async (
        params?: {
            fromDate?: string;
            toDate?: string;
            page?: number;
            limit?: number;
        }
    ): Promise<SalesReportResponseDTO> => {
        const res = await axiosInstance.get(API_AGENCY.GET_SALES_REPORT, {
            params,
        });
        return res.data.data;
    };

    const getSalesReportById = async (
        agencyId: string,
        params?: {
            fromDate?: string;
            toDate?: string;
            page?: number;
            limit?: number;
        }
    ): Promise<SalesReportResponseDTO> => {
        const res = await axiosInstance.get(`${API_ADMIN.GET_AGENCY_SALES_REPORT}/${agencyId}`, {
            params,
        });
        return res.data.data;
    };

    const exportSalesReport = async (params: {
        type: "excel" | "pdf";
        fromDate?: string;
        toDate?: string;
    }): Promise<Blob> => {
        const res = await axiosInstance.get(
            API_AGENCY.GET_SALES_REPORT_EXPORT,
            {
                params,
                responseType: "blob",
            }
        );

        return res.data;
    };

    const exportSalesReportById = async (
        agencyId: string,
        params: {
            type: "excel" | "pdf";
            fromDate?: string;
            toDate?: string;
        }): Promise<Blob> => {
        const res = await axiosInstance.get(
            `${API_ADMIN.GET_AGENCY_SALES_REPORT_EXPORT}/${agencyId}`,
            {
                params,
                responseType: "blob",
            }
        );

        return res.data;
    };

    return {
        getDashboard,
        getSalesChart,
        getDeliveriesChart,
        getSalesReport,
        exportSalesReport,

        getDashboardById,
        getSalesChartById,
        getDeliveriesChartById,
        getSalesReportById,
        exportSalesReportById,
    };
};