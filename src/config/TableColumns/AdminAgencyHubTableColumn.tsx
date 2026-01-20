import { Eye } from "lucide-react";
import type { Column } from "../../components/Table/Table";
import type { HubResponseDTO } from "../../constants_Types/types/Admin/AdminAgency.dto";

export const AdminHubColumns = (
  handleViewHub: (hub: HubResponseDTO) => void
): Column<HubResponseDTO>[] => [
  {
    header: "Hub Name",
    accessor: "name",
    sortable: true,
  },  
    {
    header: "Email",
    accessor: "email",
    sortable: true,
  },   

  {
    header: "Status",
    accessor: "kycStatus",
    render: (value) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            value === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }
        `}
      >
        {value.toString()}
      </span>
    ),
  },

{
  header: "Action",
  accessor: "_id",
  render: (_value, row) => (
    <button
      onClick={() => handleViewHub(row)}
      className=""
    >
      <Eye className="h-4 w-4" />
    </button>
  ),
}

];