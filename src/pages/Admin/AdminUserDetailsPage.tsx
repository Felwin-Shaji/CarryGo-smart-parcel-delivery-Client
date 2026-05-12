import React, { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import LoadingScreen from "../../shared/components/loading/CarryGoLoadingScreen";

const AdminUserDetails = React.lazy(() =>
  import("./Components/AdminUserDetails/AdminUserDetails")
);

const AdminUserDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) return null;

  const handleClose = () => {
    navigate("/admin/users");
  };

  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardProvider role="admin">
        <DashboardLayout pageTitle="User Details">
          <AdminUserDetails
            open={true}
            userId={id}
            onClose={handleClose}
            onUpdated={handleClose}
          />
        </DashboardLayout>
      </DashboardProvider>
    </Suspense>
  );
};

export default AdminUserDetailsPage;
