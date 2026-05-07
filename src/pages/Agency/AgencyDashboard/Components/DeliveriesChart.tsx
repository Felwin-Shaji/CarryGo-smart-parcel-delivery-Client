import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import {
    PackageCheck,
    TrendingUp,
} from "lucide-react";

import type {
    DeliveriesChartResponseDTO,
} from "../../../../shared/constants_Types/types/Agency/AgencyDashboar.dto";

type DeliveriesChartProps = {
    data?: DeliveriesChartResponseDTO["data"];
};

const DeliveriesChart = ({
    data = [],
}: DeliveriesChartProps) => {
    const totalDeliveries = data.reduce(
        (acc, item) => acc + item.count,
        0
    );

    // Dynamic trend
    const firstCount = data[0]?.count ?? 0;
    const lastCount =
        data[data.length - 1]?.count ?? 0;

    const trendPercentage =
        firstCount > 0
            ? (
                ((lastCount - firstCount) /
                    firstCount) *
                100
            ).toFixed(1)
            : "0";

    const isPositive =
        Number(trendPercentage) >= 0;

    // Format labels
    const chartData = data.map((item) => ({
        ...item,
        label: new Date(
            item.date
        ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
        }),
    }));

    return (
        <div
            className="
                rounded-xl
                border border-slate-200
                bg-white
                px-5 py-4
                shadow-sm
            "
        >
            {/* HEADER */}
            <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                    <p
                        className="
                            text-sm
                            font-medium
                            text-slate-500
                            "
                    >
                        Deliveries Trend
                    </p>

                    <div className="flex items-center gap-3">
                        <h2
                            className="
                                text-2xl
                                font-semibold
                                tracking-tight
                                text-slate-900
                            "
                        >
                            {totalDeliveries}
                        </h2>

                        {!!data.length && (
                            <div
                                className={`
                                    flex items-center gap-1
                                    rounded-full
                                    px-2 py-1
                                    text-xs font-medium
                                    ${isPositive
                                        ? `
                                            bg-emerald-50
                                            text-emerald-600
                                        `
                                        : `
                                            bg-red-50
                                            text-red-600
                                        `
                                    }
                                `}
                            >
                                <TrendingUp className="w-3 h-3" />

                                {isPositive ? "+" : ""}
                                {trendPercentage}%
                            </div>
                        )}
                    </div>
                </div>

                {/* ICON */}
                <div
                    className="
                        flex items-center justify-center
                        w-10 h-10
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                    "
                >
                    <PackageCheck className="w-5 h-5" />
                </div>
            </div>

            {/* CHART */}
            <div className="h-[240px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart data={chartData}>
                        {/* GRID */}
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#E2E8F0"
                        />

                        {/* X AXIS */}
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fontSize: 11,
                                fill: "#64748B",
                            }}
                        />

                        {/* Y AXIS */}
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={35}
                            tick={{
                                fontSize: 11,
                                fill: "#64748B",
                            }}
                        />

                        {/* TOOLTIP */}
                        <Tooltip
                            cursor={{
                                fill: "rgba(15,23,42,0.04)",
                            }}
                            contentStyle={{
                                borderRadius: 12,
                                border: "1px solid #E2E8F0",
                                backgroundColor: "#fff",
                                boxShadow:
                                    "0 4px 20px rgba(0,0,0,0.08)",
                                fontSize: "12px",
                            }}
                            formatter={(value) => [
                                value,
                                "Deliveries",
                            ]}
                            labelStyle={{
                                color: "#0F172A",
                                fontWeight: 600,
                            }}
                        />

                        {/* BAR */}
                        <Bar
                            dataKey="count"
                            radius={[8, 8, 0, 0]}
                            fill="#0F172A"
                            barSize={42}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* EMPTY */}
            {!data.length && (
                <div
                    className="
            flex items-center justify-center
            h-[220px]
            text-sm
            text-slate-400
          "
                >
                    No deliveries data available
                </div>
            )}
        </div>
    );
};

export default DeliveriesChart;