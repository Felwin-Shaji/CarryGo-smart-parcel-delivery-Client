import { FaIdCard, FaCalendarAlt, FaUser } from "react-icons/fa";
import type { IDType } from "../../shared/constants_Types/types/Worker/workerRequest.dto";
import type { KYCStatus } from "../../shared/constants_Types/types/roles";

type Props = {
  kyc: {
    idType: IDType;
    documentUrl: string;
    selfieUrl: string;
    status: KYCStatus;
    createdAt: Date | string;
    reviewedAt?: Date | string | null;
  };
};

export default function WorkerKycDetails ({ kyc }: Props) {
  return (
    <div className="space-y-6">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ID TYPE */}
        <div className="border rounded-xl p-4">
          <p className="text-xs text-gray-400">ID Type</p>
          <div className="flex items-center gap-2 mt-2">
            <FaIdCard className="text-gray-400" />
            <span className="font-medium">{kyc.idType}</span>
          </div>
        </div>

        {/* DATE */}
        <div className="border rounded-xl p-4">
          <p className="text-xs text-gray-400">Submitted On</p>
          <div className="flex items-center gap-2 mt-2">
            <FaCalendarAlt className="text-gray-400" />
            <span>
              {new Date(kyc.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

      </div>

      {/* DOCUMENT + SELFIE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* DOCUMENT */}
        <div className="border rounded-xl overflow-hidden">
          <div className="p-3 border-b text-sm font-medium">
            ID Document
          </div>
          <img
            src={kyc.documentUrl}
            alt="Document"
            className="w-full h-52 object-cover"
          />
        </div>

        {/* SELFIE */}
        <div className="border rounded-xl overflow-hidden">
          <div className="p-3 border-b text-sm font-medium flex items-center gap-2">
            <FaUser />
            Selfie Verification
          </div>
          <img
            src={kyc.selfieUrl}
            alt="Selfie"
            className="w-full h-52 object-cover"
          />
        </div>

      </div>

    </div>
  );
}