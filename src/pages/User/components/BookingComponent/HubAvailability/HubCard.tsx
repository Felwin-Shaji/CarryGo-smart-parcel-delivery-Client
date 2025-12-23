const HubCard = ({
  hub,
  selected,
  onClick,
}: {
  hub: {
    name: string;
    distanceKm: number;
    address: string;
  };
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    className={`w-full border rounded-2xl px-4 py-4 cursor-pointer transition
      ${
        selected
          ? "border-black bg-gray-50"
          : "border-gray-200 hover:border-gray-400"
      }
    `}
  >
    <div className="flex justify-between items-center">
      <p className="text-sm font-semibold text-gray-900">
        {hub.name}
      </p>
      <span className="text-xs text-gray-500">
        {hub.distanceKm} km
      </span>
    </div>

    <p className="text-sm text-gray-600 mt-1">
      {hub.address}
    </p>

    {selected && (
      <p className="mt-2 text-xs font-medium text-green-600">
        Selected
      </p>
    )}
  </div>
);

export default HubCard;
