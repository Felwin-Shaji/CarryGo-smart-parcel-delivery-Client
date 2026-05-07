import {
    Building2,
    Users,
    IndianRupee,
    CheckCircle2,
} from "lucide-react";

import type {
    AgencyDashboardResponseDTO,
} from "../../../../shared/constants_Types/types/Agency/AgencyDashboar.dto";

type StatsCardsProps = {
    stats?: AgencyDashboardResponseDTO["stats"];
};

const StatsCards = ({
    stats,
}: StatsCardsProps) => {
    if (!stats) return null;

    const items = [
        {
            title: "Total Hubs",
            value: stats.totalHubs,
            icon: Building2,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Total Workers",
            value: stats.totalWorkers,
            icon: Users,
            iconBg: "bg-violet-100",
            iconColor: "text-violet-600",
        },
        {
            title: "Revenue",
            value: `₹${Number(
                stats.totalRevenue
            ).toLocaleString("en-IN")}`,
            icon: IndianRupee,
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
        },
        {
            title: "Completed",
            value: stats.totalCompletedBookings,
            icon: CheckCircle2,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
        },
    ];

    return (
        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-5
            "
        >
            {items.map((item, i) => {
                const Icon = item.icon;

                return (
                    <div
                        key={i}
                        className="
                            group
                            relative
                            overflow-hidden
                            rounded-2xl
                            border border-slate-200
                            bg-white
                            px-5 py-4
                            shadow-sm
                            transition-all duration-300
                            hover:shadow-md
                            hover:border-slate-300
                        "
                    >
                        <div className="flex items-start justify-between">
                            {/* LEFT */}
                            <div className="flex flex-col">
                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                        "
                                >
                                    {item.title}
                                </p>

                                <h2
                                    className="
                                        mt-3
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                        "
                                >
                                    {item.value}
                                </h2>

                            </div>

                            {/* ICON */}
                            <div
                                className={`
                                    flex items-center justify-center
                                    w-12 h-12
                                    rounded-xl
                                    ${item.iconBg}
                                    ${item.iconColor}
                                    transition-transform duration-300
                                    group-hover:scale-105
                                `}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCards;