import { ButtonIcon } from "@/components/ui/button-icon";
import { Link } from "@/types/link";
import { useDeleteLink } from "@/hooks/use-links";
import { useState } from "react";
import { toast } from "sonner";
import { getShortUrl, getRedirectUrl } from "@/config/environment";

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
      const shortUrl = getShortUrl(link.shortUrl);
      await navigator.clipboard.writeText(shortUrl);
      setIsCopiedShort(true);
      toast.info("Link copiado com sucesso", {
        description: `${shortUrl} foi copiado para a área de transferência.`
      });
      setTimeout(() => setIsCopiedShort(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar short URL:', error);
      toast.error("Erro ao copiar link");
    }
  };

  function handleRedirect()  {
    const redirectUrl = getRedirectUrl(link.shortUrl);
    window.open(redirectUrl);
  };

  const shortUrlDisplay = getShortUrl(link.shortUrl);

  return (
    <div className="border-t border-grayscale-200 py-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-8 space-y-2">
          <p 
            className="text-blue-base text-sm md:text-base font-semibold cursor-pointer hover:underline break-all"
            onClick={handleRedirect}
          >
            {shortUrlDisplay}
          </p>
          <p className="text-xs md:text-sm text-grayscale-600 truncate">{link.originalUrl}</p>
        </div>
        
        <div className="md:col-span-4 flex items-center justify-between gap-2">
          <p className="text-xs md:text-sm text-grayscale-500 font-medium whitespace-nowrap">
            {link.accessCount} acessos
          </p>
          <div className="flex items-center gap-2">
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
    </div>
  )
}