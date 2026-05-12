import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLeftLong } from "react-icons/fa6";
import { confirmToast } from "../../../../shared/components/globelcomponents/confirmToast";
import { KYCSTATUS, type KYCStatus } from "../../../../shared/constants_Types/types/roles";
import KycDetails from "./KycDetails";
import RejectReasonModal from "../../../../shared/components/globelcomponents/RejectReasonModal";
import AgencyProfileCard from "./AgencyProfileCard";
import { useAdmin } from "../../../../Services/Admin/Admin";
import LoadingScreen from "../../../../shared/components/loading/CarryGoLoadingScreen";
import AdminAgencyHubList, { EmptyHubsState } from "./AdminAgencyHubList";
import AdminAgencyDashboard from "./AdminAgencyDashboard";
import type { AgencyWithKYCResponseDTO, GetHubsResponseDTO } from "../../../../shared/constants_Types/types/Admin/AdminAgency.dto";
import Breadcrumbs from "../../../../shared/components/globelcomponents/Breadcrumbs";


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
  const { getAgencyOverview, updateAgencyKycStatus } = useAdmin();

  const [loading, setLoading] = useState(false);

  const [agency, setAgency] = useState<AgencyWithKYCResponseDTO | null>(null);
  const [hubLists, setHubLists] = useState<GetHubsResponseDTO | null>(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [showKycDetailsModal, setShowKycDetailsModal] = useState(false);


  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);

  const fetchHubs = async () => {
    if (!agencyId) return;

    try {
      const response = await getAgencyOverview(agencyId);

      setHubLists(response.hubs);
    } catch {
      toast.error("Failed to load hubs");
    }
  };

  useEffect(() => {
    if (!open || !agencyId) return;
    fetchHubs();
  }, [open, agencyId]);




  async function fetchAgencyDetails(agencyId: string) {
    setLoading(true);
    try {
      const response = await getAgencyOverview(agencyId);
      setAgency(response.agency);
      setHubLists(response.hubs);
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
  const canViewKyc = kycStatus !== "PENDING";

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

      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed");
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
      {showRejectReasonModal && (
        <RejectReasonModal
          open
          loading={actionLoading}
          onClose={() => setShowRejectReasonModal(false)}
          onSubmit={handleSubmitRejection}
        />
      )}


      {showKycDetailsModal && agency.kyc && <KycDetails
        open={showKycDetailsModal}
        onClose={() => setShowKycDetailsModal(false)}
        kyc={agency?.kyc}
      />
      }

      {/* HEADER */}
      <div className="sticky top-0">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white/70 
          backdrop-blur-md shadow-md text-gray-700 hover:bg-white hover:text-black transition">
          <FaLeftLong className="text-lg" />
        </button>
      </div>

      {/* BODY */}
      {!loading && agency && (
        <div className="mt-6 space-y-8">

          {/* TOP SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT — AGENCY PROFILE */}
            <div className="lg:col-span-4 rounded-2xl  bg-white p-5 shadow-sm">
              <AgencyProfileCard
                agency={agency}
                canViewKyc={canViewKyc}
                canTakeAction={canTakeAction}
                actionLoading={actionLoading}
                onViewKyc={() => setShowKycDetailsModal(true)}
                onReject={() => setShowRejectReasonModal(true)}
                onApprove={() => updateKYC("APPROVED")}
              />
            </div>

            {/* RIGHT — HUBS TABLE */}
            <div className="lg:col-span-8 rounded-3xl border bg-white p-6 shadow-sm">
              {hubLists && hubLists.data.length > 0 ? (
                <AdminAgencyHubList
                  hubs={hubLists?.data ?? []}
                  agencyId={agencyId!}
                />

              ) : (
                <EmptyHubsState />
              )}
            </div>

          </div>

          {/* BOTTOM — DASHBOARD ANALYTICS */}
          <AdminAgencyDashboard />

        </div>
      )}
    </>
  );
}




