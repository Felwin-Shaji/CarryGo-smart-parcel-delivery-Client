import React, { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import LoadingScreen from "../../shared/components/loading/CarryGoLoadingScreen";
import { ROLES } from "../../shared/constants_Types/types/roles";

const AdminHubDetailsModal = React.lazy(() =>
    import("./Components/AdminHubDetails/AdminHubDetailsModal")
);

const AdminHubDetailsPage = () => {
    const navigate = useNavigate();
    const { agencyId, hubId } = useParams<{
        agencyId: string;
        hubId: string;
    }>();

    if (!agencyId || !hubId) {
        navigate("/admin/agency");
        return null;
    }
    return (
        <Suspense fallback={<LoadingScreen />}>
            <DashboardProvider role={ROLES.ADMIN}>
                <DashboardLayout pageTitle="Hub Details">
                    <AdminHubDetailsModal
                        open
                        hubId={hubId}
                        onClose={() => navigate(-1)}
                        onUpdated={() => navigate(0)}
                    />
                </DashboardLayout>
            </DashboardProvider>
        </Suspense>
    );
};

export default AdminHubDetailsPage;
