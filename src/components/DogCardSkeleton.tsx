const DogCardSkeleton = () => (
  <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white animate-pulse">
    <div className="w-full h-64 bg-gray-300" />
    <div className="p-6">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-8 bg-gray-300 rounded w-1/3 mt-4" />
    </div>
  </div>
);

export default DogCardSkeleton;
