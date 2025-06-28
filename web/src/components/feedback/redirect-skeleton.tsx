import { Skeleton } from "./skeleton";

export function RedirectSkeleton() {
  return (
    <div className="min-h-screen bg-grayscale-50">
      <div className="max-w-7xl mx-auto md:px-8 lg:px-0">
        <main>
          <div className="grid grid-cols-1 gap-5 p-3 md:p-0 md:grid-cols-10 lg:gap-8 items-center justify-center min-h-screen">
            <div className="bg-grayscale-100 col-span-1 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-3 flex flex-col justify-center items-center rounded-lg py-16 text-center gap-6">
              <Skeleton className="w-11 h-9" />
              <Skeleton className="h-8 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 