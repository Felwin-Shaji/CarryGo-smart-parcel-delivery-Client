
const KycBadge = ({ status }: { status: string }) => {

  const config: Record<
    string,
    { label: string; className: string }
  > = {
    PENDING: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700",
    },
    REGISTERED: {
      label: "Under Review",
      className: "bg-blue-100 text-blue-700",
    },
    APPROVED: {
      label: "Verified",
      className: "bg-green-100 text-green-700",
    },
    REJECTED: {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
    },
  };

  const { label, className } = config[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 
                  text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
};

export default KycBadge