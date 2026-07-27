interface ResubmitBannerProps {
    step: number;
    rejectionReason: string;
}

export default function ResubmitBanner({ step, rejectionReason }: ResubmitBannerProps) {
    return (
        <div className="space-y-8">
            {/* ALERT BANNER */}
            <div className="p-4 rounded-xl border border-red-200 bg-red-50 flex gap-3 items-start shadow-sm">
                <svg className="h-5 w-5 text-red-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="space-y-1">
                    <h3 className="text-sm font-bold text-red-900">KYC Verification Rejected</h3>
                    <p className="text-xs text-red-700 leading-relaxed">
                        <span className="font-semibold">Reason:</span> {rejectionReason}
                    </p>
                </div>
            </div>

            {/* STEPPER COMPONENT */}
            <div className="flex items-center justify-center gap-4 text-xs font-semibold tracking-wide uppercase text-gray-400">
                <div className="h-px w-10 bg-gray-200" />
                <span className={step === 3 ? "text-indigo-600 border-b-2 border-indigo-600 pb-0.5" : "text-emerald-600"}>
                    1. Correct Address
                </span>
                <div className="h-px w-10 bg-gray-200" />
                <span className={step === 4 ? "text-indigo-600 border-b-2 border-indigo-600 pb-0.5" : "text-gray-400"}>
                    2. Upload New Docs
                </span>
            </div>
        </div>
    );
}