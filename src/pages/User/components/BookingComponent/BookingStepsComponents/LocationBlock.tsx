const LocationBlock = ({
    icon,
    title,
    description,
    address,
    onClick,
}: {
    icon: string;
    title: string;
    description: string;
    address?: any;
    onClick: () => void;
}) => (
    <div>
        <div className="flex items-center gap-4 mb-4">
            <div className="text-2xl">{icon}</div>
            <div>
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>

        <div
            onClick={onClick}
            className="border rounded-xl p-6 hover:border-black transition cursor-pointer"
        >
            {address ? (
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">
                            {address.formattedAddress}
                        </p>
                        {address.isTemporary && (
                            <span className="text-xs text-gray-400">
                                Temporary address
                            </span>
                        )}
                    </div>

                    <span className="text-sm text-gray-400">Change</span>
                </div>
            ) : (
                <div className="text-gray-400">
                    + Select location
                </div>
            )}
        </div>
    </div>
);

export const SummaryItem = ({
    label,
    value,
    bold,
}: {
    label: string;
    value?: string;
    bold?: boolean;
}) => (
    <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
            {label}
        </p>
        <p
            className={`text-sm ${bold ? "font-semibold text-black" : "text-gray-700"
                }`}
        >
            {value || "—"}
        </p>
    </div>
);

export default LocationBlock