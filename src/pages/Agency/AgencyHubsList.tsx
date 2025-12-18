import toast from "react-hot-toast"
import { DataTable } from "../../components/Table/Table"
import { AgencyHubsListColumns } from "../../config/TableColumns/AgencyHubsListTableColumns"
import { ROLES } from "../../constants_Types/types/roles"
import { DashboardProvider } from "../../context/DashboardProvider"
import { DashboardLayout } from "../../layouts/DashboardLayout"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAgency, type HubResponseDTO } from "../../Services/Agency/Agency"
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen"

export type HubTableRow = HubResponseDTO & {
  __openModal: (id: string) => void;
};


const AgencyHubsList = () => {
  const { getAllHubs } = useAgency()
  const navigate = useNavigate();

  const [enhancedRows, setEnhancedRows] = useState<HubTableRow[]>([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("")

  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [filters, setFilters] = useState({
    blocked: null,
    kycStatus: "",
    startDate: "",
    endDate: ""
  });

  const fetchHubs = async () => {
    try {
      setLoading(true);

      const hubsList = await getAllHubs({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        blocked: filters.blocked,
        kycStatus: filters.kycStatus,
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      setTotalPages(hubsList?.page!);

      const rows = hubsList?.data.map((hub: HubResponseDTO) => ({
        ...hub,
        __openModal: (id: string) => {
          navigate(`/admin/hub/${id}`);
        }
      }));



      setEnhancedRows(rows!);
      setLoading(false);

    } catch (error: any) {
      toast.error(error.data.messages);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchInput]);


  useEffect(() => {
    fetchHubs();
  }, [page, search, sortBy, sortOrder, filters]);





  const handleSort = (value: string) => {
    if (!value) {
      setSortBy("");
      setSortOrder("asc");
      return;
    }

    const [field, order] = value.split(":");

    setSortBy(field);
    setSortOrder(order === "desc" ? "desc" : "asc");
  };

  const handleStatusToggle = async (id: string, newState: boolean) => {
    try {
      // await updateAgencyStatus(id, newState);
      console.log('fetch agency', id)
      // fetchAgencies();
      toast.success(`User ${newState ? "Blocked" : "Activated"}`);

    } catch (err) {
      toast.error("Failed to update status");
    }
  };
  return (
    <>
      <DashboardProvider role={ROLES.AGENCY}>
        <DashboardLayout>
          {loading && <LoadingScreen />}
          <DataTable<HubTableRow>
            data={enhancedRows}
            columns={AgencyHubsListColumns(handleStatusToggle)}
            page={page}
            totalPages={totalPages}
            searchValue={searchInput}
            onPageChange={(p) => setPage(p)}
            onSearch={(value) => {
              setSearchInput(value)
            }}
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
            filters={filters}
            onFilterChange={setFilters}
          />
        </DashboardLayout>
      </DashboardProvider></>
  )
}

export default AgencyHubsList