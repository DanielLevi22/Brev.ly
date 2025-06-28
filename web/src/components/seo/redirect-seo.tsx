import { SEO } from './seo';

interface RedirectSEOProps {
  shortKey: string;
  originalUrl?: string;
}

export function RedirectSEO({ shortKey }: RedirectSEOProps) {
  const currentUrl = `https://brev.ly/${shortKey}`;
  
  return (
    <SEO
      title={`Redirecionando - ${shortKey}`}
      description={`Redirecionando para o link original através do encurtador Brev.ly/${shortKey}`}
      keywords={`redirecionamento, ${shortKey}, brev.ly, link encurtado`}
      url={currentUrl}
      tags={['redirecionamento', 'link', shortKey]}
    />
  );
} 