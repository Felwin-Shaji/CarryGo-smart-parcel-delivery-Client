import type { GetShipmentsResponse,  UIShipmentFilters,  WorkerForShipment } from "../../constants_Types/types/Hub/HubShipment";
import { useAxios } from "../../hooks/useAxios";

export const useHubShipment = () => {

    const axiosInstance = useAxios();

    const getShipments = async (params: Partial<UIShipmentFilters> & { page?: number; limit?: number; }): Promise<GetShipmentsResponse> => {
        const res = await axiosInstance.get("/api/hub/shipments", {
            params: {
                type: params.type !== "ALL" ? params.type : undefined,
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

    // const assignWorker = async ({
    //     shipmentId,
    //     workerId,
    // }: AssignWorkerParams): Promise<Shipment> => {
    //     const res = await axiosInstance.patch(
    //         `/shipments/${shipmentId}/assign-worker`,
    //         { workerId }
    //     );

    //     return res.data.data;
    // };

    // 🔥 UPDATE CAPACITY
    // const updateCapacity = async ({
    //     shipmentId,
    //     capacity,
    // }: UpdateCapacityParams): Promise<Shipment> => {
    //     const res = await axiosInstance.patch(
    //         `/shipments/${shipmentId}/capacity`,
    //         { capacity }
    //     );

    //     return res.data.data;
    // };

    // 🔥 SET DISPATCH TIME
    // const setDispatchTime = async ({
    //     shipmentId,
    //     estimatedDispatchAt,
    // }: SetDispatchTimeParams): Promise<Shipment> => {
    //     const res = await axiosInstance.patch(
    //         `/shipments/${shipmentId}/dispatch-time`,
    //         { estimatedDispatchAt }
    //     );

    //     return res.data.data;
    // };

    const getWorkers = async (): Promise<WorkerForShipment[]> => {
        const res = await axiosInstance.get("/workers");
        return res.data.data;
    };

    return {
        // getShipments,
        // assignWorker,
        // updateCapacity,
        // setDispatchTime,
        getShipments,
        getWorkers
    };

};