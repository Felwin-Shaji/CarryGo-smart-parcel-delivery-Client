import { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DataTable } from "../../components/Table/Table";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { useAdmin } from "../../Services/Admin";
import { AdminUserListColumns } from "../../config/adminUserListTableColumn";


const AdminUserList = () => {
  const { getAllUsers } = useAdmin();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
      });

      setUsers(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 800);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Fetch when filters change
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

  return (
    <DashboardProvider role="admin">
      <DashboardLayout pageTitle="Users List">
        {loading && <LoadingScreen />}

        {!loading && (
          <DataTable
            data={users}
            columns={AdminUserListColumns}
            page={page}
            totalPages={totalPages}
            searchValue={searchInput}
            onPageChange={(p) => setPage(p)}
            onSearch={(value) => setSearchInput(value)}
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        )}

        {!loading && users.length === 0 && <p>No users found.</p>}
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default AdminUserList;
