import React from "react";
import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
const AdminAgencyDetailsModal = React.lazy(() =>
    import("./Components/AdminAgencyDetailsModal")
);

const AdminAgencyDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    if (!id) return

    const handleClose = () => {
        navigate("/admin/agency");
    };

    return (
        <Suspense fallback={<div><LoadingScreen/></div>}>
            <DashboardProvider role="admin">
                <DashboardLayout pageTitle="Agency Details">
                    <AdminAgencyDetailsModal
                        open={true}
                        agencyId={id}
                        onClose={handleClose}
                        onUpdated={handleClose}
                    />
                </DashboardLayout>
            </DashboardProvider>
        </Suspense>
    );
};

export default AdminAgencyDetailsPage;
