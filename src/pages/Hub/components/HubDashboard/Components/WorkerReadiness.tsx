
type WorkerStats = {
  total: number;
  blocked: number;
  kyc: {
    pending: number;
    approved: number;
    rejected: number;
  };
};

export const WorkerReadiness = ({ workers }: { workers: WorkerStats }) => {

  const items = [
    {
      label: "Total Workers",
      value: workers.total,
      color: "text-gray-900",
      bg: "bg-gray-100",
    },
    {
      label: "KYC Pending",
      value: workers.kyc.pending,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Approved",
      value: workers.kyc.approved,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Rejected",
      value: workers.kyc.rejected,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      label: "Blocked",
      value: workers.blocked,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-4">

      {/* 🔹 Stats */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-3 rounded-xl ${item.bg} transition hover:shadow-sm`}
          >
            <span className="text-sm font-medium text-gray-600">
              {item.label}
            </span>

            <span className={`text-lg font-semibold ${item.color}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};