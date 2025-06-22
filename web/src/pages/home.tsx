import { MyLinks } from "@/components/list-links";
import { CreateNewLink } from "@/components/new-link";

export function HomePage() {
  return (
    <div className="grid grid-cols-1 gap-5 p-3 md:p-0 md:grid-cols-12 lg:gap-8 items-start">
      <CreateNewLink />
      <MyLinks />
    </div>
  );
}
