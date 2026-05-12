import React, { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import LoadingScreen from "../../shared/components/loading/CarryGoLoadingScreen";
import { ROLES } from "../../shared/constants_Types/types/roles";

const AgencyHubDetailsModal = React.lazy(() =>
  import("./components/AgencyHubDetails/AgencyHubDetailsModal")
);

const AgencyHubDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    navigate("/agency/hubs");
    return null;
  }

  const handleClose = () => {
    navigate("/agency/hubs");
  };

  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardProvider role={ROLES.AGENCY}>
        <DashboardLayout pageTitle="Hub Details">
          <AgencyHubDetailsModal
            open
            hubId={id}
            onClose={handleClose}
          />
        </DashboardLayout>
      </DashboardProvider>
    </Suspense>
  );
};

export default AgencyHubDetailsPage;
