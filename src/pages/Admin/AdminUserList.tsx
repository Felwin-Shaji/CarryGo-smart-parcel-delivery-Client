import { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DataTable } from "../../components/Table/Table";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { useAdmin } from "../../Services/Admin";
import { AdminUserListColumns } from "../../config/adminUserListTableColumn";


const AdminUserList = () => {
  const { getAllUsers, updateUserStatus } = useAdmin();

  const [users, setUsers] = useState([]);
  const [enhancedRows, setEnhancedRows] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [filters, setFilters] = useState({
    blocked: null,
    role: "",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        blocked: filters.blocked,
        role: filters.role,
      });

      setUsers(response.data.data);
      setTotalPages(response.totalPages);

      const rows = response.data.data.map((user: any) => ({
        ...user,
        // Example if you want a modal or view option in row
        __openModal: (id: string) => {
          console.log("User details modal for ID:", id);
        },
      }));

      setEnhancedRows(rows);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 800);

    return () => clearTimeout(timeout);
  }, [searchInput]);


  // fetch on dependency change
  useEffect(() => {
    fetchUsers();
  }, [page, search, sortBy, sortOrder]);

  const handleSort = (field: any) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };




  const handleStatusToggle = async (id: string, newState: boolean) => {
    try {
      await updateUserStatus(id, newState);

      fetchUsers();
      toast.success(`User ${newState ? "Blocked" : "Activated"}`);

    } catch (err) {
      toast.error("Failed to update status");
    }
  };




  return (
    <DashboardProvider role="admin">
      <DashboardLayout pageTitle="Users List">
        {loading && <LoadingScreen />}

        {!loading && (
          <DataTable
            data={enhancedRows}
            columns={AdminUserListColumns(handleStatusToggle)}
            page={page}
            totalPages={totalPages}
            searchValue={searchInput}
            onPageChange={(p) => setPage(p)}
            onSearch={(value) => setSearchInput(value)}
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
            filters={filters}
            onFilterChange={setFilters}
          />
        )}

        {!loading && users.length === 0 && <p>No users found.</p>}
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default AdminUserList;
