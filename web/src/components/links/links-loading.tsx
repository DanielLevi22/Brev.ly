import { LinksHeader } from "./links-header";
import { CircleNotch } from "@phosphor-icons/react";

interface LinksLoadingProps {
  onDownload: () => void;
  loading: boolean;
}

export function LinksLoading({ onDownload, loading }: LinksLoadingProps) {
  return (
    <section
      aria-labelledby="lista-links-heading"
      className="w-full rounded-lg bg-grayscale-100 p-4 md:p-8 md:col-span-7 lg:col-span-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-grayscale-200">
        <div 
          className="h-full bg-blue-base"
          style={{ animation: 'progressFill 1.5s ease-in-out infinite' }}
        ></div>
      </div>
      <LinksHeader onDownload={onDownload} disabled={loading} loading={loading} />
      <div className="text-center py-6 md:py-8 text-grayscale-500 flex flex-col items-center gap-3">
        <CircleNotch size={32} className="animate-spin text-blue-base" />
        <span className="text-sm md:text-base">Carregando links...</span>
      </div>
    </section>
  );
} 