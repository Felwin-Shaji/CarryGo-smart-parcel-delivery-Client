import type { ReactNode } from "react";

type prop = {
    title: string;
    value: string | number;
    sub?: string;
    icon?: ReactNode;
}

export const StatCard = ({ title, value, sub, icon, }: prop) => (
    <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">

        <div>
            <p className="text-xs text-gray-500">{title}</p>
            <h2 className="text-sm text-gray-500">{value}</h2>
            {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>

        {icon && (
            <div className="p-2 bg-white rounded-lg shadow-sm">
                {icon}
            </div>
        )}
    </div>
);