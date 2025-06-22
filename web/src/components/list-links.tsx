import { ListItem } from "./list-item";
import { ListLinkEmpty } from "./list-links-empty";
import { useLinks } from "@/hooks/use-links";

export function MyLinks(){
  const { data, isLoading, error } = useLinks();

  if (isLoading) {
    return (
      <section
        aria-labelledby="lista-links-heading"
        className="w-full rounded-lg bg-grayscale-100 p-8 md:col-span-7 lg:col-span-8"
      >
        <header className="flex items-center justify-between mb-6">
          <h2
            id="lista-links-heading"
            className="text-lg font-bold text-grayscale-600"
          >
            Links
          </h2>
          <button
            type="button"
            className="text-sm font-medium text-blue-base hover:underline"
          >
            Baixar CSV
          </button>
        </header>
        <div className="text-center py-8 text-grayscale-500">
          Carregando links...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        aria-labelledby="lista-links-heading"
        className="w-full rounded-lg bg-grayscale-100 p-8 md:col-span-7 lg:col-span-8"
      >
        <header className="flex items-center justify-between mb-6">
          <h2
            id="lista-links-heading"
            className="text-lg font-bold text-grayscale-600"
          >
            Links
          </h2>
          <button
            type="button"
            className="text-sm font-medium text-blue-base hover:underline"
          >
            Baixar CSV
          </button>
        </header>
        <div className="text-center py-8 text-red-500">
          Erro ao carregar links. Tente novamente.
        </div>
      </section>
    );
  }

  const links = data?.links || [];

  return(
    <section
      aria-labelledby="lista-links-heading"
      className="w-full rounded-lg bg-grayscale-100 p-8 md:col-span-7 lg:col-span-8"
    >
      <header className="flex items-center justify-between mb-6">
        <h2
          id="lista-links-heading"
          className="text-lg font-bold text-grayscale-600"
        >
          Links
        </h2>
        <button
          type="button"
          className="text-sm font-medium text-blue-base hover:underline"
        >
          Baixar CSV
        </button>
      </header>

      {links.length === 0 ? (
        <ListLinkEmpty />
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <ListItem key={link.id} link={link} />
          ))}
        </div>
      )}
    </section>
  )
}