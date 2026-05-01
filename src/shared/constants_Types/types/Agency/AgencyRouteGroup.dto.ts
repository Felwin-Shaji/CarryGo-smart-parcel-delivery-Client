export type CreateRouteGroupDTO = {
    name: string
    description?: string
    isActive?: boolean
}

export type RouteGroupFilterRequestDTO = {
    search?: string
    isActive?: boolean
}

export type RouteGroupPaginationRequestDTO = {
    page: number
    limit: number
    filters?: RouteGroupFilterRequestDTO
}

export type RouteGroupDTO = {
    id: string
    name: string
    description: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export type PaginatedRouteGroupResponseDTO = {
    success: boolean
    data: RouteGroupDTO[]
    total: number
    page: number
    limit: number
    totalPages: number
}