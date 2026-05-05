import type { Column } from "../../../../../shared/constants_Types/types/Hub/HubDashboard";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function TableCard<T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">

        {/* Header */}
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-left px-4 py-3 font-medium text-gray-600"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-3 text-gray-700"
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}