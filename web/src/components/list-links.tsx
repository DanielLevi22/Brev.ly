import { Link } from "@phosphor-icons/react";

export function MyLinks(){
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

      <div className="border-t border-grayscale-200 py-6 px-4.5 flex flex-col items-center gap-4">
        <Link size={24} />
        <p className="text-center">
          Ainda não existem links cadastrados
        </p>
      </div>
    </section>
  )
}