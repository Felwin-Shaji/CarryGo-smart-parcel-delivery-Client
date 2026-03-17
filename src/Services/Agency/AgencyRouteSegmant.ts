import { API_AGENCY } from "../../constants_Types/apiRoutes";
import type { CreateRouteSegmentDTO, ReorderRouteSegmentsDTO, RouteSegmentResponseDTO } from "../../constants_Types/types/Agency/AgencyRouteSegment.dto";
import { useAxios } from "../../hooks/useAxios";

export const useAgencyRouteSegmant = () => {
    const axiosInstance = useAxios();

    const createRouteSegmants = async (routeGroupId: string, data: CreateRouteSegmentDTO): Promise<RouteSegmentResponseDTO> => {
        const response = await axiosInstance.post(
            API_AGENCY.ROUTE_SEGMENTS(routeGroupId),
            data
        );
        return response.data.data;
    };

    const reorderSegments = async (routeGroupId: string, data: ReorderRouteSegmentsDTO): Promise<void> => {
        const response = await axiosInstance.patch(
            API_AGENCY.ROUTE_SEGMENTS_REORDER(routeGroupId),
            data
        )

        return response.data.data
    }

    return {
        createRouteSegmants,
        reorderSegments
    }

}