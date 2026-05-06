import { useEffect, useState } from "react";
import { useHubDashboardService } from "./useHubDashboardService";
import type { GetHubDashboardSummaryResponseDTO, GetHubDashboardTypesResponseDTO, HubShipmentListItemDTO, HubShipmentTrendItemDTO } from "../../../shared/constants_Types/types/Hub/HubDashboard";


export const useHubDashboard = (hubId?: string) => {
    const service = useHubDashboardService();

    const [summary, setSummary] = useState<GetHubDashboardSummaryResponseDTO>();
    const [trend, setTrend] = useState<HubShipmentTrendItemDTO[]>([]);
    const [types, setTypes] = useState<GetHubDashboardTypesResponseDTO>();
    const [shipments, setShipments] = useState<HubShipmentListItemDTO[]>([]);

    const fetchSummary = async () => {
        const res = await service.getSummary(hubId);
        setSummary(res);
    };

    const fetchTrend = async (params?: { from?: string; to?: string }) => {
        const res = await service.getTrend(params, hubId);
        setTrend(res.trend);
    };

    const fetchTypes = async () => {
        const res = await service.getTypes(hubId);
        setTypes(res);
    };

    const fetchShipments = async () => {
        const res = await service.getShipmentsPreview(hubId);
        setShipments(res.recentShipments);
    };

    useEffect(() => {
        fetchSummary();
        fetchTrend();
        fetchTypes();
        fetchShipments();
    }, [hubId]);

    return {
        summary,
        trend,
        types,
        shipments,
        fetchTrend
    };
};