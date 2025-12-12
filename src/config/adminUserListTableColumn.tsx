export const AdminUserListColumns = (handleStatusToggle: any) => [
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
    header: "KYC Status",
    accessor: "kycStatus",
    sortable: true,
    render: (value: string) => (
      <span
        className={`px-3 py-1 rounded-full text-sm 
          ${value === "APPROVED"
            ? "bg-green-100 text-green-600"
            : value === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
      >
        {value}
      </span>
    ),
  },

  {
    header: "Blocked",
    accessor: "isBlocked",
    sortable: true,
    render: (value: boolean, row: any) => (
      <button
        onClick={() => handleStatusToggle(row.id, !row.isBlocked)}
        className={`
        px-4 py-1.5 rounded-lg text-sm font-medium transition 
        ${value
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"}
      `}
      >
        {value ? "Blocked" : "Active"}
      </button>
    ),
  }
];
