const SkeletonBox = ({ className }: { className?: string }) => (
  <div
    className={`bg-gray-200 animate-pulse rounded-md ${className}`}
  />
);

export const HubDashboardSkeleton = () => {
  return (
    <div className="p-4 space-y-6">

      {/* KPI Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <SkeletonBox className="h-4 w-20" />
            <SkeletonBox className="h-6 w-16" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Trend */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm space-y-4">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-[200px] w-full rounded-lg" />
        </div>

        {/* Donut */}
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <SkeletonBox className="h-4 w-28" />
          <SkeletonBox className="h-[200px] w-full rounded-full" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Worker */}
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-24 w-full" />
        </div>

        {/* Table */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm space-y-3">
          <SkeletonBox className="h-4 w-40" />

          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBox key={i} className="h-8 w-full" />
          ))}
        </div>

      </div>
    </div>
  );
};