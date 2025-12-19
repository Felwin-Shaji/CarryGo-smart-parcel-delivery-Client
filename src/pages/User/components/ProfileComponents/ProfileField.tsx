const ProfileField = ({
    label,
    value,
    hint,
}: {
    label: string;
    value: React.ReactNode;
    hint?: string;
}) => (
    <div className="flex justify-between items-start border-b pb-2 text-sm">
        <div>
            <p className="text-gray-500">{label}</p>
            {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
        <div className="font-medium text-gray-800">{value}</div>
    </div>
);

export default ProfileField