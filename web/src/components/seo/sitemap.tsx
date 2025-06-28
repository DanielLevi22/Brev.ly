import { Helmet } from 'react-helmet-async';
import { config } from '@/config/environment';

export function Sitemap() {
  return (
    <Helmet>
      <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
    </Helmet>
  );
}

// Função para gerar sitemap estático (pode ser usada no build)
export function generateSitemap(links: Array<{ shortKey: string; updatedAt: string }> = []) {
  const baseUrl = config.FRONTEND_URL;
  const currentDate = new Date().toISOString();

  const sitemapUrls = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/404`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.1'
    },
    ...links.map(link => ({
      url: `${baseUrl}/${link.shortKey}`,
      lastmod: link.updatedAt,
      changefreq: 'weekly',
      priority: '0.8'
    }))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
} 