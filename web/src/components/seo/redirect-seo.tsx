import { SEO } from './seo';
import { getShortUrl } from '@/config/environment';

interface RedirectSEOProps {
  shortKey: string;
  originalUrl?: string;
}

export function RedirectSEO({ shortKey }: RedirectSEOProps) {
  const currentUrl = getShortUrl(shortKey);
  
  return (
    <SEO
      title={`Redirecionando - ${shortKey}`}
      description={`Redirecionando para o link original através do encurtador ${currentUrl}`}
      keywords={`redirecionamento, ${shortKey}, brev.ly, link encurtado`}
      url={currentUrl}
      tags={['redirecionamento', 'link', shortKey]}
    />
  );
} 