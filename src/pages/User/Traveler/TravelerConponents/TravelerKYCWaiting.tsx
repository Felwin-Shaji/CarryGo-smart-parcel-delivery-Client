import { Clock, ShieldCheck, Mail, FileText } from "lucide-react";

const TravelerKYCWaiting = () => {
  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-yellow-100">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          KYC Verification in Progress
        </h1>

        {/* Description */}
        <p className="text-center text-gray-600 mt-3">
          Thanks for submitting your KYC details! Our team is currently reviewing
          your information to ensure a safe and trusted experience for everyone.
        </p>

        {/* Info Box */}
        <div className="mt-6 space-y-4">
          <InfoRow
            icon={<ShieldCheck className="text-blue-600" />}
            title="Why verification matters"
            text="KYC helps us verify traveler authenticity and keeps deliveries secure."
          />

          <InfoRow
            icon={<FileText className="text-purple-600" />}
            title="What happens next?"
            text="Our verification team will carefully review your documents."
          />

          <InfoRow
            icon={<Mail className="text-green-600" />}
            title="You'll be notified"
            text="Once approved or if changes are needed, we’ll notify you instantly."
          />
        </div>

        {/* Timeline */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-700">
            ⏳ <span className="font-medium">Estimated review time:</span>  
            <br />
            <span className="text-gray-900 font-semibold">
              24 – 48 hours
            </span>
          </p>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-sm text-gray-500">
          You can relax — no action is required from your side right now.
        </p>
      </div>
    </div>
  );
};

export default TravelerKYCWaiting;

/* ---------------- helper ---------------- */

const InfoRow = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
};
