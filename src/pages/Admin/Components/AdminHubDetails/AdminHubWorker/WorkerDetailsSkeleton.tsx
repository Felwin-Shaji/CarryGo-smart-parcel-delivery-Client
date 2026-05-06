export const WorkerDetailsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">

      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="h-6 w-24 bg-gray-200 rounded" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-3">
        <div className="h-8 w-24 bg-gray-200 rounded-md" />
        <div className="h-8 w-24 bg-gray-200 rounded-md" />
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-40 bg-gray-200 rounded-xl" />
        <div className="h-40 bg-gray-200 rounded-xl" />
        <div className="h-40 bg-gray-200 rounded-xl" />
        <div className="h-40 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
};