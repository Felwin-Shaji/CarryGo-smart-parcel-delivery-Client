
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";




const AdminDashboard = () => {
      const  admin  = useSelector((state: RootState) => state.adminState.admin)

   console.log(admin,'zzzzzzzzznnnnnnnnnnnnn') 
  return (
    <div>
      <DashboardProvider role="admin">

        <DashboardLayout>
          <h1>
            this is dashbord
          </h1>
        </DashboardLayout>
      </DashboardProvider>

    </div>
  )
}

export default AdminDashboard