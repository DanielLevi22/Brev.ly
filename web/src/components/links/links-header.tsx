import { Button } from "../ui/button";
import { CircleNotch, Download } from "@phosphor-icons/react";

interface LinksHeaderProps {
  onDownload: () => void;
  disabled: boolean;
  loading: boolean;
}

export function LinksHeader({ onDownload, disabled, loading }: LinksHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-4 md:mb-6">
      <h2
        id="lista-links-heading"
        className="text-base md:text-lg font-bold text-grayscale-600"
      >
        Meus Links
      </h2>
      <Button
        variant="icon"
        type="button"
        onClick={onDownload}
        disabled={disabled}
        icon={
          loading ? (
            <CircleNotch size={16} className="animate-spin" />
          ) : (
            <Download size={16} className="!text-grayscale-600" />
          )
        }
      >
        Baixar CSV
      </Button>
    </header>
  );
} 