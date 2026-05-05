export interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color?: "blue" | "green" | "yellow" | "red";
    subtitle?: string;
}

export const StatCard = ({
    title,
    value,
    icon,
    color = "blue",
    subtitle,
}: StatCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-2xl font-semibold">{value}</h2>
                {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
            </div>
            <div className={`p-2 rounded-full bg-${color}-100`}>
                {icon}
            </div>
        </div>
    );
};

interface StatsGridProps {
    stats: StatCardProps[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};