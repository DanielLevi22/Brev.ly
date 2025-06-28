export interface Link {
  id: number;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateLinkRequest {
  originalUrl: string;
  shortUrl: string;
}

export interface CreateLinkResponse {
  link: Link;
}

export interface ListLinksResponse {
  links: Link[];
}

export interface GetOriginalUrlResponse {
  originalUrl: string;
}

export interface ApiError {
  status: number;
  message: string;
  error?: string;
}

export interface MutationResult<T> {
  data?: T;
  error?: ApiError;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface QueryResult<T> {
  data?: T;
  error?: ApiError;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
}

export interface LinkListItemProps {
  link: Link;
}

export interface LinksListProps {
  links: Link[];
}

export interface CreateLinkFormData {
  originalUrl: string;
  shortUrl: string;
}

export interface SEOConfig {
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

export interface StructuredDataConfig {
  type: 'website' | 'organization' | 'webpage';
  data: Record<string, unknown>;
}

export interface EnvironmentConfig {
  FRONTEND_URL: string;
  REDIRECT_URL: string;
  PUBLIC_URL: string;
  API_URL: string;
  NODE_ENV: string;
  IS_PRODUCTION: boolean;
} 