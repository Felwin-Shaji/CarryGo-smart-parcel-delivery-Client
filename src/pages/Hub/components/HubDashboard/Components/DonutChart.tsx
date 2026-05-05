import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type DonutItem = {
  name: string;
  value: number;
};

interface DonutChartProps {
  data: DonutItem[];
}

const COLORS = ["#2563eb", "#f59e0b", "#22c55e", "#ef4444", "#8b5cf6"];

export const DonutChart = ({ data }: DonutChartProps) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const hasData = total > 0;

  return (
    <div className="flex flex-col items-center w-full">

      {/* Chart */}
      <div className="relative w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: unknown, name: unknown) => {
                const safe =
                  typeof value === "number"
                    ? value
                    : Number(value) || 0;

                return [`${safe} shipments`, String(name)];
              }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xl font-semibold text-gray-900">
            {hasData ? total : 0}
          </p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 w-full space-y-1">
        {data.map((item, i) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2 text-gray-600">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              {item.name}
            </div>

            <span className="font-medium text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};