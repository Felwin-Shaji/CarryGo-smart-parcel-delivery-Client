import toast from "react-hot-toast"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { HubResponseDTO } from "../../../../../shared/constants_Types/types/Admin/AdminAgency.dto";
import { useAgency } from "../../../../../Services/Agency/Agency";
import { DataTable } from "../../../../../shared/components/Table/Table";
import { AgencyHubsListColumns } from "../../../../../config/TableColumns/AgencyHubsListTableColumns";


export type HubTableRow = HubResponseDTO & {
    __openModal: (id: string) => void;
};


const AdminAgencyHubList = () => {
    const { id } = useParams()
    const { getAllHubsById } = useAgency()
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
            if (!id) return

            const hubsList = await getAllHubsById(
                id,
                {
                    page,
                    limit,
                    search,
                    sortBy,
                    sortOrder,
                    blocked: filters.blocked,
                    kycStatus: filters.kycStatus,
                    startDate: filters.startDate,
                    endDate: filters.endDate,
                },

            );

            setTotalPages(hubsList?.page!);

            const rows = hubsList?.data.map((hub: HubResponseDTO) => ({
                ...hub,
                __openModal: (_id: string) => {
                    navigate(`/admin/agency/${id}/hubs/${hub.id}`);
                }
            }));

            setEnhancedRows(rows!);
            setLoading(false);

        } finally {
            setLoading(false);
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
            await fetchHubs();
            toast.success(`User ${newState ? "Blocked" : "Activated"}`);

        } catch (err) {
            toast.error("Failed to update status");
        }
    };
    return (
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
            loading={loading}
        />
    )
}

export default AdminAgencyHubList