export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 bg-white shadow-sm animate-pulse" />
      <main className="flex-1">
        <section className="w-full py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <div className="mb-6">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Search and Filter Controls Skeleton */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-grow">
                  <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="hidden md:flex h-10 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Results Count Skeleton */}
            <div className="mb-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Map and Listings Skeleton */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Map Skeleton */}
              <div className="h-[600px] bg-gray-200 rounded animate-pulse" />

              {/* List Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="h-64 bg-gray-100 animate-pulse" />
    </div>
  )
}
