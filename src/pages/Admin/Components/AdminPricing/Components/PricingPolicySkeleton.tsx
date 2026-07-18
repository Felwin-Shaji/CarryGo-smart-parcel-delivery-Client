import { Skeleton } from "../../../../Worker/WorkerDashboard/Components/WorkerSkeleton";

const PricingPolicySkeleton = () => {
    return (
        <div className="container max-w-5xl">

            {/* Header */}
            <div className="mb-10">
                <Skeleton className="h-8 w-64 mb-3" />
                <Skeleton className="h-4 w-[420px] mb-2" />
                <Skeleton className="h-3 w-40" />
            </div>

            {/* Warning Banner */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 mb-6">
                <Skeleton className="h-4 w-64 mb-2" />
                <Skeleton className="h-4 w-full" />
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-10">

                {[1, 2, 3].map((section) => (
                    <div key={section}>

                        <Skeleton className="h-6 w-44 mb-2" />
                        <Skeleton className="h-4 w-72 mb-5" />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Skeleton className="h-4 w-20 mb-2" />
                                <Skeleton className="h-11 w-full rounded-lg" />
                            </div>

                            <div>
                                <Skeleton className="h-4 w-20 mb-2" />
                                <Skeleton className="h-11 w-full rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Platform Fee */}
            <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-64 mb-5" />

                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-11 w-64 rounded-lg" />

            </div>

            {/* Bottom Buttons */}
            <div className="sticky bottom-0 bg-white border-t py-4 mt-8 flex justify-between">
                <Skeleton className="h-10 w-36 rounded-lg" />
                <Skeleton className="h-10 w-56 rounded-lg" />
            </div>

        </div>
    );
};

export default PricingPolicySkeleton;