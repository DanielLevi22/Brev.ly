import { Header } from "@/components/header";
import { ListLinks } from "@/components/list-links";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { CreateNewLink } from "@/components/new-link";

export function Home() {
  return (
    <div className="min-h-screen bg-grayscale-50">
      <MaxWidthWrapper className="md:px-8 lg:px-0">
        <Header />
        <main className="grid grid-cols-1 gap-5 p-3 md:p-0 md:grid-cols-12 lg:gap-8 items-start">
          <CreateNewLink />
          <ListLinks />
        </main>
      </MaxWidthWrapper>
    </div>
  );
}
