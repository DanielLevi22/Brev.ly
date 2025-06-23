import { MyLinks } from "@/components/list-links";
import { CreateNewLink } from "@/components/new-link";
import { Header } from "@/components/header";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export function HomePage() {
  return (
    <div className="min-h-screen bg-grayscale-50">
      <MaxWidthWrapper className="md:px-8 lg:px-0">
        <Header />
        <main>
          <div className="grid grid-cols-1 gap-5 p-3 md:p-0 md:grid-cols-12 lg:gap-8 items-start">
            <CreateNewLink />
            <MyLinks />
          </div>
        </main>
      </MaxWidthWrapper>
    </div>
  );
}
