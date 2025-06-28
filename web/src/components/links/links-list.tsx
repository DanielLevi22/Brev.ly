import { Link, LinksListProps } from "@/types/link";

export function LinksList({ links }: LinksListProps) {
  if (links.length === 0) {
    return (
      <div className="text-center py-8 text-grayscale-500">
        <p className="text-sm md:text-base">Nenhum link criado ainda.</p>
        <p className="text-xs md:text-sm mt-1">Crie seu primeiro link encurtado!</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {links.map((link) => (
        <LinkListItem key={link.id} link={link} />
      ))}
    </div>
  );
}

// Componente interno para evitar importação circular
import { ListItem } from "./list-item";

function LinkListItem({ link }: { link: Link }) {
  return <ListItem link={link} />;
} 