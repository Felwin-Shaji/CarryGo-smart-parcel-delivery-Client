import { useAxios } from "../../hooks/useAxios";
import type { CreateRouteGroupDTO, PaginatedRouteGroupResponseDTO, RouteGroupPaginationRequestDTO } from "../../shared/constants_Types/types/Agency/AgencyRouteGroup.dto";
import { API_AGENCY } from "../../shared/constants_Types/apiRoutes";

export const useAgencyRouteGroup = () => {
    const axiosInstance = useAxios();

    const createRouteGroup = async (data: CreateRouteGroupDTO) => {
        const response = await axiosInstance.post(
            API_AGENCY.ROUTE_GROUPS,
            data
        );

        return response.data.data
    }

    const getPaginatedRouteGroups = async (options: RouteGroupPaginationRequestDTO): Promise<PaginatedRouteGroupResponseDTO> => {

        console.log(options)
        const response = await axiosInstance.get(
            API_AGENCY.ROUTE_GROUPS,
            { params: options }
        );

        return response.data.data;
    };

    const getRouteGroupDetail = async (id: string) => {

        const response = await axiosInstance.get(
            `${API_AGENCY.ROUTE_GROUPS}/${id}`
        );
        return response.data.data
    };


    const updateRouteGroupStatus = async (
        id: string,
        isActive: boolean
    ) => {

        const response = await axiosInstance.patch(
            `${API_AGENCY.ROUTE_GROUPS}/${id}/status`,
            {
                isActive
            }
        );

        return response.data.data;
    };


    return {
        createRouteGroup,
        getPaginatedRouteGroups,
        getRouteGroupDetail,
        updateRouteGroupStatus
    }
}