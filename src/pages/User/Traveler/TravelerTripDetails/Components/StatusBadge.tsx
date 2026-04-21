export const StatusBadge = ({ status }: { status: string }) => {

  const config: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-700",
    PENDING_APPROVAL: "bg-yellow-100 text-yellow-700",
    ACTIVE: "bg-green-100 text-green-700",
    PARTIALLY_BOOKED: "bg-blue-100 text-blue-700",
    FULLY_BOOKED: "bg-purple-100 text-purple-700",
    COMPLETED: "bg-gray-200 text-gray-800",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const formatted = status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
      ${config[status] || "bg-gray-100 text-gray-600"}`}
    >
      {formatted}
    </span>
  );
};