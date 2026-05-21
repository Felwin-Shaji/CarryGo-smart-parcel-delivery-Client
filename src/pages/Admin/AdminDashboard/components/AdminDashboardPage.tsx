import type {
  AdminBookingChartResponseDTO,
  AdminBookingsReportResponseDTO,
  AdminDashboardResponseDTO,
  AdminRevenueChartResponseDTO,
} from "../../../../shared/constants_Types/types/Admin/AdminDashboard.dto";
import DashboardFilters from "../../../Agency/AgencyDashboard/Components/DashboardFilters";
import BookingsReportTable from "./BookingsReportTable";
import DashboardChartsSection from "./DashboardChartsSection";
import OverviewStatsGrid from "./OverviewStatsGrid";

interface Props {
  dashboard: AdminDashboardResponseDTO;
  revenueChart: AdminRevenueChartResponseDTO;
  bookingChart: AdminBookingChartResponseDTO;
  bookingsReport: AdminBookingsReportResponseDTO;
  onFilterChange: (filters: { fromDate?: string; toDate?: string; }) => void;
  onPageChange: (page: number) => void;
  onExport: (type: "excel" | "pdf") => void;
}

export default function AdminDashboardPage({
  dashboard,
  revenueChart,
  bookingChart,
  bookingsReport,
  onFilterChange,
  onPageChange,
  onExport,
}: Props) {

  const handleFiltersChange = (
    data: {
      fromDate?: string;
      toDate?: string;
      status?: string;
    }
  ) => {

    onFilterChange(data);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      <div className="max-w-[1700px] mx-auto px-6 py-5 space-y-6">

        {/* FILTERS */}
        <div className="sticky top-4 z-20">
          <DashboardFilters
            onChange={handleFiltersChange}
          />
        </div>

        {/* OVERVIEW */}
        <OverviewStatsGrid
          overview={dashboard.overview}
        />

        {/* CHARTS */}
        <DashboardChartsSection
          revenueChart={revenueChart}
          bookingChart={bookingChart}
        />

        {/* TABLE */}
        <BookingsReportTable
          report={bookingsReport}
          onPageChange={onPageChange}
          onExport={onExport}
        />

      </div>
    </div>
  );
}