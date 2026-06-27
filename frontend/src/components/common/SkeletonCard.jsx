export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border p-4">
      <div className="h-40 bg-gray-200 rounded-md"></div>

      <div className="mt-4 h-4 bg-gray-200 rounded"></div>

      <div className="mt-2 h-4 w-2/3 bg-gray-200 rounded"></div>
    </div>
  );
}