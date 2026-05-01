import { useState } from "react";
import toast from "react-hot-toast";

type RejectReasonModalProps = {
    open: boolean;
    loading?: boolean;
    onClose: () => void;
    onSubmit: (reason: string) => Promise<void> | void;
};



const RejectReasonModal = ({
    open,
    loading,
    onClose,
    onSubmit,
}: RejectReasonModalProps) => {
    const [reason, setReason] = useState("");

    if (!open) return null;

    const handleSubmit = async () => {
        if (!reason.trim()) {
            toast.error("Please enter a valid reason");
            return;
        }

        await onSubmit(reason);
        setReason("");
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            {/* MODAL */}
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h3 className="text-base font-bold text-gray-900">
                        Rejection Reason
                    </h3>

                    <div
                        role="button"
                        tabIndex={0}
                        aria-label="Close"
                        onClick={onClose}
                        className="
              flex h-8 w-8 items-center justify-center
              rounded-lg text-gray-500
              transition hover:bg-gray-100 hover:text-gray-800
              active:scale-95
            "
                    >
                        ✕
                    </div>
                </div>

                {/* CONTENT */}
                <div className="space-y-4 px-6 py-5">
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                        placeholder="Explain why this KYC is rejected..."
                        className="
              w-full resize-none rounded-xl border
              px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-red-500
            "
                    />
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">

                    {/* CANCEL */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={onClose}
                        className="
              inline-flex items-center justify-center
              rounded-xl px-4 py-2
              text-sm font-semibold text-gray-700
              transition hover:bg-gray-200
            "
                    >
                        Cancel
                    </div>

                    {/* SUBMIT */}
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="
              rounded-xl bg-red-600 px-4 py-2
              text-sm font-semibold text-white
              transition hover:bg-red-700
              disabled:cursor-not-allowed disabled:opacity-50
            "
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RejectReasonModal;
