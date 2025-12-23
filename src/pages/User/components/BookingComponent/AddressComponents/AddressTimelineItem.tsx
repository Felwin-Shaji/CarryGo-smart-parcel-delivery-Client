import type { Address } from "../AddressStep";

interface AddressTimelineItemProps {
  title: string;
  address: Address | null;
  active: boolean;
  onClick: () => void;
}

const AddressTimelineItem = ({
  title,
  address,
  active,
  onClick,
}: AddressTimelineItemProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        group flex w-full items-start gap-4
        cursor-pointer outline-none
        transition-opacity
        ${active ? "opacity-100" : "opacity-80 hover:opacity-100"}
      `}
    >
      {/* Timeline Indicator */}
      <div className="pt-1 flex items-center justify-center">
        <span
          className={`
            h-3 w-3 rounded-full transition-all
            ${
              active
                ? "bg-[var(--color-primary)] scale-110"
                : "bg-gray-400 group-hover:bg-[var(--color-primary)]"
            }
          `}
        />
      </div>

      {/* Content Card */}
      <div
        className={`
          flex-1 rounded-[var(--radius-lg)] border
          px-5 py-4 transition-all
          ${
            active
              ? "border-[var(--color-primary)] bg-white shadow-[var(--shadow-base)]"
              : "border-gray-200 bg-gray-50 group-hover:border-[var(--color-primary)]"
          }
        `}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {title}
        </p>

        {address ? (
          <>
            <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
              {address.label}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {address.line1}, {address.city}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-gray-400">
            Tap to select address
          </p>
        )}
      </div>
    </div>
  );
};

export default AddressTimelineItem;
