export type FieldTaskType =
    | "PICKUP"
    | "OUT_FOR_DELIVERY";

export type FieldTaskStatus =
    | "PENDING"
    | "ASSIGNED"
    | "EN_ROUTE"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED";

export interface Address {
    name?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
}

export interface FieldTask {
    id: string;
    bookingId: string;
    parcelRouteId: string;
    hubId: string;

    assignedWorkerId: string | null;
    assignedWorkerName: string | null;

    address: Address;

    type: FieldTaskType;
    status: FieldTaskStatus;

    scheduledAt: string | null;
    arrivedAt: string | null;

    failureReason: string | null;
    proofUrl: string | null;

    attemptCount: number;

    createdAt: string;
    updatedAt: string;
}

export interface PaginatedFieldTasks {
    data: FieldTask[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface GetFieldTasksParams {
    page: number;
    limit: number;

    search?: string;

    sortBy?: string;
    sortOrder?: "asc" | "desc";

    status?: 
        | "PENDING"
        | "ASSIGNED"
        | "EN_ROUTE"
        | "COMPLETED"
        | "FAILED"
        | "CANCELLED";

    type?: 
        | "PICKUP"
        | "OUT_FOR_DELIVERY";

    workerId?: string | null;

    startDate?: string;
    endDate?: string;
}