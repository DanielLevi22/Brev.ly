export interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
  updatedAt: string;
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