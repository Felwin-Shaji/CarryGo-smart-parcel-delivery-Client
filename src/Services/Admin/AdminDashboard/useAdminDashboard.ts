import { useEffect, useState } from "react";
import { useAdminDashboardService } from "./useAdminDashboardService";
import type { AdminDashboardResponseDTO, AdminBookingChartResponseDTO, AdminRevenueChartResponseDTO, AdminBookingsReportResponseDTO, } from "../../../shared/constants_Types/types/Admin/AdminDashboard.dto";

const downloadFile = (
    blob: Blob,
    type: "excel" | "pdf"
) => {
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const fileName =
        `admin-bookings-report-${new Date().toISOString()}.${type === "excel"
            ? "xlsx"
            : "pdf"
        }`;

    link.setAttribute("download", fileName);
    document.body.appendChild(link);

    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

export const useAdminDashboard = () => {

    const service = useAdminDashboardService();

    const [dashboard, setDashboard] = useState<AdminDashboardResponseDTO>();
    const [revenueChart, setRevenueChart] = useState<AdminRevenueChartResponseDTO>();
    const [bookingsChart, setBookingsChart] = useState<AdminBookingChartResponseDTO>();
    const [report, setReport] = useState<AdminBookingsReportResponseDTO>();

    const [filters, setFilters] = useState<{
        fromDate?: string;
        toDate?: string;

        deliveryType?: string;
        status?: string;
    }>({});

    const [page, setPage] = useState(1);
    const [limit] = useState(10);


    // Dashboard
    const fetchDashboard = async () => {

        try {

            const res =
                await service.getDashboard(filters);

            console.log(
                "API RESPONSE:",
                res
            );

            setDashboard(res);

        } catch (err) {

            console.error(
                "FETCH DASHBOARD ERROR:",
                err
            );
        }
    };

    // Revenue Chart
    const fetchRevenueChart = async () => {
        const res = await service.getRevenueChart(filters);
        setRevenueChart(res);
    };

    // // Bookings Chart
    const fetchBookingsChart = async () => {
        const res = await service.getBookingsChart(filters);
        setBookingsChart(res);
    };

    // // Bookings Report
    const fetchBookingsReport = async () => {

        const res = await service.getBookingsReport({
            ...filters,
            page,
            limit,
        });

        setReport(res);
    };

    // Export
    const handleExport = async (type: "excel" | "pdf") => {
        try {
            const blob =
                await service.exportBookingsReport({
                    type,
                    ...filters,
                });

            downloadFile(blob, type);

        } catch (err) {
            console.error(
                "Export failed",
                err
            );
        }
    };

    // Initial Load
    useEffect(() => {
        fetchDashboard();
    }, [filters]);

    // Sync Charts + Report
    useEffect(() => {
        fetchRevenueChart();
        fetchBookingsChart();
        fetchBookingsReport();
    }, [filters, page]);

    // Update Filters
    const updateFilters = (newFilters: typeof filters) => {
        setPage(1);
        setFilters(newFilters);
    };

    return {
        dashboard,
        revenueChart,
        bookingsChart,
        report,
        setFilters: updateFilters,
        setPage,
        handleExport,
    };
};