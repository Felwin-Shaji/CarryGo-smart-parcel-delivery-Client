// GET /agency/dashboard
export interface AlertDTO {
    type: "PRICING_OUTDATED";
    message: string;
}

export interface AgencyDashboardResponseDTO {
    alerts: AlertDTO[];

    stats: {
        totalHubs: number;
        totalWorkers: number;
        totalRevenue: number;
        totalCompletedBookings: number;
    };
};


// GET /agency/dashboard/sales-chart?range=7d
export interface SalesChartRequestDTO {
    range?: "7d" | "30d" | "90d";
};

export interface SalesChartResponseDTO {
    data: {
        date: string;
        revenue: number;
    }[];
}

// GET /agency/dashboard/deliveries-chart?range=7d
export interface DeliveriesChartRequestDTO {
    range?: "7d" | "30d" | "90d";
};

export interface DeliveriesChartResponseDTO {
    data: {
        date: string;
        count: number;
    }[];
};

// GET /agency/dashboard/sales-report
export interface SalesReportRequestDTO {
    fromDate?: string; // ISO
    toDate?: string;   // ISO

    page?: number;
    limit?: number;
};

export interface SalesReportResponseDTO {
    data: SalesReportRowDTO[];

    summary: {
        totalRevenue: number;
        totalBookings: number;
    };

    pagination: {
        page: number;
        limit: number;
        total: number;
    };
};

export interface SalesReportRowDTO {
    date: string;
    bookingId: string;
    grossAmount: number;
    commission?: number;
    netAmount: number;
    paymentStatus: string;
}

