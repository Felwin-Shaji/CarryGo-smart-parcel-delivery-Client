import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

type TrendPoint = {
    date: string;
    value: number;
};

interface TrendChartProps {
    data: TrendPoint[];
}


export const TrendChart = ({ data }: TrendChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
                {/* Grid */}
                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                {/* X Axis */}
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />

                {/* Tooltip */}
                <Tooltip
                    contentStyle={{
                        borderRadius: "10px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                />

                {/* Line */}
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};