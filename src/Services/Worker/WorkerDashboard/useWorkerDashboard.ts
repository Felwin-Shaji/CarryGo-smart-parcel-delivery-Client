import { useEffect, useState } from "react";
import { useWorkerDashboardService } from "./useWorkerDashboardService";
import type { GetParcelsResponse, GetWorkerDashboardResponseDTO, WorkerGraphPointDTO, } from "../../../constants_Types/types/Worker/WorkerDashboard";
import type { ShipmentParcelStatus } from "../../../constants_Types/types/Hub/HubShipment";

export interface WorkerParcelFilters {
    fromDate?: string;
    toDate?: string;
    status?: ShipmentParcelStatus;
}
export const useWorkerDashboard = (filters: WorkerParcelFilters = {}, page: number, workerId?: string) => {
    const service = useWorkerDashboardService();

    const [dashboard, setDashboard] = useState<GetWorkerDashboardResponseDTO>();
    const [parcels, setParcels] = useState<GetParcelsResponse>();
    const [graph, setGraph] = useState<WorkerGraphPointDTO[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    const fetchDashboard = async () => {
        const res = await service.getDashboard(workerId);
        console.log(res)
        setDashboard(res);

    };

    const fetchParcels = async () => {
        const res = await service.getParcels({
            page,
            limit: 5,
            ...filters,
        },
            workerId
        );

        setParcels(res);
        setTotalPages(res.totalPages);
    };

    const fetchGraph = async () => {
        try {
            const res = await service.getGraph(filters, workerId);
            console.log(res);
            setGraph(res.series);
        } catch (err) {
            console.error("Graph fetch error", err);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, [workerId]);

    useEffect(() => {
        fetchParcels();
    }, [page, filters, workerId]);

    useEffect(() => {
        fetchGraph();
    }, [filters, workerId]);

    return {
        dashboard,
        parcels,
        graph,
        totalPages,
        exportParcels: service.exportParcels,
    };
};