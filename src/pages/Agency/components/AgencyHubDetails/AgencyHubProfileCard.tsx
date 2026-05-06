import {
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import type { HubOverviewResponseDTO } from "../../../../shared/constants_Types/types/Agency/HubOverview.type";
import type { ReactNode } from "react";
import type { KYCStatus } from "../../../../shared/constants_Types/types/roles";

type props = {
  hub: HubOverviewResponseDTO;
  actions?: ReactNode;
}

export default function AgencyHubProfilePage({ hub, actions }: props) {
  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* ================= MAIN LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT PANEL ================= */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">

          {/* PROFILE */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold">
              {hub.name.charAt(0)}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {hub.name}
              </h2>
              <p className="text-sm text-gray-500">HUB</p>
            </div>
          </div>

          {/* STATUS BADGE */}
          <KycStatusBadge status={hub.kycStatus} />

          <hr />

          {/* DETAILS */}
          <Info icon={<Mail size={14} />} label="Email" value={hub.email} />
          <Info icon={<Phone size={14} />} label="Mobile" value={hub.mobile} />
          <Info
            icon={<ShieldCheck size={14} />}
            label="Status"
            value={hub.isBlocked ? "Blocked" : "Active"}
            highlight
          />
          <Info
            icon={<Calendar size={14} />}
            label="Created"
            value={new Date(hub.createdAt).toLocaleDateString()}
          />

          {actions && <div className="pt-3">{actions}</div>}

        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="lg:col-span-2 bg-white border rounded-2xl p-6 shadow-sm space-y-6">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-gray-800">
              Hub Details
            </h3>

            <KycStatusBadge status={hub.kycStatus} />
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* ADDRESS */}
            <DetailCard title="Address">
              <p className="text-sm text-gray-700">
                {hub.address.addressLine1}, {hub.address.city}
              </p>

              <div className="flex justify-between mt-3 text-sm">
                <span className="text-gray-500">Pincode</span>
                <span className="font-medium">
                  {hub.address.pincode}
                </span>
              </div>
            </DetailCard>

            {/* ACCOUNT */}
            <DetailCard title="Account Info">
              <Row label="Wallet">
                ₹ {hub.walletBalance.toLocaleString()}
              </Row>

              <Row label="Status">
                <span
                  className={`px-2 py-0.5 rounded text-xs ${hub.isBlocked
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                    }`}
                >
                  {hub.isBlocked ? "Blocked" : "Active"}
                </span>
              </Row>
            </DetailCard>

            {/* VERIFICATION IMAGE */}
            {hub.verificationImage && (
              <DetailCard title="Verification">
                <img
                  src={hub.verificationImage}
                  className="w-full h-44 object-cover rounded-xl border"
                />
              </DetailCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */


type InfoProps = {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  highlight?: boolean;
};

const Info = ({ icon, label, value, highlight = false }: InfoProps) => (
  <div className="space-y-1 text-sm">
    <div className="flex items-center gap-2 text-gray-500">
      {icon}
      {label}
    </div>

    <div
      className={`font-medium ${highlight ? "text-green-600" : "text-gray-900"
        }`}
    >
      {value}
    </div>
  </div>
);

type DetailCardProps = {
  title: string;
  children: ReactNode;
};

const DetailCard = ({ title, children }: DetailCardProps) => (
  <div className="border rounded-xl p-4 bg-gray-50">
    <h4 className="text-sm font-semibold text-gray-600 mb-3">
      {title}
    </h4>
    {children}
  </div>
);

type RowProps = {
  label: string;
  children: ReactNode;
};
const Row = ({ label, children }: RowProps) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{children}</span>
  </div>
);

const statusStyles: Record<KYCStatus, string> = {
  REGISTERED: "bg-gray-100 text-gray-600",
  PENDING: "bg-orange-100 text-orange-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  RESUBMITTED: "bg-blue-100 text-blue-700",
};

type KycStatusBadgeProps = {
  status: KYCStatus;
};

const KycStatusBadge = ({ status }: KycStatusBadgeProps) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
  >
    {status}
  </span>
);