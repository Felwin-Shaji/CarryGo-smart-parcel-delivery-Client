import { useState } from "react";

interface Props {
    onClose: () => void;
    onProceed: (amount: number) => void;
}

export const WithdrawMoneyModal = ({ onClose, onProceed }: Props) => {
    const [amount, setAmount] = useState("");

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 space-y-4">
                <h2 className="text-lg font-semibold">Withdraw Money</h2>

                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onProceed(Number(amount))}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    );
};
