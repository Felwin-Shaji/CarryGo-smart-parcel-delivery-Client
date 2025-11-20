export const AdminUserListColumns = [
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

  // ✔ KYC Status Badge
  {
    header: "KYC Status",
    accessor: "kycStatus",
    sortable: true,
    render: (value: string) => (
      <span
        className={`px-3 py-1 rounded-full text-sm 
          ${
            value === "approved"
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

  // ✔ Blocked/Unblocked Badge
  {
    header: "Blocked",
    accessor: "isBlocked",
    sortable: true,
    render: (value: boolean) => (
      <span
        className={`px-3 py-1 rounded-full text-sm 
          ${value ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
      >
        {value ? "Blocked" : "Active"}
      </span>
    ),
  },
];
