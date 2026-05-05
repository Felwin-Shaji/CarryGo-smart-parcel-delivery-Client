import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  Area,
} from "recharts";

type TrendPoint = {
  date: string;
  value: number;
};

interface TrendChartProps {
  data: TrendPoint[];
}

const formatValue = (value: unknown): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  if (Array.isArray(value) && typeof value[0] === "number") return value[0];
  return 0;
};

// compact numbers (1200 → 1.2K)
const formatCompact = (num: number) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(num);

// clean date format
const formatDate = (date: string | number | undefined) => {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
export const TrendChart = ({ data }: TrendChartProps) => {
  return (
    <div className="w-full h-[280px] bg-white rounded-xl border border-gray-100 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          {/* Gradient */}
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            tickFormatter={formatCompact}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            cursor={{ stroke: "#e0e7ff", strokeWidth: 2 }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;

              return (
                <div className="bg-white shadow-md rounded-lg px-3 py-2 border border-gray-100">
                  <p className="text-xs text-gray-400">
                    {formatDate(label)}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatCompact(formatValue(payload[0].value))}
                  </p>
                </div>
              );
            }}
          />

          {/* Area */}
          <Area
            type="natural"
            dataKey="value"
            stroke="none"
            fill="url(#trendFill)"
          />

          {/* Line */}
          <Line
            type="natural"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 6,
              stroke: "#2563eb",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};