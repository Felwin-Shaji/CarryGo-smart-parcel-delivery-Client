import {
  ChevronLeft,
  ChevronRight,
  ReceiptText,
} from "lucide-react";

import type {
  SalesReportResponseDTO,
} from "../../../../shared/constants_Types/types/Agency/AgencyDashboar.dto";

type SalesTableProps = {
  data?: SalesReportResponseDTO["data"];
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

const getStatusStyles = (
  status: string
) => {
  switch (status) {
    case "SUCCESS":
      return `
        bg-emerald-50
        text-emerald-700
        border-emerald-200
      `;

    case "PENDING":
      return `
        bg-amber-50
        text-amber-700
        border-amber-200
      `;

    case "FAILED":
      return `
        bg-red-50
        text-red-700
        border-red-200
      `;

    default:
      return `
        bg-slate-100
        text-slate-600
        border-slate-200
      `;
  }
};

const formatCurrency = (
  value: number
) => {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }
  ).format(value);
};

const SalesTable = ({
  data = [],
  page,
  total,
  limit,
  onPageChange,
}: SalesTableProps) => {
  const totalPages = Math.ceil(
    total / limit
  );

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          {/* HEADER */}
          <thead
            className="
              border-b border-slate-200
              bg-slate-50/80
            "
          >
            <tr>
              {[
                "Date",
                "Booking ID",
                "Gross",
                "Commission",
                "Net",
                "Status",
              ].map((head) => (
                <th
                  key={head}
                  className={`
                    px-6 py-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                    ${
                      head === "Status"
                        ? "text-center"
                        : head === "Gross" ||
                          head ===
                            "Commission" ||
                          head === "Net"
                        ? "text-right"
                        : "text-left"
                    }
                  `}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-slate-100">
            {data.length ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="
                    transition-colors duration-200
                    hover:bg-slate-50/70
                  "
                >
                  {/* DATE */}
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                    {new Date(
                      row.date
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  {/* BOOKING */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex items-center justify-center
                          w-9 h-9
                          rounded-lg
                          bg-slate-100
                          text-slate-600
                        "
                      >
                        <ReceiptText className="w-4 h-4" />
                      </div>

                      <div>
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-slate-900
                          "
                        >
                          {row.bookingId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* GROSS */}
                  <td
                    className="
                      px-6 py-4
                      text-right
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    {formatCurrency(
                      row.grossAmount
                    )}
                  </td>

                  {/* COMMISSION */}
                  <td
                    className="
                      px-6 py-4
                      text-right
                      text-sm
                      font-medium
                    "
                  >
                    {row.commission ? (
                      <span className="text-rose-600">
                        -{" "}
                        {formatCurrency(
                          row.commission
                        )}
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        —
                      </span>
                    )}
                  </td>

                  {/* NET */}
                  <td
                    className="
                      px-6 py-4
                      text-right
                      text-sm
                      font-semibold
                      text-emerald-600
                    "
                  >
                    {formatCurrency(
                      row.netAmount
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-full
                        border
                        px-3 py-1
                        text-xs
                        font-semibold
                        ${getStatusStyles(
                          row.paymentStatus
                        )}
                      `}
                    >
                      {row.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-20"
                >
                  <div
                    className="
                      flex flex-col items-center justify-center
                      text-center
                    "
                  >
                    <div
                      className="
                        flex items-center justify-center
                        w-14 h-14
                        rounded-2xl
                        bg-slate-100
                        text-slate-400
                        mb-4
                      "
                    >
                      <ReceiptText className="w-6 h-6" />
                    </div>

                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      No sales data found
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-400
                      "
                    >
                      Try changing filters or
                      date range
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div
        className="
          flex flex-col gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
          border-t border-slate-200
          px-6 py-4
          bg-slate-50/50
        "
      >
        {/* INFO */}
        <div className="text-sm text-slate-500">
          Showing page{" "}
          <span className="font-semibold text-slate-700">
            {page}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {totalPages || 1}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() =>
              onPageChange(page - 1)
            }
            className="
              inline-flex items-center gap-2
              rounded-xl
              border border-slate-200
              bg-white
              px-4 py-2
              text-sm
              font-medium
              text-slate-600
              transition-all duration-200
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() =>
              onPageChange(page + 1)
            }
            className="
              inline-flex items-center gap-2
              rounded-xl
              border border-slate-200
              bg-slate-900
              px-4 py-2
              text-sm
              font-medium
              text-white
              transition-all duration-200
              hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;