import { AlertTriangle } from "lucide-react";

const HubKYCRejected = () => {


  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-xl font-semibold text-gray-800">
          KYC Verification Rejected
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Your KYC submission did not meet our verification requirements.
        </p>

        {/* Footer note */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Please ensure all documents are clear, valid, and match registered agency details.
        </p>
      </div>
    </div>
  );
};

export default HubKYCRejected;
