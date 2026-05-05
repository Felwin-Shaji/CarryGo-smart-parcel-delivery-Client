import { Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const WorkerActions = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center gap-3">

            {/* View */}
            <button
                className="
                    group inline-flex items-center gap-1
                    h-7 px-3
                    text-xs font-medium
                    text-gray-700
                    bg-white
                    border border-gray-200
                    rounded-xl

                    hover:bg-gray-50
                    hover:shadow-sm

                    active:scale-95
                    transition-all duration-200
                "
                onClick={() => navigate("/hub/workers")}

            >

                <Users className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                View
            </button>

            {/* Add Worker */}
            <button
                className="
                    group inline-flex items-center gap-1
                    h-7 px-0.8
                    text-xs font-semibold
                    text-white
                    rounded-xl

                    bg-gradient-to-r from-blue-600 to-blue-500
                    shadow-md shadow-blue-500/20

                    hover:from-blue-700 hover:to-blue-600
                    hover:shadow-lg hover:shadow-blue-500/30

                    active:scale-95
                    transition-all duration-200
                "
                onClick={() => navigate("/hub/workers/add")}
            >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Add Worker
            </button>

        </div>
    );
};