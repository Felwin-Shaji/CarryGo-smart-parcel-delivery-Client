export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const WorkerInfoSkeleton = () => (
  <div className="bg-white p-4 rounded-2xl shadow space-y-4">
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
    </div>
  </div>
);

export const ActiveShipmentSkeleton = () => (
  <div className="bg-white p-4 rounded-2xl shadow space-y-3">
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-3 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
);

export const GraphSkeleton = () => (
  <div className="bg-white p-4 rounded-2xl shadow space-y-3">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-40 w-full" />
  </div>
);

export const TableSkeleton = () => (
  <div className="bg-white p-4 rounded-2xl shadow space-y-3">
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} className="h-6 w-full" />
    ))}
  </div>
);


