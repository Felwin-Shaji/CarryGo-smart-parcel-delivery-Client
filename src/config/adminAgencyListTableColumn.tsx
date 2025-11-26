export const AdminAgencyListcolumns = (handleStatusToggle: any) => [
  { header: "Agency Name", accessor: "name", sortable: true },

  { header: "Email", accessor: "email", sortable: true },

  { header: "Mobile", accessor: "mobile" },

  {
    header: "KYC Status",
    accessor: "kycStatus",
    render: (value: any) => (
      <span
        className={`px-3 py-1 rounded-full text-sm 
          ${value === "APPROVED"
            ? "bg-green-100 text-green-600"
            : value === "REGISTERED"
              ? "bg-orange-100 text-orange-600"
              : "bg-red-100 text-red-600"
          }`
        }
      >
        {value}
      </span>
    ),
  },

  {
    header: "Block/unblock",
    accessor: "isBlocked",
    sortable: true,
    render: (value: boolean, row: any) => (
      <button
        onClick={() => handleStatusToggle(row._id, !row.isBlocked)}
        className={`
        px-4 py-1.5 rounded-lg text-sm font-medium transition 
        ${value
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"}
      `}
      >
        {value ? "Blocked" : "Active"}
      </button>
    )
  },

  {
    header: "Action",
    accessor: "action",
    render: (_: any, row: any) => (
      <button
        onClick={() => row.__openModal(row._id || row.id)}
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
      >
        View
      </button>
    ),
  },
];
