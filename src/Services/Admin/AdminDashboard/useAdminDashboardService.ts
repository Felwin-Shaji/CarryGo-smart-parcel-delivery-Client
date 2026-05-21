import { useAxios } from "../../../hooks/useAxios";
import { API_ADMIN } from "../../../shared/constants_Types/apiRoutes";

import type {
    AdminDashboardResponseDTO,
    AdminRevenueChartResponseDTO,
    AdminBookingChartResponseDTO,
    AdminBookingsReportResponseDTO,
} from "../../../shared/constants_Types/types/Admin/AdminDashboard.dto";

export const useAdminDashboardService = () => {
    const axiosInstance = useAxios();

    // Dashboard KPIs
    const getDashboard = async (params?: { fromDate?: string; toDate?: string; }): Promise<AdminDashboardResponseDTO> => {

        const res = await axiosInstance.get(
            API_ADMIN.GET_DASHBOARD,
            { params }
        );

        return res.data.data;
    };

    // // Revenue Chart
    const getRevenueChart = async (params?: { fromDate?: string; toDate?: string; }): Promise<AdminRevenueChartResponseDTO> => {

        const res = await axiosInstance.get(
            API_ADMIN.GET_REVENUE_CHART,
            { params }
        );

        return res.data.data;
    };

    // // Booking Chart
    const getBookingsChart = async (params?: { fromDate?: string; toDate?: string; }): Promise<AdminBookingChartResponseDTO> => {

        const res = await axiosInstance.get(
            API_ADMIN.GET_BOOKINGS_CHART,
            { params }
        );

        return res.data.data;
    };

    // Bookings Report
    const getBookingsReport = async (
        params?: {
            fromDate?: string;
            toDate?: string;

            page?: number;
            limit?: number;

            deliveryType?: string;
            status?: string;
        }
    ): Promise<AdminBookingsReportResponseDTO> => {

        const res = await axiosInstance.get(
            API_ADMIN.GET_BOOKINGS_REPORT,
            { params }
        );

        return res.data.data;
    };

    // Export Report
    const exportBookingsReport = async (
        params: {
            type: "excel" | "pdf";

            fromDate?: string;
            toDate?: string;

            deliveryType?: string;
            status?: string;
        }
    ): Promise<Blob> => {

        const res = await axiosInstance.get(
            API_ADMIN.GET_BOOKINGS_REPORT_EXPORT,
            {
                params,
                responseType: "blob",
            }
        );

        return res.data;
    };

    return {
        getDashboard,
        getRevenueChart,
        getBookingsChart,
        getBookingsReport,
        exportBookingsReport,
    };
};