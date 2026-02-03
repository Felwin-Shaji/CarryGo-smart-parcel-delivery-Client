import { useState } from "react";

interface AddMoneyModalProps {
  onClose: () => void;
  onProceed: (amount: number) => void;
}

export const AddMoneyModal = ({ onClose, onProceed }: AddMoneyModalProps) => {
  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 space-y-4">

        <h2 className="text-lg font-bold">Add Money</h2>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border rounded-lg px-3 py-2"
          min={1}
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onProceed(amount)}
            disabled={amount <= 0}
            className="flex-1 bg-[var(--color-primary)] text-white rounded-lg py-2 disabled:opacity-50"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};
