import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { confirmToast } from "../../../../shared/components/globelcomponents/confirmToast";
import { KYCSTATUS, type KYCStatus } from "../../../../shared/constants_Types/types/roles";
import RejectReasonModal from "../../../../shared/components/globelcomponents/RejectReasonModal";
import AgencyProfileCard from "./components/AgencyProfileCard";
import { useAdmin } from "../../../../Services/Admin/Admin";
import LoadingScreen from "../../../../shared/components/loading/CarryGoLoadingScreen";
import type { AgencyWithKYCResponseDTO } from "../../../../shared/constants_Types/types/Admin/AdminAgency.dto";
import Breadcrumbs from "../../../../shared/components/globelcomponents/Breadcrumbs";
import { SecondaryHeader } from "../../../../layouts/SecondaryHeader";
import { useNavigate } from "react-router-dom";
import AdminAgencyHubList from "./components/AdminAgencyHubList";
import AgencyDashboardPage from "../../../Agency/AgencyDashboard/Components/AgencyDashboardPage";

export type AgencyTab =
  | "details"
  | "dashboard"
  | "hubs";

export default function AdminAgencyDetailsModal({
  open,
  agencyId,
  onClose,
  onUpdated,
}: {
  open: boolean;
  agencyId: string | null;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const navigate = useNavigate()
  const { getAgencyOverview, updateAgencyKycStatus } = useAdmin();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AgencyTab>("details");

  const [agency, setAgency] = useState<AgencyWithKYCResponseDTO | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);

  async function fetchAgencyDetails(agencyId: string) {
    setLoading(true);
    try {
      const response = await getAgencyOverview(agencyId);
      setAgency(response.agency);
    } catch (error) {
      toast.error("Failed to load agency details");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (!open || !agencyId) return;
    fetchAgencyDetails(agencyId)
  }, [open, agencyId]);


  if (loading) return <LoadingScreen />;
  if (!agency) return null;

  const breadcrumbs = [
    { label: "Agencies", to: "/admin/agency" },
    { label: "Agency Details" },
  ];

  const kycStatus = agency.kycStatus as KYCStatus;

  const canTakeAction =
    kycStatus === "REGISTERED" ||
    kycStatus === "RESUBMITTED";

  const updateKYC = async (status: KYCStatus) => {
    if (!agencyId) return;

    let message: string = "Are shure";
    if (status === KYCSTATUS.APPROVED) message = `Are you sure you want to approve ${agency.name}'s KYC?`;
    if (status === KYCSTATUS.REJECTED) message = `Are you sure you want to reject ${agency.name}'s KYC?`;

    confirmToast(message, async () => {
      try {
        setActionLoading(true);

        const result = await updateAgencyKycStatus(agencyId, status);
        toast.success(result.message || "KYC updated successfully");

        onUpdated();
        onClose();

      } finally {
        setActionLoading(false);
      }
    });
  };


  const handleSubmitRejection = async (reason: string) => {
    if (!agencyId) return;

    try {
      setActionLoading(true);

      const result = await updateAgencyKycStatus(agencyId, KYCSTATUS.REJECTED, reason);
      toast.success(result.message || "KYC rejected");

      setShowRejectReasonModal(false);
      onUpdated();
      onClose();
    } finally {
      setActionLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <SecondaryHeader
        title="Agency Details"
        showBack
        onBack={() => navigate(-1)}
        tabs={[
          {
            key: "details",
            label: "Details",
          },
          {
            key: "dashboard",
            label: "Dashboard",
          },
          {
            key: "hubs",
            label: "Hubs",
          },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {showRejectReasonModal && (
        <RejectReasonModal
          open
          loading={actionLoading}
          onClose={() => setShowRejectReasonModal(false)}
          onSubmit={handleSubmitRejection}
        />
      )}



      {/* BODY */}
      <div className="mt-2 px-2">

        {/* DETAILS TAB */}
        {activeTab === "details" && (
          <AgencyProfileCard
            agency={agency}
            canTakeAction={canTakeAction}
            actionLoading={actionLoading}
            onReject={() =>
              setShowRejectReasonModal(true)
            }
            onApprove={() =>
              updateKYC("APPROVED")
            }
          />
        )}

        {/* HUBS TAB */}
        {activeTab === "hubs" && (
          <AdminAgencyHubList />
        )}

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <AgencyDashboardPage agencyId={agencyId!} />
        )}

      </div>
    </>
  );
}




