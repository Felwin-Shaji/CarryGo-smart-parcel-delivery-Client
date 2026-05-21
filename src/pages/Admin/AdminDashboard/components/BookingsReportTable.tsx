import {
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  ReceiptText,
} from "lucide-react";

import type {
  AdminBookingsReportResponseDTO,
} from "../../../../shared/constants_Types/types/Admin/AdminDashboard.dto";

interface Props {
  report: AdminBookingsReportResponseDTO;

  onPageChange: (page: number) => void;

  onExport: (type: "excel" | "pdf") => void;
}

export default function BookingsReportTable({
  report,
  onPageChange,
  onExport,
}: Props) {

  const getStatusStyles = (
    status: string
  ) => {

    switch (status) {

      case "DELIVERED":
        return `
          bg-emerald-50
          text-emerald-700
          border border-emerald-200
        `;

      case "CANCELLED":
        return `
          bg-red-50
          text-red-700
          border border-red-200
        `;

      default:
        return `
          bg-slate-100
          text-slate-700
          border border-slate-200
        `;
    }
  };

  return (
    <div
      className=" bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden " >

      {/* HEADER */}
      <div
        className="px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 "
      >

        {/* LEFT */}
        <div>
          <h3
            className=" text-[20px] font-semibold text-slate-900 tracking-tight " >
            Sales Report
          </h3>

          <p
            className="text-[15px] text-slate-500">
            Monitor recent transactions and revenue
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* EXCEL */}
          <button
            onClick={() => onExport("excel")}
            className="h-11 px-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center gap-2 transition-all" >
            <div
              className=" w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center ">
              <FileSpreadsheet size={15} />
            </div>

            <span className="text-sm font-semibold">
              Export Excel
            </span>
          </button>

          {/* PDF */}
          <button
            onClick={() => onExport("pdf")}
            className="h-11 px-5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center gap-2 transition-all" >
            <div
              className=" w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center" >
              <FileText size={15} />
            </div>

            <span className="text-sm font-semibold">
              Export PDF
            </span>
          </button>

        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="px-4 pb-4">

        <div
          className=" rounded-[24px] border border-slate-200 overflow-hidden " >

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              {/* TABLE HEAD */}
              <thead
                className="
                  bg-slate-50
                  border-b border-slate-200
                "
              >
                <tr>

                  <th className="px-7 py-5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-7 py-5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Booking ID
                  </th>

                  <th className="px-7 py-5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    User
                  </th>
                  <th className="px-7 py-5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Partner
                  </th>

                  <th className="px-7 py-5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amount
                  </th>

                  <th className="px-7 py-5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Commission
                  </th>

                  <th className="px-7 py-5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                </tr>
              </thead>

              {/* BODY */}
              <tbody className="bg-white">

                {report.bookings.map((booking) => (

                  <tr
                    key={booking.bookingId}
                    className="
                      border-b border-slate-100
                      hover:bg-slate-50/70
                      transition-colors
                    "
                  >

                    {/* DATE */}
                    <td className="px-7 py-5">

                      <div>

                        <p
                          className="
                            text-[15px]
                            font-semibold
                            text-slate-800
                          "
                        >
                          {new Date(
                            booking.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                    </td>

                    {/* BOOKING ID */}
                    <td className="px-7 py-5">

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            w-11 h-11
                            rounded-2xl
                            bg-slate-100

                            flex items-center justify-center
                            shrink-0
                          "
                        >
                          <ReceiptText
                            size={18}
                            className="text-slate-500"
                          />
                        </div>

                        <div>

                          <p
                            className="
                              text-[15px]
                              font-semibold
                              text-slate-900
                              break-all
                            "
                          >
                            {booking.bookingId}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* USER */}
                    <td className="px-7 py-5">

                      <div>

                        <p
                          className="
                            text-[15px]
                            font-semibold
                            text-slate-800
                          "
                        >
                          {booking.user}
                        </p>

                      </div>

                    </td>

                    {/* PARTNER */}
                    <td className="px-7 py-5">

                      <div>

                        <p
                          className="
                            text-[15px]
                            font-medium
                            text-slate-700
                          "
                        >
                          {booking.partnerName}
                        </p>

                      </div>

                    </td>

                    {/* AMOUNT */}
                    <td className="px-7 py-5">

                      <p
                        className="
                          text-[16px]
                          font-semibold
                          text-slate-900
                        "
                      >
                        ₹{booking.totalAmount}
                      </p>

                    </td>

                    {/* COMMISSION */}
                    <td className="px-7 py-5">

                      <p
                        className="
                        text-[15px]
                        font-semibold
                        text-emerald-600
                      "
                      >
                        ₹{booking.platformCommission}
                      </p>

                    </td>

                    {/* STATUS */}
                    <td className="px-7 py-5">

                      <span
                        className={`
                        inline-flex items-center

                        px-4 py-2
                        rounded-full

                        text-xs
                        font-semibold

                        ${getStatusStyles(
                          booking.status
                        )}
                      `}
                      >
                        {booking.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>

          {/* FOOTER */}
          <div
            className="
              px-7 py-5

              flex flex-col
              md:flex-row
              md:items-center
              md:justify-between

              gap-4

              bg-white
            "
          >

            <div
              className="
                text-sm text-slate-500">
              Showing page
              {" "}
              <span className="font-semibold text-slate-700">
                {report.currentPage}
              </span>
              {" "}
              of
              {" "}
              <span className="font-semibold text-slate-700">
                {report.totalPages}
              </span>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center gap-3">

              <button
                disabled={report.currentPage === 1}

                onClick={() =>
                  onPageChange(
                    report.currentPage - 1
                  )
                }

                className=" h-11 px-5 rounded-2xl border border-slate-200 flex items-center gap-2 text-sm font-semibold text-slate-600 
                  hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition "
              >
                <ChevronLeft size={16} />

                Prev
              </button>

              <button
                disabled={
                  report.currentPage ===
                  report.totalPages
                }

                onClick={() =>
                  onPageChange(
                    report.currentPage + 1
                  )
                }

                className=" h-11 px-5 rounded-2xl bg-slate-800
                  hover:bg-slate-900 flex items-center gap-2 text-sm font-semibold
                  text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next

                <ChevronRight size={16} />
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}