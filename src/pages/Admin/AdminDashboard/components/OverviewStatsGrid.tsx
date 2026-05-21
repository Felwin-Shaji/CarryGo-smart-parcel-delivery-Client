import {
  Users,
  Building2,
  PackageCheck,
  IndianRupee,
  Truck,
  Package,
  type LucideIcon,
} from "lucide-react";

import type {
  AdminDashboardResponseDTO,
} from "../../../../shared/constants_Types/types/Admin/AdminDashboard.dto";

interface Props {
  overview: AdminDashboardResponseDTO["overview"];
}

type CardConfig = {
  key: keyof AdminDashboardResponseDTO["overview"];
  label: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  glow: string;
  currency?: boolean;
};

const cards: CardConfig[] = [
  {
    key: "totalUsers",
    label: "Total Users",
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    glow: "from-blue-500/10",
  },
  {
    key: "totalTravelers",
    label: "Travelers",
    icon: Truck,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    glow: "from-indigo-500/10",
  },
  {
    key: "totalAgencies",
    label: "Agencies",
    icon: Building2,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    glow: "from-violet-500/10",
  },
  {
    key: "activeParcels",
    label: "Active Parcels",
    icon: Package,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    glow: "from-yellow-500/10",
  },
  {
    key: "deliveredParcels",
    label: "Delivered",
    icon: PackageCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    glow: "from-emerald-500/10",
  },
  {
    key: "platformRevenue",
    label: "Platform Revenue",
    icon: IndianRupee,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
    glow: "from-slate-500/10",
    currency: true,
  },
] as const;

export default function OverviewStatsGrid({
  overview,
}: Props) {
  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        const value =
          overview[card.key];

        return (

          <div
            key={card.key}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border border-slate-200/70
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            {/* Background Glow */}
            <div
              className={`
                absolute
                inset-0
                bg-gradient-to-br
                ${card.glow}
                to-transparent
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              `}
            />

            {/* Content */}
            <div className="relative z-10">

              {/* Top */}
              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    {card.label}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">

                    {card.currency && "₹"}

                    {typeof value === "number"
                      ? value.toLocaleString()
                      : value}

                  </h2>

                </div>

                {/* Icon */}
                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/60
                    shadow-sm
                    ${card.iconBg}
                  `}
                >

                  <Icon
                    size={24}
                    className={card.iconColor}
                  />

                </div>

              </div>

              {/* Bottom */}
              <div className="mt-6 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <div className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-xs font-medium text-slate-500">
                    Live Analytics
                  </span>

                </div>

                <span className="text-xs font-semibold text-slate-400">
                  Updated Now
                </span>

              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}