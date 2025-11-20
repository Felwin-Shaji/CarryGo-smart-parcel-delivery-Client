import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";

const AdminDashboard = () => {
  return (
    <div>
      <DashboardProvider role="admin">
        <DashboardLayout>
          <h1>Admin dashboard</h1>
        </DashboardLayout>
      </DashboardProvider>

    </div>
  )
}

export default AdminDashboard