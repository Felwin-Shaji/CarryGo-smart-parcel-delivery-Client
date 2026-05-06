import { useEffect, useState } from "react";
import type { GetHubWorkersParams, GetHubWorkersResponseDTO, WorkerResponseDTO } from "../../../../shared/constants_Types/types/Agency/HubOverview.type";
import { DataTable } from "../../../../components/Table/Table";
import { HubWorkersListColumns } from "../../../../config/TableColumns/HubWorkersListTableColumns";

export type WorkerTableRow = WorkerResponseDTO & {
  id: string;
  __openModal: (_id: string) => void;
};

type Props = {
  fetchFn: (params: GetHubWorkersParams) => Promise<GetHubWorkersResponseDTO>;
  onRowClick: (id: string) => void;
};

export const HubWorkersTable = ({ fetchFn, onRowClick }: Props) => {
  const [rows, setRows] = useState<WorkerTableRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [filters, setFilters] = useState({
    kycStatus: "",
    startDate: "",
    endDate: "",
  });

  const fetchWorkers = async () => {
    try {
      setLoading(true);

      const res = await fetchFn(
        {
          page,
          limit: 10,
          search,
          sortBy,
          sortOrder,
          ...filters,
        });

      setTotalPages(res.totalPages);

      const enhanced = res.data.map((worker: WorkerResponseDTO) => ({
        ...worker,
        id: worker._id,
        __openModal: () => onRowClick(worker._id),
      }));

      setRows(enhanced);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 600);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    fetchWorkers();
  }, [page, search, sortBy, sortOrder, filters]);

  const handleSort = (value: string) => {
    if (!value) return setSortBy("");
    const [field, order] = value.split(":");
    setSortBy(field);
    setSortOrder(order === "desc" ? "desc" : "asc");
  };

  return (
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
      loading={loading}
    />
  );
};