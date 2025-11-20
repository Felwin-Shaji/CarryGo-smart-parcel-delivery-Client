import { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { useAdmin } from "../../Services/Admin";
import { DataTable } from "../../components/Table";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { AdminAgencyListcolumns } from "../../config/adminAgencyListTableColumn";
// import AdminAgencyDetailsModal from "./Components/AdminAgencyDetailsModal";
import { useNavigate } from "react-router-dom";

const AdminAgencyList = () => {
    const { getAllAgencies } = useAdmin();
    const navigate = useNavigate();

    const [agencies, setAgencies] = useState([]);
    const [enhancedRows, setEnhancedRows] = useState([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("")

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    // const [modalOpen, setModalOpen] = useState(false);
    // const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);

    const fetchAgencies = async () => {
        try {
            setLoading(true);
            const response = await getAllAgencies({ page, limit, search, sortBy, sortOrder, });
            setAgencies(response.data);
            setTotalPages(response.totalPages);

            const rows = response.data.map((agency: any) => ({
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
    }, [page, search, sortBy, sortOrder]);


    const handleSort = (field: any) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    return (
        <DashboardProvider role="admin">
            <DashboardLayout pageTitle="Agencies List">

                {loading && <LoadingScreen />}

                {!loading && (
                    <DataTable
                        data={enhancedRows}
                        columns={AdminAgencyListcolumns}
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
                    />

                )}

                {!loading && agencies.length === 0 && (
                    <p>No agencies found.</p>
                )}

                {/* <AdminAgencyDetailsModal
                    open={modalOpen}
                    agencyId={selectedAgencyId}
                    onClose={() => setModalOpen(false)}
                    onUpdated={fetchAgencies}
                /> */}
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default AdminAgencyList;
