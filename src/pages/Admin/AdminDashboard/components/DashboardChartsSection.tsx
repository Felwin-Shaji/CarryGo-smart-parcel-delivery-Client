import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, Tooltip, BarChart, Bar, YAxis, Legend, } from "recharts";
import { TrendingUp, PackageCheck, } from "lucide-react";
import type { AdminBookingChartResponseDTO, AdminRevenueChartResponseDTO, } from "../../../../shared/constants_Types/types/Admin/AdminDashboard.dto";

interface Props {
  revenueChart: AdminRevenueChartResponseDTO;
  bookingChart: AdminBookingChartResponseDTO;
}

export default function DashboardChartsSection({
  revenueChart,
  bookingChart,
}: Props) {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-7">

      {/* Revenue Chart */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm">

        {/* Background Glow */}
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-40" />

        <div className="relative p-7">

          {/* Header */}
          <div className="flex items-start justify-between mb-7">

            <div>
              <div className="flex items-center gap-3 mb-2">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100">
                  <TrendingUp className="h-5 w-5 text-blue-700" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Revenue Overview
                  </h3>

                  <p className="text-sm text-slate-500">
                    Monthly revenue analytics
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-2 border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">
                Total Revenue
              </p>

              <h4 className="text-lg font-bold text-slate-900">
                ₹
                {revenueChart.data
                  .reduce((acc, item) => acc + item.revenue, 0)
                  .toLocaleString()}
              </h4>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[340px]">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart
                data={revenueChart.data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >

                <defs>

                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2563EB"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="100%"
                      stopColor="#2563EB"
                      stopOpacity={0}
                    />
                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#64748B",
                  }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#64748B",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  activeDot={{
                    r: 6,
                    strokeWidth: 0,
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>
        </div>
      </div>

      {/* Booking Analytics */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm">

        {/* Background Glow */}
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-100 blur-3xl opacity-40" />

        <div className="relative p-7">

          {/* Header */}
          <div className="flex items-start justify-between mb-7">

            <div>

              <div className="flex items-center gap-3 mb-2">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100">
                  <PackageCheck className="h-5 w-5 text-emerald-700" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Booking Analytics
                  </h3>

                  <p className="text-sm text-slate-500">
                    Booking & delivery comparison
                  </p>
                </div>
              </div>

            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-2 border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">
                Total Bookings
              </p>

              <h4 className="text-lg font-bold text-slate-900">
                {bookingChart.data
                  .reduce((acc, item) => acc + item.bookings, 0)
                  .toLocaleString()}
              </h4>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[340px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={bookingChart.data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#64748B",
                  }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#64748B",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                />

                <Legend />

                <Bar
                  dataKey="bookings"
                  fill="#2563EB"
                  radius={[10, 10, 0, 0]}
                  maxBarSize={40}
                />

                <Bar
                  dataKey="delivered"
                  fill="#22C55E"
                  radius={[10, 10, 0, 0]}
                  maxBarSize={40}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>
        </div>
      </div>
    </div>
  );
}