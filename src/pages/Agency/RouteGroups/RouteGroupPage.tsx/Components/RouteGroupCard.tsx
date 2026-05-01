// pages/Agency/RouteGroups/Components/RouteGroupCard.tsx

import { ArrowRight } from "lucide-react";
import type { RouteGroupDTO } from "../../../../../shared/constants_Types/types/Agency/AgencyRouteGroup.dto";
import { useNavigate } from "react-router-dom";

interface Props {
    group: RouteGroupDTO;
}

export default function RouteGroupCard({ group }: Props) {
      const navigate = useNavigate();
    return (
        <div
        onClick={() => navigate(`/agency/route-groups/${group.id}`)}
        className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition cursor-pointer">

            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{group.name}</h3>
                <span className={`text-xs px-3 py-1 rounded-full ${
                    group.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                }`}>
                    {group.isActive ? "Active" : "Inactive"}
                </span>
            </div>

            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {group.description ?? "No description"}
            </p>

            <div className="flex justify-between items-center mt-5 text-sm text-gray-600">
                <span className="text-xs text-gray-400">
                    {new Date(group.createdAt).toLocaleDateString()}
                </span>
                <ArrowRight className="text-blue-500" size={18} />
            </div>

        </div>
    );
}