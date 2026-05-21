import { DashboardProvider } from "../../../context/DashboardProvider";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { useAdminDashboard } from "../../../Services/Admin/AdminDashboard/useAdminDashboard";
import AdminDashboardPage from "./components/AdminDashboardPage";
import DashboardSkeleton from "./components/DashboardSkeleton";

const AdminDashboard = () => {

  const { dashboard, revenueChart, bookingsChart, report, setPage, handleExport, setFilters } = useAdminDashboard();

  if (!dashboard || !revenueChart || !bookingsChart || !report) {
    return <DashboardSkeleton />;
  }

  return (
    <DashboardProvider role="admin">

      <DashboardLayout>

        <AdminDashboardPage
          dashboard={dashboard}
          revenueChart={revenueChart}
          bookingChart={bookingsChart}
          bookingsReport={report}
          onFilterChange={setFilters}
          onPageChange={setPage}
          onExport={handleExport}
        />

      </DashboardLayout>

    </DashboardProvider>
  );
};

export default AdminDashboard;