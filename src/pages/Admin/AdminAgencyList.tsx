import { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { useAdmin } from "../../Services/Admin";
import { DataTable } from "../../components/Table/Table";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { AdminAgencyListcolumns } from "../../config/TableColumns/adminAgencyListTableColumn";
// import AdminAgencyDetailsModal from "./Components/AdminAgencyDetailsModal";
import { useNavigate } from "react-router-dom";

const AdminAgencyList = () => {
    const { getAllAgencies, updateAgencyStatus } = useAdmin();
    const navigate = useNavigate();

    const [agencies, setAgencies] = useState([]);
    const [enhancedRows, setEnhancedRows] = useState([]);

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




    // const [modalOpen, setModalOpen] = useState(false);
    // const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);

    const fetchAgencies = async () => {
        try {
            setLoading(true);

            const response = await getAllAgencies({
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

            if (!response || !response.data) {
                throw new Error("Unexpected API response shape. response.data is missing.");
            }

            console.log(response.data.data, 'klkkkkkkl')

            setAgencies(response.data.data);
            setTotalPages(response.totalPages);

            const rows = response.data.data.map((agency: any) => ({
                ...agency,
                __openModal: (id: string) => {
                    navigate(`/admin/agency/${id}`);
                }
            }));

            setEnhancedRows(rows);
        } catch (err) {
            toast.error("Failed to load agencies");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    useEffect(() => {
        fetchAgencies();
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
            await updateAgencyStatus(id, newState);

            fetchAgencies();
            toast.success(`User ${newState ? "Blocked" : "Activated"}`);

        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    return (
        <DashboardProvider role="admin">
            <DashboardLayout pageTitle="Agencies List">

                {loading && <LoadingScreen />}

                {!loading && (
                    <DataTable
                        data={enhancedRows}
                        columns={AdminAgencyListcolumns(handleStatusToggle)}
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

                )}

                {!loading && agencies.length === 0 && (
                    <p>No agencies found.</p>
                )}

            </DashboardLayout>
        </DashboardProvider>
    );
};

export default AdminAgencyList;
