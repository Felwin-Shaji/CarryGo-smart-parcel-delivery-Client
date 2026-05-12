import type { Column } from "../../shared/components/Table/Table";
import type { WorkerTableRow } from "../../pages/Hub/HubWorkersListPage";

export const HubWorkersListColumns = (): Column<WorkerTableRow>[] => [
  {
    header: "Name",
    accessor: "name",
    sortable: true,
  },
  {
    header: "Email",
    accessor: "email",
    sortable: true,
  },
  {
    header: "Mobile",
    accessor: "mobile",
  },
  {
    header: "Role",
    accessor: "role",
    render: (value) => (
      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
        {String(value)}
      </span>
    ),
  },
  {
    header: "KYC Status",
    accessor: "kycStatus",
    render: (value) => (
      <span
        className={`px-3 py-1 rounded-full text-sm
        ${
          value === "APPROVED"
            ? "bg-green-100 text-green-600"
            : value === "PENDING"
            ? "bg-orange-100 text-orange-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {String(value)}
      </span>
    ),
  },
  {
    header: "Created",
    accessor: "createdAt",
    sortable: true,
    render: (value) =>
      new Date(value as string).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    header: "Action",
    accessor: "hubId",
    render: (_, row) => (
      <button
        onClick={() => row.__openModal(row.hubId)}
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        View
      </button>
    ),
  },
];