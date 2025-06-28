import { ListItem } from "./list-item";
import { ListLinkEmpty } from "./list-links-empty";

interface LinksListProps {
  links: any[];
}

export function LinksList({ links }: LinksListProps) {
  if (links.length === 0) return <ListLinkEmpty />;
  return (
    <div className="space-y-0 max-h-80 md:max-h-96 overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
      {links.map((link) => (
        <ListItem key={link.id || link.shortUrl} link={link} />
      ))}
    </div>
  );
} 