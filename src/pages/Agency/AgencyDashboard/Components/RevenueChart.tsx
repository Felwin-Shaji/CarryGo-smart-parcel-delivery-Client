import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import {
    TrendingUp,
    IndianRupee,
} from "lucide-react";

import type { SalesChartResponseDTO, } from "../../../../shared/constants_Types/types/Agency/AgencyDashboar.dto";

type RevenueChartProps = {
    data?: SalesChartResponseDTO["data"];
};

const RevenueChart = ({
    data = [],
}: RevenueChartProps) => {
    const totalRevenue = data.reduce(
        (acc, item) => acc + item.revenue,
        0
    );

    // Dynamic trend calculation
    const firstRevenue = data[0]?.revenue ?? 0;
    const lastRevenue =
        data[data.length - 1]?.revenue ?? 0;

    const trendPercentage =
        firstRevenue > 0
            ? (
                ((lastRevenue - firstRevenue) /
                    firstRevenue) *
                100
            ).toFixed(1)
            : "0";

    const isPositive =
        Number(trendPercentage) >= 0;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);
    };

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
                        Revenue Overview
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
                            {formatCurrency(totalRevenue)}
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
                        bg-emerald-50
                        text-emerald-600
                    "
                >
                    <IndianRupee className="w-5 h-5" />
                </div>
            </div>

            {/* CHART */}
            <div className="h-[240px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart data={data}>
                        {/* GRID */}
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#E2E8F0"
                        />

                        {/* X AXIS */}
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            padding={{
                                left: 10,
                                right: 10,
                            }}
                            tick={{
                                fontSize: 11,
                                fill: "#64748B",
                            }}
                            tickFormatter={(d) =>
                                new Date(d).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                    }
                                )
                            }
                        />

                        {/* Y AXIS */}
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={45}
                            tick={{
                                fontSize: 11,
                                fill: "#64748B",
                            }}
                            tickFormatter={(value) => {
                                if (value >= 1000) {
                                    return `₹${value / 1000}k`;
                                }

                                return `₹${value}`;
                            }}
                        />

                        {/* TOOLTIP */}
                        <Tooltip
                            cursor={{
                                stroke: "#CBD5E1",
                                strokeDasharray: "4 4",
                            }}
                            contentStyle={{
                                borderRadius: 12,
                                border: "1px solid #E2E8F0",
                                backgroundColor: "#fff",
                                boxShadow:
                                    "0 4px 20px rgba(0,0,0,0.08)",
                                fontSize: "12px",
                            }}
                            formatter={(value) => {
                                const num =
                                    typeof value === "number"
                                        ? value
                                        : Number(value || 0);

                                return [
                                    formatCurrency(num),
                                    "Revenue",
                                ];
                            }}
                            labelFormatter={(label) =>
                                new Date(label).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )
                            }
                        />

                        {/* LINE */}
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#0F172A"
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                strokeWidth: 2,
                                fill: "#fff",
                            }}
                            activeDot={{
                                r: 5,
                                strokeWidth: 0,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* EMPTY STATE */}
            {!data.length && (
                <div
                    className="
                        flex items-center justify-center
                        h-[220px]
                        text-sm
                        text-slate-400
                    "
                >
                    No revenue data available
                </div>
            )}
        </div>
    );
};

export default RevenueChart;