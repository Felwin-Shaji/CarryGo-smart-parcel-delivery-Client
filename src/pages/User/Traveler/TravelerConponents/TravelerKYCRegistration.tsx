import { ShieldCheck, UploadCloud, FileText, CheckCircle } from "lucide-react";

const TravelerKYCRegistration = () => {
  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Complete Your KYC Verification
            </h1>
            <p className="text-sm text-gray-600">
              Required to start accepting and managing bookings
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-800">
            🔒 Your information is encrypted and used only for identity
            verification purposes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StepCard
            icon={<FileText className="text-purple-600" />}
            title="Prepare documents"
            text="Keep your government ID and address proof ready."
          />
          <StepCard
            icon={<UploadCloud className="text-green-600" />}
            title="Upload documents"
            text="Upload clear images or PDFs. No originals required."
          />
          <StepCard
            icon={<CheckCircle className="text-blue-600" />}
            title="Get verified"
            text="Our team reviews and approves within 24–48 hours."
          />
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <button
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium
                       hover:bg-blue-700 transition"
            onClick={() => {
              // navigate to KYC form route
              // navigate("/traveler/kyc");
            }}
          >
            Start KYC Verification
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-sm text-gray-500">
          This process is one-time only. You won’t need to verify again.
        </p>

      </div>
    </div>
  );
};

export default TravelerKYCRegistration;

/* ---------------- helpers ---------------- */

const StepCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => {
  return (
    <div className="border rounded-xl p-5 hover:shadow-sm transition">
      <div className="mb-3">{icon}</div>
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{text}</p>
    </div>
  );
};
