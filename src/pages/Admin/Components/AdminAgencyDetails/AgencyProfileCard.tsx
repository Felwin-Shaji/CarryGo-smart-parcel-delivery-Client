import type { AgencyWithKYCResponseDTO } from "../../../../constants_Types/types/Admin/AdminAgency.dto";
import type { KYCStatus } from "../../../../constants_Types/types/roles";

export interface AgencyProfileCardProps {
  agency: AgencyWithKYCResponseDTO;
  canViewKyc: boolean;
  canTakeAction: boolean;
  actionLoading: boolean;

  onViewKyc: () => void;
  onReject: () => void;
  onApprove: () => void;
}


const AgencyProfileCard = ({
  agency,
  canViewKyc,
  canTakeAction,
  actionLoading,
  onViewKyc,
  onReject,
  onApprove,
}: AgencyProfileCardProps) => {
  return (
    <div className="bg-white p-1">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">

        {/* IDENTITY */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl
                          bg-[var(--color-primary)] text-base font-bold text-white">
            {agency.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-900">
              {agency.name}
            </h2>
            <p className="text-xs text-gray-500">{agency.email}</p>
            <p className="text-xs text-gray-500">{agency.mobile}</p>
          </div>
        </div>

        <KycStatusBadge status={agency.kycStatus} />
      </div>

      {/* DIVIDER */}
      <div className="my-4 h-px bg-gray-200" />

      {/* DETAILS */}
      <div className="space-y-3 text-sm">

        <ProfileRow
          label="Account Status"
          value={agency.isBlocked ? "Blocked" : "Active"}
          valueClass={agency.isBlocked ? "text-red-600" : "text-green-600"}
        />

        <ProfileRow
          label="KYC Submitted On"
          value={
            agency.kyc?.createdAt
              ? new Date(agency.kyc.createdAt).toLocaleDateString()
              : "—"
          }
        />

        {agency.rejectReason && (
          <ProfileRow
            label="Rejection Reason"
            value={agency.rejectReason}
            valueClass="text-red-600"
          />
        )}

        <ProfileRow
          label="Last Updated"
          value={new Date(agency.createdAt).toLocaleDateString()}
        />
      </div>

      {/* ACTIONS */}
      <div className="mt-5 flex flex-wrap gap-2">

        {canViewKyc && (
          <ActionButton
            label="View KYC"
            variant="outline"
            onClick={onViewKyc}
          />
        )}

        {canTakeAction && (
          <ActionButton
            label="Reject"
            variant="danger"
            disabled={actionLoading}
            onClick={onReject}
          />
        )}

        {canTakeAction && (
          <ActionButton
            label="Approve"
            variant="success"
            disabled={actionLoading}
            onClick={onApprove}
          />
        )}
      </div>
    </div>
  );
};

export default AgencyProfileCard;

const ActionButton = ({
  label,
  onClick,
  disabled,
  variant,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant: "outline" | "danger" | "success";
}) => {
  const styles = {
    outline: "",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl px-4 py-2 text-sm font-semibold
        transition
        disabled:cursor-not-allowed disabled:opacity-50
        ${styles[variant]}
      `}
    >
      {label}
    </button>
  );
};

const ProfileRow = ({
  label,
  value,
  valueClass = "text-gray-800",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex items-start justify-between gap-3">
    <span className="text-xs font-medium text-gray-500">
      {label}
    </span>
    <span className={`text-xs font-semibold text-right ${valueClass}`}>
      {value}
    </span>
  </div>
);

const statusStyles: Record<KYCStatus, string> = {
  REGISTERED: "bg-gray-100 text-gray-600",
  PENDING: "bg-orange-100 text-orange-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  RESUBMITTED: ""
};

const KycStatusBadge = ({ status }: { status: KYCStatus }) => (
  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
    {status}
  </span>
);
