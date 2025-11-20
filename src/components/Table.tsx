import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
  hiddenOnMobile?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSearch: (value: string) => void;
  onSort: (field: keyof T) => void;
  sortBy: string;
  sortOrder: string;
  searchValue: string;
}

export function DataTable<T>({
  columns,
  data,
  page,
  totalPages,
  onPageChange,
  onSearch,
  onSort,
  sortBy,
  sortOrder,
  searchValue
}: DataTableProps<T>) {
  return (
    <div className="w-full space-y-4">

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-2 border rounded-lg w-full sm:w-72"
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm sm:text-base border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className={`py-2 sm:py-3 px-3 sm:px-4 whitespace-nowrap cursor-pointer 
                    ${col.hiddenOnMobile ? "hidden sm:table-cell" : ""}`}
                  onClick={() => col.sortable && onSort(col.accessor)}
                >
                  {col.header}
                  {col.sortable && sortBy === col.accessor && (
                    <span className="ml-1 text-xs">
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className={`py-2 sm:py-3 px-3 sm:px-4 whitespace-nowrap 
                      ${col.hiddenOnMobile ? "hidden sm:table-cell" : ""}`}
                  >
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : (row[col.accessor] as any)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 text-sm sm:text-base mt-4">

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            className="px-4 py-1.5  border rounded-lg shadow-sm disabled:opacity-40 hover:bg-g-50"
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            className="px-4 py-1.5  border rounded-lg shadow-sm disabled:opacity-40 hover:bg-50"
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>

        <span className="text-gray-600">
          Page <span className="font-semibold">{page}</span> of {totalPages}
        </span>
      </div>

    </div>
  );
}
