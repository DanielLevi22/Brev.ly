import { FormSkeleton } from "../feedback/skeleton";

export function CreateNewLinkLoading() {
  return (
    <section
      aria-labelledby="novo-link-heading"
      className="w-full rounded-lg bg-grayscale-100 p-4 md:p-8 md:col-span-5 lg:col-span-4"
    >
      <h2
        id="novo-link-heading"
        className="text-lg font-bold text-grayscale-600 mb-4"
      >
        Novo link
      </h2>
      <FormSkeleton />
    </section>
  );
} 