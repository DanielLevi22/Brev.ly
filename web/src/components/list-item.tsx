import { ButtonIcon } from "./button-icon";
import { Link } from "@/types/link";
import { useDeleteLink } from "@/hooks/use-links";
import { useState } from "react";
import { toast } from "sonner";

interface ListItemProps {
  link: Link;
}

export function ListItem({ link }: ListItemProps) {
  const deleteLinkMutation = useDeleteLink();
  const [isCopiedShort, setIsCopiedShort] = useState(false);

 async function handleDelete () {
    if (confirm('Tem certeza que deseja deletar este link?')) {
      try {
        console.log("shortUrl", link.shortUrl)
        await deleteLinkMutation.mutateAsync(link.shortUrl);
        toast.success("Link deletado com sucesso!");
      } catch (error) {
        console.error('Erro ao deletar link:', error);
        toast.error("Erro ao deletar link");
      }
    }
  };

  async function handleCopyShortUrl() {
    try {
      const shortUrl = `brev.ly/${link.shortUrl}`;
      await navigator.clipboard.writeText(shortUrl);
      setIsCopiedShort(true);
      toast.success("Link copiado com sucesso", {
        description: `${link.shortUrl} foi copiado para a área de transferência.`
      });
      setTimeout(() => setIsCopiedShort(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar short URL:', error);
      toast.error("Erro ao copiar link");
    }
  };

  function handleRedirect()  {
    window.open(`/${link.shortUrl}`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="border-t border-grayscale-200 py-3 flex items-center justify-between w-full">
        <div className="space-y-1">
          <p 
            className="text-blue-base text-md font-semibold cursor-pointer hover:underline"
            onClick={handleRedirect}
          >
            brev.ly/{link.shortUrl}
          </p>
          <p className="text-sm text-grayscale-600 truncate max-w-xs">{link.originalUrl}</p>
        </div>
        <p className="text-sm text-grayscale-500">{link.accessCount} acessos</p>
        <div className="flex items-center justify-center gap-2">
          <ButtonIcon 
            variant="copy"
            onClick={handleCopyShortUrl}
            disabled={isCopiedShort}
            title={isCopiedShort ? "Link copiado!" : "Copiar link"}
          />
          <ButtonIcon 
            variant="delete"
            onClick={handleDelete}
            disabled={deleteLinkMutation.isPending}
            title="Deletar link"
          />
        </div>
      </div>
    </div>
  )
}