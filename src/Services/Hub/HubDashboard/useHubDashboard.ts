import { useEffect, useState } from "react";
import { useHubDashboardService } from "./useHubDashboardService";
import type { GetHubDashboardSummaryResponseDTO, GetHubDashboardTypesResponseDTO, HubShipmentListItemDTO, HubShipmentTrendItemDTO } from "../../../shared/constants_Types/types/Hub/HubDashboard";


export const useHubDashboard = () => {
    const service = useHubDashboardService();

    const [summary, setSummary] = useState<GetHubDashboardSummaryResponseDTO>();
    const [trend, setTrend] = useState<HubShipmentTrendItemDTO[]>([]);
    const [types, setTypes] = useState<GetHubDashboardTypesResponseDTO>();
    const [shipments, setShipments] = useState<HubShipmentListItemDTO[]>([]);

    const fetchSummary = async () => {
        const res = await service.getSummary({
            from: "2026-05-01",
            to: "2026-05-05",
        });
        setSummary(res);
    };

    const fetchTrend = async () => {
        const res = await service.getTrend();
        setTrend(res.trend);
    };

    const fetchTypes = async () => {
        const res = await service.getTypes();
        setTypes(res);
    };

    const fetchShipments = async () => {
        const res = await service.getShipmentsPreview();
        setShipments(res.recentShipments);
    };

    useEffect(() => {
        fetchSummary();
        fetchTrend();
        fetchTypes();
        fetchShipments();
    }, []);

    return {
        summary,
        trend,
        types,
        shipments,
    };
};