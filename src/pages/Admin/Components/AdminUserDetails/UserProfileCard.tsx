import { User, Mail, Phone, Wallet, ShieldCheck, ShieldX } from "lucide-react";
import { type KYCStatus } from "../../../../shared/constants_Types/types/roles";

interface UserProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
    walletBalance: number;
    isBlocked: boolean;
    kycStatus: KYCStatus;
    createdAt: string;
  };
  canTakeAction: boolean;
  actionLoading: boolean;
  onApprove: () => void;
  onReject: () => void;
}

const statusColorMap: Record<KYCStatus, string> = {
  PENDING: "bg-gray-100 text-gray-700",
  REGISTERED: "bg-blue-100 text-blue-700",
  RESUBMITTED: "bg-orange-100 text-orange-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const UserProfileCard = ({
  user,
  canTakeAction,
  actionLoading,
  onApprove,
  onReject,
}: UserProfileCardProps) => {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="h-7 w-7 text-indigo-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>
      </div>

      {/* STATUS */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColorMap[user.kycStatus]}`}
        >
          KYC: {user.kycStatus}
        </span>

        {user.isBlocked && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            Blocked
          </span>
        )}
      </div>

      {/* INFO */}
      <div className="space-y-3 text-sm text-gray-700">
        <InfoRow icon={<Mail size={16} />} label="Email" value={user.email} />
        <InfoRow icon={<Phone size={16} />} label="Mobile" value={user.mobile} />
        <InfoRow
          icon={<Wallet size={16} />}
          label="Wallet Balance"
          value={`₹ ${user.walletBalance.toFixed(2)}`}
        />
      </div>

      {/* META */}
      <div className="text-xs text-gray-500">
        Joined on{" "}
        <span className="font-medium">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* ACTIONS */}
      {canTakeAction && (
        <div className="pt-4 border-t flex gap-3">
          <button
            onClick={onApprove}
            disabled={actionLoading}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg 
            bg-green-600 px-4 py-2 text-sm font-medium text-white
            hover:bg-green-700 disabled:opacity-60"
          >
            <ShieldCheck size={16} />
            Approve
          </button>

          <button
            onClick={onReject}
            disabled={actionLoading}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg 
            bg-red-600 px-4 py-2 text-sm font-medium text-white
            hover:bg-red-700 disabled:opacity-60"
          >
            <ShieldX size={16} />
            Reject
          </button>
        </div>
      )}

      {!canTakeAction && (
        <p className="text-center text-sm text-gray-400">
          No actions available for this KYC state
        </p>
      )}
    </div>
  );
};

export default UserProfileCard;

/* ---------------- helpers ---------------- */

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-400">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
};

