import {
    AlertTriangle,
    BellRing,
} from "lucide-react";

import type {
    AgencyDashboardResponseDTO,
} from "../../../../shared/constants_Types/types/Agency/AgencyDashboar.dto";

type AlertsBannerProps = {
    alerts: AgencyDashboardResponseDTO["alerts"];
};

const AlertsBanner = ({
    alerts,
}: AlertsBannerProps) => {
    if (!alerts.length) return null;

    return (
        <div
            className="
                w-full
                rounded-2xl
                border border-amber-200
                bg-gradient-to-r
                from-amber-50
                to-yellow-50
                shadow-sm
                overflow-hidden
            "
        >
            {/* HEADER */}
            <div
                className="
                    flex items-center gap-3
                    px-5 py-4
                    border-b border-amber-100
                    bg-white/40
                    backdrop-blur-sm
                    "
            >
                <div
                    className="
                        flex items-center justify-center
                        w-10 h-10
                        rounded-xl
                        bg-amber-100
                        text-amber-600
                    "
                >
                    <BellRing className="w-5 h-5" />
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                        Important Alerts
                    </h3>

                    <p className="text-xs text-slate-500">
                        Please review the following notifications
                    </p>
                </div>
            </div>

            {/* ALERT LIST */}
            <div className="p-4 space-y-3">
                {alerts.map((alert, index) => (
                    <div
                        key={index}
                        className="
                            group
                            flex items-start gap-3
                            rounded-xl
                            border border-amber-100
                            bg-white/80
                            px-4 py-3
                            transition-all duration-200
                            hover:border-amber-200
                            hover:shadow-sm
                            "
                    >
                        {/* ICON */}
                        <div
                            className="
                                mt-0.5
                                flex items-center justify-center
                                w-8 h-8
                                rounded-lg
                                bg-amber-100
                                text-amber-600
                                shrink-0
                            "
                        >
                            <AlertTriangle className="w-4 h-4" />
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800 leading-relaxed">
                                {alert.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertsBanner;