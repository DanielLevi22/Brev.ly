import { ListItem } from "./list-item";
import { ListLinkEmpty } from "./list-links-empty";
import { useLinks } from "@/hooks/use-links";
import { CircleNotch } from "@phosphor-icons/react";

export function MyLinks(){
  const { data, isLoading, error } = useLinks();

  if (isLoading) {
    return (
      <section
        aria-labelledby="lista-links-heading"
        className="w-full rounded-lg bg-grayscale-100 p-4 md:p-8 md:col-span-7 lg:col-span-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-grayscale-200">
          <div 
            className="h-full bg-blue-base transition-all duration-1000 ease-out"
            style={{
              width: '0%',
              animation: 'progressFill 2s ease-out forwards'
            }}
          ></div>
        </div>
        
        <header className="flex items-center justify-between mb-4 md:mb-6">
          <h2
            id="lista-links-heading"
            className="text-base md:text-lg font-bold text-grayscale-600"
          >
            Links
          </h2>
          <button
            type="button"
            className="text-xs md:text-sm font-medium text-blue-base hover:underline"
          >
            Baixar CSV
          </button>
        </header>
        <div className="text-center py-6 md:py-8 text-grayscale-500 flex flex-col items-center gap-3">
          <CircleNotch size={32} className="animate-spin text-blue-base" />
          <span className="text-sm md:text-base">Carregando links...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        aria-labelledby="lista-links-heading"
        className="w-full rounded-lg bg-grayscale-100 p-4 md:p-8 md:col-span-7 lg:col-span-8"
      >
        <header className="flex items-center justify-between mb-4 md:mb-6">
          <h2
            id="lista-links-heading"
            className="text-base md:text-lg font-bold text-grayscale-600"
          >
            Links
          </h2>
          <button
            type="button"
            className="text-xs md:text-sm font-medium text-blue-base hover:underline"
          >
            Baixar CSV
          </button>
        </header>
        <div className="text-center py-6 md:py-8 text-red-500 text-sm md:text-base">
          Erro ao carregar links. Tente novamente.
        </div>
      </section>
    );
  }

  const links = data?.links || [];

  return(
    <section
      aria-labelledby="lista-links-heading"
      className="w-full rounded-lg bg-grayscale-100 p-4 md:p-8 md:col-span-7 lg:col-span-8"
    >
      <header className="flex items-center justify-between mb-4 md:mb-6">
        <h2
          id="lista-links-heading"
          className="text-base md:text-lg font-bold text-grayscale-600"
        >
          Links
        </h2>
        <button
          type="button"
          className="text-xs md:text-sm font-medium text-blue-base hover:underline"
        >
          Baixar CSV
        </button>
      </header>

      {links.length === 0 ? (
        <ListLinkEmpty />
      ) : (
        <div className="space-y-0 max-h-80 md:max-h-96 overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
          {links.map((link) => (
            <ListItem key={link.id} link={link} />
          ))}
        </div>
      )}
    </section>
  )
}