import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLeftLong } from "react-icons/fa6";
import { confirmToast } from "../../../../shared/components/globelcomponents/confirmToast";
import RejectReasonModal from "../../../../shared/components/globelcomponents/RejectReasonModal";
import LoadingScreen from "../../../../shared/components/loading/CarryGoLoadingScreen";
import Breadcrumbs from "../../../../shared/components/globelcomponents/Breadcrumbs";
import { KYCSTATUS, type KYCStatus } from "../../../../shared/constants_Types/types/roles";
import UserProfileCard from "./UserProfileCard";
import KycDetails from "./KycDetails";
import AdminAgencyDashboard from "../AdminAgencyDetails/AdminAgencyDashboard";
import type { UserWithKYCResponseDTO } from "../../../../shared/constants_Types/types/Admin/AdminUserTypes";
import { useAdminUser } from "../../../../Services/Admin/AdminUser";

export default function AdminUserDetails({
  open,
  userId,
  onClose,
  onUpdated,
}: {
  open: boolean;
  userId: string | null;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const { getUserOverview, updateUserKycStatus } = useAdminUser();

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [user, setUser] = useState<UserWithKYCResponseDTO | null>(null);
  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);

  async function fetchUserDetails(userId: string) {
    setLoading(true);
    try {
      const response = await getUserOverview(userId);
      setUser({
        ...response,
        kycStatus: response.kycStatus as KYCStatus,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open || !userId) return;
    fetchUserDetails(userId);
  }, [open, userId]);

  if (!open) return null;
  if (loading) return <LoadingScreen />;
  if (!user) return null;

  const breadcrumbs = [
    { label: "Users", to: "/admin/users" },
    { label: "User Details" },
  ];

  const kycStatus = user.kycStatus as KYCStatus;
  const canTakeAction =
    kycStatus === "REGISTERED" || kycStatus === "RESUBMITTED";

  const updateKYC = async (status: KYCStatus) => {
    if (!userId) return;

    let message = "Are you sure?";
    if (status === KYCSTATUS.APPROVED)
      message = `Approve ${user.name}'s traveler KYC?`;
    if (status === KYCSTATUS.REJECTED)
      message = `Reject ${user.name}'s traveler KYC?`;

    confirmToast(message, async () => {
      try {
        setActionLoading(true);

        const result = await updateUserKycStatus(userId, status);
        toast.success(result.message || "KYC updated");

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
    if (!userId) return;

    try {
      setActionLoading(true);

      const result = await updateUserKycStatus(
        userId,
        KYCSTATUS.REJECTED,
        reason
      );

      toast.success(result.message || "KYC rejected");

      setShowRejectReasonModal(false);
      onUpdated();
      onClose();
    } finally {
      setActionLoading(false);
    }
  };

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

      {/* HEADER */}
      <div className="sticky top-0 z-10">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white/70 
          backdrop-blur-md shadow-md text-gray-700 hover:bg-white hover:text-black transition"
        >
          <FaLeftLong />
        </button>
      </div>

      {/* BODY */}
      <div className="mt-6 space-y-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT — USER PROFILE */}
          <div className="lg:col-span-4 rounded-2xl bg-white p-5 shadow-sm">
            <UserProfileCard
              user={user}
              canTakeAction={canTakeAction}
              actionLoading={actionLoading}
              onReject={() => setShowRejectReasonModal(true)}
              onApprove={() => updateKYC(KYCSTATUS.APPROVED)}
            />
          </div>

          {/* RIGHT — INLINE KYC DETAILS */}
          <div className="lg:col-span-8 rounded-3xl border bg-white p-6 shadow-sm">
            {user.kyc ? (
              <KycDetails kyc={user.kyc as any} />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                No KYC submitted yet
              </div>
            )}
          </div>

        </div>

        {/* OPTIONAL DASHBOARD */}
        <AdminAgencyDashboard />

      </div>
    </>
  );
}
