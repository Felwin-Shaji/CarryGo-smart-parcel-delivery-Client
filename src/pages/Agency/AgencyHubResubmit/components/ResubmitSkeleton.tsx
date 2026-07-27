export function ResubmitSkeleton() {
    return (

        <div className="animate-pulse space-y-6">
            {/* Mock Alert Banner Area */}
            <div className="h-16 bg-slate-200 rounded-xl w-full" />

            {/* Mock Form Header Area */}
            <div className="space-y-2">
                <div className="h-7 bg-slate-200 rounded w-1/4" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
            </div>

            {/* Mock Card Blocks */}
            <div className="p-6 border border-slate-100 bg-white rounded-xl space-y-6">
                <div className="h-5 bg-slate-200 rounded w-1/6 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-12" />
                        <div className="h-10 bg-slate-200 rounded w-full" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-12" />
                        <div className="h-10 bg-slate-200 rounded w-full" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-12" />
                        <div className="h-10 bg-slate-200 rounded w-full" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-12" />
                        <div className="h-10 bg-slate-200 rounded w-full" />
                    </div>
                </div>
            </div>

            {/* Mock Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 bg-slate-200 rounded w-28" />
                <div className="h-10 bg-slate-200 rounded w-44" />
            </div>
        </div>
    );
}