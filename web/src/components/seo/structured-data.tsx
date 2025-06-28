import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'website' | 'organization' | 'webpage';
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(baseData)}
      </script>
    </Helmet>
  );
}

export function WebsiteStructuredData() {
  const data = {
    name: 'Brev.ly',
    url: 'https://brev.ly',
    description: 'Encurtador de Links Rápido e Seguro',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://brev.ly/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    sameAs: [
      'https://twitter.com/brevly',
      'https://facebook.com/brevly'
    ]
  };

  return <StructuredData type="website" data={data} />;
}

export function OrganizationStructuredData() {
  const data = {
    name: 'Brev.ly',
    url: 'https://brev.ly',
    logo: 'https://brev.ly/Logo_Icon.svg',
    description: 'Encurtador de Links Rápido e Seguro',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contato@brev.ly'
    }
  };

  return <StructuredData type="organization" data={data} />;
}

export function WebPageStructuredData({ 
  title, 
  description, 
  url, 
  breadcrumb 
}: {
  title: string;
  description: string;
  url: string;
  breadcrumb?: string[];
}) {
  const data = {
    name: title,
    description,
    url,
    breadcrumb: breadcrumb ? {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item,
        item: `${url}/${item.toLowerCase().replace(/\s+/g, '-')}`
      }))
    } : undefined
  };

  return <StructuredData type="webpage" data={data} />;
} 