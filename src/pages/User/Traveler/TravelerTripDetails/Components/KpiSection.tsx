import { Package, Truck, CheckCircle2, XCircle } from "lucide-react";

type KpiSectionProps = {
  stats: {
    totalOrders: number;
    activeOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
  };
};

export const KpiSection = ({ stats }: KpiSectionProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <KpiCard
        title="Total"
        value={stats.totalOrders}
        icon={<Package size={18} />}
      />

      <KpiCard
        title="Active"
        value={stats.activeOrders}
        icon={<Truck size={18} />}
      />

      <KpiCard
        title="Delivered"
        value={stats.deliveredOrders}
        icon={<CheckCircle2 size={18} />}
      />

      <KpiCard
        title="Cancelled"
        value={stats.cancelledOrders}
        icon={<XCircle size={18} />}
      />

    </div>
  );
};

const KpiCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  highlight?: boolean;
  icon?: React.ReactNode;
  color?: string;
}) => {

  return (
    <div className={`bg-white border rounded-xl p-4 shadow-sm flex justify-between items-center`}>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>

      <div className={`p-2 rounded-lg bg-${color || "gray"}-100`}>
        <span>{icon}</span>
      </div>
    </div>
  );
};