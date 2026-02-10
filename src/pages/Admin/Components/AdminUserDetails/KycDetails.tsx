import { IdCard, User, FileText, Calendar } from "lucide-react";

interface KycDetailsProps {
  kyc: {
    idType: "AADHAAR" | "DL" | "PASSPORT";
    documentUrl: string;
    selfieUrl: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    reviewedAt?: string | null;
  };
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const KycDetails = ({ kyc }: KycDetailsProps) => {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          KYC Details
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[kyc.status]}`}
        >
          {kyc.status}
        </span>
      </div>

      {/* META INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <MetaItem
          icon={<IdCard size={16} />}
          label="ID Type"
          value={kyc.idType}
        />
        <MetaItem
          icon={<Calendar size={16} />}
          label="Submitted On"
          value={new Date(kyc.createdAt).toLocaleDateString()}
        />

        {kyc.reviewedAt && (
          <MetaItem
            icon={<Calendar size={16} />}
            label="Reviewed On"
            value={new Date(kyc.reviewedAt).toLocaleDateString()}
          />
        )}
      </div>

      {/* DOCUMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ID DOCUMENT */}
        <DocumentCard
          title="ID Document"
          icon={<FileText size={18} />}
          url={kyc.documentUrl}
        />

        {/* SELFIE */}
        <DocumentCard
          title="Selfie Verification"
          icon={<User size={18} />}
          url={kyc.selfieUrl}
        />

      </div>
    </div>
  );
};

export default KycDetails;

/* ---------------- helper components ---------------- */

const MetaItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3 bg-gray-50">
      <div className="text-gray-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
};

const DocumentCard = ({
  title,
  icon,
  url,
}: {
  title: string;
  icon: React.ReactNode;
  url: string;
}) => {
  const isPdf = url.endsWith(".pdf");

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
        <div className="text-gray-600">{icon}</div>
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
      </div>

      <div className="h-72 bg-gray-100 flex items-center justify-center">
        {isPdf ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium"
          >
            View PDF Document
          </a>
        ) : (
          <img
            src={url}
            alt={title}
            className="h-full w-full object-contain"
          />
        )}
      </div>
    </div>
  );
};
