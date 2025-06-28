import { LinksHeader } from "./links-header";

interface LinksErrorProps {
  onDownload: () => void;
  loading: boolean;
}

export function LinksError({ onDownload, loading }: LinksErrorProps) {
  return (
    <section
      aria-labelledby="lista-links-heading"
      className="w-full rounded-lg bg-grayscale-100 p-4 md:p-8 md:col-span-7 lg:col-span-8"
    >
      <LinksHeader onDownload={onDownload} disabled={loading} loading={loading} />
      <div className="text-center py-6 md:py-8 text-red-500 text-sm md:text-base">
        Erro ao carregar links. Tente novamente.
      </div>
    </section>
  );
} 