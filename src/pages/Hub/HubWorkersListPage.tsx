import { useNavigate } from "react-router-dom"
import { ROLES } from "../../constants_Types/types/roles"
import { DashboardProvider } from "../../context/DashboardProvider"
import { DashboardLayout } from "../../layouts/DashboardLayout"
import { useHubAddWorker } from "../../Services/Hub/HubAddWorkers"
import type { WorkerResponseDTO } from "../../constants_Types/types/Agency/HubOverview.type"
import { useEffect, useState } from "react"
import { DataTable } from "../../components/Table/Table"
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen"
import { HubWorkersListColumns } from "../../config/TableColumns/HubWorkersListTableColumns"

export type WorkerTableRow = WorkerResponseDTO & {
    __openModal: (id: string) => void;
};

const HubWorkersListPage = () => {
    const { getWrokersList } = useHubAddWorker();
    const navigate = useNavigate();
    // const { hubId } = useParams();


    const [rows, setRows] = useState<WorkerTableRow[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const [filters, setFilters] = useState({
        kycStatus: "",
        startDate: "",
        endDate: ""
    });

    const fetchWorkers = async () => {
        try {
            setLoading(true);

            const response = await getWrokersList({
                page,
                limit,
                search,
                sortBy,
                sortOrder,
                kycStatus: filters.kycStatus,
                startDate: filters.startDate,
                endDate: filters.endDate
            });

            setTotalPages(response.totalPages);

            const enhanced = response.data.map((worker: WorkerResponseDTO) => ({
                ...worker,
                __openModal: (id: string) => {
                    navigate(`/hub/workers/${id}`);
                }
            }));

            setRows(enhanced);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 700);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    /* Refetch when query changes */
    useEffect(() => {
        fetchWorkers();
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


    return (
        <DashboardProvider role={ROLES.HUB}>
            <DashboardLayout pageTitle="Hub Workers">

                {loading && <LoadingScreen />}

                {!loading && (
                    <DataTable<WorkerTableRow>
                        data={rows}
                        columns={HubWorkersListColumns()}
                        page={page}
                        totalPages={totalPages}
                        searchValue={searchInput}
                        onPageChange={setPage}
                        onSearch={setSearchInput}
                        onSort={handleSort}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        filters={filters}
                        onFilterChange={setFilters}
                    />
                )}

            </DashboardLayout>
        </DashboardProvider>
    )
}

export default HubWorkersListPage