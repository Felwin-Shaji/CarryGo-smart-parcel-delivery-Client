import { Eye } from "lucide-react";
import type { WorkerResponseDTO } from "../../../../constants_Types/types/Agency/HubOverview.type";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function HubWorkersList({
  workers,
  getWorkerRoute,
}: {
  workers: WorkerResponseDTO[];
  getWorkerRoute: (worker: WorkerResponseDTO) => string;
}) {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Workers Under Hub</h3>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-center">KYC Status</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((worker) => (
            <tr key={worker.email} className="border-t">
              <td className="p-4">{worker.name}</td>
              <td className="p-4">{worker.email}</td>
              <td className="p-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${worker.kycStatus === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {worker.kycStatus}
                </span>
              </td>
              <td className="p-4 text-center">
              <button
                onClick={() => navigate(getWorkerRoute(worker))}
                className="bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700"
              >
                <Eye size={16} />
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const EmptyWorkersState = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    <FiUsers className="text-4xl text-gray-300 mb-3" />
    <h3 className="text-lg font-semibold text-gray-700">
      No Workers added yet
    </h3>
    <p className="text-sm text-gray-500 mt-1">
      This hub has no Worker associated with it.
    </p>
  </div>
);
