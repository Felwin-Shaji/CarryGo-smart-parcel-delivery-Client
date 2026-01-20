export default function AgencyHubDashboard({ hubId }: { hubId: string }) {
  console.log(hubId)
  return (
              <div className="space-y-6">

            {/* KPI CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Total Orders" value="1,248" />
              <StatCard label="Completed" value="1,012" />
              <StatCard label="Cancelled" value="94" />
              <StatCard label="Revenue" value="₹ 2.4L" />
            </div>

            {/* CHART PLACEHOLDERS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border shadow-sm p-6 h-64 flex items-center justify-center text-gray-400">
                Sales Chart (Coming Soon)
              </div>

              <div className="bg-white rounded-3xl border shadow-sm p-6 h-64 flex items-center justify-center text-gray-400">
                Orders Chart (Coming Soon)
              </div>
            </div>
          </div>
  );
}


const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white rounded-2xl border shadow-sm p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);
