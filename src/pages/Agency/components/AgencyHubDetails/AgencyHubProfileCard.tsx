import { useState } from "react";
import type { HubOverviewResponseDTO } from "../../../../shared/constants_Types/types/Agency/HubOverview.type";
import type { KYCStatus } from "../../../../shared/constants_Types/types/roles";
import VerificationImageModal from "./VerificationImageModal";

export default function AgencyHubProfileCard({ hub }: { hub: HubOverviewResponseDTO }) {

  const [showVerification, setShowVerification] = useState(false);

  return (
    <>
    <div className="bg-white p-1">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">

        {/* IDENTITY */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl
                       bg-[var(--color-primary)] text-base font-bold text-white"
          >
            {hub.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-900">
              {hub.name}
            </h2>
            <p className="text-xs text-gray-500">{hub.email}</p>
            <p className="text-xs text-gray-500">{hub.mobile}</p>
          </div>
        </div>

        <KycStatusBadge status={hub.kycStatus} />
      </div>

      {/* DIVIDER */}
      <div className="my-4 h-px bg-gray-200" />

      {/* DETAILS */}
      <div className="space-y-3 text-sm">

        <ProfileRow
          label="Account Status"
          value={hub.isBlocked ? "Blocked" : "Active"}
          valueClass={hub.isBlocked ? "text-red-600" : "text-green-600"}
        />

        <ProfileRow
          label="Wallet Balance"
          value={`₹ ${hub.walletBalance.toLocaleString()}`}
        />

        <ProfileRow
          label="Address"
          value={`${hub.address.addressLine1}, ${hub.address.city}`}
        />

        <ProfileRow
          label="Pincode"
          value={hub.address.pincode}
        />

        <ProfileRow
          label="Created On"
          value={new Date(hub.createdAt).toLocaleDateString()}
          />
      </div>

      {/* ACTIONS */}
        {hub.verificationImage && (
          <div className="mt-5">
            <ActionButton
              label="View Verification"
              onClick={() => setShowVerification(true)}
            />
          </div>
        )}
    </div>

          <VerificationImageModal
        open={showVerification}
        imageUrl={hub.verificationImage}
        onClose={() => setShowVerification(false)}
        />
        </>
  );
}


const ActionButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="
      rounded-xl px-4 py-2 text-sm font-semibold
      bg-indigo-600 text-white hover:bg-indigo-700
      transition
    "
  >
    {label}
  </button>
);

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
  RESUBMITTED: "bg-blue-100 text-blue-700",
};

const KycStatusBadge = ({ status }: { status: KYCStatus }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
  >
    {status}
  </span>
);

