interface Props {
  onBack: () => void;
  onReset: () => void;
  onContinue?: () => void;
  disableContinue?: boolean;
}

const BookingNavigation = ({
  onBack,
  onReset,
  onContinue,
  disableContinue,
}: Props) => {
  return (
    <div className="flex items-center gap-3 mt-6">

      {/* Back */}
      <button
        onClick={onBack}
        className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
      >
        ← Back
      </button>

      {/* Cancel */}
      <button
        onClick={onReset}
        className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50"
      >
        ✕ Cancel
      </button>

      {/* Continue */}
      {onContinue && (
        <button
          onClick={onContinue}
          disabled={disableContinue}
          className={`px-16 py-2 rounded-md text-sm font-medium transition
          ${
            disableContinue
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          Continue
        </button>
      )}

    </div>
  );
};

export default BookingNavigation;