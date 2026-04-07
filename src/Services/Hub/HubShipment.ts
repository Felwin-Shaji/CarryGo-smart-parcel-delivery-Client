import { API_HUB } from "../../constants_Types/apiRoutes";
import type { GetShipmentsResponse, UIShipmentFilters, WorkerForShipment } from "../../constants_Types/types/Hub/HubShipment";
import { useAxios } from "../../hooks/useAxios";

export const useHubShipment = () => {

    const axiosInstance = useAxios();

    const getShipments = async (params: Partial<UIShipmentFilters> & { page?: number; limit?: number; }): Promise<GetShipmentsResponse> => {
        const res = await axiosInstance.get(API_HUB.SHIPMENT, {
            params: {
                type: params.type,
                status: params.status !== "ALL" ? params.status : undefined,
                workerId: params.workerId !== "ALL" ? params.workerId : undefined,
                search: params.search || undefined,
                fromDate: params.fromDate || undefined,
                toDate: params.toDate || undefined,
                page: params.page ?? 1,
                limit: params.limit ?? 10,
            },
        });

        return res.data.data;
    };

    const getWorkers = async (): Promise<WorkerForShipment[]> => {
        const res = await axiosInstance.get("/workers");
        return res.data.data;
    };

    const getShipmentById = async (shipmentId: string) => {
        const res = await axiosInstance.get(`${API_HUB.SHIPMENT}/${shipmentId}`);
        return res.data.data;
    }

    const updateShipment = async ({ shipmentId, workerId, capacity, estimatedDispatchAt, }: {
        shipmentId: string;
        workerId: string;
        capacity: number;
        estimatedDispatchAt: string;
    }) => {
        const res = await axiosInstance.patch(`${API_HUB.SHIPMENT}/${shipmentId}`, {
            workerId,
            capacity,
            estimatedDispatchAt,
        });

        return res.data;
    };

    return {
        getShipments,
        getWorkers,
        getShipmentById,
        updateShipment,
    };

};