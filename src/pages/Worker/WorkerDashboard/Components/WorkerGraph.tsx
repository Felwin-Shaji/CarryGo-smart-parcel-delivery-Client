import type { WorkerGraphPointDTO } from "../../../../shared/constants_Types/types/Worker/WorkerDashboard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, type TooltipProps } from "recharts";
import { DashboardFilters } from "./DashboardFilters";
import { BarChart3 } from "lucide-react";
import type { WorkerParcelFilters } from "../../../../Services/Worker/WorkerDashboard/useWorkerDashboard";

type Props = {
    graph: WorkerGraphPointDTO[];
    onApply: (filters: WorkerParcelFilters) => void;
    onClear: () => void;
    onExportPDF: () => void;
    onExportExcel: () => void;
};

type TooltipPayload = {
    payload: WorkerGraphPointDTO;
    value: number;
};

const WorkerGraph = ({ graph, onApply, onClear, onExportPDF, onExportExcel, }: Props) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-3">Analytics</h3>

            <DashboardFilters
                onApply={onApply}
                onClear={onClear}
                onExportPDF={onExportPDF}
                onExportExcel={onExportExcel}
            />

            <div className="m-4">

                {graph.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={graph} barSize={32}>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} />

                            <XAxis
                                dataKey="date"
                                tickFormatter={formatDate}
                                tick={{ fontSize: 12, fill: "#6B7280" }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{ fontSize: 12, fill: "#6B7280" }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <Bar
                                dataKey="count"
                                fill="#3B82F6"
                                radius={[8, 8, 0, 0]}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                )}

            </div>
        </div>
    );
};

export default WorkerGraph;


const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
    });
};

const CustomTooltip = ({ active, payload, }: TooltipProps<number, string> & { payload?: TooltipPayload[]; }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-white p-2 rounded-lg shadow text-xs border">
                <p className="text-gray-500">{data.date}</p>
                <p className="font-semibold text-gray-900">
                    {payload[0].value} parcels
                </p>
            </div>
        );
    }

    return null;
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[260px] text-center px-4">

        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-3">
            <BarChart3 size={22} className="text-gray-400" />
        </div>

        <p className="text-sm font-medium text-gray-700">
            No analytics available
        </p>

        <p className="text-xs text-gray-400 mt-1">
            Try adjusting filters or selecting a different date range
        </p>

    </div>
);