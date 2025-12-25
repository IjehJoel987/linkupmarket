export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">⏳</div>
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
        <div className="text-gray-500 mt-2">Fetching service details</div>
      </div>
    </div>
  );
}