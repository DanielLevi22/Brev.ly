import { CreateNewLink } from "@/components/forms/new-link";
import { Header } from "@/components/layout/header";
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper";
import { MyLinks } from "@/components/links/list-links";


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
