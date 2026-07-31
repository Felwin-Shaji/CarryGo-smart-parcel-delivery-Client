import type { AddressUI } from "../../../../../../../context/Booking/Booking.types";

interface AddressModalFooterProps {
    mode: "SAVED" | "MAP";

    selectedAddress: AddressUI | null;

    onClose: () => void;

    handleConfirm: () => void;
}

const AddressModalFooter = ({ mode, onClose, handleConfirm, selectedAddress }: AddressModalFooterProps) => {
    return (
        <>
            <div className="px-8 py-5 border-t border-neutral-100 flex justify-end gap-3 bg-gradient-to-t from-neutral-50/50 to-white">

                <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 hover:shadow-sm active:bg-neutral-50 transition-all duration-150"
                >
                    Cancel
                </button>

                {mode === "SAVED" && (
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedAddress}
                        className="px-7 py-3 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 active:bg-neutral-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 shadow-sm hover:shadow-md"
                    >
                        Confirm Location
                    </button>
                )}

            </div>
        </>
    )
}

export default AddressModalFooter