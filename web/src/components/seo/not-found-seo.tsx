import { SEO } from './seo';

export function NotFoundSEO() {
  return (
    <SEO
      title="Página não encontrada"
      description="A página que você está procurando não foi encontrada. Volte para a página inicial do Brev.ly."
      keywords="página não encontrada, 404, erro, brev.ly"
      url="https://brev.ly/404"
      tags={['404', 'erro', 'não encontrado']}
    />
  );
} 