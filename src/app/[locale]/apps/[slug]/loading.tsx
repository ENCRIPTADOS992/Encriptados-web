export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-black pt-20 pb-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-[1200px] px-4 md:px-8">
        <div className="w-full aspect-[21/9] bg-gray-800/50 animate-pulse rounded-3xl mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] animate-[shimmer_1.5s_infinite]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-10 w-3/4 bg-gray-800/50 animate-pulse rounded-lg" />
            <div className="h-4 w-full bg-gray-800/50 animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-800/50 animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-gray-800/50 animate-pulse rounded" />
          </div>

          <div className="lg:col-span-4">
            <div className="h-[400px] w-full bg-gray-800/50 animate-pulse rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
