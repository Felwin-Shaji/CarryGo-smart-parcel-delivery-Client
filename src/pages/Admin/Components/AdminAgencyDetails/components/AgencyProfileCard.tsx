import { X } from "lucide-react";
import type {
  AgencyWithKYCResponseDTO,
} from "../../../../../shared/constants_Types/types/Admin/AdminAgency.dto";

import type {
  KYCStatus,
} from "../../../../../shared/constants_Types/types/roles";
import { useState } from "react";

type Props = {
  agency: AgencyWithKYCResponseDTO;
  canTakeAction: boolean;
  actionLoading: boolean;
  onReject: () => void;
  onApprove: () => void;
};

export default function AgencyProfileCard({
  agency,
  canTakeAction,
  actionLoading,
  onReject,
  onApprove,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT PROFILE CARD */}
      <div
        className="
          lg:col-span-4
          rounded-3xl
          border border-slate-200
          bg-white
          p-7
          shadow-sm
          h-fit
        "
      >
        {/* HEADER */}
        <div className="flex items-start gap-5">
          <div
            className="
              h-14 w-14
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-indigo-700
              flex items-center justify-center
              text-2xl font-bold text-white
              shrink-0
            "
          >
            {agency.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <h2
              className="
                text-[18px]
                font-bold
                text-slate-900
                leading-snug
                break-words
              "
            >
              {agency.name}
            </h2>

            <p className="mt-1 text-slate-500 text-sm">AGENCY</p>

            <div className="mt-4">
              <KycStatusBadge status={agency.kycStatus} />
            </div>
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="mt-8 border-t border-slate-200 pt-6 space-y-7">
          <InfoItem label="Email" value={agency.email} />

          <InfoItem label="Mobile" value={agency.mobile} />

          <InfoItem
            label="Status"
            value={agency.isBlocked ? "Blocked" : "Active"}
            valueClass={
              agency.isBlocked ? "text-red-600" : "text-green-600"
            }
          />

          <InfoItem
            label="Created"
            value={new Date(agency.createdAt).toLocaleDateString()}
          />
        </div>
      </div>

      {/* RIGHT DETAILS CARD */}
      <div
        className="
          lg:col-span-8
          rounded-3xl
          border border-slate-200
          bg-white
          p-7
          shadow-sm
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h3
            className="
              text-[20px]
              font-bold
              text-slate-900
            "
          >
            Agency Details
          </h3>

          <KycStatusBadge status={agency.kycStatus} />
        </div>

        {/* DETAILS GRID */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <DetailsCard
            title="PAN Number"
            value={agency.kyc?.PANnumber || "-"}
          />

          <DetailsCard
            title="GST Number"
            value={agency.kyc?.gst_number || "-"}
          />

          <DetailsCard
            title="Trade License"
            value={agency.kyc?.tradeLicenseNumber || "-"}
          />

          <DetailsCard
            title="Submitted"
            value={
              agency.kyc?.createdAt
                ? new Date(agency.kyc.createdAt).toLocaleDateString()
                : "-"
            }
          />
        </div>

        {/* DOCUMENTS */}
        {agency.kyc && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-slate-900">
              Verification
            </h4>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <DocumentPreview
                title="PAN Card"
                image={agency.kyc.PAN_photo}
              />

              <DocumentPreview
                title="GST Certificate"
                image={agency.kyc.gst_certificate}
              />

              <DocumentPreview
                title="Trade License"
                image={agency.kyc.tradeLicenseDocument}
              />
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        {canTakeAction && (
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={onReject}
              disabled={actionLoading}
              className="
                rounded-xl
                bg-red-600
                px-5 py-2.5
                text-white
                text-sm
                font-semibold
                transition
                hover:bg-red-700
                disabled:opacity-50
              "
            >
              Reject
            </button>

            <button
              onClick={onApprove}
              disabled={actionLoading}
              className="
                rounded-xl
                bg-green-600
                px-5 py-2.5
                text-white
                text-sm
                font-semibold
                transition
                hover:bg-green-700
                disabled:opacity-50
              "
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const InfoItem = ({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div>
    <p className="text-slate-500 text-sm font-medium">{label}</p>

    <p
      className={`
        mt-1
        text-[15px]
        font-medium
        text-slate-900
        break-words
        ${valueClass}
      `}
    >
      {value}
    </p>
  </div>
);

const DetailsCard = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <div
    className="
      rounded-2xl
      border border-slate-200
      p-3
      bg-white
    "
  >
    <p className="text-slate-500 text-sm font-small">{title}</p>

    <p
      className="
        mt-3
        text-[15px]
        font-medium
        text-slate-900
        break-words
      "
    >
      {value}
    </p>
  </div>
);

const DocumentPreview = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          cursor-pointer
          transition
          hover:shadow-md
          hover:border-slate-300
        "
      >
        <div
          className="
            aspect-[4/3]
            overflow-hidden
            bg-slate-100
          "
        >
          <img
            src={image}
            alt={title}
            className="
              h-full w-full
              object-cover
              transition-transform
              duration-300
              hover:scale-105
            "
          />
        </div>

        <div className="p-3">
          <p className="text-sm font-medium text-slate-800">
            {title}
          </p>
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {isOpen && (
        <div
          className="
            fixed inset-0
            z-50
            bg-black/70
            flex items-center justify-center
            p-6
          "
          onClick={() => setIsOpen(false)}
        >
          <div
            className="
              relative
              max-w-5xl
              max-h-[90vh]
              w-full
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="
                absolute
                -top-12
                right-0
                text-white
                hover:text-slate-300
              "
            >
              <X size={32} />
            </button>

            {/* Preview Image */}
            <img
              src={image}
              alt={title}
              className="
                w-full
                max-h-[90vh]
                object-contain
                rounded-2xl
                bg-white
              "
            />
          </div>
        </div>
      )}
    </>
  );
};

type KycStatusBadgeProps = {
  status: KYCStatus;
};

const statusStyles: Record<KYCStatus, string> = {
  REGISTERED: "bg-slate-100 text-slate-700",
  PENDING: "bg-orange-100 text-orange-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  RESUBMITTED: "bg-blue-100 text-blue-700",
};

const KycStatusBadge = ({
  status,
}: KycStatusBadgeProps) => {
  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-3 py-1
        text-xs
        font-semibold
        tracking-wide
        ${statusStyles[status]}
      `}
    >
      {status}
    </span>
  );
};