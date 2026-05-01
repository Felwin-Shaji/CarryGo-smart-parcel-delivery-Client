
export interface RouteSegmentDTO {
    id: string;
    routeGroupId: string;
    originHubId: string;
    originHubName: string;
    destinationHubId: string;
    destinationHubName: string;
    segmentOrder: number;
    estimatedTimeMinutes: number | null;
    distanceKm: number | null;
    isActive: boolean;
    originHubLocation: {
        lat: number;
        lng: number;
    },
    destinationHubLocation: {
        lat: number;
        lng: number;
    }

}

export interface RouteGroupDetailDTO {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: string;
    segments: RouteSegmentDTO[];
}




export type CreateRouteSegmentDTO = {
    originHubId: string
    destinationHubId: string
    distanceKm?: number
    estimatedTimeMinutes?: number
    isActive?: boolean
}


export type ReorderRouteSegmentsDTO = {
    segmentId: string
    newOrder: number
}


export type RouteSegmentResponseDTO = {
    id: string
    routeGroupId: string
    originHubId: string
    originHubName: string
    destinationHubId: string
    destinationHubName: string
    segmentOrder: number
    estimatedTimeMinutes: number | null
    distanceKm: number | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}