import { useAxios } from "../../hooks/useAxios";
import type { CreateRouteGroupDTO, PaginatedRouteGroupResponseDTO, RouteGroupPaginationRequestDTO } from "../../constants_Types/types/Agency/AgencyRouteGroup.dto";
import { API_AGENCY } from "../../constants_Types/apiRoutes";

export const useAgencyRouteGroup = () => {
    const axiosInstance = useAxios();

    const createRouteGroup = async (data: CreateRouteGroupDTO) => {
        const response = await axiosInstance.post(
            API_AGENCY.ROUTE_GROUPS,
            data
        );

        console.log(response.data.data, 'ggggggggggggggggg')

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
        console.log(response.data.data, 'ddddddddddddsssssssssaaaaaaaaaaaa')
        return response.data.data
    }


    return {
        createRouteGroup,
        getPaginatedRouteGroups,
        getRouteGroupDetail
    }
}