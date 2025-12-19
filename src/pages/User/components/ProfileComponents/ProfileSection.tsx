const ProfileSection = ({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) => (
    <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <div className="space-y-3">{children}</div>
    </div>
);

export default ProfileSection