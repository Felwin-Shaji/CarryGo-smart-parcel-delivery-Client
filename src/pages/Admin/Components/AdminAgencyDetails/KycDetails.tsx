import { X } from "lucide-react";
import type { KycResponseDTO } from "../../../../constants_Types/types/Admin/AdminAgency.dto";

export interface KycDetailsProps {
  open: boolean;
  onClose: () => void;
  kyc?: KycResponseDTO
}


const KycDetails = ({ open, onClose, kyc }: KycDetailsProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* MODAL */}
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-gray-50 shadow-xl">

        {/* HEADER */}
        <div
          className="
            sticky top-0 z-10
            flex items-center justify-between
            border-b
            bg-[var(--color-primary)]
            px-6 py-4
            text-white
          "
        >
          <h3 className="text-[var(--color-secondary)] ">KYC Details</h3>

          <div
            role="button"
            aria-label="Close modal"
            tabIndex={0}
            onClick={onClose}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              bg-white/15 text-white
              shadow-md
              transition-all duration-200
              hover:bg-white/25
              active:scale-95
            "
          >
            <X className="h-5 w-5 stroke-[2.4]" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-10 overflow-y-auto px-6 py-6">
          {/* IDENTIFICATION */}
          <section>
            <h4 className="mb-4 text-sm font-semibold text-gray-700">
              Identification Details
            </h4>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <KycInfo label="Trade License Number" value={kyc?.tradeLicenseNumber} />
              <KycInfo label="PAN Number" value={kyc?.PANnumber} />
              <KycInfo label="GST Number" value={kyc?.gst_number} />
            </div>
          </section>

          {/* DOCUMENTS */}
          <section>
            <h4 className="mb-4 text-sm font-semibold text-gray-700">
              Uploaded Documents
            </h4>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <KycImage title="Trade License" image={kyc?.tradeLicenseDocument} />
              <KycImage title="PAN Card" image={kyc?.PAN_photo} />
              <KycImage title="GST Certificate" image={kyc?.gst_certificate} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default KycDetails;



const KycInfo = ({ label, value }: { label: string; value?: string }) => (
  <div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
      {label}
    </p>
    <p className="mt-1 text-sm font-semibold text-gray-900">
      {value || "—"}
    </p>
  </div>
);



const KycImage = ({ title, image }: { title: string; image?: string }) => (
  <div className="group rounded-xl border bg-white p-4 shadow-sm">
    <p className="mb-2 text-sm font-semibold text-gray-800">{title}</p>

    {image ? (
      <a href={image} target="_blank" rel="noopener noreferrer" className="relative block">
        <img
          src={image}
          alt={title}
          className="h-44 w-full rounded-lg border object-cover transition group-hover:opacity-90"
        />

        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-800 shadow">
            View Full
          </span>
        </div>
      </a>
    ) : (
      <div className="flex h-44 items-center justify-center rounded-lg border border-dashed text-sm text-gray-400">
        No document uploaded
      </div>
    )}
  </div>
);

