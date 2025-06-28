import { Helmet } from 'react-helmet-async';
import { config } from '@/config/environment';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const DEFAULT_TITLE = 'Brev.ly - Encurtador de Links Rápido e Seguro';
const DEFAULT_DESCRIPTION = 'Encurte seus links de forma rápida, segura e gratuita. Crie URLs personalizadas e acompanhe o desempenho dos seus links.';
const DEFAULT_KEYWORDS = 'encurtador de links, url shortener, links curtos, encurtar url, brev.ly';
const DEFAULT_IMAGE = `${config.FRONTEND_URL}/og-image.png`;
const DEFAULT_URL = config.FRONTEND_URL;

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url = DEFAULT_URL,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: SEOProps) {
  const fullTitle = title ? `${title} | Brev.ly` : DEFAULT_TITLE;
  const fullKeywords = tags.length > 0 ? `${keywords}, ${tags.join(', ')}` : keywords;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author || 'Brev.ly'} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="pt-BR" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Brev.ly" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@brevly" />

      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2c46b1" />
      <meta name="msapplication-TileColor" content="#2c46b1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/Logo_Icon.svg" />
      <link rel="apple-touch-icon" href="/Logo_Icon.svg" />
    </Helmet>
  );
} 