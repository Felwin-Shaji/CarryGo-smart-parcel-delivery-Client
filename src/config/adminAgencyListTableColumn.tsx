export const AdminAgencyListcolumns = [
  { header: "Agency Name", accessor: "name", sortable: true },

  { header: "Email", accessor: "email", sortable: true },

  { header: "Mobile", accessor: "mobile" },

  {
    header: "KYC Status",
    accessor: "kycStatus",
    render: (value: any) => (
      <span
        className={`px-3 py-1 rounded-full text-sm 
          ${value === "approved"
            ? "bg-green-100 text-green-600"
            : value === "pending"
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
