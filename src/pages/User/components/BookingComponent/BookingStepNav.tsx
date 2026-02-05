interface Props {
  showBack?: boolean;
  showForward?: boolean;
  canGoForward?: boolean;
  onBack?: () => void;
  onForward?: () => void;
}

const BookingStepNav = ({
  showBack = true,
  showForward = true,
  canGoForward = false,
  onBack,
  onForward,
}: Props) => {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Back */}
        {showBack ? (
          <button
            onClick={onBack}
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {/* Forward */}
        {showForward && (
          <button
            onClick={onForward}
            disabled={!canGoForward}
            className={`text-sm font-medium
              ${
                canGoForward
                  ? "text-black hover:underline"
                  : "text-gray-400 cursor-not-allowed"
              }`}
          >
            Forward →
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingStepNav;
