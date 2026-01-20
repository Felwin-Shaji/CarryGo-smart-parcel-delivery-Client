import { FaXmark } from "react-icons/fa6";

export default function VerificationImageModal({
  open,
  imageUrl,
  onClose,
}: {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-4 shadow-xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Hub Verification Image
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <FaXmark />
          </button>
        </div>

        {/* IMAGE */}
        <div className="mt-4 flex justify-center">
          <img
            src={imageUrl}
            alt="Hub verification"
            className="max-h-[70vh] rounded-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
}
