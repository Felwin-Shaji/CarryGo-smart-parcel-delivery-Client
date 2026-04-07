import { API_WORKER } from "../../constants_Types/apiRoutes";
import type { ShipmentStatus, UIShipmentFilters } from "../../constants_Types/types/Hub/HubShipment";
import type { HubShipmentPaginatedData, WorkersBookingDetailsUI } from "../../constants_Types/types/Worker/workerShipment";
import { useAxios } from "../../hooks/useAxios";

export const useWorkerShipments = () => {
    const axiosInstance = useAxios();

    const getShipments = async (params: Partial<UIShipmentFilters> & { page?: number; limit?: number; }):
        Promise<HubShipmentPaginatedData> => {
        const res = await axiosInstance.get(API_WORKER.SHIPMENTS, {
            params: {
                type: params.type,
                status: params.status !== "ALL" ? params.status : undefined,
                search: params.search || undefined,
                fromDate: params.fromDate || undefined,
                toDate: params.toDate || undefined,
                page: params.page ?? 1,
                limit: params.limit ?? 10,
            },
        });
        return res.data.data;
    };

    const getShipmentDetails = async (id: string) => {
        const res = await axiosInstance.get(`${API_WORKER.SHIPMENTS}/${id}`);
        return res.data.data;
    };

    const updateParcel = async (shipmentId: string, parcelId: string, status: string) => {
        return axiosInstance.patch(
            `${API_WORKER.SHIPMENTS}/${shipmentId}/parcels/${parcelId}`,
            { status }
        );
    };

    const bulkUpdateParcels = async (shipmentId: string, parcelIds: string[], status: string) => {
        return axiosInstance.patch(
            `${API_WORKER.SHIPMENTS}/${shipmentId}/parcels/bulk`,
            { parcelIds, status }
        );
    };

    const getBookingDetails = async (bookingId: string): Promise<WorkersBookingDetailsUI> => {
        const res = await axiosInstance.get(`${API_WORKER.SHIPMENTS}/${bookingId}/booking-details`);
        return res.data.data;
    }




    const updateShipmentStatus = async (shipmentId: string, status: ShipmentStatus) => {
        const res = await axiosInstance.patch(
            `${API_WORKER.SHIPMENTS}/${shipmentId}/status`,
            { status }
        );

        return res.data;
    };


    return {
        getShipments,
        updateParcel,
        bulkUpdateParcels,
        getShipmentDetails,
        getBookingDetails,
        updateShipmentStatus
    }
}