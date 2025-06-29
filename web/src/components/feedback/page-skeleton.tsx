import { FormSkeleton } from "./skeleton";
import { LinksListSkeleton } from "./skeleton";
import { HeaderSkeleton } from "./skeleton";

export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-grayscale-50">
      <div className="max-w-7xl mx-auto md:px-8 lg:px-0">
        <HeaderSkeleton />
        <main>
          <div className="grid grid-cols-1 gap-5 p-3 md:p-0 md:grid-cols-12 lg:gap-8 items-start">
            <section className="w-full rounded-lg bg-grayscale-100 p-4 md:p-8 md:col-span-5 lg:col-span-4">
              <h2 className="text-lg font-bold text-grayscale-600 mb-4">
                Novo link
              </h2>
              <FormSkeleton />
            </section>
            <section className="w-full rounded-lg bg-grayscale-100 p-4 md:p-8 md:col-span-7 lg:col-span-8">
              <HeaderSkeleton />
              <LinksListSkeleton />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
} 