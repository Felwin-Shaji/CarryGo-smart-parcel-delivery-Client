import { FaEnvelope, FaPhoneAlt, FaWallet } from "react-icons/fa";
import WorkerKycDetails from "./WorkerKycDetails";
import type { GetWorkerOverviewResponseDTO } from "../../shared/constants_Types/types/Worker/workerRequest.dto";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type Props = {
  worker: GetWorkerOverviewResponseDTO;
  showActions?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  canResubmit?: boolean;
  actionLoading?: boolean;
};

export default function WorkerDetailsBase({
  worker,
  showActions,
  onApprove,
  onReject,
  canResubmit,
  actionLoading,
}: Props) {
  const navigate = useNavigate();

  const canReview =
    worker.kycStatus === "REGISTERED" || worker.kycStatus === "RESUBMITTED";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* ================= LEFT PROFILE ================= */}
      <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-sm">

        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">
            <FaUser />
          </div>

          <div>
            <h2 className="text-lg font-semibold">{worker.name}</h2>
            <p className="text-sm text-gray-500">{worker.workerRole}</p>
          </div>
        </div>

        {/* KYC Badge */}
        <div className="mt-4">
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
            KYC: {worker.kycStatus}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t my-5" />

        {/* Info Section */}
        <div className="space-y-4 text-sm">

          <div>
            <p className="text-gray-400 text-xs">Email</p>
            <div className="flex items-center gap-2 mt-1">
              <FaEnvelope className="text-gray-400" />
              <span>{worker.email}</span>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-xs">Mobile</p>
            <div className="flex items-center gap-2 mt-1">
              <FaPhoneAlt className="text-gray-400" />
              <span>{worker.mobile || "-"}</span>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-xs">Wallet Balance</p>
            <div className="flex items-center gap-2 mt-1">
              <FaWallet className="text-gray-400" />
              <span>₹ {worker.walletBalance}</span>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-xs">Working Status</p>
            <span className="text-sm font-medium">
              {worker.workingStatus}
            </span>
          </div>

          <div>
            <p className="text-gray-400 text-xs">Joined On</p>
            <span className="text-sm">
              {new Date(worker.createdAt).toLocaleDateString()}
            </span>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t my-5" />

        {/* Actions */}
        {/* Actions */}
        {showActions && (
          <div className="space-y-3">

            {/* ✅ Approve / Reject */}
            {canReview && (
              <div className="flex gap-3">
                <button
                  onClick={onApprove}
                  disabled={actionLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Approve
                </button>

                <button
                  onClick={onReject}
                  disabled={actionLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Reject
                </button>
              </div>
            )}


          </div>
        )}
        {/* ✅ Resubmit */}
        {canResubmit && (
          <button
            onClick={() => navigate(`/hub/workers/kyc/resubmit/${worker.id}`)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium"
          >
            Resubmit KYC
          </button>
        )}

      </div>

      {/* ================= RIGHT KYC ================= */}
      <div className="lg:col-span-8 bg-white p-6 rounded-3xl border shadow-sm">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold">KYC Details</h3>

          <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 font-medium">
            {worker.kycStatus}
          </span>
        </div>

        {/* Content */}
        {worker.kyc ? (
          <WorkerKycDetails kyc={worker.kyc} />
        ) : (
          <div className="flex items-center justify-center h-40 text-gray-400">
            No KYC submitted yet
          </div>
        )}

      </div>

    </div>
  );
}