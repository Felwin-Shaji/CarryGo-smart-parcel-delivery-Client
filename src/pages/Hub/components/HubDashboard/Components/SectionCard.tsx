interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    action?: React.ReactNode;
}

export const SectionCard = ({ title, children, action }: SectionCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">{title}</h3>
                {action && <div>{action}</div>}
            </div>

            <div className="flex-1">{children}</div>
        </div>
    );
};