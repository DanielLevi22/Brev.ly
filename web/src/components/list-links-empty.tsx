import { Link } from "@phosphor-icons/react/dist/ssr";

export function ListLinkEmpty() {
  return(
    <div className="border-t border-grayscale-200 py-6 px-4.5 flex flex-col items-center gap-4">
    <Link size={24} />
    <p className="text-center">
      Ainda não existem links cadastrados
    </p>
  </div>
  )
}