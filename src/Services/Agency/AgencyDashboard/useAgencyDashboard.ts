import { useEffect, useState } from "react";
import { useAgencyDashboardService } from "./useAgencyDashboardService";
import type {
    AgencyDashboardResponseDTO,
    DeliveriesChartResponseDTO,
    SalesChartResponseDTO,
    SalesReportResponseDTO,
} from "../../../shared/constants_Types/types/Agency/AgencyDashboar.dto";

const downloadFile = (blob: Blob, type: "excel" | "pdf") => {
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const fileName = `sales-report-${new Date().toISOString()}.${type === "excel" ? "xlsx" : "pdf"}`;
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
};

export const useAgencyDashboard = (agencyId?: string) => {
    const service = useAgencyDashboardService();

    const [dashboard, setDashboard] = useState<AgencyDashboardResponseDTO>();
    const [salesChart, setSalesChart] = useState<SalesChartResponseDTO["data"]>([]);
    const [deliveriesChart, setDeliveriesChart] = useState<DeliveriesChartResponseDTO["data"]>([]);
    const [report, setReport] = useState<SalesReportResponseDTO>();

    const [loading, setLoading] = useState(false);

    // Filters (single source)
    const [filters, setFilters] = useState<{
        fromDate?: string;
        toDate?: string;
    }>({});

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    // Dashboard
    const fetchDashboard = async () => {

        let res: AgencyDashboardResponseDTO

        if (agencyId) res = await service.getDashboardById(agencyId)
        else res = await service.getDashboard();

        setDashboard(res);
    };

    const fetchSalesChart = async () => {
        let res: SalesChartResponseDTO;

        if (agencyId) res = await service.getSalesChartById(agencyId)
        else res = await service.getSalesChart(filters);

        setSalesChart(res.data);
    };

    const fetchDeliveriesChart = async () => {
        let res: DeliveriesChartResponseDTO

        if (agencyId) res = await service.getDeliveriesChartById(agencyId);
        else res = await service.getDeliveriesChart(filters);

        setDeliveriesChart(res.data);
    };

    // Report
    const fetchSalesReport = async () => {
        setLoading(true);

        let res: SalesReportResponseDTO
        if (agencyId) {
            res = await service.getSalesReportById(
                agencyId,
                {
                    ...filters,
                    page,
                    limit,
                }
            );
        } else {
            res = await service.getSalesReport({
                ...filters,
                page,
                limit,
            });
        }

        setReport(res);
        setLoading(false);
    };

    //  Export
    const handleExport = async (type: "excel" | "pdf") => {
        try {
            let blob: Blob
            if (agencyId) {
                blob = await service.exportSalesReportById(
                    agencyId,
                    {
                        type,
                        ...filters,
                    });
            } else {
                blob = await service.exportSalesReport({
                    type,
                    ...filters,
                });
            }

            downloadFile(blob, type);
        } catch (err) {
            console.error("Export failed", err);
        }
    };

    // Sync all
    useEffect(() => {
        fetchDashboard();
    }, []);

    useEffect(() => {
        fetchSalesChart();
        fetchDeliveriesChart();
        fetchSalesReport();
    }, [filters, page]);

    const updateFilters = (newFilters: typeof filters) => {
        setPage(1);
        setFilters(newFilters);
    };

    return {
        dashboard,
        salesChart,
        deliveriesChart,
        report,
        loading,

        setFilters: updateFilters,
        setPage,
        handleExport,
    };
};